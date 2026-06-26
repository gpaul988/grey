import { NextRequest, NextResponse } from 'next/server';
import { getStoreCustomerByEmail, createPasswordResetToken } from '@/lib/db/store-helpers';

// Optionally use Resend if API key is available
let resend: any = null;
if (process.env.RESEND_API_KEY) {
  const { Resend } = require('resend');
  resend = new Resend(process.env.RESEND_API_KEY);
}

import { generatePasswordResetEmail } from '@/lib/emails/password-reset';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Check if customer exists
    const customer = await getStoreCustomerByEmail(email);
    
    // Security: Don't leak whether email exists
    const successMessage = 'If an account with this email exists, a password reset link has been sent';

    if (!customer) {
      // Return success even if email doesn't exist
      return NextResponse.json({ message: successMessage });
    }

    try {
      // Create reset token in database
      const resetToken = await createPasswordResetToken(customer.id, email);

      // Build reset link
      const baseUrl = process.env.NEXT_PUBLIC_APP_URL || `${request.nextUrl.protocol}//${request.nextUrl.host}`;
      const resetLink = `${baseUrl}/store/reset-password?token=${resetToken}`;

      if (resend) {
        // Generate HTML email
        const htmlContent = generatePasswordResetEmail({
          customerName: customer.firstName,
          resetLink,
          expiresIn: '1 hour',
        });

        // Send email via Resend
        const emailResult = await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL || 'noreply@greyinfotech.com',
          to: email,
          subject: 'Reset Your Password',
          html: htmlContent,
        });

        if (emailResult.error) {
          console.error('[Password Reset Email Error]', emailResult.error);
          // Still return success to user (don't leak email system issues)
          return NextResponse.json({ message: successMessage });
        }

        console.log(`[Password Reset] Email sent to ${email}`);
      } else {
        // Development: log to console (no Resend key)
        console.log(`[Password Reset - DEV MODE] Reset link for ${email}:`);
        console.log(`Reset Link: ${resetLink}`);
      }

      console.log(`[Password Reset] Token created for ${email}`);
    } catch (emailError) {
      console.error('[Password Reset Error]', emailError);
      // Don't expose email service errors to user
    }

    // Always return success message
    return NextResponse.json({
      message: successMessage,
    });
  } catch (error) {
    console.error('[Store Auth Forgot Password]', error);
    return NextResponse.json(
      { error: 'An error occurred. Please try again later.' },
      { status: 500 }
    );
  }
}
