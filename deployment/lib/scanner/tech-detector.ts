/**
 * Tech Stack Scanner - Detect technologies from websites
 */

export interface TechStackResult {
  url: string;
  detectedTechs: string[];
  frameworks: string[];
  backends: string[];
  databases: string[];
  cdn: string[];
  analytics: string[];
  hosting: string[];
  confidence: number; // 0-100
  headers?: Record<string, string>;
  html?: {
    framework?: string;
    metaTags?: Record<string, string>;
  };
}

/**
 * Detect tech stack from HTTP headers
 */
export const detectFromHeaders = (headers: Record<string, string>): {
  techs: string[];
  confidence: number;
} => {
  const techs: string[] = [];
  let confidence = 0;

  // Server detection
  const server = headers['server'] || headers['x-powered-by'] || '';
  if (server.toLowerCase().includes('express')) {
    techs.push('Express.js');
    confidence += 15;
  }
  if (server.toLowerCase().includes('next')) {
    techs.push('Next.js');
    confidence += 20;
  }
  if (server.toLowerCase().includes('nginx')) {
    techs.push('Nginx');
    confidence += 10;
  }
  if (server.toLowerCase().includes('apache')) {
    techs.push('Apache');
    confidence += 10;
  }
  if (server.toLowerCase().includes('cloudflare')) {
    techs.push('Cloudflare');
    confidence += 15;
  }

  // Framework detection from headers
  if (headers['x-aspnet-version']) {
    techs.push('.NET');
    confidence += 20;
  }
  if (headers['x-runtime'] === 'Python') {
    techs.push('Python');
    confidence += 20;
  }

  // CMS detection
  if (headers['x-generator']) {
    const gen = headers['x-generator'].toLowerCase();
    if (gen.includes('wordpress')) {
      techs.push('WordPress');
      confidence += 25;
    }
    if (gen.includes('drupal')) {
      techs.push('Drupal');
      confidence += 25;
    }
  }

  return { techs: [...new Set(techs)], confidence: Math.min(confidence, 100) };
};

/**
 * Detect tech from HTML content
 */
export const detectFromHTML = (html: string): {
  techs: string[];
  confidence: number;
  details: { framework?: string; metaTags: Record<string, string> };
} => {
  const techs: string[] = [];
  let confidence = 0;
  const metaTags: Record<string, string> = {};

  // Extract meta tags
  const metaRegex = /<meta\s+name=["']([^"']+)["']\s+content=["']([^"']+)["']/gi;
  let match;
  while ((match = metaRegex.exec(html)) !== null) {
    metaTags[match[1].toLowerCase()] = match[2];
  }

  // React detection
  if (html.includes('__REACT_DEVTOOLS__') || html.includes('_react_root')) {
    techs.push('React');
    confidence += 25;
  }
  if (html.includes('data-react-root')) {
    techs.push('React');
    confidence += 20;
  }

  // Vue detection
  if (html.includes('__VUE__') || html.includes('v-app')) {
    techs.push('Vue.js');
    confidence += 25;
  }

  // Angular detection
  if (html.includes('ng-app') || html.includes('ng-version')) {
    techs.push('Angular');
    confidence += 25;
  }

  // Bootstrap detection
  if (html.includes('bootstrap.css') || html.includes('bootstrap.min.css')) {
    techs.push('Bootstrap');
    confidence += 15;
  }

  // jQuery detection
  if (html.includes('jquery.js') || html.includes('jquery.min.js')) {
    techs.push('jQuery');
    confidence += 15;
  }

  // Google Analytics
  if (html.includes('google-analytics.com') || html.includes('gtag')) {
    techs.push('Google Analytics');
    confidence += 20;
  }

  // Next.js detection
  if (html.includes('__NEXT_DATA__') || html.includes('next/link')) {
    techs.push('Next.js');
    confidence += 25;
  }

  // TypeScript detection (from chunks)
  if (html.match(/webpack|chunk|esm/i)) {
    techs.push('Webpack');
    confidence += 10;
  }

  // CDN detection
  if (html.includes('cloudflare') || html.includes('cdnjs.cloudflare.com')) {
    techs.push('Cloudflare');
    confidence += 15;
  }
  if (html.includes('cdn.jsdelivr.net')) {
    techs.push('jsDelivr');
    confidence += 10;
  }

  // CMS detection
  if (metaTags['generator']?.toLowerCase().includes('wordpress')) {
    techs.push('WordPress');
    confidence += 25;
  }

  return {
    techs: [...new Set(techs)],
    confidence: Math.min(confidence, 100),
    details: {
      framework: techs.find(t => ['React', 'Vue.js', 'Angular'].includes(t)),
      metaTags,
    },
  };
};

