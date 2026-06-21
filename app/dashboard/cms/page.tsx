'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Plus, Edit2, Trash2, Eye, Globe } from 'lucide-react';

interface CmsPage {
  id: number;
  title: string;
  slug: string;
  content: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function CMSDashboard() {
  const [pages, setPages] = useState<CmsPage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewPageForm, setShowNewPageForm] = useState(false);
  const [newPageData, setNewPageData] = useState({ title: '', slug: '', content: '' });

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

  const handleCreatePage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newPageData.title || !newPageData.slug) {
      setError('Title and slug are required');
      return;
    }

    try {
      const response = await fetch('/api/cms/pages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPageData),
      });

      if (!response.ok) throw new Error('Failed to create page');

      setNewPageData({ title: '', slug: '', content: '' });
      setShowNewPageForm(false);
      fetchPages();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDeletePage = async (id: number) => {
    if (!confirm('Are you sure you want to delete this page?')) return;

    try {
      await fetch(`/api/cms/pages/${id}`, { method: 'DELETE' });
      fetchPages();
    } catch (err) {
      setError('Failed to delete page');
    }
  };

  const filteredPages = pages.filter((page) =>
    page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    page.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-20 pb-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-4xl font-bold text-white">CMS Dashboard</h1>
            <p className="mt-1 text-slate-400">Manage your website content</p>
          </div>
          <button
            onClick={() => setShowNewPageForm(!showNewPageForm)}
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-cyan-500 to-indigo-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg hover:brightness-110 transition"
          >
            <Plus className="h-4 w-4" />
            New Page
          </button>
        </div>

        {/* Create Page Form */}
        {showNewPageForm && (
          <div className="mb-8 rounded-2xl border border-cyan-400/40 bg-gradient-to-br from-cyan-950/30 via-slate-900/40 to-slate-950/50 p-6">
            <h2 className="mb-4 text-xl font-bold text-white">Create New Page</h2>
            <form onSubmit={handleCreatePage} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  type="text"
                  placeholder="Page Title"
                  value={newPageData.title}
                  onChange={(e) => setNewPageData({ ...newPageData, title: e.target.value })}
                  className="rounded-lg border border-white/10 bg-black/30 px-4 py-2.5 text-white outline-none focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20"
                />
                <input
                  type="text"
                  placeholder="Page Slug (e.g., about-us)"
                  value={newPageData.slug}
                  onChange={(e) => setNewPageData({ ...newPageData, slug: e.target.value })}
                  className="rounded-lg border border-white/10 bg-black/30 px-4 py-2.5 text-white outline-none focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20"
                />
              </div>
              <textarea
                placeholder="Page Content (Markdown or HTML)"
                value={newPageData.content}
                onChange={(e) => setNewPageData({ ...newPageData, content: e.target.value })}
                rows={6}
                className="w-full rounded-lg border border-white/10 bg-black/30 px-4 py-2.5 text-white outline-none focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20 resize-none"
              />
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 rounded-lg bg-emerald-600 px-4 py-2.5 font-semibold text-white hover:bg-emerald-700 transition"
                >
                  Create Page
                </button>
                <button
                  type="button"
                  onClick={() => setShowNewPageForm(false)}
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
          <div className="mb-6 rounded-lg bg-red-500/10 border border-red-400/30 px-4 py-3 text-red-300">
            {error}
          </div>
        )}

        {/* Pages List */}
        <div className="rounded-2xl border border-slate-700/50 bg-slate-900/50 backdrop-blur-sm overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-slate-400">
              Loading pages...
            </div>
          ) : filteredPages.length === 0 ? (
            <div className="p-8 text-center text-slate-400">
              {pages.length === 0
                ? 'No pages yet. Create your first page!'
                : 'No pages match your search.'}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-slate-700/50 bg-slate-800/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                      Title
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                      Slug
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                      Updated
                    </th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-slate-300">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/30">
                  {filteredPages.map((page) => (
                    <tr key={page.id} className="hover:bg-slate-800/30 transition">
                      <td className="px-6 py-4 text-white font-medium">{page.title}</td>
                      <td className="px-6 py-4 text-slate-400 font-mono text-sm">{page.slug}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                            page.published
                              ? 'bg-emerald-500/20 text-emerald-300'
                              : 'bg-slate-500/20 text-slate-300'
                          }`}
                        >
                          {page.published ? '✓ Published' : 'Draft'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-400 text-sm">
                        {new Date(page.updatedAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Link
                            href={`/dashboard/cms/${page.id}/edit`}
                            className="inline-flex items-center gap-1 rounded-lg bg-blue-500/20 px-3 py-1.5 text-xs font-semibold text-blue-300 hover:bg-blue-500/30 transition"
                          >
                            <Edit2 className="h-3 w-3" />
                            Edit
                          </Link>
                          <a
                            href={`/pages/${page.slug}`}
                            target="_blank"
                            className="inline-flex items-center gap-1 rounded-lg bg-cyan-500/20 px-3 py-1.5 text-xs font-semibold text-cyan-300 hover:bg-cyan-500/30 transition"
                          >
                            <Eye className="h-3 w-3" />
                            View
                          </a>
                          <button
                            onClick={() => handleDeletePage(page.id)}
                            className="inline-flex items-center gap-1 rounded-lg bg-red-500/20 px-3 py-1.5 text-xs font-semibold text-red-300 hover:bg-red-500/30 transition"
                          >
                            <Trash2 className="h-3 w-3" />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Info Box */}
        <div className="mt-8 rounded-lg border border-cyan-400/40 bg-cyan-400/5 p-4 text-sm text-cyan-300">
          <p className="font-semibold mb-2">💡 Pro Tips:</p>
          <ul className="space-y-1 text-cyan-300/80">
            <li>• Slugs are used in URLs, so keep them lowercase and use hyphens</li>
            <li>• You can use Markdown or HTML for page content</li>
            <li>• Published pages are visible to the public</li>
            <li>• Draft pages are hidden from public view</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
