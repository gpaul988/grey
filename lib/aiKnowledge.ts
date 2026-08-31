/**
 * Grey AI knowledge base (lightweight RAG corpus).
 *
 * Each doc is a short self-contained chunk with title + url so the assistant
 * can cite a source. The `localAnswer` function below is a smart rule-based
 * fallback that runs without any LLM key — it reads intent, picks the best
 * docs, and composes a full, natural answer.
 */

export interface KbDoc {
    title: string;
    url: string;
    body: string;
    tags?: string[];
}

export const COMPANY = {
    name: 'Grey InfoTech',
    legalName: 'Grey InfoTech',
    location: 'Port Harcourt, Nigeria',
    email: 'hello@greyinfotech.com.ng',
    whatsapp: '+234-802-809-5571',
    url: 'https://greyinfotech.com.ng',
};

export const KB: KbDoc[] = [
    {
        title: 'About Grey InfoTech',
        url: '/company',
        body: `Grey InfoTech is a web design, web & mobile app development, AI and digital marketing agency based in Port Harcourt, Nigeria. Founded in 2017, we've delivered 50+ projects across 15+ industries. We build scalable, user-centered digital products for startups and enterprises — from discovery and UI/UX through engineering, launch, and growth. We have 8+ years of industry experience helping founders validate ideas, build MVPs, scale infrastructure, and successfully exit.`,
        tags: ['who are you', 'about', 'company', 'agency', 'location', 'where', 'founded', 'experience', 'history'],
    },
    {
        title: 'Services Overview',
        url: '/services/Software-Development',
        body: `Our core services include: Web Design & Development, Web Applications, Mobile App Development (iOS, Android, React Native, Flutter), UI/UX Design, Branding, MVP Development, Software Development, AI Development, Blockchain, IoT, Unity/Game Development, Digital Marketing, SEO, and App Store Optimization. We work across React, Next.js, Node.js, Vue, Angular, Laravel/PHP, Python, Ruby on Rails, and .NET.`,
        tags: ['services', 'what do you do', 'offer', 'capabilities', 'tech stack', 'list'],
    },
    {
        title: 'Web Design & Development',
        url: '/services/Web-Design',
        body: `We design and build fast, responsive, SEO-friendly websites and web apps — marketing sites, dashboards, e-commerce, and complex platforms. Our approach is user-centered and conversion-focused. Stacks include Next.js, React, Vue, Node.js, Laravel, Tailwind CSS — all optimized for performance, accessibility, and SEO.`,
        tags: ['website', 'web design', 'web development', 'landing page', 'web app', 'seo', 'responsive'],
    },
    {
        title: 'Web Application Development',
        url: '/services/Web-Application',
        body: `We build custom web applications from concept through launch — dashboards, SaaS platforms, portals, and enterprise tools. Our process: user research → wireframing → UI/UX design → development → testing → deployment. Stacks: React + Node.js, Next.js + PostgreSQL, Vue + Django, Laravel + MySQL. Every app is built for scalability, security, and long-term maintainability.`,
        tags: ['web app', 'application', 'custom software', 'saas', 'dashboard', 'platform', 'portal'],
    },
    {
        title: 'Mobile App Development',
        url: '/services/Mobile-Application-Development',
        body: `We build native and cross-platform mobile apps for iOS and Android using React Native, Flutter, Swift, and Kotlin. We handle everything: product design, development, App Store & Play Store submission, and post-launch support. Whether you need a consumer app or enterprise mobile solution, we deliver high-quality results.`,
        tags: ['mobile', 'app', 'ios', 'android', 'react native', 'flutter', 'play store', 'app store', 'smartphone'],
    },
    {
        title: 'AI Development Services',
        url: '/services/ai-development-services',
        body: `We build custom AI solutions: chatbots and virtual assistants, RAG knowledge systems, LLM integrations, recommendation engines, computer vision, predictive analytics, and workflow automation. We work with OpenAI, Claude, Gemini, and open-source models, and can fine-tune models or build full custom training pipelines.`,
        tags: ['ai', 'artificial intelligence', 'chatbot', 'machine learning', 'llm', 'automation', 'gpt', 'openai', 'rag', 'bot'],
    },
    {
        title: 'UI/UX Design',
        url: '/services/ui-ux-design',
        body: `Our design team delivers end-to-end UX/UI: user research, wireframing, prototyping, high-fidelity UI design, design systems, and usability testing. We design for conversion, clarity, and delight — using Figma and modern design principles to create interfaces that users love and businesses grow with.`,
        tags: ['design', 'ux', 'ui', 'prototype', 'figma', 'wireframe', 'user experience', 'interface'],
    },
    {
        title: 'Digital Marketing & SEO',
        url: '/services/digital-marketing',
        body: `We grow brands digitally: technical SEO, on-page and local SEO, content marketing, paid ads (Google & Meta), social media strategy, and analytics. Our SEO work targets Nigerian and international markets. We measure everything and optimise for real business outcomes — not vanity metrics.`,
        tags: ['marketing', 'seo', 'ads', 'social media', 'growth', 'leads', 'google ads', 'meta ads', 'content'],
    },
    {
        title: 'Branding & Brand Management',
        url: '/services/branding',
        body: `We build strong brand identities: logo design, color systems, typography, brand voice, messaging, and positioning. From visual identity to full brand guidelines, we help businesses stand out in crowded markets and create lasting connections with their audience.`,
        tags: ['branding', 'logo', 'brand', 'identity', 'design', 'visual', 'colour', 'typography'],
    },
    {
        title: 'MVP Development',
        url: '/services/MVP',
        body: `We help startups go from idea to a launch-ready MVP fast — with a discovery phase, lean scope, and a clear roadmap so you can validate with real users and raise funding or scale. We've helped multiple funded startups launch and exit successfully.`,
        tags: ['mvp', 'startup', 'prototype', 'validate', 'launch fast', 'minimum viable product', 'idea'],
    },
    {
        title: 'Discovery & Strategy Phase',
        url: '/services/discovery-phase',
        body: `Our discovery phase aligns strategy before you spend on engineering. We run workshops, user interviews, competitive analysis, and technical feasibility assessments to define goals, validate assumptions, and create a roadmap. Typical discovery is 2–4 weeks and delivers: scope document, wireframes, technical architecture, timeline, and cost estimate.`,
        tags: ['discovery', 'strategy', 'planning', 'requirements', 'roadmap', 'scope', 'feasibility', 'workshop'],
    },
    {
        title: 'Tech Stack & Technologies',
        url: '/services/Software-Development',
        body: `Frontend: React, Next.js, Vue, Angular, Tailwind CSS, Framer Motion. Backend: Node.js, Express, Django, Laravel, Ruby on Rails, .NET. Mobile: React Native, Flutter, Swift, Kotlin, Expo. Databases: PostgreSQL, MongoDB, MySQL, Firebase. Cloud: AWS, GCP, Vercel, Netlify. AI/ML: OpenAI, LangChain, RAG, computer vision. Blockchain: Solidity, Web3.js. DevOps: Docker, Kubernetes, CI/CD pipelines.`,
        tags: ['tech stack', 'technologies', 'frameworks', 'languages', 'tools', 'react', 'node', 'flutter', 'django', 'nextjs', 'vue'],
    },
    {
        title: 'Pricing & Estimates',
        url: '/quote-request',
        body: `Project cost depends on scope, complexity, features, and timeline. A simple marketing website starts lower than a full custom web or mobile app. The fastest way to get an accurate number is to request a quote or use our AI Project Estimator on the site — we respond with a tailored estimate within 24 hours.`,
        tags: ['price', 'cost', 'pricing', 'how much', 'budget', 'quote', 'estimate', 'rate', 'fee', 'charge', 'affordable'],
    },
    {
        title: 'Project Timeline & Process',
        url: '/',
        body: `Typical timeline: 2-week discovery → 4–12 weeks engineering (scope-dependent) → 2 weeks testing/refinement → 1 week deployment. We use agile methodology with bi-weekly demos, clear deliverables, and collaborative feedback loops. You own the product; we ensure quality, security, and maintainability at every step.`,
        tags: ['timeline', 'duration', 'process', 'methodology', 'how long', 'agile', 'sprints', 'delivery', 'schedule'],
    },
    {
        title: 'Industries We Serve',
        url: '/industries/fintech',
        body: `We've delivered solutions across: Fintech, Healthcare, Logistics, E-commerce & Retail, Education (EdTech), Real Estate, SaaS, Oil & Gas, Travel & Hospitality, HR Tech, Biotech, Music & Entertainment, On-Demand platforms, and Automation. We understand the unique challenges of each sector and build accordingly.`,
        tags: ['industries', 'fintech', 'healthcare', 'logistics', 'ecommerce', 'education', 'saas', 'oil gas', 'real estate', 'sector'],
    },
    {
        title: 'Why Choose Grey InfoTech',
        url: '/',
        body: `Grey InfoTech brings 8+ years of proven expertise, 50+ successful projects, and deep understanding of startup and enterprise challenges. We're transparent, communicative, and committed to measurable results. We don't just build features — we build scalable products that drive real business growth. Our track record spans fintech, healthcare, logistics, education, and enterprise SaaS.`,
        tags: ['why choose', 'benefits', 'advantages', 'why us', 'commitment', 'quality', 'reliability', 'best', 'trust', 'choose'],
    },
    {
        title: 'Team & Expertise',
        url: '/careers',
        body: `Our team includes senior full-stack engineers, product designers, mobile specialists, DevOps engineers, and growth marketers — all vetted for technical depth and client communication skills. We extend with partner networks for blockchain audits, ML research, and specialist services when needed.`,
        tags: ['team', 'engineers', 'designers', 'developers', 'expertise', 'staff', 'who builds', 'skilled'],
    },
    {
        title: 'Portfolio & Case Studies',
        url: '/case-studies',
        body: `See our work and measurable outcomes across healthcare, logistics, fintech, education, and enterprise SaaS in our case studies. We've successfully launched and scaled products from zero to thousands of users across Nigeria, Africa, and globally.`,
        tags: ['portfolio', 'case study', 'work', 'examples', 'projects', 'clients', 'results', 'past work'],
    },
    {
        title: 'Contact Grey InfoTech',
        url: '/contact',
        body: `Reach us via the contact page, by email at hello@greyinfotech.com.ng, or on WhatsApp at +234-802-809-5571. We're based in Port Harcourt, Nigeria and work with clients worldwide. For fastest response, WhatsApp is best. We typically reply within a few hours.`,
        tags: ['contact', 'reach', 'email', 'phone', 'whatsapp', 'talk', 'call', 'get in touch', 'urgent', 'message'],
    },
    {
        title: 'Support & Tickets',
        url: '/support',
        body: `Existing clients can open a support ticket on our support page. Our team responds within 24 hours. For urgent production issues, WhatsApp +234-802-809-5571 is fastest.`,
        tags: ['support', 'help', 'ticket', 'issue', 'problem', 'bug', 'urgent support', 'existing client', 'maintenance'],
    },
    {
        title: 'Careers at Grey InfoTech',
        url: '/careers',
        body: `Interested in joining Grey InfoTech? Check our careers page for open roles across engineering, design, and marketing. We look for talented, driven people who care about craft and client outcomes.`,
        tags: ['careers', 'jobs', 'hiring', 'work with us', 'vacancy', 'apply', 'join', 'opening'],
    },
    {
        title: 'Online Store',
        url: '/store',
        body: `Grey InfoTech runs an online store where you can browse and buy digital products and services, manage a cart and wishlist, compare items, and track orders from your account.`,
        tags: ['store', 'shop', 'buy', 'cart', 'order', 'product', 'ecommerce', 'purchase'],
    },
];

