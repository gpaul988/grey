import { NextRequest, NextResponse } from 'next/server';
import { send } from '@/lib/email';

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

    // TODO: Store subscription in database
    // For now, just send confirmation email

    // Send welcome email to subscriber
    try {
      await send({
        to: email,
        subject: '✅ Welcome to Graham Sobiribo Paul Newsletter',
        html: `
          <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #059669;">Thank You for Subscribing!</h2>
            <p>Welcome to the Graham Sobiribo Paul newsletter. We share updates on:</p>
            <ul>
              <li>Latest web & mobile development trends</li>
              <li>Project case studies and success stories</li>
              <li>Digital marketing tips & best practices</li>
              <li>Company news and announcements</li>
              <li>Special offers and promotions</li>
            </ul>
            <p>You'll hear from us soon with exclusive insights and updates.</p>
            <p>Best regards,<br/>
            <strong>Graham Sobiribo Paul</strong><br/>
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

    // Notify admin panel of new subscription (non-blocking)
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
          type: 'subscription',
          email: email,
          name: 'New Subscriber',
        }),
      }).catch(err => console.warn('[subscribe] Failed to notify admin panel:', err.message));
    } catch (notifyErr) {
      console.warn('[subscribe] Could not trigger admin notification:', notifyErr);
    }

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
