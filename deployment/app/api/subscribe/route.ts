import { NextRequest, NextResponse } from 'next/server';
import Database from 'better-sqlite3';
import path from 'path';
import { send } from '@/lib/email';
import { notifyAdminPanel } from '@/lib/admin-notify';

function getDb() {
  const dbPath = path.join(process.cwd(), 'Admin', 'data', 'grey.db');
  const db = new Database(dbPath);
  db.pragma('journal_mode = WAL');
  db.pragma('foreign_keys = ON');
  return db;
}

/**
 * POST /api/subscribe
 * Subscribe email to newsletter
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, source = 'website' } = body;

    // Validate email
    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Email is required' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Invalid email format' },
        { status: 400 }
      );
    }

    const db = getDb();
    db.exec(`
      CREATE TABLE IF NOT EXISTS subscribers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT NOT NULL UNIQUE,
        name TEXT NOT NULL DEFAULT 'Subscriber',
        source TEXT NOT NULL DEFAULT 'website',
        status TEXT NOT NULL DEFAULT 'active',
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        updated_at TEXT NOT NULL DEFAULT (datetime('now'))
      );
    `);

    const existing = db.prepare('SELECT id FROM subscribers WHERE email = ?').get(email);
    if (existing) {
      db.prepare(`
        UPDATE subscribers
        SET name = ?, source = ?, status = 'active', updated_at = datetime('now')
        WHERE email = ?
      `).run('Subscriber', source, email);
    } else {
      db.prepare(`
        INSERT INTO subscribers (email, name, source, status)
        VALUES (?, ?, ?, 'active')
      `).run(email, 'Subscriber', source);
    }
    db.close();

    // Send welcome email to subscriber
    try {
      await send({
        to: email,
        subject: '✅ Welcome to Grey InfoTech Newsletter',
        html: `
          <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #059669;">Thank You for Subscribing!</h2>
            <p>Welcome to the Grey InfoTech newsletter. We share updates on:</p>
            <ul>
              <li>Latest web & mobile development trends</li>
              <li>Project case studies and success stories</li>
              <li>Digital marketing tips & best practices</li>
              <li>Company news and announcements</li>
              <li>Special offers and promotions</li>
            </ul>
            <p>You'll hear from us soon with exclusive insights and updates.</p>
            <p>Best regards,<br/>
            <strong>Grey InfoTech Limited</strong><br/>
            Port Harcourt, Nigeria<br/>
            <a href="https://greyinf.com/grey">https://greyinf.com/grey</a></p>
          </div>
        `,
      });
    } catch (emailError) {
      console.error('Failed to send welcome email:', emailError);
      // Don't fail the request
    }

    // Send notification to admin
    try {
      await send({
        to: process.env.ADMIN_EMAIL || 'hello@greyinfotech.com.ng',
        subject: `📧 New Newsletter Subscription - ${email}`,
        html: `
          <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #059669;">New Newsletter Subscriber</h2>
            <ul>
              <li><strong>Email:</strong> ${email}</li>
              <li><strong>Source:</strong> ${source}</li>
              <li><strong>Date:</strong> ${new Date().toISOString()}</li>
            </ul>
          </div>
        `,
      });
    } catch (emailError) {
      console.error('Failed to send admin notification:', emailError);
    }

    notifyAdminPanel({ type: 'subscription', email, name: 'New Subscriber' });

    return NextResponse.json(
      {
        success: true,
        message: "You're subscribed! Check your email for confirmation.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error processing subscription:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to process subscription' },
      { status: 500 }
    );
  }
}
