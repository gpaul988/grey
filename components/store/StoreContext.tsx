'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { api, type StoreProduct, type Currency } from './lib';

export interface CartLine { product: StoreProduct; quantity: number; }
export interface Customer { id: number; first_name: string; last_name: string; email: string | null; phone: string; address: string | null; city: string | null; state: string | null; country: string; }

interface StoreState {
    cart: CartLine[];
    compare: StoreProduct[];
    currency: Currency;
    usdRate: number;
    usdEnabled: boolean;
    customer: Customer | null;
    wishlistIds: number[];
    addToCart: (p: StoreProduct, qty?: number) => void;
    removeFromCart: (id: number) => void;
    setQty: (id: number, qty: number) => void;
    clearCart: () => void;
    toggleCompare: (p: StoreProduct) => void;
    removeCompare: (id: number) => void;
    clearCompare: () => void;
    setCurrency: (c: Currency) => void;
    cartCount: number;
    cartSubtotal: number;
    cartOpen: boolean;
    setCartOpen: (v: boolean) => void;
    setCustomer: (c: Customer | null) => void;
    refreshAuth: () => Promise<void>;
    toggleWishlist: (id: number) => Promise<void>;
    isWishlisted: (id: number) => boolean;
}

const Ctx = createContext<StoreState | null>(null);

export function useStore(): StoreState {
    const c = useContext(Ctx);
    if (!c) throw new Error('useStore must be used within StoreProvider');
    return c;
}

const LS_CART = 'grey_cart';
const LS_COMPARE = 'grey_compare';
const LS_CURRENCY = 'grey_currency';

export function StoreProvider({ children, usdRate = 1600, usdEnabled = true }: { children: React.ReactNode; usdRate?: number; usdEnabled?: boolean; }) {
    const [cart, setCart] = useState<CartLine[]>([]);
    const [compare, setCompare] = useState<StoreProduct[]>([]);
    const [currency, setCurrencyState] = useState<Currency>('NGN');
    const [customer, setCustomer] = useState<Customer | null>(null);
    const [wishlistIds, setWishlistIds] = useState<number[]>([]);
    const [cartOpen, setCartOpen] = useState(false);
    const [hydrated, setHydrated] = useState(false);

    // hydrate from localStorage
    useEffect(() => {
        try {
            const c = localStorage.getItem(LS_CART);
            if (c) setCart(JSON.parse(c));
            const cmp = localStorage.getItem(LS_COMPARE);
            if (cmp) setCompare(JSON.parse(cmp));
            const cur = localStorage.getItem(LS_CURRENCY) as Currency | null;
            if (cur && usdEnabled) setCurrencyState(cur);
        } catch { /* noop */ }
        setHydrated(true);
    }, [usdEnabled]);

    useEffect(() => { if (hydrated) localStorage.setItem(LS_CART, JSON.stringify(cart)); }, [cart, hydrated]);
    useEffect(() => { if (hydrated) localStorage.setItem(LS_COMPARE, JSON.stringify(compare)); }, [compare, hydrated]);
    useEffect(() => { if (hydrated) localStorage.setItem(LS_CURRENCY, currency); }, [currency, hydrated]);

    const refreshAuth = useCallback(async () => {
        try {
            const r = await api<{ customer: Customer | null; wishlist_ids?: number[] }>('/api/store/auth/me');
            setCustomer(r.customer);
            setWishlistIds(r.wishlist_ids || []);
        } catch { setCustomer(null); }
    }, []);

    useEffect(() => { refreshAuth(); }, [refreshAuth]);

    const addToCart = useCallback((p: StoreProduct, qty = 1) => {
        setCart((prev) => {
            const ex = prev.find((l) => l.product.id === p.id);
            if (ex) return prev.map((l) => l.product.id === p.id ? { ...l, quantity: Math.min(l.product.stock || 99, l.quantity + qty) } : l);
            return [...prev, { product: p, quantity: qty }];
        });
        setCartOpen(true);
    }, []);

    const removeFromCart = useCallback((id: number) => setCart((p) => p.filter((l) => l.product.id !== id)), []);
    const setQty = useCallback((id: number, qty: number) => setCart((p) => p.map((l) => l.product.id === id ? { ...l, quantity: Math.max(1, qty) } : l)), []);
    const clearCart = useCallback(() => setCart([]), []);

    const toggleCompare = useCallback((p: StoreProduct) => {
        setCompare((prev) => {
            if (prev.find((x) => x.id === p.id)) return prev.filter((x) => x.id !== p.id);
            if (prev.length >= 4) return [...prev.slice(1), p];
            return [...prev, p];
        });
    }, []);
    const removeCompare = useCallback((id: number) => setCompare((p) => p.filter((x) => x.id !== id)), []);
    const clearCompare = useCallback(() => setCompare([]), []);

    const setCurrency = useCallback((c: Currency) => { if (c === 'NGN' || usdEnabled) setCurrencyState(c); }, [usdEnabled]);

    const toggleWishlist = useCallback(async (id: number) => {
        if (!customer) { window.location.href = '/store/account/login?next=' + encodeURIComponent(window.location.pathname); return; }
        const r = await api<{ ids: number[] }>('/api/store/wishlist', { method: 'POST', body: JSON.stringify({ product_id: id }) });
        setWishlistIds(r.ids);
    }, [customer]);

    const isWishlisted = useCallback((id: number) => wishlistIds.includes(id), [wishlistIds]);

    const cartCount = cart.reduce((s, l) => s + l.quantity, 0);
    const cartSubtotal = cart.reduce((s, l) => s + l.product.price * l.quantity, 0);

    return (
        <Ctx.Provider value={{
            cart, compare, currency, usdRate, usdEnabled, customer, wishlistIds,
            addToCart, removeFromCart, setQty, clearCart,
            toggleCompare, removeCompare, clearCompare,
            setCurrency, cartCount, cartSubtotal, cartOpen, setCartOpen,
            setCustomer, refreshAuth, toggleWishlist, isWishlisted,
        }}>
            {children}
        </Ctx.Provider>
    );
}
