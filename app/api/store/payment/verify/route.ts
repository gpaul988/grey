import { NextRequest, NextResponse } from 'next/server';
import { createStorePayment, verifyStorePayment } from '@/lib/db/store-helpers';

export async function POST(request: NextRequest) {
    try {
        // Rate limiting per-IP to prevent abuse. Use Redis in production for cross-instance limits.
        const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
        const { checkRateLimit } = await import('@/app/lib/rate-limit');
        const rl = checkRateLimit(`${ip}:store-payment-verify`);
        if (!rl.allowed) {
            return NextResponse.json({ error: 'Rate limit exceeded. Try again later.' }, { status: 429 });
        }

        const { orderId, customerId, reference, amount, currency, provider, transactionId, paymentMethod, metadata } = await request.json();

        if (!orderId || !customerId || !reference || !amount || !provider) {
            return NextResponse.json(
                { error: 'Order ID, customer ID, reference, amount, and provider are required' },
                { status: 400 }
            );
        }

        // Check if payment already exists
        const existingPayment = await verifyStorePayment(transactionId || reference);
        if (existingPayment) {
            return NextResponse.json({
                success: true,
                payment: {
                    id: existingPayment.id,
                    reference: existingPayment.reference,
                    amount: existingPayment.amount,
                    status: existingPayment.status,
                },
                message: 'Payment already verified',
            });
        }

        // Require internal admin secret or real gateway verification in production
        let isVerified = false;
        const adminSecretProvided = request.headers.get('x-admin-secret');
        if (adminSecretProvided && adminSecretProvided === process.env.ADMIN_API_SECRET) {
            // Internal trusted notification (e.g., from backend worker)
            isVerified = true;
        }

        // Allow local debug bypass if explicitly enabled (DEV ONLY)
        if (!isVerified && process.env.DEBUG_TRUST_PAYMENTS === 'true') {
            isVerified = true;
        }

        if (!isVerified) {
            // TODO: Implement provider-specific verification (Stripe/PayPal) here.
            return NextResponse.json(
                { error: 'Payment verification requires provider integration or valid x-admin-secret header' },
                { status: 403 }
            );
        }

        // Create payment record
        const payment = await createStorePayment({
            orderId,
            customerId,
            amount,
            currency: currency || 'NGN',
            provider,
            transactionId: transactionId || reference,
            reference,
            paymentMethod,
            metadata,
        });

        if (!payment) {
            return NextResponse.json(
                { error: 'Failed to record payment' },
                { status: 500 }
            );
        }

        // Notify admin panel of new sale/payment (non-blocking)
        try {
            const adminSecret = process.env.ADMIN_API_SECRET || 'default-secret-key';
            const baseUrl = process.env.ADMIN_BASE_URL || 'http://localhost:3000';
            fetch(`${baseUrl}/admin/api/notify-submission`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-admin-secret': adminSecret,
                },
                body: JSON.stringify({
                    action: 'create',
                    type: 'sale',
                    id: payment.id,
                    name: 'New Sale',
                    email: customerId,
                }),
            }).catch(err => console.warn('[store/payment/verify] Failed to notify admin panel:', err.message));
        } catch (notifyErr) {
            console.warn('[store/payment/verify] Could not trigger admin notification:', notifyErr);
        }

        return NextResponse.json({
            success: true,
            payment: {
                id: payment.id,
                orderId: payment.orderId,
                reference: payment.reference,
                amount: payment.amount,
                status: payment.status,
                provider: payment.provider,
            },
            message: 'Payment verified successfully',
        });
    } catch (error) {
        console.error('[Store Payment Verify]', error);
        return NextResponse.json(
            { error: 'Payment verification failed' },
            { status: 500 }
        );
    }
}
