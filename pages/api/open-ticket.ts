import type {NextApiRequest, NextApiResponse} from 'next';
import nodemailer from 'nodemailer';
import {Tickets} from '../../Admin/models';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') return res.status(405).json({success: false, message: 'Method not allowed'});

    const {name, email, subject, priority, description} = req.body;

    if (!name?.trim() || !email?.trim() || !subject?.trim()) {
        return res.status(400).json({success: false, message: 'Name, email and subject are required.'});
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({success: false, message: 'Please enter a valid email address.'});
    }

    // Save to admin DB
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

    // Email notifications (best-effort — never block if SMTP not configured)
    const smtpOk = Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS && process.env.SMTP_FROM);
    if (!smtpOk) {
        return res.status(200).json({
            success: true,
            message: 'Your ticket has been submitted successfully.',
            ticketId: ticket.id
        });
    }

    try {
        const port = Number(process.env.SMTP_PORT || 587);
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port,
            secure: port === 465,
            auth: {user: process.env.SMTP_USER, pass: process.env.SMTP_PASS},
        });

        const teamTo = process.env.CONTACT_TO || 'hello@greyinfotech.com.ng';
        const from = process.env.SMTP_FROM!;
        const ticketRef = `GIT-${String(ticket.id).padStart(6, '0')}`;

        // 1. Notify the team
        await transporter.sendMail({
            from,
            to: teamTo,
            replyTo: email,
            subject: `[New Ticket #${ticketRef}] ${subject}`,
            html: `
<div style="font-family:Arial,sans-serif;font-size:15px;color:#222;max-width:560px;margin:0 auto;padding:24px;border:1px solid #eee;border-radius:12px;">
  <div style="text-align:center;margin-bottom:18px;"><span style="font-size:20px;font-weight:700;color:#14b8a6;">Grey InfoTech</span></div>
  <h2 style="font-size:18px;color:#111;margin:0 0 14px;">New Support Ticket — #${ticketRef}</h2>
  <table style="width:100%;border-collapse:collapse;font-size:14px;">
    <tr><td style="padding:6px 0;color:#555;width:120px;">From</td><td style="padding:6px 0;font-weight:600;">${name} &lt;${email}&gt;</td></tr>
    <tr><td style="padding:6px 0;color:#555;">Subject</td><td style="padding:6px 0;">${subject}</td></tr>
    <tr><td style="padding:6px 0;color:#555;">Priority</td><td style="padding:6px 0;text-transform:capitalize;">${priority || 'medium'}</td></tr>
  </table>
  ${description ? `<div style="margin-top:16px;padding:14px;background:#f9f9f9;border-radius:8px;font-size:14px;line-height:1.6;color:#333;">${description.replace(/\n/g, '<br/>')}</div>` : ''}
  <div style="margin-top:26px;padding-top:14px;border-top:1px solid #eee;font-size:12px;color:#777;">
    Grey InfoTech &middot; Port Harcourt, Rivers State, Nigeria<br/>
    <a href="https://www.greyinfotech.com.ng" style="color:#0072c6;">www.greyinfotech.com.ng</a>
  </div>
</div>`,
        }).catch(e => console.error('Team email failed:', e));

        // 2. Confirmation to requester
        await transporter.sendMail({
            from,
            to: email,
            subject: `We received your ticket — #${ticketRef}`,
            html: `
<div style="font-family:Arial,sans-serif;font-size:15px;color:#222;max-width:560px;margin:0 auto;padding:24px;border:1px solid #eee;border-radius:12px;">
  <div style="text-align:center;margin-bottom:18px;"><span style="font-size:20px;font-weight:700;color:#14b8a6;">Grey InfoTech</span></div>
  <h2 style="font-size:18px;color:#111;margin:0 0 14px;">Your ticket has been received</h2>
  <p>Hi ${name},</p>
  <p>Thanks for reaching out. We've created a support ticket for your request and our team will respond within one business day.</p>
  <div style="margin:18px 0;padding:14px 18px;background:#f0fdfa;border-left:4px solid #14b8a6;border-radius:0 8px 8px 0;">
    <div style="font-size:13px;color:#555;margin-bottom:4px;">Your ticket reference</div>
    <div style="font-size:20px;font-weight:700;color:#0f766e;letter-spacing:1px;">#${ticketRef}</div>
  </div>
  <p style="font-size:14px;color:#555;">You can reply directly to this email if you need to add more information.</p>
  <p>Best regards,<br/><div><table id="gmail-table_0" cellspacing="0" cellpadding="0" style="color: rgb(36, 36, 36); border-collapse: collapse; border-spacing: 0px;"><tbody><tr><td style="border-right: 3pt solid rgb(0, 153, 153); padding: 0cm 9pt 0cm 0cm; vertical-align: top; width: 120.5pt; height: 114.15pt;" class="cursor-default-hover"><p style="line-height: 1.38; margin: 0cm 0cm 8pt; font-family: Aptos, sans-serif; font-size: 12pt;"><span style="color: rgb(0, 0, 0); line-height: 1em;"><u>​<img data-surl="cid:ii_mq977ync0" src="blob:https://mail.google.com/1b5a352e-dfaf-4ce1-b047-c9b54390f757" alt="image.png" width="171" height="171" class="cursor-default-hover"></u></span></p></td><td style="padding: 0cm; vertical-align: top; width: 518.75pt; height: 114.15pt;"><div><table id="gmail-x_x_x_table_0" cellspacing="0" cellpadding="0" style="margin-left: 2.8pt; width: 477.3pt; border-collapse: collapse; border-spacing: 0px;"><tbody><tr><td style="padding: 0cm; vertical-align: top; width: 636.395px; height: 15.65pt; box-sizing: border-box;"><p style="line-height: 1.38; margin: 0cm; font-family: Aptos, sans-serif; font-size: 12pt;"><span style="font-family: &quot;Georgia Pro&quot;, serif; font-size: 24pt; color: rgb(0, 153, 153); line-height: 36.8px;"><b class="cursor-default-hover">​Grey InfoTech Ltd. Team</b></span></p></td></tr><tr><td style="padding: 0cm 0cm 3pt; width: 636.395px; height: 0.7pt; box-sizing: border-box;"><p style="line-height: 1.38; margin: 0cm; font-family: Aptos, sans-serif; font-size: 12pt;"><span style="font-family: &quot;Georgia Pro&quot;, serif; font-size: 14pt; color: rgb(0, 0, 0); line-height: 21.4667px;" class="cursor-default-hover">Support |
</span><span style="font-family: &quot;Georgia Pro&quot;, serif; font-size: 14pt; color: rgb(0, 153, 153); line-height: 21.4667px;"><b class="cursor-default-hover">GREY INFOTECH Limited.</b></span></p></td></tr><tr><td style="padding: 0cm; vertical-align: top; width: 636.395px; height: 15.65pt; box-sizing: border-box;"><p style="line-height: 1.38; margin: 0cm; font-family: Aptos, sans-serif; font-size: 12pt;" class="cursor-default-hover"><span style="color: rgb(0, 153, 153); line-height: 1em;"><b>A:</b>&nbsp;</span><span style="color: rgb(0, 0, 0); line-height: 1em;" class="cursor-default-hover">9 <span zeum4c1="PR_1_0" data-ddnwab="PR_1_0" aria-invalid="spelling" class="LI ng">Godfery</span> Tata Close, <span zeum4c1="PR_2_0" data-ddnwab="PR_2_0" aria-invalid="spelling" class="LI ng">Rumuewhara</span> New Layout,<br>
&nbsp;Off Eneka - <span zeum4c1="PR_3_0" data-ddnwab="PR_3_0" aria-invalid="spelling" class="LI ng">Igwurita</span> Road, Rivers State, Nigeria</span></p></td></tr><tr><td style="padding: 0cm; vertical-align: top; width: 636.395px; height: 15.65pt; box-sizing: border-box;"><p style="line-height: 1.38; margin: 0cm 0cm 2pt; font-family: Aptos, sans-serif; font-size: 12pt;" class="cursor-default-hover"><span style="color: rgb(0, 153, 153); line-height: 1em;" class="cursor-default-hover"><b>P:</b>&nbsp;+2348028095571&nbsp;&nbsp;</span></p></td></tr><tr><td style="padding: 0cm; vertical-align: top; width: 636.395px; height: 15.65pt; box-sizing: border-box;" class="cursor-default-hover"><p style="line-height: 1.38; margin: 0cm 0cm 2pt; font-family: Aptos, sans-serif; font-size: 12pt;" class="cursor-default-hover"><span style="color: rgb(0, 153, 153); line-height: 1em;"><b>E:</b>&nbsp;hello<a href="mailto:graham@greyinfotech.com.ng" title="mailto:graham@greyinfotech.com.ng" style="color: rgb(0, 153, 153); text-decoration: none; margin: 0px;">@greyinfotech.com.ng</a></span><span style="color: rgb(0, 0, 0); line-height: 1em;" class="cursor-default-hover">&nbsp;
 &nbsp;</span></p><div style="line-height: 1.38; margin: 0cm 0cm 2pt; font-family: Aptos, sans-serif; font-size: 12pt; color: rgb(0, 153, 153);" class="cursor-default-hover"><span style="line-height: 1em;" class="cursor-default-hover"><b>W:</b>&nbsp;www.greyinfotech.com.ng</span></div></td></tr></tbody></table></div></td></tr></tbody></table></div>
</div>`,
        }).catch(e => console.error('Confirmation email failed:', e));

    } catch (emailErr) {
        console.error('Email setup failed:', emailErr);
    }

    return res.status(200).json({success: true, message: 'Ticket submitted successfully.', ticketId: ticket.id});
}