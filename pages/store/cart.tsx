'use client';

import React from 'react';
import Link from 'next/link';
import StoreShell from '@/components/store/StoreShell';
import { useStore } from '@/components/store/StoreContext';
import { displayUnit, formatPrice } from '@/components/store/lib';
import { FiTrash2, FiMinus, FiPlus, FiArrowRight, FiShoppingBag } from 'react-icons/fi';

export default function CartPage() {
    return <StoreShell title="Cart"><CartInner /></StoreShell>;
}

function CartInner() {
    const { cart, removeFromCart, setQty, cartSubtotal, currency, usdRate } = useStore();

    if (cart.length === 0) return (
        <div className="st-card p-16 text-center">
            <FiShoppingBag className="mx-auto text-5xl text-[var(--st-muted)] mb-4" />
            <p className="text-lg font-semibold">Your cart is empty</p>
            <p className="text-[var(--st-muted)] mt-1">Browse our products and add something you love.</p>
            <Link href="/store/products" className="st-btn inline-block px-6 py-3 mt-6">Shop Now</Link>
        </div>
    );

    return (
        <>
            <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                    {cart.map((l) => (
                        <div key={l.product.id} className="st-card p-4 flex gap-4">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={l.product.thumbnail || l.product.images?.[0] || ''} alt={l.product.name} className="w-24 h-24 rounded-xl object-cover bg-[var(--st-surface-2)]" />
                            <div className="flex-1 min-w-0">
                                <Link href={`/store/products/${l.product.slug}`} className="font-semibold hover:text-[var(--st-teal)]">{l.product.name}</Link>
                                <p className="text-xs text-[var(--st-muted)]">{l.product.brand_name}</p>
                                <p className="text-[var(--st-teal)] font-bold mt-1">{displayUnit(l.product, currency, usdRate)}</p>
                                <div className="flex items-center gap-3 mt-2">
                                    <div className="flex items-center st-card">
                                        <button onClick={() => setQty(l.product.id, l.quantity - 1)} className="px-2.5 py-1.5 st-link"><FiMinus size={14} /></button>
                                        <span className="w-8 text-center text-sm">{l.quantity}</span>
                                        <button onClick={() => setQty(l.product.id, l.quantity + 1)} className="px-2.5 py-1.5 st-link"><FiPlus size={14} /></button>
                                    </div>
                                    <button onClick={() => removeFromCart(l.product.id)} className="st-link flex items-center gap-1 text-sm"><FiTrash2 size={14} /> Remove</button>
                                </div>
                            </div>
                            <div className="text-right font-bold shrink-0">{formatPrice(l.product.price * l.quantity, currency, usdRate)}</div>
                        </div>
                    ))}
                </div>

                <div className="st-card p-6 h-fit space-y-4">
                    <p className="font-bold text-lg">Order Summary</p>
                    <div className="flex justify-between text-sm"><span className="text-[var(--st-muted)]">Subtotal</span><span>{formatPrice(cartSubtotal, currency, usdRate)}</span></div>
                    <div className="flex justify-between text-sm"><span className="text-[var(--st-muted)]">Shipping</span><span>Calculated at checkout</span></div>
                    <div className="border-t border-[var(--st-border)] pt-4 flex justify-between font-bold"><span>Total</span><span className="text-[var(--st-teal)]">{formatPrice(cartSubtotal, currency, usdRate)}</span></div>
                    <Link href="/store/checkout" className="st-btn block text-center py-3 flex items-center justify-center gap-2">Proceed to Checkout <FiArrowRight /></Link>
                    <Link href="/store/products" className="st-link block text-center text-sm">Continue Shopping</Link>
                </div>
            </div>
        </>
    );
}
