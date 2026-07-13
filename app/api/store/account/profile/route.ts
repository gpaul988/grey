import { NextRequest, NextResponse } from 'next/server';
import { getStoreCustomerById, updateStoreCustomerProfile } from '@/lib/db/store-helpers';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'store-secret-key-change-in-production';

function extractTokenFromHeader(request: NextRequest): string | null {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return null;
    }
    return authHeader.substring(7);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function verifyToken(token: string): any | null {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch {
        return null;
    }
}

export async function GET(request: NextRequest) {
    try {
        const token = extractTokenFromHeader(request);
        if (!token) {
            return NextResponse.json(
                { error: 'Authorization token required' },
                { status: 401 }
            );
        }

        const decoded = verifyToken(token);
        if (!decoded) {
            return NextResponse.json(
                { error: 'Invalid or expired token' },
                { status: 401 }
            );
        }

        const customer = await getStoreCustomerById(decoded.customerId);
        if (!customer) {
            return NextResponse.json(
                { error: 'Customer not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            customer: {
                id: customer.id,
                email: customer.email,
                firstName: customer.firstName,
                lastName: customer.lastName,
                phone: customer.phone,
                emailVerified: customer.emailVerified,
                createdAt: customer.createdAt,
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
        const token = extractTokenFromHeader(request);
        if (!token) {
            return NextResponse.json(
                { error: 'Authorization token required' },
                { status: 401 }
            );
        }

        const decoded = verifyToken(token);
        if (!decoded) {
            return NextResponse.json(
                { error: 'Invalid or expired token' },
                { status: 401 }
            );
        }

        const { firstName, lastName, phone } = await request.json();

        if (!firstName || !lastName) {
            return NextResponse.json(
                { error: 'First name and last name are required' },
                { status: 400 }
            );
        }

        const updated = await updateStoreCustomerProfile(decoded.customerId, {
            firstName,
            lastName,
            phone,
        });

        if (!updated) {
            return NextResponse.json(
                { error: 'Failed to update profile' },
                { status: 500 }
            );
        }

        return NextResponse.json({
            customer: {
                id: updated.id,
                email: updated.email,
                firstName: updated.firstName,
                lastName: updated.lastName,
                phone: updated.phone,
                emailVerified: updated.emailVerified,
                updatedAt: updated.updatedAt,
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
