import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        // TODO: Implement actual profile fetch (get from session/token)
        return NextResponse.json({
            customer: {
                id: 1,
                email: 'user@example.com',
                first_name: 'Test',
                last_name: 'User',
            },
        });
    } catch (error) {
        console.error('[Store Account Profile GET]', error);
        return NextResponse.json(
            { error: 'Failed to fetch profile' },
            { status: 500 }
        );
    }
}

export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();
        const { first_name, last_name, phone } = body;

        if (!first_name || !last_name) {
            return NextResponse.json(
                { error: 'First name and last name are required' },
                { status: 400 }
            );
        }

        // TODO: Implement actual profile update (validate session, update in database)
        return NextResponse.json({
            customer: {
                id: 1,
                email: 'user@example.com',
                first_name,
                last_name,
                phone,
            },
        });
    } catch (error) {
        console.error('[Store Account Profile PUT]', error);
        return NextResponse.json(
            { error: 'Profile update failed' },
            { status: 500 }
        );
    }
}
