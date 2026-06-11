import type {NextApiRequest, NextApiResponse} from 'next';
import nodemailer from 'nodemailer';
import {Tickets} from '../../Admin/models';

function getField(field: any): string {
    return Array.isArray(field) ? field[0] || '' : field || '';
}

function getEnvVar(name: string): string {
    const value = process.env[name];
    if (!value) throw new Error(`Missing required environment variable: ${name}`);
    return value;
}

async function sendEmail(options: nodemailer.SendMailOptions, transporter: nodemailer.Transporter) {
    try {
        return await transporter.sendMail(options);
    } catch (error) {
        throw new Error(`Failed to send email: ${(error as Error).message}`);
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({message: 'Method not allowed'});
    }

    try {
        const {name, email, subject, priority, body} = req.body;

        const requester = getField(name).trim();
        const requester_email = getField(email).trim();
        const ticket_subject = getField(subject).trim();
        const ticket_priority = getField(priority).trim() || 'medium';
        const ticket_body = getField(body).trim();

        if (!requester || !requester_email || !ticket_subject || !ticket_body) {
            return res.status(400).json({
                success: false,
                message: 'All fields (name, email, subject, body) are required.'
            });
        }

        let newTicketId: number | null = null;
        // 1. Create the ticket in SQLite DB
        try {
            const ticket = Tickets.create({
                subject: ticket_subject,
                requester,
                requester_email,
                priority: ticket_priority,
                status: 'open',
                assignee_id: null,
                body: ticket_body,
            });
            if (ticket && typeof ticket === 'object' && 'id' in ticket) {
                newTicketId = (ticket as any).id;
            }
        } catch (dbErr) {
            console.error('Ticket DB insert failed:', dbErr);
        }

        const ticketRef = newTicketId ? `TKT-${String(newTicketId).padStart(4, '0')}` : 'Support Request';

        // 2. Email sending logic
        const smtpConfigured = Boolean(
            process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS && process.env.SMTP_FROM
        );

        if (!smtpConfigured) {
            console.warn('SMTP not configured — ticket saved to database, skipping notification emails.');
            return res.status(200).json({
                success: true,
                ticketId: newTicketId,
                ticketRef,
                message: 'Your support ticket has been created successfully!',
            });
        }

        const host = getEnvVar('SMTP_HOST');
        const port = Number(process.env.SMTP_PORT || 587);
        const secure = port === 465;
        const user = getEnvVar('SMTP_USER');
        const pass = getEnvVar('SMTP_PASS');
        const from = getEnvVar('SMTP_FROM');
        const to = process.env.CONTACT_TO || 'hello@greyinfotech.com.ng';

        const transporter = nodemailer.createTransport({
            host,
            port,
            secure,
            auth: {user, pass},
        });

        try {
            await transporter.verify();
        } catch (e) {
            console.error('SMTP verification failed:', e);
            // Non-blocking for the user as the ticket is saved in database.
            return res.status(200).json({
                success: true,
                ticketId: newTicketId,
                ticketRef,
                message: 'Your ticket was created, but we could not send email notifications at this time.',
            });
        }

        // Notify the team
        const teamSubject = `[New Ticket] ${ticketRef}: ${ticket_subject}`;
        const teamBody = `A new support ticket has been opened by a guest.

Ticket Details:
------------------------------------------
Reference:    ${ticketRef}
Requester:    ${requester} (${requester_email})
Priority:     ${ticket_priority.toUpperCase()}
Subject:      ${ticket_subject}

Description:
${ticket_body}

------------------------------------------
Respond to this ticket via the Grey Admin Dashboard.`;

        try {
            await sendEmail({
                from,
                to,
                replyTo: requester_email,
                subject: teamSubject,
                text: teamBody,
            }, transporter);
        } catch (e) {
            console.error('Support team notification email failed:', e);
        }

        // Send confirmation email to the guest requester
        const guestSubject = `[Support Ticket Received] ${ticketRef}: ${ticket_subject}`;
        const guestHtml = `
            <div style="font-family: Arial, sans-serif; font-size: 15px; color: #222; max-width: 600px; margin: 0 auto;">
                <p>Dear ${requester},</p>
                <p>
                    Thank you for reaching out to Grey Infotech Support. This is to confirm that we have received your request and have opened a support ticket for you.
                </p>
                <div style="background-color: #f9f9f9; border-left: 4px solid #14b8a6; padding: 15px; margin: 20px 0;">
                    <strong style="color: #111;">Ticket Reference:</strong> ${ticketRef}<br/>
                    <strong style="color: #111;">Subject:</strong> ${ticket_subject}<br/>
                    <strong style="color: #111;">Priority:</strong> ${ticket_priority.toUpperCase()}<br/>
                    <strong style="color: #111;">Status:</strong> OPEN
                </div>
                <p>
                    Our support team has been notified and is currently reviewing your issue. We will get back to you as soon as possible, normally within 24 business hours.
                </p>
                <p>
                    If you have any additional information or screenshots to supply, feel free to reply directly to this email, and it will be updated on your ticket.
                </p>
                <p>Thank you for your patience.</p>
                <br/>
                <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;"/>
                <div style="font-size: 11px; color: #555;">
                    <strong style="font-size:15px; color:#14b8a6;">Grey InfoTech Support Team</strong><br/><br/>
                    <a href="mailto:hello@greyinfotech.com.ng" style="color:#0072c6;">hello@greyinfotech.com.ng</a><br/>
                    9 Godfery Tata Close, Rumuewhara New Layout, Off Eneka - Igwuruta Road,<br/>
                    Port Harcourt, Rivers State, Nigeria<br/>
                    +234 802 809 5571<br/>
                    <a href="https://www.greyinfotech.com.ng" style="color:#0072c6;">www.greyinfotech.com.ng</a>
                </div>
            </div>
        `;

        try {
            await sendEmail({
                from,
                to: requester_email,
                subject: guestSubject,
                html: guestHtml,
                text: `Dear ${requester},\n\nWe have received your support request and opened a ticket.\n\nTicket Reference: ${ticketRef}\nSubject: ${ticket_subject}\nPriority: ${ticket_priority.toUpperCase()}\nStatus: OPEN\n\nOur support team will review this and respond within 24 hours.\n\nThank you for choosing Grey Infotech.`
            }, transporter);
        } catch (e) {
            console.error('Guest support confirmation email failed:', e);
        }

        return res.status(200).json({
            success: true,
            ticketId: newTicketId,
            ticketRef,
            message: 'Your ticket has been created and confirmation email sent!',
        });

    } catch (err: any) {
        console.error('Error in ticket creation API:', err);
        return res.status(500).json({success: false, message: 'Internal server error while creating ticket.'});
    }
}
