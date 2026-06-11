import type {NextApiRequest, NextApiResponse} from 'next';
import nodemailer from 'nodemailer';
import path from 'node:path';
import fs from 'node:fs';
import {Tickets} from '../../Admin/models';
import {broadcast, broadcastStats} from '../../Admin/routes/sse';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function smtpOk(): boolean {
    return Boolean(
        process.env.SMTP_HOST &&
        process.env.SMTP_USER &&
        process.env.SMTP_PASS &&
        process.env.SMTP_FROM,
    );
}

function makeTransporter() {
    const port = Number(process.env.SMTP_PORT || 587);
    return nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port,
        secure: port === 465,
        auth: {user: process.env.SMTP_USER, pass: process.env.SMTP_PASS},
    });
}

/**
 * Reads good.png from /public and returns a nodemailer CID attachment object.
 * Returns null if the file is missing, so the rest of the email still sends.
 */
function logoAttachment(): { filename: string; cid: string; content: Buffer; encoding: 'base64' } | null {
    try {
        const logoPath = path.join(process.cwd(), 'public', 'good.png');
        const content = fs.readFileSync(logoPath);
        return {filename: 'good.png', cid: 'grey-logo@greyinfotech', content, encoding: 'base64'};
    } catch {
        return null;
    }
}

/** Shared branded email signature block using good.png as the logo. */
function emailSignature(): string {
    return `
<table cellspacing="0" cellpadding="0" style="border-collapse:collapse;font-family:'Georgia Pro',Georgia,serif;margin-top:8px;">
<p style="font-size:16px;color:#555;margin:0 0 12px;">Best regards,</p>
  <tr>
    <td style="border-right:3px solid #009999;padding:0 18px 0 0;vertical-align:top;">
      <img src="cid:grey-logo@greyinfotech" alt="Grey InfoTech" width="80" height="80"
           style="display:block;border-radius:8px;" />
    </td>
    <td style="padding:0 0 0 18px;vertical-align:top;">
      <p style="margin:0 0 2px;font-size:20px;font-weight:700;color:#009999;line-height:1.2;">Grey InfoTech Ltd.</p>
      <p style="margin:0 0 6px;font-size:13px;color:#333;">Support | <strong style="color:#009999;">GREY INFOTECH Limited</strong></p>
      <p style="margin:0 0 2px;font-size:12px;color:#555;">
        <strong style="color:#009999;">A:</strong>&nbsp;9 Godfrey Tata Close, Rumuewhara New Layout,<br>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Off Eneka–Igwurita Road, Rivers State, Nigeria
      </p>
      <p style="margin:0 0 2px;font-size:12px;color:#009999;"><strong>P:</strong>&nbsp;+2348028095571</p>
      <p style="margin:0 0 2px;font-size:12px;">
        <strong style="color:#009999;">E:</strong>&nbsp;<a href="mailto:hello@greyinfotech.com.ng" style="color:#009999;text-decoration:none;">hello@greyinfotech.com.ng</a>
      </p>
      <p style="margin:0;font-size:12px;">
        <strong style="color:#009999;">W:</strong>&nbsp;<a href="https://www.greyinfotech.com.ng" style="color:#009999;text-decoration:none;">www.greyinfotech.com.ng</a>
      </p>
    </td>
  </tr>
</table>`;
}

/** Full email shell: header + body content + divider + signature. */
function emailShell(title: string, innerHtml: string): string {
    return `
<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#222;max-width:600px;margin:0 auto;padding:28px;border:1px solid #e5e7eb;border-radius:12px;background:#ffffff;">
  <!-- Logo header -->
  <div style="text-align:center;margin-bottom:20px;">
    <img src="cid:grey-logo@greyinfotech" alt="Grey InfoTech" width="64" height="64"
         style="display:inline-block;border-radius:10px;" />
  </div>

  <!-- Title -->
  <h2 style="font-size:19px;color:#111;margin:0 0 16px;border-bottom:2px solid #009999;padding-bottom:10px;">${title}</h2>

  <!-- Body -->
  ${innerHtml}

  <!-- Divider + Signature -->
  <div style="margin-top:28px;padding-top:16px;border-top:1px solid #e5e7eb;">
    ${emailSignature()}
  </div>
</div>`;
}

