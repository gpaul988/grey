import { NextRequest, NextResponse } from 'next/server';
import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import { send } from '@/lib/email';

function getDb() {
  const dbPath = path.join(process.cwd(), 'Admin', 'data', 'grey.db');
  const db = new Database(dbPath);
  db.pragma('journal_mode = WAL');
  db.pragma('foreign_keys = ON');
  return db;
}

function ensureCvDir(): string {
  const dir = path.join(process.cwd(), 'Admin', 'public', 'uploads', 'cvs');
  fs.mkdirSync(dir, { recursive: true });
  return dir;
}

function ensureDocsDir(): string {
  const dir = path.join(process.cwd(), 'Admin', 'public', 'uploads', 'career-docs');
  fs.mkdirSync(dir, { recursive: true });
  return dir;
}

const ALLOWED_CV_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

const ALLOWED_DOC_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'image/png',
  'image/jpeg',
];

const CV_MAX_BYTES = 5 * 1024 * 1024;   // 5 MB
const DOC_MAX_BYTES = 10 * 1024 * 1024; // 10 MB
const MAX_DOCS = 5;

function safeName(original: string): string {
  const ext = path.extname(original).toLowerCase().replace(/[^.a-z0-9]/g, '') || '.bin';
  return `${Date.now()}-${crypto.randomBytes(6).toString('hex')}${ext}`;
}

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get('content-type') || '';
    if (!contentType.includes('multipart/form-data') && !contentType.includes('application/json')) {
      return NextResponse.json({ error: 'Invalid content type' }, { status: 400 });
    }

    let fields: Record<string, string> = {};
    let cvFilename: string | null = null;
    let cvPath: string | null = null;
    const docPaths: string[] = [];

    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData();
      let docCount = 0;

      for (const [key, value] of formData.entries()) {
        if (typeof value === 'string') {
          fields[key] = value;
        } else {
          const file = value as File;

          if (key === 'cv' && file.size > 0) {
            if (!ALLOWED_CV_TYPES.includes(file.type)) {
              return NextResponse.json({ error: 'CV must be PDF, DOC, or DOCX format' }, { status: 400 });
            }
            if (file.size > CV_MAX_BYTES) {
              return NextResponse.json({ error: 'CV file must be under 5 MB' }, { status: 400 });
            }
            const fname = safeName(file.name);
            const buf = Buffer.from(await file.arrayBuffer());
            fs.writeFileSync(path.join(ensureCvDir(), fname), buf);
            cvFilename = file.name;
            cvPath = `/uploads/cvs/${fname}`;

          } else if (key === 'documents' && file.size > 0) {
            if (docCount >= MAX_DOCS) continue;
            if (!ALLOWED_DOC_TYPES.includes(file.type)) {
              return NextResponse.json({ error: `Document "${file.name}" must be PDF, DOC, DOCX, PNG, or JPG` }, { status: 400 });
            }
            if (file.size > DOC_MAX_BYTES) {
              return NextResponse.json({ error: `Document "${file.name}" must be under 10 MB` }, { status: 400 });
            }
            const fname = safeName(file.name);
            const buf = Buffer.from(await file.arrayBuffer());
            fs.writeFileSync(path.join(ensureDocsDir(), fname), buf);
            docPaths.push(`/uploads/career-docs/${fname}`);
            docCount++;
          }
        }
      }
    } else {
      fields = await req.json();
    }

    const {
      form_type,
      full_name,
      email,
      phone,
      country,
      role_interest,
      experience_years,
      linkedin_url,
      portfolio_url,
      cover_letter,
      job_opening_id,
    } = fields;

    if (!full_name || !email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }
    const resolvedType = form_type === 'self_introduction' ? 'self_introduction' : 'cv_submission';

    const db = getDb();

    // Ensure career_applications table + new columns exist (safe on old DBs)
    db.exec(`
      CREATE TABLE IF NOT EXISTS career_applications (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        form_type TEXT NOT NULL DEFAULT 'cv_submission',
        full_name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT,
        country TEXT,
        role_interest TEXT,
        experience_years TEXT,
        linkedin_url TEXT,
        portfolio_url TEXT,
        cover_letter TEXT,
        cv_path TEXT,
        cv_filename TEXT,
        status TEXT NOT NULL DEFAULT 'new',
        admin_notes TEXT,
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        updated_at TEXT NOT NULL DEFAULT (datetime('now'))
      );
      CREATE INDEX IF NOT EXISTS idx_career_apps_email ON career_applications(email);
      CREATE INDEX IF NOT EXISTS idx_career_apps_status ON career_applications(status);
      CREATE INDEX IF NOT EXISTS idx_career_apps_type ON career_applications(form_type);
    `);

    // Add new columns if missing (idempotent)
    const cols = (db.prepare('PRAGMA table_info(career_applications)').all() as {name:string}[]).map(c => c.name);
    if (!cols.includes('job_opening_id')) db.exec(`ALTER TABLE career_applications ADD COLUMN job_opening_id INTEGER`);
    if (!cols.includes('documents_paths')) db.exec(`ALTER TABLE career_applications ADD COLUMN documents_paths TEXT NOT NULL DEFAULT '[]'`);

    const jobOpeningId = job_opening_id ? parseInt(job_opening_id, 10) : null;

    const stmt = db.prepare(`
      INSERT INTO career_applications
        (form_type, full_name, email, phone, country, role_interest, experience_years,
         linkedin_url, portfolio_url, cover_letter, cv_path, cv_filename,
         job_opening_id, documents_paths, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'new')
    `);

    const result = stmt.run(
      resolvedType,
      full_name,
      email,
      phone || null,
      country || null,
      role_interest || null,
      experience_years || null,
      linkedin_url || null,
      portfolio_url || null,
      cover_letter || null,
      cvPath,
      cvFilename,
      jobOpeningId,
      JSON.stringify(docPaths),
    );
    db.close();

    const appId = result.lastInsertRowid;
    const isCV = resolvedType === 'cv_submission';
    const isJobApplication = !!jobOpeningId;
    const typeLabel = isJobApplication ? 'Job Application' : isCV ? 'CV Submission' : 'Self Introduction';

    // Applicant confirmation email
    try {
      await send({
        to: email,
        subject: `✅ Application Received  - Graham Sobiribo Paul`,
        html: `
          <div style="font-family:Arial,sans-serif;color:#333;max-width:600px;margin:0 auto;border-radius:8px;overflow:hidden;">
            <div style="background:linear-gradient(135deg,#0f172a,#0d9488);padding:32px;text-align:center;">
              <h1 style="color:#fff;margin:0;font-size:24px;">Graham Sobiribo Paul</h1>
              <p style="color:#99f6e4;margin:8px 0 0;font-size:14px;">${typeLabel} Received</p>
            </div>
            <div style="padding:32px;">
              <p>Hi <strong>${full_name}</strong>,</p>
              <p>Thank you for ${isJobApplication ? 'applying' : isCV ? 'submitting your CV' : 'introducing yourself'} to Graham Sobiribo Paul. We've received your application and our team will review it carefully.</p>
              ${role_interest ? `<p><strong>Role of Interest:</strong> ${role_interest}</p>` : ''}
              <p>We'll be in touch if your profile matches an upcoming opportunity.</p>
              <p style="color:#6b7280;font-size:13px;"><strong>Application ID:</strong> #${appId}</p>
              <p>Best regards,<br/><strong>The Graham Sobiribo Paul Team</strong></p>
            </div>
          </div>
        `,
      });
    } catch (e) {
      console.error('[career-apply] confirmation email failed:', e);
    }

    // Admin notification email
    try {
      await send({
        to: process.env.ADMIN_EMAIL || 'hello@greyinfotech.com.ng',
        subject: `🧑‍💼 New ${typeLabel}  - ${full_name}`,
        html: `
          <div style="font-family:Arial,sans-serif;color:#333;max-width:600px;margin:0 auto;">
            <h2 style="color:#0d9488;">New ${typeLabel}</h2>
            <ul>
              <li><strong>Name:</strong> ${full_name}</li>
              <li><strong>Email:</strong> ${email}</li>
              ${phone ? `<li><strong>Phone:</strong> ${phone}</li>` : ''}
              ${country ? `<li><strong>Country:</strong> ${country}</li>` : ''}
              ${role_interest ? `<li><strong>Role Interest:</strong> ${role_interest}</li>` : ''}
              ${experience_years ? `<li><strong>Experience:</strong> ${experience_years}</li>` : ''}
              ${linkedin_url ? `<li><strong>LinkedIn:</strong> <a href="${linkedin_url}">${linkedin_url}</a></li>` : ''}
              ${portfolio_url ? `<li><strong>Portfolio:</strong> <a href="${portfolio_url}">${portfolio_url}</a></li>` : ''}
              ${cvPath ? `<li><strong>CV:</strong> ${cvFilename}</li>` : ''}
              ${docPaths.length ? `<li><strong>Additional Docs:</strong> ${docPaths.length} file(s)</li>` : ''}
              ${jobOpeningId ? `<li><strong>Job Opening ID:</strong> #${jobOpeningId}</li>` : ''}
            </ul>
            ${cover_letter ? `<h3>Cover Letter / Introduction:</h3><blockquote style="background:#f5f5f5;padding:12px;border-left:4px solid #0d9488;">${cover_letter}</blockquote>` : ''}
            <p><strong>Application ID:</strong> #${appId}</p>
            <p>View in admin: <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://greyinfotech.com.ng'}/admin/career-applications">Career Applications</a></p>
          </div>
        `,
      });
    } catch (e) {
      console.error('[career-apply] admin email failed:', e);
    }

    // Notify admin panel of new application (non-blocking)
    try {
      const adminSecret = process.env.ADMIN_API_SECRET || 'default-secret-key';
      const baseUrl = process.env.ADMIN_BASE_URL || 'http://localhost:3000';
      fetch(`${baseUrl}/admin/api/notify-submission`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-secret': adminSecret,
        },
        body: JSON.stringify({
          action: 'create',
          type: 'application',
          id: appId,
          name: full_name,
          email: email,
        }),
      }).catch(err => console.warn('[career-apply] Failed to notify admin panel:', err.message));
    } catch (notifyErr) {
      console.warn('[career-apply] Could not trigger admin notification:', notifyErr);
    }

    return NextResponse.json(
      {
        ok: true,
        success: true,
        message: isJobApplication
          ? "Your application has been submitted. We'll be in touch soon."
          : isCV
          ? "Your CV has been submitted successfully. We'll reach out if a suitable role opens up."
          : "Your introduction has been sent. We'll keep your profile on file and reach out soon.",
        applicationId: appId,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('[career-apply] Error:', error);
    return NextResponse.json({ error: 'Failed to submit application', ok: false }, { status: 500 });
  }
}

// GET  - list applications
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const form_type = searchParams.get('form_type');
    const status = searchParams.get('status');

    const db = getDb();
    let query = 'SELECT * FROM career_applications WHERE 1=1';
    const params: string[] = [];

    if (form_type) { query += ' AND form_type = ?'; params.push(form_type); }
    if (status) { query += ' AND status = ?'; params.push(status); }
    query += ' ORDER BY created_at DESC';

    const rows = db.prepare(query).all(...params);
    db.close();

    return NextResponse.json({ ok: true, data: rows }, { status: 200 });
  } catch (error) {
    console.error('[career-apply] GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch applications' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

    const body = await req.json();
    const { status, admin_notes } = body;

    const db = getDb();
    db.prepare(
      `UPDATE career_applications SET status = ?, admin_notes = ?, updated_at = datetime('now') WHERE id = ?`
    ).run(status || 'new', admin_notes || null, parseInt(id));
    db.close();

    return NextResponse.json({ ok: true, message: 'Updated' }, { status: 200 });
  } catch (error) {
    console.error('[career-apply] PATCH error:', error);
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

    const db = getDb();
    db.prepare('DELETE FROM career_applications WHERE id = ?').run(parseInt(id));
    db.close();

    return NextResponse.json({ ok: true, message: 'Deleted' }, { status: 200 });
  } catch (error) {
    console.error('[career-apply] DELETE error:', error);
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
}
