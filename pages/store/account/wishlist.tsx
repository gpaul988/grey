'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import StoreShell from '@/components/store/StoreShell';
import ProductCard from '@/components/store/ProductCard';
import { useStore } from '@/components/store/StoreContext';
import { api, type StoreProduct } from '@/components/store/lib';
import { FiHeart } from 'react-icons/fi';

export default function WishlistPage() {
    return <StoreShell title="Wishlist"><WishlistInner /></StoreShell>;
}

function WishlistInner() {
    const router = useRouter();
    const { wishlistIds, customer } = useStore();
    const [products, setProducts] = useState<StoreProduct[]>([]);
    const [loading, setLoading] = useState(true);

    const load = () => {
        api<{ products: StoreProduct[] }>('/api/store/wishlist')
            .then((d) => setProducts(d.products))
            .catch(() => router.replace('/store/account/login?next=/store/account/wishlist'))
            .finally(() => setLoading(false));
    };
    useEffect(load, [router]);
    // re-load when wishlist changes
    useEffect(() => { if (customer) load(); /* eslint-disable-next-line */ }, [wishlistIds.length]);

    if (loading) return <div className="st-card h-64 animate-pulse" />;

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">My Wishlist</h1>
            {products.length === 0 ? (
                <div className="st-card p-16 text-center">
                    <FiHeart className="mx-auto text-5xl text-[var(--st-muted)] mb-4" />
                    <p className="font-semibold">Your wishlist is empty</p>
                    <p className="text-[var(--st-muted)] mt-1">Tap the heart on any product to save it here.</p>
                    <Link href="/store/products" className="st-btn inline-block px-6 py-3 mt-6">Browse Products</Link>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {products.map((p) => <ProductCard key={p.id} product={p} />)}
                </div>
            )}
        </div>
    );
}
