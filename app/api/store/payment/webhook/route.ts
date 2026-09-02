import { NextRequest, NextResponse } from 'next/server';
import { getStoreOrderByRef, updateStoreOrderStatus, updateStorePaymentStatus, verifyStorePayment } from '@/lib/db/store-helpers';
import { verifyGatewayPayment } from '@/lib/payments/store-gateway';
import * as webhookHelpers from '@/lib/payments/webhook';

export async function POST(request: NextRequest) {
  try {
    const raw = await request.text().catch(() => '');

    // Try to parse JSON but keep raw for signature verification
    let body: any = {};
    try { body = raw ? JSON.parse(raw) : {}; } catch { body = {}; }

    const providerHint = String(body.provider || body.event || '').toLowerCase();
    const provider = providerHint || (request.headers.get('user-agent') || '').toLowerCase().includes('paystack') ? 'paystack' : providerHint || 'manual';

    const reference = String(body.reference || body.data?.reference || body.data?.tx_ref || body.tx_ref || '').trim();
    const transactionId = String(body.transactionId || body.data?.id || body.data?.transaction_id || body.data?.txid || '').trim();
    const amount = Number(body.amount ?? body.data?.amount ?? 0);
    const currency = String(body.currency || body.data?.currency || 'NGN');
    const orderRef = String(body.order_ref || body.data?.metadata?.order_ref || body.metadata?.order_ref || '').trim();

    // Verify webhook signature if available
    let verifiedSignature = true;
    if (provider.includes('paystack')) {
      const sig = request.headers.get('x-paystack-signature') || undefined;
      verifiedSignature = webhookHelpers.verifyPaystackSignature(raw, sig, process.env.PAYSTACK_WEBHOOK_SECRET);
    } else if (provider.includes('flutter')) {
      const sig = request.headers.get('verif-hash') || undefined;
      verifiedSignature = webhookHelpers.verifyFlutterwaveSignature(raw, sig, process.env.FLUTTERWAVE_WEBHOOK_SECRET);
    }

    if (!verifiedSignature) {
      console.warn('[Store Payment Webhook] signature verification failed for provider', provider);
      return NextResponse.json({ success: false, message: 'Invalid webhook signature.' }, { status: 400 });
    }

    // Idempotency: prefer DB-backed detection when transactionId exists
    if (transactionId) {
      const existingPayment = await verifyStorePayment(transactionId);
      if (existingPayment && existingPayment.status === 'completed') {
        return NextResponse.json({ success: true, message: 'Already processed (transaction completed).' });
      }
    }

    // Idempotency fallback: in-memory processed events for non-transactional payloads
    const eventKey = transactionId || reference || `${provider}:${orderRef}:${amount}`;
    if (webhookHelpers.isProcessed(eventKey)) {
      return NextResponse.json({ success: true, message: 'Already processed (idempotent).' });
    }

    // Perform verification against gateway if needed
    const verification = await verifyGatewayPayment({ provider, reference: reference || transactionId, transactionId: transactionId || reference, amount, currency });
    if (!verification.success) {
      return NextResponse.json({ success: false, message: verification.message || 'Payment verification failed.' }, { status: 400 });
    }

    const order = orderRef ? await getStoreOrderByRef(orderRef) : null;
    if (order) {
      await updateStoreOrderStatus(order.id, { status: 'confirmed', paymentStatus: 'completed' });
    }

    if (transactionId || reference) {
      await updateStorePaymentStatus(transactionId || reference, verification.status === 'completed' || verification.status === 'demo_verified' ? 'completed' : 'pending', {
        provider,
        reference,
        transactionId,
        amount,
        currency,
        raw: verification.raw,
      });
    }

    // Mark processed
    webhookHelpers.markProcessed(eventKey);

    return NextResponse.json({ success: true, message: 'Payment webhook processed successfully.', verification });
  } catch (error) {
    console.error('[Store Payment Webhook]', error);
    return NextResponse.json({ success: false, message: 'Failed to process payment webhook.' }, { status: 500 });
  }
}
