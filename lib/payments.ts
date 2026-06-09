import { StoreSettings, Orders, Coupons } from '../Admin/models';

export interface GatewayResult {
    success: boolean;
    reference: string;
    amount?: number;
    raw?: unknown;
    error?: string;
}

/** Mark an order paid + decrement stock + bump coupon usage (idempotent-ish). */
export function markOrderPaid(orderNumber: string, gateway: string, reference: string, raw?: unknown): void {
    const order = Orders.findByNumber(orderNumber);
    if (!order) return;
    if (order.payment_status === 'paid') return; // already handled
    Orders.updatePayment(order.id, {
        payment_status: 'paid',
        payment_method: order.payment_method || gateway,
        payment_gateway: gateway,
        payment_ref: reference,
        payment_data: raw ?? {},
    });
    Orders.updateStatus(order.id, 'confirmed');
    if (order.coupon_code) {
        try { Coupons.incrementUsage(order.coupon_code); } catch { /* noop */ }
    }
}

export function markOrderFailed(orderNumber: string, gateway: string, raw?: unknown): void {
    const order = Orders.findByNumber(orderNumber);
    if (!order || order.payment_status === 'paid') return;
    Orders.updatePayment(order.id, {
        payment_status: 'failed',
        payment_gateway: gateway,
        payment_data: raw ?? {},
    });
}

export function settings(): Record<string, string> {
    return StoreSettings.getAll();
}

// ─── Paystack ──────────────────────────────────────────────────────────────────

export async function paystackInit(opts: {
    email: string; amount: number; reference: string; callback_url: string; currency?: string;
}): Promise<{ authorization_url: string; access_code: string; reference: string }> {
    const s = settings();
    const secret = s['payment.paystack.secret_key'];
    if (!secret) throw new Error('Paystack not configured');
    const resp = await fetch('https://api.paystack.co/transaction/initialize', {
        method: 'POST',
        headers: { Authorization: `Bearer ${secret}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email: opts.email,
            amount: Math.round(opts.amount * 100), // kobo
            reference: opts.reference,
            callback_url: opts.callback_url,
            currency: opts.currency || 'NGN',
        }),
    });
    const data = await resp.json();
    if (!data.status) throw new Error(data.message || 'Paystack init failed');
    return data.data;
}

export async function paystackVerify(reference: string): Promise<GatewayResult> {
    const s = settings();
    const secret = s['payment.paystack.secret_key'];
    if (!secret) return { success: false, reference, error: 'Paystack not configured' };
    const resp = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`, {
        headers: { Authorization: `Bearer ${secret}` },
    });
    const data = await resp.json();
    const ok = data.status && data.data && data.data.status === 'success';
    return { success: !!ok, reference, amount: ok ? data.data.amount / 100 : undefined, raw: data.data };
}

// ─── Flutterwave ────────────────────────────────────────────────────────────────

export async function flutterwaveInit(opts: {
    email: string; name: string; phone: string; amount: number; reference: string; redirect_url: string; currency?: string;
}): Promise<{ link: string }> {
    const s = settings();
    const secret = s['payment.flutterwave.secret_key'];
    if (!secret) throw new Error('Flutterwave not configured');
    const resp = await fetch('https://api.flutterwave.com/v3/payments', {
        method: 'POST',
        headers: { Authorization: `Bearer ${secret}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
            tx_ref: opts.reference,
            amount: opts.amount,
            currency: opts.currency || 'NGN',
            redirect_url: opts.redirect_url,
            customer: { email: opts.email || 'guest@grey.store', phonenumber: opts.phone, name: opts.name },
            customizations: { title: s['store.name'] || 'Grey TechStore' },
        }),
    });
    const data = await resp.json();
    if (data.status !== 'success') throw new Error(data.message || 'Flutterwave init failed');
    return data.data;
}

export async function flutterwaveVerifyByTxId(transactionId: string): Promise<GatewayResult> {
    const s = settings();
    const secret = s['payment.flutterwave.secret_key'];
    if (!secret) return { success: false, reference: transactionId, error: 'Flutterwave not configured' };
    const resp = await fetch(`https://api.flutterwave.com/v3/transactions/${encodeURIComponent(transactionId)}/verify`, {
        headers: { Authorization: `Bearer ${secret}` },
    });
    const data = await resp.json();
    const ok = data.status === 'success' && data.data && data.data.status === 'successful';
    return { success: !!ok, reference: ok ? data.data.tx_ref : transactionId, amount: ok ? data.data.amount : undefined, raw: data.data };
}
