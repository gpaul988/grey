/**
 * Two-Factor Authentication (2FA) Model
 * 
 * Implements TOTP (Time-based One-Time Password) for admin security
 * Uses speakeasy library to generate secrets and verify codes
 * Stores recovery codes for account recovery without authenticator
 */

import db from '../db';
import speakeasy from 'speakeasy';
import QRCode from 'qrcode';
import crypto from 'crypto';

export interface TwoFactorSetup {
  secret: string;
  qrCode: string;
  recoveryCodes: string[];
}

export interface TwoFactorRecord {
  id?: number;
  user_id: number;
  secret: string;
  enabled: boolean;
  recovery_codes?: string; // JSON string
  created_at: string;
  updated_at?: string;
  lastUsedCode?: string;
  lastUsedAt?: string;
}

/**
 * Generate a new 2FA secret and QR code for setup
 */
export async function generateTwoFactorSecret(
  userId: number,
  email: string
): Promise<TwoFactorSetup> {
  const secret = speakeasy.generateSecret({
    name: `Grey InfoTech (${email})`,
    issuer: 'Grey InfoTech',
    length: 32,
  });

  // Generate QR code
  const qrCode = await QRCode.toDataURL(secret.otpauth_url!);

  // Generate 10 recovery codes
  const recoveryCodes = Array.from({ length: 10 }, () =>
    crypto.randomBytes(4).toString('hex').toUpperCase()
  );

  return {
    secret: secret.base32,
    qrCode,
    recoveryCodes,
  };
}

/**
 * Verify a TOTP code
 * Returns true if valid, false otherwise
 */
export function verifyTotpCode(secret: string, code: string): boolean {
  return speakeasy.totp.verify({
    secret: secret,
    encoding: 'base32',
    token: code,
    window: 2, // Allow 30 seconds before/after current window
  });
}

/**
 * Enable 2FA for a user
 */
export function enableTwoFactor(
  userId: number,
  secret: string,
  recoveryCodes: string[]
): boolean {
  try {
    // Insert or update 2FA record
    const stmt = db.prepare(`
      INSERT OR REPLACE INTO two_factor_auth (
        user_id, secret, enabled, recovery_codes, created_at
      ) VALUES (?, ?, ?, ?, ?)
    `);

    stmt.run(
      userId,
      secret,
      1, // enabled
      JSON.stringify(recoveryCodes),
      new Date().toISOString()
    );

    return true;
  } catch (error) {
    console.error('Failed to enable 2FA:', error);
    return false;
  }
}

/**
 * Disable 2FA for a user
 */
export function disableTwoFactor(userId: number): boolean {
  try {
    const stmt = db.prepare(`
      UPDATE two_factor_auth SET enabled = 0 WHERE user_id = ?
    `);
    stmt.run(userId);
    return true;
  } catch (error) {
    console.error('Failed to disable 2FA:', error);
    return false;
  }
}

/**
 * Get 2FA status for a user
 */
export function getTwoFactorStatus(userId: number): TwoFactorRecord | null {
  try {
    const stmt = db.prepare(`
      SELECT * FROM two_factor_auth WHERE user_id = ?
    `);
    return stmt.get(userId) as TwoFactorRecord | null;
  } catch (error) {
    console.error('Failed to get 2FA status:', error);
    return null;
  }
}

/**
 * Verify and use recovery code
 */
export function useRecoveryCode(userId: number, code: string): boolean {
  try {
    const twofa = getTwoFactorStatus(userId);
    if (!twofa) return false;

    const codes = JSON.parse(twofa.recovery_codes || '[]') as string[];
    const index = codes.indexOf(code.toUpperCase());

    if (index === -1) return false;

    // Remove used code
    codes.splice(index, 1);

    // Update database
    const stmt = db.prepare(`
      UPDATE two_factor_auth SET recovery_codes = ? WHERE user_id = ?
    `);
    stmt.run(JSON.stringify(codes), userId);

    return true;
  } catch (error) {
    console.error('Failed to use recovery code:', error);
    return false;
  }
}

/**
 * Create database schema for 2FA
 * Call during database initialization
 */
export function createTwoFactorSchema() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS two_factor_auth (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER UNIQUE NOT NULL,
      secret TEXT NOT NULL,
      enabled BOOLEAN DEFAULT 0,
      recovery_codes TEXT, -- JSON array
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE INDEX IF NOT EXISTS idx_2fa_user ON two_factor_auth(user_id);
  `);
}

export default {
  generateTwoFactorSecret,
  verifyTotpCode,
  enableTwoFactor,
  disableTwoFactor,
  getTwoFactorStatus,
  useRecoveryCode,
  createTwoFactorSchema,
};
