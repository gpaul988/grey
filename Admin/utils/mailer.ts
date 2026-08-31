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
const BRAND = 'Grey InfoTech';
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

/** Best-effort logo URL for branded email templates. */
export function brandLogoUrl(): string {
   const configured = process.env.BRAND_LOGO_URL || process.env.LOGO_URL || '';
   if (configured) return configured.startsWith('http') ? configured : `${appOrigin()}${configured.startsWith('/') ? configured : `/${configured}`}`;
   return `${appOrigin()}/images/logo-sm.png`;
}

/** Wrap inner HTML in the standard Grey InfoTech email shell. */
export function emailShell(title: string, innerHtml: string): string {
   return `
  <div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#222;max-width:560px;margin:0 auto;padding:24px;border:1px solid #eee;border-radius:12px;">
    <div style="text-align:center;margin-bottom:18px;">
      <img src="${brandLogoUrl()}" alt="${BRAND} logo" style="max-height:48px;max-width:180px;display:block;margin:0 auto 12px;object-fit:contain;" />
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

export async function sendOrderReceiptEmail(args: {
    to: string;
    name: string;
    orderNumber: string;
    orderDate: string;
    items: Array<{ name: string; quantity: number; unitPrice: number; total: number }>;
    subtotal: number;
    shippingFee: number;
    discount: number;
    total: number;
    paymentMethod?: string;
    paymentRef?: string;
}): Promise<boolean> {
    const itemRows = args.items.map((item) => `
      <tr>
        <td style="padding:10px 8px;border-bottom:1px solid #eef2f7;">${item.name}</td>
        <td style="padding:10px 8px;border-bottom:1px solid #eef2f7;text-align:center;">${item.quantity}</td>
        <td style="padding:10px 8px;border-bottom:1px solid #eef2f7;text-align:right;">${new Intl.NumberFormat('en-NG', {style:'currency', currency:'NGN'}).format(item.unitPrice)}</td>
        <td style="padding:10px 8px;border-bottom:1px solid #eef2f7;text-align:right;">${new Intl.NumberFormat('en-NG', {style:'currency', currency:'NGN'}).format(item.total)}</td>
      </tr>`).join('');
    const paymentLine = args.paymentMethod ? `<p><strong>Payment method:</strong> ${args.paymentMethod}</p>` : '';
    const refLine = args.paymentRef ? `<p><strong>Reference:</strong> ${args.paymentRef}</p>` : '';
    const inner = `
      <p>Hi ${args.name},</p>
      <p>Thank you for your purchase. Your payment was successfully received.</p>
      <p><strong>Order:</strong> ${args.orderNumber} &middot; <strong>Date:</strong> ${args.orderDate}</p>
      ${paymentLine}
      ${refLine}
      <table style="width:100%;border-collapse:collapse;margin:18px 0;">
        <thead>
          <tr style="background:#f5f7fb;color:#334155;font-size:13px;">
            <th style="padding:10px 8px;text-align:left;">Item</th>
            <th style="padding:10px 8px;text-align:center;">Qty</th>
            <th style="padding:10px 8px;text-align:right;">Unit Price</th>
            <th style="padding:10px 8px;text-align:right;">Total</th>
          </tr>
        </thead>
        <tbody>${itemRows}</tbody>
      </table>
      <div style="margin-left:auto;max-width:260px;">
        <p style="display:flex;justify-content:space-between;gap:12px;margin:6px 0;"><span>Subtotal</span><strong>${new Intl.NumberFormat('en-NG', {style:'currency', currency:'NGN'}).format(args.subtotal)}</strong></p>
        <p style="display:flex;justify-content:space-between;gap:12px;margin:6px 0;"><span>Shipping</span><strong>${new Intl.NumberFormat('en-NG', {style:'currency', currency:'NGN'}).format(args.shippingFee)}</strong></p>
        <p style="display:flex;justify-content:space-between;gap:12px;margin:6px 0;"><span>Discount</span><strong>-${new Intl.NumberFormat('en-NG', {style:'currency', currency:'NGN'}).format(args.discount)}</strong></p>
        <p style="display:flex;justify-content:space-between;gap:12px;margin:10px 0 0;border-top:1px solid #e2e8f0;padding-top:8px;"><span>Total</span><strong>${new Intl.NumberFormat('en-NG', {style:'currency', currency:'NGN'}).format(args.total)}</strong></p>
      </div>
      <p style="font-size:13px;color:#64748b;">We will send another email once your order is shipped or delivered.</p>`;
    return sendMail({
        to: args.to,
        subject: `Receipt for order ${args.orderNumber}`,
        html: emailShell('Purchase receipt', inner),
    });
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
