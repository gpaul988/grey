/**
 * Enterprise Email Service
 * Handles sending and receiving emails with full error handling, logging, and retries
 */

import nodemailer from 'nodemailer';
import { type Transporter } from 'nodemailer';

// Types
export interface EmailOptions {
  to: string | string[];
  subject: string;
  html?: string;
  text?: string;
  from?: string;
  replyTo?: string;
  cc?: string | string[];
  bcc?: string | string[];
  attachments?: Array<{
    filename: string;
    content?: string | Buffer;
    path?: string;
  }>;
}

export interface EmailResponse {
  success: boolean;
  messageId?: string;
  error?: string;
  timestamp: string;
}

export interface EmailLog {
  id: string;
  to: string;
  subject: string;
  status: 'sent' | 'failed' | 'pending' | 'received_reply';
  messageId?: string;
  error?: string;
  createdAt: string;
  updatedAt: string;
}

// Constants
const FROM = process.env.SMTP_FROM || 'noreply@greyinfotech.com.ng';
const REPLY_TO = process.env.SMTP_REPLY_TO || process.env.SMTP_FROM || 'hello@greyinfotech.com.ng';
const BRAND = 'Grey InfoTech';
const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 2000;

// Singleton transporter
let cachedTransporter: Transporter | null = null;

/**
 * Get or create SMTP transporter
 */
export function getEmailTransporter(): Transporter | null {
  if (cachedTransporter) return cachedTransporter;

  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS || process.env.SMTP_PASSWORD;
  const port = Number(process.env.SMTP_PORT || 587);

  if (!host || !user || !pass) {
    console.warn('⚠️  [EMAIL] SMTP not configured. Set SMTP_HOST, SMTP_USER, SMTP_PASS');
    return null;
  }

  try {
    cachedTransporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
      pool: {
        maxConnections: 5,
        maxMessages: 100,
        rateDelta: 1000,
        rateLimit: 5, // 5 emails per second
      },
    });

    cachedTransporter.verify((error) => {
      if (error) {
        console.error('❌ [EMAIL] SMTP connection failed:', error.message);
        cachedTransporter = null;
      } else {
        console.log('✅ [EMAIL] SMTP connection verified');
      }
    });

    return cachedTransporter;
  } catch (err) {
    console.error('❌ [EMAIL] Failed to create transporter:', err);
    return null;
  }
}

/**
 * Send email with retries
 */
export async function sendEmail(options: EmailOptions, retryCount = 0): Promise<EmailResponse> {
  const timestamp = new Date().toISOString();

  try {
    const transporter = getEmailTransporter();
    if (!transporter) {
      console.warn(`[EMAIL] SMTP unavailable. Logging email to ${options.to}: "${options.subject}"`);
      return {
        success: false,
        error: 'SMTP not configured',
        timestamp,
      };
    }

    const mailOptions = {
      from: options.from || FROM,
      replyTo: options.replyTo || REPLY_TO,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text || (options.html ? stripHtml(options.html) : ''),
      cc: options.cc,
      bcc: options.bcc,
      attachments: options.attachments,
    };

    const result = await transporter.sendMail(mailOptions);

    console.log(`✅ [EMAIL] Sent to ${options.to} | Subject: "${options.subject}" | ID: ${result.messageId}`);

    return {
      success: true,
      messageId: result.messageId,
      timestamp,
    };
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error(`❌ [EMAIL] Send failed (attempt ${retryCount + 1}/${MAX_RETRIES}): ${errorMsg}`);

    // Retry logic
    if (retryCount < MAX_RETRIES) {
      console.log(`[EMAIL] Retrying in ${RETRY_DELAY_MS}ms...`);
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS));
      return sendEmail(options, retryCount + 1);
    }

    return {
      success: false,
      error: errorMsg,
      timestamp,
    };
  }
}

/**
 * Send confirmation email to customer
 */
