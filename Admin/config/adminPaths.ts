export const ADMIN_BASE_PATH = '/admin';

// Public-facing auth URLs live at the site root (e.g. /login) instead of
// under /admin, so the footer "login" link points to a clean /login URL.
export const LOGIN_PATH = '/login';
export const REGISTER_PATH = '/register';
export const LOGOUT_PATH = '/logout';

export const adminPath = (path = '/') => {
  if (!path.startsWith('/')) {
    return `${ADMIN_BASE_PATH}/${path}`;
  }

  return `${ADMIN_BASE_PATH}${path}`;
};

