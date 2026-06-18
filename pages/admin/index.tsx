'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {
  UserGrowthChart,
  RevenueBreakdownChart,
  ServicePopularityChart,
  ConversionFunnelChart,
  AuditRateChart,
  SearchAnalyticsChart,
} from '@/components/admin/DashboardCharts';

interface DashboardMetrics {
  users: {
    total: number;
    activeMonth: number;
    newThisMonth: number;
  };
  revenue: {
    total: number;
    thisMonth: number;
    thisWeek: number;
    byGateway: Record<string, number>;
  };
  services: {
    total: number;
    topServices: Array<{ id: string; name: string; views: number; purchases: number }>;
  };
  audits: {
    total: number;
    completed: number;
    completionRate: number;
  };
  payments: {
    total: number;
    successful: number;
    failed: number;
    refunded: number;
  };
  webhooks: {
    totalEvents: number;
    successRate: number;
    failedDeliveries: number;
  };
  search: {
    totalQueries: number;
    topQueries: Array<{ query: string; count: number }>;
  };
}

const defaultMetrics: DashboardMetrics = {
  users: { total: 0, activeMonth: 0, newThisMonth: 0 },
  revenue: { total: 0, thisMonth: 0, thisWeek: 0, byGateway: {} },
  services: { total: 0, topServices: [] },
  audits: { total: 0, completed: 0, completionRate: 0 },
  payments: { total: 0, successful: 0, failed: 0, refunded: 0 },
  webhooks: { totalEvents: 0, successRate: 0, failedDeliveries: 0 },
  search: { totalQueries: 0, topQueries: [] },
};

