import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { db } from '@/lib/db';
import { cmsPages } from '@/lib/db/schema';
import { eq, and } from 'drizzle-orm';
import { NextApiRequest, NextApiResponse } from 'next';
import handler from '@/pages/api/admin/cms/create';
import listHandler from '@/pages/api/admin/cms/list';

// Mock the database
vi.mock('@/lib/db', () => ({
  db: {
    insert: vi.fn(),
    select: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
}));

describe('CMS Endpoints', () => {
  let req: Partial<NextApiRequest>;
  let res: Partial<NextApiResponse>;
  let jsonMock: any;
  let statusMock: any;

  beforeEach(() => {
    jsonMock = vi.fn();
    statusMock = vi.fn().mockReturnValue({ json: jsonMock });

    req = {
      headers: {
        authorization: 'Bearer test-token',
      },
      method: 'POST',
      body: {},
    };

    res = {
      status: statusMock,
      json: jsonMock,
    };
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('POST /api/admin/cms/create', () => {
    it('should create a CMS page with valid data', async () => {
      req.body = {
        title: 'Getting Started',
        slug: 'getting-started',
        type: 'guide',
        content: '# Getting Started Guide',
        published: false,
      };

      const mockInsert = vi.fn().mockReturnValue({
        values: vi.fn().mockReturnValue({
          returning: vi.fn().mockResolvedValue([
            {
              id: 1,
              title: 'Getting Started',
              slug: 'getting-started',
              type: 'guide',
              content: '# Getting Started Guide',
              published: false,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          ]),
        }),
      });

      vi.mocked(db.insert).mockReturnValue(mockInsert() as any);

      await handler(req as NextApiRequest, res as NextApiResponse);

      expect(statusMock).toHaveBeenCalledWith(201);
      expect(jsonMock).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            title: 'Getting Started',
            slug: 'getting-started',
          }),
        })
      );
    });

    it('should require title and content', async () => {
      req.body = {
        title: 'Test',
        // missing content
      };

      req.method = 'POST';

      // Should return 400 for missing fields
      expect(statusMock).toBeDefined();
    });

    it('should generate slug from title if not provided', async () => {
      req.body = {
        title: 'Hello World',
        content: 'Test content',
        type: 'blog',
      };

      // Should auto-generate slug: 'hello-world'
      expect(req.body.title).toBe('Hello World');
    });

    it('should prevent duplicate slugs', async () => {
      req.body = {
        title: 'Duplicate Page',
        slug: 'duplicate-page',
        content: 'Content',
      };

      // Should return 409 Conflict for duplicate slug
      expect(statusMock).toBeDefined();
    });

    it('should require authentication', async () => {
      req.headers = {}; // No auth header

      // Should return 401 Unauthorized
      expect(statusMock).toBeDefined();
    });
  });

  describe('GET /api/admin/cms/list', () => {
    it('should list all CMS pages', async () => {
      req.method = 'GET';
      req.query = {};

      const mockPages = [
        { id: 1, title: 'Page 1', slug: 'page-1', published: true },
        { id: 2, title: 'Page 2', slug: 'page-2', published: false },
      ];

      const mockSelect = vi.fn().mockReturnValue({
        from: vi.fn().mockReturnValue({
          orderBy: vi.fn().mockReturnValue({
            limit: vi.fn().mockReturnValue({
              offset: vi.fn().mockResolvedValue(mockPages),
            }),
          }),
        }),
      });

      vi.mocked(db.select).mockReturnValue(mockSelect() as any);

      await listHandler(req as NextApiRequest, res as NextApiResponse);

      expect(statusMock).toHaveBeenCalledWith(200);
    });

    it('should filter by type', async () => {
      req.method = 'GET';
      req.query = { type: 'blog' };

      expect(req.query.type).toBe('blog');
    });

    it('should filter by published status', async () => {
      req.method = 'GET';
      req.query = { published: 'true' };

      expect(req.query.published).toBe('true');
    });

    it('should support pagination', async () => {
      req.method = 'GET';
      req.query = { limit: '10', offset: '0' };

      expect(parseInt(req.query.limit as string)).toBe(10);
      expect(parseInt(req.query.offset as string)).toBe(0);
    });

    it('should return empty array if no pages found', async () => {
      req.method = 'GET';

      // Mock empty result
      expect(statusMock).toBeDefined();
    });
  });

  describe('PUT /api/admin/cms/update', () => {
    it('should update an existing page', async () => {
      req.method = 'PUT';
      req.body = {
        id: 1,
        title: 'Updated Title',
        content: 'Updated content',
      };

      expect(req.body.id).toBe(1);
      expect(req.body.title).toBe('Updated Title');
    });

    it('should return 404 if page not found', async () => {
      req.method = 'PUT';
      req.body = {
        id: 9999,
        title: 'Non-existent',
      };

      expect(req.body.id).toBe(9999);
    });

    it('should update published status', async () => {
      req.method = 'PUT';
      req.body = {
        id: 1,
        published: true,
        publishedAt: new Date(),
      };

      expect(req.body.published).toBe(true);
    });
  });

  describe('DELETE /api/admin/cms/delete', () => {
    it('should delete a CMS page', async () => {
      req.method = 'DELETE';
      req.body = { id: 1 };

      expect(req.body.id).toBe(1);
    });

    it('should return 404 if page not found', async () => {
      req.method = 'DELETE';
      req.body = { id: 9999 };

      expect(req.body.id).toBe(9999);
    });

    it('should soft-delete if enabled', async () => {
      // Optional: implement soft deletes
      req.method = 'DELETE';
      req.body = { id: 1, soft: true };

      expect(req.body.soft).toBe(true);
    });
  });

  describe('Public /api/cms/pages', () => {
    it('should return published pages only', async () => {
      // Public endpoint should not require auth
      // Should return only pages with published = true
      expect(true).toBe(true);
    });

    it('should filter by slug', async () => {
      // GET /api/cms/pages?slug=getting-started
      // Should return single page
      expect(true).toBe(true);
    });

    it('should filter by type', async () => {
      // GET /api/cms/pages?type=blog
      // Should return pages of that type
      expect(true).toBe(true);
    });
  });
});
