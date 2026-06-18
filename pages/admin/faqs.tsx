'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

interface FaqItem {
  id: number;
  question: string;
  answer: string;
  category: string;
  sortOrder: number;
  active: number;
}

export default function AdminFAQsPage() {
  const router = useRouter();
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isEditingId, setIsEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Partial<FaqItem>>({});

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
        fetchFAQs();
      } catch (err) {
        console.error('Auth check failed:', err);
        router.push('/admin/login');
      }
    };

    checkAuth();
  }, [router]);

  const fetchFAQs = async () => {
    try {
      // For now, show placeholder - would need backend API to fetch FAQs
      setFaqs([]);
      setError('FAQs admin API not yet implemented. Coming soon!');
    } catch (err) {
      setError('Failed to load FAQs');
    }
  };

  const handleEdit = (faq: FaqItem) => {
    setIsEditingId(faq.id);
    setEditForm(faq);
  };

  const handleSave = async () => {
    if (!isEditingId) return;
    try {
      // TODO: API call to save
      setIsEditingId(null);
      setEditForm({});
      fetchFAQs();
    } catch (err) {
      setError('Failed to save FAQ');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this FAQ?')) return;
    try {
      // TODO: API call to delete
      fetchFAQs();
    } catch (err) {
      setError('Failed to delete FAQ');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
          <p className="mt-4 text-slate-300">Loading...</p>
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
            <h1 className="text-2xl font-bold text-white">FAQ Management</h1>
            <p className="text-sm text-slate-400">Manage frequently asked questions</p>
          </div>
          <Link
            href="/admin/dashboard"
            className="px-4 py-2 text-sm text-slate-300 hover:text-white transition"
          >
            ← Back to Dashboard
          </Link>
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
        {/* Controls */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-2 bg-slate-800/50 border border-slate-700 rounded text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400"
            />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 bg-slate-800/50 border border-slate-700 rounded text-white focus:outline-none focus:border-cyan-400"
            >
              <option value="all">All FAQs</option>
              <option value="active">Active Only</option>
              <option value="inactive">Inactive Only</option>
            </select>
          </div>
          <button className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded font-medium transition">
            + Add FAQ
          </button>
        </div>

        {/* FAQs Table */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg overflow-hidden">
          {faqs.length === 0 ? (
            <div className="p-8 text-center text-slate-400">
              <p className="mb-2">No FAQs found</p>
              <p className="text-sm">Add your first FAQ to get started</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-700/50 border-b border-slate-600">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-medium text-slate-300">Question</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-slate-300">Category</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-slate-300">Status</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-slate-300">Order</th>
                    <th className="px-6 py-3 text-right text-sm font-medium text-slate-300">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {faqs.map((faq) => (
                    <tr
                      key={faq.id}
                      className="border-b border-slate-700 hover:bg-slate-700/30 transition"
                    >
                      <td className="px-6 py-4 text-sm text-white max-w-md truncate">
                        {faq.question}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-300">{faq.category}</td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            faq.active
                              ? 'bg-green-500/20 text-green-300'
                              : 'bg-slate-500/20 text-slate-300'
                          }`}
                        >
                          {faq.active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-300">{faq.sortOrder}</td>
                      <td className="px-6 py-4 text-right text-sm">
                        <button
                          onClick={() => handleEdit(faq)}
                          className="text-cyan-400 hover:text-cyan-300 mr-4 transition"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(faq.id)}
                          className="text-red-400 hover:text-red-300 transition"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
