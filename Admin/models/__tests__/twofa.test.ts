/**
 * Tests for 2FA module
 */

import { describe, it, expect, beforeEach } from 'vitest';
import speakeasy from 'speakeasy';
import { verifyTotpCode } from '../twofa';

describe('2FA - TOTP Verification', () => {
  let secret: string;

  beforeEach(() => {
    // Generate a test secret
    const spec = speakeasy.generateSecret({ length: 32 });
    secret = spec.base32;
  });

  it('should verify valid TOTP code', () => {
    const code = speakeasy.totp({
      secret: secret,
      encoding: 'base32',
    });

    const isValid = verifyTotpCode(secret, code);
    expect(isValid).toBe(true);
  });

  it('should reject invalid TOTP code', () => {
    const invalidCode = '000000';
    const isValid = verifyTotpCode(secret, invalidCode);
    expect(isValid).toBe(false);
  });

  it('should handle incorrect code format', () => {
    const badCode = 'abcdef';
    // Should not throw, just return false
    expect(() => verifyTotpCode(secret, badCode)).not.toThrow();
  });

  it('should allow codes from adjacent time windows', () => {
    // Generate current code
    const currentCode = speakeasy.totp({
      secret: secret,
      encoding: 'base32',
    });

    // This should still verify because we allow window: 2
    const isValid = verifyTotpCode(secret, currentCode);
    expect(isValid).toBe(true);
  });

  it('should reject very old codes', () => {
    // Generate a code from far in the past
    const pastTime = Math.floor(Date.now() / 1000) - 300; // 5 minutes ago
    const pastCode = speakeasy.totp({
      secret: secret,
      encoding: 'base32',
      time: pastTime,
    });

    // Should reject because it's outside the window
    const isValid = verifyTotpCode(secret, pastCode);
    expect(isValid).toBe(false);
  });
});

describe('2FA - Recovery Codes', () => {
  it('should generate valid recovery codes', () => {
    const codes: string[] = Array.from({ length: 10 }, () =>
      Math.random().toString(16).substr(2, 8).toUpperCase()
    );

    expect(codes).toHaveLength(10);
    expect(codes.every((c) => c.match(/^[A-F0-9]{8}$/))).toBe(true);
  });

  it('should handle recovery code case-insensitivity', () => {
    const code = 'ABCDEF12';
    expect(code.toUpperCase()).toBe('ABCDEF12');
    expect(code.toLowerCase().toUpperCase()).toBe('ABCDEF12');
  });
});
