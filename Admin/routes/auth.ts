import express, { type Request, type Response } from 'express';

import { adminPath, LOGIN_PATH, REGISTER_PATH, LOGOUT_PATH } from '../config/adminPaths';
import { redirectIfAuth } from '../middleware/authMiddleware';
import { Users, Verification, logActivity } from '../models';
import { isEmail, str } from '../utils/helpers';
import { sendVerificationEmail, sendSetPasswordEmail, smtpConfigured } from '../utils/mailer';

interface RenderOptions {
    formError?: string;
    formInfo?: string;
    formValues?: { name?: string; email?: string };
}

const route = express.Router();

const renderLogin = (res: Response, options: RenderOptions = {}) => {
    res.render('auth-login', {
        title: 'Login',
        layout: 'partials/base-layout',
        formError: options.formError || '',
        formInfo: options.formInfo || '',
        formValues: options.formValues || {},
    });
};

const renderRegister = (res: Response, options: RenderOptions = {}) => {
    res.render('auth-register', {
        title: 'Register',
        layout: 'partials/base-layout',
        formError: options.formError || '',
        formInfo: options.formInfo || '',
        formValues: options.formValues || {},
    });
};

/** Render the email-verification result page. */
const renderVerify = (
    res: Response,
    opts: { ok: boolean; title: string; message: string; loginLink?: boolean }
) => {
    res.status(opts.ok ? 200 : 400).render('auth-confirm-mail', {
        title: opts.title,
        layout: 'partials/base-layout',
        success: opts.ok,
        heading: opts.title,
        message: opts.message,
        loginPath: LOGIN_PATH,
    });
};

route.get('/login', redirectIfAuth, (req: Request, res: Response) =>
    renderLogin(res, { formInfo: typeof req.query.verified !== 'undefined' ? 'Email verified — you can now log in.' : '' })
);

route.post('/login', redirectIfAuth, async (req: Request, res: Response) => {
    const email = str(req.body.email).toLowerCase();
    const password = str(req.body.password);

    if (!email || !password) {
        return renderLogin(res, { formError: 'Please enter both email and password.', formValues: { email } });
    }
    if (!isEmail(email)) {
        return renderLogin(res, { formError: 'Please enter a valid email address.', formValues: { email } });
    }

    // Check the PASSWORD first (ignoring verification/status). This way a wrong
    // password never produces the confusing "not verified" message — common
    // when browser autofill submits a different saved account.
    const matched = await Users.checkPassword(email, password);
    if (!matched) {
        // Wrong password or unknown email — single message to avoid leaking
        // which accounts exist.
        return renderLogin(res, { formError: 'Invalid email or password.', formValues: { email } });
    }

    // Password is correct. Email verification is NOT required to log in — an
    // unverified account with a valid password is allowed through. We only
    // block accounts that have been explicitly disabled by an admin.
    if (String(matched.status || '').toLowerCase() === 'disabled') {
        return renderLogin(res, {
            formError: 'This account is disabled. Contact your administrator.',
            formValues: { email },
        });
    }

    const user = matched;

    req.session.user = { id: user.id, name: user.name, email: user.email, role: user.role, avatar: user.avatar };
    logActivity({ user_id: user.id, user_name: user.name, action: 'login', entity: 'auth' });
    return req.session.save(() => res.redirect(adminPath('/dashboard')));
});

route.get('/register', redirectIfAuth, (_req: Request, res: Response) => renderRegister(res));

