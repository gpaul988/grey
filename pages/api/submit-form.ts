import type {NextApiRequest, NextApiResponse} from 'next';
import nodemailer from 'nodemailer';
import {IncomingForm, type Fields, type Files, type File} from 'formidable';
import {Submissions} from '../../Admin/models';

export const config = {
    api: {bodyParser: false},
};

const allProjectTypes = [
    "AI/ML Solutions", "API Development & Integration", "Blockchain Development", "Cloud Solutions",
    "CRM/ERP Systems", "Custom Software Development", "Data Analytics Platform", "Database Design & Development",
    "Desktop Application", "DevOps & Infrastructure", "E-commerce Platform", "Enterprise Software",
    "IoT Solutions", "Mobile App Development", "SaaS Platform", "System Integration", "UI/UX Design",
    "Web Application", "Web Development", "Website Redesign", "AI Development", "Android Development",
    "App Store Optimization", "Cross Platform Development", "Digital Marketing", "Flutter Development",
    "Mac Development", "Mobile Application Development", "React Native Development", "SEO",
    "Social Media Marketing", "Software Development", "Web Application Design", "Windows Development",
    "Wix Development", "Consulting Services", "Maintenance & Support", "Other"
];

function getField(field: string | string[] | undefined): string {
    return Array.isArray(field) ? field[0] || '' : field || '';
}

function parseForm(req: NextApiRequest): Promise<{ fields: Fields; files: Files }> {
    return new Promise((resolve, reject) => {
        const form = new IncomingForm();
        form.parse(req, (err, fields, files) => {
            if (err) reject(err);
            else resolve({fields, files});
        });
    });
}

