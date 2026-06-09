import express, { type NextFunction, type Request, type Response } from 'express';
import path from 'path';
import ejs from 'ejs';

import {
    Clients, ClientStaff, Conversations, Messages, Participants,
    Projects, Invoices, ProjectBriefs, Verification, logActivity,
} from '../models';
import { MAX_STAFF_PER_CLIENT } from '../models/clientStaff';
import { isEmail, str, toInt } from '../utils/helpers';
import { avatarUpload, publicUrl } from '../config/uploads';
import {
    sendClientLoginLink, sendStaffInviteEmail, sendVerificationEmail,
    smtpConfigured,
} from '../utils/mailer';

const route = express.Router();

/* Locals every portal view needs. */
route.use((req, res, next) => {
    res.locals.portal = req.session.portal || null;
    res.locals.layout = false; // portal views are self-contained HTML
    next();
});

/** Guard: requires an authenticated portal session. */
const ensurePortal = (req: Request, res: Response, next: NextFunction) => {
    if (req.session.portal) return next();
    return res.redirect('/portal/login');
};

const PORTAL_VIEWS = path.join(process.cwd(), 'Admin', 'views', 'portal');
const view = (res: Response, name: string, locals: Record<string, unknown> = {}) => {
    // Render portal views directly with EJS to bypass express-ejs-layouts,
    // which strips the `include` helper inside nested closures (e.g. forEach).
    ejs.renderFile(path.join(PORTAL_VIEWS, `${name}.ejs`), { ...locals }, { root: PORTAL_VIEWS })
        .then((html: string) => res.send(html))
        .catch((err: unknown) => {
            console.error('[portal view]', name, err);
            res.status(500).send('Something went wrong rendering this page.');
        });
};

/* ============================ Auth ============================ */

route.get('/', (req, res) => res.redirect(req.session.portal ? '/portal/dashboard' : '/portal/login'));

route.get('/login', (req, res) => {
    if (req.session.portal) return res.redirect('/portal/dashboard');
    view(res, 'login', {
        title: 'Client Portal',
        info: typeof req.query.sent !== 'undefined' ? 'Check your email for a secure sign-in link.' : '',
        error: typeof req.query.err !== 'undefined' ? String(req.query.err) : '',
        verified: typeof req.query.verified !== 'undefined',
    });
});

/** Request a magic-link OR password login. */
route.post('/login', async (req, res) => {
    const email = str(req.body.email).toLowerCase();
    const password = str(req.body.password);
    if (!isEmail(email)) return res.redirect('/portal/login?err=' + encodeURIComponent('Enter a valid email.'));

    // Password path (client or client-staff with a password set).
    if (password) {
        const client = await Clients.verifyPassword(email, password);
        if (client) {
            Clients.touchLogin(client.id);
            req.session.portal = { kind: 'client', id: client.id, clientId: client.id, name: client.name, email: client.email, avatar: client.avatar };
            return req.session.save(() => res.redirect('/portal/dashboard'));
        }
        const staff = await ClientStaff.verifyPassword(email, password);
        if (staff) {
            ClientStaff.touchLogin(staff.id);
            req.session.portal = { kind: 'client_staff', id: staff.id, clientId: staff.client_id, name: staff.name, email: staff.email, avatar: staff.avatar };
            return req.session.save(() => res.redirect('/portal/dashboard'));
        }
        return res.redirect('/portal/login?err=' + encodeURIComponent('Invalid email or password.'));
    }

    // Magic-link path (client accounts only).
    const client = Clients.findByEmail(email);
    if (client && client.status === 'active') {
        const token = Clients.createLoginToken(client.id, 'login');
        await sendClientLoginLink({ to: client.email, name: client.name, token });
        if (!smtpConfigured() && process.env.NODE_ENV !== 'production') {
            return res.redirect('/portal/login?err=' + encodeURIComponent(`Dev link: /portal/login/${token}`));
        }
    }
    // Always report success to avoid leaking which emails exist.
    return res.redirect('/portal/login?sent=1');
});

