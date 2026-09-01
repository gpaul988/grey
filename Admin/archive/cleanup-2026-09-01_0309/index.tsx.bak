'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import StoreShell from '@/components/store/StoreShell';
import ProductCard from '@/components/store/ProductCard';
import { api, type StoreProduct, type Category, type Brand } from '@/components/store/lib';
import { FiArrowRight, FiTruck, FiShield, FiCreditCard, FiHeadphones } from 'react-icons/fi';

const CAT_ICON: Record<string, string> = {
    laptops: '💻', desktops: ' - ️', servers: ' - ️', phones: '📱',
    tablets: '📲', networking: '📡', 'computer-accessories': '⌨️', 'mobile-accessories': '🎧',
};

export default function StoreHome() {
    const [products, setProducts] = useState<StoreProduct[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [brands, setBrands] = useState<Brand[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api<{ products: StoreProduct[]; categories: Category[]; brands: Brand[] }>('/api/store/products')
            .then((d) => { setProducts(d.products); setCategories(d.categories); setBrands(d.brands); })
            .finally(() => setLoading(false));
    }, []);

    const featured = products.filter((p) => p.featured).slice(0, 8);
    const latest = products.slice(0, 8);
    const topRated = [...products].sort((a, b) => Number(b.rating || 0) - Number(a.rating || 0)).slice(0, 4);
    const testimonials = [
        { name: 'Chinedu O.', quote: 'Fast delivery, genuine products, and support that actually knows the tech.', rating: 5 },
        { name: 'Tosin A.', quote: 'The checkout and warranty details made it easy to buy confidently for my office.', rating: 5 },
        { name: 'Grace M.', quote: 'I bought a workstation setup and the team helped me choose the right spec.', rating: 4 },
    ];
    const collections = [
        { title: 'Home Office Setup', desc: 'Work faster with reliable gear', href: '/store/products?category=laptops', emoji: '💼' },
        { title: 'Creator Power', desc: 'Graphics, storage, and speed', href: '/store/products?category=desktops', emoji: '🎨' },
        { title: 'Business Network', desc: 'Secure connectivity and uptime', href: '/store/products?category=networking', emoji: '📡' },
        { title: 'Mobile Essentials', desc: 'Phones, chargers and audio', href: '/store/products?category=mobile-accessories', emoji: '🎧' },
    ];
    const salePromos = [
        { label: 'Flash Sale', value: 'Up to 35% OFF', detail: 'Premium laptops & accessories' },
        { label: 'Bundle & Save', value: 'Buy 2, save 12%', detail: 'Workstation and accessory combos' },
        { label: 'Weekend Drop', value: 'New arrivals', detail: 'Fresh stock from top brands' },
    ];
    const brandSpotlights = [
        { name: 'Apple', slug: 'apple', accent: 'var(--brand-color)' },
        { name: 'Samsung', slug: 'samsung', accent: 'var(--brand-color)' },
        { name: 'Dell', slug: 'dell', accent: 'var(--brand-color)' },
        { name: 'ASUS', slug: 'asus', accent: 'var(--brand-color)' },
    ];
    const stats = [
        { label: 'Products in stock', value: '1,200+' },
        { label: 'Orders delivered', value: '18k+' },
        { label: 'Average rating', value: '4.8/5' },
        { label: 'Support response', value: '< 30 mins' },
    ];

    return (
        <StoreShell>
            {/* Hero */}
            <section className="st-card overflow-hidden relative mb-12" style={{ background: 'linear-gradient(120deg,#0d1b1a,#101722 60%)' }}>
                <div className="grid md:grid-cols-2 items-center">
                    <div className="p-8 md:p-12 st-fade">
                        <span className="st-badge">Nationwide Delivery · Genuine Products</span>
                        <h1 className="text-3xl md:text-5xl font-extrabold mt-4 leading-tight">
                            Power your work with <span className="text-[var(--st-teal)]">premium tech</span>.
                        </h1>
                        <p className="text-[var(--st-muted)] mt-4 max-w-md">Laptops, desktops, enterprise servers, flagship phones and accessories  - all in one trusted Nigerian store.</p>
                        <div className="flex gap-3 mt-7">
                            <Link href="/store/products" className="st-btn px-6 py-3 flex items-center gap-2">Shop Now <FiArrowRight /></Link>
                            <Link href="/store/products?category=laptops" className="st-btn-ghost px-6 py-3">Browse Laptops</Link>
                        </div>
                    </div>
                    <div className="hidden md:block p-8">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=70" alt="Featured laptop" className="rounded-2xl w-full object-cover aspect-[4/3]" />
                    </div>
                </div>
            </section>

            <section className="mb-12">
                <div className="st-sale-banner st-motion-slow rounded-2xl p-5 md:p-7">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <p className="text-xs uppercase tracking-[0.25em] text-[var(--st-teal)]">Limited time offer</p>
                            <h2 className="text-2xl md:text-4xl font-extrabold mt-2">Flash Sale: Premium tech for less.</h2>
                        </div>
                        <div className="flex items-center gap-3 flex-wrap">
                            {salePromos.map((promo) => (
                                <div key={promo.label} className="st-card px-4 py-3 min-w-[150px] bg-[rgba(11,15,20,.45)]">
                                    <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--st-muted)]">{promo.label}</p>
                                    <p className="font-bold mt-1">{promo.value}</p>
                                    <p className="text-[11px] text-[var(--st-muted)]">{promo.detail}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Trust badges */}
            <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                {[
                    { icon: <FiTruck />, t: 'Fast Delivery', s: 'Nationwide shipping' },
                    { icon: <FiShield />, t: 'Genuine Products', s: 'Warranty backed' },
                    { icon: <FiCreditCard />, t: 'Secure Payments', s: 'Paystack · Flutterwave' },
                    { icon: <FiHeadphones />, t: 'Expert Support', s: 'We know tech' },
                ].map((b) => (
                    <div key={b.t} className="st-card p-5 flex items-center gap-3">
                        <span className="text-[var(--st-teal)] text-2xl">{b.icon}</span>
                        <div><p className="font-semibold text-sm">{b.t}</p><p className="text-xs text-[var(--st-muted)]">{b.s}</p></div>
                    </div>
                ))}
            </section>

            {/* Brand spotlight */}
            <section className="mb-12">
                <div className="flex items-center justify-between mb-5">
                    <h2 className="text-2xl font-bold">Brand Spotlight</h2>
                    <Link href="/store/products" className="st-link text-sm">Browse all</Link>
                </div>
                <div className="grid md:grid-cols-4 gap-4">
                    {brandSpotlights.map((brand) => (
                        <Link key={brand.slug} href={`/store/products?brand=${brand.slug}`} className="st-card st-spotlight-card st-hover-card p-5 text-center">
                            <div className="mx-auto mb-3 w-12 h-12 rounded-full flex items-center justify-center font-extrabold text-lg" style={{ background: brand.accent, color: '#04130f' }}>{brand.name.slice(0, 2)}</div>
                            <p className="font-semibold">{brand.name}</p>
                            <p className="text-xs text-[var(--st-muted)] mt-1">Top picks & premium accessories</p>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Categories */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold mb-5">Shop by Category</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {categories.map((c) => (
                        <Link key={c.id} href={`/store/products?category=${c.slug}`} className="st-card st-hover-card p-6 text-center">
                            <div className="text-3xl mb-2">{CAT_ICON[c.slug] || '📦'}</div>
                            <p className="font-semibold text-sm">{c.name}</p>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Featured */}
            <section className="mb-12">
                <div className="flex items-center justify-between mb-5">
                    <h2 className="text-2xl font-bold">Featured Products</h2>
                    <Link href="/store/products?featured=1" className="st-link text-sm flex items-center gap-1">View all <FiArrowRight /></Link>
                </div>
                {loading ? <SkeletonGrid /> : (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {featured.map((p) => <ProductCard key={p.id} product={p} />)}
                    </div>
                )}
            </section>

            {/* Latest */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold mb-5">New Arrivals</h2>
                {loading ? <SkeletonGrid /> : (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {latest.map((p) => <ProductCard key={p.id} product={p} />)}
                    </div>
                )}
            </section>

            {/* Custom bundles & upsells */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold mb-5">Bundle & save</h2>
                <div className="grid md:grid-cols-3 gap-4">
                    {[
                        { title: 'Creator Combo', items: 'MacBook Pro + Logitech MX Keys', tag: 'Save 12%', href: '/store/products?category=laptops' },
                        { title: 'Office Power', items: 'Dell XPS + monitor + keyboard', tag: 'Save 14%', href: '/store/products?category=desktops' },
                        { title: 'On-the-go Pro', items: 'iPhone + AirPods + charger', tag: 'Save 10%', href: '/store/products?category=phones' },
                    ].map((bundle) => (
                        <Link key={bundle.title} href={bundle.href} className="st-bundle-card st-hover-card rounded-2xl p-5 block">
                            <div className="flex items-center justify-between">
                                <span className="st-badge">{bundle.tag}</span>
                                <span className="text-[var(--st-teal)] text-xs uppercase tracking-[0.2em]">Bundle</span>
                            </div>
                            <p className="font-bold text-xl mt-4">{bundle.title}</p>
                            <p className="text-sm text-[var(--st-muted)] mt-2">{bundle.items}</p>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Recommended picks */}
            <section className="mb-12">
                <div className="flex items-center justify-between mb-5">
                    <h2 className="text-2xl font-bold">Recommended for You</h2>
                    <Link href="/store/products?featured=1" className="st-link text-sm">See all</Link>
                </div>
                {loading ? <SkeletonGrid /> : (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {topRated.map((p) => <ProductCard key={p.id} product={p} />)}
                    </div>
                )}
            </section>

            {/* Collection bundles */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold mb-5">Shop by workflow</h2>
                <div className="grid md:grid-cols-4 gap-4">
                    {collections.map((item) => (
                        <Link key={item.title} href={item.href} className="st-card st-hover-card p-5">
                            <div className="text-3xl mb-3">{item.emoji}</div>
                            <p className="font-semibold">{item.title}</p>
                            <p className="text-sm text-[var(--st-muted)] mt-1">{item.desc}</p>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Trust stats */}
            <section className="mb-12">
                <div className="st-card p-6 md:p-8">
                    <div className="grid md:grid-cols-4 gap-4 text-center">
                        {stats.map((stat) => (
                            <div key={stat.label}>
                                <p className="text-2xl font-extrabold text-[var(--st-teal)]">{stat.value}</p>
                                <p className="text-sm text-[var(--st-muted)] mt-1">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Social proof */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold mb-5">Why customers trust GreyTechStore</h2>
                <div className="grid md:grid-cols-3 gap-4">
                    {testimonials.map((item) => (
                        <div key={item.name} className="st-card p-5">
                            <div className="flex text-amber-400 text-sm mb-3">
                                {Array.from({ length: item.rating }).map((_, i) => <span key={i}>★</span>)}
                            </div>
                            <p className="text-[var(--st-muted)] leading-relaxed">“{item.quote}”</p>
                            <p className="mt-4 font-semibold text-sm">{item.name}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Brands */}
            <section className="mb-8">
                <h2 className="text-2xl font-bold mb-5">Top Brands</h2>
                <div className="flex flex-wrap gap-3">
                    {brands.map((b) => (
                        <Link key={b.id} href={`/store/products?brand=${b.slug}`} className="st-btn-ghost px-5 py-2.5 text-sm">{b.name}</Link>
                    ))}
                </div>
            </section>
        </StoreShell>
    );
}

function SkeletonGrid() {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="st-card overflow-hidden">
                    <div className="aspect-square bg-[var(--st-surface-2)] animate-pulse" />
                    <div className="p-4 space-y-2"><div className="h-3 bg-[var(--st-surface-2)] rounded animate-pulse" /><div className="h-3 w-2/3 bg-[var(--st-surface-2)] rounded animate-pulse" /></div>
                </div>
            ))}
        </div>
    );
}
