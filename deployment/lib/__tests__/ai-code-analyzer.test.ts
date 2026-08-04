import { describe, it, expect } from 'vitest';
import {
  detectLanguage,
  analyzeCode,
  calculateQualityScore,
  getRecommendations,
} from '@/lib/ai/code-analyzer';
import {
  parseGitHubUrl,
  detectTechStack,
  validateGitHubRepo,
  analyzeGitHubRepo,
  calculateRepoScore,
} from '@/lib/ai/github-scanner';
import {
  recommendServices,
  detectTechStack as detectServiceTech,
  getAllServices,
} from '@/lib/ai/service-recommender';

describe('AI Code Analyzer (Phase 6.6)', () => {
  describe('Code Language Detection', () => {
    it('should detect TypeScript', () => {
      const code = 'const name: string = "test"; interface User { name: string; }';
      expect(detectLanguage(code)).toBe('typescript');
    });

    it('should detect JSX', () => {
      const code = 'function App() { return <div>Hello</div>; }';
      const lang = detectLanguage(code);
      expect(['jsx', 'javascript']).toContain(lang);
    });

    it('should detect JavaScript as fallback', () => {
      const code = 'const x = 42; console.log(x);';
      expect(detectLanguage(code)).toBe('javascript');
    });

    it('should detect Python', () => {
      const code = 'def hello():\n  print("world")';
      expect(detectLanguage(code)).toBe('python');
    });
  });

  describe('Code Analysis', () => {
    it('should analyze simple code', () => {
      const code = 'function add(a, b) { return a + b; }';
      const analysis = analyzeCode(code);

      expect(analysis.language).toBe('javascript');
      expect(analysis.lineCount).toBeGreaterThan(0);
      expect(analysis.metrics.functions).toBeGreaterThan(0);
      expect(analysis.score).toBeGreaterThanOrEqual(0);
      expect(analysis.score).toBeLessThanOrEqual(100);
    });

    it('should detect async patterns', () => {
      const code = `async function fetch() {
        try {
          const data = await api.get();
          return data;
        } catch (error) {
          console.error(error);
        }
      }`;
      const analysis = analyzeCode(code);

      expect(analysis.patterns).toContain('async-await');
      expect(analysis.metrics.asyncFunctions).toBeGreaterThan(0);
    });

    it('should penalize missing error handling', () => {
      const code = 'async function test() { await someAsyncCall(); }';
      const analysis = analyzeCode(code);

      expect(analysis.issues).toContain('Missing error handling in async code');
      expect(analysis.score).toBeLessThan(75);
    });

    it('should reward TypeScript code', () => {
      const code = 'const name: string = "test"; const age: number = 25;';
      const analysis = analyzeCode(code);

      expect(analysis.language).toBe('typescript');
      expect(analysis.patterns).toContain('type-safe');
      expect(analysis.score).toBeGreaterThan(75);
    });

    it('should detect OOP patterns', () => {
      const code = `class User {
        constructor(name: string) {
          this.name = name;
        }
      }`;
      const analysis = analyzeCode(code);

      expect(analysis.patterns).toContain('oop-style');
    });

    it('should detect functional patterns', () => {
      const code = '[1, 2, 3].map(x => x * 2).filter(x => x > 2).reduce((a, b) => a + b);';
      const analysis = analyzeCode(code);

      expect(analysis.patterns).toContain('functional-style');
    });

    it('should flag hardcoded secrets', () => {
      const code = 'const API_KEY = "sk-1234567890"; const password = "secret123";';
      const analysis = analyzeCode(code);

      expect(analysis.issues).toContain('Potential hardcoded secrets');
      expect(analysis.score).toBeLessThan(60);
    });

    it('should rate complex code as high complexity', () => {
      const code = Array(600)
        .fill(0)
        .map((_, i) => `function func${i}() { return ${i}; }`)
        .join('\n');
      const analysis = analyzeCode(code);

      expect(analysis.complexity).toBe('high');
    });

    it('should calculate quality score', () => {
      const code = 'const x: number = 42;';
      const analysis = analyzeCode(code);
      const score = calculateQualityScore(analysis);

      expect(score).toBeGreaterThanOrEqual(0);
      expect(score).toBeLessThanOrEqual(100);
    });

    it('should generate recommendations', () => {
      const code = 'async function test() { await api.call(); }';
      const analysis = analyzeCode(code);
      const recommendations = getRecommendations(analysis);

      expect(Array.isArray(recommendations)).toBe(true);
      expect(recommendations.length).toBeGreaterThan(0);
    });
  });

  describe('GitHub Scanner', () => {
    it('should parse full GitHub URL', () => {
      const result = parseGitHubUrl('https://github.com/facebook/react');
      expect(result).toEqual({ owner: 'facebook', repo: 'react' });
    });

    it('should parse owner/repo format', () => {
      const result = parseGitHubUrl('facebook/react');
      expect(result).toEqual({ owner: 'facebook', repo: 'react' });
    });

    it('should handle .git suffix', () => {
      const result = parseGitHubUrl('https://github.com/facebook/react.git');
      expect(result).toEqual({ owner: 'facebook', repo: 'react' });
    });

    it('should return null for invalid format', () => {
      const result = parseGitHubUrl('not-a-url');
      expect(result).toBeNull();
    });

    it('should validate GitHub repo format', async () => {
      const valid = await validateGitHubRepo('owner', 'repo');
      expect(valid).toBe(true);

      const invalid = await validateGitHubRepo('', '');
      expect(invalid).toBe(false);
    });

    it('should analyze GitHub repo', async () => {
      const analysis = await analyzeGitHubRepo('facebook', 'react');

      expect(analysis.owner).toBe('facebook');
      expect(analysis.repo).toBe('react');
      expect(analysis.url).toContain('github.com');
      expect(analysis.score).toBeGreaterThanOrEqual(0);
      expect(analysis.score).toBeLessThanOrEqual(100);
    });

    it('should detect tech stack from files', () => {
      const files = { tsCount: 100, jsCount: 50, jsonCount: 10, mdCount: 5, ymlCount: 2 };
      const tech = detectTechStack(files);

      expect(tech).toContain('TypeScript');
      expect(tech).toContain('JavaScript');
    });

    it('should calculate repo score', async () => {
      const analysis = await analyzeGitHubRepo('owner', 'repo');
      const score = calculateRepoScore(analysis);

      expect(score).toBeGreaterThanOrEqual(0);
      expect(score).toBeLessThanOrEqual(100);
    });
  });

  describe('Service Recommender', () => {
    it('should get all available services', () => {
      const services = getAllServices();

      expect(Array.isArray(services)).toBe(true);
      expect(services.length).toBeGreaterThan(0);
    });

    it('should recommend services for React', () => {
      const recommendations = recommendServices(['React']);

      expect(recommendations.length).toBeGreaterThan(0);
      expect(recommendations[0].matchScore).toBeGreaterThanOrEqual(0);
      expect(recommendations[0].matchScore).toBeLessThanOrEqual(100);
    });

    it('should recommend services for Node.js', () => {
      const recommendations = recommendServices(['Node.js']);

      expect(recommendations.length).toBeGreaterThan(0);
      const nodeService = recommendations.find(r => r.service.includes('Node'));
      expect(nodeService).toBeDefined();
    });

    it('should recommend services for Python', () => {
      const recommendations = recommendServices(['Python']);

      expect(recommendations.length).toBeGreaterThan(0);
    });

    it('should recommend services for full stack', () => {
      const stack = ['React', 'Node.js', 'PostgreSQL', 'Docker'];
      const recommendations = recommendServices(stack);

      expect(recommendations.length).toBeGreaterThan(3);
    });

    it('should provide default recommendation if no match', () => {
      const recommendations = recommendServices(['UnknownTech']);

      expect(recommendations.length).toBeGreaterThan(0);
      expect(recommendations[0].matchScore).toBeGreaterThanOrEqual(50);
    });

    it('should include resource links', () => {
      const recommendations = recommendServices(['React']);
      const rec = recommendations[0];

      expect(rec.resources).toHaveProperty('docs');
      expect(rec.resources).toHaveProperty('demo');
      expect(rec.resources).toHaveProperty('github');
    });

    it('should detect tech stack from patterns', () => {
      const patterns = ['async-await', 'type-safe'];
      const tech = detectServiceTech(patterns, 'typescript');

      expect(tech).toContain('TypeScript');
      expect(tech).toContain('Async/Await');
    });
  });

  describe('Integration Tests', () => {
    it('should analyze code and recommend services', () => {
      const code = `
        import React from 'react';
        export async function fetchData() {
          try {
            const response = await fetch('/api/data');
            return response.json();
          } catch (error) {
            console.error(error);
          }
        }
      `;

      const analysis = analyzeCode(code);
      expect(['jsx', 'javascript']).toContain(analysis.language);

      const tech = detectServiceTech(analysis.patterns, analysis.language);
      const recommendations = recommendServices(tech);

      expect(recommendations.length).toBeGreaterThan(0);
    });

    it('should handle code analysis errors gracefully', () => {
      const analysis = analyzeCode('');
      expect(analysis).toBeDefined();
      expect(analysis.lineCount).toBe(1);
    });

    it('should handle invalid GitHub repos gracefully', async () => {
      // validateGitHubRepo should handle invalid input
      const valid = await validateGitHubRepo('', '');
      expect(valid).toBe(false);
    });
  });
});
