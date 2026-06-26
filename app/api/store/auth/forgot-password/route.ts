import { NextRequest, NextResponse } from 'next/server';
import { getStoreCustomerByEmail } from '@/lib/db/store-helpers';
import crypto from 'crypto';

// In production, store reset tokens in database with expiry
const resetTokens = new Map<string, { email: string; expiresAt: number }>();

export async function POST(request: NextRequest) {
    try {
        const { email } = await request.json();

        if (!email) {
            return NextResponse.json(
                { error: 'Email is required' },
                { status: 400 }
            );
        }

        // Check if customer exists
        const customer = await getStoreCustomerByEmail(email);
        if (!customer) {
            // Return success even if email doesn't exist (security: don't leak email list)
            return NextResponse.json({
                message: 'If an account with this email exists, a password reset link has been sent',
            });
        }

        // Generate reset token
        const resetToken = crypto.randomBytes(32).toString('hex');
        const expiresAt = Date.now() + 1 * 60 * 60 * 1000; // 1 hour

        resetTokens.set(resetToken, { email, expiresAt });

        // In production: send email with reset link
        // email would include: `${process.env.NEXT_PUBLIC_BASE_URL}/store/account/reset-password?token=${resetToken}`
        console.log(`[Mock] Reset token for ${email}: ${resetToken}`);

        return NextResponse.json({
            message: 'If an account with this email exists, a password reset link has been sent',
        });
    } catch (error) {
        console.error('[Store Auth Forgot Password]', error);
        return NextResponse.json(
            { error: 'Password reset failed' },
            { status: 500 }
        );
    }
}

export function validateResetToken(token: string): string | null {
    const data = resetTokens.get(token);
    if (!data) return null;
    if (data.expiresAt < Date.now()) {
        resetTokens.delete(token);
        return null;
    }
    return data.email;
}

export function clearResetToken(token: string) {
    resetTokens.delete(token);
}
