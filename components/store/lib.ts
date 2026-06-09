export interface StoreProduct {
    id: number;
    name: string;
    slug: string;
    sku: string | null;
    price: number;
    price_usd: number | null;
    compare_price: number | null;
    stock: number;
    images: string[];
    thumbnail: string | null;
    description: string | null;
    specs?: Record<string, string>;
    featured: number;
    tags: string[];
    category_id: number | null;
    category_name?: string;
    category_slug?: string;
    brand_name?: string;
    brand_slug?: string;
    rating?: number;
}

export interface Category { id: number; name: string; slug: string; icon: string | null; }
export interface Brand { id: number; name: string; slug: string; }

export type Currency = 'NGN' | 'USD';

export function formatPrice(amountNgn: number, currency: Currency, usdRate: number, usdOverride?: number | null): string {
    if (currency === 'USD') {
        const usd = usdOverride != null ? usdOverride : amountNgn / usdRate;
        return '$' + usd.toLocaleString('en-US', { maximumFractionDigits: 2 });
    }
    return '₦' + Math.round(amountNgn).toLocaleString('en-NG');
}

export function displayUnit(p: StoreProduct, currency: Currency, usdRate: number): string {
    return formatPrice(p.price, currency, usdRate, currency === 'USD' ? p.price_usd : null);
}

export async function api<T = unknown>(path: string, opts?: RequestInit): Promise<T> {
    const res = await fetch(path, {
        ...opts,
        headers: { 'Content-Type': 'application/json', ...(opts?.headers || {}) },
        credentials: 'same-origin',
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error((data as { error?: string }).error || 'Request failed');
    return data as T;
}
