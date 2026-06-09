'use client';

import React from 'react';
import Link from 'next/link';
import { useStore } from './StoreContext';
import { displayUnit, formatPrice, type StoreProduct } from './lib';
import { FiHeart, FiGitMerge, FiStar } from 'react-icons/fi';

export default function ProductCard({ product }: { product: StoreProduct }) {
    const { addToCart, toggleCompare, compare, currency, usdRate, toggleWishlist, isWishlisted } = useStore();
    const inCompare = compare.some((p) => p.id === product.id);
    const wished = isWishlisted(product.id);
    const off = product.compare_price && product.compare_price > product.price
        ? Math.round((1 - product.price / product.compare_price) * 100) : 0;

    return (
        <div className="st-card st-hover-card overflow-hidden flex flex-col group">
            <Link href={`/store/products/${product.slug}`} className="relative block aspect-square bg-[var(--st-surface-2)] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={product.thumbnail || product.images?.[0] || ''} alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                {off > 0 && <span className="absolute top-3 left-3 st-badge" style={{ background: 'rgba(239,68,68,.15)', color: '#f87171', borderColor: 'rgba(239,68,68,.3)' }}>-{off}%</span>}
                {product.featured ? <span className="absolute top-3 right-3 st-badge">Featured</span> : null}
            </Link>
            <div className="p-4 flex flex-col flex-1">
                <p className="text-[11px] uppercase tracking-wide text-[var(--st-muted)]">{product.brand_name}</p>
                <Link href={`/store/products/${product.slug}`} className="font-semibold text-sm mt-1 line-clamp-2 hover:text-[var(--st-teal)] transition min-h-[2.5rem]">{product.name}</Link>
                {product.rating ? (
                    <div className="flex items-center gap-1 mt-1 text-xs text-amber-400">
                        <FiStar fill="currentColor" /> <span>{product.rating}</span>
                    </div>
                ) : <div className="h-4" />}
                <div className="mt-2 flex items-end gap-2">
                    <span className="text-lg font-extrabold text-[var(--st-teal)]">{displayUnit(product, currency, usdRate)}</span>
                    {off > 0 && <span className="text-xs text-[var(--st-muted)] line-through">{formatPrice(product.compare_price!, currency, usdRate)}</span>}
                </div>
                <p className={`text-[11px] mt-1 ${product.stock > 0 ? 'text-emerald-400' : 'text-red-400'}`}>{product.stock > 0 ? `In stock (${product.stock})` : 'Out of stock'}</p>
                <div className="mt-3 flex gap-2">
                    <button disabled={product.stock <= 0} onClick={() => addToCart(product)} className="st-btn flex-1 py-2 text-sm">Add to Cart</button>
                    <button onClick={() => toggleCompare(product)} title="Compare" className={`st-btn-ghost px-2.5 ${inCompare ? 'text-[var(--st-teal)] border-[var(--st-teal)]' : ''}`}><FiGitMerge size={16} /></button>
                    <button onClick={() => toggleWishlist(product.id)} title="Wishlist" className={`st-btn-ghost px-2.5 ${wished ? 'text-red-400 border-red-400' : ''}`}><FiHeart size={16} fill={wished ? 'currentColor' : 'none'} /></button>
                </div>
            </div>
        </div>
    );
}
