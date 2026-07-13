/**
 * Two-Factor Authentication Routes
 * 
 * Endpoints for 2FA setup, verification, and recovery
 * - POST /admin/2fa/setup - Initiate TOTP setup (returns QR code)
 * - POST /admin/2fa/verify - Verify QR scan and enable 2FA
 * - POST /admin/2fa/disable - Disable 2FA for user
 * - POST /admin/2fa/use-recovery - Use a recovery code
 * 
 * All endpoints require authentication
 */

import express from 'express';
import {z} from 'zod';
import {logger} from '../../lib/logger';
import {
  generateTwoFactorSecret,
  verifyTotpCode,
  enableTwoFactor,
  disableTwoFactor,
  getTwoFactorStatus,
  useRecoveryCode,
} from '../models/twofa';

const router = express.Router();

// Validation schemas
const setupSchema = z.object({
  email: z.string().email('Invalid email'),
});

const verifySchema = z.object({
  code: z.string().regex(/^\d{6}$/, 'Code must be 6 digits'),
  secret: z.string().min(1, 'Secret required'),
  recoveryCodes: z.array(z.string()).min(10, 'Must have recovery codes'),
});

const disableSchema = z.object({
  password: z.string().min(1, 'Password required'),
});

const recoveryCodeSchema = z.object({
  code: z.string().regex(/^[A-F0-9]{8}$/, 'Invalid recovery code format'),
});

/**
 * POST /admin/2fa/setup
 * 
 * Initiate TOTP setup - generates secret and QR code
 * User then scans QR with authenticator app
 * 
 * Response:
 * {
 *   "ok": true,
 *   "secret": "JBSWY3DPEBLW64TMMQ======",
 *   "qrCode": "data:image/png;base64,...",
 *   "recoveryCodes": ["DEADBEEF", "CAFEBABE", ...]
 * }
 */
router.post('/setup', async (req: express.Request, res: express.Response) => {
  try {
    // Only allow authenticated users
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const userId = (req.session as any)?.user?.id;
    if (!userId) {
      logger.warn('2FA setup attempted without authentication');
      res.status(401).json({ok: false, error: 'Not authenticated'});
      return;
    }

    // Parse request
    const validation = setupSchema.safeParse(req.body);
    if (!validation.success) {
      logger.warn('2FA setup validation failed', {
        errors: validation.error.flatten(),
      });
      res.status(400).json({
        ok: false,
        error: 'Validation failed',
        details: validation.error.flatten(),
      });
      return;
    }

    const {email} = validation.data;

    // Generate secret and QR code
    const {secret, qrCode, recoveryCodes} = await generateTwoFactorSecret(
      userId,
      email
    );

    logger.info('2FA setup initiated', {userId, email});

    res.json({
      ok: true,
      secret,
      qrCode,
      recoveryCodes,
    });
  } catch (error) {
    logger.error('2FA setup error', {error: (error as Error).message});
    res.status(500).json({ok: false, error: 'Setup failed'});
  }
});

/**
 * POST /admin/2fa/verify
 * 
 * Verify TOTP code and enable 2FA
 * User provides the 6-digit code from their authenticator app
 * 
 * Body:
 * {
 *   "code": "123456",
 *   "secret": "JBSWY3DPEBLW64TMMQ======",
 *   "recoveryCodes": ["DEADBEEF", "CAFEBABE", ...]
 * }
 * 
 * Response:
 * {
 *   "ok": true,
 *   "message": "2FA enabled successfully"
 * }
 */
router.post('/verify', async (req: express.Request, res: express.Response) => {
  try {
    // Only allow authenticated users
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const userId = (req.session as any)?.user?.id;
    if (!userId) {
      logger.warn('2FA verify attempted without authentication');
      res.status(401).json({ok: false, error: 'Not authenticated'});
      return;
    }

    // Parse request
    const validation = verifySchema.safeParse(req.body);
    if (!validation.success) {
      logger.warn('2FA verify validation failed', {
        errors: validation.error.flatten(),
      });
      res.status(400).json({
        ok: false,
        error: 'Validation failed',
        details: validation.error.flatten(),
      });
      return;
    }

    const {code, secret, recoveryCodes} = validation.data;

    // Verify the TOTP code
    const isValid = verifyTotpCode(secret, code);
    if (!isValid) {
      logger.warn('2FA verification failed - invalid code', {userId});
      res.status(400).json({ok: false, error: 'Invalid verification code'});
      return;
    }

    // Enable 2FA in database
    const success = enableTwoFactor(userId, secret, recoveryCodes);
    if (!success) {
      logger.error('Failed to enable 2FA in database', {userId});
      res.status(500).json({ok: false, error: 'Failed to enable 2FA'});
      return;
    }

    logger.info('2FA enabled successfully', {userId});

    res.json({
      ok: true,
      message: '2FA enabled successfully',
    });
  } catch (error) {
    logger.error('2FA verify error', {error: (error as Error).message});
    res.status(500).json({ok: false, error: 'Verification failed'});
  }
});

