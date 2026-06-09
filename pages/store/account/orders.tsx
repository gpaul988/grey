'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import StoreShell from '@/components/store/StoreShell';
import { useStore } from '@/components/store/StoreContext';
import { api } from '@/components/store/lib';
import { FiPackage } from 'react-icons/fi';

interface Order { id: number; order_number: string; status: string; payment_status: string; total: number; currency: string; created_at: string; items: { id: number; product_name: string; product_image: string | null; quantity: number }[]; }

export default function OrdersPage() {
    return <StoreShell title="My Orders"><OrdersInner /></StoreShell>;
}

function OrdersInner() {
    const router = useRouter();
    const { customer } = useStore();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api<{ orders: Order[] }>('/api/store/account/orders')
            .then((d) => setOrders(d.orders))
            .catch(() => router.replace('/store/account/login?next=/store/account/orders'))
            .finally(() => setLoading(false));
    }, [router]);

    const fmt = (n: number, c: string) => c === 'USD' ? '$' + n.toLocaleString() : '₦' + Math.round(n).toLocaleString('en-NG');
    const statusColor = (s: string) => s === 'paid' || s === 'delivered' || s === 'confirmed' ? 'text-emerald-400' : s === 'failed' || s === 'cancelled' ? 'text-red-400' : 'text-amber-400';

    if (loading) return <div className="st-card h-64 animate-pulse" />;

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">My Orders</h1>
            {orders.length === 0 ? (
                <div className="st-card p-16 text-center">
                    <FiPackage className="mx-auto text-5xl text-[var(--st-muted)] mb-4" />
                    <p className="font-semibold">No orders yet</p>
                    <Link href="/store/products" className="st-btn inline-block px-6 py-3 mt-6">Start Shopping</Link>
                </div>
            ) : (
                <div className="space-y-4">
                    {orders.map((o) => (
                        <Link key={o.id} href={`/store/orders/${o.order_number}`} className="st-card st-hover-card p-5 flex items-center gap-4 block">
                            <div className="flex -space-x-3">
                                {o.items.slice(0, 3).map((it) => (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img key={it.id} src={it.product_image || ''} alt="" className="w-12 h-12 rounded-lg object-cover border-2 border-[var(--st-surface)] bg-[var(--st-surface-2)]" />
                                ))}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-semibold text-sm">#{o.order_number}</p>
                                <p className="text-xs text-[var(--st-muted)]">{new Date(o.created_at).toLocaleDateString()} · {o.items.length} item(s)</p>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-[var(--st-teal)]">{fmt(o.total, o.currency)}</p>
                                <p className={`text-xs capitalize ${statusColor(o.payment_status)}`}>{o.payment_status}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