// ─── Retrieval ────────────────────────────────────────────────────────────────

const STOP = new Set([
    'the', 'a', 'an', 'is', 'are', 'do', 'does', 'you', 'your', 'we', 'i', 'me', 'my',
    'to', 'of', 'and', 'or', 'for', 'in', 'on', 'at', 'with', 'how', 'what', 'can',
    'much', 'about', 'tell', 'please', 'would', 'could', 'will', 'this', 'that', 'it',
    'have', 'has', 'get', 'want', 'need', 'be', 'as', 'by', 'from', 'there', 'hi',
    'hello', 'hey', 'thanks', 'thank', 'okay', 'ok', 'yes', 'no', 'sure', 'right',
]);

function tokenize(s: string): string[] {
    return s
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, ' ')
        .split(/\s+/)
        .filter((w) => w.length > 1 && !STOP.has(w));
}

export interface RetrievedDoc {
    title: string;
    url: string;
    text: string;
    score: number;
}

export function retrieve(query: string, k = 4, extra: KbDoc[] = []): RetrievedDoc[] {
    const q = query.toLowerCase();
    const qTokens = new Set(tokenize(query));
    const corpus = extra.length ? [...KB, ...extra] : KB;

    const scored = corpus.map((doc) => {
        const haystack = `${doc.title} ${doc.body} ${(doc.tags || []).join(' ')}`.toLowerCase();
        const docTokens = tokenize(haystack);
        let score = 0;

        // Token overlap
        for (const t of docTokens) if (qTokens.has(t)) score += 1;

        // Tag phrase bonus — verbatim multi-word tag = strong intent match
        for (const tag of doc.tags || []) {
            if (q.includes(tag)) score += tag.split(' ').length > 1 ? 6 : 3;
        }

        // Title token bonus
        for (const t of tokenize(doc.title)) if (qTokens.has(t)) score += 2;

        // Bigram bonus — adjacent pairs boost specificity
        const qWords = q.replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(Boolean);
        for (let i = 0; i < qWords.length - 1; i++) {
            const bigram = `${qWords[i]} ${qWords[i + 1]}`;
            if (haystack.includes(bigram)) score += 3;
        }

        return { doc, score };
    });

    return scored
        .filter((s) => s.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, k)
        .map(({ doc, score }) => ({ title: doc.title, url: doc.url, text: doc.body, score }));
}

