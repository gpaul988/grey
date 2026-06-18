'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

interface FaqItem {
  id: number;
  question: string;
  answer: string;
  category: string;
  sort_order: number;
  active: number;
  created_at: string;
}

export default function AdminFAQsPage() {
  const router = useRouter();
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    category: 'General',
    sort_order: 0,
    active: 1,
  });
  const [token, setToken] = useState<string>('');

  // Check authentication on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const stored = localStorage.getItem('admin-token');
        if (!stored) {
          router.push('/admin/login');
          return;
        }

        setToken(stored);

        // Verify token with server
        const res = await fetch('/api/admin/auth/verify', {
          headers: { 'X-Admin-Token': stored },
        });

        if (!res.ok) {
          localStorage.removeItem('admin-token');
          router.push('/admin/login');
          return;
        }

        setLoading(false);
        fetchFAQs(stored);
      } catch (err) {
        console.error('Auth check failed:', err);
        router.push('/admin/login');
      }
    };

    checkAuth();
  }, [router]);

  const fetchFAQs = async (authToken: string) => {
    try {
      setError(null);
      const queryParams = new URLSearchParams();
      if (searchQuery) queryParams.append('search', searchQuery);
      if (filter !== 'all') queryParams.append('category', filter);
      queryParams.append('limit', '100');

      const res = await fetch(`/api/admin/faqs/list?${queryParams}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      if (!res.ok) {
        throw new Error(`Failed to fetch FAQs: ${res.status}`);
      }

      const data = await res.json();
      setFaqs(data.faqs);
      setCategories(data.categories);
    } catch (err: any) {
      setError(err.message || 'Failed to load FAQs');
      setFaqs([]);
    }
  };

  const handleSearch = () => {
    if (token) fetchFAQs(token);
  };

  const handleAddNew = () => {
    setIsEditing(true);
    setEditingId(null);
    setFormData({
      question: '',
      answer: '',
      category: 'General',
      sort_order: 0,
      active: 1,
    });
  };

  const handleEdit = (faq: FaqItem) => {
    setIsEditing(true);
    setEditingId(faq.id);
    setFormData({
      question: faq.question,
      answer: faq.answer,
      category: faq.category,
      sort_order: faq.sort_order,
      active: faq.active,
    });
  };

  const handleSave = async () => {
    if (!formData.question || !formData.answer) {
      setError('Question and answer are required');
      return;
    }

    try {
      setError(null);
      const method = editingId ? 'PUT' : 'POST';
      const url = editingId
        ? `/api/admin/faqs/${editingId}/update`
        : '/api/admin/faqs/create';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error(`Failed to save FAQ: ${res.status}`);
      }

      setSuccess(editingId ? 'FAQ updated successfully' : 'FAQ created successfully');
      setIsEditing(false);
      setEditingId(null);

      // Refresh list
      setTimeout(() => {
        setSuccess(null);
        fetchFAQs(token);
      }, 1500);
    } catch (err: any) {
      setError(err.message || 'Failed to save FAQ');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this FAQ?')) return;

    try {
      setError(null);
      const res = await fetch(`/api/admin/faqs/${id}/delete`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        throw new Error(`Failed to delete FAQ: ${res.status}`);
      }

      setSuccess('FAQ deleted successfully');
      setTimeout(() => {
        setSuccess(null);
        fetchFAQs(token);
      }, 1500);
    } catch (err: any) {
      setError(err.message || 'Failed to delete FAQ');
    }
  };

  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = !searchQuery || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filter === 'all' || faq.category === filter;
    return matchesSearch && matchesCategory;
  });

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
            <p className="text-sm text-slate-400">Manage {faqs.length} FAQs across {categories.length} categories</p>
          </div>
          <Link
            href="/admin/dashboard"
            className="px-4 py-2 text-sm text-slate-300 hover:text-white transition"
          >
            ← Back to Dashboard
          </Link>
        </div>
      </header>

      {/* Alerts */}
      {error && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="bg-red-500/10 border border-red-500/30 text-red-300 px-4 py-3 rounded">
            {error}
          </div>
        </div>
      )}
      {success && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="bg-green-500/10 border border-green-500/30 text-green-300 px-4 py-3 rounded">
            {success}
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Form for Add/Edit */}
        {isEditing && (
          <div className="mb-8 bg-slate-800/50 border border-slate-700 rounded-lg p-6">
            <h2 className="text-xl font-bold text-white mb-4">
              {editingId ? 'Edit FAQ' : 'Add New FAQ'}
            </h2>
            <div className="grid gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Question
                </label>
                <input
                  type="text"
                  value={formData.question}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                  placeholder="Enter question"
                  className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Answer
                </label>
                <textarea
                  value={formData.answer}
                  onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                  placeholder="Enter answer"
                  rows={4}
                  className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded text-white focus:outline-none focus:border-cyan-400"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Sort Order
                  </label>
                  <input
                    type="number"
                    value={formData.sort_order}
                    onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="active"
                  checked={formData.active === 1}
                  onChange={(e) => setFormData({ ...formData, active: e.target.checked ? 1 : 0 })}
                  className="w-4 h-4"
                />
                <label htmlFor="active" className="text-sm font-medium text-slate-300">
                  Active
                </label>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded font-medium transition"
                >
                  Save FAQ
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded font-medium transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Controls */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyUp={handleSearch}
              className="px-4 py-2 bg-slate-800/50 border border-slate-700 rounded text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400"
            />
            <select
              value={filter}
              onChange={(e) => {
                setFilter(e.target.value);
                if (token) fetchFAQs(token);
              }}
              className="px-4 py-2 bg-slate-800/50 border border-slate-700 rounded text-white focus:outline-none focus:border-cyan-400"
            >
              <option value="all">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <button
            onClick={handleAddNew}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded font-medium transition"
          >
            + Add New FAQ
          </button>
        </div>

        {/* FAQs List */}
        <div className="space-y-3">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-8 text-slate-400">
              No FAQs found. {isEditing ? '' : 'Click "Add New FAQ" to create one.'}
            </div>
          ) : (
            filteredFaqs.map(faq => (
              <div
                key={faq.id}
                className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 hover:bg-slate-800 transition"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-white">{faq.question}</h3>
                    <p className="text-sm text-slate-400 mt-1 line-clamp-2">{faq.answer}</p>
                    <div className="flex gap-2 mt-2">
                      <span className="text-xs bg-slate-700/50 px-2 py-1 rounded text-slate-300">
                        {faq.category}
                      </span>
                      {faq.active === 0 && (
                        <span className="text-xs bg-red-500/20 px-2 py-1 rounded text-red-300">
                          Inactive
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(faq)}
                      className="px-3 py-1 text-sm bg-blue-600/20 hover:bg-blue-600/40 text-blue-300 rounded transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(faq.id)}
                      className="px-3 py-1 text-sm bg-red-600/20 hover:bg-red-600/40 text-red-300 rounded transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
