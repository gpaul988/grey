'use client';

import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import '../../components/store/store.css';
import { StoreProvider } from './StoreContext';
import StoreLayout from './StoreLayout';

export interface PaymentConfig {
    currency: string;
    currency_symbol: string;
    shipping_fee: number;
    tax_rate: number;
    store_name: string;
    usd_enabled: boolean;
    usd_rate: number;
    paystack?: { enabled: boolean; public_key: string };
    flutterwave?: { enabled: boolean; public_key: string };
    monnify?: { enabled: boolean };
    bank_transfer?: { enabled: boolean; bank_name: string; account_number: string; account_name: string };
}

export const ConfigContext = React.createContext<PaymentConfig | null>(null);
export function useConfig() { return React.useContext(ConfigContext); }

export default function StoreShell({ children, title }: { children: React.ReactNode; title?: string }) {
    const [config, setConfig] = useState<PaymentConfig | null>(null);

    useEffect(() => {
        fetch('/api/store/payment-config').then((r) => r.json()).then(setConfig).catch(() => { });
    }, []);

    return (
        <ConfigContext.Provider value={config}>
            <Head>
                <title>{title ? `${title} | Grey TechStore` : 'Grey TechStore — Laptops, Phones, Servers & More'}</title>
                <link rel="icon" href="/favicon.ico" />
                <meta name="description" content="Grey TechStore — Nigeria's trusted store for laptops, desktops, servers, phones and accessories." />
            </Head>
            <StoreProvider usdRate={config?.usd_rate ?? 1600} usdEnabled={config?.usd_enabled ?? true}>
                <StoreLayout>{children}</StoreLayout>
            </StoreProvider>
        </ConfigContext.Provider>
    );
}
