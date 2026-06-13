import type { NextApiRequest, NextApiResponse } from 'next';
import { Products, Customers, Orders, StoreSettings, Coupons } from '../../../Admin/models';
import { getCustomer, setCustomerCookie } from '../../../lib/customerAuth';
import { rateLimit } from '../../../lib/apiGuard';

interface CartItemInput { id: number; quantity: number }

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
    // Throttle order creation per IP to prevent checkout/order spam.
    if (!rateLimit(req, res, { key: 'checkout', limit: 20, windowMs: 10 * 60_000 })) return;

    const {
        items, customer_type, payment_method,
        first_name, last_name, email, phone,
        address, city, state, country, notes,
        create_account, password, coupon_code, currency,
    } = req.body || {};

    if (!Array.isArray(items) || items.length === 0) return res.status(400).json({ error: 'Cart is empty' });
    if (!first_name || !last_name || !phone || !address) {
        return res.status(400).json({ error: 'Name, phone and address are required' });
    }
    if (!payment_method) return res.status(400).json({ error: 'Select a payment method' });

    // Server-side validate products & recompute totals (never trust client prices)
    const lineItems: {
        product_id: number; product_name: string; product_image: string; product_sku: string;
        quantity: number; unit_price: number; total_price: number;
    }[] = [];

    for (const ci of items as CartItemInput[]) {
        const p = Products.find(Number(ci.id));
        if (!p || p.status !== 'active') return res.status(400).json({ error: `Product unavailable (id ${ci.id})` });
        const qty = Math.max(1, parseInt(String(ci.quantity), 10) || 1);
        if (p.stock < qty) return res.status(400).json({ error: `Insufficient stock for ${p.name}` });
        let images: string[] = [];
        try { images = JSON.parse(p.images || '[]'); } catch { /* noop */ }
        lineItems.push({
            product_id: p.id,
            product_name: p.name,
            product_image: p.thumbnail || images[0] || '',
            product_sku: p.sku || '',
            quantity: qty,
            unit_price: p.price,
            total_price: p.price * qty,
        });
    }

    const s = StoreSettings.getAll();
    const subtotal = lineItems.reduce((sum, i) => sum + i.total_price, 0);
    const shipping_fee = parseFloat(s['store.shipping_fee'] || '2500');
    const taxRate = parseFloat(s['store.tax_rate'] || '0');
    const tax = Math.round(subtotal * (taxRate / 100));

    // Coupon (validated server-side against NGN subtotal)
    let discount = 0;
    let appliedCoupon: string | null = null;
    if (coupon_code) {
        const v = Coupons.validate(String(coupon_code), subtotal);
        if (!v.valid) return res.status(400).json({ error: v.reason || 'Invalid coupon' });
        discount = v.discount;
        appliedCoupon = v.coupon!.code;
    }

    const total = Math.max(0, subtotal + shipping_fee + tax - discount);
    const orderCurrency = currency === 'USD' && s['store.usd_enabled'] === '1' ? 'USD' : 'NGN';

    // Customer handling — reuse logged-in session customer if present
    const sessionCustomer = getCustomer(req);
    let customer_id: number | null = sessionCustomer ? sessionCustomer.id : null;
    const cType = sessionCustomer || customer_type === 'account' || create_account ? 'account' : 'guest';

    if (!customer_id && email) {
        const existing = Customers.findByEmail(String(email));
        if (existing) customer_id = existing.id;
    }

    if (customer_id) {
        Customers.update(customer_id, { first_name, last_name, phone, address, city, state, country });
    } else {
        const created = Customers.create({
            first_name, last_name, phone,
            email: email || undefined,
            address, city, state, country: country || 'Nigeria',
            password: create_account && password ? String(password) : undefined,
        });
        customer_id = created.id;
        if (create_account && password) setCustomerCookie(res, customer_id);
    }

    const shippingAddress = { first_name, last_name, phone, email: email || '', address, city, state, country: country || 'Nigeria' };

    const order = Orders.create({
        customer_id,
        customer_type: cType,
        guest_name: `${first_name} ${last_name}`,
        guest_email: email || undefined,
        guest_phone: phone,
        shipping_address: shippingAddress,
        subtotal,
        shipping_fee,
        tax,
        discount,
        total,
        coupon_code: appliedCoupon,
        currency: orderCurrency,
        notes: notes || undefined,
        items: lineItems,
    });

    Orders.updatePayment(order.id, { payment_status: 'pending', payment_method, payment_gateway: payment_method });

    res.json({
        ok: true,
        order: {
            id: order.id,
            order_number: order.order_number,
            email: email || '',
            phone,
            name: `${first_name} ${last_name}`,
            subtotal, shipping_fee, tax, discount, total,
            coupon_code: appliedCoupon,
            currency: orderCurrency,
        },
        payment: {
            method: payment_method,
            amount: total,
            reference: order.order_number,
        },
    });
}
