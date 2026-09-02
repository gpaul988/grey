export const ADMIN_ROLES = ['staff', 'manager', 'admin', 'superadmin'] as const;

export type AdminRole = (typeof ADMIN_ROLES)[number];

export const roleLabel: Record<AdminRole, string> = {
  staff: 'Staff',
  manager: 'Manager',
  admin: 'Admin',
  superadmin: 'Super admin',
};

export const canAccess = (role: string | undefined, action: 'manage_products' | 'manage_orders' | 'manage_customers' | 'review_audits' | 'manage_roles' | 'view_activity') => {
  const normalized = (role || 'staff') as AdminRole;
  const perms: Record<typeof action, AdminRole[]> = {
    manage_products: ['staff', 'manager', 'admin', 'superadmin'],
    manage_orders: ['manager', 'admin', 'superadmin'],
    manage_customers: ['manager', 'admin', 'superadmin'],
    review_audits: ['admin', 'superadmin'],
    manage_roles: ['superadmin'],
    view_activity: ['manager', 'admin', 'superadmin'],
  };

  return perms[action].includes(normalized);
};