// ---------------------------------------------------------------------------
// Handler
// ---------------------------------------------------------------------------

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({success: false, message: 'Method not allowed'});
    }

    const {name, email, subject, priority, description} = req.body;

    if (!name?.trim() || !email?.trim() || !subject?.trim()) {
        return res.status(400).json({success: false, message: 'Name, email and subject are required.'});
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({success: false, message: 'Please enter a valid email address.'});
    }

    // ── Persist to DB ────────────────────────────────────────────────────────
    let ticket: ReturnType<typeof Tickets.create> | null = null;
    try {
        ticket = Tickets.create({
            subject: subject.trim(),
            requester: name.trim(),
            requester_email: email.trim().toLowerCase(),
            priority: priority || 'medium',
            status: 'open',
            assignee_id: null,
            body: description?.trim() || null,
        });
    } catch (dbErr) {
        console.error('Ticket DB insert failed:', dbErr);
        return res.status(500).json({success: false, message: 'Failed to save ticket. Please try again.'});
    }

    // ── Email notifications (best-effort) ────────────────────────────────────
    if (!smtpOk()) {
        broadcast('ticket', {action: 'create', ticket});
        broadcastStats();
        return res.status(200).json({
            success: true,
            message: 'Your ticket has been submitted successfully.',
            ticketId: ticket.id
        });
    }

    const ticketRef = `GIT-${String(ticket.id).padStart(6, '0')}`;
    const teamTo = process.env.CONTACT_TO || 'hello@greyinfotech.com.ng';
    const from = process.env.SMTP_FROM!;
    const logo = logoAttachment();
    const attachments = logo ? [logo] : [];

    try {
        const transporter = makeTransporter();

        // 1. Notify the support team ─────────────────────────────────────────
        const teamBody = `
<table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:16px;">
  <tr><td style="padding:5px 0;color:#555;width:110px;">From</td>
      <td style="padding:5px 0;font-weight:600;">${name} &lt;${email}&gt;</td></tr>
  <tr><td style="padding:5px 0;color:#555;">Ticket ref</td>
      <td style="padding:5px 0;font-weight:700;color:#009999;">#${ticketRef}</td></tr>
  <tr><td style="padding:5px 0;color:#555;">Subject</td>
      <td style="padding:5px 0;">${subject}</td></tr>
  <tr><td style="padding:5px 0;color:#555;">Priority</td>
      <td style="padding:5px 0;text-transform:capitalize;">${priority || 'medium'}</td></tr>
</table>
${description
            ? `<div style="padding:14px;background:#f9fafb;border-left:4px solid #009999;border-radius:0 8px 8px 0;font-size:14px;line-height:1.7;color:#333;">
        ${String(description).replace(/\n/g, '<br/>')}
       </div>`
            : ''}`;

        await transporter.sendMail({
            from,
            to: teamTo,
            replyTo: email,
            subject: `[New Ticket #${ticketRef}] ${subject}`,
            html: emailShell(`New Support Ticket — #${ticketRef}`, teamBody),
            attachments,
        }).catch(e => console.error('Team email failed:', e));

        // 2. Confirmation to the requester ────────────────────────────────────
        const clientBody = `
<p style="margin:0 0 12px;">Hi <strong>${name}</strong>,</p>
<p style="margin:0 0 12px;">
  Thanks for reaching out. We've received your request, and our team will
  respond within one business day (Mon–Sat, 8 am–5 pm WAT).
</p>
<div style="margin:18px 0;padding:14px 18px;background:#f0fdfa;border-left:4px solid #009999;border-radius:0 8px 8px 0;">
  <div style="font-size:12px;color:#555;margin-bottom:4px;">Your ticket reference</div>
  <div style="font-size:22px;font-weight:700;color:#0f766e;letter-spacing:1.5px;">#${ticketRef}</div>
</div>
<p style="font-size:14px;color:#555;margin:0 0 12px;">
  You can reply directly to this email to add more information to your ticket.
  Our team's reply will also be delivered to this address — no account needed.
</p>`;

        await transporter.sendMail({
            from,
            to: email,
            replyTo: teamTo,
            subject: `We received your ticket — #${ticketRef}`,
            html: emailShell('Your ticket has been received', clientBody),
            attachments,
        }).catch(e => console.error('Confirmation email failed:', e));

    } catch (emailErr) {
        console.error('Email setup failed:', emailErr);
    }

    broadcast('ticket', {action: 'create', ticket});
    broadcastStats();
    return res.status(200).json({success: true, message: 'Ticket submitted successfully.', ticketId: ticket.id});
}