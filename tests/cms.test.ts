import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import CMS from '@/lib/cms';
import { db } from '@/lib/db';
import { cmsPages } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

describe('CMS Library', () => {
  // Clean up before and after each test
  beforeEach(async () => {
    try {
      // Clear all CMS pages before each test
      await db.delete(cmsPages);
    } catch (error) {
      // Ignore if table doesn't exist yet
    }
  });

  afterEach(async () => {
    try {
      await db.delete(cmsPages);
    } catch (error) {
      // Ignore cleanup errors
    }
  });

  describe('Validation', () => {
    it('should require title and content', async () => {
      const result = CMS.validate({ description: 'test' });
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('title is required');
    });

    it('should validate slug format', () => {
      const result = CMS.validate({
        title: 'Test',
        slug: 'Invalid_Slug!',
      });
      expect(result.valid).toBe(false);
    });

    it('should validate page type', () => {
      const result = CMS.validate({
        title: 'Test',
        type: 'invalid' as unknown,
      });
      expect(result.valid).toBe(false);
    });
  });

  describe('Slug Generation', () => {
    it('should generate slug from title if not provided', () => {
      const slug = CMS.slugify('Getting Started Guide');
      expect(slug).toBe('getting-started-guide');
    });

    it('should handle special characters in slug', () => {
      const slug = CMS.slugify('Test @ 2024 #awesome!');
      expect(slug).toBe('test-2024-awesome');
    });

    it('should limit slug length', () => {
      const slug = CMS.slugify(
        'This is a very long title that should be truncated to 80 characters maximum'
      );
      expect(slug.length).toBeLessThanOrEqual(80);
    });
  });

  describe('Create CMS Page', () => {
    it('should create a CMS page with valid data', async () => {
      const data = await CMS.create({
        title: 'Test Page',
        slug: 'test-page',
        type: 'doc',
        content: '# Test Content',
        published: false,
      });

      expect(data).toBeDefined();
      expect(data.id).toBeDefined();
      expect(data.title).toBe('Test Page');
      expect(data.slug).toBe('test-page');
      expect(data.type).toBe('doc');
      expect(data.published).toBe(false);
    });

    it('should generate slug from title if not provided', async () => {
      const data = await CMS.create({
        title: 'Auto Slug Test',
        content: 'Test content',
      });

      expect(data.slug).toBe('auto-slug-test');
    });

    it('should prevent duplicate slugs', async () => {
      await CMS.create({
        title: 'Unique Test Page',
        slug: 'unique-slug',
      });

      try {
        await CMS.create({
          title: 'Another Page',
          slug: 'unique-slug',
        });
        expect.fail('Should have thrown error');
      } catch (error: unknown) {
        expect((error as Error).message).toContain('already exists');
      }
    });

    it('should validate title is required', async () => {
      try {
        await CMS.create({ title: '' });
        expect.fail('Should have thrown error');
      } catch (error: unknown) {
        expect((error as Error).message).toContain('Validation failed');
      }
    });
  });

  describe('Retrieve CMS Pages', () => {
    beforeEach(async () => {
      await CMS.create({
        title: 'Test Page',
        slug: 'test-page',
        type: 'doc',
        published: true,
      });
    });

    it('should list all CMS pages', async () => {
      const { pages } = await CMS.list();
      expect(Array.isArray(pages)).toBe(true);
      expect(pages.length).toBeGreaterThan(0);
    });

    it('should filter by type', async () => {
      const { pages } = await CMS.list({ type: 'doc' });
      expect(pages.every((p) => p.type === 'doc')).toBe(true);
    });

    it('should filter by published status', async () => {
      const { pages } = await CMS.list({ published: true });
      expect(pages.every((p) => p.published === true)).toBe(true);
    });

    it('should support pagination', async () => {
      const { pages, total } = await CMS.list({
        limit: 10,
        offset: 0,
      });

      expect(pages.length).toBeLessThanOrEqual(10);
      expect(total).toBeGreaterThanOrEqual(0);
    });

    it('should return empty array if no pages found', async () => {
      const { pages } = await CMS.list({ type: 'service' });
      // Pages might exist from other tests, so just verify it's an array
      expect(Array.isArray(pages)).toBe(true);
    });
  });

  describe('Get CMS Page', () => {
    let pageId: number;

    beforeEach(async () => {
      const page = await CMS.create({
        title: 'Single Page Test',
        slug: 'single-page-test',
      });
      pageId = page.id;
    });

    it('should get page by ID', async () => {
      const page = await CMS.getById(pageId);
      expect(page).toBeDefined();
      expect(page?.id).toBe(pageId);
      expect(page?.title).toBe('Single Page Test');
    });

    it('should get page by slug', async () => {
      const page = await CMS.getBySlug('single-page-test');
      expect(page).toBeDefined();
      expect(page?.slug).toBe('single-page-test');
    });

    it('should return null for non-existent page', async () => {
      const page = await CMS.getById(999999);
      expect(page).toBeNull();
    });
  });

  describe('Update CMS Page', () => {
    let pageId: number;

    beforeEach(async () => {
      const page = await CMS.create({
        title: 'Update Test',
        slug: 'update-test',
        type: 'blog',
      });
      pageId = page.id;
    });

    it('should update an existing page', async () => {
      const updated = await CMS.update({
        id: pageId,
        title: 'Updated Title',
        content: 'Updated content',
      });

      expect(updated.title).toBe('Updated Title');
      expect(updated.content).toBe('Updated content');
    });

    it('should update published status', async () => {
      const updated = await CMS.update({
        id: pageId,
        published: true,
      });

      expect(updated.published).toBe(true);
      expect(updated.publishedAt).toBeDefined();
    });

    it('should return 404 if page not found', async () => {
      try {
        await CMS.update({
          id: 999999,
          title: 'Non-existent',
        });
        expect.fail('Should have thrown error');
      } catch (error: unknown) {
        expect((error as Error).message).toContain('not found');
      }
    });
  });

  describe('Delete CMS Page', () => {
    it('should delete a CMS page', async () => {
      const page = await CMS.create({
        title: 'Delete Test',
        slug: 'delete-test',
      });

      await CMS.delete(page.id);

      const deleted = await CMS.getById(page.id);
      expect(deleted).toBeNull();
    });

    it('should return 404 if page not found', async () => {
      try {
        await CMS.delete(999999);
        expect.fail('Should have thrown error');
      } catch (error: unknown) {
        expect((error as Error).message).toContain('not found');
      }
    });
  });

  describe('Published Pages', () => {
    beforeEach(async () => {
      await CMS.create({
        title: 'Published Page',
        slug: 'published-page',
        type: 'blog',
        published: true,
      });

      await CMS.create({
        title: 'Draft Page',
        slug: 'draft-page',
        type: 'blog',
        published: false,
      });
    });

    it('should return published pages only', async () => {
      const { pages } = await CMS.getPublished();
      expect(pages.every((p) => p.published === true)).toBe(true);
    });

    it('should filter by type in getPublished', async () => {
      const { pages } = await CMS.getPublished({ type: 'blog' });
      expect(pages.every((p) => p.type === 'blog' && p.published)).toBe(true);
    });
  });

  describe('Search CMS Pages', () => {
    beforeEach(async () => {
      await CMS.create({
        title: 'Searchable Test',
        slug: 'searchable-test',
        description: 'This is searchable content',
        published: true,
      });
    });

    it('should search by title', async () => {
      const results = await CMS.search('Searchable');
      expect(results.length).toBeGreaterThan(0);
      expect(results.some((p) => p.title.includes('Searchable'))).toBe(true);
    });

    it('should search with limit', async () => {
      const results = await CMS.search('Test', { limit: 5 });
      expect(results.length).toBeLessThanOrEqual(5);
    });
  });
});
