'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

export type DashboardMetric = {
  label: string;
  value: string;
  delta: string;
  tone: 'sky' | 'emerald' | 'amber' | 'violet';
};

export type StoreDashboardData = {
  metrics: DashboardMetric[];
  salesTrend: Array<{ month: string; sales: number; target: number }>;
  nightingale: Array<{ name: string; value: number; fill: string }>;
  radar: Array<{ subject: string; current: number; benchmark: number }>;
  density: Array<{ range: string; density: number }>;
  network: Array<{ from: string; to: string; value: number }>; 
};

const fallbackData: StoreDashboardData = {
  metrics: [
    { label: 'Total customers', value: '24.8K', delta: '+12.4%', tone: 'sky' },
    { label: 'Net sales', value: '₦8.4M', delta: '+9.1%', tone: 'emerald' },
    { label: 'Supplies delivered', value: '1,482', delta: '+18.7%', tone: 'amber' },
    { label: 'Avg. conversion', value: '7.8%', delta: '+1.3%', tone: 'violet' },
  ],
  salesTrend: [
    { month: 'Jan', sales: 2400000, target: 2200000 },
    { month: 'Feb', sales: 2600000, target: 2300000 },
    { month: 'Mar', sales: 2900000, target: 2500000 },
    { month: 'Apr', sales: 3200000, target: 2700000 },
    { month: 'May', sales: 3600000, target: 3000000 },
    { month: 'Jun', sales: 4100000, target: 3400000 },
    { month: 'Jul', sales: 4700000, target: 3700000 },
  ],
  nightingale: [
    { name: 'Laptops', value: 42, fill: '#38bdf8' },
    { name: 'Phones', value: 28, fill: '#8b5cf6' },
    { name: 'Servers', value: 19, fill: '#34d399' },
    { name: 'Accessories', value: 12, fill: '#fbbf24' },
  ],
  radar: [
    { subject: 'Availability', current: 88, benchmark: 74 },
    { subject: 'Speed', current: 82, benchmark: 70 },
    { subject: 'Retention', current: 76, benchmark: 68 },
    { subject: 'Orders', current: 92, benchmark: 77 },
    { subject: 'Repeat', current: 79, benchmark: 65 },
    { subject: 'Support', current: 84, benchmark: 72 },
  ],
  density: [
    { range: '0-20%', density: 12 },
    { range: '21-40%', density: 18 },
    { range: '41-60%', density: 23 },
    { range: '61-80%', density: 31 },
    { range: '81-100%', density: 41 },
  ],
  network: [
    { from: 'Rivers State', to: 'Port Harcourt', value: 7 },
    { from: 'Port Harcourt', to: 'Customers', value: 9 },
    { from: 'Nigeria', to: 'Abuja', value: 6 },
    { from: 'Nigeria', to: 'Customers', value: 8 },
    { from: 'Abuja', to: 'Supplied To', value: 4 },
    { from: 'Port Harcourt', to: 'Supplied To', value: 5 },
  ],
};

const metricStyles: Record<DashboardMetric['tone'], string> = {
  sky: 'from-sky-500/20 to-sky-500/5 border-sky-500/30 text-sky-100',
  emerald: 'from-emerald-500/20 to-emerald-500/5 border-emerald-500/30 text-emerald-100',
  amber: 'from-amber-500/20 to-amber-500/5 border-amber-500/30 text-amber-100',
  violet: 'from-violet-500/20 to-violet-500/5 border-violet-500/30 text-violet-100',
};

function formatCurrency(value: number) {
  return `₦${(value / 1000000).toFixed(1)}M`;
}

