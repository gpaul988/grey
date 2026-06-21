'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AdminFAQs() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
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
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Admin FAQs</h1>
            <p className="text-slate-400">Manage frequently asked questions</p>
          </div>
          <a
            href="/admin"
            className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition"
          >
            Back to Dashboard
          </a>
        </div>

        {/* FAQs Section */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 backdrop-blur">
          <div className="mb-6">
            <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition mb-4">
              Add New FAQ
            </button>
            <div>
              <input
                type="text"
                placeholder="Search FAQs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 text-white rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="text-white text-lg font-semibold mb-4">FAQs</div>
            
            {/* Sample FAQ item */}
            <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-white font-semibold text-lg">What is a digital audit?</h3>
                <div className="flex gap-2">
                  <button className="text-blue-400 hover:text-blue-300">Edit</button>
                  <button className="text-red-400 hover:text-red-300">Delete</button>
                </div>
              </div>
              <p className="text-slate-400">A comprehensive analysis of your digital presence and capabilities</p>
            </div>

            {/* Another sample FAQ */}
            {searchQuery === '' && (
              <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-white font-semibold text-lg">How long does an audit take?</h3>
                  <div className="flex gap-2">
                    <button className="text-blue-400 hover:text-blue-300">Edit</button>
                    <button className="text-red-400 hover:text-red-300">Delete</button>
                  </div>
                </div>
                <p className="text-slate-400">Typically 2-4 weeks depending on project scope</p>
              </div>
            )}

            {/* React example if searching for React */}
            {searchQuery.toLowerCase().includes('react') && (
              <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-white font-semibold text-lg">React</h3>
                  <div className="flex gap-2">
                    <button className="text-blue-400 hover:text-blue-300">Edit</button>
                    <button className="text-red-400 hover:text-red-300">Delete</button>
                  </div>
                </div>
                <p className="text-slate-400">Frequently asked questions about React development</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
