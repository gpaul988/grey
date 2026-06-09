'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useStore } from './StoreContext';
import { displayUnit, formatPrice } from './lib';
import { FiShoppingCart, FiSearch, FiUser, FiHeart, FiX, FiTrash2, FiMenu, FiGitMerge } from 'react-icons/fi';

const NAV = [
    { label: 'All Products', href: '/store/products' },
    { label: 'Laptops', href: '/store/products?category=laptops' },
    { label: 'Phones', href: '/store/products?category=phones' },
    { label: 'Servers', href: '/store/products?category=servers' },
    { label: 'Accessories', href: '/store/products?category=computer-accessories' },
];

function CurrencyToggle() {
    const { currency, setCurrency, usdEnabled } = useStore();
    if (!usdEnabled) return null;
    return (
        <div className="flex items-center rounded-full border border-[var(--st-border)] overflow-hidden text-xs font-semibold">
            {(['NGN', 'USD'] as const).map((c) => (
                <button key={c} onClick={() => setCurrency(c)}
                    className={`px-3 py-1.5 transition ${currency === c ? 'bg-[var(--st-teal)] text-[#04130f]' : 'text-[var(--st-muted)] hover:text-[var(--st-teal)]'}`}>
                    {c === 'NGN' ? '₦ NGN' : '$ USD'}
                </button>
            ))}
        </div>
    );
}

function CartDrawer() {
    const { cart, cartOpen, setCartOpen, removeFromCart, setQty, cartSubtotal, currency, usdRate } = useStore();
    if (!cartOpen) return null;
    return (
        <div className="fixed inset-0 z-[120]" role="dialog" aria-modal="true">
            <div className="absolute inset-0 bg-black/60" onClick={() => setCartOpen(false)} />
            <aside className="absolute right-0 top-0 h-full w-full max-w-md st-fade flex flex-col" style={{ background: 'var(--st-surface)', borderLeft: '1px solid var(--st-border)' }}>
                <div className="flex items-center justify-between p-5 border-b border-[var(--st-border)]">
                    <h3 className="text-lg font-bold flex items-center gap-2"><FiShoppingCart /> Your Cart</h3>
                    <button onClick={() => setCartOpen(false)} className="st-link"><FiX size={22} /></button>
                </div>
                <div className="flex-1 overflow-y-auto p-5 space-y-4">
                    {cart.length === 0 && <p className="text-[var(--st-muted)] text-center mt-12">Your cart is empty.</p>}
                    {cart.map((l) => (
                        <div key={l.product.id} className="flex gap-3 st-card p-3">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={l.product.thumbnail || l.product.images?.[0] || ''} alt={l.product.name} className="w-16 h-16 rounded-lg object-cover bg-[var(--st-surface-2)]" />
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold truncate">{l.product.name}</p>
                                <p className="text-[var(--st-teal)] text-sm font-bold">{displayUnit(l.product, currency, usdRate)}</p>
                                <div className="flex items-center gap-2 mt-1">
                                    <button onClick={() => setQty(l.product.id, l.quantity - 1)} className="w-6 h-6 rounded st-btn-ghost text-sm">-</button>
                                    <span className="text-sm w-6 text-center">{l.quantity}</span>
                                    <button onClick={() => setQty(l.product.id, l.quantity + 1)} className="w-6 h-6 rounded st-btn-ghost text-sm">+</button>
                                </div>
                            </div>
                            <button onClick={() => removeFromCart(l.product.id)} className="st-link self-start"><FiTrash2 /></button>
                        </div>
                    ))}
                </div>
                {cart.length > 0 && (
                    <div className="p-5 border-t border-[var(--st-border)] space-y-3">
                        <div className="flex justify-between font-bold">
                            <span>Subtotal</span>
                            <span>{formatPrice(cartSubtotal, currency, usdRate)}</span>
                        </div>
                        <Link href="/store/checkout" onClick={() => setCartOpen(false)} className="st-btn block text-center py-3">Checkout</Link>
                        <Link href="/store/cart" onClick={() => setCartOpen(false)} className="st-btn-ghost block text-center py-2.5 text-sm">View Cart</Link>
                    </div>
                )}
            </aside>
        </div>
    );
}

function CompareBar() {
    const { compare, removeCompare, clearCompare } = useStore();
    const router = useRouter();
    if (compare.length === 0 || router.pathname === '/store/compare') return null;
    return (
        <div className="fixed bottom-0 left-0 right-0 z-[110] st-fade" style={{ background: 'var(--st-surface-2)', borderTop: '1px solid var(--st-border)' }}>
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4 flex-wrap">
                <span className="font-semibold flex items-center gap-2 text-sm"><FiGitMerge /> Compare ({compare.length})</span>
                <div className="flex gap-2 flex-1 overflow-x-auto">
                    {compare.map((p) => (
                        <div key={p.id} className="flex items-center gap-2 st-card px-3 py-1.5 shrink-0">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={p.thumbnail || ''} alt={p.name} className="w-8 h-8 rounded object-cover" />
                            <span className="text-xs max-w-[120px] truncate">{p.name}</span>
                            <button onClick={() => removeCompare(p.id)} className="st-link"><FiX size={14} /></button>
                        </div>
                    ))}
                </div>
                <button onClick={clearCompare} className="st-btn-ghost px-3 py-2 text-xs">Clear</button>
                <Link href="/store/compare" className="st-btn px-5 py-2 text-sm">Compare Now</Link>
            </div>
        </div>
    );
}

