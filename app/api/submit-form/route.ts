import { NextRequest, NextResponse } from 'next/server';
import Database from 'better-sqlite3';
import path from 'path';
import { send } from '@/lib/email';

function getDb() {
  const dbPath = path.join(process.cwd(), 'Admin', 'data', 'grey.db');
  const db = new Database(dbPath);
  db.pragma('journal_mode = WAL');
  db.pragma('foreign_keys = ON');
  return db;
}

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get('content-type') || '';
    let body: Record<string, string> = {};

    if (contentType.includes('application/json')) {
      body = await req.json();
    } else if (contentType.includes('multipart/form-data') || contentType.includes('application/x-www-form-urlencoded')) {
      const formData = await req.formData();
      for (const [key, value] of formData.entries()) {
        if (typeof value === 'string') body[key] = value;
      }
    } else {
      return NextResponse.json({ error: 'Invalid content type' }, { status: 400 });
    }

    const {
      name,
      email,
      telephone,
      country,
      companyOrPersonal,
      projectType,
      industryType,
      subject,
      message,
      companyName,
      companySize,
      meeting,
      howDidYouHear,
      otherHowDidYouHear,
      otherProjectType,
      otherIndustryType,
      otherSubject,
      otherCountry,
    } = body;

    // Validate required fields
    if (!name || !email || !telephone) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, telephone' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    // Insert into SQLite
    const db = getDb();
    const stmt = db.prepare(`
      INSERT INTO submissions (name, email, phone, subject, project_type, budget, message, source, status)
      VALUES (?, ?, ?, ?, ?, NULL, ?, 'website', 'new')
    `);
    const result = stmt.run(
      name,
      email,
      telephone || null,
      subject || otherSubject || null,
      projectType || otherProjectType || null,
      message || null
    );
    db.close();

    const submissionId = result.lastInsertRowid;

    // Send emails (non-blocking — don't fail if SMTP not configured)
    const resolvedProjectType = projectType || otherProjectType || 'General';
    const resolvedCountry = country || otherCountry || 'Not specified';
    const resolvedIndustry = industryType || otherIndustryType || 'Not specified';
    const resolvedSubject = subject || otherSubject || 'Not specified';

    try {
      await send({
        to: email,
        subject: '✅ We Received Your Message - Grey InfoTech',
        html: `
          <div style="font-family:Arial,sans-serif;color:#333;max-width:600px;margin:0 auto;">
            <h2 style="color:#059669;">We Received Your Message</h2>
            <p>Hi <strong>${name}</strong>,</p>
            <p>Thank you for reaching out to Grey InfoTech! We will get back to you within 24 hours.</p>
            <ul>
              <li><strong>Email:</strong> ${email}</li>
              <li><strong>Phone:</strong> ${telephone}</li>
              <li><strong>Country:</strong> ${resolvedCountry}</li>
              <li><strong>Project Type:</strong> ${resolvedProjectType}</li>
              <li><strong>Industry:</strong> ${resolvedIndustry}</li>
              <li><strong>Subject:</strong> ${resolvedSubject}</li>
            </ul>
            <p><strong>Submission ID:</strong> #${submissionId}</p>
            <p>Best regards,<br/><strong>Grey InfoTech Limited</strong></p>
          </div>
        `,
      });
    } catch (emailErr) {
      console.error('[submit-form] Confirmation email failed:', emailErr);
    }

    try {
      await send({
        to: process.env.ADMIN_EMAIL || 'hello@greyinfotech.com.ng',
        subject: `📋 New Contact Form Submission — ${resolvedProjectType}`,
        html: `
          <div style="font-family:Arial,sans-serif;color:#333;max-width:600px;margin:0 auto;">
            <h2 style="color:#059669;">New Contact Form Submission</h2>
            <ul>
              <li><strong>Name:</strong> ${name}</li>
              <li><strong>Email:</strong> ${email}</li>
              <li><strong>Phone:</strong> ${telephone}</li>
              <li><strong>Country:</strong> ${resolvedCountry}</li>
              <li><strong>Company/Personal:</strong> ${companyOrPersonal || 'Not specified'}</li>
              ${companyName ? `<li><strong>Company:</strong> ${companyName}</li>` : ''}
              ${companySize ? `<li><strong>Company Size:</strong> ${companySize}</li>` : ''}
              <li><strong>Project Type:</strong> ${resolvedProjectType}</li>
              <li><strong>Industry:</strong> ${resolvedIndustry}</li>
              <li><strong>Subject:</strong> ${resolvedSubject}</li>
              ${meeting ? `<li><strong>Meeting:</strong> ${meeting}</li>` : ''}
              ${howDidYouHear ? `<li><strong>Source:</strong> ${howDidYouHear}${otherHowDidYouHear ? ` (${otherHowDidYouHear})` : ''}</li>` : ''}
            </ul>
            <h3>Message:</h3>
            <blockquote style="background:#f5f5f5;padding:10px;border-left:4px solid #059669;">
              ${message || 'No message provided'}
            </blockquote>
            <p><strong>Submission ID:</strong> #${submissionId}</p>
          </div>
        `,
      });
    } catch (emailErr) {
      console.error('[submit-form] Admin notification email failed:', emailErr);
    }

    return NextResponse.json(
      {
        ok: true,
        success: true,
        message: 'Form submitted successfully. We will get back to you within 24 hours.',
        submissionId,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('[submit-form] Error:', error);
    return NextResponse.json({ error: 'Failed to submit form', ok: false }, { status: 500 });
  }
}
