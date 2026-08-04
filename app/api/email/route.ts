/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';
import {
  sendEmail,
  sendConfirmationEmail,
  sendAdminNotification,
  testEmailConfiguration,
} from '@/lib/email-service';
import {
  logSentEmail,
  getInboxEmails,
  markEmailAsRead,
  getEmailStats,
} from '@/lib/email-inbox';

export async function POST(req: NextRequest) {
  try {
    const { action, to, name, subject, submissionId, message, html, replyTo, emailId } = await req.json();

    console.log('[api/email] POST action:', action);

    // Test SMTP configuration
    if (action === 'test') {
      console.log('[api/email] Testing email configuration...');
      const result = await testEmailConfiguration();
      return NextResponse.json({
        success: result.success,
        message: result.message,
        timestamp: new Date().toISOString(),
      });
    }

    // Send test email
    if (action === 'send-test') {
      if (!to) {
        return NextResponse.json({ error: 'Email address required' }, { status: 400 });
      }

      console.log('[api/email] Sending test email to:', to);
      const result = await sendEmail({
        to,
        subject: '✅ Test Email from Grey InfoTech',
        html: '<p>Test email - if received, SMTP is working correctly!</p>'
      });

      logSentEmail({ to, subject: 'Test', messageId: result.messageId, error: result.error });
      return NextResponse.json(result);
    }

    // Send confirmation email
    if (action === 'send-confirmation') {
      if (!to || !name || !subject) {
        return NextResponse.json(
          { error: 'Missing required fields: to, name, subject' },
          { status: 400 }
        );
      }

      console.log('[api/email] Sending confirmation email to:', to);
      const result = await sendConfirmationEmail({
        to,
        name,
        subject,
        submissionId,
        message
      });

      logSentEmail({ to, subject, messageId: result.messageId, error: result.error });
      return NextResponse.json(result);
    }

    // Send admin notification
    if (action === 'send-admin') {
      if (!subject || !html) {
        return NextResponse.json(
          { error: 'Missing required fields: subject, html' },
          { status: 400 }
        );
      }

      console.log('[api/email] Sending admin notification with subject:', subject);
      const result = await sendAdminNotification({
        subject,
        html,
        replyTo: replyTo || undefined
      });

      logSentEmail({
        to: process.env.ADMIN_EMAIL || 'admin@greyinfotech.com.ng',
        subject,
        messageId: result.messageId,
        error: result.error
      });
      return NextResponse.json(result);
    }

    // Mark email as read
    if (action === 'mark-read') {
      if (!emailId) {
        return NextResponse.json({ error: 'Email ID required' }, { status: 400 });
      }

      console.log('[api/email] Marking email as read:', emailId);
      markEmailAsRead(emailId);
      return NextResponse.json({ success: true, message: 'Email marked as read' });
    }

    // Invalid action
    return NextResponse.json(
      { error: 'Unknown action. Valid actions: test, send-test, send-confirmation, send-admin, mark-read' },
      { status: 400 }
    );
  } catch (error) {
    console.error('[api/email] POST error:', error);
    return NextResponse.json(
      { error: String(error), message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const action = req.nextUrl.searchParams.get('action') || 'inbox';
    const limit = req.nextUrl.searchParams.get('limit') ? parseInt(req.nextUrl.searchParams.get('limit')!) : 50;

    console.log('[api/email] GET action:', action);

    // Get inbox emails
    if (action === 'inbox') {
      console.log('[api/email] Fetching inbox emails (limit:', limit, ')');
      const emails = getInboxEmails({ limit });
      return NextResponse.json({
        success: true,
        count: emails.length,
        emails
      });
    }

    // Get unread emails
    if (action === 'unread') {
      console.log('[api/email] Fetching unread emails');
      const emails = getInboxEmails({ status: 'unread', limit });
      return NextResponse.json({
        success: true,
        count: emails.length,
        emails
      });
    }

    // Get email statistics
    if (action === 'stats') {
      console.log('[api/email] Fetching email statistics');
      const stats = getEmailStats();
      return NextResponse.json({
        success: true,
        stats
      });
    }

    // Invalid action
    return NextResponse.json(
      { error: 'Unknown action. Valid actions: inbox, unread, stats' },
      { status: 400 }
    );
  } catch (error) {
    console.error('[api/email] GET error:', error);
    return NextResponse.json(
      { error: String(error), message: 'Internal server error' },
      { status: 500 }
    );
  }
}
