'use client';

import React, { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from '@/lib/routerCompat';
import StoreShell from '@/components/store/StoreShell';
import ProductCard from '@/components/store/ProductCard';
import { api, type StoreProduct, type Category, type Brand } from '@/components/store/lib';
import { FiFilter, FiSearch, FiX } from 'react-icons/fi';

export default function ProductsPage() {
    const router = useRouter();
    const [all, setAll] = useState<StoreProduct[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [brands, setBrands] = useState<Brand[]>([]);
    const [loading, setLoading] = useState(true);
    const [sort, setSort] = useState('featured');
    const [showFilters, setShowFilters] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [featuredOnly, setFeaturedOnly] = useState(false);
    const [inStockOnly, setInStockOnly] = useState(false);

    const { category, brand, search, featured } = router.query as Record<string, string>;

    useEffect(() => {
        setLoading(true);
        const params = new URLSearchParams();
        if (category) params.set('category', category);
        if (brand) params.set('brand', brand);
        if (search) params.set('search', search);
        if (featured) params.set('featured', featured);
        if (sort && sort !== 'featured') params.set('sort', sort);
        api<{ products: StoreProduct[]; categories: Category[]; brands: Brand[] }>(`/api/store/products?${params}`)
            .then((d) => { setAll(d.products); setCategories(d.categories); setBrands(d.brands); })
            .finally(() => setLoading(false));
    }, [category, brand, search, featured, sort]);

    useEffect(() => {
        setSearchInput(search || '');
        setFeaturedOnly(Boolean(featured));
    }, [search, featured]);

    const filteredProducts = useMemo(() => {
        let items = [...all];
        if (featuredOnly) items = items.filter((product) => Number(product.featured) === 1);
        if (inStockOnly) items = items.filter((product) => product.stock > 0);
        if (searchInput.trim()) {
            const q = searchInput.toLowerCase();
            items = items.filter((product) =>
                product.name.toLowerCase().includes(q) ||
                (product.description || '').toLowerCase().includes(q) ||
                (product.brand_name || '').toLowerCase().includes(q)
            );
        }

        switch (sort) {
            case 'price_asc':
                items.sort((a, b) => a.price - b.price);
                break;
            case 'price_desc':
                items.sort((a, b) => b.price - a.price);
                break;
            case 'rating_desc':
                items.sort((a, b) => (Number(b.rating || 0) - Number(a.rating || 0)) || (b.stock - a.stock));
                break;
            case 'newest':
                items.sort((a, b) => (b.id - a.id));
                break;
            case 'featured':
                items.sort((a, b) => Number(b.featured) - Number(a.featured));
                break;
            default:
                items.sort((a, b) => Number(b.featured) - Number(a.featured));
        }

        return items;
    }, [all, featuredOnly, inStockOnly, searchInput, sort]);

    const title = useMemo(() => {
        if (search) return `Results for "${search}"`;
        if (featured) return 'Featured Products';
        if (category) return categories.find((c) => c.slug === category)?.name || 'Products';
        if (brand) return brands.find((b) => b.slug === brand)?.name || 'Products';
        return 'All Products';
    }, [search, featured, category, brand, categories, brands]);

    const suggestions = useMemo(() => [
        ...categories.slice(0, 5).map((item) => ({ label: item.name, href: `/store/products?category=${item.slug}` })),
        ...brands.slice(0, 5).map((item) => ({ label: item.name, href: `/store/products?brand=${item.slug}` })),
    ], [categories, brands]);

    const buildFilterHref = (key: string, val: string | null) => {
        const q = { ...router.query };
        if (val) q[key] = val; else delete q[key];
        delete q.search;
        delete q.featured;
        const params = new URLSearchParams();
        for (const [k, v] of Object.entries(q)) {
            if (v == null || v === '') continue;
            params.set(k, Array.isArray(v) ? String(v[0] ?? '') : String(v));
        }
        const query = params.toString();
        return query ? `/store/products?${query}` : '/store/products';
    };

    const submitSearch = (e?: React.FormEvent) => {
        e?.preventDefault();
        const q = searchInput.trim();
        if (!q) {
            router.push('/store/products');
            return;
        }
        router.push(`/store/products?search=${encodeURIComponent(q)}`);
        setShowFilters(false);
    };

    const clearFilters = () => {
        setSearchInput('');
        setFeaturedOnly(false);
        setInStockOnly(false);
        setSort('featured');
        router.push('/store/products');
    };

    const Sidebar = (
        <aside className="w-full md:w-60 shrink-0 space-y-6">
            <div className="st-card p-5">
                <p className="font-semibold mb-3">Search</p>
                <form onSubmit={submitSearch} className="relative">
                    <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--st-muted)]" />
                    <input value={searchInput} onChange={(e) => setSearchInput(e.target.value)} placeholder="Search products" className="st-input pl-9" />
                </form>
            </div>
            <div className="st-card p-5">
                <p className="font-semibold mb-3">Quick filters</p>
                <div className="space-y-2 text-sm">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" checked={featuredOnly} onChange={(e) => setFeaturedOnly(e.target.checked)} className="accent-[var(--st-teal)]" />
                        Featured only
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" checked={inStockOnly} onChange={(e) => setInStockOnly(e.target.checked)} className="accent-[var(--st-teal)]" />
                        In stock only
                    </label>
                </div>
            </div>
            <div className="st-card p-5">
                <p className="font-semibold mb-3">Categories</p>
                <ul className="space-y-1.5 text-sm">
                    <li>
                        <Link href={buildFilterHref('category', null)} onClick={() => setShowFilters(false)} className={`st-link ${!category ? 'text-[var(--st-teal)]' : ''}`}>
                            All Categories
                        </Link>
                    </li>
                    {categories.map((c) => (
                        <li key={c.id}>
                            <Link href={buildFilterHref('category', c.slug)} onClick={() => setShowFilters(false)} className={`st-link ${category === c.slug ? 'text-[var(--st-teal)]' : ''}`}>
                                {c.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="st-card p-5">
                <p className="font-semibold mb-3">Brands</p>
                <ul className="space-y-1.5 text-sm max-h-60 overflow-y-auto">
                    <li>
                        <Link href={buildFilterHref('brand', null)} onClick={() => setShowFilters(false)} className={`st-link ${!brand ? 'text-[var(--st-teal)]' : ''}`}>
                            All Brands
                        </Link>
                    </li>
                    {brands.map((b) => (
                        <li key={b.id}>
                            <Link href={buildFilterHref('brand', b.slug)} onClick={() => setShowFilters(false)} className={`st-link ${brand === b.slug ? 'text-[var(--st-teal)]' : ''}`}>
                                {b.name}
                            </Link>
                        </li>
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
                    <p className="text-[var(--st-muted)] text-sm mt-1">{loading ? 'Loading…' : `${filteredProducts.length} product${filteredProducts.length !== 1 ? 's' : ''}`}</p>
                </div>
                <div className="flex items-center gap-3">
                    <button onClick={() => setShowFilters(true)} className="md:hidden st-btn-ghost px-4 py-2 flex items-center gap-2 text-sm"><FiFilter /> Filters</button>
                    <select value={sort} onChange={(e) => setSort(e.target.value)} className="st-input w-auto py-2 text-sm cursor-pointer">
                        <option value="featured">Featured</option>
                        <option value="newest">Newest</option>
                        <option value="price_asc">Price: Low to High</option>
                        <option value="price_desc">Price: High to Low</option>
                        <option value="rating_desc">Highest Rated</option>
                    </select>
                </div>
            </div>

            {!loading && suggestions.length > 0 && !category && !brand && !search && (
                <div className="mb-6 flex flex-wrap gap-2">
                    {suggestions.map((item) => (
                        <Link key={`${item.label}-${item.href}`} href={item.href} className="st-btn-ghost px-3 py-2 text-xs">{item.label}</Link>
                    ))}
                </div>
            )}

            <div className="flex gap-8">
                <div className="hidden md:block">{Sidebar}</div>

                <div className="flex-1">
                    {loading ? (
                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                            {Array.from({ length: 9 }).map((_, i) => <div key={i} className="st-card aspect-[3/4] animate-pulse" />)}
                        </div>
                    ) : filteredProducts.length === 0 ? (
                        <div className="st-card p-12 text-center">
                            <p className="text-xl font-semibold">No products match your filters.</p>
                            <p className="text-[var(--st-muted)] mt-2">Try another category, a brand, or clear your search.</p>
                            <div className="mt-5 flex flex-wrap justify-center gap-2">
                                {suggestions.slice(0, 4).map((item) => (
                                    <Link key={`empty-${item.href}`} href={item.href} className="st-btn-ghost px-3 py-2 text-xs">{item.label}</Link>
                                ))}
                                <button type="button" onClick={clearFilters} className="st-btn px-4 py-2 text-xs">Clear filters</button>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                            {filteredProducts.map((p) => <ProductCard key={p.id} product={p} />)}
                        </div>
                    )}
                </div>
            </div>

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