export async function sendConfirmationEmail(options: {
  to: string;
  name: string;
  subject: string;
  submissionId?: string | number;
  message?: string;
}): Promise<EmailResponse> {
  const html = `
    <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2 style="color: #059669; border-bottom: 2px solid #059669; padding-bottom: 10px;">We Received Your Message</h2>
      <p>Hi <strong>${options.name}</strong>,</p>
      <p>Thank you for reaching out to ${BRAND}! We've received your submission and will review it shortly.</p>
      ${
        options.submissionId
          ? `<p style="background: #f0f9ff; padding: 10px; border-left: 4px solid #059669;"><strong>Submission ID:</strong> #${options.submissionId}</p>`
          : ''
      }
      ${options.message ? `<p>${options.message}</p>` : ''}
      <p style="margin-top: 20px; color: #666;">Our team will get back to you within 24 business hours.</p>
      <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
      <p style="font-size: 12px; color: #999;">
        ${BRAND} Ltd. | Port Harcourt, Rivers State, Nigeria<br />
        <a href="https://www.greyinfotech.com.ng" style="color: #059669; text-decoration: none;">www.greyinfotech.com.ng</a>
      </p>
    </div>
  `;

  return sendEmail({
    to: options.to,
    subject: `✅ ${options.subject}`,
    html,
  });
}

/**
 * Send admin notification
 */
export async function sendAdminNotification(options: {
  subject: string;
  html: string;
  replyTo?: string;
}): Promise<EmailResponse> {
  const adminEmail = process.env.ADMIN_EMAIL || 'hello@greyinfotech.com.ng';

  return sendEmail({
    to: adminEmail,
    subject: `📬 ${options.subject}`,
    html: `
      <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        ${options.html}
        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
        <p style="font-size: 12px; color: #999;">
          This is an admin notification from ${BRAND}.
        </p>
      </div>
    `,
    replyTo: options.replyTo,
  });
}

/**
 * Send email with template
 */
export async function sendTemplateEmail(
  to: string,
  template: 'verification' | 'password-reset' | 'invoice' | 'welcome',
  data: Record<string, any>,
): Promise<EmailResponse> {
  const templates: Record<string, (data: any) => { subject: string; html: string }> = {
    verification: (d) => ({
      subject: 'Verify your email address',
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2>Verify Your Email</h2>
          <p>Hi ${d.name},</p>
          <p>Click below to verify your email address:</p>
          <p style="text-align: center;">
            <a href="${d.link}" style="background: #059669; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">
              Verify Email
            </a>
          </p>
          <p style="font-size: 12px; color: #999;">Link expires in 24 hours.</p>
        </div>
      `,
    }),
    'password-reset': (d) => ({
      subject: 'Reset your password',
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2>Reset Your Password</h2>
          <p>Hi ${d.name},</p>
          <p>Click below to reset your password:</p>
          <p style="text-align: center;">
            <a href="${d.link}" style="background: #059669; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">
              Reset Password
            </a>
          </p>
          <p style="font-size: 12px; color: #999;">Link expires in 1 hour. If you didn't request this, ignore this email.</p>
        </div>
      `,
    }),
    invoice: (d) => ({
      subject: `Invoice #${d.invoiceId}`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2>Invoice #${d.invoiceId}</h2>
          <p>Hi ${d.name},</p>
          <p>Please find your invoice details below:</p>
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr style="background: #f0f0f0;">
              <td style="padding: 10px; border: 1px solid #ddd;">Item</td>
              <td style="padding: 10px; border: 1px solid #ddd;">Amount</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd;">${d.description}</td>
              <td style="padding: 10px; border: 1px solid #ddd;">${d.amount}</td>
            </tr>
          </table>
        </div>
      `,
    }),
    welcome: (d) => ({
      subject: `Welcome to ${BRAND}`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2>Welcome to ${BRAND}</h2>
          <p>Hi ${d.name},</p>
          <p>Your account has been created successfully. You can now log in with your email address.</p>
          <p style="text-align: center;">
            <a href="${d.loginUrl}" style="background: #059669; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">
              Log In
            </a>
          </p>
        </div>
      `,
    }),
  };

  const templateFn = templates[template];
  if (!templateFn) {
    return {
      success: false,
      error: `Unknown template: ${template}`,
      timestamp: new Date().toISOString(),
    };
  }

  const { subject, html } = templateFn(data);
  return sendEmail({ to, subject, html });
}

/**
 * Strip HTML tags from string
 */
function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

/**
 * Test email configuration
 */
export async function testEmailConfiguration(): Promise<{ success: boolean; message: string }> {
  const transporter = getEmailTransporter();
  if (!transporter) {
    return {
      success: false,
      message: 'SMTP not configured. Set SMTP_HOST, SMTP_USER, SMTP_PASS, SMTP_FROM',
    };
  }

  try {
    await transporter.verify();
    return {
      success: true,
      message: 'SMTP connection successful!',
    };
  } catch (error) {
    return {
      success: false,
      message: `SMTP verification failed: ${error instanceof Error ? error.message : String(error)}`,
    };
  }
}

export default {
  sendEmail,
  sendConfirmationEmail,
  sendAdminNotification,
  sendTemplateEmail,
  getEmailTransporter,
  testEmailConfiguration,
};
