import { describe, it, expect } from 'vitest';
import {
  detectFromHeaders,
  detectFromHTML,
  detectTechStack,
  compareTechStacks,
  getTechMaturityScore,
} from '@/lib/scanner/tech-detector';

describe('Tech Stack Scanner (Phase 6.10)', () => {
  describe('Header Detection', () => {
    it('should detect Express from headers', () => {
      const headers = { 'x-powered-by': 'Express' };
      const result = detectFromHeaders(headers);
      expect(result.techs).toContain('Express.js');
    });

    it('should detect Next.js from headers', () => {
      const headers = { 'server': 'next' };
      const result = detectFromHeaders(headers);
      expect(result.techs).toContain('Next.js');
    });

    it('should detect Nginx', () => {
      const headers = { 'server': 'nginx/1.0' };
      const result = detectFromHeaders(headers);
      expect(result.techs).toContain('Nginx');
    });

    it('should detect Cloudflare', () => {
      const headers = { 'server': 'cloudflare' };
      const result = detectFromHeaders(headers);
      expect(result.techs).toContain('Cloudflare');
    });

    it('should detect .NET from headers', () => {
      const headers = { 'x-aspnet-version': '4.0' };
      const result = detectFromHeaders(headers);
      expect(result.techs).toContain('.NET');
    });

    it('should calculate confidence score', () => {
      const headers = { 'server': 'nginx', 'x-powered-by': 'Express' };
      const result = detectFromHeaders(headers);
      expect(result.confidence).toBeGreaterThan(0);
      expect(result.confidence).toBeLessThanOrEqual(100);
    });
  });

  describe('HTML Detection', () => {
    it('should detect React', () => {
      const html = '<div id="_react_root"></div>';
      const result = detectFromHTML(html);
      expect(result.techs).toContain('React');
    });

    it('should detect Vue.js', () => {
      const html = '<div id="app" v-app></div>';
      const result = detectFromHTML(html);
      expect(result.techs).toContain('Vue.js');
    });

    it('should detect Angular', () => {
      const html = '<html ng-app="myApp">';
      const result = detectFromHTML(html);
      expect(result.techs).toContain('Angular');
    });

    it('should detect Bootstrap', () => {
      const html = '<link rel="stylesheet" href="bootstrap.min.css">';
      const result = detectFromHTML(html);
      expect(result.techs).toContain('Bootstrap');
    });

    it('should detect jQuery', () => {
      const html = '<script src="jquery.min.js"></script>';
      const result = detectFromHTML(html);
      expect(result.techs).toContain('jQuery');
    });

    it('should detect Google Analytics', () => {
      const html = '<script async src="https://www.googletagmanager.com/gtag/js?id=UA-123"></script>';
      const result = detectFromHTML(html);
      expect(result.techs).toContain('Google Analytics');
    });

    it('should detect Next.js', () => {
      const html = '<script src="__NEXT_DATA__"></script>';
      const result = detectFromHTML(html);
      expect(result.techs).toContain('Next.js');
    });

    it('should detect CDNs', () => {
      const html = '<script src="https://cdn.jsdelivr.net/npm/lib@1.0/dist.js"></script>';
      const result = detectFromHTML(html);
      expect(result.techs).toContain('jsDelivr');
    });

    it('should extract meta tags', () => {
      const html = '<meta name="viewport" content="width=device-width">';
      const result = detectFromHTML(html);
      expect(result.details.metaTags['viewport']).toBe('width=device-width');
    });
  });

  describe('Tech Stack Detection', () => {
    it('should detect tech stack from URL', async () => {
      const result = await detectTechStack('https://example.com');
      expect(result.detectedTechs).toBeDefined();
      expect(Array.isArray(result.detectedTechs)).toBe(true);
      expect(result.confidence).toBeGreaterThanOrEqual(0);
      expect(result.confidence).toBeLessThanOrEqual(100);
    });

    it('should reject invalid URL', async () => {
      try {
        await detectTechStack('not-a-url');
        expect.fail('Should have thrown error');
      } catch (error) {
        expect(error).toBeDefined();
      }
    });

    it('should categorize technologies', async () => {
      const result = await detectTechStack('https://example.com');
      expect(result.frameworks).toBeDefined();
      expect(result.backends).toBeDefined();
      expect(result.databases).toBeDefined();
      expect(result.cdn).toBeDefined();
      expect(result.analytics).toBeDefined();
      expect(result.hosting).toBeDefined();
    });

    it('should detect headers', async () => {
      const result = await detectTechStack('https://example.com');
      expect(result.headers).toBeDefined();
    });

    it('should detect HTML details', async () => {
      const result = await detectTechStack('https://example.com');
      expect(result.html).toBeDefined();
      expect(result.html?.metaTags).toBeDefined();
    });
  });

  describe('Tech Stack Comparison', () => {
    it('should compare two tech stacks', async () => {
      const stack1 = await detectTechStack('https://site1.com');
      const stack2 = await detectTechStack('https://site2.com');
      const comparison = compareTechStacks(stack1, stack2);

      expect(comparison.unique1).toBeDefined();
      expect(comparison.unique2).toBeDefined();
      expect(comparison.common).toBeDefined();
      expect(comparison.difference).toBeGreaterThanOrEqual(0);
    });

    it('should identify unique technologies', async () => {
      const stack1 = {
        detectedTechs: ['React', 'Node.js', 'PostgreSQL'],
      } as any;
      const stack2 = {
        detectedTechs: ['React', 'Django', 'MySQL'],
      } as any;

      const comparison = compareTechStacks(stack1, stack2);
      expect(comparison.unique1).toContain('Node.js');
      expect(comparison.unique1).toContain('PostgreSQL');
      expect(comparison.unique2).toContain('Django');
      expect(comparison.unique2).toContain('MySQL');
      expect(comparison.common).toContain('React');
    });
  });

  describe('Tech Maturity Scoring', () => {
    it('should score mature tech stacks higher', () => {
      const matureTechs = ['React', 'Vue.js', 'Express.js'];
      const score = getTechMaturityScore(matureTechs);
      expect(score).toBeGreaterThan(50);
    });

    it('should score emerging tech stacks lower', () => {
      const emergingTechs = ['UnknownFramework', 'NewDatabase'];
      const score = getTechMaturityScore(emergingTechs);
      expect(score).toBeLessThanOrEqual(50);
    });

    it('should handle mixed stacks', () => {
      const mixedTechs = ['React', 'Bootstrap', 'NewLib', 'PostgreSQL'];
      const score = getTechMaturityScore(mixedTechs);
      expect(score).toBeGreaterThanOrEqual(0);
      expect(score).toBeLessThanOrEqual(100);
    });

    it('should handle empty tech stack', () => {
      const score = getTechMaturityScore([]);
      expect(score).toBe(0);
    });
  });

  describe('Integration Tests', () => {
    it('should perform complete tech scan and analysis', async () => {
      // Scan site
      const result = await detectTechStack('https://example.com');
      expect(result.detectedTechs.length).toBeGreaterThanOrEqual(0);

      // Score maturity
      const maturityScore = getTechMaturityScore(result.detectedTechs);
      expect(maturityScore).toBeGreaterThanOrEqual(0);
      expect(maturityScore).toBeLessThanOrEqual(100);
    });

    it('should compare and analyze two sites', async () => {
      const site1 = await detectTechStack('https://example1.com');
      const site2 = await detectTechStack('https://example2.com');

      const comparison = compareTechStacks(site1, site2);
      const score1 = getTechMaturityScore(site1.detectedTechs);
      const score2 = getTechMaturityScore(site2.detectedTechs);

      expect(comparison).toBeDefined();
      expect(score1).toBeGreaterThanOrEqual(0);
      expect(score2).toBeGreaterThanOrEqual(0);
    });
  });
});