export function buildContext(matches: RetrievedDoc[]): string {
    if (!matches.length) {
        return KB.slice(0, 4).map((d) => `[${d.title}] (${d.url})\n${d.body}`).join('\n\n');
    }
    return matches.map((m) => `[${m.title}] (${m.url})\n${m.text}`).join('\n\n');
}

// ─── Intent detection ─────────────────────────────────────────────────────────

type Intent =
    | 'greeting'
    | 'services'
    | 'pricing'
    | 'contact'
    | 'mobile'
    | 'web'
    | 'ai'
    | 'marketing'
    | 'branding'
    | 'mvp'
    | 'timeline'
    | 'tech'
    | 'team'
    | 'portfolio'
    | 'why'
    | 'industries'
    | 'support'
    | 'careers'
    | 'about'
    | 'store'
    | 'discovery'
    | 'unknown';

function detectIntent(q: string): Intent {
    const t = q.toLowerCase();

    // Greeting
    if (/^(hi|hello|hey|good (morning|afternoon|evening)|howdy|sup|greetings|yo)\b/.test(t)) return 'greeting';

    // Pricing
    if (/price|cost|how much|budget|quote|estimate|charge|fee|afford|rate|cheap|expensive/.test(t)) return 'pricing';

    // Contact
    if (/contact|reach|email|phone|whatsapp|call|get in touch|talk to|speak to|message/.test(t)) return 'contact';

    // Support
    if (/support|ticket|bug|issue|problem|help|broken|not working|maintenance|fix/.test(t)) return 'support';

    // Mobile
    if (/mobile|android|ios|iphone|app store|play store|react native|flutter|swift|kotlin/.test(t)) return 'mobile';

    // AI
    if (/\bai\b|artificial intelligence|chatbot|machine learning|llm|gpt|openai|automation|rag|nlp|bot/.test(t)) return 'ai';

    // Marketing / SEO
    if (/marketing|seo|ads|social media|google ads|meta ads|leads|content|growth|rank/.test(t)) return 'marketing';

    // Branding
    if (/brand|logo|identity|visual|colour|color|typography/.test(t)) return 'branding';

    // MVP
    if (/mvp|startup|validate|launch fast|minimum viable|idea|early stage|founder/.test(t)) return 'mvp';

    // Web
    if (/website|web design|web dev|landing page|web app|dashboard|portal|saas|ecommerce|e-commerce/.test(t)) return 'web';

    // Timeline / process
    if (/how long|timeline|duration|process|methodology|agile|sprint|delivery|schedule|take/.test(t)) return 'timeline';

    // Tech stack
    if (/tech stack|framework|language|tools|react|node|vue|django|laravel|nextjs|flutter|postgres|docker/.test(t)) return 'tech';

    // Team
    if (/team|who builds|staff|developer|designer|engineer|people|hire/.test(t)) return 'team';

    // Portfolio / past work
    if (/portfolio|case study|examples|past work|projects|clients|results|built/.test(t)) return 'portfolio';

    // Why choose
    if (/why (you|choose|grey|use|pick)|why should|reason|advantage|benefit|different|better/.test(t)) return 'why';

    // Industries
    if (/industr|fintech|healthcare|logistics|education|real estate|oil|hospitality|hr tech|ecommerce/.test(t)) return 'industries';

    // Careers
    if (/career|job|hiring|vacancy|apply|join|opening|intern/.test(t)) return 'careers';

    // About
    if (/who are you|about|company|founded|history|location|where are/.test(t)) return 'about';

    // Store
    if (/store|shop|buy|purchase|cart|order|product/.test(t)) return 'store';

    // Discovery
    if (/discovery|strategy|planning|requirements|roadmap|scope|feasibility|workshop/.test(t)) return 'discovery';

    // Services (generic)
    if (/service|what do you|what can you|offer|capability|provide|build|create|develop|make/.test(t)) return 'services';

    return 'unknown';
}

