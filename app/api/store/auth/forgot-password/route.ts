import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const { email } = await request.json();

        if (!email) {
            return NextResponse.json(
                { error: 'Email is required' },
                { status: 400 }
            );
        }

        // TODO: Implement actual password reset flow (send email, generate reset token)
        return NextResponse.json({
            message: 'Password reset email sent',
            email,
        });
    } catch (error) {
        console.error('[Store Auth Forgot Password]', error);
        return NextResponse.json(
            { error: 'Password reset failed' },
            { status: 500 }
        );
    }
}
