import { NextRequest, NextResponse } from 'next/server';
import { resetStoreCustomerPassword } from '@/lib/db/store-helpers';
import { validateResetToken, clearResetToken } from '../forgot-password/route';

export async function POST(request: NextRequest) {
    try {
        const { token, password } = await request.json();

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

        // Validate reset token
        const email = validateResetToken(token);
        if (!email) {
            return NextResponse.json(
                { error: 'Invalid or expired reset token' },
                { status: 401 }
            );
        }

        // Update password
        const updated = await resetStoreCustomerPassword(email, password);
        if (!updated) {
            return NextResponse.json(
                { error: 'Failed to reset password' },
                { status: 500 }
            );
        }

        // Clear token after use
        clearResetToken(token);

        return NextResponse.json({
            message: 'Password reset successfully',
        });
    } catch (error) {
        console.error('[Store Auth Reset Password]', error);
        return NextResponse.json(
            { error: 'Password reset failed' },
            { status: 500 }
        );
    }
}
