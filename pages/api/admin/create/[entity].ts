/**
 * Generic admin "create" endpoint.
 *
 * POST /api/admin/create/:entity
 *   Authorization: Bearer <admin-jwt>
 *   body: { ...fields per lib/admin/entitySchema }
 *
 * Validates the body against the shared entity schema, coerces types, then
 * persists via the appropriate Admin/models repository (SQLite, single source
 * of truth). Returns 201 { item } on success.
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { verifyAdminToken } from '@/lib/admin/auth';
import { getEntity, type FieldDef } from '@/lib/admin/entitySchema';
import {
  Tickets,
  Invoices,
  CaseStudies,
  BlogPosts,
  Partners,
  ClientReviews,
  Faqs,
  Ads,
  Announcements,
  PageSeos,
  Clients,
  nextInvoiceNumber,
  logActivity,
} from '@/Admin/models';
import { Products } from '@/Admin/models/store';

type Body = Record<string, unknown>;

/** Coerce a single field's raw value into the right JS type for SQLite. */
function coerce(field: FieldDef, raw: unknown): unknown {
  if (raw === undefined || raw === null || raw === '') {
    // keep undefined so repo defaults / column defaults apply
    return undefined;
  }
  switch (field.type) {
    case 'number': {
      const n = Number(raw);
      return Number.isFinite(n) ? n : undefined;
    }
    case 'checkbox':
      return raw === true || raw === 'true' || raw === 1 || raw === '1' ? 1 : 0;
    case 'tags': {
      if (Array.isArray(raw)) return raw.map(String);
      return String(raw)
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);
    }
    case 'json': {
      if (typeof raw === 'object') return raw;
      try {
        return JSON.parse(String(raw));
      } catch {
        return undefined;
      }
    }
    default:
      return typeof raw === 'string' ? raw.trim() : raw;
  }
}

/** Build a clean, validated payload from the request body. */
function buildPayload(fields: FieldDef[], body: Body): { data: Body; errors: string[] } {
  const data: Body = {};
  const errors: string[] = [];
  for (const f of fields) {
    const val = coerce(f, body[f.name]);
    if (f.required && (val === undefined || val === '')) {
      errors.push(`${f.label} is required`);
      continue;
    }
    if (val !== undefined) data[f.name] = val;
  }
  return { data, errors };
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // ── Auth ──────────────────────────────────────────────────────────────────
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  const user = verifyAdminToken(token);
  if (!user) return res.status(401).json({ error: 'Invalid token' });

  // ── Resolve entity ──────────────────────────────────────────────────────────
  const entityKey = String(req.query.entity || '');
  const entity = getEntity(entityKey);
  if (!entity) return res.status(404).json({ error: `Unknown entity: ${entityKey}` });

  const body = (req.body ?? {}) as Body;
  const { data, errors } = buildPayload(entity.fields, body);
  if (errors.length) return res.status(400).json({ error: errors.join('; '), fields: errors });

  try {
    let item: unknown;

    switch (entityKey) {
      case 'product': {
        item = Products.create({
          name: data.name as string,
          sku: data.sku as string | undefined,
          price: (data.price as number) ?? 0,
          compare_price: data.compare_price as number | undefined,
          stock: data.stock as number | undefined,
          description: data.description as string | undefined,
          thumbnail: data.thumbnail as string | undefined,
          tags: data.tags as string[] | undefined,
          status: data.status as string | undefined,
          featured: data.featured === 1,
        });
        break;
      }

      case 'ticket':
        item = Tickets.create(data);
        break;

      case 'invoice': {
        const amount = (data.amount as number) ?? 0;
        const tax = (data.tax as number) ?? 0;
        item = Invoices.create({
          ...data,
          number: nextInvoiceNumber(),
          total: amount + tax,
          items: JSON.stringify(data.items ?? []),
        });
        break;
      }

      case 'client': {
        // Clients.create is async and hashes optional passwords.
        item = await Clients.create({
          name: data.name as string,
          email: data.email as string,
          company: data.company as string | undefined,
          phone: data.phone as string | undefined,
          avatar: data.avatar as string | undefined,
        });
        break;
      }

      case 'casestudy':
        item = CaseStudies.create({
          ...data,
          slug: (data.slug as string) || slugify(data.title as string),
        });
        break;

      case 'blogpost':
        item = BlogPosts.create({
          ...data,
          slug: (data.slug as string) || slugify(data.title as string),
          tags: JSON.stringify(data.tags ?? []),
          published_at: data.status === 'published' ? new Date().toISOString() : null,
        });
        break;

      case 'partner':
        item = Partners.create(data);
        break;

      case 'review':
        item = ClientReviews.create(data);
        break;

      case 'faq':
        item = Faqs.create(data);
        break;

      case 'ad':
        item = Ads.create(data);
        break;

      case 'announcement':
        item = Announcements.create(data);
        break;

      case 'seo':
        item = PageSeos.create(data);
        break;

      default:
        return res.status(404).json({ error: `Unhandled entity: ${entityKey}` });
    }

    logActivity({
      user_id: Number(user.id) || null,
      user_name: user.name,
      action: 'create',
      entity: entityKey,
      entity_id: (item as { id?: number })?.id,
      detail: `${entity.label} created via admin`,
    });

    return res.status(201).json({ item, message: `${entity.label} created` });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Internal server error';
    // Friendly unique-constraint message
    if (/UNIQUE constraint failed/i.test(msg)) {
      return res.status(409).json({ error: 'A record with that unique value already exists.' });
    }
    console.error(`[admin/create/${entityKey}]`, err);
    return res.status(500).json({ error: msg });
  }
}
