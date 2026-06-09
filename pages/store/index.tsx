'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import StoreShell from '@/components/store/StoreShell';
import ProductCard from '@/components/store/ProductCard';
import { api, type StoreProduct, type Category, type Brand } from '@/components/store/lib';
import { FiArrowRight, FiTruck, FiShield, FiCreditCard, FiHeadphones } from 'react-icons/fi';

const CAT_ICON: Record<string, string> = {
    laptops: '💻', desktops: '🖥️', servers: '🗄️', phones: '📱',
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
                        <p className="text-[var(--st-muted)] mt-4 max-w-md">Laptops, desktops, enterprise servers, flagship phones and accessories — all in one trusted Nigerian store.</p>
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
