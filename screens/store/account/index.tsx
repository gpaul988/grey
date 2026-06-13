'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from '@/lib/routerCompat';
import Link from 'next/link';
import StoreShell from '@/components/store/StoreShell';
import { useStore } from '@/components/store/StoreContext';
import { api } from '@/components/store/lib';
import { FiUser, FiPackage, FiHeart, FiLogOut } from 'react-icons/fi';

export default function AccountPage() {
    return <StoreShell title="My Account"><AccountInner /></StoreShell>;
}

function AccountInner() {
    const router = useRouter();
    const { customer, refreshAuth, setCustomer } = useStore();
    const [form, setForm] = useState<Record<string, string>>({});
    const [msg, setMsg] = useState('');
    const [loading, setLoading] = useState(false);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        if (customer === null) { /* could be loading */ }
        if (customer) {
            setForm({
                first_name: customer.first_name || '', last_name: customer.last_name || '',
                email: customer.email || '', phone: customer.phone || '',
                address: customer.address || '', city: customer.city || '',
                state: customer.state || '', country: customer.country || 'Nigeria',
            });
            setReady(true);
        }
    }, [customer]);

    // redirect if definitely not logged in
    useEffect(() => {
        const t = setTimeout(() => { if (!customer) router.replace('/store/account/login?next=/store/account'); }, 1200);
        return () => clearTimeout(t);
    }, [customer, router]);

    const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

    const save = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true); setMsg('');
        try { await api('/api/store/account/profile', { method: 'PUT', body: JSON.stringify(form) }); await refreshAuth(); setMsg('Profile updated.'); }
        catch (e) { setMsg((e as Error).message); } finally { setLoading(false); }
    };

    const logout = async () => { await api('/api/store/auth/logout', { method: 'POST' }); setCustomer(null); router.push('/store'); };

    if (!ready) return <div className="st-card h-64 animate-pulse" />;

    return (
        <div className="grid md:grid-cols-4 gap-8">
            <aside className="space-y-1">
                <p className="font-bold mb-3">{form.first_name} {form.last_name}</p>
                <NavItem href="/store/account" active icon={<FiUser />}>Profile</NavItem>
                <NavItem href="/store/account/orders" icon={<FiPackage />}>My Orders</NavItem>
                <NavItem href="/store/account/wishlist" icon={<FiHeart />}>Wishlist</NavItem>
                <button onClick={logout} className="flex items-center gap-2 px-3 py-2 rounded-lg st-link text-sm w-full text-left mt-2"><FiLogOut /> Logout</button>
            </aside>

            <div className="md:col-span-3">
                <h1 className="text-2xl font-bold mb-6">Profile & Biodata</h1>
                <form onSubmit={save} className="st-card p-6 grid sm:grid-cols-2 gap-4">
                    <F l="First name"><input value={form.first_name} onChange={(e) => set('first_name', e.target.value)} className="st-input" /></F>
                    <F l="Last name"><input value={form.last_name} onChange={(e) => set('last_name', e.target.value)} className="st-input" /></F>
                    <F l="Email"><input type="email" value={form.email} onChange={(e) => set('email', e.target.value)} className="st-input" /></F>
                    <F l="Phone"><input value={form.phone} onChange={(e) => set('phone', e.target.value)} className="st-input" /></F>
                    <F l="Address" full><input value={form.address} onChange={(e) => set('address', e.target.value)} className="st-input" /></F>
                    <F l="City"><input value={form.city} onChange={(e) => set('city', e.target.value)} className="st-input" /></F>
                    <F l="State"><input value={form.state} onChange={(e) => set('state', e.target.value)} className="st-input" /></F>
                    <F l="Country"><input value={form.country} onChange={(e) => set('country', e.target.value)} className="st-input" /></F>
                    {msg && <p className="text-sm text-[var(--st-teal)] sm:col-span-2">{msg}</p>}
                    <div className="sm:col-span-2"><button disabled={loading} className="st-btn px-6 py-3">{loading ? 'Saving…' : 'Save Changes'}</button></div>
                </form>
            </div>
        </div>
    );
}

function NavItem({ href, active, icon, children }: { href: string; active?: boolean; icon: React.ReactNode; children: React.ReactNode }) {
    return <Link href={href} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${active ? 'bg-[var(--st-surface-2)] text-[var(--st-teal)]' : 'st-link'}`}>{icon} {children}</Link>;
}
function F({ l, children, full }: { l: string; children: React.ReactNode; full?: boolean }) {
    return <label className={`block ${full ? 'sm:col-span-2' : ''}`}><span className="text-xs text-[var(--st-muted)] mb-1 block">{l}</span>{children}</label>;
}
