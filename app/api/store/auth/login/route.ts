import { NextRequest, NextResponse } from 'next/server';
import { verifyStoreCustomerPassword } from '@/lib/db/store-helpers';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'store-secret-key-change-in-production';

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json(
                { error: 'Email and password are required' },
                { status: 400 }
            );
        }

        // Verify customer exists and password matches
        const customer = await verifyStoreCustomerPassword(email, password);

        if (!customer) {
            return NextResponse.json(
                { error: 'Invalid email or password' },
                { status: 401 }
            );
        }

        // Generate JWT token
        const token = jwt.sign(
            {
                customerId: customer.id,
                email: customer.email,
                firstName: customer.firstName,
            },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        return NextResponse.json({
            customer: {
                id: customer.id,
                email: customer.email,
                firstName: customer.firstName,
                lastName: customer.lastName,
                phone: customer.phone,
            },
            token,
        });
    } catch (error) {
        console.error('[Store Auth Login]', error);
        return NextResponse.json(
            { error: 'Login failed' },
            { status: 500 }
        );
    }
}
