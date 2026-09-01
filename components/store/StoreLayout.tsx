'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from '@/lib/routerCompat';
import { useStore } from './StoreContext';
import { displayUnit, formatPrice } from './lib';
import { FiShoppingCart, FiSearch, FiUser, FiHeart, FiX, FiTrash2, FiMenu, FiGitMerge } from 'react-icons/fi';
import Container from '@/components/Container';

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
            <header className="store-header" aria-label="Store header">
                <Container className="flex items-center justify-between py-4">
                    <div className="flex items-center gap-4">
                        <Link href="/store" className="inline-flex items-center gap-3" aria-label="Go to store home">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src="/techlogo.svg" alt="Grey TechStore" className="h-10 w-auto" />
                        </Link>
                    </div>

                    <nav className="hidden lg:flex items-center gap-6" aria-label="Store main navigation">
                        {NAV.map((n) => (
                            <Link key={n.href} href={n.href} className="st-link font-medium text-sm">{n.label}</Link>
                        ))}
                    </nav>

                    <div className="flex items-center gap-3 ml-4">
                        <form onSubmit={search} className="flex items-center bg-[var(--st-surface-2)] rounded-full overflow-hidden px-2 py-1" role="search" aria-label="Search products">
                            <input value={q} onChange={(e) => setQ((e.target as HTMLInputElement).value)} placeholder="Search products, categories, brands" className="st-input bg-transparent border-0 px-2 py-1 text-sm" aria-label="Search products" />
                            <button type="submit" className="st-btn px-3 py-1" aria-label="Search"><FiSearch /></button>
                        </form>

                        <CurrencyToggle />
                        <button onClick={() => setCartOpen(true)} className="relative st-link" aria-label="Open cart">
                            <FiShoppingCart />
                            {cartCount > 0 && <span className="absolute -top-2 -right-2 bg-[var(--st-teal)] text-black rounded-full text-xs px-2">{cartCount}</span>}
                        </button>
                        <Link href="/store/account" className="st-link ml-1" aria-label="Account"><FiUser /></Link>
                        <button className="md:hidden st-link ml-1" onClick={() => setMenuOpen(true)} aria-label="Open menu"><FiMenu /></button>
                    </div>
                </Container>
            </header>

            {/* Mobile menu overlay */}
            {menuOpen && (
                <div className="fixed inset-0 z-[130]">
                    <div className="absolute inset-0 bg-black/50" onClick={() => setMenuOpen(false)} />
                    <aside className="absolute left-0 top-0 w-full max-w-xs h-full bg-[var(--st-surface)] p-5 st-fade">
                        <div className="flex items-center justify-between mb-4">
                            <Link href="/store" className="inline-flex items-center gap-3" onClick={() => setMenuOpen(false)}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src="/techlogo.svg" alt="Grey TechStore" className="h-8 w-auto" />
                            </Link>
                            <button onClick={() => setMenuOpen(false)} className="st-link" aria-label="Close menu"><FiX /></button>
                        </div>
                        <nav className="flex flex-col gap-3">
                            {NAV.map((n) => <Link key={n.href} href={n.href} className="st-link py-2" onClick={() => setMenuOpen(false)}>{n.label}</Link>)}
                        </nav>
                        <div className="mt-6">
                            <form onSubmit={(e) => { e.preventDefault(); router.push(`/store/products?search=${encodeURIComponent(q)}`); setMenuOpen(false); }}>
                                <label htmlFor="mobile-search" className="sr-only">Search products</label>
                                <input id="mobile-search" value={q} onChange={(e) => setQ((e.target as HTMLInputElement).value)} placeholder="Search products" className="st-input w-full" />
                            </form>
                        </div>
                    </aside>
                </div>
            )}

            <main><Container className="py-8 min-h-[60vh]">{children}</Container></main>

            <footer className="store-footer mt-16" role="contentinfo">
                        <Container className="py-12 grid md:grid-cols-4 gap-8">
                    <div className="footer-logo">
                        <Link href="/store" className="inline-flex items-center gap-3" aria-label="Grey TechStore home">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src="/techlogo.svg" alt="Grey TechStore" className="h-12 w-auto" />
                        </Link>
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
                </Container>
                <div className="border-t border-[var(--st-border)] py-6 flex flex-col md:flex-row items-center justify-between gap-4 px-4">
                    <div className="text-xs text-[var(--st-muted)]">© {new Date().getFullYear()} Grey InfoTech Limited. All rights reserved.</div>
                    <div className="flex items-center gap-3">
                        <form onSubmit={(e) => { e.preventDefault(); /* TODO: wire subscription */ }} className="subscribe flex items-center">
                            <label htmlFor="subscribe-email" className="sr-only">Subscribe</label>
                            <input id="subscribe-email" type="email" placeholder="Your email" className="st-input" />
                            <button type="submit" className="st-btn ml-2">Subscribe</button>
                        </form>
                        <div className="text-[var(--st-muted)] text-xs">Follow us: <a href="#" className="st-link">Twitter</a> • <a href="#" className="st-link">LinkedIn</a></div>
                    </div>
                </div>
            </div>

            <CartDrawer />
            <CompareBar />
        </div>
    );
}
