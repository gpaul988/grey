export const BLOG_IMAGE_BY_SLUG: Record<string, string> = {
  'designing-for-scale': '/assets/services/Research-strategy.jpg',
  'scope-mvp-delivery': '/assets/mvp/start.jpg',
  'refactor-vs-rebuild': '/assets/node/hero.jpg',
  'internal-tools-adoption': '/assets/services/product-design.jpg',
  'performance-budgets': '/assets/seo/hero.jpg',
  'shipping-ux-revisions': '/assets/ui-ux/hero.jpg',
  'api-design-mistakes': '/assets/node/hero.jpg',
  'testing-strategy': '/assets/ui-ux/stages/testing.jpg',
  'technical-debt-payoff': '/assets/services/digital-optimisation.jpg',
  'hiring-engineers': '/assets/ui-ux/designers.png',
  'product-analytics-setup': '/assets/mvp/ts.png',
  'customer-support-structure': '/assets/startup/social.jpg',
  'remote-team-culture': '/assets/ui-ux/bright.jpeg',
  'pricing-strategy': '/assets/startup/market.jpg',
  'data-privacy-compliance': '/assets/services/digital-branding.png',
  'team-communication-async': '/assets/ui-ux/priyanka.png',
  'database-design-fundamentals': '/assets/node/hero.jpg',
};

export const BLOG_IMAGE_BY_CATEGORY: Record<string, string> = {
  'AI': '/assets/services/digital-transformatio.jpg',
  'Design': '/assets/ui-ux/hero.jpg',
  'Development': '/assets/services/Development.jpg',
  'Lightflows': '/assets/services/services.jpg',
  'Security': '/assets/services/digital-branding.png',
  'Startups': '/assets/startup/hero.jpg',
  'Trends': '/assets/mvp/start.jpg',
  'Web design': '/assets/services/product-design.jpg',
  'Product Strategy': '/assets/services/Research-strategy.jpg',
  'Delivery': '/assets/mvp/start.jpg',
  'Engineering': '/assets/node/hero.jpg',
  'Operations': '/assets/services/product-design.jpg',
  'Web Performance': '/assets/seo/hero.jpg',
  'UX': '/assets/ui-ux/hero.jpg',
  'Backend': '/assets/node/hero.jpg',
  'Quality': '/assets/ui-ux/stages/testing.jpg',
  'People': '/assets/ui-ux/designers.png',
  'Product': '/assets/mvp/ts.png',
  'Business': '/assets/startup/market.jpg',
  'Process': '/assets/ui-ux/priyanka.png',
  'Uncategorized': '/assets/services/services.jpg',
};

export function getBlogImage(slug: string, category?: string) {
  return BLOG_IMAGE_BY_SLUG[slug] || (category ? BLOG_IMAGE_BY_CATEGORY[category] : undefined) || '/assets/services/services.jpg';
}

