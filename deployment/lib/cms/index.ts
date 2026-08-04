/**
 * CMS Library - Production-grade Content Management System
 * Supports: PostgreSQL (Drizzle ORM) with fallback to SQLite
 */

import { db } from '@/lib/db';
import { cmsPages } from '@/lib/db/schema';
import { eq, and, or, like, desc, sql } from 'drizzle-orm';

export interface CMSPage {
  id: number;
  slug: string;
  title: string;
  description?: string;
  content?: string;
  type: 'blog' | 'doc' | 'service' | 'page';
  author?: string;
  tags: string[];
  published: boolean;
  publishedAt?: Date;
  featuredImage?: string;
  metadata?: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateCMSPageInput {
  slug?: string;
  title: string;
  description?: string;
  content?: string;
  type?: 'blog' | 'doc' | 'service' | 'page';
  author?: string;
  tags?: string[];
  published?: boolean;
  featuredImage?: string;
  metadata?: Record<string, unknown>;
}

export interface UpdateCMSPageInput extends Partial<CreateCMSPageInput> {
  id: number;
}

// Utility: Generate slug from title
export function slugify(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

/**
 * Normalize CMS page data (convert SQLite types back to proper types)
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function normalizeCMSPage(page: any): CMSPage {
  return {
    ...page,
    published: page.published === 1 || page.published === true,
    tags: typeof page.tags === 'string' ? JSON.parse(page.tags) : (page.tags || []),
    metadata:
      typeof page.metadata === 'string' ? JSON.parse(page.metadata) : (page.metadata || {}),
  };
}

/**
 * Validate CMS page data
 */
export function validateCMSPage(data: Partial<CMSPage>): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!data.title || String(data.title).trim().length === 0) {
    errors.push('title is required');
  }

  if (data.title && String(data.title).length > 500) {
    errors.push('title must be less than 500 characters');
  }

  if (data.slug && !/^[a-z0-9-]+$/.test(data.slug)) {
    errors.push('slug must contain only lowercase letters, numbers, and hyphens');
  }

  if (data.type && !['blog', 'doc', 'service', 'page'].includes(data.type)) {
    errors.push('type must be one of: blog, doc, service, page');
  }

  if (data.description && String(data.description).length > 1000) {
    errors.push('description must be less than 1000 characters');
  }

  const tags = Array.isArray(data.tags) ? data.tags : [];
  if (data.tags && !Array.isArray(data.tags)) {
    errors.push('tags must be an array');
  }

