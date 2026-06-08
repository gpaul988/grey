export const ADMIN_BASE_PATH = '/admin';

export const adminPath = (path = '/') => {
  if (!path.startsWith('/')) {
    return `${ADMIN_BASE_PATH}/${path}`;
  }

  return `${ADMIN_BASE_PATH}${path}`;
};

