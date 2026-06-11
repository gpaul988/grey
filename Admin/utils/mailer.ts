import nodemailer, {type Transporter, type SendMailOptions} from 'nodemailer';

/**
 * Central transactional mailer for the admin/portal app.
 *
 * SMTP is OPTIONAL: if it is not fully configured we never throw — we log the
 * message (and any action link) to the server console so local/dev flows keep
 * working, and callers can still complete (verification rows are persisted to
 * the DB regardless). This mirrors the contact-form's best-effort approach.
 */

const FROM = process.env.SMTP_FROM || 'Grey InfoTech <hello@greyinfotech.com.ng>';
const BRAND = 'Grey InfoTech Ltd.';
const TEAL = '#14b8a6';

export function smtpConfigured(): boolean {
    return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS && process.env.SMTP_FROM);
}

/** The public origin used to build links inside emails. */
export function appOrigin(): string {
    return (
        process.env.APP_URL ||
        process.env.FRONTEND_BASE_URL ||
        `http://localhost:${process.env.PORT || 3000}`
    ).replace(/\/$/, '');
}

let cached: Transporter | null = null;

function transporter(): Transporter | null {
    if (!smtpConfigured()) return null;
    if (cached) return cached;
    const port = Number(process.env.SMTP_PORT || 587);
    cached = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port,
        secure: port === 465,
        auth: {user: process.env.SMTP_USER, pass: process.env.SMTP_PASS},
    });
    return cached;
}

/** Wrap inner HTML in the standard Grey InfoTech email shell. */
export function emailShell(title: string, innerHtml: string): string {
    return `
  <div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#222;max-width:560px;margin:0 auto;padding:24px;border:1px solid #eee;border-radius:12px;">
    <div style="text-align:center;margin-bottom:18px;">
      <span style="font-size:20px;font-weight:700;color:${TEAL};">${BRAND}</span>
    </div>
    <h2 style="font-size:18px;color:#111;margin:0 0 14px;">${title}</h2>
    ${innerHtml}
    <div style="margin-top:26px;padding-top:14px;border-top:1px solid #eee;font-size:12px;color:#777;">
      ${BRAND} &middot; Port Harcourt, Rivers State, Nigeria<br/>
      <a href="https://www.greyinfotech.com.ng" style="color:#0072c6;">www.greyinfotech.com.ng</a>
    </div>
  </div>`;
}

/** Primary CTA button markup. */
export function emailButton(label: string, url: string): string {
    return `<p style="text-align:center;margin:22px 0;">
      <a href="${url}" style="background:${TEAL};color:#fff;text-decoration:none;padding:12px 26px;border-radius:8px;font-weight:600;display:inline-block;">${label}</a>
    </p>
    <p style="font-size:12px;color:#888;word-break:break-all;">Or paste this link into your browser:<br/>${url}</p>`;
}

/**
 * Best-effort send. Returns true if actually delivered via SMTP, false if it
 * was only logged (no SMTP). Never throws — failures are swallowed & logged.
 */
export async function sendMail(opts: { to: string; subject: string; html: string; text?: string }): Promise<boolean> {
    const tx = transporter();
    if (!tx) {
        console.warn(`[mailer] SMTP not configured — skipping send to ${opts.to}: "${opts.subject}"`);
        return false;
    }
    try {
        const payload: SendMailOptions = {
            from: FROM,
            to: opts.to,
            subject: opts.subject,
            html: opts.html,
            text: opts.text || opts.html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim(),
        };
        await tx.sendMail(payload);
        return true;
    } catch (err) {
        console.error('[mailer] send failed:', err);
        return false;
    }
}

/* ------------------------------------------------------------------ */
/* Ready-made transactional templates                                  */

/* ------------------------------------------------------------------ */

/** Email-verification message with a unique verification ID + link. */
export async function sendVerificationEmail(args: {
    to: string;
    name: string;
    token: string;
    verificationId: string;
    /** 'team' uses the admin verify URL, 'client' the portal verify URL. */
    audience: 'team' | 'client';
}): Promise<boolean> {
    const base = appOrigin();
    const url =
        args.audience === 'team'
            ? `${base}/verify-email/${args.token}`
            : `${base}/portal/verify/${args.token}`;
    const inner = `
      <p>Hi ${args.name},</p>
      <p>Welcome to ${BRAND}. Please confirm your email address to activate your account.</p>
      <p>Your verification ID is <strong style="letter-spacing:1px;">${args.verificationId}</strong>.</p>
      ${emailButton('Verify my email', url)}
      <p style="font-size:13px;color:#888;">This link expires in 24 hours. If you did not request this, you can ignore this email.</p>`;
    return sendMail({
        to: args.to,
        subject: `Verify your ${BRAND} account`,
        html: emailShell('Confirm your email', inner)
    });
}

/** Invite a user/CEO to set their password (also verifies email in one step). */
export async function sendSetPasswordEmail(args: {
    to: string;
    name: string;
    token: string;
    verificationId: string;
    audience: 'team' | 'client';
    roleLabel?: string;
}): Promise<boolean> {
    const base = appOrigin();
    const url =
        args.audience === 'team'
            ? `${base}/set-password/${args.token}`
            : `${base}/portal/set-password/${args.token}`;
    const roleLine = args.roleLabel ? `<p>You have been added as <strong>${args.roleLabel}</strong>.</p>` : '';
    const inner = `
      <p>Hi ${args.name},</p>
      <p>An account has been created for you on the ${BRAND} platform.</p>
      ${roleLine}
      <p>Your account reference is <strong style="letter-spacing:1px;">${args.verificationId}</strong>. Click below to verify your email and set your password.</p>
      ${emailButton('Verify & set password', url)}
      <p style="font-size:13px;color:#888;">This secure link expires in 24 hours.</p>`;
    return sendMail({
        to: args.to,
        subject: `Set up your ${BRAND} account`,
        html: emailShell('Set your password', inner)
    });
}

/** Magic-link login email for client portal. */
export async function sendClientLoginLink(args: { to: string; name: string; token: string }): Promise<boolean> {
    const url = `${appOrigin()}/portal/login/${args.token}`;
    const inner = `
      <p>Hi ${args.name},</p>
      <p>Use the secure link below to sign in to your ${BRAND} client portal.</p>
      ${emailButton('Sign in to portal', url)}
      <p style="font-size:13px;color:#888;">This link expires in 30 minutes and can be used once.</p>`;
    return sendMail({to: args.to, subject: `Your ${BRAND} portal sign-in link`, html: emailShell('Sign in', inner)});
}

/** Notify a client-staff member they were added to a project conversation. */
export async function sendStaffInviteEmail(args: {
    to: string;
    name: string;
    token: string;
    invitedBy: string;
    conversationSubject: string;
}): Promise<boolean> {
    const url = `${appOrigin()}/portal/set-password/${args.token}`;
    const inner = `
      <p>Hi ${args.name},</p>
      <p><strong>${args.invitedBy}</strong> added you to the conversation
        “${args.conversationSubject}” on the ${BRAND} client portal.</p>
      <p>Verify your email and set a password to join the discussion.</p>
      ${emailButton('Join the conversation', url)}
      <p style="font-size:13px;color:#888;">This secure link expires in 24 hours.</p>`;
    return sendMail({
        to: args.to,
        subject: `You've been added to a ${BRAND} conversation`,
        html: emailShell('Join the conversation', inner)
    });
}
