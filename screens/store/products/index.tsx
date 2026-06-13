'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { useRouter } from '@/lib/routerCompat';
import StoreShell from '@/components/store/StoreShell';
import ProductCard from '@/components/store/ProductCard';
import { api, type StoreProduct, type Category, type Brand } from '@/components/store/lib';
import { FiFilter, FiX } from 'react-icons/fi';

export default function ProductsPage() {
    const router = useRouter();
    const [all, setAll] = useState<StoreProduct[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [brands, setBrands] = useState<Brand[]>([]);
    const [loading, setLoading] = useState(true);
    const [sort, setSort] = useState('latest');
    const [showFilters, setShowFilters] = useState(false);

    const { category, brand, search, featured } = router.query as Record<string, string>;

    useEffect(() => {
        setLoading(true);
        const params = new URLSearchParams();
        if (category) params.set('category', category);
        if (brand) params.set('brand', brand);
        if (search) params.set('search', search);
        if (featured) params.set('featured', featured);
        if (sort && sort !== 'latest') params.set('sort', sort);
        api<{ products: StoreProduct[]; categories: Category[]; brands: Brand[] }>(`/api/store/products?${params}`)
            .then((d) => { setAll(d.products); setCategories(d.categories); setBrands(d.brands); })
            .finally(() => setLoading(false));
    }, [category, brand, search, featured, sort]);

    const title = useMemo(() => {
        if (search) return `Results for "${search}"`;
        if (featured) return 'Featured Products';
        if (category) return categories.find((c) => c.slug === category)?.name || 'Products';
        if (brand) return brands.find((b) => b.slug === brand)?.name || 'Products';
        return 'All Products';
    }, [search, featured, category, brand, categories, brands]);

    const setFilter = (key: string, val: string | null) => {
        const q = { ...router.query };
        if (val) q[key] = val; else delete q[key];
        delete q.search;
        router.push({ pathname: '/store/products', query: q });
        setShowFilters(false);
    };

    const Sidebar = (
        <aside className="w-full md:w-60 shrink-0 space-y-6">
            <div className="st-card p-5">
                <p className="font-semibold mb-3">Categories</p>
                <ul className="space-y-1.5 text-sm">
                    <li><button onClick={() => setFilter('category', null)} className={`st-link ${!category ? 'text-[var(--st-teal)]' : ''}`}>All Categories</button></li>
                    {categories.map((c) => (
                        <li key={c.id}><button onClick={() => setFilter('category', c.slug)} className={`st-link ${category === c.slug ? 'text-[var(--st-teal)]' : ''}`}>{c.name}</button></li>
                    ))}
                </ul>
            </div>
            <div className="st-card p-5">
                <p className="font-semibold mb-3">Brands</p>
                <ul className="space-y-1.5 text-sm max-h-60 overflow-y-auto">
                    <li><button onClick={() => setFilter('brand', null)} className={`st-link ${!brand ? 'text-[var(--st-teal)]' : ''}`}>All Brands</button></li>
                    {brands.map((b) => (
                        <li key={b.id}><button onClick={() => setFilter('brand', b.slug)} className={`st-link ${brand === b.slug ? 'text-[var(--st-teal)]' : ''}`}>{b.name}</button></li>
                    ))}
                </ul>
            </div>
        </aside>
    );

    return (
        <StoreShell title={title}>
            <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                <div>
                    <h1 className="text-2xl font-bold">{title}</h1>
                    <p className="text-[var(--st-muted)] text-sm mt-1">{loading ? 'Loading…' : `${all.length} product${all.length !== 1 ? 's' : ''}`}</p>
                </div>
                <div className="flex items-center gap-3">
                    <button onClick={() => setShowFilters(true)} className="md:hidden st-btn-ghost px-4 py-2 flex items-center gap-2 text-sm"><FiFilter /> Filters</button>
                    <select value={sort} onChange={(e) => setSort(e.target.value)} className="st-input w-auto py-2 text-sm cursor-pointer">
                        <option value="latest">Latest</option>
                        <option value="price_asc">Price: Low to High</option>
                        <option value="price_desc">Price: High to Low</option>
                        <option value="name">Name A–Z</option>
                    </select>
                </div>
            </div>

            <div className="flex gap-8">
                <div className="hidden md:block">{Sidebar}</div>

                <div className="flex-1">
                    {loading ? (
                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                            {Array.from({ length: 9 }).map((_, i) => <div key={i} className="st-card aspect-[3/4] animate-pulse" />)}
                        </div>
                    ) : all.length === 0 ? (
                        <div className="st-card p-16 text-center text-[var(--st-muted)]">No products found. Try a different filter.</div>
                    ) : (
                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                            {all.map((p) => <ProductCard key={p.id} product={p} />)}
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile filter drawer */}
            {showFilters && (
                <div className="fixed inset-0 z-[120] md:hidden">
                    <div className="absolute inset-0 bg-black/60" onClick={() => setShowFilters(false)} />
                    <div className="absolute left-0 top-0 h-full w-80 max-w-[85%] p-5 overflow-y-auto st-fade" style={{ background: 'var(--st-bg)' }}>
                        <div className="flex justify-between items-center mb-4"><p className="font-bold">Filters</p><button onClick={() => setShowFilters(false)}><FiX size={22} /></button></div>
                        {Sidebar}
                    </div>
                </div>
            )}
        </StoreShell>
    );
}
