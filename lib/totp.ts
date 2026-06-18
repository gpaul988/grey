import speakeasy from 'speakeasy';
import QRCode from 'qrcode';

/**
 * Generate TOTP secret and QR code
 */
export async function generateTOTPSecret(email: string) {
  const secret = speakeasy.generateSecret({
    name: `Grey Admin (${email})`,
    issuer: 'Grey Admin',
    length: 32,
  });

  // Generate QR code data URL
  const qrCode = await QRCode.toDataURL(secret.otpauth_url || '');

  return {
    secret: secret.base32,
    otpauthUrl: secret.otpauth_url,
    qrCode,
  };
}

/**
 * Verify TOTP token
 */
export function verifyTOTP(secret: string, token: string): boolean {
  try {
    const verified = speakeasy.totp.verify({
      secret,
      encoding: 'base32',
      token,
      window: 2, // Allow 2 windows (30 seconds each)
    });

    return verified as boolean;
  } catch (error) {
    console.error('TOTP verification error:', error);
    return false;
  }
}

/**
 * Generate backup codes
 */
export function generateBackupCodes(count: number = 10): string[] {
  const codes = [];
  for (let i = 0; i < count; i++) {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    codes.push(code);
  }
  return codes;
}

/**
 * Verify backup code
 */
export function verifyBackupCode(code: string, backupCodes: string[]): boolean {
  return backupCodes.includes(code.toUpperCase());
}
