'use client';

import React, { useEffect, useState } from 'react';
import StoreLayout from '@/components/store/StoreLayout';
import Link from 'next/link';

interface P { id: number; name: string; slug: string; price: number; price_usd: number | null; thumbnail: string | null; images: string[]; flash_sale?: number }

export default function FlashSalePage() {
  const [products, setProducts] = useState<P[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    fetch('/api/store/products?flashsale=1')
      .then((r) => r.json())
      .then((d) => {
        if (!mounted) return;
        setProducts(Array.isArray(d?.products) ? d.products : []);
      })
      .catch(() => { if (mounted) setProducts([]); })
      .finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, []);

  return (
    <StoreLayout>
      <div className="py-4">
        <h1 className="text-2xl font-bold mb-3">Flash Sale</h1>
        <p className="text-sm text-[var(--st-muted)] mb-6">Limited-time deals on selected products. Prices and availability subject to change.</p>

        {loading ? (
          <p>Loading deals…</p>
        ) : products.length === 0 ? (
          <div className="st-card p-6 text-center">No flash sale items are available right now.</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {products.map((p) => (
              <Link key={p.id} href={`/store/products/${p.slug}`} className="st-card p-3 block hover:shadow-md">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.thumbnail || (p.images && p.images[0]) || '/placeholder.png'} alt={p.name} className="w-full h-36 object-cover rounded-md mb-3" />
                <div className="font-semibold truncate">{p.name}</div>
                <div className="text-[var(--st-teal)] font-bold mt-1">{p.price ? '₦' + Number(p.price).toLocaleString() : ''}{p.price_usd ? (p.price ? ' · ' : '') + '$' + Number(p.price_usd).toFixed(2) : ''}</div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </StoreLayout>
  );
}