export default function AdminDashboard() {
  const router = useRouter();
  const [metrics, setMetrics] = useState<DashboardMetrics>(defaultMetrics);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  // Check authentication on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('admin-token');
        if (!token) {
          router.push('/admin/login');
          return;
        }

        // Verify token with server
        const res = await fetch('/api/admin/auth/verify', {
          headers: { 'X-Admin-Token': token },
        });

        if (!res.ok) {
          localStorage.removeItem('admin-token');
          router.push('/admin/login');
          return;
        }

        setLoading(false);
      } catch (err) {
        console.error('Auth check failed:', err);
        router.push('/admin/login');
      }
    };

    checkAuth();
  }, [router]);

  // Connect to WebSocket for real-time metrics
  useEffect(() => {
    if (loading) return;

    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const token = localStorage.getItem('admin-token');
    const ws = new WebSocket(`${protocol}//${window.location.host}/api/ws/dashboard?token=${token}`);

    ws.onopen = () => {
      setIsConnected(true);
      console.log('Dashboard WebSocket connected');
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === 'metrics') {
          setMetrics(data.payload);
        }
      } catch (err) {
        console.error('Failed to parse WebSocket message:', err);
      }
    };

    ws.onerror = (event) => {
      console.error('WebSocket error:', event);
      setError('Real-time connection failed. Showing cached data.');
    };

    ws.onclose = () => {
      setIsConnected(false);
    };

    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, [loading]);

  // Export to CSV
  const exportToCSV = () => {
    const csvContent = [
      ['Metric', 'Value', 'Date'],
      ['Total Users', metrics.users.total, new Date().toISOString()],
      ['New Users This Month', metrics.users.newThisMonth, ''],
      ['Active Users This Month', metrics.users.activeMonth, ''],
      ['Total Revenue', `${(metrics.revenue.total / 100).toFixed(2)}`, ''],
      ['Revenue This Month', `${(metrics.revenue.thisMonth / 100).toFixed(2)}`, ''],
      ['Revenue This Week', `${(metrics.revenue.thisWeek / 100).toFixed(2)}`, ''],
      ['Total Services', metrics.services.total, ''],
      ['Total Audits', metrics.audits.total, ''],
      ['Completed Audits', metrics.audits.completed, ''],
      ['Audit Completion Rate', `${Math.round(metrics.audits.completionRate)}%`, ''],
      ['Total Payments', metrics.payments.total, ''],
      ['Successful Payments', metrics.payments.successful, ''],
      ['Failed Payments', metrics.payments.failed, ''],
      ['Refunded Payments', metrics.payments.refunded, ''],
      ['Webhook Events', metrics.webhooks.totalEvents, ''],
      ['Webhook Success Rate', `${Math.round(metrics.webhooks.successRate)}%`, ''],
      ['Search Queries', metrics.search.totalQueries, ''],
    ]
      .map((row) => row.map((cell) => `"${cell}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dashboard-export-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  // Export to PDF (server-side rendering)
  const exportToPDF = async () => {
    try {
      const response = await fetch('/api/admin/export/pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Admin-Token': localStorage.getItem('admin-token') || '',
        },
        body: JSON.stringify(metrics),
      });

      if (!response.ok) {
        throw new Error('PDF export failed');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `dashboard-export-${new Date().toISOString().split('T')[0]}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('PDF export failed:', err);
      alert('PDF export failed. Using CSV instead.');
      exportToCSV();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
          <p className="mt-4 text-slate-300">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      {/* Header */}
      <header className="bg-black/50 border-b border-slate-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
            <p className="text-sm text-slate-400">Real-time metrics & management</p>
          </div>
          <div className="flex items-center gap-4">
            <div className={`flex items-center gap-2 px-3 py-1 rounded text-sm ${isConnected ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
              <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`}></div>
              {isConnected ? 'Live' : 'Offline'}
            </div>
            <button
              onClick={() => {
                localStorage.removeItem('admin-token');
                router.push('/admin/login');
              }}
              className="px-4 py-2 text-sm text-slate-300 hover:text-white transition"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Error Alert */}
      {error && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="bg-yellow-500/10 border border-yellow-500/30 text-yellow-300 px-4 py-3 rounded">
            {error}
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Users Card */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 hover:border-slate-600 transition">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-slate-400">Total Users</h3>
              <div className="text-2xl">👥</div>
            </div>
            <p className="text-3xl font-bold text-white">{metrics.users.total}</p>
            <p className="text-xs text-slate-400 mt-2">
              {metrics.users.newThisMonth} new this month
            </p>
          </div>

          {/* Revenue Card */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 hover:border-slate-600 transition">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-slate-400">Total Revenue</h3>
              <div className="text-2xl">💰</div>
            </div>
            <p className="text-3xl font-bold text-white">${(metrics.revenue.total / 100).toFixed(2)}</p>
            <p className="text-xs text-slate-400 mt-2">
              ${(metrics.revenue.thisMonth / 100).toFixed(2)} this month
            </p>
          </div>

          {/* Services Card */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 hover:border-slate-600 transition">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-slate-400">Services</h3>
              <div className="text-2xl">🚀</div>
            </div>
            <p className="text-3xl font-bold text-white">{metrics.services.total}</p>
            <p className="text-xs text-slate-400 mt-2">
              {metrics.services.topServices.length} popular
            </p>
          </div>

          {/* Audits Card */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 hover:border-slate-600 transition">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-slate-400">Audit Score</h3>
              <div className="text-2xl">⭐</div>
            </div>
            <p className="text-3xl font-bold text-white">{Math.round(metrics.audits.completionRate)}%</p>
            <p className="text-xs text-slate-400 mt-2">
              {metrics.audits.completed}/{metrics.audits.total} complete
            </p>
          </div>
        </div>

        {/* Navigation to Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { href: '/admin/users', label: 'Users', icon: '👥', desc: 'Manage users & permissions' },
            { href: '/admin/services', label: 'Services', icon: '🚀', desc: 'Edit services' },
            { href: '/admin/payments', label: 'Payments', icon: '💳', desc: 'Refunds & analytics' },
            { href: '/admin/audits', label: 'Audits', icon: '✓', desc: 'Review findings' },
            { href: '/admin/webhooks', label: 'Webhooks', icon: '🔗', desc: 'Event logs' },
            { href: '/admin/email', label: 'Email', icon: '📧', desc: 'Send bulk emails' },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block bg-slate-800/50 border border-slate-700 rounded-lg p-6 hover:border-cyan-400/50 hover:bg-slate-800 transition group"
            >
              <div className="text-3xl mb-2">{item.icon}</div>
              <h3 className="text-lg font-semibold text-white group-hover:text-cyan-400 transition">{item.label}</h3>
              <p className="text-sm text-slate-400 mt-1">{item.desc}</p>
            </Link>
          ))}
        </div>

        {/* Charts Section */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Analytics & Insights</h2>
            <div className="flex gap-2">
              <button
                onClick={() => exportToCSV()}
                className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg text-sm transition"
              >
                📥 Export CSV
              </button>
              <button
                onClick={() => exportToPDF()}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm transition"
              >
                📄 Export PDF
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <UserGrowthChart />
            <RevenueBreakdownChart />
            <ServicePopularityChart />
            <ConversionFunnelChart />
            <AuditRateChart />
            <SearchAnalyticsChart />
          </div>
        </div>
      </main>
    </div>
  );
}
