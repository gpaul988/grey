'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

interface CMSPage {
  id: number;
  slug: string;
  title: string;
  description?: string;
  type: 'blog' | 'doc' | 'service' | 'page';
  author?: string;
  published: boolean;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

interface FormData {
  slug: string;
  title: string;
  description: string;
  type: 'blog' | 'doc' | 'service' | 'page';
  author: string;
  content: string;
  published: boolean;
}

export default function CMSAdmin() {
  const router = useRouter();
  const [pages, setPages] = useState<CMSPage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<FormData>({
    slug: '',
    title: '',
    description: '',
    type: 'page',
    author: '',
    content: '',
    published: false,
  });

  // Fetch pages
  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      router.push('/admin/login');
      return;
    }

    fetchPages(token);
  }, [router]);

  const fetchPages = async (token: string) => {
    try {
      const res = await fetch('/api/admin/cms/list', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Failed to fetch pages');
      const data = await res.json();
      setPages(data.data || []);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching pages');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('admin_token');
    if (!token) return;

    try {
      const endpoint = editingId ? `/api/admin/cms/update` : `/api/admin/cms/create`;
      const body = editingId ? { ...formData, id: editingId } : formData;

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error('Failed to save page');
      
      const token2 = localStorage.getItem('admin_token');
      if (token2) {
        await fetchPages(token2);
      }
      
      resetForm();
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error saving page');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure?')) return;
    const token = localStorage.getItem('admin_token');
    if (!token) return;

    try {
      const res = await fetch('/api/admin/cms/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) throw new Error('Failed to delete page');
      
      const token2 = localStorage.getItem('admin_token');
      if (token2) {
        await fetchPages(token2);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error deleting page');
    }
  };

  const handleEdit = (page: CMSPage) => {
    setFormData({
      slug: page.slug,
      title: page.title,
      description: page.description || '',
      type: page.type,
      author: page.author || '',
      content: '',
      published: page.published,
    });
    setEditingId(page.id);
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      slug: '',
      title: '',
      description: '',
      type: 'page',
      author: '',
      content: '',
      published: false,
    });
    setEditingId(null);
    setShowForm(false);
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <div className="bg-slate-900 border-b border-slate-700 p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">CMS Management</h1>
          <div className="flex gap-4">
            <button
              onClick={() => setShowForm(!showForm)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {showForm ? 'Cancel' : 'New Page'}
            </button>
            <Link
              href="/admin"
              className="px-4 py-2 bg-slate-700 text-white rounded hover:bg-slate-600"
            >
              Dashboard
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {error && (
          <div className="mb-4 p-4 bg-red-900 text-red-100 rounded">
            {error}
          </div>
        )}

        {/* Form */}
        {showForm && (
          <div className="mb-8 bg-slate-900 p-6 rounded border border-slate-700">
            <h2 className="text-2xl font-bold text-white mb-4">
              {editingId ? 'Edit Page' : 'Create New Page'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 mb-2">Slug</label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    required
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-2">Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 mb-2">Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white"
                  >
                    <option value="blog">Blog</option>
                    <option value="doc">Documentation</option>
                    <option value="service">Service</option>
                    <option value="page">Page</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 mb-2">Author</label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-slate-300">
                  <input
                    type="checkbox"
                    checked={formData.published}
                    onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                  />
                  Published
                </label>
              </div>

              <button
                type="submit"
                className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                {editingId ? 'Update Page' : 'Create Page'}
              </button>
            </form>
          </div>
        )}

        {/* Pages List */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Pages ({pages.length})</h2>
          {pages.length === 0 ? (
            <div className="text-slate-400 text-center py-8">No pages yet</div>
          ) : (
            <div className="grid gap-4">
              {pages.map((page) => (
                <div
                  key={page.id}
                  className="bg-slate-900 border border-slate-700 rounded p-4 flex justify-between items-start"
                >
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white">{page.title}</h3>
                    <p className="text-slate-400 text-sm">/{page.slug}</p>
                    <div className="flex gap-2 mt-2">
                      <span className="px-2 py-1 bg-slate-800 text-slate-300 text-xs rounded">
                        {page.type}
                      </span>
                      {page.published && (
                        <span className="px-2 py-1 bg-green-900 text-green-300 text-xs rounded">
                          Published
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(page)}
                      className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(page.id)}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
