import { NextRequest, NextResponse } from 'next/server';
import { createStorePayment, getStoreOrderByRef, updateStoreOrderStatus, verifyStorePayment } from '@/lib/db/store-helpers';
import { verifyGatewayPayment } from '@/lib/payments/store-gateway';

export async function POST(request: NextRequest) {
    try {
        const payload = await request.json().catch(() => ({}));
        const orderId = Number(payload.orderId ?? payload.order_id ?? 0);
        const customerId = Number(payload.customerId ?? payload.customer_id ?? 0);
        const reference = String(payload.reference || payload.tx_ref || '').trim();
        const transactionId = String(payload.transactionId || payload.transaction_id || '').trim();
        const amount = Number(payload.amount ?? 0);
        const currency = String(payload.currency || 'NGN');
        const provider = String(payload.provider || 'manual').toLowerCase();
        const paymentMethod = String(payload.paymentMethod || payload.payment_method || provider || 'manual');
        const metadata = payload.metadata || {};
        const orderRef = String(payload.order_ref || payload.orderRef || payload.orderNumber || payload.order_number || '').trim();

        if ((!orderId && !orderRef) || (!reference && !transactionId) || !amount || !provider) {
            return NextResponse.json(
                { error: 'Order reference or ID, payment reference/transaction, amount, and provider are required' },
                { status: 400 }
            );
        }

        const verification = await verifyGatewayPayment({
            provider,
            reference: reference || transactionId,
            transactionId: transactionId || reference,
            amount,
            currency,
        });

        if (!verification.success) {
            return NextResponse.json(
                { error: verification.message || 'Payment verification failed' },
                { status: 400 }
            );
        }

        const existingPayment = await verifyStorePayment(transactionId || reference);
        if (existingPayment) {
            const actualOrderId = orderId || (orderRef ? (await getStoreOrderByRef(orderRef))?.id : 0) || 0;
            if (actualOrderId) {
                await updateStoreOrderStatus(actualOrderId, { status: 'confirmed', paymentStatus: 'completed' });
            }
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

        const actualOrderId = orderId || (orderRef ? (await getStoreOrderByRef(orderRef))?.id : 0) || 0;
        if (actualOrderId) {
            await updateStoreOrderStatus(actualOrderId, { status: 'confirmed', paymentStatus: 'completed' });
        }

        const payment = await createStorePayment({
            orderId: actualOrderId || 1,
            customerId: customerId || 0,
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
                    email: customerId || reference,
                }),
            }).catch((err: any) => console.warn('[store/payment/verify] Failed to notify admin panel:', err?.message || err));
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
