import type {NextApiRequest, NextApiResponse} from 'next';
import nodemailer from 'nodemailer';
import {Tickets, TicketMessages} from '../../Admin/models';

const PRIORITIES = ['low', 'medium', 'high', 'urgent'];

function clean(v: unknown): string {
    return typeof v === 'string' ? v.trim() : '';
}

function isEmail(v: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({success: false, message: 'Method not allowed'});
    }

    try {
        const name = clean(req.body?.name);
        const email = clean(req.body?.email);
        const subject = clean(req.body?.subject);
        const message = clean(req.body?.message);
        const category = clean(req.body?.category);
        const phone = clean(req.body?.phone);
        let priority = clean(req.body?.priority).toLowerCase();
        if (!PRIORITIES.includes(priority)) priority = 'medium';

        if (!name || !email || !subject || !message) {
            return res.status(400).json({
                success: false,
                message: 'Name, email, subject and message are required.',
            });
        }
        if (!isEmail(email)) {
            return res.status(400).json({success: false, message: 'Please enter a valid email address.'});
        }

        // Build a body that captures all context for the support team.
        const bodyParts = [
            message,
            '',
            '— Submitted via website support form —',
            category ? `Category: ${category}` : '',
            phone ? `Phone: ${phone}` : '',
        ].filter(Boolean);
        const fullBody = bodyParts.join('\n');

        // Persist the ticket to the admin dashboard. Never block submission on a
        // DB error — surface a clear failure only if the insert truly fails.
        let ticketId: number | null = null;
        try {
            const row = Tickets.create({
                subject,
                requester: name,
                requester_email: email,
                priority,
                status: 'open',
                body: fullBody,
            }) as { id: number };
            ticketId = row?.id ?? null;
            if (ticketId) {
                try {
                    TicketMessages.create({
                        ticket_id: ticketId,
                        author: name,
                        is_staff: 0,
                        body: message,
                    });
                } catch (msgErr) {
                    console.error('Ticket message insert failed:', msgErr);
                }
            }
        } catch (dbErr) {
            console.error('Ticket DB insert failed:', dbErr);
            return res.status(500).json({success: false, message: 'Could not create your ticket. Please try again.'});
        }

        const ref = ticketId ? `GIT-${String(ticketId).padStart(5, '0')}` : 'GIT';

        // Email is best-effort. Ticket is already saved above.
        const smtpConfigured = Boolean(
            process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS && process.env.SMTP_FROM
        );
        if (!smtpConfigured) {
            console.warn('SMTP not configured — ticket saved, skipping emails.');
            return res.status(200).json({success: true, message: 'Your ticket has been created.', reference: ref});
        }

        try {
            const port = Number(process.env.SMTP_PORT || 587);
            const transporter = nodemailer.createTransport({
                host: process.env.SMTP_HOST,
                port,
                secure: port === 465,
                auth: {user: process.env.SMTP_USER, pass: process.env.SMTP_PASS},
            });
            const from = process.env.SMTP_FROM as string;
            const team = process.env.SUPPORT_TO || process.env.CONTACT_TO || 'hello@greyinfotech.com.ng';

            // Notify the team
            await transporter.sendMail({
                from,
                to: team,
                replyTo: email,
                subject: `[New Ticket ${ref}] ${subject}`,
                text: `A new support ticket has been opened.\n\nReference: ${ref}\nName: ${name}\nEmail: ${email}\n${phone ? `Phone: ${phone}\n` : ''}${category ? `Category: ${category}\n` : ''}Priority: ${priority}\n\nMessage:\n${message}`,
            }).catch((e) => console.error('Team ticket email failed:', e));

            // Confirmation to the requester
            const confirmHtml = `
                <div style="font-family: Arial, sans-serif; font-size: 15px; color: #222;">
                  <p>Dear ${name},</p>
                  <p>Thank you for contacting Grey InfoTech support. Your ticket has been received and our team will get back to you within one business day.</p>
                  <p style="margin: 18px 0; padding: 12px 16px; background:#f4f7fb; border-radius:8px;">
                    <strong>Reference:</strong> ${ref}<br/>
                    <strong>Subject:</strong> ${subject}<br/>
                    <strong>Priority:</strong> ${priority}
                  </p>
                  <p><strong>Your message:</strong><br/>${message.replace(/\n/g, '<br/>')}</p>
                  <p>Please keep your reference number for any follow-up.</p>
                  <div style="margin-top:20px; padding-top:15px; font-size:12px; color:#555; border-top:1px solid #eee;">
                    <strong style="font-size:15px; color:#14b8a6;">Grey InfoTech Team</strong><br/>
                    <a href="mailto:hello@greyinfotech.com.ng" style="color:#0072c6;">hello@greyinfotech.com.ng</a><br/>
                    +234 802 809 5571 &middot; <a href="https://www.greyinfotech.com.ng" style="color:#0072c6;">www.greyinfotech.com.ng</a>
                  </div>
                </div>`;
            await transporter.sendMail({
                from,
                to: email,
                subject: `We received your support request (${ref})`,
                text: `Dear ${name},\n\nThank you for contacting Grey InfoTech support. Your ticket has been received.\n\nReference: ${ref}\nSubject: ${subject}\nPriority: ${priority}\n\nYour message:\n${message}\n\nOur team will get back to you within one business day.\n\nGrey InfoTech Team\nhello@greyinfotech.com.ng\n+234 802 809 5571`,
                html: confirmHtml,
            }).catch((e) => console.error('Requester confirmation email failed:', e));
        } catch (mailErr) {
            console.error('Ticket email step failed:', mailErr);
        }

        return res.status(200).json({success: true, message: 'Your ticket has been created.', reference: ref});
    } catch (error) {
        console.error('Ticket API error:', error);
        return res.status(500).json({success: false, message: 'Failed to create ticket.'});
    }
}