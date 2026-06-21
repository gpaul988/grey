'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface CMSPage {
  id: number;
  title: string;
  slug: string;
  content: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function CMSPageViewer() {
  const params = useParams();
  const slug = params?.slug as string;
  const [page, setPage] = useState<CMSPage | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;

    const fetchPage = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/cms/pages/${slug}`);

        if (!response.ok) {
          setNotFound(true);
          return;
        }

        const data = await response.json();
        setPage(data.page);
      } catch (error) {
        console.error('Error fetching page:', error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
  }, [slug]);

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-20 pb-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center text-slate-400">Loading page...</div>
        </div>
      </main>
    );
  }

  if (notFound || !page) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-20 pb-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-lg border border-red-400/30 bg-red-500/10 p-8 text-center">
            <h1 className="text-3xl font-bold text-white mb-2">Page Not Found</h1>
            <p className="text-slate-300 mb-6">The page you're looking for doesn't exist or hasn't been published yet.</p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-lg bg-cyan-500/20 px-4 py-2 text-cyan-300 hover:bg-cyan-500/30 transition"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // Parse markdown-style headers and format content
  const formatContent = (content: string) => {
    return content
      .split('\n')
      .map((line, idx) => {
        if (line.startsWith('# ')) {
          return (
            <h1 key={idx} className="text-4xl font-bold text-white mt-8 mb-4">
              {line.slice(2)}
            </h1>
          );
        }
        if (line.startsWith('## ')) {
          return (
            <h2 key={idx} className="text-3xl font-bold text-white mt-6 mb-3">
              {line.slice(3)}
            </h2>
          );
        }
        if (line.startsWith('### ')) {
          return (
            <h3 key={idx} className="text-2xl font-bold text-white mt-4 mb-2">
              {line.slice(4)}
            </h3>
          );
        }
        if (line.startsWith('- ')) {
          return (
            <li key={idx} className="text-slate-300 ml-6 mb-1">
              {line.slice(2)}
            </li>
          );
        }
        if (line.trim() === '') {
          return <div key={idx} className="mb-4" />;
        }
        return (
          <p key={idx} className="text-slate-300 text-lg leading-relaxed mb-3">
            {line}
          </p>
        );
      });
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-20 pb-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 transition text-sm"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>

        {/* Page Content */}
        <article className="rounded-2xl border border-slate-700/50 bg-slate-900/50 backdrop-blur-sm p-8 sm:p-12">
          {/* Header */}
          <header className="mb-8 pb-8 border-b border-slate-700/50">
            <h1 className="text-5xl font-bold text-white mb-2">{page.title}</h1>
            <p className="text-slate-400 text-sm">
              Last updated {new Date(page.updatedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </header>

          {/* Content */}
          <div className="prose prose-invert max-w-none space-y-4">
            {formatContent(page.content)}
          </div>

          {/* Footer */}
          <div className="mt-12 pt-8 border-t border-slate-700/50">
            <p className="text-slate-500 text-sm">
              © {new Date().getFullYear()} Grey InfoTech Limited. All rights reserved.
            </p>
          </div>
        </article>
      </div>
    </main>
  );
}
