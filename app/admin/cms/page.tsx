'use client';

import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit2, Trash2, Eye, Save, X } from 'lucide-react';

interface CMSPage {
  id: number;
  title: string;
  slug: string;
  content: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function AdminCMSPage() {
  const [pages, setPages] = useState<CMSPage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showNewForm, setShowNewForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    published: false,
  });

  // Fetch pages on mount
  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/cms/pages');
      const data = await response.json();
      setPages(data.pages || []);
      setError('');
    } catch (err) {
      setError('Failed to load pages');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.slug) {
      setError('Title and slug are required');
      return;
    }

    try {
      const response = await fetch('/api/cms/pages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to create page');
      }

      setFormData({ title: '', slug: '', content: '', published: false });
      setShowNewForm(false);
      fetchPages();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleUpdate = async (id: number) => {
    const page = pages.find((p) => p.id === id);
    if (!page) return;

    try {
      const response = await fetch(`/api/cms/pages/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: page.title,
          slug: page.slug,
          content: page.content,
          published: page.published,
        }),
      });

      if (!response.ok) throw new Error('Failed to update page');

      setEditingId(null);
      fetchPages();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this page?')) return;

    try {
      await fetch(`/api/cms/pages/${id}`, { method: 'DELETE' });
      fetchPages();
    } catch (err) {
      setError('Failed to delete page');
    }
  };

  const togglePublished = (id: number) => {
    setPages((prevPages) =>
      prevPages.map((p) => (p.id === id ? { ...p, published: !p.published } : p))
    );
  };

  const updatePageField = (id: number, field: string, value: any) => {
    setPages((prevPages) =>
      prevPages.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  const filteredPages = pages.filter(
    (page) =>
      page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      page.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-20 pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-4xl font-bold text-white">CMS Pages</h1>
            <p className="mt-1 text-slate-400">Manage website content (Super Admin Only)</p>
          </div>
          <button
            onClick={() => {
              setShowNewForm(!showNewForm);
              setEditingId(null);
            }}
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-cyan-500 to-indigo-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg hover:brightness-110 transition"
          >
            <Plus className="h-4 w-4" />
            New Page
          </button>
        </div>

        {/* New Page Form */}
        {showNewForm && (
          <div className="mb-8 rounded-2xl border border-cyan-400/40 bg-gradient-to-br from-cyan-950/30 via-slate-900/40 to-slate-950/50 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">Create New Page</h2>
              <button
                onClick={() => setShowNewForm(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  type="text"
                  placeholder="Page Title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="rounded-lg border border-white/10 bg-black/30 px-4 py-2.5 text-white outline-none focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20"
                  required
                />
                <input
                  type="text"
                  placeholder="Page Slug (e.g., about-us)"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="rounded-lg border border-white/10 bg-black/30 px-4 py-2.5 text-white outline-none focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20"
                  required
                />
              </div>
              <textarea
                placeholder="Page Content (Markdown or HTML)"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                rows={6}
                className="w-full rounded-lg border border-white/10 bg-black/30 px-4 py-2.5 text-white outline-none focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20 resize-none"
              />
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.published}
                  onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                  className="w-4 h-4"
                />
                <span className="text-white font-medium">Publish immediately</span>
              </label>
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 rounded-lg bg-emerald-600 px-4 py-2.5 font-semibold text-white hover:bg-emerald-700 transition"
                >
                  Create Page
                </button>
                <button
                  type="button"
                  onClick={() => setShowNewForm(false)}
                  className="flex-1 rounded-lg border border-slate-600 px-4 py-2.5 font-semibold text-slate-300 hover:bg-white/10 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-3 h-5 w-5 text-slate-500" />
            <input
              type="text"
              placeholder="Search pages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-black/30 pl-12 pr-4 py-3 text-white outline-none focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20"
            />
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-6 rounded-lg bg-red-500/10 border border-red-400/30 px-4 py-3 text-red-300 text-sm">
            {error}
          </div>
        )}

        {/* Pages Table */}
        <div className="rounded-2xl border border-slate-700/50 bg-slate-900/50 backdrop-blur-sm overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-slate-400">Loading pages...</div>
          ) : filteredPages.length === 0 ? (
            <div className="p-8 text-center text-slate-400">
              {pages.length === 0 ? 'No pages yet. Create your first page!' : 'No pages match your search.'}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-slate-700/50 bg-slate-800/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Title</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Slug</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Updated</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-slate-300">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/30">
                  {editingId ? (
                    // Edit mode for specific row
                    filteredPages.map((page) =>
                      editingId === page.id ? (
                        <tr key={page.id} className="bg-slate-800/30">
                          <td colSpan={5} className="px-6 py-4">
                            <div className="space-y-4">
                              <div className="grid gap-4 sm:grid-cols-2">
                                <input
                                  type="text"
                                  value={page.title}
                                  onChange={(e) => updatePageField(page.id, 'title', e.target.value)}
                                  className="rounded-lg border border-white/10 bg-black/30 px-4 py-2 text-white outline-none focus:border-cyan-400/60"
                                  placeholder="Title"
                                />
                                <input
                                  type="text"
                                  value={page.slug}
                                  onChange={(e) => updatePageField(page.id, 'slug', e.target.value)}
                                  className="rounded-lg border border-white/10 bg-black/30 px-4 py-2 text-white outline-none focus:border-cyan-400/60"
                                  placeholder="Slug"
                                />
                              </div>
                              <textarea
                                value={page.content}
                                onChange={(e) => updatePageField(page.id, 'content', e.target.value)}
                                rows={4}
                                className="w-full rounded-lg border border-white/10 bg-black/30 px-4 py-2 text-white outline-none focus:border-cyan-400/60 resize-none"
                                placeholder="Content"
                              />
                              <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={page.published}
                                  onChange={(e) => updatePageField(page.id, 'published', e.target.checked)}
                                  className="w-4 h-4"
                                />
                                <span className="text-white font-medium">Published</span>
                              </label>
                              <div className="flex gap-2">
                                <button
                                  onClick={() => handleUpdate(page.id)}
                                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 font-semibold text-white hover:bg-emerald-700 transition"
                                >
                                  <Save className="h-4 w-4" />
                                  Save
                                </button>
                                <button
                                  onClick={() => setEditingId(null)}
                                  className="flex-1 rounded-lg border border-slate-600 px-4 py-2 font-semibold text-slate-300 hover:bg-white/10 transition"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ) : (
                        <tr key={page.id} className="hover:bg-slate-800/30 transition">
                          <td className="px-6 py-4 text-white font-medium">{page.title}</td>
                          <td className="px-6 py-4 text-slate-400 font-mono text-sm">{page.slug}</td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-block px-3 py-1 rounded-full text-xs font-semibold cursor-pointer transition ${
                                page.published
                                  ? 'bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30'
                                  : 'bg-slate-500/20 text-slate-300 hover:bg-slate-500/30'
                              }`}
                              onClick={() => togglePublished(page.id)}
                            >
                              {page.published ? '✓ Published' : 'Draft'}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-slate-400 text-sm">
                            {new Date(page.updatedAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex justify-end gap-2">
                              <button
                                onClick={() => setEditingId(page.id)}
                                className="inline-flex items-center gap-1 rounded-lg bg-blue-500/20 px-3 py-1.5 text-xs font-semibold text-blue-300 hover:bg-blue-500/30 transition"
                              >
                                <Edit2 className="h-3 w-3" />
                                Edit
                              </button>
                              <a
                                href={`/pages/${page.slug}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 rounded-lg bg-cyan-500/20 px-3 py-1.5 text-xs font-semibold text-cyan-300 hover:bg-cyan-500/30 transition"
                              >
                                <Eye className="h-3 w-3" />
                                View
                              </a>
                              <button
                                onClick={() => handleDelete(page.id)}
                                className="inline-flex items-center gap-1 rounded-lg bg-red-500/20 px-3 py-1.5 text-xs font-semibold text-red-300 hover:bg-red-500/30 transition"
                              >
                                <Trash2 className="h-3 w-3" />
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      )
                    )
                  ) : (
                    // Normal view
                    filteredPages.map((page) => (
                      <tr key={page.id} className="hover:bg-slate-800/30 transition">
                        <td className="px-6 py-4 text-white font-medium">{page.title}</td>
                        <td className="px-6 py-4 text-slate-400 font-mono text-sm">{page.slug}</td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold cursor-pointer transition ${
                              page.published
                                ? 'bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30'
                                : 'bg-slate-500/20 text-slate-300 hover:bg-slate-500/30'
                            }`}
                            onClick={() => togglePublished(page.id)}
                          >
                            {page.published ? '✓ Published' : 'Draft'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-slate-400 text-sm">
                          {new Date(page.updatedAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => setEditingId(page.id)}
                              className="inline-flex items-center gap-1 rounded-lg bg-blue-500/20 px-3 py-1.5 text-xs font-semibold text-blue-300 hover:bg-blue-500/30 transition"
                            >
                              <Edit2 className="h-3 w-3" />
                              Edit
                            </button>
                            <a
                              href={`/pages/${page.slug}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 rounded-lg bg-cyan-500/20 px-3 py-1.5 text-xs font-semibold text-cyan-300 hover:bg-cyan-500/30 transition"
                            >
                              <Eye className="h-3 w-3" />
                              View
                            </a>
                            <button
                              onClick={() => handleDelete(page.id)}
                              className="inline-flex items-center gap-1 rounded-lg bg-red-500/20 px-3 py-1.5 text-xs font-semibold text-red-300 hover:bg-red-500/30 transition"
                            >
                              <Trash2 className="h-3 w-3" />
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Info Box */}
        <div className="mt-8 rounded-lg border border-cyan-400/40 bg-cyan-400/5 p-4 text-sm text-cyan-300">
          <p className="font-semibold mb-2">💡 CMS Information:</p>
          <ul className="space-y-1 text-cyan-300/80">
            <li>• Only Super Admin can create/edit/delete pages</li>
            <li>• Click status badge to toggle published/draft state</li>
            <li>• Published pages are visible to public at /pages/[slug]</li>
            <li>• Draft pages are hidden from public view</li>
            <li>• Click "View" to see page on live site</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
