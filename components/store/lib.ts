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
    video_url?: string | null;
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
    promotion?: string | null;
    // Flash sale fields (added by backend)
    flash_sale?: number;
    flash_sale_starts?: string | null;
    flash_sale_ends?: string | null;
    flash_sale_price?: number | null;
}

export interface StoreSettings {
    black_friday_active?: boolean;
    black_friday_discount?: number;
    flash_sales_active?: boolean;
}

function isFlashSaleActive(p: StoreProduct): boolean {
    if (Number(p.flash_sale ?? 0) !== 1) return false;
    const now = Date.now();
    const start = p.flash_sale_starts ? Date.parse(p.flash_sale_starts) : NaN;
    const end = p.flash_sale_ends ? Date.parse(p.flash_sale_ends) : NaN;
    if (!Number.isNaN(start) && now < start) return false;
    if (!Number.isNaN(end) && now > end) return false;
    return true;
}

export function effectiveAmount(p: StoreProduct, settings?: StoreSettings) {
    let amount = p.price ?? 0;
    let usdOverride = p.price_usd ?? null;

    if (isFlashSaleActive(p) && typeof p.flash_sale_price === 'number' && !isNaN(p.flash_sale_price) && p.flash_sale_price > 0) {
        amount = p.flash_sale_price;
        if (typeof usdOverride === 'number' && !isNaN(usdOverride)) {
            usdOverride = Math.round(usdOverride * (amount / (p.price || amount || 1)));
        }
        return { amount, usdOverride, promotion: 'flash_sale' };
    }

    if (settings?.black_friday_active && (settings.black_friday_discount ?? 0) > 0) {
        const disc = Math.max(0, Math.min(100, settings.black_friday_discount!));
        const factor = (100 - disc) / 100;
        amount = Math.round(amount * factor);
        if (typeof usdOverride === 'number' && !isNaN(usdOverride)) usdOverride = Math.round(usdOverride * factor);
        return { amount, usdOverride, promotion: 'black_friday' };
    }

    return { amount, usdOverride, promotion: null };
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

export function displayUnit(p: StoreProduct, currency: Currency, usdRate: number, settings?: StoreSettings): string {
    const eff = effectiveAmount(p, settings);
    return formatPrice(eff.amount, currency, usdRate, currency === 'USD' ? eff.usdOverride : null);
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
