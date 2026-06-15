import type {NextApiRequest, NextApiResponse} from 'next';
import nodemailer from 'nodemailer';
import {PartnerInquiries} from '../../Admin/models';
import {GREY_SIGNATURE_HTML, GREY_SIGNATURE_TEXT} from '../../lib/emailSignature';

export const config = {
    api: {bodyParser: true},
};

function str(v: unknown): string {
    return typeof v === 'string' ? v.trim() : '';
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({success: false, message: 'Method not allowed'});
    }

    try {
        const b = (req.body || {}) as Record<string, unknown>;
        const company = str(b.company);
        const contact_name = str(b.contact_name) || str(b.contactName);
        const email = str(b.email);
        const phone = str(b.phone);
        const website = str(b.website);
        const country = str(b.country);
        const reg_authority = str(b.reg_authority) || str(b.regAuthority);
        const reg_number = str(b.reg_number) || str(b.regNumber);
        const partnership_type = str(b.partnership_type) || str(b.partnershipType);
        const message = str(b.message);

        if (!company || !contact_name || !email) {
            return res.status(400).json({
                success: false,
                message: 'Company, contact name and email are required.',
            });
        }

        // Persist first — never lose a lead on email failure.
        try {
            PartnerInquiries.create({
                company,
                contact_name,
                email,
                phone: phone || null,
                website: website || null,
                country: country || null,
                reg_authority: reg_authority || null,
                reg_number: reg_number || null,
                partnership_type: partnership_type || null,
                message: message || null,
                status: 'new',
            });
        } catch (dbErr) {
            console.error('Partner inquiry DB insert failed:', dbErr);
        }

        // Email is best-effort.
        const smtpConfigured = Boolean(
            process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS && process.env.SMTP_FROM
        );
        if (!smtpConfigured) {
            console.warn('SMTP not configured — partner inquiry saved, skipping email.');
            return res.status(200).json({
                success: true,
                message: 'Thank you! Your partnership request has been received.',
            });
        }

        const host = process.env.SMTP_HOST as string;
        const port = Number(process.env.SMTP_PORT || 587);
        const secure = port === 465;
        const user = process.env.SMTP_USER as string;
        const pass = process.env.SMTP_PASS as string;
        const from = process.env.SMTP_FROM as string;
        const to = process.env.CONTACT_TO || 'hello@greyinfotech.com.ng';

        const transporter = nodemailer.createTransport({host, port, secure, auth: {user, pass}});

        // Admin notification
        const adminText = [
            'New partnership inquiry received:',
            '',
            `Company:          ${company}`,
            `Contact:          ${contact_name}`,
            `Email:            ${email}`,
            `Phone:            ${phone || '-'}`,
            `Website:          ${website || '-'}`,
            `Country:          ${country || '-'}`,
            `Reg. authority:   ${reg_authority || '-'}`,
            `Reg. number:      ${reg_number || '-'}`,
            `Partnership type: ${partnership_type || '-'}`,
            '',
            'Message:',
            message || '-',
        ].join('\n');

        try {
            await transporter.sendMail({
                from,
                to,
                replyTo: email,
                subject: `New Partnership Inquiry — ${company}`,
                text: adminText,
            });
        } catch (e) {
            console.error('Partner admin email failed:', e);
        }

        // Auto-confirmation to submitter (shared signature)
        const confirmHtml = `
          <div style="font-family: Arial, sans-serif; font-size: 15px; color: #222;">
            <p>Dear ${contact_name},</p>
            <p>
              Thank you for your interest in partnering with <strong>Grey InfoTech</strong>.
              We have received your request on behalf of <strong>${company}</strong> and our
              partnerships team will review it carefully.
            </p>
            <p>
              We typically respond to partnership enquiries within 2&ndash;3 business days. If your
              proposal aligns with our ecosystem, we will reach out to schedule an introductory call.
            </p>
            <p>
              In the meantime, feel free to explore our work at
              <a href="https://www.greyinfotech.com.ng" style="color:#0072c6;">www.greyinfotech.com.ng</a>.
            </p>
            <p>We look forward to building something great together.</p>
            <br/>
            ${GREY_SIGNATURE_HTML}
          </div>
        `;

        const confirmText = `Dear ${contact_name},

Thank you for your interest in partnering with Grey InfoTech. We have received your request on behalf of ${company} and our partnerships team will review it carefully.

We typically respond to partnership enquiries within 2-3 business days. If your proposal aligns with our ecosystem, we will reach out to schedule an introductory call.

In the meantime, feel free to explore our work at www.greyinfotech.com.ng.

We look forward to building something great together.

${GREY_SIGNATURE_TEXT}`;

        try {
            await transporter.sendMail({
                from,
                to: email,
                subject: 'We have received your partnership request',
                text: confirmText,
                html: confirmHtml,
            });
        } catch (e) {
            console.error('Partner confirmation email failed:', e);
        }

        return res.status(200).json({
            success: true,
            message: 'Thank you! Your partnership request has been received.',
        });
    } catch (error) {
        console.error('Partner inquiry API error:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to process request.',
        });
    }
}
