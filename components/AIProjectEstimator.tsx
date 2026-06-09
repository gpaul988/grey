'use client';

import React, {useEffect, useMemo, useRef, useState} from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import {ChevronDown, Sparkles} from 'lucide-react';
import QuoteRequest from '@/components/QuoteRequest';

type BudgetTier = 'starter' | 'small-business' | 'growth' | 'scale' | 'enterprise' | 'custom' | 'other';
type TimelineTier =
    | 'rush'
    | '2-4-weeks'
    | '1-2-months'
    | '2-3-months'
    | '3-6-months'
    | '6-plus-months'
    | 'flexible'
    | 'other';
type IndustryTier =
    | 'automation'
    | 'biotech'
    | 'construction'
    | 'education'
    | 'ecommerce'
    | 'fintech'
    | 'government'
    | 'healthcare'
    | 'hr-tech'
    | 'logistics'
    | 'manufacturing'
    | 'music-media'
    | 'non-profit'
    | 'oil-gas'
    | 'on-demand'
    | 'professional-services'
    | 'real-estate'
    | 'retail'
    | 'saas'
    | 'technology'
    | 'travel-hospitality'
    | 'other';

type CurrencyCode = 'NGN' | 'USD' | 'EUR' | 'GBP' | 'CAD' | 'AUD' | 'INR' | 'ZAR' | 'AED' | 'JPY';
type ProviderTier = 'freelancer' | 'small-tech' | 'enterprise';

const SERVICE_OPTIONS = [
    'Other',
    'AI Development Services',
    'Android Development',
    'Angular Development',
    'API Integration',
    'App Store Optimisation',
    'Backend Development',
    'Blockchain Development',
    'Branding',
    'CMS Development',
    'CRM Development',
    'Cross Platform Development',
    'Database Design',
    'DevOps / Infrastructure',
    'Digital Marketing',
    'Discovery Phase',
    'ERP Development',
    'Flutter Development',
    'Frontend Development',
    'Hybrid Apps Development',
    'IoT Development',
    'iOS Development',
    'IT Consulting',
    'JavaScript Development',
    'Laravel Development',
    'Maintenance & Support',
    'Mobile Application Development',
    'MVP',
    'Next.js Development',
    'Node.js Development',
    'PHP Development',
    'Python Development',
    'Quality Assurance / Testing',
    'React.js Development',
    'React Native Development',
    'Ruby on Rails Development',
    'Search Engine Optimisation',
    'Software Development',
    'Social Networking',
    'Typescript Development',
    'UI/UX Design',
    'Unity Development',
    'Vue.js Development',
    'Web Application',
    'Web Design',
    'Web Development',
] as const;

const FEATURE_OPTIONS = [
    'Other',
    'Accessibility (WCAG Compliance)',
    'Admin dashboard',
    'Analytics / reporting',
    'API development',
    'Audit logs',
    'Authentication / SSO',
    'Automated testing',
    'Backup & disaster recovery',
    'Booking / scheduling',
    'Caching strategies',
    'Chat assistant',
    'CMS editing',
    'CRM integration',
    'Custom notifications',
    'Dark mode support',
    'Data import / export',
    'Database optimization',
    'DevOps / CI-CD',
    'Email automation',
    'Error handling & monitoring',
    'ERP integration',
    'File upload / storage',
    'Geofencing',
    'Load balancing',
    'Lead capture forms',
    'Maps / location services',
    'Mobile app support',
    'Multi-language support',
    'Multi-tenant support',
    'Offline support',
    'Payment processing',
    'Performance optimization',
    'Progressive Web App (PWA)',
    'Push notifications',
    'Rate limiting & throttling',
    'Real-time updates',
    'Role-based access control',
    'Search / filtering',
    'Security hardening',
    'Social media integration',
    'Subscription management',
    'Third-party integrations',
    'User onboarding flows',
    'Version control setup',
    'Video streaming',
    'Workflow automation',
] as const;

const BUDGET_OPTIONS: Record<BudgetTier, { label: string; baseNgn: number; note: string }> = {
    starter: {label: 'Starter', baseNgn: 150_000, note: 'Professional Portfolio Website - Base cost, add features to increase'},
    'small-business': {label: 'Small Business', baseNgn: 1_500_000, note: 'Service sites, small products, lean platforms'},
    growth: {label: 'Growth', baseNgn: 3_200_000, note: 'Multi-feature apps, business systems, scaling'},
    scale: {label: 'Scale', baseNgn: 7_000_000, note: 'Complex products, multiple integrations, enterprise'},
    enterprise: {label: 'Enterprise', baseNgn: 15_000_000, note: 'Large-scale systems, compliance, security focus'},
    custom: {label: 'Custom / Strategic', baseNgn: 28_000_000, note: 'Discovery-led, multi-phase, strategic delivery'},
    other: {label: 'Other', baseNgn: 500_000, note: 'Not sure? Tell us about your project during consultation'},
};

