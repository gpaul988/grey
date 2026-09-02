'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import {
  BarChart3,
  Box,
  CreditCard,
  FileText,
  LayoutDashboard,
  LogOut,
  ShieldCheck,
  Users,
} from 'lucide-react';

import { canAccess, roleLabel } from '@/lib/admin/access';

const navItems = [
  { href: '/admin', label: 'Overview', icon: LayoutDashboard, action: 'manage_orders' },
  { href: '/admin/orders', label: 'Orders', icon: CreditCard, action: 'manage_orders' },
  { href: '/admin/customers', label: 'Customers', icon: Users, action: 'manage_customers' },
  { href: '/admin/products', label: 'Products', icon: Box, action: 'manage_products' },
  { href: '/admin/products/archived', label: 'Archived Products', icon: Box, action: 'manage_products' },
  { href: '/admin/customers', label: 'Customers', icon: Users, action: 'manage_customers' },
  { href: '/admin/customers/archived', label: 'Archived Customers', icon: Users, action: 'manage_customers' },
  { href: '/admin/orders', label: 'Orders', icon: CreditCard, action: 'manage_orders' },
  { href: '/admin/orders/archived', label: 'Archived Orders', icon: CreditCard, action: 'manage_orders' },
  { href: '/admin/audits', label: 'Audits', icon: FileText, action: 'review_audits' },
  { href: '/admin/audits/archived', label: 'Archived Audits', icon: FileText, action: 'review_audits' },
  { href: '/admin/activity-page', label: 'Activity', icon: BarChart3, action: 'view_activity' },
  { href: '/admin', label: 'Security', icon: ShieldCheck, action: 'manage_roles' },
] as const;

export function AdminSidebar() {
  const pathname = usePathname();
  const [role, setRole] = useState<string>('staff');

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const res = await fetch('/admin/api/session');
        if (!res.ok) return;
        const payload = await res.json();
        // Express API returns { ok: true, data: { id, name, role } } or data:null
        const roleVal = payload?.data?.role || 'staff';
        if (mounted) setRole(roleVal);
      } catch (err) {
        if (mounted) setRole('staff');
      }
    };
    load();
    return () => { mounted = false; };
  }, []);

  const visibleNav = useMemo(
    () => navItems.filter((item) => canAccess(role, item.action)),
    [role],
  );

  return (
    <aside className="w-72 shrink-0 border-r border-slate-800 bg-slate-950/90 px-5 py-6 backdrop-blur-sm">
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/15 text-sm font-bold text-sky-300 ring-1 ring-sky-400/30">
          G
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Grey</p>
          <h2 className="text-lg font-semibold text-white">Admin</h2>
        </div>
      </div>

      <nav className="space-y-2">
        {visibleNav.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href || (href !== '/admin' && pathname.startsWith(href));

          return (
            <Link
              key={href + label}
              href={href}
              className={[
                'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition',
                isActive ? 'bg-sky-500/15 text-white ring-1 ring-sky-400/30' : 'text-slate-300 hover:bg-slate-800/80 hover:text-white',
              ].join(' ')}
            >
              <Icon className="h-4 w-4" />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
        <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-slate-400">
          <BarChart3 className="h-3.5 w-3.5" />
          Live status
        </div>
        <div className="flex items-center justify-between text-sm text-slate-300">
          <span>System health</span>
          <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-xs font-medium text-emerald-300">
            Live
          </span>
        </div>
      </div>

      <div className="mt-auto pt-8">
        <div className="mb-3 text-center text-[10px] uppercase tracking-[0.22em] text-slate-500">
          Role: {roleLabel[role as keyof typeof roleLabel] ?? 'Staff'}
        </div>
        <Link
          href="/logout"
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-sm text-slate-200 transition hover:border-slate-500 hover:text-white"
        >
          <LogOut className="h-4 w-4" />
          Log out
        </Link>
      </div>
    </aside>
  );
}