  if (tags && tags.some((tag) => typeof tag !== 'string')) {
    errors.push('tags must be an array of strings');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Create a new CMS page
 */
export async function createCMSPage(input: CreateCMSPageInput): Promise<CMSPage> {
  const validation = validateCMSPage(input);
  if (!validation.valid) {
    throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
  }

  const slug = input.slug || slugify(input.title);

  // Check if slug already exists
  const existing = await db.query.cmsPages.findFirst({
    where: eq(cmsPages.slug, slug),
  });

  if (existing) {
    throw new Error(`Slug "${slug}" already exists`);
  }

  const now = new Date();
  const isPublished = input.published === true;

  const result = await db
    .insert(cmsPages)
    .values({
      slug,
      title: input.title,
      description: input.description || null,
      content: input.content || null,
      type: input.type || 'page',
      author: input.author || null,
      tags: JSON.stringify(input.tags || []),
      published: isPublished ? 1 : 0,
      publishedAt: isPublished ? now : null,
      featuredImage: input.featuredImage || null,
      metadata: JSON.stringify(input.metadata || {}),
      createdAt: now,
      updatedAt: now,
    })
    .returning();

  if (!result || result.length === 0) {
    throw new Error('Failed to create CMS page');
  }

  return normalizeCMSPage(result[0]);
}

/**
 * Get a single CMS page by ID
 */
export async function getCMSPageById(id: number): Promise<CMSPage | null> {
  const result = await db.query.cmsPages.findFirst({
    where: eq(cmsPages.id, id),
  });
  return result ? normalizeCMSPage(result) : null;
}

/**
 * Get a CMS page by slug
 */
export async function getCMSPageBySlug(slug: string): Promise<CMSPage | null> {
  const result = await db.query.cmsPages.findFirst({
    where: eq(cmsPages.slug, slug),
  });
  return result ? normalizeCMSPage(result) : null;
}

/**
 * List CMS pages with filtering
 */
export async function listCMSPages(options?: {
  type?: 'blog' | 'doc' | 'service' | 'page';
  published?: boolean;
  search?: string;
  limit?: number;
  offset?: number;
  sortBy?: 'createdAt' | 'publishedAt' | 'title';
  sortOrder?: 'asc' | 'desc';
}): Promise<{ pages: CMSPage[]; total: number }> {
  const limit = Math.min(options?.limit || 50, 100);
  const offset = options?.offset || 0;
  const sortOrder = options?.sortOrder === 'asc' ? 'asc' : 'desc';

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const conditions: any[] = [];

  if (options?.published !== undefined) {
    conditions.push(eq(cmsPages.published, options.published === true));
  }

  if (options?.type) {
    conditions.push(eq(cmsPages.type, options.type));
  }

  if (options?.search) {
    const searchTerm = `%${options.search}%`;
    conditions.push(
      or(
        like(cmsPages.title, searchTerm),
        like(cmsPages.description, searchTerm),
        like(cmsPages.slug, searchTerm)
      )
    );
  }

  const where = conditions.length > 0 ? and(...conditions) : undefined;

  const sortColumn =
    options?.sortBy === 'publishedAt'
      ? cmsPages.publishedAt
      : options?.sortBy === 'title'
        ? cmsPages.title
        : cmsPages.createdAt;

  const rawPages = await db.query.cmsPages.findMany({
    where,
    orderBy: sortOrder === 'asc' ? [sortColumn] : [desc(sortColumn)],
    limit,
    offset,
  });

  const pages = rawPages.map(normalizeCMSPage);

  // Get total count
  const countResult = await db
    .select({ count: sql<number>`COUNT(*)` })
    .from(cmsPages)
    .where(where);

  const total = (countResult[0]?.count as number) || 0;

  return { pages, total };
}

/**
 * Update a CMS page
 */
export async function updateCMSPage(input: UpdateCMSPageInput): Promise<CMSPage> {
  if (!input.id) {
    throw new Error('id is required');
  }

  const existing = await getCMSPageById(input.id);
  if (!existing) {
    throw new Error('CMS page not found');
  }

  const updatedData: Record<string, unknown> = {
    updatedAt: new Date(),
  };

  if (input.title !== undefined) {
    updatedData.title = input.title;
  }

  if (input.description !== undefined) {
    updatedData.description = input.description;
  }

  if (input.content !== undefined) {
    updatedData.content = input.content;
  }

  if (input.type !== undefined) {
    updatedData.type = input.type;
  }

  if (input.author !== undefined) {
    updatedData.author = input.author;
  }

  if (input.tags !== undefined) {
    updatedData.tags = JSON.stringify(input.tags);
  }

  if (input.published !== undefined) {
    updatedData.published = input.published ? 1 : 0;
    updatedData.publishedAt = input.published ? new Date() : null;
  }

  if (input.featuredImage !== undefined) {
    updatedData.featuredImage = input.featuredImage;
  }

  if (input.metadata !== undefined) {
    updatedData.metadata = JSON.stringify(input.metadata);
  }

  // Validate before update
  const validation = validateCMSPage({ ...existing, ...updatedData });
  if (!validation.valid) {
    throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
  }

  const result = await db
    .update(cmsPages)
    .set(updatedData)
    .where(eq(cmsPages.id, input.id))
    .returning();

  if (!result || result.length === 0) {
    throw new Error('Failed to update CMS page');
  }

  return normalizeCMSPage(result[0]);
}

/**
 * Delete a CMS page
 */
export async function deleteCMSPage(id: number): Promise<void> {
  const result = await db.delete(cmsPages).where(eq(cmsPages.id, id)).returning();

  if (!result || result.length === 0) {
    throw new Error('CMS page not found');
  }
}

/**
 * Get published pages only
 */
export async function getPublishedPages(options?: {
  type?: 'blog' | 'doc' | 'service' | 'page';
  limit?: number;
  offset?: number;
}): Promise<{ pages: CMSPage[]; total: number }> {
  return listCMSPages({
    ...options,
    published: true,
  });
}

/**
 * Search CMS pages
 */
export async function searchCMSPages(
  query: string,
  options?: {
    type?: 'blog' | 'doc' | 'service' | 'page';
    limit?: number;
  }
): Promise<CMSPage[]> {
  const { pages } = await listCMSPages({
    search: query,
    type: options?.type,
    limit: options?.limit || 20,
  });
  return pages;
}

export default {
  create: createCMSPage,
  getById: getCMSPageById,
  getBySlug: getCMSPageBySlug,
  list: listCMSPages,
  update: updateCMSPage,
  delete: deleteCMSPage,
  getPublished: getPublishedPages,
  search: searchCMSPages,
  slugify,
  validate: validateCMSPage,
};
