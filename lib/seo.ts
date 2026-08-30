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
    name: 'Graham Sobiribo Paul',
    legalName: 'Graham Sobiribo Paul',
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
    'maritime-port-management',
];

const INDUSTRY_SLUGS = [
    'automation', 'biotech', 'e-commerce-development', 'education', 'fintech', 'healthcare',
    'hr-tech', 'logistics', 'music', 'oil-and-gas', 'ondemand', 'real-estate', 'retail',
    'saas', 'travel-and-hospitality', 'maritime', 'port',
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
        'maritime-port-management': 'Maritime & Port Management Service',
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
        'maritime': 'Maritime & Shipping',
        'port': 'Ports & Terminals',
    };
    return map[slug] || titleize(slug);
};

/** Static, hand-tuned entries for top-level pages. */
const STATIC: Record<string, SeoEntry> = {
    '/': {
        title: 'Graham Sobiribo Paul — Web Design, App Development & AI Solutions | Port Harcourt, Nigeria',
        description:
            'Graham Sobiribo Paul is a future-focused web design, web & mobile app development, AI and digital marketing agency in Port Harcourt, Nigeria. We build scalable, user-centered digital products for startups and enterprises.',
        keywords: ['web design Port Harcourt', 'app development Nigeria', 'AI development', 'software company Nigeria'],
    },
    '/company': {
        title: 'About Graham Sobiribo Paul — Our Story, Team & Mission',
        description: 'Meet the team behind Graham Sobiribo Paul. Eight years building award-winning digital products across fintech, healthcare, e-commerce and more.',
    },
    '/our-approach': {
        title: 'Our Approach — How Graham Sobiribo Paul Builds Products',
        description: 'Discovery, design, engineering and growth. See the proven, transparent process behind every Graham Sobiribo Paul project.',
    },
    '/startups': {
        title: 'Startup Development Services — From Idea to Launch',
        description: 'End-to-end product development for startups: MVPs, scalable architecture, design and go-to-market support from Graham Sobiribo Paul.',
    },
    '/portfolio': {
        title: 'Portfolio — Selected Work by Graham Sobiribo Paul',
        description: 'Explore web, mobile and AI products engineered by Graham Sobiribo Paul for clients across industries.',
    },
    '/case-studies': {
        title: 'Case Studies — Real Results from Graham Sobiribo Paul',
        description: 'In-depth case studies showing how Graham Sobiribo Paul delivers measurable business outcomes through technology.',
    },
    '/blog': {
        title: 'Blog — Engineering, Design & Growth Insights',
        description: 'Practical articles on software engineering, product design, AI and digital growth from the Graham Sobiribo Paul team.',
    },
    '/careers': {
        title: 'Careers — Build the Future with Graham Sobiribo Paul',
        description: 'Join a team of engineers, designers and strategists shipping world-class digital products. See open roles at Graham Sobiribo Paul.',
    },
    '/contact': {
        title: 'Contact Graham Sobiribo Paul — Let’s Build Something',
        description: 'Reach Graham Sobiribo Paul by WhatsApp, Calendly, live chat or our contact form. Based in Port Harcourt, serving clients worldwide.',
    },
    '/partners': {
        title: 'Partner With Graham Sobiribo Paul — Join Our Ecosystem',
        description: 'Become a technology, cloud, reseller, referral or integration partner of Graham Sobiribo Paul. Apply to join our partner ecosystem powering solutions across Africa and beyond.',
        keywords: ['Graham Sobiribo Paul partners', 'technology partnership Nigeria', 'reseller program', 'integration partner', 'partner ecosystem'],
    },
    '/faq': {
        title: 'FAQ — Frequently Asked Questions | Graham Sobiribo Paul',
        description: 'Answers about Graham Sobiribo Paul\u2019s services, process, pricing, timelines and support. Find what you need or talk to our team.',
        keywords: ['Graham Sobiribo Paul FAQ', 'web development questions', 'pricing FAQ', 'support questions Nigeria'],
    },
    '/support': {
        title: 'Support — Help & Assistance | Graham Sobiribo Paul',
        description: 'Get help, open a ticket and find answers. Graham Sobiribo Paul support is here for you.',
    },
    '/open-ticket': {
        title: 'Open a Support Ticket | Graham Sobiribo Paul',
        description: 'Submit a support request and our team will get back to you quickly.',
    },
    '/quote-request': {
        title: 'Request a Quote | Graham Sobiribo Paul',
        description: 'Tell us about your project and get a tailored quote from Graham Sobiribo Paul.',
    },
    '/links': {
        title: 'Links | Graham Sobiribo Paul',
        description: 'Quick links to Graham Sobiribo Paul resources and channels.',
    },
    '/terms-conditions': {title: 'Terms & Conditions | Graham Sobiribo Paul', description: 'Terms and conditions for using Graham Sobiribo Paul services and website.', noindex: false},
    '/cookies-policy': {title: 'Cookies Policy | Graham Sobiribo Paul', description: 'How Graham Sobiribo Paul uses cookies and similar technologies.'},
    '/data-protection-policy': {title: 'Data Protection Policy | Graham Sobiribo Paul', description: 'Graham Sobiribo Paul’s data protection and privacy commitments, aligned with the NDPR.'},
    '/store': {title: 'Store — Software, Templates & Digital Products | Graham Sobiribo Paul', description: 'Browse and buy digital products, templates and tools built by Graham Sobiribo Paul.'},
};

/** Build the full registry once. */
function buildRegistry(): Record<string, SeoEntry> {
    const reg: Record<string, SeoEntry> = {...STATIC};
    for (const slug of SERVICE_SLUGS) {
        const label = serviceLabel(slug);
        reg[`/services/${slug}`] = {
            title: `${label} — Expert ${label.replace(' Development', '').replace(' Services', '')} Company`,
            description: `Professional ${label.toLowerCase()} services from Graham Sobiribo Paul. Scalable, secure and beautifully engineered solutions tailored to your business goals.`,
            keywords: [label, `${label} Nigeria`, `${label} Port Harcourt`, 'Graham Sobiribo Paul'],
        };
    }
    for (const slug of INDUSTRY_SLUGS) {
        const label = industryLabel(slug);
        reg[`/industries/${slug}`] = {
            title: `${label} Software Development — Industry Solutions`,
            description: `Custom ${label} technology solutions by Graham Sobiribo Paul. Domain-aware engineering for the ${label.toLowerCase()} sector.`,
            keywords: [`${label} software`, `${label} app development`, 'Graham Sobiribo Paul'],
        };
    }
    return reg;
}

export const SEO_REGISTRY = buildRegistry();

export function getSeo(path: string): SeoEntry {
    return (
        SEO_REGISTRY[path] || {
            title: titleize(path.replace(/^\//, '') || 'Graham Sobiribo Paul'),
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
