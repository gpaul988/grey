'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import StoreShell from '@/components/store/StoreShell';
import { useStore } from '@/components/store/StoreContext';
import { displayUnit } from '@/components/store/lib';
import { FiX, FiGitMerge, FiCheck } from 'react-icons/fi';

export default function ComparePage() {
    return <StoreShell title="Compare"><CompareInner /></StoreShell>;
}

function CompareInner() {
    const { compare, removeCompare, clearCompare, addToCart, currency, usdRate } = useStore();

    const specKeys = useMemo(() => {
        const keys = new Set<string>();
        compare.forEach((p) => Object.keys(p.specs || {}).forEach((k) => keys.add(k)));
        return Array.from(keys);
    }, [compare]);

    if (compare.length === 0) return (
        <div className="st-card p-16 text-center">
            <FiGitMerge className="mx-auto text-5xl text-[var(--st-muted)] mb-4" />
            <p className="text-lg font-semibold">No products to compare</p>
            <p className="text-[var(--st-muted)] mt-1">Add products using the compare button to see them side by side.</p>
            <Link href="/store/products" className="st-btn inline-block px-6 py-3 mt-6">Browse Products</Link>
        </div>
    );

    return (
        <>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">Compare Products</h1>
                <button onClick={clearCompare} className="st-btn-ghost px-4 py-2 text-sm">Clear All</button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full border-collapse min-w-[600px]">
                    <thead>
                        <tr>
                            <th className="text-left p-3 w-40 align-bottom text-[var(--st-muted)] text-sm font-medium">Feature</th>
                            {compare.map((p) => (
                                <th key={p.id} className="p-3 align-top" style={{ minWidth: 200 }}>
                                    <div className="st-card p-4 relative">
                                        <button onClick={() => removeCompare(p.id)} className="absolute top-2 right-2 st-link"><FiX /></button>
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={p.thumbnail || ''} alt={p.name} className="w-full aspect-square object-cover rounded-lg bg-[var(--st-surface-2)] mb-3" />
                                        <Link href={`/store/products/${p.slug}`} className="font-semibold text-sm hover:text-[var(--st-teal)] line-clamp-2 block text-left">{p.name}</Link>
                                        <p className="text-[var(--st-teal)] font-bold mt-1 text-left">{displayUnit(p, currency, usdRate)}</p>
                                        <button onClick={() => addToCart(p)} className="st-btn w-full py-2 text-sm mt-3">Add to Cart</button>
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        <Row label="Brand" cells={compare.map((p) => p.brand_name || '—')} />
                        <Row label="Category" cells={compare.map((p) => p.category_name || '—')} />
                        <Row label="Rating" cells={compare.map((p) => p.rating ? `${p.rating} ★` : '—')} />
                        <Row label="Stock" cells={compare.map((p) => p.stock > 0 ? `${p.stock} available` : 'Out of stock')} />
                        {specKeys.map((k) => (
                            <Row key={k} label={k} cells={compare.map((p) => (p.specs?.[k]) || '—')} />
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

function Row({ label, cells }: { label: string; cells: string[] }) {
    return (
        <tr className="border-b border-[var(--st-border)]">
            <td className="p-3 text-[var(--st-muted)] font-medium">{label}</td>
            {cells.map((c, i) => (
                <td key={i} className="p-3 text-center">
                    {c === '✓' ? <FiCheck className="mx-auto text-[var(--st-teal)]" /> : c}
                </td>
            ))}
        </tr>
    );
}
