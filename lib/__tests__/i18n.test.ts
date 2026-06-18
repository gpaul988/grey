import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  i18nConfig,
  getLanguageFromPath,
  removeLanguagePrefix,
  addLanguagePrefix,
} from '@/lib/i18n';

describe('i18n', () => {
  describe('config', () => {
    it('should have correct fallback language', () => {
      expect(i18nConfig.fallbackLng).toBe('en');
    });

    it('should have correct namespaces', () => {
      expect(i18nConfig.ns).toContain('common');
      expect(i18nConfig.ns).toContain('services');
      expect(i18nConfig.ns).toContain('products');
    });

    it('should have proper interpolation settings', () => {
      expect(i18nConfig.interpolation.escapeValue).toBe(false);
    });
  });

  describe('getLanguageFromPath', () => {
    it('should extract language from path prefix', () => {
      expect(getLanguageFromPath('/en/about')).toBe('en');
      expect(getLanguageFromPath('/es/servicios')).toBe('es');
      expect(getLanguageFromPath('/fr/produits')).toBe('fr');
    });

    it('should return en if no language prefix', () => {
      expect(getLanguageFromPath('/about')).toBe('en');
      expect(getLanguageFromPath('/')).toBe('en');
    });

    it('should handle root paths', () => {
      expect(getLanguageFromPath('/de')).toBe('de');
      expect(getLanguageFromPath('/ja/shop')).toBe('ja');
    });
  });

  describe('removeLanguagePrefix', () => {
    it('should remove language prefix from path', () => {
      expect(removeLanguagePrefix('/en/about')).toBe('/about');
      expect(removeLanguagePrefix('/es/servicios')).toBe('/servicios');
    });

    it('should return root if path is just language', () => {
      expect(removeLanguagePrefix('/en')).toBe('/');
      expect(removeLanguagePrefix('/fr')).toBe('/');
    });

    it('should keep unchanged if no language prefix', () => {
      expect(removeLanguagePrefix('/about')).toBe('/about');
      expect(removeLanguagePrefix('/')).toBe('/');
    });

    it('should handle deep nested paths', () => {
      expect(removeLanguagePrefix('/de/services/consulting/expertise')).toBe(
        '/services/consulting/expertise'
      );
    });
  });

  describe('addLanguagePrefix', () => {
    it('should add language prefix to path', () => {
      expect(addLanguagePrefix('/about', 'es')).toBe('/es/about');
      expect(addLanguagePrefix('/services', 'fr')).toBe('/fr/services');
    });

    it('should not add prefix for English', () => {
      expect(addLanguagePrefix('/about', 'en')).toBe('/about');
      expect(addLanguagePrefix('/services', 'en')).toBe('/services');
    });

    it('should remove existing prefix before adding new one', () => {
      expect(addLanguagePrefix('/en/about', 'es')).toBe('/es/about');
      expect(addLanguagePrefix('/fr/services', 'de')).toBe('/de/services');
    });

    it('should handle root path', () => {
      // Root path handling: don't add prefix (root is shared across all languages)
      expect(addLanguagePrefix('/', 'en')).toBe('/');
      expect(addLanguagePrefix('/', 'es')).toBe('/');
      expect(addLanguagePrefix('/', 'fr')).toBe('/');
    });
  });

  describe('language support', () => {
    const languages = ['en', 'es', 'fr', 'de', 'pt', 'ja', 'zh', 'ar', 'ru', 'it'];

    it.each(languages)('should support %s language', (lang) => {
      expect(getLanguageFromPath(`/${lang}/test`)).toBe(lang);
      expect(removeLanguagePrefix(`/${lang}/test`)).toBe('/test');
      expect(addLanguagePrefix('/test', lang)).toBe(lang === 'en' ? '/test' : `/${lang}/test`);
    });
  });

  describe('edge cases', () => {
    it('should handle query parameters', () => {
      expect(getLanguageFromPath('/es/about?foo=bar')).toBe('es');
    });

    it('should handle hash fragments', () => {
      expect(removeLanguagePrefix('/fr/page#section')).toBe('/page#section');
    });

    it('should preserve trailing slashes', () => {
      expect(removeLanguagePrefix('/en/services/')).toBe('/services/');
      expect(addLanguagePrefix('/about/', 'es')).toBe('/es/about/');
    });
  });
});