/** Consume a magic-link token. */
route.get('/login/:token', (req, res) => {
    const client = Clients.verifyToken(str(req.params.token));
    if (!client) return res.redirect('/portal/login?err=' + encodeURIComponent('Link invalid or expired.'));
    req.session.portal = { kind: 'client', id: client.id, clientId: client.id, name: client.name, email: client.email, avatar: client.avatar };
    logActivity({ action: 'portal-login', entity: 'client', entity_id: client.id, detail: client.email });
    return req.session.save(() => res.redirect('/portal/dashboard'));
});

route.get('/logout', (req, res) => {
    if (req.session.portal) delete req.session.portal;
    req.session.save(() => res.redirect('/portal/login'));
});

/* -------- Email verification + set password (clients & their staff) -------- */
route.get('/verify/:token', (req, res) => {
    const rec = Verification.peek(str(req.params.token));
    if (!rec || rec.subject_type !== 'client') {
        return view(res, 'message', { title: 'Invalid link', success: false, heading: 'Link invalid or expired', message: 'Please request a new verification link.' });
    }
    if (rec.purpose === 'set_password') return res.redirect(`/portal/set-password/${rec.token}`);
    Verification.consume(rec.token);
    Clients.markVerified(rec.subject_id);
    return view(res, 'message', { title: 'Verified', success: true, heading: 'Email verified', message: 'Your email is verified. You can now sign in to your portal.', linkHref: '/portal/login', linkLabel: 'Go to sign in' });
});

const renderSetPw = (res: Response, token: string, opts: { error?: string; name?: string } = {}) =>
    view(res, 'set-password', { title: 'Set your password', token, name: opts.name || '', error: opts.error || '' });

route.get('/set-password/:token', (req, res) => {
    const rec = Verification.peek(str(req.params.token));
    if (!rec) return view(res, 'message', { title: 'Invalid link', success: false, heading: 'Link invalid or expired', message: 'Please request a new invite.' });
    let name = '';
    if (rec.subject_type === 'client') name = Clients.find(rec.subject_id)?.name || '';
    else if (rec.subject_type === 'client_staff') name = ClientStaff.find(rec.subject_id)?.name || '';
    else return view(res, 'message', { title: 'Invalid link', success: false, heading: 'Link invalid', message: 'This link is not valid for the portal.' });
    return renderSetPw(res, rec.token, { name });
});

route.post('/set-password/:token', async (req, res) => {
    const token = str(req.params.token);
    const rec = Verification.peek(token);
    if (!rec) return view(res, 'message', { title: 'Invalid link', success: false, heading: 'Link invalid or expired', message: 'Please request a new invite.' });
    const password = str(req.body.password);
    const confirm = str(req.body.confirmPassword || req.body.confirm_password);
    if (password.length < 8) return renderSetPw(res, token, { error: 'Password must be at least 8 characters.' });
    if (password !== confirm) return renderSetPw(res, token, { error: 'Passwords do not match.' });

    Verification.consume(token);
    if (rec.subject_type === 'client') await Clients.setPassword(rec.subject_id, password);
    else if (rec.subject_type === 'client_staff') await ClientStaff.setPassword(rec.subject_id, password);
    else return view(res, 'message', { title: 'Invalid link', success: false, heading: 'Link invalid', message: 'Unsupported link.' });

    return view(res, 'message', { title: 'Password set', success: true, heading: 'All set!', message: 'Your password is set and your email verified. You can now sign in.', linkHref: '/portal/login', linkLabel: 'Sign in' });
});

/* ============================ Dashboard ============================ */
route.get('/dashboard', ensurePortal, (req, res) => {
    const p = req.session.portal!;
    const clientId = p.clientId;
    const client = Clients.find(clientId);
    const projects = Projects.where('client_id', clientId);
    const invoices = Invoices.where('client_id', clientId);
    const paid = Clients.hasPaid(clientId);
    const conversations = Conversations.where('client_id', clientId);
    view(res, 'dashboard', {
        title: 'My Portal',
        client,
        me: p,
        projects,
        invoices,
        paid,
        staffCount: ClientStaff.count(clientId),
        conversations,
        briefs: ProjectBriefs.where('client_id', clientId),
    });
});

