/**
 * Centralised SEO metadata for every route on the site (audit H2).
 *
 * Each route gets a unique <title>, description, canonical and OG image.
 * `buildMetadata()` turns an entry into a Next.js Metadata object so any
 * App Router page can do:  export const metadata = buildMetadata('/services/seo')
 * or use generateMetadata for dynamic routes.
 */
import type {Metadata} from 'next';

export const SITE = {
    name: 'Grey InfoTech',
    legalName: 'Grey InfoTech Limited',
    url: 'https://greyinfotech.com.ng',
    locale: 'en_NG',
    twitter: '@greyinfotechltd',
    ogImage: '/og-image.png',
    socials: [
        'https://x.com/greyinfotechltd',
        'https://instagram.com/greyinfotechltd',
        'https://github.com/GREY-INFOTECH-LTD',
        'https://facebook.com/greyinfotechltd',
    ],
} as const;

export interface SeoEntry {
    title: string;
    description: string;
    keywords?: string[];
    image?: string;
    noindex?: boolean;
}

const titleize = (slug: string) =>
    slug
        .replace(/[-/]/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase())
        .trim();

// Build a clean services map.
const SERVICE_SLUGS = [
    'IoT-Development', 'Javascript', 'Laravel-Development', 'MVP', 'Mobile-Application-Development',
    'Net-Development', 'Nextjs-Development', 'Nodejs-Development', 'PHP-Development', 'Python-Development',
    'React-Native-Development', 'Reactjs-Development', 'Ruby-on-Rails', 'Social-Networking',
    'Software-Development', 'Typescript', 'Vuejs-Development', 'Web-Application', 'Web-Design',
    'Web-Development', 'ai-development-services', 'android-development', 'angular-development',
    'app-store-optimization', 'backend-development', 'blockchain-development', 'branding',
    'cms-development', 'crm-development', 'cross-platform-development', 'digital-marketing',
    'discovery-phase', 'erp-development', 'flutter-development', 'frontend-development',
    'hybrid-app-development', 'ios-development', 'seo', 'ui-ux-design', 'unity-development',
];

const INDUSTRY_SLUGS = [
    'automation', 'biotech', 'e-commerce-development', 'education', 'fintech', 'healthcare',
    'hr-tech', 'logistics', 'music', 'oil-and-gas', 'ondemand', 'real-estate', 'retail',
    'saas', 'travel-and-hospitality',
];

const serviceLabel = (slug: string) => {
    const map: Record<string, string> = {
        'IoT-Development': 'IoT Development',
        Javascript: 'JavaScript Development',
        MVP: 'MVP Development',
        'Net-Development': '.NET Development',
        Typescript: 'TypeScript Development',
        'ai-development-services': 'AI Development Services',
        seo: 'SEO Services',
        'ui-ux-design': 'UI/UX Design',
    };
    return map[slug] || titleize(slug);
};

const industryLabel = (slug: string) => {
    const map: Record<string, string> = {
        'e-commerce-development': 'E-Commerce',
        'hr-tech': 'HR Tech',
        'oil-and-gas': 'Oil & Gas',
        saas: 'SaaS',
        ondemand: 'On-Demand',
        'travel-and-hospitality': 'Travel & Hospitality',
    };
    return map[slug] || titleize(slug);
};

