'use client';

import React, { useState } from 'react';
import { X } from 'lucide-react';

interface AuditRequestFixModalProps {
  isOpen: boolean;
  onClose: () => void;
  auditReportId?: string;
  website?: string;
  gitHubRepo?: string;
  onSuccess?: () => void;
}

export function AuditRequestFixModal({
  isOpen,
  onClose,
  auditReportId,
  website,
  gitHubRepo,
  onSuccess,
}: AuditRequestFixModalProps) {
  const [formData, setFormData] = useState({
    userName: '',
    userEmail: '',
    userPhone: '',
    userCompany: '',
    priority: 'medium',
    budgetEstimate: '',
    specificIssues: '',
    preferredContact: 'email',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/audit/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          auditReportId,
          website,
          gitHubRepo,
          auditData: {
            submittedAt: new Date().toISOString(),
            userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'Unknown',
          },
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit request');
      }

      setSuccess(true);
      setTimeout(() => {
        onClose();
        setSuccess(false);
        setFormData({
          userName: '',
          userEmail: '',
          userPhone: '',
          userCompany: '',
          priority: 'medium',
          budgetEstimate: '',
          specificIssues: '',
          preferredContact: 'email',
        });
        onSuccess?.();
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-cyan-400/40 bg-gradient-to-br from-cyan-950/30 via-slate-900/40 to-slate-950/50 p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-lg transition"
        >
          <X className="w-5 h-5 text-white" />
        </button>

        {success ? (
          <div className="text-center py-12">
            <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400/50">
              <span className="text-3xl">✓</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Request Submitted!</h3>
            <p className="text-slate-300">
              We've received your fix request. Our team will review it and contact you within 24 hours.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-white mb-2">Request a Fix</h2>
              <p className="text-slate-300">
                Tell us about the issues you found and what you'd like us to fix.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="userName"
                    value={formData.userName}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                    className="w-full px-4 py-2.5 rounded-lg border border-white/10 bg-black/30 text-white placeholder-slate-500 outline-none focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20 transition"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-1.5">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="userEmail"
                    value={formData.userEmail}
                    onChange={handleChange}
                    required
                    placeholder="your@email.com"
                    className="w-full px-4 py-2.5 rounded-lg border border-white/10 bg-black/30 text-white placeholder-slate-500 outline-none focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20 transition"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-1.5">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="userPhone"
                    value={formData.userPhone}
                    onChange={handleChange}
                    placeholder="+234 801 234 5678"
                    className="w-full px-4 py-2.5 rounded-lg border border-white/10 bg-black/30 text-white placeholder-slate-500 outline-none focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20 transition"
                  />
                </div>

                {/* Company */}
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-1.5">
                    Company
                  </label>
                  <input
                    type="text"
                    name="userCompany"
                    value={formData.userCompany}
                    onChange={handleChange}
                    placeholder="Your company name"
                    className="w-full px-4 py-2.5 rounded-lg border border-white/10 bg-black/30 text-white placeholder-slate-500 outline-none focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20 transition"
                  />
                </div>

                {/* Priority */}
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-1.5">
                    Priority *
                  </label>
                  <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-white/10 bg-black/30 text-white outline-none focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20 transition"
                  >
                    <option value="low">🟢 Low - No rush</option>
                    <option value="medium">🟡 Medium - Normal timeline</option>
                    <option value="high">🔴 High - Urgent</option>
                    <option value="critical">🔥 Critical - ASAP</option>
                  </select>
                </div>

                {/* Budget */}
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-1.5">
                    Budget Range
                  </label>
                  <select
                    name="budgetEstimate"
                    value={formData.budgetEstimate}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-white/10 bg-black/30 text-white outline-none focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20 transition"
                  >
                    <option value="">Select budget range</option>
                    <option value="$1000-$5000">$1,000 - $5,000</option>
                    <option value="$5000-$10000">$5,000 - $10,000</option>
                    <option value="$10000-$25000">$10,000 - $25,000</option>
                    <option value="$25000-$50000">$25,000 - $50,000</option>
                    <option value="$50000+">$50,000+</option>
                  </select>
                </div>
              </div>

              {/* Preferred Contact */}
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-1.5">
                  Preferred Contact Method *
                </label>
                <div className="flex gap-4">
                  {[
                    { value: 'email', label: '📧 Email' },
                    { value: 'phone', label: '📞 Phone' },
                    { value: 'whatsapp', label: '💬 WhatsApp' },
                  ].map((option) => (
                    <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="preferredContact"
                        value={option.value}
                        checked={formData.preferredContact === option.value}
                        onChange={handleChange}
                        className="w-4 h-4"
                      />
                      <span className="text-sm text-slate-300">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Specific Issues */}
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-1.5">
                  Specific Issues to Fix
                </label>
                <textarea
                  name="specificIssues"
                  value={formData.specificIssues}
                  onChange={handleChange}
                  placeholder="Describe the specific issues from the audit report you'd like us to focus on..."
                  rows={4}
                  className="w-full px-4 py-2.5 rounded-lg border border-white/10 bg-black/30 text-white placeholder-slate-500 outline-none focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20 transition resize-none"
                />
              </div>

              {error && (
                <div className="p-4 rounded-lg bg-red-500/10 border border-red-400/30 text-red-300 text-sm">
                  {error}
                </div>
              )}

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-indigo-500 text-white font-semibold shadow-lg hover:brightness-110 disabled:opacity-60 disabled:cursor-not-allowed transition"
                >
                  {loading ? 'Submitting...' : 'Submit Fix Request'}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 rounded-lg border border-slate-600 text-slate-300 font-semibold hover:bg-white/10 transition"
                >
                  Cancel
                </button>
              </div>

              <p className="text-xs text-slate-500 text-center">
                We'll review your request and respond within 24 hours with a proposal.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
