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
        body: `Grey InfoTech Limited is a web design, web & mobile app development, AI and digital marketing agency based in Port Harcourt, Nigeria. Founded in 2017, we've delivered 50+ projects across 15+ industries. We build scalable, user-centered digital products for startups and enterprises — from discovery and UI/UX through engineering, launch, and growth. We're 8+ years into the tech industry with expertise in helping founders validate ideas, build MVPs, scale infrastructure, and successfully exit.`,
        tags: ['who are you', 'about', 'company', 'agency', 'location', 'where', 'founded', 'experience'],
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
        body: `You can reach Grey InfoTech via the contact page, by email at hello@greyinfotech.com.ng, or on WhatsApp at +234-802-809-5571. We're based in Port Harcourt, Nigeria and work with clients worldwide. For urgent matters, WhatsApp is fastest.`,
        tags: ['contact', 'reach', 'email', 'phone', 'whatsapp', 'talk', 'call', 'get in touch', 'urgent'],
    },
    {
        title: 'Support & Tickets',
        url: '/support',
        body: `Existing clients can open a support ticket for help with live projects. Use the support page or open a ticket and our team will respond within 24 hours.`,
        tags: ['support', 'help', 'ticket', 'issue', 'problem', 'bug', 'urgent support'],
    },
    {
        title: 'Web Design & Development Services',
        url: '/services/Web-Design',
        body: `We design and build fast, responsive, SEO-friendly websites and web apps including marketing sites, dashboards, e-commerce, and complex platforms. Our approach centers on user experience, strategic design, and proven conversion tactics. Stacks include Next.js, React, Vue, Node.js, Laravel, Tailwind CSS, and more — all optimized for performance, accessibility, and SEO.`,
        tags: ['website', 'web design', 'web development', 'landing page', 'web app', 'seo-friendly', 'performance'],
    },
    {
        title: 'Web Application Development',
        url: '/services/Web-Application',
        body: `We build custom web applications from concept through launch. Our process includes user research, wireframing, prototyping, design, development, testing, and deployment. Tech stacks vary: React + Node.js, Next.js + PostgreSQL, Vue + Django, Laravel + MySQL. Every app is built for scalability, security, and long-term maintenance.`,
        tags: ['web app', 'application', 'custom software', 'saas', 'dashboard', 'platform', 'development'],
    },
    {
        title: 'Tech Stack & Technologies',
        url: '/services/Software-Development',
        body: `We're proficient in: Frontend (React, Next.js, Vue, Angular, Tailwind CSS, Framer Motion), Backend (Node.js, Express, Django, Django Rest Framework, Laravel, Ruby on Rails, .NET), Mobile (React Native, Flutter, Swift, Kotlin, Expo), Databases (PostgreSQL, MongoDB, MySQL, Firebase), Cloud (AWS, GCP, Vercel, Netlify), AI/ML (OpenAI, LangChain, RAG, computer vision), Blockchain (Solidity, Web3.js, ERC standards), and DevOps (Docker, Kubernetes, CI/CD).`,
        tags: ['tech stack', 'technologies', 'frameworks', 'languages', 'tools', 'react', 'node', 'flutter', 'django'],
    },
    {
        title: 'AI Development Services',
        url: '/services/ai-development-services',
        body: `We build custom AI solutions including: AI chatbots and assistants, RAG knowledge systems and semantic search, LLM integrations, recommendation engines, computer vision, predictive analytics, and workflow automation. We work with OpenAI, Claude, Gemini, and open-source models. We can fine-tune models and build custom training pipelines.`,
        tags: ['ai', 'artificial intelligence', 'chatbot', 'machine learning', 'llm', 'automation', 'gpt', 'openai', 'chatgpt', 'rag'],
    },
    {
        title: 'Discovery & Strategy Phase',
        url: '/services/discovery-phase',
        body: `Our discovery phase ensures alignment before you spend on engineering. We conduct workshops, user interviews, competitive analysis, and technical feasibility assessments to define clear goals, validate assumptions, and create a roadmap. Typical discovery is 2-4 weeks and delivers a scope document, wireframes, technical architecture, timeline and cost estimate.`,
        tags: ['discovery', 'strategy', 'planning', 'requirements', 'roadmap', 'scope', 'feasibility'],
    },
    {
        title: 'Why Choose Grey InfoTech',
        url: '/',
        body: `Grey InfoTech brings 8+ years of proven expertise, 50+ successful projects, and deep understanding of startup challenges. We're committed to transparency, clear communication, and delivering measurable results. We don't just build features—we build scalable, user-centric products that drive real business growth. Client testimonials and case studies prove our track record across fintech, healthcare, logistics, education, and enterprise SaaS.`,
        tags: ['why choose', 'benefits', 'advantages', 'why us', 'commitment', 'quality', 'reliability'],
    },
    {
        title: 'Project Timeline & Process',
        url: '/',
        body: `Typical project timeline: 2-week discovery, 4-12 week engineering phase (depending on scope), 2-week testing/refinement, 1 week deployment. We follow agile methodology with bi-weekly demos, clear deliverables, and collaborative feedback loops. You own the product; we ensure quality, security, and maintainability at every step.`,
        tags: ['timeline', 'duration', 'process', 'methodology', 'how long', 'agile', 'sprints'],
    },
    {
        title: 'Team & Expertise',
        url: '/careers',
        body: `Our team includes senior full-stack engineers, product designers, mobile specialists, DevOps engineers, and growth marketers. All team members are vetted for technical depth and client communication skills. We work with extended partner networks for specialized services (blockchain audits, ML research, etc.) when needed.`,
        tags: ['team', 'engineers', 'designers', 'developers', 'expertise', 'hiring', 'staff'],
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
export function retrieve(query: string, k = 3, extra: KbDoc[] = []): RetrievedDoc[] {
    const q = query.toLowerCase();
    const qTokens = new Set(tokenize(query));

    const corpus = extra.length ? [...KB, ...extra] : KB;
    const scored = corpus.map((doc) => {
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
export function localAnswer(
    query: string,
    extra: KbDoc[] = [],
): {
    answer: string;
    sources: {title: string; url: string}[];
} {
    const matches = retrieve(query, 3, extra);
    const sources = matches.map((m) => ({title: m.title, url: m.url}));

    if (!matches.length) {
        return {
            answer: `Not sure on that one. Reach the team at ${COMPANY.email} or WhatsApp ${COMPANY.whatsapp}.`,
            sources,
        };
    }

    // Keep it short and answer-first. FAQ docs store "question\nanswer", so
    // drop a leading question line and reply with the answer itself.
    const answer = brief(answerText(matches[0].text), 1, 200);
    return {answer, sources};
}

/**
 * If the doc text is a "question\nanswer" pair (FAQ shape), return just the
 * answer so the assistant responds directly instead of echoing the question.
 */
function answerText(text: string): string {
    const nl = (text || '').indexOf('\n');
    if (nl === -1) return text;
    const first = text.slice(0, nl).trim();
    const rest = text.slice(nl + 1).trim();
    // Treat the first line as a question if it ends with "?" or is short.
    if (rest && (first.endsWith('?') || first.length < 100)) return rest;
    return text;
}

/**
 * Trim text to the first `maxSentences` sentences and a hard character cap so
 * the no-LLM fallback stays short and to the point.
 */
function brief(text: string, maxSentences = 2, maxChars = 320): string {
    const clean = (text || '').replace(/\s+/g, ' ').trim();
    const parts = clean.match(/[^.!?]+[.!?]+/g);
    let out = parts ? parts.slice(0, maxSentences).join(' ').trim() : clean;
    if (out.length > maxChars) out = out.slice(0, maxChars - 1).trimEnd() + '…';
    return out || clean.slice(0, maxChars);
}

export const SYSTEM_PROMPT = `You are "Grey AI", the friendly, concise assistant for ${COMPANY.legalName}, a web/mobile/AI development and digital marketing agency in ${COMPANY.location}.

Rules:
- Answer ONLY using the provided CONTEXT about Grey InfoTech. If the context doesn't cover it, say you're not sure and point the user to ${COMPANY.email} or WhatsApp ${COMPANY.whatsapp}.
- BE BRIEF: 1-2 short sentences, max ~40 words. Get straight to the point. No filler, no preamble, no repeating the question.
- One link max, only if it clearly helps (a path like /services/... or /contact).
- Never invent pricing, clients, or guarantees. For pricing, say it depends on scope and point to /quote-request.
- For complex/sales questions, briefly offer the contact options.`;