const TIMELINE_OPTIONS: Record<TimelineTier, { label: string; multiplier: number; note: string; weeks: number }> = {
    rush: {label: 'Rush / ASAP', multiplier: 1.35, note: 'Priority delivery, team fully dedicated', weeks: 2},
    '2-4-weeks': {label: '2-4 weeks', multiplier: 1.22, note: 'Very aggressive timeline', weeks: 4},
    '1-2-months': {label: '1-2 months', multiplier: 1.12, note: 'Fast-track build', weeks: 8},
    '2-3-months': {label: '2-3 months', multiplier: 1.0, note: 'Standard build window', weeks: 12},
    '3-6-months': {label: '3-6 months', multiplier: 0.92, note: 'Planned delivery with optimization', weeks: 24},
    '6-plus-months': {label: '6+ months', multiplier: 0.88, note: 'Long roadmap / phased rollout', weeks: 32},
    flexible: {label: 'Flexible', multiplier: 0.94, note: 'Best-fit scheduling per milestones', weeks: 16},
    other: {label: 'Other', multiplier: 1.0, note: 'Custom timeline - discuss during consultation', weeks: 20},
};

const INDUSTRY_OPTIONS: Record<IndustryTier, { label: string; multiplier: number; note: string }> = {
    automation: {label: 'Automation', multiplier: 1.05, note: 'Process-heavy systems'},
    biotech: {label: 'Biotech', multiplier: 1.18, note: 'Regulated / sensitive data'},
    construction: {label: 'Construction', multiplier: 1.04, note: 'Operations and field workflows'},
    education: {label: 'Education', multiplier: 0.96, note: 'Learning platforms and portals'},
    ecommerce: {label: 'E-commerce', multiplier: 1.08, note: 'Catalogs and checkout logic'},
    fintech: {label: 'Fintech', multiplier: 1.2, note: 'Security and compliance'},
    government: {label: 'Government', multiplier: 1.12, note: 'Accessibility and governance'},
    healthcare: {label: 'Healthcare', multiplier: 1.16, note: 'Privacy and compliance'},
    'hr-tech': {label: 'HR-Tech', multiplier: 1.07, note: 'People systems and workflows'},
    logistics: {label: 'Logistics', multiplier: 1.09, note: 'Tracking and routing'},
    manufacturing: {label: 'Manufacturing', multiplier: 1.1, note: 'Operations and ERP-style systems'},
    'music-media': {label: 'Music & Media', multiplier: 1.02, note: 'Content and distribution'},
    'non-profit': {label: 'Non-Profit', multiplier: 0.92, note: 'Mission-driven platforms'},
    'oil-gas': {label: 'Oil and Gas', multiplier: 1.14, note: 'Enterprise and field systems'},
    'on-demand': {label: 'On-Demand', multiplier: 1.1, note: 'Real-time marketplace behavior'},
    'professional-services': {label: 'Professional Services', multiplier: 1.0, note: 'Lead gen and service delivery'},
    'real-estate': {label: 'Real Estate', multiplier: 1.08, note: 'Listings and client portals'},
    retail: {label: 'Retail', multiplier: 1.05, note: 'Inventory and customer journeys'},
    saas: {label: 'SaaS', multiplier: 1.12, note: 'Multi-tenant product systems'},
    technology: {label: 'Technology', multiplier: 1.0, note: 'General tech product builds'},
    'travel-hospitality': {label: 'Travel & Hospitality', multiplier: 1.07, note: 'Booking and guest experiences'},
    other: {label: 'Other', multiplier: 1.0, note: 'Industry not listed - we adapt to your needs'},
};

const EXCHANGE_RATES: Record<CurrencyCode, number> = {
    NGN: 1,
    USD: 1550,
    EUR: 1700,
    GBP: 2000,
    CAD: 1120,
    AUD: 1010,
    INR: 18.5,
    ZAR: 85,
    AED: 5.7,
    JPY: 10.5,
};

const CURRENCY_SYMBOLS: Record<CurrencyCode, string> = {
    NGN: '₦',
    USD: '$',
    EUR: '€',
    GBP: '£',
    CAD: 'C$',
    AUD: 'A$',
    INR: '₹',
    ZAR: 'R',
    AED: 'د.إ',
    JPY: '¥',
};

// Provider Tier Pricing - Shows cost differences between freelancers, small companies, and enterprises
const PROVIDER_TIER_INFO: Record<ProviderTier, { label: string; description: string; color: string; multiplier: number }> = {
    freelancer: {
        label: 'Nigerian Freelancers',
        description: 'Individual freelancers & contractors',
        color: 'emerald',
        multiplier: 0.15, // 15% of standard rate
    },
    'small-tech': {
        label: 'Small Tech Companies',
        description: 'Local tech startups & small studios',
        color: 'blue',
        multiplier: 0.45, // 45% of standard rate
    },
    enterprise: {
        label: 'Enterprise Companies',
        description: 'Established agencies & corporations',
        color: 'purple',
        multiplier: 1.0, // Full standard rate (100%)
    },
};

// Service pricing multipliers for each provider tier
const SERVICE_PROVIDER_PRICING: Record<string, Record<ProviderTier, number>> = {
    // Service name -> Provider tier -> Base cost in NGN
    'Simple Service': { freelancer: 150_000, 'small-tech': 350_000, enterprise: 750_000 },
    'Standard Service': { freelancer: 300_000, 'small-tech': 700_000, enterprise: 1_500_000 },
    'Complex Service': { freelancer: 600_000, 'small-tech': 1_200_000, enterprise: 3_000_000 },
    'Advanced Service': { freelancer: 900_000, 'small-tech': 2_000_000, enterprise: 5_000_000 },
    'Enterprise Service': { freelancer: 1_500_000, 'small-tech': 3_500_000, enterprise: 8_000_000 },
};

// Feature cost multipliers per provider tier
const FEATURE_PROVIDER_COSTS: Record<ProviderTier, number> = {
    freelancer: 50_000, // ₦50K per feature
    'small-tech': 150_000, // ₦150K per feature
    enterprise: 500_000, // ₦500K per feature
};

