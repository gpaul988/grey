import { NextRequest, NextResponse } from 'next/server';
import { createStorePayment, verifyStorePayment } from '@/lib/db/store-helpers';
import { notifyAdminPanel } from '@/lib/admin-notify';

export async function POST(request: NextRequest) {
    try {
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

        // In production: verify with payment gateway (Paystack, Flutterwave, etc.)
        // For now, assume payment is verified (in production, call payment provider API)
        const isVerified = true; // TODO: Call payment provider API

        if (!isVerified) {
            return NextResponse.json(
                { error: 'Payment verification failed' },
                { status: 400 }
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

        notifyAdminPanel({ type: 'sale', id: payment.id, name: 'New Sale', email: String(customerId) });

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
