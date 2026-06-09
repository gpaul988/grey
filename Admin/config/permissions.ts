/**
 * Role-based access control with per-user custom overrides.
 *
 * Every protected feature is a "permission key". A user's effective
 * permissions = role defaults merged with their personal overrides
 * (stored as JSON in users.permissions). Admins always get everything.
 */

export type Role = 'superadmin' | 'admin' | 'manager' | 'staff';

export interface PermissionDef {
    key: string;
    label: string;
    group: string;
}

/** The full catalogue of toggleable features (drives the UI checkboxes). */
export const PERMISSIONS: PermissionDef[] = [
    { key: 'dashboard.view', label: 'View dashboard', group: 'General' },

    { key: 'submissions.view', label: 'View submissions', group: 'Inbox' },
    { key: 'submissions.manage', label: 'Manage submissions', group: 'Inbox' },

    { key: 'leads.view', label: 'View leads', group: 'Sales' },
    { key: 'leads.manage', label: 'Manage leads', group: 'Sales' },

    { key: 'clients.view', label: 'View clients', group: 'Clients' },
    { key: 'clients.manage', label: 'Manage clients & portal access', group: 'Clients' },

    { key: 'projects.view', label: 'View projects', group: 'Projects' },
    { key: 'projects.manage', label: 'Manage projects', group: 'Projects' },
    { key: 'briefs.view', label: 'View project briefs', group: 'Projects' },
    { key: 'briefs.manage', label: 'Manage project briefs', group: 'Projects' },

    { key: 'tickets.view', label: 'View tickets', group: 'Support' },
    { key: 'tickets.manage', label: 'Manage tickets', group: 'Support' },

    { key: 'invoices.view', label: 'View invoices', group: 'Finance' },
    { key: 'invoices.manage', label: 'Create & manage invoices', group: 'Finance' },

    { key: 'messages.view', label: 'View client messages', group: 'Communication' },
    { key: 'messages.send', label: 'Reply to clients', group: 'Communication' },

    { key: 'blog.view', label: 'View blog', group: 'Content' },
    { key: 'blog.manage', label: 'Manage blog posts', group: 'Content' },
    { key: 'casestudies.view', label: 'View case studies', group: 'Content' },
    { key: 'casestudies.manage', label: 'Manage case studies', group: 'Content' },

    { key: 'store.view', label: 'View store (products, orders, customers)', group: 'Store' },
    { key: 'store.manage', label: 'Manage store products & orders', group: 'Store' },

    { key: 'team.view', label: 'View team', group: 'Administration' },
    { key: 'team.manage', label: 'Manage team & permissions', group: 'Administration' },
    { key: 'activity.view', label: 'View activity log', group: 'Administration' },
    { key: 'settings.manage', label: 'Manage site settings', group: 'Administration' },
];

export const ALL_KEYS = PERMISSIONS.map((p) => p.key);

/** Default permission set per role. */
const ROLE_DEFAULTS: Record<Role, string[]> = {
    // Super admin (CEO) gets everything — top of the hierarchy.
    superadmin: ALL_KEYS,
    // Admin gets everything (handled by short-circuit below, but list anyway).
    admin: ALL_KEYS,
    // Manager: everything except team/permission management & settings.
    manager: ALL_KEYS.filter(
        (k) => !['team.manage', 'settings.manage'].includes(k)
    ),
    // Staff: read most things, work on assigned projects/tickets, talk to clients.
    staff: [
        'dashboard.view',
        'submissions.view',
        'leads.view',
        'clients.view',
        'projects.view', 'projects.manage',
        'briefs.view',
        'tickets.view', 'tickets.manage',
        'invoices.view',
        'messages.view', 'messages.send',
        'blog.view',
        'casestudies.view',
        'store.view',
    ],
};

export function roleDefaults(role: Role): string[] {
    return ROLE_DEFAULTS[role] ?? ROLE_DEFAULTS.staff;
}

/** Parse a stored JSON override map safely. */
export function parseOverrides(raw: string | null | undefined): Record<string, boolean> {
    if (!raw) return {};
    try {
        const v = JSON.parse(raw);
        return v && typeof v === 'object' ? v : {};
    } catch {
        return {};
    }
}

/** Resolve the effective permission set for a user. */
export function effectivePermissions(role: Role, overridesRaw: string | null | undefined): Set<string> {
    if (role === 'admin' || role === 'superadmin') return new Set(ALL_KEYS);
    const base = new Set(roleDefaults(role));
    const overrides = parseOverrides(overridesRaw);
    for (const [key, allowed] of Object.entries(overrides)) {
        if (allowed) base.add(key);
        else base.delete(key);
    }
    return base;
}

export function userCan(
    user: { role: Role; permissions?: string | null } | null | undefined,
    key: string
): boolean {
    if (!user) return false;
    if (user.role === 'admin' || user.role === 'superadmin') return true;
    return effectivePermissions(user.role, user.permissions).has(key);
}
