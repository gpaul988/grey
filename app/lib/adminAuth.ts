import crypto from 'node:crypto';

const SECRET = process.env.ADMIN_SESSION_SECRET || 'dev-admin-secret-change-me';

function base64(input: string) {
  return Buffer.from(input, 'utf8').toString('base64');
}

function unbase64(input: string) {
  return Buffer.from(input, 'base64').toString('utf8');
}

export function signAdminSession(payload: Record<string, any>) {
  const json = JSON.stringify(payload);
  const p = base64(json);
  const h = crypto.createHmac('sha256', SECRET).update(p).digest('hex');
  return `${p}.${h}`;
}

export function verifyAdminSession(signed: string) {
  if (!signed || typeof signed !== 'string') return null;
  const parts = signed.split('.');
  if (parts.length !== 2) return null;
  const [p, h] = parts;
  const expected = crypto.createHmac('sha256', SECRET).update(p).digest('hex');
  if (!crypto.timingSafeEqual(Buffer.from(h, 'hex'), Buffer.from(expected, 'hex'))) return null;
  try {
    const json = unbase64(p);
    return JSON.parse(json);
  } catch (e) {
    return null;
  }
}