/* ============================ Profile picture ============================ */
route.post('/profile/avatar', ensurePortal, (req, res) => {
    const p = req.session.portal!;
    avatarUpload.single('avatar')(req, res, async (err: unknown) => {
        if (err) {
            const msg = err instanceof Error ? err.message : 'Upload failed';
            return res.redirect('/portal/dashboard?err=' + encodeURIComponent(msg));
        }
        const file = (req as Request & { file?: { filename: string } }).file;
        if (!file) return res.redirect('/portal/dashboard?err=No+file+selected');
        const url = publicUrl('avatars', file.filename);
        if (p.kind === 'client') await Clients.update(p.id, { avatar: url });
        else ClientStaff.update(p.id, { avatar: url });
        req.session.portal = { ...p, avatar: url };
        req.session.save(() => res.redirect('/portal/dashboard?saved=1'));
    });
});

/* ============================ Staff sub-accounts ============================ */
/* Only the CLIENT account (not their staff) can manage staff, and only after
   payment is verified. Hard cap of MAX_STAFF_PER_CLIENT. */

const ensureClientOwner = (req: Request, res: Response, next: NextFunction) => {
    if (req.session.portal?.kind === 'client') return next();
    return res.status(403).send('Only the primary client account can manage staff.');
};

route.get('/staff', ensurePortal, ensureClientOwner, (req, res) => {
    const clientId = req.session.portal!.clientId;
    view(res, 'staff', {
        title: 'My Team',
        me: req.session.portal!,
        staff: ClientStaff.forClient(clientId),
        paid: Clients.hasPaid(clientId),
        max: MAX_STAFF_PER_CLIENT,
        info: typeof req.query.added !== 'undefined' ? 'Staff member invited.' : '',
        error: typeof req.query.err !== 'undefined' ? String(req.query.err) : '',
    });
});

route.post('/staff', ensurePortal, ensureClientOwner, async (req, res) => {
    const clientId = req.session.portal!.clientId;
    const client = Clients.find(clientId);

    if (!Clients.hasPaid(clientId)) {
        return res.redirect('/portal/staff?err=' + encodeURIComponent('You can add team members after your first payment is confirmed.'));
    }
    if (ClientStaff.count(clientId) >= MAX_STAFF_PER_CLIENT) {
        return res.redirect('/portal/staff?err=' + encodeURIComponent(`You can add up to ${MAX_STAFF_PER_CLIENT} team members.`));
    }
    const name = str(req.body.name);
    const email = str(req.body.email).toLowerCase();
    const role_title = str(req.body.role_title);
    if (!name || !isEmail(email)) return res.redirect('/portal/staff?err=' + encodeURIComponent('Name and a valid email are required.'));
    if (ClientStaff.findByEmail(clientId, email)) return res.redirect('/portal/staff?err=' + encodeURIComponent('That email is already on your team.'));

    const staff = ClientStaff.create({ client_id: clientId, name, email, role_title });
    const { token } = Verification.issue({ subjectType: 'client_staff', subjectId: staff.id, email, purpose: 'set_password' });
    await sendStaffInviteEmail({
        to: email, name, token,
        invitedBy: client?.name || 'Your team',
        conversationSubject: 'your projects',
    });
    logActivity({ action: 'invite', entity: 'client_staff', entity_id: staff.id, detail: `${email} by client ${clientId}` });

    const devNote = !smtpConfigured() && process.env.NODE_ENV !== 'production' ? `&err=${encodeURIComponent(`Dev invite link: /portal/set-password/${token}`)}` : '';
    return res.redirect('/portal/staff?added=1' + devNote);
});

route.post('/staff/:id/delete', ensurePortal, ensureClientOwner, (req, res) => {
    const clientId = req.session.portal!.clientId;
    const staff = ClientStaff.find(toInt(req.params.id));
    if (staff && staff.client_id === clientId) {
        ClientStaff.delete(staff.id);
        logActivity({ action: 'remove', entity: 'client_staff', entity_id: staff.id });
    }
    return res.redirect('/portal/staff');
});

