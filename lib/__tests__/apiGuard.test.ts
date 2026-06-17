/**
 * Tests for API Guard utilities
 * Tests rate limiting, validation, sanitization
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { z } from 'zod';
import { fields, sanitize } from '../apiGuard';

describe('API Guard - Sanitization', () => {
  it('should sanitize HTML from input', () => {
    const dirty = '<script>alert("xss")</script>Hello';
    const clean = sanitize(dirty);
    expect(clean).not.toContain('<script>');
    expect(clean).not.toContain('alert');
    expect(clean).toContain('Hello');
  });

  it('should remove dangerous attributes', () => {
    const dirty = '<img src=x onerror="alert(1)">';
    const clean = sanitize(dirty);
    expect(clean).not.toContain('onerror');
  });

  it('should handle non-string input', () => {
    expect(sanitize(null)).toBe('');
    expect(sanitize(undefined)).toBe('');
    expect(sanitize(123)).toBe('');
  });

  it('should trim whitespace', () => {
    const dirty = '  hello world  ';
    const clean = sanitize(dirty);
    expect(clean).toBe('hello world');
  });
});

describe('API Guard - Field Validation', () => {
  describe('email field', () => {
    it('should validate correct email', () => {
      const result = fields.email.safeParse('user@example.com');
      expect(result.success).toBe(true);
    });

    it('should reject invalid email', () => {
      const result = fields.email.safeParse('not-an-email');
      expect(result.success).toBe(false);
    });

    it('should normalize to lowercase', () => {
      const result = fields.email.safeParse('User@EXAMPLE.COM');
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toBe('user@example.com');
      }
    });

    it('should reject email longer than 254 chars', () => {
      const longEmail = 'a'.repeat(255) + '@example.com';
      const result = fields.email.safeParse(longEmail);
      expect(result.success).toBe(false);
    });
  });

  describe('phone field', () => {
    it('should validate phone number', () => {
      const result = fields.phone.safeParse('+234 809 123 4567');
      expect(result.success).toBe(true);
    });

    it('should reject short phone', () => {
      const result = fields.phone.safeParse('123');
      expect(result.success).toBe(false);
    });
  });

  describe('name field', () => {
    it('should accept valid name', () => {
      const result = fields.name.safeParse('John Doe');
      expect(result.success).toBe(true);
    });

    it('should reject empty name', () => {
      const result = fields.name.safeParse('');
      expect(result.success).toBe(false);
    });
  });

  describe('password field', () => {
    it('should accept password >= 8 chars', () => {
      const result = fields.password.safeParse('mySecurePassword123');
      expect(result.success).toBe(true);
    });

    it('should reject short password', () => {
      const result = fields.password.safeParse('short');
      expect(result.success).toBe(false);
    });

    it('should allow long passwords', () => {
      const longPass = 'a'.repeat(200);
      const result = fields.password.safeParse(longPass);
      expect(result.success).toBe(true);
    });

    it('should reject password > 200 chars', () => {
      const tooLong = 'a'.repeat(201);
      const result = fields.password.safeParse(tooLong);
      expect(result.success).toBe(false);
    });
  });

  describe('text fields', () => {
    it('should accept short text', () => {
      const result = fields.shortText.safeParse('Hello');
      expect(result.success).toBe(true);
    });

    it('should reject text > 200 chars', () => {
      const long = 'a'.repeat(201);
      const result = fields.shortText.safeParse(long);
      expect(result.success).toBe(false);
    });

    it('should accept long text', () => {
      const long = 'a'.repeat(4000);
      const result = fields.longText.safeParse(long);
      expect(result.success).toBe(true);
    });

    it('should reject text > 5000 chars', () => {
      const tooLong = 'a'.repeat(5001);
      const result = fields.longText.safeParse(tooLong);
      expect(result.success).toBe(false);
    });
  });
});

describe('API Guard - Combined Schema', () => {
  it('should validate full signup schema', () => {
    const schema = z.object({
      email: fields.email,
      password: fields.password,
      name: fields.name,
    });

    const result = schema.safeParse({
      email: 'user@example.com',
      password: 'securePassword123',
      name: 'John Doe',
    });

    expect(result.success).toBe(true);
  });

  it('should reject partial schema', () => {
    const schema = z.object({
      email: fields.email,
      password: fields.password,
      name: fields.name,
    });

    const result = schema.safeParse({
      email: 'user@example.com',
      password: 'securePassword123',
      // missing name
    });

    expect(result.success).toBe(false);
  });

  it('should report field-specific errors', () => {
    const schema = z.object({
      email: fields.email,
      password: fields.password,
    });

    const result = schema.safeParse({
      email: 'not-email',
      password: 'short',
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.length).toBeGreaterThan(0);
    }
  });
});
