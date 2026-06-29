'use client';

import React, { useState } from 'react';
import { X } from 'lucide-react';
import type { AuditReport } from '@/lib/audit/engine';

interface AuditRequestFixModalProps {
  isOpen: boolean;
  onClose: () => void;
  auditReportId?: string;
  website?: string;
  gitHubRepo?: string;
  onSuccess?: () => void;
  /** Full audit report — attached to submission so admin sees all findings + fixes */
  auditReport?: AuditReport & { externalId?: string };
}

const CONTACT_OPTIONS = [
  { value: 'email',     label: '📧 Email' },
  { value: 'phone',     label: '📞 Phone' },
  { value: 'whatsapp',  label: '💬 WhatsApp' },
  { value: 'all',       label: '✅ All Methods' },
];

const BUDGET_OPTIONS = [
  { value: '',                  label: 'Select budget range' },
  { value: '$500-$1000',        label: '$500 – $1,000' },
  { value: '$1000-$5000',       label: '$1,000 – $5,000' },
  { value: '$5000-$10000',      label: '$5,000 – $10,000' },
  { value: '$10000-$25000',     label: '$10,000 – $25,000' },
  { value: '$25000-$50000',     label: '$25,000 – $50,000' },
  { value: '$50000+',           label: '$50,000+' },
  { value: 'other',             label: '✏️ Other / Specify below' },
];