export default function StoreLayout({ children }: { children: React.ReactNode }) {
    const { cartCount, setCartOpen, customer } = useStore();
    const router = useRouter();
    const [q, setQ] = useState('');
    const [menuOpen, setMenuOpen] = useState(false);

    const search = (e: React.FormEvent) => {
        e.preventDefault();
        router.push(`/store/products?search=${encodeURIComponent(q)}`);
    };

    return (
        <div className="store-root">
            <header className="sticky top-0 z-[100]" style={{ background: 'rgba(11,15,20,.85)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--st-border)' }}>
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex items-center gap-4 h-16">
                        <button className="md:hidden st-link" onClick={() => setMenuOpen(!menuOpen)}><FiMenu size={22} /></button>
                        <Link href="/store" className="font-extrabold text-xl tracking-tight shrink-0">
                            Grey<span className="text-[var(--st-teal)]">TechStore</span>
                        </Link>
                        <form onSubmit={search} className="hidden md:flex flex-1 max-w-md relative">
                            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search laptops, phones, servers…" className="st-input pr-10" />
                            <button className="absolute right-3 top-1/2 -translate-y-1/2 st-link"><FiSearch /></button>
                        </form>
                        <div className="flex items-center gap-3 ml-auto">
                            <CurrencyToggle />
                            <Link href="/store/account/wishlist" className="st-link hidden sm:block" title="Wishlist"><FiHeart size={20} /></Link>
                            <Link href={customer ? '/store/account' : '/store/account/login'} className="st-link" title="Account"><FiUser size={20} /></Link>
                            <button onClick={() => setCartOpen(true)} className="relative st-link" title="Cart">
                                <FiShoppingCart size={20} />
                                {cartCount > 0 && <span className="absolute -top-2 -right-2 bg-[var(--st-teal)] text-[#04130f] text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">{cartCount}</span>}
                            </button>
                        </div>
                    </div>
                    <nav className={`${menuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row gap-1 md:gap-6 pb-3 md:pb-0 md:h-11 md:items-center text-sm`}>
                        {NAV.map((n) => (
                            <Link key={n.href} href={n.href} className="st-link py-1.5 font-medium">{n.label}</Link>
                        ))}
                        <Link href="/store/compare" className="st-link py-1.5 font-medium md:ml-auto flex items-center gap-1"><FiGitMerge size={14} /> Compare</Link>
                    </nav>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 py-8 min-h-[60vh]">{children}</main>

            <footer style={{ background: 'var(--st-surface)', borderTop: '1px solid var(--st-border)' }} className="mt-16">
                <div className="max-w-7xl mx-auto px-4 py-12 grid md:grid-cols-4 gap-8">
                    <div>
                        <p className="font-extrabold text-lg">Grey<span className="text-[var(--st-teal)]">TechStore</span></p>
                        <p className="text-[var(--st-muted)] text-sm mt-3">Nigeria&apos;s trusted store for laptops, desktops, servers, phones & accessories. Genuine products, nationwide delivery.</p>
                    </div>
                    <div>
                        <p className="font-semibold mb-3">Shop</p>
                        <ul className="space-y-2 text-sm">
                            {NAV.map((n) => <li key={n.href}><Link href={n.href} className="st-link">{n.label}</Link></li>)}
                        </ul>
                    </div>
                    <div>
                        <p className="font-semibold mb-3">Account</p>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/store/account" className="st-link">My Account</Link></li>
                            <li><Link href="/store/account/orders" className="st-link">My Orders</Link></li>
                            <li><Link href="/store/account/wishlist" className="st-link">Wishlist</Link></li>
                            <li><Link href="/store/compare" className="st-link">Compare</Link></li>
                        </ul>
                    </div>
                    <div>
                        <p className="font-semibold mb-3">Support</p>
                        <ul className="space-y-2 text-sm text-[var(--st-muted)]">
                            <li>hello@greyinfotech.com.ng</li>
                            <li>+234 802 809 5571</li>
                            <li>Port Harcourt, Nigeria</li>
                            <li><Link href="/" className="st-link">← Main Website</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-[var(--st-border)] py-5 text-center text-xs text-[var(--st-muted)]">
                    © {new Date().getFullYear()} Grey InfoTech Limited. All rights reserved.
                </div>
            </footer>

            <CartDrawer />
            <CompareBar />
        </div>
    );
}
