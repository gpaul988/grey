'use client';

import React, { useState, useEffect, useContext, useMemo } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import StoreShell, { ConfigContext } from '@/components/store/StoreShell';
import { useStore } from '@/components/store/StoreContext';
import { api, formatPrice } from '@/components/store/lib';
import { FiTag, FiCheck, FiLock } from 'react-icons/fi';

export default function CheckoutPage() {
    return <StoreShell title="Checkout"><CheckoutInner /></StoreShell>;
}

function CheckoutInner() {
    const router = useRouter();
    const config = useContext(ConfigContext);
    const { cart, cartSubtotal, clearCart, currency, usdRate, customer } = useStore();

    const [form, setForm] = useState({
        first_name: '', last_name: '', email: '', phone: '',
        address: '', city: '', state: '', country: 'Nigeria', notes: '',
        create_account: false, password: '',
        date_of_birth: '', gender: '',
    });
    const [payment, setPayment] = useState('');
    const [coupon, setCoupon] = useState('');
    const [discount, setDiscount] = useState(0);
    const [couponMsg, setCouponMsg] = useState('');
    const [appliedCode, setAppliedCode] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (customer) setForm((f) => ({
            ...f,
            first_name: customer.first_name || '', last_name: customer.last_name || '',
            email: customer.email || '', phone: customer.phone || '',
            address: customer.address || '', city: customer.city || '',
            state: customer.state || '', country: customer.country || 'Nigeria',
        }));
    }, [customer]);

    const shipping = config?.shipping_fee ?? 2500;
    const taxRate = config?.tax_rate ?? 0;
    const tax = Math.round(cartSubtotal * (taxRate / 100));
    const total = Math.max(0, cartSubtotal + shipping + tax - discount);

    const gateways = useMemo(() => {
        const g: { id: string; name: string; desc: string }[] = [];
        if (config?.paystack?.enabled) g.push({ id: 'paystack', name: 'Paystack', desc: 'Card, bank, USSD, transfer' });
        if (config?.flutterwave?.enabled) g.push({ id: 'flutterwave', name: 'Flutterwave', desc: 'Card, bank, mobile money' });
        if (config?.monnify?.enabled) g.push({ id: 'monnify', name: 'Monnify', desc: 'Card & bank transfer' });
        if (config?.bank_transfer?.enabled) g.push({ id: 'bank_transfer', name: 'Direct Bank Transfer', desc: 'Manual transfer — order confirmed after payment' });
        return g;
    }, [config]);

    useEffect(() => { if (gateways.length && !payment) setPayment(gateways[0].id); }, [gateways, payment]);

    const applyCoupon = async () => {
        if (!coupon) return;
        try {
            const r = await api<{ discount: number; code: string }>('/api/store/coupon', { method: 'POST', body: JSON.stringify({ code: coupon, subtotal: cartSubtotal }) });
            setDiscount(r.discount); setAppliedCode(r.code); setCouponMsg(`Coupon ${r.code} applied!`); setError('');
        } catch (e) { setDiscount(0); setAppliedCode(''); setCouponMsg((e as Error).message); }
    };

    const set = (k: string, v: string | boolean) => setForm((f) => ({ ...f, [k]: v }));

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (cart.length === 0) { setError('Your cart is empty.'); return; }
        if (!payment) { setError('Select a payment method.'); return; }
        setSubmitting(true);
        try {
            const res = await api<{ order: { order_number: string; total: number }; payment: { method: string } }>('/api/store/checkout', {
                method: 'POST',
                body: JSON.stringify({
                    items: cart.map((l) => ({ id: l.product.id, quantity: l.quantity })),
                    payment_method: payment,
                    customer_type: customer ? 'account' : (form.create_account ? 'account' : 'guest'),
                    coupon_code: appliedCode || undefined,
                    currency,
                    ...form,
                }),
            });
            const orderNumber = res.order.order_number;
            clearCart();
            await startPayment(payment, orderNumber, res.order.total);
        } catch (e) {
            setError((e as Error).message);
            setSubmitting(false);
        }
    };

    const startPayment = async (method: string, orderNumber: string, _amount: number) => {
        if (method === 'bank_transfer' || method === 'monnify') {
            router.push(`/store/orders/${orderNumber}`);
            return;
        }
        try {
            const init = await api<{ authorization_url?: string; link?: string }>('/api/store/payment/init', {
                method: 'POST', body: JSON.stringify({ reference: orderNumber, gateway: method }),
            });
            const url = init.authorization_url || init.link;
            if (url) { window.location.href = url; return; }
            router.push(`/store/orders/${orderNumber}`);
        } catch (e) {
            setError('Payment init failed: ' + (e as Error).message + '. Your order was created — view it below.');
            router.push(`/store/orders/${orderNumber}`);
        }
    };

    if (cart.length === 0) return (
        <div className="st-card p-16 text-center">
            <p className="text-lg font-semibold">Your cart is empty</p>
            <Link href="/store/products" className="st-btn inline-block px-6 py-3 mt-6">Shop Now</Link>
        </div>
    );

    return (
        <>
            <h1 className="text-2xl font-bold mb-6">Checkout</h1>
            <form onSubmit={submit} className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    {!customer && (
                        <div className="st-card p-4 flex items-center justify-between text-sm">
                            <span className="text-[var(--st-muted)]">Have an account?</span>
                            <Link href={`/store/account/login?next=/store/checkout`} className="text-[var(--st-teal)] font-semibold">Sign in for faster checkout</Link>
                        </div>
                    )}

                    <div className="st-card p-6">
                        <p className="font-bold mb-4">Contact & Delivery Details</p>
                        <div className="grid sm:grid-cols-2 gap-4">
                            <Field label="First name *"><input required value={form.first_name} onChange={(e) => set('first_name', e.target.value)} className="st-input" /></Field>
                            <Field label="Last name *"><input required value={form.last_name} onChange={(e) => set('last_name', e.target.value)} className="st-input" /></Field>
                            <Field label="Email"><input type="email" value={form.email} onChange={(e) => set('email', e.target.value)} className="st-input" placeholder="For order updates & receipt" /></Field>
                            <Field label="Phone *"><input required value={form.phone} onChange={(e) => set('phone', e.target.value)} className="st-input" placeholder="080…" /></Field>
                            <Field label="Address *" full><input required value={form.address} onChange={(e) => set('address', e.target.value)} className="st-input" placeholder="Street, house no." /></Field>
                            <Field label="City"><input value={form.city} onChange={(e) => set('city', e.target.value)} className="st-input" /></Field>
                            <Field label="State"><input value={form.state} onChange={(e) => set('state', e.target.value)} className="st-input" /></Field>
                            <Field label="Country"><input value={form.country} onChange={(e) => set('country', e.target.value)} className="st-input" /></Field>
                            <Field label="Order notes" full><textarea value={form.notes} onChange={(e) => set('notes', e.target.value)} rows={2} className="st-input" placeholder="Delivery instructions (optional)" /></Field>
                        </div>

                        {!customer && (
                            <div className="mt-4 border-t border-[var(--st-border)] pt-4">
                                <label className="flex items-center gap-2 text-sm cursor-pointer">
                                    <input type="checkbox" checked={form.create_account} onChange={(e) => set('create_account', e.target.checked)} className="accent-[var(--st-teal)]" />
                                    Create an account for faster future checkout
                                </label>
                                {form.create_account && (
                                    <div className="grid sm:grid-cols-2 gap-4 mt-3">
                                        <Field label="Password *"><input type="password" required={form.create_account} value={form.password} onChange={(e) => set('password', e.target.value)} className="st-input" placeholder="Min 6 characters" /></Field>
                                        <Field label="Date of birth"><input type="date" value={form.date_of_birth} onChange={(e) => set('date_of_birth', e.target.value)} className="st-input" /></Field>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Payment */}
                    <div className="st-card p-6">
                        <p className="font-bold mb-4">Payment Method</p>
                        {gateways.length === 0 && <p className="text-[var(--st-muted)] text-sm">No payment methods are currently enabled. Please contact us.</p>}
                        <div className="space-y-3">
                            {gateways.map((g) => (
                                <label key={g.id} className={`flex items-center gap-3 st-card p-4 cursor-pointer transition ${payment === g.id ? 'border-[var(--st-teal)]' : ''}`}>
                                    <input type="radio" name="payment" checked={payment === g.id} onChange={() => setPayment(g.id)} className="accent-[var(--st-teal)]" />
                                    <div className="flex-1">
                                        <p className="font-semibold text-sm">{g.name}</p>
                                        <p className="text-xs text-[var(--st-muted)]">{g.desc}</p>
                                    </div>
                                    {payment === g.id && <FiCheck className="text-[var(--st-teal)]" />}
                                </label>
                            ))}
                        </div>
                        {payment === 'bank_transfer' && config?.bank_transfer && (
                            <div className="mt-4 st-card p-4 text-sm space-y-1" style={{ background: 'var(--st-surface-2)' }}>
                                <p className="font-semibold text-[var(--st-teal)]">Bank Transfer Details</p>
                                <p>Bank: {config.bank_transfer.bank_name || '—'}</p>
                                <p>Account: {config.bank_transfer.account_number || '—'}</p>
                                <p>Name: {config.bank_transfer.account_name || '—'}</p>
                                <p className="text-[var(--st-muted)] text-xs mt-1">Use your order number as the transfer reference. We confirm & ship once payment reflects.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Summary */}
                <div className="st-card p-6 h-fit space-y-4 sticky top-24">
                    <p className="font-bold text-lg">Order Summary</p>
                    <div className="space-y-3 max-h-52 overflow-y-auto">
                        {cart.map((l) => (
                            <div key={l.product.id} className="flex gap-3 text-sm">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={l.product.thumbnail || ''} alt="" className="w-12 h-12 rounded-lg object-cover" />
                                <div className="flex-1 min-w-0"><p className="truncate">{l.product.name}</p><p className="text-[var(--st-muted)]">×{l.quantity}</p></div>
                                <span>{formatPrice(l.product.price * l.quantity, currency, usdRate)}</span>
                            </div>
                        ))}
                    </div>

                    <div className="flex gap-2">
                        <div className="relative flex-1">
                            <FiTag className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--st-muted)]" />
                            <input value={coupon} onChange={(e) => setCoupon(e.target.value.toUpperCase())} placeholder="Coupon code" className="st-input pl-9" />
                        </div>
                        <button type="button" onClick={applyCoupon} className="st-btn-ghost px-4 text-sm">Apply</button>
                    </div>
                    {couponMsg && <p className={`text-xs ${discount > 0 ? 'text-[var(--st-teal)]' : 'text-red-400'}`}>{couponMsg}</p>}

                    <div className="border-t border-[var(--st-border)] pt-4 space-y-2 text-sm">
                        <div className="flex justify-between"><span className="text-[var(--st-muted)]">Subtotal</span><span>{formatPrice(cartSubtotal, currency, usdRate)}</span></div>
                        <div className="flex justify-between"><span className="text-[var(--st-muted)]">Shipping</span><span>{formatPrice(shipping, currency, usdRate)}</span></div>
                        {tax > 0 && <div className="flex justify-between"><span className="text-[var(--st-muted)]">Tax ({taxRate}%)</span><span>{formatPrice(tax, currency, usdRate)}</span></div>}
                        {discount > 0 && <div className="flex justify-between text-[var(--st-teal)]"><span>Discount</span><span>-{formatPrice(discount, currency, usdRate)}</span></div>}
                        <div className="flex justify-between font-bold text-base border-t border-[var(--st-border)] pt-2"><span>Total</span><span className="text-[var(--st-teal)]">{formatPrice(total, currency, usdRate)}</span></div>
                    </div>

                    {error && <p className="text-red-400 text-sm">{error}</p>}
                    <button disabled={submitting || gateways.length === 0} className="st-btn w-full py-3.5 flex items-center justify-center gap-2">
                        <FiLock /> {submitting ? 'Processing…' : `Pay ${formatPrice(total, currency, usdRate)}`}
                    </button>
                    <p className="text-xs text-[var(--st-muted)] text-center">Secure checkout. Your data is protected.</p>
                </div>
            </form>
        </>
    );
}

function Field({ label, children, full }: { label: string; children: React.ReactNode; full?: boolean }) {
    return (
        <label className={`block ${full ? 'sm:col-span-2' : ''}`}>
            <span className="text-xs text-[var(--st-muted)] mb-1 block">{label}</span>
            {children}
        </label>
    );
}
