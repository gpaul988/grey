import crypto from 'node:crypto';

/**
 * Field-level encryption utility for sensitive data
 * Uses AES-256-GCM with per-record IV/salt
 */

const ALGORITHM = 'aes-256-gcm';
const KEY_LENGTH = 32; // 256 bits
const IV_LENGTH = 16;  // 128 bits
const TAG_LENGTH = 16; // GCM auth tag
const SALT_LENGTH = 16;

/**
 * Derive encryption key from master secret using PBKDF2
 */
function deriveKey(masterSecret: string, salt: Buffer): Buffer {
  return crypto.pbkdf2Sync(masterSecret, salt, 100000, KEY_LENGTH, 'sha256');
}

/**
 * Encrypt a plaintext value
 * Returns: salt:iv:ciphertext:authTag (all base64, colon-separated)
 */
export function encrypt(plaintext: string, masterSecret: string): string {
  const salt = crypto.randomBytes(SALT_LENGTH);
  const iv = crypto.randomBytes(IV_LENGTH);
  const key = deriveKey(masterSecret, salt);

  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
  let ciphertext = cipher.update(plaintext, 'utf8', 'hex');
  ciphertext += cipher.final('hex');
  
  const authTag = cipher.getAuthTag();

  // Format: salt:iv:ciphertext:authTag (all base64)
  const encrypted = [
    salt.toString('base64'),
    iv.toString('base64'),
    ciphertext,
    authTag.toString('base64'),
  ].join(':');

  return encrypted;
}

/**
 * Decrypt a ciphertext value
 * Input format: salt:iv:ciphertext:authTag (from encrypt())
 */
export function decrypt(encrypted: string, masterSecret: string): string {
  const [saltB64, ivB64, ciphertext, authTagB64] = encrypted.split(':');
  
  const salt = Buffer.from(saltB64, 'base64');
  const iv = Buffer.from(ivB64, 'base64');
  const authTag = Buffer.from(authTagB64, 'base64');
  const key = deriveKey(masterSecret, salt);

  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
  decipher.setAuthTag(authTag);

  let plaintext = decipher.update(ciphertext, 'hex', 'utf8');
  plaintext += decipher.final('utf8');

  return plaintext;
}

/**
 * Hash a password using Argon2 (via @node-rs/argon2)
 */
export async function hashPassword(password: string): Promise<string> {
  try {
    const { hash } = await import('@node-rs/argon2');
    return hash(password);
  } catch (e) {
    // Fallback to PBKDF2 if native module not available
    const salt = crypto.randomBytes(SALT_LENGTH);
    const key = crypto.pbkdf2Sync(password, salt, 100000, 32, 'sha256');
    return `pbkdf2:${salt.toString('base64')}:${key.toString('base64')}`;
  }
}

/**
 * Verify a password against a hash
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  if (hash.startsWith('pbkdf2:')) {
    // Handle PBKDF2 fallback format
    const [, saltB64, keyB64] = hash.split(':');
    const salt = Buffer.from(saltB64, 'base64');
    const expectedKey = Buffer.from(keyB64, 'base64');
    const derivedKey = crypto.pbkdf2Sync(password, salt, 100000, 32, 'sha256');
    return crypto.timingSafeEqual(expectedKey, derivedKey);
  }

  try {
    const { verify } = await import('@node-rs/argon2');
    return verify(hash, password);
  } catch (e) {
    return false;
  }
}

/**
 * Generate a secure random token
 */
export function generateToken(length: number = 32): string {
  return crypto.randomBytes(length).toString('hex');
}

/**
 * Encrypt field type for Drizzle schema
 * Usage: encrypted_field: encryptedField(text(), 'field_name')
 */
export function encryptedField(fieldName: string) {
  return {
    encrypt: (value: string) => {
      const masterSecret = process.env.ENCRYPTION_KEY || '';
      if (!masterSecret) throw new Error('ENCRYPTION_KEY not set');
      return encrypt(value, masterSecret);
    },
    decrypt: (value: string) => {
      const masterSecret = process.env.ENCRYPTION_KEY || '';
      if (!masterSecret) throw new Error('ENCRYPTION_KEY not set');
      return decrypt(value, masterSecret);
    },
  };
}
