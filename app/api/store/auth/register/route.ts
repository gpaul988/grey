import { NextRequest, NextResponse } from 'next/server';
import { createStoreCustomer, getStoreCustomerByEmail } from '@/lib/db/store-helpers';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'store-secret-key-change-in-production';

export async function POST(request: NextRequest) {
    try {
        const { email, password, firstName, lastName, phone } = await request.json();

        if (!email || !password || !firstName || !lastName) {
            return NextResponse.json(
                { error: 'Email, password, first name, and last name are required' },
                { status: 400 }
            );
        }

        // Check if customer already exists
        const existing = await getStoreCustomerByEmail(email);
        if (existing) {
            return NextResponse.json(
                { error: 'Email already registered' },
                { status: 409 }
            );
        }

        // Create new customer
        const customer = await createStoreCustomer({
            email,
            firstName,
            lastName,
            password,
            phone,
        });

        if (!customer) {
            return NextResponse.json(
                { error: 'Failed to create customer' },
                { status: 500 }
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
        console.error('[Store Auth Register]', error);
        return NextResponse.json(
            { error: 'Registration failed' },
            { status: 500 }
        );
    }
}
