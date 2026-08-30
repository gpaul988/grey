/**
 * Email Service
 * Handles sending emails via SMTP or fallback
 */

import nodemailer from 'nodemailer';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let transporter: any = null;

/**
 * Initialize email transporter
 */
function getTransporter() {
  if (transporter) return transporter;

  // Check if SMTP is configured
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;

  if (!host || !user || !pass) {
    console.warn('⚠️  Email: SMTP not configured. Emails will not be sent.');
    console.warn('   Set SMTP_HOST, SMTP_USER, SMTP_PASSWORD in .env');
    // Return dummy transporter that logs instead
    return {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      sendMail: async (options: any) => {
        console.log('📧 [EMAIL LOG - SMTP NOT CONFIGURED]');
        console.log('To:', options.to);
        console.log('Subject:', options.subject);
        console.log('---');
        return { messageId: 'logged-' + Date.now() };
      }
    };
  }

  transporter = nodemailer.createTransport({
    host,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
    auth: {
      user,
      pass,
    },
  });

  return transporter;
}

/**
 * Send email
 */
export async function send(options: {
  to: string | string[];
  subject: string;
  html?: string;
  text?: string;
  from?: string;
  replyTo?: string;
  cc?: string | string[];
  bcc?: string | string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  attachments?: any[];
}): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    const transporter = getTransporter();

    const mailOptions = {
      from: options.from || process.env.SMTP_FROM || 'noreply@greyinfotech.com.ng',
      replyTo: options.replyTo || process.env.SMTP_REPLY_TO || process.env.SMTP_FROM,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
      cc: options.cc,
      bcc: options.bcc,
      attachments: options.attachments,
    };

    const result = await transporter.sendMail(mailOptions);

    return {
      success: true,
      messageId: result.messageId,
    };
  } catch (error) {
    console.error('❌ Email send error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to send email',
    };
  }
}

/**
 * Send email to admin
 */
export async function sendToAdmin(options: {
  subject: string;
  html?: string;
  text?: string;
}): Promise<{ success: boolean; error?: string }> {
  const adminEmail = process.env.ADMIN_EMAIL || 'hello@greyinfotech.com.ng';
  return send({
    to: adminEmail,
    subject: options.subject,
    html: options.html,
    text: options.text,
  });
}

/**
 * Send audit submission confirmation to user
 */
export async function sendAuditConfirmation(options: {
  userEmail: string;
  userName: string;
  auditId: string;
}): Promise<{ success: boolean; error?: string }> {
  const html = `
    <h2>Audit Request Received</h2>
    <p>Hi ${options.userName},</p>
    <p>Thank you for submitting your audit request. We've received your information and will review it shortly.</p>
    <p><strong>Audit ID:</strong> ${options.auditId}</p>
    <p>You can check the status of your audit request using this ID.</p>
    <p>Best regards,<br>Graham Sobiribo Paul Team</p>
  `;

  return send({
    to: options.userEmail,
    subject: `Audit Request Received - ID: ${options.auditId}`,
    html,
  });
}

/**
 * Send audit notification to admin
 */
export async function sendAuditNotification(options: {
  auditId: string;
  userName: string;
  userEmail: string;
  priority: string;
  website?: string;
}): Promise<{ success: boolean; error?: string }> {
  const html = `
    <h2>New Audit Submission</h2>
    <p><strong>Audit ID:</strong> ${options.auditId}</p>
    <p><strong>User:</strong> ${options.userName}</p>
    <p><strong>Email:</strong> ${options.userEmail}</p>
    <p><strong>Priority:</strong> ${options.priority}</p>
    ${options.website ? `<p><strong>Website:</strong> ${options.website}</p>` : ''}
    <p><a href="${process.env.NEXT_PUBLIC_API_URL}/admin/audits">View in Dashboard</a></p>
  `;

  return sendToAdmin({
    subject: `New Audit Submission - ${options.priority} (ID: ${options.auditId})`,
    html,
  });
}

export default {
  send,
  sendToAdmin,
  sendAuditConfirmation,
  sendAuditNotification,
};
