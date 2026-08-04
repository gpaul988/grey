import { describe, it, expect, beforeEach } from 'vitest';
import { encrypt, decrypt, hashPassword, verifyPassword, generateToken } from '../crypto';

describe('Crypto Utilities', () => {
  const masterSecret = 'my-super-secret-key-for-testing-encryption';

  describe('encrypt/decrypt', () => {
    it('encrypts and decrypts plaintext correctly', () => {
      const plaintext = '4532-1234-5678-9010';
      const encrypted = encrypt(plaintext, masterSecret);

      expect(encrypted).toBeTruthy();
      expect(encrypted).not.toContain(plaintext);

      const decrypted = decrypt(encrypted, masterSecret);
      expect(decrypted).toBe(plaintext);
    });

    it('produces different ciphertext for same plaintext (due to random IV/salt)', () => {
      const plaintext = 'test@example.com';
      const encrypted1 = encrypt(plaintext, masterSecret);
      const encrypted2 = encrypt(plaintext, masterSecret);

      expect(encrypted1).not.toBe(encrypted2);
      expect(decrypt(encrypted1, masterSecret)).toBe(plaintext);
      expect(decrypt(encrypted2, masterSecret)).toBe(plaintext);
    });

    it('fails to decrypt with wrong key', () => {
      const plaintext = 'sensitive-data';
      const encrypted = encrypt(plaintext, masterSecret);
      const wrongKey = 'wrong-secret-key';

      expect(() => decrypt(encrypted, wrongKey)).toThrow();
    });
  });

  describe('hashPassword/verifyPassword', () => {
    it('hashes and verifies passwords correctly', async () => {
      const password = 'SecurePassword123!';
      const hash = await hashPassword(password);

      expect(hash).toBeTruthy();
      expect(hash).not.toBe(password);

      const isValid = await verifyPassword(password, hash);
      expect(isValid).toBe(true);
    });

    it('rejects incorrect passwords', async () => {
      const password = 'CorrectPassword123!';
      const hash = await hashPassword(password);

      const isValid = await verifyPassword('WrongPassword123!', hash);
      expect(isValid).toBe(false);
    });
  });

  describe('generateToken', () => {
    it('generates unique tokens', () => {
      const token1 = generateToken(32);
      const token2 = generateToken(32);

      expect(token1).not.toBe(token2);
      expect(token1.length).toBe(64); // 32 bytes = 64 hex chars
    });

    it('generates custom length tokens', () => {
      const token16 = generateToken(16);
      const token64 = generateToken(64);

      expect(token16.length).toBe(32); // 16 bytes
      expect(token64.length).toBe(128); // 64 bytes
    });
  });
});