export function AuditRequestFixModal({
  isOpen,
  onClose,
  auditReportId,
  website,
  gitHubRepo,
  onSuccess,
  auditReport,
}: AuditRequestFixModalProps) {
  const [formData, setFormData] = useState({
    userName:         '',
    userEmail:        '',
    userPhone:        '',
    userCompany:      '',
    priority:         'medium',
    budgetEstimate:   '',
    budgetCustom:     '',
    specificIssues:   '',
    preferredContact: 'email',
  });

  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Client-side validation
    if (!formData.userName.trim()) { setError('Full name is required.'); return; }
    if (!formData.userEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.userEmail)) {
      setError('A valid email address is required.');
      return;
    }
    if (!formData.userPhone.trim()) { setError('Phone number is required.'); return; }
    
    const effectiveBudget =
      formData.budgetEstimate === 'other'
        ? formData.budgetCustom.trim()
        : formData.budgetEstimate;
    
    if (!effectiveBudget) { setError('Please select or specify a budget estimate.'); return; }
    if (!formData.specificIssues.trim()) { setError('Please describe the specific issues you want fixed.'); return; }

    setLoading(true);
    try {
      // Build auditData — always include the full report so admin has every finding + fix
      const auditData: Record<string, unknown> = {
        submittedAt: new Date().toISOString(),
        userAgent:   typeof navigator !== 'undefined' ? navigator.userAgent : 'Unknown',
      };
      if (auditReport) {
        auditData.overallScore    = auditReport.overallScore;
        auditData.grade           = auditReport.grade;
        auditData.summary         = auditReport.summary;
        auditData.detailedSummary = auditReport.detailedSummary;
        auditData.sections        = auditReport.sections;        // full findings + fix + implementation
        auditData.generatedAt     = auditReport.generatedAt;
        auditData.target          = auditReport.target;
        if (auditReport.externalId) auditData.externalId = auditReport.externalId;
      }

      const response = await fetch('/api/audit/submit', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userName:         formData.userName.trim(),
          userEmail:        formData.userEmail.trim(),
          userPhone:        formData.userPhone.trim() || null,
          userCompany:      formData.userCompany.trim() || null,
          priority:         formData.priority,
          budgetEstimate:   effectiveBudget || null,
          specificIssues:   formData.specificIssues.trim() || null,
          preferredContact: formData.preferredContact,
          auditReportId:    auditReportId || null,
          website:          website || null,
          gitHubRepo:       gitHubRepo || null,
          auditData,
        }),
      });

      const ct = response.headers.get('content-type') || '';
      if (!ct.includes('application/json')) {
        throw new Error('Server returned an unexpected response. Please try again.');
      }

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.error || 'Failed to submit request. Please try again.');
      }

      setSuccess(true);
      setTimeout(() => {
        onClose();
        onSuccess?.();
        setSuccess(false);
        setFormData({
          userName: '', userEmail: '', userPhone: '', userCompany: '',
          priority: 'medium', budgetEstimate: '', budgetCustom: '',
          specificIssues: '', preferredContact: 'email',
        });
      }, 2200);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 backdrop-blur-sm sm:items-center"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl border border-cyan-400/30 bg-gradient-to-br from-slate-900 via-slate-900/95 to-slate-950 shadow-[0_0_80px_-20px_rgba(6,182,212,.35)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-slate-900/95 px-6 py-4 backdrop-blur">
          <div>
            <h2 className="text-xl font-bold text-white">Request a Fix</h2>
            <p className="text-xs text-slate-500">We'll respond within 24 hours with a proposal.</p>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-white/10 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="p-6 sm:p-8">
          {success ? (
            <div className="flex flex-col items-center py-12 text-center">
              <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full border border-emerald-400/40 bg-emerald-400/10">
                <span className="text-4xl">✓</span>
              </div>
              <h3 className="text-2xl font-bold text-white">Request Submitted!</h3>
              <p className="mt-2 text-sm text-slate-400">
                We've received your fix request. Our team will review it and contact you within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              {/* Row 1: Name + Email */}
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Full Name" required>
                  <input
                    type="text"
                    name="userName"
                    value={formData.userName}
                    onChange={handleChange}
                    required
                    placeholder="Your full name"
                    className="input-field"
                  />
                </Field>
                <Field label="Email Address" required>
                  <input
                    type="email"
                    name="userEmail"
                    value={formData.userEmail}
                    onChange={handleChange}
                    required
                    placeholder="your@email.com"
                    className="input-field"
                  />
                </Field>
              </div>

              {/* Row 2: Phone + Company */}
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Phone Number" required>
                  <input
                    type="tel"
                    name="userPhone"
                    value={formData.userPhone}
                    onChange={handleChange}
                    placeholder="+234 801 234 5678"
                    className="input-field"
                    required
                  />
                </Field>
                <Field label="Company / Organisation">
                  <input
                    type="text"
                    name="userCompany"
                    value={formData.userCompany}
                    onChange={handleChange}
                    placeholder="Your company name"
                    className="input-field"
                  />
                </Field>
              </div>

              {/* Row 3: Priority + Budget */}
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Fix Priority" required>
                  <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    className="input-field"
                  >
                    <option value="low">🟢 Low — No rush</option>
                    <option value="medium">🟡 Medium — Normal timeline</option>
                    <option value="high">🔴 High — Urgent</option>
                    <option value="critical">🔥 Critical — ASAP</option>
                  </select>
                </Field>
                <Field label="Budget Range" required>
                  <select
                    name="budgetEstimate"
                    value={formData.budgetEstimate}
                    onChange={handleChange}
                    className="input-field"
                    required
                  >
                    <option value="">Select budget range *</option>
                    {BUDGET_OPTIONS.filter(o => o.value !== '').map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                </Field>
              </div>

              {/* Budget custom input shown when "other" selected */}
              {formData.budgetEstimate === 'other' && (
                <Field label="Specify Your Budget">
                  <input
                    type="text"
                    name="budgetCustom"
                    value={formData.budgetCustom}
                    onChange={handleChange}
                    placeholder="e.g. ₦500,000 or $800 or flexible"
                    className="input-field"
                  />
                </Field>
              )}

              {/* Preferred contact */}
              <Field label="Preferred Contact Method" required>
                <div className="mt-1 grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {CONTACT_OPTIONS.map((opt) => (
                    <label
                      key={opt.value}
                      className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl border px-3 py-2.5 text-xs font-semibold transition ${
                        formData.preferredContact === opt.value
                          ? 'border-cyan-400/60 bg-cyan-400/15 text-cyan-300'
                          : 'border-white/10 bg-white/5 text-slate-400 hover:border-white/20 hover:text-white'
                      }`}
                    >
                      <input
                        type="radio"
                        name="preferredContact"
                        value={opt.value}
                        checked={formData.preferredContact === opt.value}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      {opt.label}
                    </label>
                  ))}
                </div>
              </Field>

              {/* Specific issues */}
              <Field label="Issues to Fix (from audit)" required>
                <textarea
                  name="specificIssues"
                  value={formData.specificIssues}
                  onChange={handleChange}
                  placeholder="Describe the specific findings from the audit you'd like us to address — e.g. missing security headers, slow LCP, no HTTPS redirect…"
                  rows={4}
                  className="input-field resize-none"
                  required
                />
              </Field>

              {error && (
                <div className="flex items-start gap-3 rounded-xl border border-rose-400/30 bg-rose-400/8 px-4 py-3">
                  <span className="mt-0.5 text-rose-400">⚠</span>
                  <p className="text-sm text-rose-300">{error}</p>
                </div>
              )}

              <div className="flex gap-3 pt-1">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 rounded-xl py-3.5 text-sm font-bold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
                  style={{ background: 'linear-gradient(135deg, #06b6d4, #6366f1)' }}
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                      Submitting…
                    </span>
                  ) : (
                    '⚡ Submit Fix Request'
                  )}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-xl border border-slate-700 px-5 py-3.5 text-sm font-semibold text-slate-400 transition hover:bg-white/5 hover:text-white"
                >
                  Cancel
                </button>
              </div>

              <p className="text-center text-xs text-slate-600">
                We'll review your request and respond within 24 hours with a cost estimate.
              </p>
            </form>
          )}
        </div>
      </div>

      <style jsx>{`
        .input-field {
          width: 100%;
          padding: 10px 14px;
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(0,0,0,0.3);
          color: white;
          font-size: 14px;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .input-field::placeholder { color: #475569; }
        .input-field:focus {
          border-color: rgba(34,211,238,0.5);
          box-shadow: 0 0 0 3px rgba(34,211,238,0.12);
        }
        .input-field option { background: #0f172a; color: white; }
      `}</style>
    </div>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-400">
        {label}
        {required && <span className="ml-1 text-cyan-400">*</span>}
      </label>
      {children}
    </div>
  );
}
