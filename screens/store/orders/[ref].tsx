'use client';

import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from '@/lib/routerCompat';
import Link from 'next/link';
import StoreShell, { ConfigContext } from '@/components/store/StoreShell';
import { api } from '@/components/store/lib';
import { FiCheckCircle, FiClock, FiXCircle, FiPackage } from 'react-icons/fi';

interface OrderItem { id: number; product_name: string; product_image: string | null; quantity: number; unit_price: number; total_price: number; }
interface Order {
    order_number: string; status: string; payment_status: string; payment_method: string | null;
    subtotal: number; shipping_fee: number; tax: number; discount: number; total: number; currency: string;
    coupon_code: string | null; created_at: string;
    shipping_address: { first_name?: string; last_name?: string; phone?: string; address?: string; city?: string; state?: string };
    items: OrderItem[];
}

export default function OrderPage() {
    return <StoreShell title="Order"><OrderInner /></StoreShell>;
}

function OrderInner() {
    const router = useRouter();
    const config = useContext(ConfigContext);
    const { ref, verify, gateway, reference, transaction_id, trxref } = router.query as Record<string, string>;
    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);
    const [verifying, setVerifying] = useState(false);

    const fmt = (n: number) => {
        if (order?.currency === 'USD') return '$' + n.toLocaleString('en-US', { maximumFractionDigits: 2 });
        return '₦' + Math.round(n).toLocaleString('en-NG');
    };

    const load = async () => {
        if (!ref) return;
        try { const r = await api<{ order: Order }>(`/api/store/orders/${ref}`); setOrder(r.order); }
        catch { setOrder(null); } finally { setLoading(false); }
    };

    useEffect(() => {
        if (!ref) return;
        const runVerify = async () => {
            if (verify === '1' && gateway) {
                setVerifying(true);
                try {
                    const payload: Record<string, string> = { gateway, reference: (reference || trxref || String(ref)) };
                    if (transaction_id) payload.transaction_id = transaction_id;
                    await api('/api/store/payment/verify', { method: 'POST', body: JSON.stringify(payload) });
                } catch { /* ignore — show status from order */ }
                setVerifying(false);
            }
            await load();
        };
        runVerify();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ref, verify, gateway, reference, transaction_id, trxref]);

    if (loading || verifying) return (
        <div className="st-card p-16 text-center">
            <div className="animate-spin w-10 h-10 border-2 border-[var(--st-teal)] border-t-transparent rounded-full mx-auto mb-4" />
            <p className="text-[var(--st-muted)]">{verifying ? 'Verifying your payment…' : 'Loading order…'}</p>
        </div>
    );

    if (!order) return (
        <div className="st-card p-16 text-center">
            <FiXCircle className="mx-auto text-5xl text-red-400 mb-4" />
            <p className="text-lg font-semibold">Order not found</p>
            <Link href="/store/products" className="st-btn inline-block px-6 py-3 mt-6">Continue Shopping</Link>
        </div>
    );

    const paid = order.payment_status === 'paid';
    const failed = order.payment_status === 'failed';
    const a = order.shipping_address || {};

    return (
        <div className="max-w-3xl mx-auto">
            <div className="st-card p-8 text-center mb-6">
                {paid ? <FiCheckCircle className="mx-auto text-5xl text-emerald-400 mb-3" />
                    : failed ? <FiXCircle className="mx-auto text-5xl text-red-400 mb-3" />
                        : <FiClock className="mx-auto text-5xl text-amber-400 mb-3" />}
                <h1 className="text-2xl font-bold">{paid ? 'Payment Successful!' : failed ? 'Payment Failed' : 'Order Placed'}</h1>
                <p className="text-[var(--st-muted)] mt-2">
                    {paid ? 'Thank you! Your order is confirmed and being processed.'
                        : failed ? 'We couldn\'t confirm your payment. You can retry below.'
                            : order.payment_method === 'bank_transfer'
                                ? 'Please complete your bank transfer using the details below. We confirm & ship once payment reflects.'
                                : 'Your order has been placed. Complete payment to confirm.'}
                </p>
                <p className="mt-3"><span className="st-badge">Order #{order.order_number}</span></p>
            </div>

            {!paid && order.payment_method === 'bank_transfer' && config?.bank_transfer && (
                <div className="st-card p-6 mb-6">
                    <p className="font-bold text-[var(--st-teal)] mb-2">Bank Transfer Details</p>
                    <div className="text-sm space-y-1">
                        <p>Bank: <b>{config.bank_transfer.bank_name || '—'}</b></p>
                        <p>Account Number: <b>{config.bank_transfer.account_number || '—'}</b></p>
                        <p>Account Name: <b>{config.bank_transfer.account_name || '—'}</b></p>
                        <p>Amount: <b>{fmt(order.total)}</b></p>
                        <p className="text-[var(--st-muted)] text-xs mt-2">Reference: {order.order_number}</p>
                    </div>
                </div>
            )}

            <div className="st-card p-6 mb-6">
                <p className="font-bold mb-4 flex items-center gap-2"><FiPackage /> Items</p>
                <div className="space-y-3">
                    {order.items.map((it) => (
                        <div key={it.id} className="flex gap-3 text-sm items-center">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={it.product_image || ''} alt="" className="w-12 h-12 rounded-lg object-cover bg-[var(--st-surface-2)]" />
                            <div className="flex-1"><p>{it.product_name}</p><p className="text-[var(--st-muted)]">×{it.quantity}</p></div>
                            <span>{fmt(it.total_price)}</span>
                        </div>
                    ))}
                </div>
                <div className="border-t border-[var(--st-border)] mt-4 pt-4 space-y-2 text-sm">
                    <Line label="Subtotal" v={fmt(order.subtotal)} />
                    <Line label="Shipping" v={fmt(order.shipping_fee)} />
                    {order.tax > 0 && <Line label="Tax" v={fmt(order.tax)} />}
                    {order.discount > 0 && <Line label={`Discount${order.coupon_code ? ` (${order.coupon_code})` : ''}`} v={`-${fmt(order.discount)}`} teal />}
                    <div className="flex justify-between font-bold text-base border-t border-[var(--st-border)] pt-2"><span>Total</span><span className="text-[var(--st-teal)]">{fmt(order.total)}</span></div>
                </div>
            </div>

            <div className="st-card p-6 mb-6">
                <p className="font-bold mb-2">Delivery To</p>
                <p className="text-sm text-[var(--st-muted)]">{a.first_name} {a.last_name} · {a.phone}</p>
                <p className="text-sm text-[var(--st-muted)]">{a.address}{a.city ? `, ${a.city}` : ''}{a.state ? `, ${a.state}` : ''}</p>
            </div>

            <div className="flex gap-3">
                <Link href="/store/products" className="st-btn-ghost flex-1 text-center py-3">Continue Shopping</Link>
                <Link href="/store/account/orders" className="st-btn flex-1 text-center py-3">My Orders</Link>
            </div>
        </div>
    );
}

function Line({ label, v, teal }: { label: string; v: string; teal?: boolean }) {
    return <div className={`flex justify-between ${teal ? 'text-[var(--st-teal)]' : ''}`}><span className={teal ? '' : 'text-[var(--st-muted)]'}>{label}</span><span>{v}</span></div>;
}