/** Static, hand-tuned entries for top-level pages. */
const STATIC: Record<string, SeoEntry> = {
    '/': {
        title: 'Grey InfoTech Ltd. — Web Design, App Development & AI Solutions | Port Harcourt, Nigeria',
        description:
            'Grey InfoTech is a future-focused web design, web & mobile app development, AI and digital marketing agency in Port Harcourt, Nigeria. We build scalable, user-centered digital products for startups and enterprises.',
        keywords: ['web design Port Harcourt', 'app development Nigeria', 'AI development', 'software company Nigeria'],
    },
    '/company': {
        title: 'About Grey InfoTech — Our Story, Team & Mission',
        description: 'Meet the team behind Grey InfoTech. Eight years building award-winning digital products across fintech, healthcare, e-commerce and more.',
    },
    '/Our-Approach': {
        title: 'Our Approach — How Grey InfoTech Builds Products',
        description: 'Discovery, design, engineering and growth. See the proven, transparent process behind every Grey InfoTech project.',
    },
    '/Startups': {
        title: 'Startup Development Services — From Idea to Launch',
        description: 'End-to-end product development for startups: MVPs, scalable architecture, design and go-to-market support from Grey InfoTech.',
    },
    '/portfolio': {
        title: 'Portfolio — Selected Work by Grey InfoTech',
        description: 'Explore web, mobile and AI products engineered by Grey InfoTech for clients across industries.',
    },
    '/case-studies': {
        title: 'Case Studies — Real Results from Grey InfoTech',
        description: 'In-depth case studies showing how Grey InfoTech delivers measurable business outcomes through technology.',
    },
    '/blog': {
        title: 'Blog — Engineering, Design & Growth Insights',
        description: 'Practical articles on software engineering, product design, AI and digital growth from the Grey InfoTech team.',
    },
    '/careers': {
        title: 'Careers — Build the Future with Grey InfoTech',
        description: 'Join a team of engineers, designers and strategists shipping world-class digital products. See open roles at Grey InfoTech.',
    },
    '/contact': {
        title: 'Contact Grey InfoTech — Let’s Build Something',
        description: 'Reach Grey InfoTech by WhatsApp, Calendly, live chat or our contact form. Based in Port Harcourt, serving clients worldwide.',
    },
    '/support': {
        title: 'Support — Help & Assistance | Grey InfoTech',
        description: 'Get help, open a ticket and find answers. Grey InfoTech support is here for you.',
    },
    '/open-ticket': {
        title: 'Open a Support Ticket | Grey InfoTech',
        description: 'Submit a support request and our team will get back to you quickly.',
    },
    '/quote-request': {
        title: 'Request a Quote | Grey InfoTech',
        description: 'Tell us about your project and get a tailored quote from Grey InfoTech.',
    },
    '/Links': {
        title: 'Links | Grey InfoTech',
        description: 'Quick links to Grey InfoTech resources and channels.',
    },
    '/Terms-Conditions': {title: 'Terms & Conditions | Grey InfoTech', description: 'Terms and conditions for using Grey InfoTech services and website.', noindex: false},
    '/cookies-policy': {title: 'Cookies Policy | Grey InfoTech', description: 'How Grey InfoTech uses cookies and similar technologies.'},
    '/data-protection-policy': {title: 'Data Protection Policy | Grey InfoTech', description: 'Grey InfoTech’s data protection and privacy commitments, aligned with the NDPR.'},
    '/store': {title: 'Store — Software, Templates & Digital Products | Grey InfoTech', description: 'Browse and buy digital products, templates and tools built by Grey InfoTech.'},
};

/** Build the full registry once. */
function buildRegistry(): Record<string, SeoEntry> {
    const reg: Record<string, SeoEntry> = {...STATIC};
    for (const slug of SERVICE_SLUGS) {
        const label = serviceLabel(slug);
        reg[`/services/${slug}`] = {
            title: `${label} — Expert ${label.replace(' Development', '').replace(' Services', '')} Company`,
            description: `Professional ${label.toLowerCase()} services from Grey InfoTech. Scalable, secure and beautifully engineered solutions tailored to your business goals.`,
            keywords: [label, `${label} Nigeria`, `${label} Port Harcourt`, 'Grey InfoTech'],
        };
    }
    for (const slug of INDUSTRY_SLUGS) {
        const label = industryLabel(slug);
        reg[`/industries/${slug}`] = {
            title: `${label} Software Development — Industry Solutions`,
            description: `Custom ${label} technology solutions by Grey InfoTech. Domain-aware engineering for the ${label.toLowerCase()} sector.`,
            keywords: [`${label} software`, `${label} app development`, 'Grey InfoTech'],
        };
    }
    return reg;
}

export const SEO_REGISTRY = buildRegistry();

export function getSeo(path: string): SeoEntry {
    return (
        SEO_REGISTRY[path] || {
            title: titleize(path.replace(/^\//, '') || 'Grey InfoTech'),
            description: SITE.legalName + ' — building scalable, future-ready digital products.',
        }
    );
}

/** Convert a route into a full Next.js Metadata object. */
export function buildMetadata(path: string, override?: Partial<SeoEntry>): Metadata {
    const e = {...getSeo(path), ...override};
    const canonical = `${SITE.url}${path === '/' ? '' : path}`;
    const image = e.image || SITE.ogImage;
    return {
        title: e.title,
        description: e.description,
        keywords: e.keywords,
        alternates: {canonical},
        openGraph: {
            title: e.title,
            description: e.description,
            url: canonical,
            siteName: SITE.name,
            images: [{url: image, width: 1200, height: 630, alt: e.title}],
            type: 'website',
            locale: SITE.locale,
        },
        twitter: {
            card: 'summary_large_image',
            title: e.title,
            description: e.description,
            images: [image],
            creator: SITE.twitter,
        },
        robots: e.noindex
            ? {index: false, follow: false}
            : {index: true, follow: true, googleBot: {index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1}},
    };
}

export {SERVICE_SLUGS, INDUSTRY_SLUGS, serviceLabel, industryLabel};