function isFormidableFile(x: unknown): x is File {
    return !!x && typeof x === 'object';
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
        const {fields, files} = await parseForm(req);

        const name = getField(fields.name);
        const email = getField(fields.email);
        const subject = getField(fields.subject);
        const projectType = getField(fields.projectType);

        if (!name || !email) {
            return res.status(400).json({success: false, message: 'Name and email are required.'});
        }

        // Persist the lead to the admin database so it appears in the dashboard
        // even if email delivery later fails. Never block submission on a DB error.
        try {
            Submissions.create({
                name,
                email,
                phone: getField(fields.phone) || null,
                subject: subject || null,
                project_type: projectType || null,
                budget: getField(fields.budget) || null,
                message: getField(fields.message) || getField(fields.details) || null,
                source: 'website',
                status: 'new',
            });
        } catch (dbErr) {
            console.error('Submission DB insert failed:', dbErr);
        }

        const emailBody = Object.entries(fields)
            .filter(([key]) => key !== 'privacyPolicy')
            .map(([key, value]) => {
                const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
                return `${label}: ${getField(value)}`;
            })
            .join('\n');

        const attachments: { filename: string; path: string }[] = [];
        for (const [fileKey, value] of Object.entries(files as Record<string, File | File[]>)) {
            const fileList = Array.isArray(value) ? value : [value];
            for (const file of fileList) {
                if (isFormidableFile(file)) {
                    attachments.push({
                        filename: file.originalFilename || fileKey,
                        path: file.filepath,
                    });
                }
            }
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
            return res.status(502).json({success: false, message: 'SMTP server unavailable.'});
        }

        try {
            await sendEmail(
                {
                    from,
                    to,
                    replyTo: email,
                    subject: subject || `New Project Inquiry from ${name}`,
                    text: emailBody,
                    attachments,
                },
                transporter
            );
        } catch (e) {
            console.error('Admin email send failed:', e);
            return res.status(502).json({success: false, message: 'Failed to send admin email.'});
        }

        // Auto-response logic with project type and professional footer
        const normalizedType = projectType.trim().toLowerCase();
        const knownTypes = allProjectTypes.map(t => t.toLowerCase());
        const isKnownType = knownTypes.includes(normalizedType);

        const projectTypeText = isKnownType ? ` regarding ${projectType}` : '';
        const projectTypeLineHtml = isKnownType
            ? `<p>We appreciate your interest in our <strong>${projectType}</strong> services.</p>`
            : '';
        const projectTypeLineText = isKnownType
            ? `We appreciate your interest in our ${projectType} services.\n`
            : '';

        const autoResponseHtml = `
                                     <div style="font-family: Arial, sans-serif; font-size: 15px; color: #222;">
                                       <p>Dear ${name},</p>
                                       <p>
                                         Thank you for contacting Grey Infotech. We have received your inquiry${projectTypeText} and our team will review your submission. You can expect a response from us within 24 hours.
                                       </p>
                                       ${projectTypeLineHtml}
                                       <p>
                                         If you would like to schedule a call to discuss your project in more detail, please reply to this email with your preferred date and time, and we will be happy to arrange it.
                                       </p>
                                       <p>
                                         In the meantime, feel free to explore our website at <a href="https://www.greyinfotech.com.ng" style="color: #0072c6;">www.greyinfotech.com.ng</a> to learn more about our services.
                                       </p>
                                       <p>We look forward to the opportunity to work with you.</p>
                                       <br/>
                                       <div style="margin-top:20px; padding-top:15px; font-size:10px; color:#555;">
                                         <strong style="font-size:16px; color:#14b8a6;">Grey InfoTech Team</strong><br/><br/>
                                         <a href="mailto:hello@greyinfotech.com.ng" style="color:#0072c6;">hello@greyinfotech.com.ng</a><br/>
                                         9 Godfery Tata Close, Rumuewhara New Layout, Off Enenka - Igwurita Road,<br/>
                                         Port Harcourt, Rivers State, Nigeria<br/>
                                         +234 802 809 5571<br/>
                                         <a href="https://www.greyinfotech.com.ng" style="color:#0072c6;">www.greyinfotech.com.ng</a>
                                         <br/><br/>
                                         
                                         <span>Follow us:</span>
                                         <a href="https://facebook.com/greyinfotechltd" style="margin:0 8px;">
                                           <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/facebook.svg" alt="Facebook" width="20" height="20" style="vertical-align:middle;"/>
                                         </a>
                                         <a href="https://twitter.com/greyinfoechltd" style="margin:0 8px;">
                                           <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/twitter.svg" alt="Twitter" width="20" height="20" style="vertical-align:middle;"/>
                                         </a>
                                         <a href="https://instagram.com/greyinfotechltd" style="margin:0 8px;">
                                           <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/instagram.svg" alt="Instagram" width="20" height="20" style="vertical-align:middle;"/>
                                         </a>
                                         <a href="https://linkedin.com/company/greyinfotechltd" style="margin:0 8px;">
                                           <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/linkedin.svg" alt="LinkedIn" width="20" height="20" style="vertical-align:middle;"/>
                                         </a>
                                       </div>
                                     </div>
                                   `;

        const autoResponseText = `
                                   Dear ${name},
                                   
                                   Thank you for contacting Grey Infotech. We have received your inquiry${projectTypeText} and our team will review your submission. You can expect a response from us within 24 hours.
                                   
                                   ${projectTypeLineText}
                                   If you would like to schedule a call to discuss your project in more detail, please reply to this email with your preferred date and time, and we will be happy to arrange it.
                                   
                                   In the meantime, feel free to explore our website at www.greyinfotech.com.ng to learn more about our services.
                                   
                                   We look forward to the opportunity to work with you.
                                   
                                   Best regards,
                                   
                                   Grey InfoTech Team
                                   
                                   hello@greyinfotech.com.ng
                                   9 Godfery Tata Close, Rumuewhara New Layout, Off Eneka - Igwuruta Road, Port Harcourt, Rivers State, Nigeria
                                   +234 802 809 5571
                                   www.greyinfotech.com.ng
                                   
                                   Follow us:
                                   Facebook: https://facebook.com/
                                   Twitter: https://twitter.com/
                                   Instagram: https://instagram.com/
                                   LinkedIn: https://linkedin.com/
                                   `;

        try {
            await sendEmail(
                {
                    from,
                    to: email,
                    subject: 'We have received your inquiry',
                    text: autoResponseText,
                    html: autoResponseHtml,
                },
                transporter
            );
        } catch (e) {
            console.error('Auto-response send failed:', e);
        }

        return res.status(200).json({success: true, message: 'Your message has been sent successfully!'});
    } catch (error) {
        console.error('API error:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to process request.',
            error: error instanceof Error ? error.message : String(error),
        });
    }
}