const timeFrameWeeks: Record<TimelineTier, string[]> = {
    rush: [
        'Week 1: Scope lock + quick design + build kickoff',
        'Week 2: Full development, QA, deployment & launch'
    ],
    '2-4-weeks': [
        'Week 1: Discovery, wireframes, tech stack finalization',
        'Week 2: Design, core features setup, API integration',
        'Week 3: Full feature implementation, testing begins',
        'Week 4: QA completion, bug fixes, launch prep & deploy',
    ],
    '1-2-months': [
        'Weeks 1-2: Discovery sessions, user flows, architecture design',
        'Weeks 3-4: Visual design, prototyping, backend setup',
        'Weeks 5-6: Core development, feature implementation',
        'Weeks 7-8: QA testing, optimization, stabilization & launch',
    ],
    '2-3-months': [
        'Weeks 1-2: Discovery, requirements, system architecture',
        'Weeks 3-6: Design, database schema, core development',
        'Weeks 7-9: Feature completion, integrations, testing phase 1',
        'Weeks 10-12: QA, refinement, performance tuning & launch',
    ],
    '3-6-months': [
        'Weeks 1-4: Product strategy, discovery, detailed planning',
        'Weeks 5-12: Design, phase 1 development, testing',
        'Weeks 13-20: Phase 2 implementation, integrations, advanced features',
        'Weeks 21-24: Full QA, performance optimization, launch readiness',
    ],
    '6-plus-months': [
        'Months 1-2: Strategic planning, discovery, roadmap refinement',
        'Months 3-5: Iterative development, integrations, feature expansion',
        'Months 6-7: Advanced features, optimization, user testing feedback',
        'Month 7+: Phased releases, monitoring, continuous optimization',
    ],
    flexible: [
        'Discovery phase to finalize milestones & deliverables',
        'Progressive delivery paced to your feedback & priorities',
        'Iterative refinement based on real-world usage patterns',
    ],
    other: [
        'Custom timeline to be agreed during consultation',
        'We will work with you to define milestones and delivery dates',
    ],
};

function formatNumber(value: number) {
    return new Intl.NumberFormat('en-NG').format(Math.round(value));
}

function formatCurrency(amount: number, currency: CurrencyCode) {
    const symbol = CURRENCY_SYMBOLS[currency];
    return `${symbol}${formatNumber(amount)}`;
}

function useOutsideAlerter(ref: React.RefObject<HTMLElement | null>, onOutside: () => void) {
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                onOutside();
            }
        };
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, [ref, onOutside]);
}

