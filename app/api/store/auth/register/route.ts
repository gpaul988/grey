import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const { email, password, first_name, last_name } = await request.json();

        if (!email || !password || !first_name || !last_name) {
            return NextResponse.json(
                { error: 'All fields are required' },
                { status: 400 }
            );
        }

        // TODO: Implement actual user registration with database
        // For now, return a mock response
        return NextResponse.json({
            customer: {
                id: Math.floor(Math.random() * 10000),
                email,
                first_name,
                last_name,
            },
            token: 'mock-token-' + Date.now(),
        });
    } catch (error) {
        console.error('[Store Auth Register]', error);
        return NextResponse.json(
            { error: 'Registration failed' },
            { status: 500 }
        );
    }
}
