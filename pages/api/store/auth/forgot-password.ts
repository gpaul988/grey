import type {NextApiRequest, NextApiResponse} from 'next';
import {z} from 'zod';
import {Customers} from '../../../../Admin/models';
import {rateLimit, validate} from '../../../../lib/apiGuard';
import {appOrigin, emailButton, emailShell, sendMail} from '../../../../Admin/utils/mailer';

const schema = z.object({
    email: z.string().trim().toLowerCase().email('Enter a valid email').max(254),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') return res.status(405).json({error: 'Method not allowed'});
    // Limit reset requests per IP to curb abuse / email bombing.
    if (!rateLimit(req, res, {key: 'forgot-pw', limit: 5, windowMs: 15 * 60_000})) return;

    const data = validate(schema, req, res);
    if (!data) return;

    // Always respond with the same success message, regardless of whether the
    // email exists — never reveal account existence (account-enumeration safe).
    const generic = {ok: true, message: 'If an account exists for that email, a reset link has been sent.'};

    const result = Customers.createPasswordReset(String(data.email));
    if (!result) return res.json(generic);

    const {token, customer} = result;
    const link = `${appOrigin()}/store/account/reset-password?token=${encodeURIComponent(token)}`;
    const name = customer.first_name || 'there';

    const html = emailShell(
        'Reset your password',
        `<p>Hi ${name},</p>
         <p>We received a request to reset the password for your Grey TechStore account. Click the button below to choose a new password. This link expires in <strong>60 minutes</strong>.</p>
         ${emailButton('Reset Password', link)}
         <p style="font-size:13px;color:#888;">If you didn't request this, you can safely ignore this email — your password won't change.</p>`,
    );

    await sendMail({to: String(data.email), subject: 'Reset your Grey TechStore password', html});

    return res.json(generic);
}