export default function StoreDashboard() {
  const [data, setData] = useState<StoreDashboardData>(fallbackData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    fetch('/api/admin/store/dashboard')
      .then((res) => res.ok ? res.json() : null)
      .then((payload) => {
        if (!mounted || !payload) return;
        setData({ ...fallbackData, ...payload });
      })
      .catch(() => {
        if (mounted) setData(fallbackData);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => { mounted = false; };
  }, []);

  const salesAverage = useMemo(
    () => Math.round(data.salesTrend.reduce((sum, row) => sum + row.sales, 0) / data.salesTrend.length),
    [data.salesTrend],
  );

  return (
    <div
      className="admin-store-dashboard space-y-6 overflow-visible"
      style={{
        display: 'block',
        visibility: 'visible',
        opacity: 1,
        minHeight: '100vh',
        background: '#020817',
        color: '#fff',
        padding: '24px',
      }}
    >
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between" style={{ display: 'flex', visibility: 'visible', opacity: 1 }}>
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-sky-300">Store dashboard</p>
          <h2 className="text-2xl font-bold text-white">Operations at a glance</h2>
        </div>
        <div className="flex items-center gap-3">
          <a href="/admin" className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-sm text-slate-200 hover:border-slate-500">Back to admin</a>
          <a href="/admin/store-dashboard" className="rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-500">Refresh view</a>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {data.metrics.map((metric) => (
          <div key={metric.label} className={`rounded-2xl border bg-gradient-to-br p-5 ${metricStyles[metric.tone]}`}>
            <div className="text-sm text-slate-300">{metric.label}</div>
            <div className="mt-3 text-3xl font-bold text-white">{metric.value}</div>
            <div className="mt-2 text-xs font-medium text-emerald-300">{metric.delta} vs last month</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="rounded-2xl border border-slate-700 bg-slate-900/80 p-5" style={{ display: 'block', visibility: 'visible', opacity: 1, minHeight: '320px' }}>
          <div className="mb-4 flex items-center justify-between" style={{ display: 'flex', visibility: 'visible', opacity: 1 }}>
            <h3 className="text-lg font-semibold text-white">Sales area chart</h3>
            <span className="rounded-full bg-emerald-500/10 px-2 py-1 text-xs font-medium text-emerald-300">Avg {formatCurrency(salesAverage)}</span>
          </div>
          <div className="h-72" style={{ display: 'block', visibility: 'visible', opacity: 1, height: '300px', minHeight: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.salesTrend} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="salesFill" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.7} />
                    <stop offset="95%" stopColor="#38bdf8" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#334155" strokeDasharray="4 4" />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" tickFormatter={(value: any) => `${(Number(value) / 1000000).toFixed(0)}M`} />
                <Tooltip formatter={(v: any) => `₦${(Number(v) / 1000000).toFixed(1)}M`} contentStyle={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '12px' }} />
                <Area type="monotone" dataKey="sales" stroke="#38bdf8" strokeWidth={3} fill="url(#salesFill)" />
                <Line type="monotone" dataKey="target" stroke="#f8fafc" strokeOpacity={0.5} strokeDasharray="5 5" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-700 bg-slate-900/80 p-5" style={{ display: 'block', visibility: 'visible', opacity: 1, minHeight: '320px' }}>
          <div className="mb-4" style={{ display: 'block', visibility: 'visible', opacity: 1 }}>
            <h3 className="text-lg font-semibold text-white">Nightingale rose chart</h3>
          </div>
          <div className="h-72" style={{ display: 'block', visibility: 'visible', opacity: 1, height: '300px', minHeight: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart data={data.nightingale} innerRadius="15%" outerRadius="90%" barSize={18} startAngle={90} endAngle={-270}>
                <PolarAngleAxis type="category" dataKey="name" tick={{ fill: '#cbd5e1', fontSize: 12 }} />
                <RadialBar dataKey="value" cornerRadius={15 as any} />
                <Tooltip formatter={(v: any) => `${v}%`} contentStyle={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '12px' }} />
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="rounded-2xl border border-slate-700 bg-slate-900/80 p-5" style={{ display: 'block', visibility: 'visible', opacity: 1, minHeight: '320px' }}>
          <div className="mb-4" style={{ display: 'block', visibility: 'visible', opacity: 1 }}>
            <h3 className="text-lg font-semibold text-white">Radar chart</h3>
          </div>
          <div className="h-72" style={{ display: 'block', visibility: 'visible', opacity: 1, height: '300px', minHeight: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={data.radar} outerRadius="80%">
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#cbd5e1', fontSize: 12 }} />
                <PolarRadiusAxis tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} />
                <Radar name="Current" dataKey="current" stroke="#38bdf8" fill="#38bdf8" fillOpacity={0.45} />
                <Radar name="Benchmark" dataKey="benchmark" stroke="#a78bfa" fill="#a78bfa" fillOpacity={0.22} />
                <Legend wrapperStyle={{ color: '#e2e8f0' }} />
                <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '12px' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-700 bg-slate-900/80 p-5" style={{ display: 'block', visibility: 'visible', opacity: 1, minHeight: '320px' }}>
          <div className="mb-4" style={{ display: 'block', visibility: 'visible', opacity: 1 }}>
            <h3 className="text-lg font-semibold text-white">Density chart</h3>
          </div>
          <div className="h-72" style={{ display: 'block', visibility: 'visible', opacity: 1, height: '300px', minHeight: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={data.density} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid stroke="#334155" strokeDasharray="4 4" />
                <XAxis dataKey="range" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '12px' }} />
                <Area type="monotone" dataKey="density" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.35} />
                <Line type="monotone" dataKey="density" stroke="#fbbf24" strokeWidth={2} dot={{ fill: '#fbbf24' }} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-700 bg-slate-900/80 p-5" style={{ display: 'block', visibility: 'visible', opacity: 1, minHeight: '320px' }}>
        <div className="mb-4 flex items-center justify-between" style={{ display: 'flex', visibility: 'visible', opacity: 1 }}>
          <h3 className="text-lg font-semibold text-white">Connection map</h3>
          <span className="text-xs uppercase tracking-[0.2em] text-slate-400">Rivers State • Nigeria</span>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-4" style={{ display: 'block', visibility: 'visible', opacity: 1 }}>
          <svg viewBox="0 0 680 260" className="h-72 w-full" style={{ display: 'block', width: '100%', height: '300px', visibility: 'visible', opacity: 1 }}>
            <defs>
              <linearGradient id="supplyLine" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#a78bfa" />
              </linearGradient>
            </defs>

            <path d="M155 120 C220 70, 255 80, 310 110" stroke="url(#supplyLine)" strokeWidth="3" fill="none" strokeDasharray="10 8" />
            <path d="M310 110 C360 80, 430 90, 500 120" stroke="url(#supplyLine)" strokeWidth="3" fill="none" strokeDasharray="10 8" />
            <path d="M150 160 C230 170, 270 185, 330 170" stroke="#34d399" strokeWidth="3" fill="none" strokeDasharray="8 8" />
            <path d="M330 170 C390 150, 470 155, 540 175" stroke="#34d399" strokeWidth="3" fill="none" strokeDasharray="8 8" />

            <circle cx="155" cy="120" r="16" fill="#38bdf8" />
            <circle cx="310" cy="110" r="16" fill="#8b5cf6" />
            <circle cx="500" cy="120" r="18" fill="#f59e0b" />
            <circle cx="150" cy="160" r="16" fill="#22c55e" />
            <circle cx="330" cy="170" r="16" fill="#1d4ed8" />
            <circle cx="540" cy="175" r="18" fill="#f97316" />

            <g fontSize="12" fill="#e2e8f0">
              <text x="120" y="95">Rivers State</text>
              <text x="275" y="85">Port Harcourt</text>
              <text x="455" y="95">Customers</text>
              <text x="110" y="205">Nigeria</text>
              <text x="285" y="205">Abuja</text>
              <text x="486" y="210">Supplied To</text>
            </g>
          </svg>
        </div>
      </div>

      {loading && (
        <div className="rounded-2xl border border-slate-700 bg-slate-900/80 p-5 text-sm text-slate-300">
          Loading live store analytics…
        </div>
      )}
    </div>
  );
}