/**
 * POST /admin/2fa/disable
 * 
 * Disable 2FA for the authenticated user
 * Requires password confirmation for security
 * 
 * Body:
 * {
 *   "password": "user_password"
 * }
 * 
 * Response:
 * {
 *   "ok": true,
 *   "message": "2FA disabled"
 * }
 */
router.post('/disable', async (req: express.Request, res: express.Response) => {
  try {
    // Only allow authenticated users
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const userId = (req.session as any)?.user?.id;
    if (!userId) {
      logger.warn('2FA disable attempted without authentication');
      res.status(401).json({ok: false, error: 'Not authenticated'});
      return;
    }

    // Parse request
    const validation = disableSchema.safeParse(req.body);
    if (!validation.success) {
      logger.warn('2FA disable validation failed', {
        errors: validation.error.flatten(),
      });
      res.status(400).json({
        ok: false,
        error: 'Validation failed',
        details: validation.error.flatten(),
      });
      return;
    }

    // TODO: Verify password before disabling
    // const user = getUser(userId);
    // const passwordValid = await bcrypt.compare(password, user.passwordHash);
    // if (!passwordValid) {
    //   logger.warn('2FA disable - password verification failed', {userId});
    //   res.status(401).json({ok: false, error: 'Invalid password'});
    //   return;
    // }

    // Disable 2FA
    const success = disableTwoFactor(userId);
    if (!success) {
      logger.error('Failed to disable 2FA', {userId});
      res.status(500).json({ok: false, error: 'Failed to disable 2FA'});
      return;
    }

    logger.info('2FA disabled', {userId});

    res.json({
      ok: true,
      message: '2FA disabled',
    });
  } catch (error) {
    logger.error('2FA disable error', {error: (error as Error).message});
    res.status(500).json({ok: false, error: 'Disable failed'});
  }
});

/**
 * POST /admin/2fa/use-recovery
 * 
 * Use a recovery code to log in when authenticator is unavailable
 * 
 * Body:
 * {
 *   "code": "DEADBEEF"
 * }
 * 
 * Response:
 * {
 *   "ok": true,
 *   "message": "Recovery code accepted"
 * }
 */
router.post(
  '/use-recovery',
  async (req: express.Request, res: express.Response) => {
    try {
      // Only allow authenticated users
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const userId = (req.session as any)?.user?.id;
      if (!userId) {
        logger.warn('2FA recovery attempted without authentication');
        res.status(401).json({ok: false, error: 'Not authenticated'});
        return;
      }

      // Parse request
      const validation = recoveryCodeSchema.safeParse(req.body);
      if (!validation.success) {
        logger.warn('Recovery code validation failed', {
          errors: validation.error.flatten(),
        });
        res.status(400).json({
          ok: false,
          error: 'Invalid code format',
          details: validation.error.flatten(),
        });
        return;
      }

      const {code} = validation.data;

      // Verify and use recovery code
      const success = useRecoveryCode(userId, code);
      if (!success) {
        logger.warn('Recovery code validation failed', {userId});
        res.status(400).json({ok: false, error: 'Invalid recovery code'});
        return;
      }

      logger.info('Recovery code used successfully', {userId});

      res.json({
        ok: true,
        message: 'Recovery code accepted',
      });
    } catch (error) {
      logger.error('Recovery code error', {error: (error as Error).message});
      res.status(500).json({ok: false, error: 'Recovery failed'});
    }
  }
);

/**
 * GET /admin/2fa/status
 * 
 * Get 2FA status for current user
 * 
 * Response:
 * {
 *   "ok": true,
 *   "enabled": true,
 *   "createdAt": "2024-06-17T..."
 * }
 */
router.get('/status', async (req: express.Request, res: express.Response) => {
  try {
    // Only allow authenticated users
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const userId = (req.session as any)?.user?.id;
    if (!userId) {
      logger.warn('2FA status check without authentication');
      res.status(401).json({ok: false, error: 'Not authenticated'});
      return;
    }

    const twofa = getTwoFactorStatus(userId);
    const enabled = Boolean(twofa?.enabled);

    res.json({
      ok: true,
      enabled,
      createdAt: twofa?.created_at || null,
    });
  } catch (error) {
    logger.error('2FA status error', {error: (error as Error).message});
    res.status(500).json({ok: false, error: 'Status check failed'});
  }
});

export default router;