/* ============================ Conversations / messaging ============================ */
route.get('/messages', ensurePortal, (req, res) => {
    const clientId = req.session.portal!.clientId;
    const conversations = Conversations.where('client_id', clientId);
    const wanted = toInt(req.query.c);
    const active = (wanted && conversations.find((c) => c.id === wanted)) || conversations[0] || null;
    view(res, 'messages', {
        title: 'Messages',
        me: req.session.portal!,
        conversations,
        active,
        messages: active ? Messages.where('conversation_id', active.id).reverse() : [],
        participants: active ? Participants.forConversation(active.id) : [],
        staff: ClientStaff.forClient(clientId),
        paid: Clients.hasPaid(clientId),
        isOwner: req.session.portal!.kind === 'client',
        info: typeof req.query.added !== 'undefined' ? 'Team member added to the conversation.' : '',
        error: typeof req.query.err !== 'undefined' ? String(req.query.err) : '',
    });
});

route.post('/messages/:id/reply', ensurePortal, (req, res) => {
    const conv = Conversations.find(toInt(req.params.id));
    const p = req.session.portal!;
    if (!conv || conv.client_id !== p.clientId) return res.status(404).send('Not found');
    const body = str(req.body.body);
    if (body) {
        Messages.create({ conversation_id: conv.id, sender: 'client', sender_name: p.name, body });
        Conversations.update(conv.id, { last_message: body, unread: (conv.unread || 0) + 1 });
    }
    return res.redirect(`/portal/messages?c=${conv.id}`);
});

/**
 * Add one of the client's staff to a conversation. Gated on:
 *  - actor is the primary client account
 *  - client is payment-verified
 *  - no more than 3 staff total in the conversation
 */
route.post('/messages/:id/participants', ensurePortal, ensureClientOwner, async (req, res) => {
    const clientId = req.session.portal!.clientId;
    const conv = Conversations.find(toInt(req.params.id));
    if (!conv || conv.client_id !== clientId) return res.status(404).send('Not found');

    if (!Clients.hasPaid(clientId)) {
        return res.redirect(`/portal/messages?c=${conv.id}&err=` + encodeURIComponent('Add team members after your first payment is confirmed.'));
    }
    if (Participants.countStaff(conv.id) >= 3) {
        return res.redirect(`/portal/messages?c=${conv.id}&err=` + encodeURIComponent('You can add up to 3 team members to a conversation.'));
    }
    const staff = ClientStaff.find(toInt(req.body.staff_id));
    if (!staff || staff.client_id !== clientId) {
        return res.redirect(`/portal/messages?c=${conv.id}&err=` + encodeURIComponent('Select a valid team member.'));
    }
    if (Participants.exists(conv.id, 'client_staff', staff.id)) {
        return res.redirect(`/portal/messages?c=${conv.id}&err=` + encodeURIComponent('That member is already in this conversation.'));
    }
    Participants.add({ conversation_id: conv.id, participant_type: 'client_staff', participant_id: staff.id, name: staff.name, added_by: req.session.portal!.name });
    logActivity({ action: 'add-participant', entity: 'conversation', entity_id: conv.id, detail: `${staff.email}` });
    return res.redirect(`/portal/messages?c=${conv.id}&added=1`);
});

route.post('/messages/:id/participants/:staffId/remove', ensurePortal, ensureClientOwner, (req, res) => {
    const clientId = req.session.portal!.clientId;
    const conv = Conversations.find(toInt(req.params.id));
    if (!conv || conv.client_id !== clientId) return res.status(404).send('Not found');
    Participants.remove(conv.id, 'client_staff', toInt(req.params.staffId));
    return res.redirect(`/portal/messages?c=${conv.id}`);
});

/* ============================ Project brief ============================ */
route.post('/brief', ensurePortal, (req, res) => {
    const clientId = req.session.portal!.clientId;
    ProjectBriefs.create({
        client_id: clientId,
        project_id: req.body.project_id ? toInt(req.body.project_id) : null,
        service: str(req.body.service),
        title: str(req.body.title) || 'Project brief',
        goals: str(req.body.goals),
        target_audience: str(req.body.target_audience),
        design_style: str(req.body.design_style),
        color_prefs: str(req.body.color_prefs),
        references_links: str(req.body.references_links),
        budget_range: str(req.body.budget_range),
        timeline: str(req.body.timeline),
        details: str(req.body.details),
        status: 'submitted',
    });
    logActivity({ action: 'create', entity: 'project_brief', detail: `client ${clientId}` });
    return res.redirect('/portal/dashboard?brief=1');
});

export default route;

/** Re-export the verification email sender so other modules can resend. */
export { sendVerificationEmail };
