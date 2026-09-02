'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import StoreShell from '@/components/store/StoreShell';
import ProductCard from '@/components/store/ProductCard';
import { api, type StoreProduct } from '@/components/store/lib';

export default function Page() {
    const [products, setProducts] = useState<StoreProduct[]>([]);
    const [loading, setLoading] = useState(true);

    const router = useRouter();

    useEffect(() => {
        api<{ products: StoreProduct[]; store_settings?: any }>('/api/store/products')
            .then((d) => {
                const settings = d.store_settings || {};
                // If backend Black Friday toggle is off, don't show this page — redirect to store
                if (!settings.black_friday_active) {
                    router.replace('/store');
                    return;
                }
                const promos = (d.products || []).filter((p) => p.promotion === 'black_friday');
                setProducts(promos);
            })
            .catch(() => { })
            .finally(() => setLoading(false));
    }, [router]);

    return (
        <StoreShell title="Black Friday">
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">Black Friday</h1>
                {loading ? <p>Loading Black Friday products…</p> : (
                    products.length === 0 ? <p className="text-sm text-[var(--st-muted)]">No Black Friday deals right now.</p> : (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {products.map((p) => <ProductCard key={p.id} product={p} />)}
                        </div>
                    )
                )}
            </div>
        </StoreShell>
    );
}