/**
 * Comprehensive tech stack detection
 */
export const detectTechStack = async (url: string): Promise<TechStackResult> => {
  try {
    new URL(url);
  } catch {
    throw new Error('Invalid URL');
  }

  try {
    // Simulate fetching and analyzing website
    // In production, would use actual HTTP request + DOM parsing

    // Mock headers
    const headers: Record<string, string> = {
      'server': 'nginx',
      'x-powered-by': 'Express.js',
      'x-generator': 'Next.js',
    };

    // Mock HTML
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta name="generator" content="Next.js 14.0">
          <title>Example Site</title>
        </head>
        <body>
          <div id="__next"></div>
          <script src="https://cdn.jsdelivr.net/npm/bootstrap@5/dist/js/bootstrap.min.js"></script>
          <script async src="https://www.googletagmanager.com/gtag/js?id=UA-123456"></script>
        </body>
      </html>
    `;

    // Detect from headers and HTML
    const headerDetection = detectFromHeaders(headers);
    const htmlDetection = detectFromHTML(html);

    // Combine and deduplicate
    const allTechs = [...new Set([...headerDetection.techs, ...htmlDetection.techs])];
    const avgConfidence = (headerDetection.confidence + htmlDetection.confidence) / 2;

    // Categorize
    const frontendFrameworks = ['React', 'Vue.js', 'Angular', 'Svelte', 'Next.js'];
    const backendTechs = ['Express.js', 'Django', '.NET', 'Ruby on Rails'];
    const databases = ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis'];
    const cdnServices = ['Cloudflare', 'jsDelivr', 'CloudFront'];
    const analyticsTools = ['Google Analytics', 'Mixpanel', 'Hotjar'];
    const hostingProviders = ['AWS', 'Heroku', 'Vercel', 'Netlify'];

    return {
      url,
      detectedTechs: allTechs,
      frameworks: allTechs.filter(t => frontendFrameworks.includes(t)),
      backends: allTechs.filter(t => backendTechs.includes(t)),
      databases: allTechs.filter(t => databases.includes(t)),
      cdn: allTechs.filter(t => cdnServices.includes(t)),
      analytics: allTechs.filter(t => analyticsTools.includes(t)),
      hosting: allTechs.filter(t => hostingProviders.includes(t)),
      confidence: Math.round(avgConfidence),
      headers,
      html: {
        framework: htmlDetection.details.framework,
        metaTags: htmlDetection.details.metaTags,
      },
    };
  } catch (error) {
    throw error;
  }
};

/**
 * Compare tech stacks
 */
export const compareTechStacks = (
  stack1: TechStackResult,
  stack2: TechStackResult
): {
  unique1: string[];
  unique2: string[];
  common: string[];
  difference: number;
} => {
  const set1 = new Set(stack1.detectedTechs);
  const set2 = new Set(stack2.detectedTechs);

  const unique1 = [...set1].filter(t => !set2.has(t));
  const unique2 = [...set2].filter(t => !set1.has(t));
  const common = [...set1].filter(t => set2.has(t));

  const difference = Math.abs(set1.size - set2.size);

  return { unique1, unique2, common, difference };
};

/**
 * Get tech stack maturity score
 */
export const getTechMaturityScore = (techs: string[]): number => {
  const matureTechs = ['React', 'Vue.js', 'Angular', 'Express.js', 'Django', 'PostgreSQL'];
  const matureCount = techs.filter(t => matureTechs.includes(t)).length;
  return Math.round((matureCount / Math.max(techs.length, 1)) * 100);
};
