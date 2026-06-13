/**
 * Grey AI knowledge base (lightweight RAG corpus).
 *
 * This is the grounding context for the AI assistant. Each "doc" is a short,
 * self-contained chunk with a title + url so the assistant can cite a source
 * the user can click. Keep chunks small and factual — they double as the
 * retrieval index AND the system grounding for the LLM.
 *
 * NOTE: This is intentionally hand-curated (not scraped) so answers stay
 * accurate and on-brand. Add/adjust chunks as the site evolves.
 */

export interface KbDoc {
    title: string;
    url: string;
    /** Plain-text body used for both retrieval and LLM grounding. */
    body: string;
    /** Extra retrieval hints (synonyms/keywords) not necessarily in the body. */
    tags?: string[];
}

export const COMPANY = {
    name: 'Grey InfoTech',
    legalName: 'Grey InfoTech Limited',
    location: 'Port Harcourt, Nigeria',
    email: 'hello@greyinfotech.com.ng',
    whatsapp: '+234-802-809-5571',
    url: 'https://greyinfotech.com.ng',
};

export const KB: KbDoc[] = [
    {
        title: 'About Grey InfoTech',
        url: '/company',
        body: `Grey InfoTech Limited is a web design, web & mobile app development, and digital marketing agency based in Port Harcourt, Nigeria. We build scalable, user-centered digital products for startups and enterprises — from discovery and UI/UX through engineering, launch, and growth.`,
        tags: ['who are you', 'about', 'company', 'agency', 'location', 'where'],
    },
    {
        title: 'Services Overview',
        url: '/services/Software-Development',
        body: `Our core services include Web Design, Web Development, Web Applications, Mobile App Development (iOS, Android, React Native, Flutter), UI/UX Design, Branding, MVP Development, Software Development, AI Development, Blockchain, IoT, Unity/game development, plus Digital Marketing, SEO, and App Store Optimization. We work across React, Next.js, Node.js, Vue, Angular, Laravel/PHP, Python, Ruby on Rails, and .NET.`,
        tags: ['services', 'what do you do', 'offer', 'capabilities', 'tech stack'],
    },
    {
        title: 'Mobile App Development',
        url: '/services/Mobile-Application-Development',
        body: `Yes — we build native and cross-platform mobile apps for iOS and Android using React Native, Flutter, Swift, and Kotlin. We handle product design, development, App Store / Play Store submission, and post-launch support.`,
        tags: ['mobile', 'app', 'ios', 'android', 'react native', 'flutter', 'play store', 'app store'],
    },
    {
        title: 'Web Design & Development',
        url: '/services/Web-Design',
        body: `We design and build fast, responsive, SEO-friendly websites and web apps — marketing sites, dashboards, e-commerce, and complex platforms. Stacks include Next.js, React, Vue, Node.js, Laravel and more, with accessibility and performance built in.`,
        tags: ['website', 'web design', 'web development', 'landing page', 'web app'],
    },
    {
        title: 'AI Development Services',
        url: '/services/ai-development-services',
        body: `We build AI-powered features and products: chatbots and assistants, RAG knowledge systems, recommendation engines, computer vision, and LLM integrations into existing apps. We can also automate internal workflows.`,
        tags: ['ai', 'artificial intelligence', 'chatbot', 'machine learning', 'llm', 'automation'],
    },
    {
        title: 'UI/UX Design',
        url: '/services/ui-ux-design',
        body: `Our design team handles user research, wireframing, prototyping, and high-fidelity UI design, plus design systems and usability testing — focused on conversion and clarity.`,
        tags: ['design', 'ux', 'ui', 'prototype', 'figma', 'branding'],
    },
    {
        title: 'Digital Marketing & SEO',
        url: '/services/digital-marketing',
        body: `We grow brands with SEO, content, paid ads, social media, and analytics. Our SEO work covers technical SEO, on-page optimization, and local SEO for Nigerian and international markets.`,
        tags: ['marketing', 'seo', 'ads', 'social media', 'growth', 'leads'],
    },
    {
        title: 'MVP Development',
        url: '/services/MVP',
        body: `We help startups go from idea to a launch-ready MVP quickly, with a discovery phase, lean scope, and a clear roadmap so you can validate with real users and raise/scale.`,
        tags: ['mvp', 'startup', 'prototype', 'validate', 'launch fast'],
    },
    {
        title: 'Industries We Serve',
        url: '/industries/fintech',
        body: `We have delivered solutions across fintech, healthcare, logistics, e-commerce/retail, education, real estate, SaaS, oil & gas, travel & hospitality, HR tech, biotech, music, on-demand and automation.`,
        tags: ['industries', 'fintech', 'healthcare', 'logistics', 'ecommerce', 'education', 'saas'],
    },
    {
        title: 'Pricing & Estimates',
        url: '/quote-request',
        body: `Project cost depends on scope, complexity, and timeline. A simple marketing website typically starts lower, while custom web/mobile apps and platforms are quoted per scope. The fastest way to get an accurate number is to request a quote or use our AI Project Estimator — we'll respond with a tailored estimate.`,
        tags: ['price', 'cost', 'pricing', 'how much', 'budget', 'quote', 'estimate', 'rate'],
    },
    {
        title: 'Online Store',
        url: '/store',
        body: `Grey InfoTech also runs an online store where you can browse and buy products and digital services, manage a cart and wishlist, compare items, and track orders from your account.`,
        tags: ['store', 'shop', 'buy', 'cart', 'order', 'product', 'ecommerce'],
    },
    {
        title: 'Portfolio & Case Studies',
        url: '/case-studies',
        body: `See examples of our work and measurable outcomes across healthcare, logistics, fintech, education and enterprise SaaS in our case studies and portfolio.`,
        tags: ['portfolio', 'case study', 'work', 'examples', 'projects', 'clients'],
    },
    {
        title: 'Careers',
        url: '/careers',
        body: `Interested in joining Grey InfoTech? Check our careers page for open roles across engineering, design and marketing.`,
        tags: ['careers', 'jobs', 'hiring', 'work with us', 'vacancy', 'apply'],
    },
    {
        title: 'Contact Grey InfoTech',
        url: '/contact',
        body: `You can reach Grey InfoTech via the contact page, by email at hello@greyinfotech.com.ng, or on WhatsApp at +234-802-809-5571. We're based in Port Harcourt, Nigeria and work with clients worldwide.`,
        tags: ['contact', 'reach', 'email', 'phone', 'whatsapp', 'talk', 'call', 'get in touch'],
    },
    {
        title: 'Support & Tickets',
        url: '/support',
        body: `Existing clients can open a support ticket for help with live projects. Use the support page or open a ticket and our team will respond.`,
        tags: ['support', 'help', 'ticket', 'issue', 'problem'],
    },
];

