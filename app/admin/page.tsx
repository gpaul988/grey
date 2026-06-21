'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AdminDashboard() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user has auth token
    const token = typeof window !== 'undefined' ? localStorage.getItem('admin-token') : null;
    if (!token) {
      router.push('/admin/login');
      return;
    }
    setIsAuthenticated(true);
    setIsLoading(false);
  }, [router]);

  if (isLoading) {
    return <div className="p-8">Loading...</div>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-2">Admin Dashboard</h1>
        <p className="text-slate-400 mb-8">Welcome back. Manage your platform from here.</p>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Users Card */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 backdrop-blur">
            <div className="text-slate-400 text-sm font-medium mb-2">Total Users</div>
            <div className="text-3xl font-bold text-white">1,250</div>
            <div className="text-green-400 text-sm mt-2">+12% from last month</div>
          </div>

          {/* Total Revenue Card */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 backdrop-blur">
            <div className="text-slate-400 text-sm font-medium mb-2">Total Revenue</div>
            <div className="text-3xl font-bold text-white">$48,500</div>
            <div className="text-green-400 text-sm mt-2">+8% from last month</div>
          </div>

          {/* Services Card */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 backdrop-blur">
            <div className="text-slate-400 text-sm font-medium mb-2">Services</div>
            <div className="text-3xl font-bold text-white">28</div>
            <div className="text-blue-400 text-sm mt-2">Active services</div>
          </div>

          {/* Audit Score Card */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 backdrop-blur">
            <div className="text-slate-400 text-sm font-medium mb-2">Audit Score</div>
            <div className="text-3xl font-bold text-white">94%</div>
            <div className="text-purple-400 text-sm mt-2">Excellent rating</div>
          </div>
        </div>

        {/* Analytics Section */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 backdrop-blur mb-8">
          <h2 className="text-xl font-bold text-white mb-6">Analytics & Insights</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* User Growth Chart */}
            <div className="bg-slate-900/50 rounded-lg p-4">
              <h3 className="text-white font-semibold mb-4">User Growth</h3>
              <div className="h-40 bg-slate-800/50 rounded flex items-center justify-center text-slate-500">
                [Chart]
              </div>
            </div>

            {/* Revenue Breakdown Chart */}
            <div className="bg-slate-900/50 rounded-lg p-4">
              <h3 className="text-white font-semibold mb-4">Revenue Breakdown</h3>
              <div className="h-40 bg-slate-800/50 rounded flex items-center justify-center text-slate-500">
                [Chart]
              </div>
            </div>

            {/* Service Popularity Chart */}
            <div className="bg-slate-900/50 rounded-lg p-4">
              <h3 className="text-white font-semibold mb-4">Service Popularity</h3>
              <div className="h-40 bg-slate-800/50 rounded flex items-center justify-center text-slate-500">
                [Chart]
              </div>
            </div>

            {/* Conversion Funnel Chart */}
            <div className="bg-slate-900/50 rounded-lg p-4">
              <h3 className="text-white font-semibold mb-4">Conversion Funnel</h3>
              <div className="h-40 bg-slate-800/50 rounded flex items-center justify-center text-slate-500">
                [Chart]
              </div>
            </div>

            {/* Daily Audit Rate Chart */}
            <div className="bg-slate-900/50 rounded-lg p-4">
              <h3 className="text-white font-semibold mb-4">Daily Audit Rate</h3>
              <div className="h-40 bg-slate-800/50 rounded flex items-center justify-center text-slate-500">
                [Chart]
              </div>
            </div>

            {/* Top Search Queries Chart */}
            <div className="bg-slate-900/50 rounded-lg p-4">
              <h3 className="text-white font-semibold mb-4">Top Search Queries</h3>
              <div className="h-40 bg-slate-800/50 rounded flex items-center justify-center text-slate-500">
                [Chart]
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mb-8">
          <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition">
            Export CSV
          </button>
          <button className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition">
            Export PDF
          </button>
          <a
            href="/admin/faqs"
            className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition inline-block"
          >
            FAQs
          </a>
        </div>

        {/* Logout Button */}
        <button
          onClick={() => {
            localStorage.removeItem('admin-token');
            router.push('/admin/login');
          }}
          className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