route.post('/register', redirectIfAuth, async (req: Request, res: Response) => {
    const name = str(req.body.name);
    const email = str(req.body.email).toLowerCase();
    const password = str(req.body.password);
    const confirmPassword = str(req.body.confirmPassword || req.body.confirm_password);

    if (!name || !email || !password || !confirmPassword) {
        return renderRegister(res, { formError: 'All fields are required.', formValues: { name, email } });
    }
    if (!isEmail(email)) {
        return renderRegister(res, { formError: 'Please enter a valid email address.', formValues: { name, email } });
    }
    if (password.length < 8) {
        return renderRegister(res, { formError: 'Password must be at least 8 characters.', formValues: { name, email } });
    }
    if (password !== confirmPassword) {
        return renderRegister(res, { formError: 'Passwords do not match.', formValues: { name, email } });
    }
    if (Users.findByEmail(email)) {
        return renderRegister(res, { formError: 'An account with this email already exists.', formValues: { name, email } });
    }

    // First registered user becomes admin; subsequent self-registrations are staff.
    // New accounts are created UNVERIFIED — a verification email must be confirmed
    // before the account can log in.
    const isFirst = Users.count() === 0;
    const role = isFirst ? 'admin' : 'staff';
    const user = await Users.create({ name, email, password, role, email_verified: false, status: 'pending' });

    const { token, code } = Verification.issue({ subjectType: 'user', subjectId: user.id, email, purpose: 'verify' });
    await sendVerificationEmail({ to: email, name, token, verificationId: code, audience: 'team' });
    logActivity({ user_id: user.id, user_name: user.name, action: 'register', entity: 'auth', detail: `verification=${code}` });

    // When SMTP isn't configured we can't email a link, so surface it directly
    // on the page in non-production so the flow remains testable.
    const devLink = !smtpConfigured() && process.env.NODE_ENV !== 'production'
        ? ` Verification link (dev): /verify-email/${token}`
        : '';

    return renderLogin(res, {
        formInfo: `Account created. We've sent a verification email to ${email}. Please verify to log in.${devLink}`,
        formValues: { email },
    });
});

/* ---------------- Email verification ---------------- */
route.get('/verify-email/:token', (req: Request, res: Response) => {
    const rec = Verification.peek(str(req.params.token));
    if (!rec || rec.subject_type !== 'user') {
        return renderVerify(res, { ok: false, title: 'Link invalid or expired', message: 'This verification link is invalid or has expired. Please register again or request a new link.' });
    }
    // 'set_password' tokens go through the set-password flow instead.
    if (rec.purpose === 'set_password') {
        return res.redirect(`/set-password/${rec.token}`);
    }
    Verification.consume(rec.token);
    Users.markVerified(rec.subject_id);
    logActivity({ user_id: rec.subject_id, action: 'verify-email', entity: 'auth' });
    return renderVerify(res, { ok: true, title: 'Email verified', message: 'Your email has been verified. You can now log in to your account.', loginLink: true });
});

/* ---------------- Set / create password (invited users & CEO) ---------------- */
const renderSetPassword = (res: Response, token: string, opts: { error?: string; name?: string } = {}) => {
    res.render('auth-createpw', {
        title: 'Set your password',
        layout: 'partials/base-layout',
        token,
        name: opts.name || '',
        formError: opts.error || '',
        loginPath: LOGIN_PATH,
    });
};

route.get('/set-password/:token', (req: Request, res: Response) => {
    const rec = Verification.peek(str(req.params.token));
    if (!rec || rec.subject_type !== 'user') {
        return renderVerify(res, { ok: false, title: 'Link invalid or expired', message: 'This setup link is invalid or has expired. Please contact your administrator for a new invite.' });
    }
    const user = Users.find(rec.subject_id);
    return renderSetPassword(res, rec.token, { name: user?.name });
});

route.post('/set-password/:token', async (req: Request, res: Response) => {
    const token = str(req.params.token);
    const rec = Verification.peek(token);
    if (!rec || rec.subject_type !== 'user') {
        return renderVerify(res, { ok: false, title: 'Link invalid or expired', message: 'This setup link is invalid or has expired.' });
    }
    const password = str(req.body.password);
    const confirm = str(req.body.confirmPassword || req.body.confirm_password);
    if (password.length < 8) return renderSetPassword(res, token, { error: 'Password must be at least 8 characters.' });
    if (password !== confirm) return renderSetPassword(res, token, { error: 'Passwords do not match.' });

    Verification.consume(token);
    await Users.setPassword(rec.subject_id, password);
    const user = Users.find(rec.subject_id);
    logActivity({ user_id: rec.subject_id, user_name: user?.name, action: 'set-password', entity: 'auth' });
    return renderVerify(res, { ok: true, title: 'Password set', message: 'Your password has been set and your email verified. You can now log in.', loginLink: true });
});

route.get('/logout', (req: Request, res: Response) => {
    const u = req.session.user;
    if (u) logActivity({ user_id: u.id, user_name: u.name, action: 'logout', entity: 'auth' });
    if (!req.session) return res.redirect(LOGIN_PATH);
    req.session.destroy(() => res.redirect(LOGIN_PATH));
});

route.get('/auth-login', (_req, res) => res.redirect(LOGIN_PATH));
route.get('/auth-register', (_req, res) => res.redirect(REGISTER_PATH));
route.get('/auth-logout', (_req, res) => res.redirect(LOGOUT_PATH));

export default route;
