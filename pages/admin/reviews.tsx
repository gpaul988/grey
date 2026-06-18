'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

interface Review {
  id: number;
  userId: number;
  serviceId: string;
  rating: number;
  title: string;
  comment: string;
  approved: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function ReviewsAdmin() {
  const router = useRouter();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'approved' | 'pending'>('all');

  // Fetch reviews
  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      router.push('/admin/login');
      return;
    }

    fetchReviews(token);
  }, [router]);

  const fetchReviews = async (token: string) => {
    try {
      const res = await fetch('/api/admin/reviews/list', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Failed to fetch reviews');
      const data = await res.json();
      setReviews(data.data || []);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching reviews');
    } finally {
      setLoading(false);
    }
  };

  const toggleApproval = async (id: number, currentStatus: boolean) => {
    const token = localStorage.getItem('admin_token');
    if (!token) return;

    try {
      const res = await fetch('/api/admin/reviews/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id,
          approved: !currentStatus,
        }),
      });

      if (!res.ok) throw new Error('Failed to update review');
      
      const token2 = localStorage.getItem('admin_token');
      if (token2) {
        await fetchReviews(token2);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error updating review');
    }
  };

  const deleteReview = async (id: number) => {
    if (!confirm('Are you sure? This cannot be undone.')) return;
    const token = localStorage.getItem('admin_token');
    if (!token) return;

    try {
      const res = await fetch('/api/admin/reviews/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) throw new Error('Failed to delete review');
      
      const token2 = localStorage.getItem('admin_token');
      if (token2) {
        await fetchReviews(token2);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error deleting review');
    }
  };

  const filteredReviews = reviews.filter((review) => {
    if (filter === 'approved') return review.approved;
    if (filter === 'pending') return !review.approved;
    return true;
  });

  if (loading) return <div className="p-8 text-center">Loading...</div>;

  const stats = {
    total: reviews.length,
    approved: reviews.filter((r) => r.approved).length,
    pending: reviews.filter((r) => !r.approved).length,
    avgRating:
      reviews.length > 0
        ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
        : 0,
  };

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <div className="bg-slate-900 border-b border-slate-700 p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">Review Moderation</h1>
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
          <div className="mb-4 p-4 bg-red-900 text-red-100 rounded">
            {error}
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-900 p-4 rounded border border-slate-700">
            <div className="text-slate-400 text-sm">Total Reviews</div>
            <div className="text-2xl font-bold text-white">{stats.total}</div>
          </div>
          <div className="bg-slate-900 p-4 rounded border border-slate-700">
            <div className="text-slate-400 text-sm">Approved</div>
            <div className="text-2xl font-bold text-green-400">{stats.approved}</div>
          </div>
          <div className="bg-slate-900 p-4 rounded border border-slate-700">
            <div className="text-slate-400 text-sm">Pending</div>
            <div className="text-2xl font-bold text-yellow-400">{stats.pending}</div>
          </div>
          <div className="bg-slate-900 p-4 rounded border border-slate-700">
            <div className="text-slate-400 text-sm">Avg Rating</div>
            <div className="text-2xl font-bold text-blue-400">{stats.avgRating}⭐</div>
          </div>
        </div>

        {/* Filter */}
        <div className="mb-6 flex gap-2">
          {(['all', 'approved', 'pending'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded capitalize ${
                filter === f
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Reviews */}
        <div className="space-y-4">
          {filteredReviews.length === 0 ? (
            <div className="text-slate-400 text-center py-8">No reviews</div>
          ) : (
            filteredReviews.map((review) => (
              <div
                key={review.id}
                className={`bg-slate-900 border rounded p-4 ${
                  review.approved ? 'border-green-700' : 'border-yellow-700'
                }`}
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white">{review.title}</h3>
                    <p className="text-slate-400 text-sm">
                      User #{review.userId} on Service: {review.serviceId}
                    </p>
                  </div>
                  <div className="text-xl text-yellow-400">{'⭐'.repeat(review.rating)}</div>
                </div>

                <p className="text-slate-300 mb-4">{review.comment}</p>

                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    {review.approved ? (
                      <span className="px-3 py-1 bg-green-900 text-green-300 text-sm rounded">
                        ✓ Approved
                      </span>
                    ) : (
                      <span className="px-3 py-1 bg-yellow-900 text-yellow-300 text-sm rounded">
                        ⏳ Pending
                      </span>
                    )}
                    <span className="px-3 py-1 bg-slate-800 text-slate-400 text-sm rounded">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleApproval(review.id, review.approved)}
                      className={`px-3 py-1 rounded text-sm ${
                        review.approved
                          ? 'bg-yellow-600 text-white hover:bg-yellow-700'
                          : 'bg-green-600 text-white hover:bg-green-700'
                      }`}
                    >
                      {review.approved ? 'Reject' : 'Approve'}
                    </button>
                    <button
                      onClick={() => deleteReview(review.id)}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