function MultiSelectDropdown({
                                 label,
                                 options,
                                 selected,
                                 onToggle,
                                 isDayTime,
                                 placeholder,
                             }: {
    label: string;
    options: readonly string[];
    selected: string[];
    onToggle: (value: string) => void;
    isDayTime: boolean;
    placeholder?: string;
}) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement | null>(null);
    useOutsideAlerter(ref, () => setOpen(false));

    const selectedCount = selected.length;
    const display = selectedCount === 0 ? (placeholder ?? 'Select...') : `${selectedCount} selected`;

    return (
        <div ref={ref} className="relative">
            <label className={`block text-sm font-semibold mb-2 ${isDayTime ? 'text-teal-900' : 'text-white'}`}>
                {label}
            </label>

            <button
                type="button"
                onClick={() => setOpen(v => !v)}
                className={`w-full flex items-center justify-between gap-3 rounded-lg px-4 py-3 text-left transition ${
                    isDayTime
                        ? 'bg-white border border-gray-200 text-teal-900 hover:bg-gray-50'
                        : 'bg-black border border-gray-700 text-white hover:bg-gray-900'
                }`}
                aria-haspopup="listbox"
                aria-expanded={open}
            >
                <span className="text-sm truncate">{display}</span>
                <ChevronDown className={`${isDayTime ? 'text-gray-600' : 'text-white'} h-4 w-4`}/>
            </button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{opacity: 0, y: -6}}
                        animate={{opacity: 1, y: 0}}
                        exit={{opacity: 0, y: -6}}
                        transition={{duration: 0.15}}
                        className={`absolute z-40 mt-2 w-full max-h-60 overflow-auto rounded-lg shadow-lg ring-1 ring-black/10 ${
                            isDayTime ? 'bg-white' : 'bg-black'
                        }`}
                        role="listbox"
                    >
                        <div className={`p-3 space-y-2 ${isDayTime ? 'text-teal-900' : 'text-white'}`}>
                            {options.map(opt => {
                                const active = selected.includes(opt);
                                return (
                                    <button
                                        key={opt}
                                        type="button"
                                        onClick={() => onToggle(opt)}
                                        className={`flex w-full items-start gap-3 rounded-md px-2 py-2 text-sm transition text-left ${
                                            active
                                                ? isDayTime
                                                    ? 'bg-teal-50/40 text-teal-900'
                                                    : 'bg-teal-600 text-white'
                                                : isDayTime
                                                    ? 'hover:bg-gray-50'
                                                    : 'hover:bg-white/5'
                                        }`}
                                    >
                                        <span
                                            className={`inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border text-[10px] ${
                                                active
                                                    ? 'border-teal-600 bg-teal-600 text-white'
                                                    : isDayTime
                                                        ? 'border-gray-300 bg-white text-transparent'
                                                        : 'border-gray-600 bg-black text-transparent'
                                            }`}
                                        >
                                            ✓
                                        </span>
                                        <span className="truncate">{opt}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// Service matching keywords database
const SERVICE_KEYWORDS: Record<string, string[]> = {
    'AI Development Services': ['ai', 'artificial intelligence', 'machine learning', 'ml', 'deep learning', 'llm', 'chatbot ai'],
    'Backend Development': ['backend', 'server', 'api', 'database', 'microservices'],
    'Frontend Development': ['frontend', 'ui development', 'user interface'],
    'React.js Development': ['react', 'reactjs', 'react.js'],
    'Node.js Development': ['node', 'nodejs', 'node.js'],
    'Next.js Development': ['next', 'nextjs', 'next.js', 'ssr', 'server-side rendering'],
    'Python Development': ['python', 'django', 'flask'],
    'Mobile Application Development': ['mobile', 'mobile app', 'native app'],
    'iOS Development': ['ios', 'iphone', 'swift'],
    'Android Development': ['android', 'kotlin', 'java mobile'],
    'React Native Development': ['react native'],
    'Flutter Development': ['flutter', 'dart'],
    'Web Development': ['web', 'website', 'web app', 'web application'],
    'UI/UX Design': ['ui design', 'ux design', 'user experience', 'interface design', 'design system'],
    'CRM Development': ['crm', 'customer relationship'],
    'ERP Development': ['erp', 'enterprise resource'],
    'CMS Development': ['cms', 'content management'],
    'E-commerce': ['ecommerce', 'e-commerce', 'shop', 'store', 'marketplace', 'shopping cart'],
    'DevOps / Infrastructure': ['devops', 'deployment', 'infrastructure', 'cloud', 'aws', 'azure', 'gcp'],
    'Quality Assurance / Testing': ['testing', 'qa', 'quality assurance', 'automated testing', 'test automation'],
    'Digital Marketing': ['digital marketing', 'marketing'],
    'Search Engine Optimisation': ['seo', 'search engine optimization'],
    'Branding': ['branding', 'logo', 'brand identity'],
    'API Integration': ['api integration', 'third party integration', 'webhook'],
    'Database Design': ['database design', 'database architecture', 'sql'],
    'IT Consulting': ['consulting', 'technology consultant'],
    'Discovery Phase': ['discovery', 'requirements gathering'],
    'Maintenance & Support': ['maintenance', 'support', 'ongoing support'],
    'Blockchain Development': ['blockchain', 'web3', 'crypto', 'smart contract', 'ethereum'],
};

const FEATURE_KEYWORDS: Record<string, string[]> = {
    'Authentication / SSO': ['authentication', 'login', 'auth', 'sso', 'oauth', 'single sign-on'],
    'Admin dashboard': ['admin', 'admin dashboard', 'admin panel'],
    'Analytics / reporting': ['analytics', 'reporting', 'dashboard analytics'],
    'Payment processing': ['payment', 'checkout', 'billing', 'stripe', 'paypal'],
    'Real-time updates': ['real-time', 'live update', 'websocket'],
    'Push notifications': ['notification', 'push notification'],
    'File upload / storage': ['file upload', 'file storage', 'cloud storage', 's3'],
    'API development': ['api', 'rest api', 'graphql'],
    'Email automation': ['email', 'email automation', 'smtp'],
    'Search / filtering': ['search', 'filter', 'advanced search'],
    'Multi-language support': ['multi-language', 'i18n', 'localization', 'translation'],
    'Dark mode support': ['dark mode', 'theme'],
    'Security hardening': ['security', 'encryption', 'secure'],
    'DevOps / CI-CD': ['ci/cd', 'cicd', 'continuous integration', 'deployment pipeline'],
};

export default function AIProjectEstimator() {
    const [currency, setCurrency] = useState<CurrencyCode>('NGN');
    const [budgetTier, setBudgetTier] = useState<BudgetTier>('starter');
    const [timelineTier, setTimelineTier] = useState<TimelineTier>('2-3-months');
    const [industryTier, setIndustryTier] = useState<IndustryTier>('other');

    const [selectedServices, setSelectedServices] = useState<string[]>([]);
    const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

    const [customDescription, setCustomDescription] = useState('');
    const [detectedServices, setDetectedServices] = useState<string[]>([]);
    const [detectedFeatures, setDetectedFeatures] = useState<string[]>([]);
    const [useDetected, setUseDetected] = useState(false);

    const [customBudget, setCustomBudget] = useState('');
    const [customTimeline, setCustomTimeline] = useState('');
    const [customIndustry, setCustomIndustry] = useState('');

    // Mutable option lists so users can add new services/features at runtime
    const [servicesOptions, setServicesOptions] = useState<string[]>(Array.from(SERVICE_OPTIONS) as string[]);
    const [featuresOptions, setFeaturesOptions] = useState<string[]>(Array.from(FEATURE_OPTIONS) as string[]);

    // Inputs shown when user selects 'Other' for Services/Features
    const [customServiceInput, setCustomServiceInput] = useState('');
    const [customFeatureInput, setCustomFeatureInput] = useState('');

    const [isDayTime, setIsDayTime] = useState(true);
    const [isQuoteOpen, setIsQuoteOpen] = useState(false);

    const quoteWrapRef = useRef<HTMLDivElement | null>(null);
    useOutsideAlerter(quoteWrapRef, () => setIsQuoteOpen(false));

    useEffect(() => {
        const update = () => {
            const hour = new Date().getHours();
            setIsDayTime(hour >= 6 && hour < 18);
        };

        update();
        const id = window.setInterval(update, 60_000);
        return () => window.clearInterval(id);
    }, []);

    const toggle = (value: string, setter: React.Dispatch<React.SetStateAction<string[]>>) => {
        setter(prev => (prev.includes(value) ? prev.filter(p => p !== value) : [...prev, value]));
    };

    // Add a custom service provided by the user when they select 'Other'
    const addCustomService = () => {
        const val = customServiceInput.trim();
        if (!val) return;

        // avoid duplicates (case-insensitive)
        if (!servicesOptions.some(s => s.toLowerCase() === val.toLowerCase())) {
            setServicesOptions(prev => [...prev, val]);
        }

        setSelectedServices(prev => {
            const filtered = prev.filter(p => p !== 'Other' && p.toLowerCase() !== val.toLowerCase());
            return [...filtered, val];
        });

        setCustomServiceInput('');
    };

    // Add a custom feature provided by the user when they select 'Other'
    const addCustomFeature = () => {
        const val = customFeatureInput.trim();
        if (!val) return;

        if (!featuresOptions.some(f => f.toLowerCase() === val.toLowerCase())) {
            setFeaturesOptions(prev => [...prev, val]);
        }

        setSelectedFeatures(prev => {
            const filtered = prev.filter(p => p !== 'Other' && p.toLowerCase() !== val.toLowerCase());
            return [...filtered, val];
        });

        setCustomFeatureInput('');
    };

    // AI parsing function to extract services and features from custom description
    const parseCustomDescription = (description: string) => {
        const lowerText = description.toLowerCase();
        const found: { services: string[], features: string[] } = { services: [], features: [] };

        // Parse services
        Object.entries(SERVICE_KEYWORDS).forEach(([service, keywords]) => {
            if (keywords.some(keyword => lowerText.includes(keyword))) {
                found.services.push(service);
            }
        });

        // Parse features
        Object.entries(FEATURE_KEYWORDS).forEach(([feature, keywords]) => {
            if (keywords.some(keyword => lowerText.includes(keyword))) {
                found.features.push(feature);
            }
        });

        return found;
    };

    const handleDescriptionChange = (value: string) => {
        setCustomDescription(value);
        if (value.trim()) {
            const parsed = parseCustomDescription(value);
            setDetectedServices(parsed.services);
            setDetectedFeatures(parsed.features);
        } else {
            setDetectedServices([]);
            setDetectedFeatures([]);
            setUseDetected(false);
        }
    };

    const applyDetectedServices = () => {
        if (detectedServices.length > 0 || detectedFeatures.length > 0) {
            setSelectedServices(detectedServices);
            setSelectedFeatures(detectedFeatures);
            setUseDetected(true);
            setCustomDescription(''); // Clear after applying
            setDetectedServices([]);
            setDetectedFeatures([]);
        }
    };

    const estimate = useMemo(() => {
        const budget = BUDGET_OPTIONS[budgetTier];
        const timeline = TIMELINE_OPTIONS[timelineTier];
        const industry = INDUSTRY_OPTIONS[industryTier];

        // Base cost from budget tier
        const baseNgn = budget.baseNgn;

        // Add service costs (each service adds 300K)
        const serviceCost = Math.max(0, selectedServices.length) * 300_000;

        // Add feature costs (each feature adds 150K)
        const featureCost = Math.max(0, selectedFeatures.length) * 150_000;

        // Total before multipliers
        const subtotal = baseNgn + serviceCost + featureCost;

        // Apply timeline and industry multipliers
        const rawNgn = Math.round(subtotal * timeline.multiplier * industry.multiplier);

        // Round to nearest sensible value
        const roundedNgn =
            rawNgn < 2_500_000
                ? Math.round(rawNgn / 50_000) * 50_000
                : rawNgn < 10_000_000
                    ? Math.round(rawNgn / 100_000) * 100_000
                    : Math.round(rawNgn / 250_000) * 250_000;

        const converted = roundedNgn / EXCHANGE_RATES[currency];
        const convertedMin = Math.round(converted * 0.82);
        const convertedMax = Math.round(converted * 1.25);

        return {
            ngn: roundedNgn,
            converted,
            minConverted: convertedMin,
            maxConverted: convertedMax,
            budgetLabel: budget.label,
            timelineLabel: timeline.label,
            industryLabel: industry.label,
            serviceCount: selectedServices.length,
            featureCount: selectedFeatures.length,
        };
    }, [budgetTier, timelineTier, industryTier, selectedServices, selectedFeatures, currency]);

    const weekPoints = useMemo(() => timeFrameWeeks[timelineTier] ?? [], [timelineTier]);

    return (
        <>
            <motion.section
                initial={{opacity: 0, y: 22}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true, amount: 0.2}}
                transition={{duration: 0.5}}
                className={`w-full py-10 px-4 sm:px-6 lg:px-10`}
            >
                <div className="max-w-[1100px] mx-auto grid gap-8 lg:grid-cols-[1fr_420px]">
                    <div>
                        <div className="mb-6 flex items-center gap-3">
                            <Sparkles className={`${isDayTime ? 'text-teal-700' : 'text-teal-300'} h-6 w-6`}/>
                            <div>
                                <h3 className={`text-2xl font-bold ${isDayTime ? 'text-teal-900' : 'text-white'}`}>
                                    Our Project Estimator
                                </h3>
                                <p className={`text-sm ${isDayTime ? 'text-teal-800/80' : 'text-white/80'}`}>
                                    Estimate your software project in NGN first, then switch currency if needed.
                                </p>
                            </div>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            <div>
                                <label
                                    className={`block text-sm font-semibold mb-2 ${isDayTime ? 'text-teal-900' : 'text-white'}`}>
                                    💰 Budget Tier
                                </label>
                                <p className={`text-xs mb-2 ${isDayTime ? 'text-teal-700' : 'text-white/70'}`}>
                                    Choose your project scope level
                                </p>
                                <select
                                    value={budgetTier}
                                    onChange={e => setBudgetTier(e.target.value as BudgetTier)}
                                    className={`w-full rounded-lg px-4 py-3 outline-none transition ${
                                        isDayTime
                                            ? 'border border-gray-200 bg-teal-50 text-teal-900'
                                            : 'border border-gray-700 bg-teal-950 text-white'
                                    }`}
                                >
                                    {Object.entries(BUDGET_OPTIONS).map(([k, v]) => (
                                        <option key={k} value={k}>
                                            {v.label} - {v.note}
                                        </option>
                                    ))}
                                </select>
                                {budgetTier === 'other' && (
                                    <input
                                        type="text"
                                        value={customBudget}
                                        onChange={(e) => setCustomBudget(e.target.value)}
                                        placeholder="Tell us about your budget needs..."
                                        className={`w-full mt-2 rounded-lg px-4 py-3 outline-none transition ${
                                            isDayTime
                                                ? 'border border-gray-200 bg-white text-teal-900 placeholder-teal-500'
                                                : 'border border-gray-600 bg-gray-900 text-white placeholder-gray-400'
                                        }`}
                                    />
                                )}
                            </div>

                            <div>
                                <label
                                    className={`block text-sm font-semibold mb-2 ${isDayTime ? 'text-teal-900' : 'text-white'}`}>
                                    ⏱️ Timeline
                                </label>
                                <p className={`text-xs mb-2 ${isDayTime ? 'text-teal-700' : 'text-white/70'}`}>
                                    How quickly do you need this completed?
                                </p>
                                <select
                                    value={timelineTier}
                                    onChange={e => setTimelineTier(e.target.value as TimelineTier)}
                                    className={`w-full rounded-lg px-4 py-3 outline-none transition ${
                                        isDayTime
                                            ? 'border border-gray-200 bg-teal-50 text-teal-900'
                                            : 'border border-gray-700 bg-teal-950 text-white'
                                    }`}
                                >
                                    {Object.entries(TIMELINE_OPTIONS).map(([k, v]) => (
                                        <option key={k} value={k}>
                                            {v.label} - {v.note}
                                        </option>
                                    ))}
                                </select>
                                {timelineTier === 'other' && (
                                    <input
                                        type="text"
                                        value={customTimeline}
                                        onChange={(e) => setCustomTimeline(e.target.value)}
                                        placeholder="Tell us about your custom timeline..."
                                        className={`w-full mt-2 rounded-lg px-4 py-3 outline-none transition ${
                                            isDayTime
                                                ? 'border border-gray-200 bg-white text-teal-900 placeholder-teal-500'
                                                : 'border border-gray-600 bg-gray-900 text-white placeholder-gray-400'
                                        }`}
                                    />
                                )}
                            </div>

                            <div className="md:col-span-2">
                                <label
                                    className={`block text-sm font-semibold mb-2 ${isDayTime ? 'text-teal-900' : 'text-white'}`}>
                                    🏢 Industry
                                </label>
                                <p className={`text-xs mb-2 ${isDayTime ? 'text-teal-700' : 'text-white/70'}`}>
                                    What industry is your project for?
                                </p>
                                <select
                                    value={industryTier}
                                    onChange={e => setIndustryTier(e.target.value as IndustryTier)}
                                    className={`w-full rounded-lg px-4 py-3 outline-none transition ${
                                        isDayTime
                                            ? 'border border-gray-200 bg-teal-50 text-teal-900'
                                            : 'border border-gray-700 bg-teal-950 text-white'
                                    }`}
                                >
                                    {Object.entries(INDUSTRY_OPTIONS).map(([k, v]) => (
                                        <option key={k} value={k}>
                                            {v.label} - {v.note}
                                        </option>
                                    ))}
                                </select>
                                {industryTier === 'other' && (
                                    <input
                                        type="text"
                                        value={customIndustry}
                                        onChange={(e) => setCustomIndustry(e.target.value)}
                                        placeholder="Tell us what industry your project is for..."
                                        className={`w-full mt-2 rounded-lg px-4 py-3 outline-none transition ${
                                            isDayTime
                                                ? 'border border-gray-200 bg-white text-teal-900 placeholder-teal-500'
                                                : 'border border-gray-600 bg-gray-900 text-white placeholder-gray-400'
                                        }`}
                                    />
                                )}
                            </div>

                            <div className="md:col-span-2">
                                <label
                                    className={`block text-sm font-semibold mb-2 ${isDayTime ? 'text-teal-900' : 'text-white'}`}>
                                    🛠️ Services
                                </label>
                                <p className={`text-xs mb-2 ${isDayTime ? 'text-teal-700' : 'text-white/70'}`}>
                                    Select the development services you need (each adds ₦300K to base cost)
                                </p>
                                <MultiSelectDropdown
                                    label=""
                                    options={servicesOptions}
                                    selected={selectedServices}
                                    onToggle={(val) => toggle(val, setSelectedServices)}
                                    isDayTime={isDayTime}
                                    placeholder="Choose services"
                                />

                                {selectedServices.includes('Other') && (
                                    <div className="mt-2 flex gap-2">
                                        <input
                                            type="text"
                                            value={customServiceInput}
                                            onChange={(e) => setCustomServiceInput(e.target.value)}
                                            onKeyDown={(e) => { if (e.key === 'Enter') addCustomService(); }}
                                            placeholder="Describe the service you need..."
                                            className={`flex-1 rounded-lg px-4 py-3 outline-none transition ${isDayTime ? 'border border-gray-200 bg-white text-teal-900 placeholder-teal-500' : 'border border-gray-600 bg-gray-900 text-white placeholder-gray-400'}`}
                                        />
                                        <button
                                            type="button"
                                            onClick={addCustomService}
                                            className={`px-4 py-3 rounded-lg font-semibold ${isDayTime ? 'bg-teal-600 text-white' : 'bg-teal-700 text-white'}`}
                                        >
                                            Add
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div className="md:col-span-2">
                                <label
                                    className={`block text-sm font-semibold mb-2 ${isDayTime ? 'text-teal-900' : 'text-white'}`}>
                                    ✨ Features
                                </label>
                                <p className={`text-xs mb-2 ${isDayTime ? 'text-teal-700' : 'text-white/70'}`}>
                                    Select features to add to your website/app (each adds ₦150K to base cost)
                                </p>
                                <MultiSelectDropdown
                                    label=""
                                    options={featuresOptions}
                                    selected={selectedFeatures}
                                    onToggle={(val) => toggle(val, setSelectedFeatures)}
                                    isDayTime={isDayTime}
                                    placeholder="Choose features"
                                />

                                {selectedFeatures.includes('Other') && (
                                    <div className="mt-2 flex gap-2">
                                        <input
                                            type="text"
                                            value={customFeatureInput}
                                            onChange={(e) => setCustomFeatureInput(e.target.value)}
                                            onKeyDown={(e) => { if (e.key === 'Enter') addCustomFeature(); }}
                                            placeholder="Describe the feature you want..."
                                            className={`flex-1 rounded-lg px-4 py-3 outline-none transition ${isDayTime ? 'border border-gray-200 bg-white text-teal-900 placeholder-teal-500' : 'border border-gray-600 bg-gray-900 text-white placeholder-gray-400'}`}
                                        />
                                        <button
                                            type="button"
                                            onClick={addCustomFeature}
                                            className={`px-4 py-3 rounded-lg font-semibold ${isDayTime ? 'bg-teal-600 text-white' : 'bg-teal-700 text-white'}`}
                                        >
                                            Add
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Custom Service Description Section */}
                            <div className="md:col-span-2">
                                <label
                                    className={`block text-sm font-semibold mb-2 ${isDayTime ? 'text-teal-900' : 'text-white'}`}>
                                    📝 Or Describe Your Services & Features
                                </label>
                                <p className={`text-xs mb-3 ${isDayTime ? 'text-teal-700' : 'text-white/70'}`}>
                                    Tell us what you need in plain English – our AI will identify services and features automatically
                                </p>
                                <textarea
                                    value={customDescription}
                                    onChange={(e) => handleDescriptionChange(e.target.value)}
                                    placeholder="For example: I need a mobile app built in React Native with user authentication, real-time notifications, and a payment system. Must support both iOS and Android..."
                                    className={`w-full rounded-lg px-4 py-3 outline-none transition resize-none ${
                                        isDayTime
                                            ? 'border border-gray-200 bg-teal-50 text-teal-900 placeholder-teal-600'
                                            : 'border border-gray-700 bg-teal-950 text-white placeholder-white/50'
                                    }`}
                                    rows={4}
                                />

                                {/* Detected Services Display */}
                                {(detectedServices.length > 0 || detectedFeatures.length > 0) && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className={`mt-4 rounded-lg p-4 border-2 ${
                                            isDayTime
                                                ? 'bg-teal-50 border-teal-200'
                                                : 'bg-teal-950/30 border-teal-700'
                                        }`}
                                    >
                                        <div className={`text-sm font-semibold mb-3 ${isDayTime ? 'text-teal-900' : 'text-white'}`}>
                                            ✨ AI Analysis - Detected:
                                        </div>

                                        {detectedServices.length > 0 && (
                                            <div className="mb-3">
                                                <div className={`text-xs font-semibold mb-2 ${isDayTime ? 'text-teal-700' : 'text-teal-300'}`}>
                                                    Services ({detectedServices.length}):
                                                </div>
                                                <div className="flex flex-wrap gap-2 mb-2">
                                                    {detectedServices.map((service) => (
                                                        <span
                                                            key={service}
                                                            className={`text-xs px-3 py-1 rounded-full font-medium ${
                                                                isDayTime
                                                                    ? 'bg-teal-100 text-teal-700'
                                                                    : 'bg-teal-700 text-white'
                                                            }`}
                                                        >
                                                            {service}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {detectedFeatures.length > 0 && (
                                            <div className="mb-3">
                                                <div className={`text-xs font-semibold mb-2 ${isDayTime ? 'text-teal-700' : 'text-teal-300'}`}>
                                                    Features ({detectedFeatures.length}):
                                                </div>
                                                <div className="flex flex-wrap gap-2 mb-2">
                                                    {detectedFeatures.map((feature) => (
                                                        <span
                                                            key={feature}
                                                            className={`text-xs px-3 py-1 rounded-full font-medium ${
                                                                isDayTime
                                                                    ? 'bg-blue-100 text-blue-700'
                                                                    : 'bg-blue-700 text-white'
                                                            }`}
                                                        >
                                                            {feature}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        <button
                                            type="button"
                                            onClick={applyDetectedServices}
                                            className={`w-full mt-3 px-4 py-2 rounded-lg font-semibold transition text-sm ${
                                                isDayTime
                                                    ? 'bg-teal-600 text-white hover:bg-teal-700'
                                                    : 'bg-teal-500 text-white hover:bg-teal-600'
                                            }`}
                                        >
                                            ✓ Apply These Services & Features
                                        </button>
                                    </motion.div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div>
                        <div
                            className={`rounded-2xl p-5 shadow-lg ${isDayTime ? 'bg-teal-950 text-white' : 'bg-white text-teal-950'}`}>
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex items-center gap-2">
                                    <Sparkles className={`${isDayTime ? 'text-white' : 'text-teal-600'} h-5 w-5`}/>
                                    <div>
                                        <div
                                            className={`text-xl font-bold ${isDayTime ? 'text-white' : 'text-teal-700'}`}>
                                            {formatCurrency(estimate.converted, currency)}
                                        </div>
                                        <div className={`text-sm ${isDayTime ? 'text-white/80' : 'text-teal-700'}`}>
                                            Range: {formatCurrency(estimate.minConverted, currency)} - {formatCurrency(estimate.maxConverted, currency)}
                                        </div>
                                        <div
                                            className={`text-xs mt-1 ${isDayTime ? 'text-white/70' : 'text-teal-700/80'}`}>
                                            Base NGN: {formatCurrency(estimate.ngn, 'NGN')}
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label
                                        className={`block text-xs mb-1 ${isDayTime ? 'text-white/90' : 'text-teal-700'}`}>Currency</label>
                                    <select
                                        value={currency}
                                        onChange={e => setCurrency(e.target.value as CurrencyCode)}
                                        className={`rounded-md px-3 py-2 border ${
                                            isDayTime
                                                ? 'bg-white text-teal-900 border-white/40'
                                                : 'bg-white text-teal-900 border-gray-200'
                                        }`}
                                    >
                                        {Object.keys(EXCHANGE_RATES).map(code => (
                                            <option key={code} value={code}>
                                                {code}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className={`mt-4 rounded-md p-3 ${isDayTime ? 'bg-white/10' : 'bg-gray-50'}`}>
                                <div className="text-sm mb-2 font-semibold flex items-center justify-between">
                                    Summary
                                    {useDetected && (
                                        <span className={`text-xs px-2 py-1 rounded-full ${isDayTime ? 'bg-teal-100 text-teal-700' : 'bg-teal-700 text-white'}`}>
                                            🤖 AI-Detected Services
                                        </span>
                                    )}
                                </div>
                                <div className="grid gap-2 text-sm">
                                    <div className="flex justify-between"><span>Budget</span><span
                                        className="font-semibold">{budgetTier === 'other' ? (customBudget || 'Please specify') : estimate.budgetLabel}</span></div>
                                    <div className="flex justify-between"><span>Timeline</span><span
                                        className="font-semibold">{timelineTier === 'other' ? (customTimeline || 'Please specify') : estimate.timelineLabel}</span></div>
                                    <div className="flex justify-between"><span>Industry</span><span
                                        className="font-semibold">{industryTier === 'other' ? (customIndustry || 'Please specify') : estimate.industryLabel}</span></div>
                                    <div className="flex justify-between"><span>Services</span><span
                                        className="font-semibold">{estimate.serviceCount}</span></div>
                                    <div className="flex justify-between"><span>Features</span><span
                                        className="font-semibold">{estimate.featureCount}</span></div>
                                </div>
                            </div>

                            <div className={`mt-4 rounded-md p-3 ${isDayTime ? 'bg-white/10' : 'bg-gray-50'}`}>
                                <div className="font-semibold mb-2">Project timeline (week-by-week)</div>
                                <div className="space-y-2 text-sm">
                                    {weekPoints.map((point, i) => (
                                        <div key={i}
                                             className={`rounded-md p-2 ${isDayTime ? 'bg-white/15' : 'bg-white'}`}>
                                            <div className="font-medium">Step {i + 1}</div>
                                            <div className="text-xs mt-1">{point}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>


                            <button
                                type="button"
                                onClick={() => setIsQuoteOpen(true)}
                                className={`w-full mt-3 rounded-md py-3 font-semibold transition ${
                                    isDayTime ? 'bg-white text-teal-800 hover:bg-white/90' : 'bg-teal-700 text-white hover:bg-teal-800'
                                }`}
                            >
                                Request Custom Quote
                            </button>
                        </div>
                    </div>
                </div>
            </motion.section>

            {isQuoteOpen && (
                <div
                    className={`fixed inset-0 z-50 ${isDayTime ? 'bg-black/50' : 'bg-black/70'} backdrop-blur-md flex items-center justify-center p-4`}
                    onClick={() => setIsQuoteOpen(false)}
                >
                    <div
                        ref={quoteWrapRef}
                        className="relative w-full max-w-4xl max-h-[90vh] overflow-auto"
                    >
                        <button
                            type="button"
                            onClick={() => setIsQuoteOpen(false)}
                            className="absolute top-4 right-4 z-10 text-black hover:text-gray-600"
                            aria-label="Close modal"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-8 w-8"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                        <QuoteRequest/>
                    </div>
                </div>
            )}
        </>
    );
}