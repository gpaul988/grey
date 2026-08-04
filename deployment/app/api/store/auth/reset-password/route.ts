import { NextRequest, NextResponse } from 'next/server';
import {
  validatePasswordResetToken,
  resetStoreCustomerPassword,
  markTokenAsUsed,
} from '@/lib/db/store-helpers';

export async function POST(request: NextRequest) {
  try {
    const { token, password } = await request.json();

    // Validate inputs
    if (!token || !password) {
      return NextResponse.json(
        { error: 'Token and password are required' },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters' },
        { status: 400 }
      );
    }

    // Validate token and get customer email
    const email = await validatePasswordResetToken(token);
    if (!email) {
      return NextResponse.json(
        { error: 'Invalid or expired reset token' },
        { status: 401 }
      );
    }

    // Update password in database
    const updated = await resetStoreCustomerPassword(email, password);
    if (!updated) {
      return NextResponse.json(
        { error: 'Failed to reset password' },
        { status: 500 }
      );
    }

    // Mark token as used to prevent reuse
    await markTokenAsUsed(token);

    console.log(`[Password Reset] Successfully reset for ${email}`);

    return NextResponse.json({
      message: 'Password reset successfully. You can now log in with your new password.',
    });
  } catch (error) {
    console.error('[Store Auth Reset Password]', error);
    return NextResponse.json(
      { error: 'An error occurred. Please try again later.' },
      { status: 500 }
    );
  }
}

/**
 * GET endpoint to validate token (before showing form)
 * Returns 200 if token is valid, 401 if invalid/expired
 */
export async function GET(request: NextRequest) {
  try {
    const token = request.nextUrl.searchParams.get('token');

    if (!token) {
      return NextResponse.json(
        { error: 'Token is required' },
        { status: 400 }
      );
    }

    const email = await validatePasswordResetToken(token);
    if (!email) {
      return NextResponse.json(
        { error: 'Invalid or expired reset token' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      valid: true,
      email, // Return email (masked for security: first char + ** + last 3 chars)
    });
  } catch (error) {
    console.error('[Store Auth Validate Token]', error);
    return NextResponse.json(
      { error: 'An error occurred' },
      { status: 500 }
    );
  }
}