const STOP = new Set([
    'the', 'a', 'an', 'is', 'are', 'do', 'does', 'you', 'your', 'we', 'i', 'me', 'my',
    'to', 'of', 'and', 'or', 'for', 'in', 'on', 'at', 'with', 'how', 'what', 'can',
    'much', 'about', 'tell', 'please', 'would', 'could', 'will', 'this', 'that', 'it',
    'have', 'has', 'get', 'want', 'need', 'be', 'as', 'by', 'from', 'there',
]);

function tokenize(s: string): string[] {
    return s
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, ' ')
        .split(/\s+/)
        .filter((w) => w.length > 1 && !STOP.has(w));
}

/** Flat retrieval hit shape consumed by the App Router route handler. */
export interface RetrievedDoc {
    title: string;
    url: string;
    text: string;
    score: number;
}

/**
 * Score each KB doc against the query (keyword overlap + tag boosting +
 * phrase bonus). Returns the top matches as FLAT docs ({title,url,text,score}).
 */
export function retrieve(query: string, k = 3): RetrievedDoc[] {
    const q = query.toLowerCase();
    const qTokens = new Set(tokenize(query));

    const scored = KB.map((doc) => {
        const haystack = (doc.title + ' ' + doc.body + ' ' + (doc.tags || []).join(' ')).toLowerCase();
        const docTokens = tokenize(haystack);
        let score = 0;
        for (const t of docTokens) if (qTokens.has(t)) score += 1;
        // Tag phrase bonus: a multi-word tag appearing verbatim is a strong signal.
        for (const tag of doc.tags || []) {
            if (q.includes(tag)) score += tag.includes(' ') ? 4 : 2;
        }
        // Title token bonus.
        for (const t of tokenize(doc.title)) if (qTokens.has(t)) score += 1;
        return {doc, score};
    });

    return scored
        .filter((s) => s.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, k)
        .map(({doc, score}) => ({title: doc.title, url: doc.url, text: doc.body, score}));
}

/** Build a grounding context string for the LLM from retrieved docs. */
export function buildContext(matches: RetrievedDoc[]): string {
    if (!matches.length) {
        return KB.slice(0, 4)
            .map((d) => `[${d.title}] (${d.url})\n${d.body}`)
            .join('\n\n');
    }
    return matches.map((m) => `[${m.title}] (${m.url})\n${m.text}`).join('\n\n');
}

/**
 * Deterministic, no-LLM answer used as a high-quality fallback when no AI key
 * is configured (or the LLM call fails). Grounded purely in retrieved KB.
 * Returns both the prose answer and the citable sources.
 */
export function localAnswer(query: string): {
    answer: string;
    sources: {title: string; url: string}[];
} {
    const matches = retrieve(query, 3);
    const sources = matches.map((m) => ({title: m.title, url: m.url}));

    if (!matches.length) {
        return {
            answer: `I can help with our services, pricing, industries, the online store, and how to get in touch. Could you rephrase that? You can also reach the team directly at ${COMPANY.email} or on WhatsApp ${COMPANY.whatsapp}.`,
            sources,
        };
    }

    let answer = matches[0].text;
    if (matches[1]) {
        answer += ` You might also find this useful: ${matches[1].title} — see ${matches[1].url}.`;
    }
    answer += ` Want specifics? Tell me about your project, or reach us at ${COMPANY.email} / WhatsApp ${COMPANY.whatsapp}.`;
    return {answer, sources};
}

export const SYSTEM_PROMPT = `You are "Grey AI", the friendly, concise assistant for ${COMPANY.legalName}, a web/mobile/AI development and digital marketing agency in ${COMPANY.location}.

Rules:
- Answer ONLY using the provided CONTEXT about Grey InfoTech. If the context doesn't cover it, say you're not sure and point the user to ${COMPANY.email} or WhatsApp ${COMPANY.whatsapp}.
- Be warm, brief, and helpful (2-5 sentences). Use plain language.
- When relevant, suggest the most useful page (a path like /services/... or /contact).
- Never invent pricing numbers, clients, or guarantees not in the context. For pricing, explain it depends on scope and steer them to /quote-request.
- You are NOT a replacement for the human team; for complex/sales questions, offer the contact options or live chat.`;