// ─── Smart fallback answer composer ──────────────────────────────────────────

/**
 * Compose a full, natural, on-brand answer from the KB without any LLM.
 * Intent-driven: picks the right doc(s) and writes a structured response.
 */
export function localAnswer(
    query: string,
    extra: KbDoc[] = [],
): { answer: string; sources: { title: string; url: string }[] } {
    const intent = detectIntent(query);
    const matches = retrieve(query, 4, extra);
    const sources = matches.slice(0, 2).map((m) => ({ title: m.title, url: m.url }));

    switch (intent) {
        case 'greeting':
            return {
                answer: `Hi there! I'm Grey AI, the assistant for Grey InfoTech. We're a web, mobile, and AI development agency based in Port Harcourt, Nigeria — 8+ years in, 50+ projects delivered. How can I help you today? You can ask me about our services, pricing, process, or anything else.`,
                sources: [{ title: 'About Grey InfoTech', url: '/company' }],
            };

        case 'about':
            return {
                answer: `Grey InfoTech is a web design, mobile app development, AI, and digital marketing agency based in Port Harcourt, Nigeria. Founded in 2017, we've delivered 50+ projects across 15+ industries — helping startups and enterprises build scalable digital products. You can learn more on our company page.`,
                sources: [{ title: 'About Grey InfoTech', url: '/company' }],
            };

        case 'services':
            return {
                answer: `We offer a full range of digital services: Web Design & Development, Web Applications, Mobile Apps (iOS & Android), UI/UX Design, AI Development, Branding, Digital Marketing & SEO, MVP Development, and Discovery & Strategy. Whatever you're building — from a landing page to a complex SaaS platform — we've got you covered. See all services →`,
                sources: [{ title: 'Services Overview', url: '/services/Software-Development' }],
            };

        case 'pricing':
            return {
                answer: `Pricing depends on scope, features, complexity, and timeline — so every project gets a tailored quote. A simple marketing website costs less than a full custom web or mobile app. The fastest way to get a number: request a quote at /quote-request or use our AI Project Estimator on the site. We respond within 24 hours.`,
                sources: [{ title: 'Get a Quote', url: '/quote-request' }],
            };

        case 'contact':
            return {
                answer: `You can reach us in a few ways: Email → hello@greyinfotech.com.ng | WhatsApp → +234-802-809-5571 (fastest) | Or use the contact form at /contact. We're based in Port Harcourt, Nigeria and work with clients worldwide. We typically respond within a few hours.`,
                sources: [{ title: 'Contact Us', url: '/contact' }],
            };

        case 'mobile':
            return {
                answer: `Yes — we build native and cross-platform mobile apps for iOS and Android using React Native, Flutter, Swift, and Kotlin. We handle everything: product design, development, App Store & Play Store submission, and post-launch support. Tell us about your app idea and we'll help scope it out.`,
                sources: [{ title: 'Mobile App Development', url: '/services/Mobile-Application-Development' }],
            };

        case 'web':
            return {
                answer: `We design and build all types of web products — marketing sites, web apps, dashboards, SaaS platforms, e-commerce, and portals. Our stack includes Next.js, React, Vue, Node.js, Laravel, and more. Everything is responsive, SEO-optimized, and built for performance. Want to discuss your project?`,
                sources: [{ title: 'Web Design & Development', url: '/services/Web-Design' }],
            };

        case 'ai':
            return {
                answer: `We build custom AI solutions: chatbots & virtual assistants, RAG knowledge systems, LLM integrations (OpenAI, Claude, Gemini), recommendation engines, computer vision, predictive analytics, and workflow automation. Whether you need AI features added to an existing app or a brand-new AI product, we can help.`,
                sources: [{ title: 'AI Development Services', url: '/services/ai-development-services' }],
            };

        case 'marketing':
            return {
                answer: `Our digital marketing services cover technical SEO, on-page & local SEO, Google & Meta paid ads, content marketing, social media strategy, and analytics. We focus on measurable outcomes — leads, rankings, and revenue — not vanity metrics. We serve both Nigerian and international markets.`,
                sources: [{ title: 'Digital Marketing & SEO', url: '/services/digital-marketing' }],
            };

        case 'branding':
            return {
                answer: `We create strong, memorable brand identities — logo design, colour systems, typography, brand voice, messaging, and full brand guidelines. Whether you're launching fresh or refreshing an existing brand, we help you stand out and connect with your audience consistently.`,
                sources: [{ title: 'Branding & Brand Management', url: '/services/branding' }],
            };

        case 'mvp':
            return {
                answer: `We specialise in taking startup ideas from zero to a launch-ready MVP — fast. Our process includes a discovery phase, lean scoping, UI/UX design, and agile engineering so you can validate with real users, attract investors, and scale. We've helped multiple funded startups launch and exit successfully.`,
                sources: [{ title: 'MVP Development', url: '/services/MVP' }],
            };

        case 'timeline':
            return {
                answer: `A typical project runs: 2-week discovery → 4–12 weeks engineering (scope-dependent) → 2 weeks testing → 1 week deployment. We use agile methodology with bi-weekly demos and collaborative feedback loops. For a more precise timeline, share your project details and we'll give you a tailored estimate.`,
                sources: [{ title: 'Project Timeline & Process', url: '/' }],
            };

        case 'tech':
            return {
                answer: `We work across the full modern stack — Frontend: React, Next.js, Vue, Tailwind CSS. Backend: Node.js, Django, Laravel, .NET. Mobile: React Native, Flutter. Databases: PostgreSQL, MongoDB, MySQL. Cloud: AWS, GCP, Vercel. AI/ML: OpenAI, LangChain, RAG. Blockchain: Solidity, Web3.js. DevOps: Docker, Kubernetes, CI/CD.`,
                sources: [{ title: 'Tech Stack & Technologies', url: '/services/Software-Development' }],
            };

        case 'team':
            return {
                answer: `Our team includes senior full-stack engineers, product designers, mobile specialists, DevOps engineers, and growth marketers — all vetted for technical depth and client communication. We extend with specialist partner networks for blockchain audits, ML research, and other niche needs.`,
                sources: [{ title: 'Team & Expertise', url: '/careers' }],
            };

        case 'portfolio':
            return {
                answer: `We've delivered 50+ projects across fintech, healthcare, logistics, e-commerce, education, and enterprise SaaS — from MVPs to large-scale platforms. Our case studies show real outcomes: users acquired, revenue generated, and performance benchmarks hit. Browse them at /case-studies.`,
                sources: [{ title: 'Portfolio & Case Studies', url: '/case-studies' }],
            };

        case 'why':
            return {
                answer: `8+ years of real-world expertise, 50+ successful projects, and a genuine commitment to your outcomes — not just deliverables. We're transparent, communicative, and focused on building products that scale and drive measurable business growth. Our clients stick with us because we treat their product like our own.`,
                sources: [{ title: 'Why Choose Grey InfoTech', url: '/' }],
            };

        case 'industries':
            return {
                answer: `We've built for 15+ industries including: Fintech, Healthcare, Logistics, E-commerce, EdTech, Real Estate, SaaS, Oil & Gas, Travel & Hospitality, HR Tech, Biotech, Music, and On-Demand platforms. We understand the unique challenges of each sector and build accordingly.`,
                sources: [{ title: 'Industries We Serve', url: '/industries/fintech' }],
            };

        case 'support':
            return {
                answer: `Existing clients can open a support ticket on our support page at /support. Our team responds within 24 hours. For urgent production issues, WhatsApp +234-802-809-5571 is the fastest way to reach us.`,
                sources: [{ title: 'Support & Tickets', url: '/support' }],
            };

        case 'careers':
            return {
                answer: `We're always looking for talented engineers, designers, and marketers. Check our careers page at /careers for current openings. We value technical depth, great communication, and genuine care for craft and client outcomes.`,
                sources: [{ title: 'Careers at Grey InfoTech', url: '/careers' }],
            };

        case 'store':
            return {
                answer: `Grey InfoTech has an online store where you can browse and purchase digital products and services, manage a cart, compare items, and track orders. Visit /store to explore what's available.`,
                sources: [{ title: 'Online Store', url: '/store' }],
            };

        case 'discovery':
            return {
                answer: `Our discovery phase is a 2–4 week engagement that aligns strategy before you invest in engineering. It includes workshops, user interviews, competitive analysis, and feasibility assessments — delivering a scope doc, wireframes, architecture, timeline, and cost estimate. It's the best way to de-risk your project from day one.`,
                sources: [{ title: 'Discovery & Strategy Phase', url: '/services/discovery-phase' }],
            };

        case 'unknown':
        default: {
            // Fall through to KB retrieval — use top matched doc if score is decent
            if (matches.length && matches[0].score >= 3) {
                const top = matches[0];
                return {
                    answer: `${top.text} — For more details, visit ${top.url} or reach us at hello@greyinfotech.com.ng / WhatsApp +234-802-809-5571.`,
                    sources,
                };
            }
            return {
                answer: `I'm not entirely sure about that — it's best to speak directly with our team. You can reach us at hello@greyinfotech.com.ng or on WhatsApp at +234-802-809-5571. We're happy to answer any questions about our services, process, or pricing.`,
                sources: [{ title: 'Contact Us', url: '/contact' }],
            };
        }
    }
}

export const SYSTEM_PROMPT = `You are "Grey AI", the friendly, concise assistant for ${COMPANY.legalName}, a web/mobile/AI development and digital marketing agency in ${COMPANY.location}.

Rules:
- Answer ONLY using the provided CONTEXT about Grey InfoTech. If the context doesn't cover it, say you're not sure and point the user to ${COMPANY.email} or WhatsApp ${COMPANY.whatsapp}.
- BE BRIEF: 2-3 short sentences. Get straight to the point. No filler, no preamble.
- One link max, only if it clearly helps (a path like /services/... or /contact).
- Never invent pricing, clients, or guarantees. For pricing, say it depends on scope and point to /quote-request.
- For complex/sales questions, briefly explain what we offer then invite conversation via contact options.`;
