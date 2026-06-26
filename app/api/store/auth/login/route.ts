import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json(
                { error: 'Email and password are required' },
                { status: 400 }
            );
        }

        // TODO: Implement actual authentication with database
        // For now, return a mock response
        return NextResponse.json({
            customer: {
                id: 1,
                email,
                first_name: 'Test',
                last_name: 'User',
            },
            token: 'mock-token-' + Date.now(),
        });
    } catch (error) {
        console.error('[Store Auth Login]', error);
        return NextResponse.json(
            { error: 'Login failed' },
            { status: 500 }
        );
    }
}
