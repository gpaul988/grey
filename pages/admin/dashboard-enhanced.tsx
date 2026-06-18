'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface DashboardData {
  userGrowth: Array<{ month: string; users: number }>;
  revenueData: Array<{ month: string; revenue: number }>;
  servicePopularity: Array<{ name: string; views: number }>;
  paymentBreakdown: Array<{ name: string; value: number }>;
  ratingsDistribution: Array<{ rating: number; count: number }>;
  recommendationMetrics: {
    totalRecommendations: number;
    accuracy: number;
    topRecommendedServices: Array<{ service: string; count: number }>;
  };
}

const COLORS = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];

export default function DashboardEnhanced() {
  const router = useRouter();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      router.push('/admin/login');
      return;
    }

    fetchDashboardData(token);
  }, [router]);

  const fetchDashboardData = async (token: string) => {
    try {
      const res = await fetch('/api/admin/dashboard/metrics', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Failed to fetch data');
      const result = await res.json();
      setData(result.data || generateSampleData());
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching data');
      setData(generateSampleData()); // Use sample data on error
    } finally {
      setLoading(false);
    }
  };

  const generateSampleData = (): DashboardData => ({
    userGrowth: [
      { month: 'Jan', users: 100 },
      { month: 'Feb', users: 150 },
      { month: 'Mar', users: 200 },
      { month: 'Apr', users: 280 },
      { month: 'May', users: 350 },
      { month: 'Jun', users: 420 },
    ],
    revenueData: [
      { month: 'Jan', revenue: 5000 },
      { month: 'Feb', revenue: 7500 },
      { month: 'Mar', revenue: 9000 },
      { month: 'Apr', revenue: 12000 },
      { month: 'May', revenue: 15000 },
      { month: 'Jun', revenue: 18000 },
    ],
    servicePopularity: [
      { name: 'Web Development', views: 450 },
      { name: 'Mobile App', views: 380 },
      { name: 'Cloud Solutions', views: 320 },
      { name: 'Consulting', views: 290 },
      { name: 'Support', views: 210 },
    ],
    paymentBreakdown: [
      { name: 'Stripe', value: 50 },
      { name: 'PayPal', value: 30 },
      { name: 'Square', value: 15 },
      { name: 'Wise', value: 5 },
    ],
    ratingsDistribution: [
      { rating: 5, count: 342 },
      { rating: 4, count: 128 },
      { rating: 3, count: 45 },
      { rating: 2, count: 12 },
      { rating: 1, count: 8 },
    ],
    recommendationMetrics: {
      totalRecommendations: 1250,
      accuracy: 87.5,
      topRecommendedServices: [
        { service: 'Web Development', count: 285 },
        { service: 'Mobile App', count: 192 },
        { service: 'Cloud Solutions', count: 168 },
      ],
    },
  });

  if (loading) return <div className="p-8 text-center">Loading...</div>;

  const chartData = data || generateSampleData();

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <div className="bg-slate-900 border-b border-slate-700 p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">Analytics Dashboard</h1>
          <Link
            href="/admin"
            className="px-4 py-2 bg-slate-700 text-white rounded hover:bg-slate-600"
          >
            Dashboard
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {error && (
          <div className="mb-4 p-4 bg-yellow-900 text-yellow-100 rounded">
            {error} (showing sample data)
          </div>
        )}

        {/* User Growth */}
        <div className="bg-slate-900 border border-slate-700 rounded p-6 mb-6">
          <h2 className="text-2xl font-bold text-white mb-4">User Growth</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData.userGrowth}>
              <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
              <XAxis dataKey="month" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: '1px solid #475569',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="users"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ fill: '#3b82f6' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Trend */}
        <div className="bg-slate-900 border border-slate-700 rounded p-6 mb-6">
          <h2 className="text-2xl font-bold text-white mb-4">Revenue Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData.revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
              <XAxis dataKey="month" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: '1px solid #475569',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Bar dataKey="revenue" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-6">
          {/* Service Popularity */}
          <div className="bg-slate-900 border border-slate-700 rounded p-6">
            <h2 className="text-2xl font-bold text-white mb-4">Service Popularity</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={chartData.servicePopularity}
                layout="vertical"
                margin={{ left: 150 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                <XAxis type="number" stroke="#94a3b8" />
                <YAxis dataKey="name" type="category" width={140} stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #475569',
                    borderRadius: '8px',
                  }}
                />
                <Bar dataKey="views" fill="#f59e0b" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Payment Gateway Breakdown */}
          <div className="bg-slate-900 border border-slate-700 rounded p-6">
            <h2 className="text-2xl font-bold text-white mb-4">Payment Methods</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={chartData.paymentBreakdown}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {chartData.paymentBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #475569',
                    borderRadius: '8px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Ratings Distribution */}
          <div className="bg-slate-900 border border-slate-700 rounded p-6">
            <h2 className="text-2xl font-bold text-white mb-4">Ratings Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData.ratingsDistribution}>
                <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                <XAxis dataKey="rating" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #475569',
                    borderRadius: '8px',
                  }}
                />
                <Bar dataKey="count" fill="#ec4899" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Recommendations Metrics */}
          <div className="bg-slate-900 border border-slate-700 rounded p-6">
            <h2 className="text-2xl font-bold text-white mb-4">Recommendations</h2>
            <div className="space-y-4">
              <div className="bg-slate-800 p-4 rounded">
                <div className="text-slate-400 text-sm">Total Recommendations</div>
                <div className="text-3xl font-bold text-blue-400">
                  {chartData.recommendationMetrics.totalRecommendations}
                </div>
              </div>
              <div className="bg-slate-800 p-4 rounded">
                <div className="text-slate-400 text-sm">Accuracy Rate</div>
                <div className="text-3xl font-bold text-green-400">
                  {chartData.recommendationMetrics.accuracy}%
                </div>
              </div>
              <div className="bg-slate-800 p-4 rounded">
                <div className="text-slate-400 text-sm mb-3">Top Recommended</div>
                <div className="space-y-2">
                  {chartData.recommendationMetrics.topRecommendedServices.map((item, i) => (
                    <div key={i} className="flex justify-between text-sm">
                      <span className="text-slate-300">{item.service}</span>
                      <span className="text-slate-400">{item.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 flex gap-4 justify-center">
          <Link
            href="/admin/cms"
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Manage CMS
          </Link>
          <Link
            href="/admin/reviews"
            className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Moderate Reviews
          </Link>
          <Link
            href="/admin/faqs"
            className="px-6 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            Manage FAQs
          </Link>
        </div>
      </div>
    </div>
  );
}
