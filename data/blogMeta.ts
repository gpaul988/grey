import type {BlogPost} from './blogPosts';
import {getBlogImage} from './blogMedia';

export interface BlogAuthorMeta {
    author: string;
    authorRole: string;
    authorAvatar: string;
}

export interface BlogPostMeta extends BlogAuthorMeta {
    publishedAt: string;
    heroImage: string;
    tags: string[];
}

const AUTHOR_BY_CATEGORY: Record<string, BlogAuthorMeta> = {
    'Product Strategy': {
        author: 'Grey InfoTech Ltd.',
        authorRole: '',
        authorAvatar: '',
    },
    'Delivery': {
        author: 'Grey InfoTech Ltd.',
        authorRole: '',
        authorAvatar: '',
    },
    'Engineering': {
        author: 'Grey InfoTech Ltd.',
        authorRole: '',
        authorAvatar: '',
    },
    'Operations': {
        author: 'Grey InfoTech Ltd.',
        authorRole: '',
        authorAvatar: '',
    },
    'Web Performance': {
        author: 'Grey InfoTech Ltd.',
        authorRole: '',
        authorAvatar: '',
    },
    'UX': {
        author: 'Grey InfoTech Ltd.',
        authorRole: '',
        authorAvatar: '',
    },
    'Backend': {
        author: 'Grey InfoTech Ltd.',
        authorRole: '',
        authorAvatar: '',
    },
    'Quality': {
        author: 'Grey InfoTech Ltd.',
        authorRole: '',
        authorAvatar: '',
    },
    'People': {
        author: 'Grey InfoTech Ltd.',
        authorRole: '',
        authorAvatar: '',
    },
    'Product': {
        author: 'Grey InfoTech Ltd.',
        authorRole: '',
        authorAvatar: '',
    },
    'Business': {
        author: 'Grey InfoTech Ltd.',
        authorRole: '',
        authorAvatar: '',
    },
    'Process': {
        author: 'Grey InfoTech Ltd.',
        authorRole: '',
        authorAvatar: '',
    },
    'AI': {
        author: 'Grey InfoTech Ltd.',
        authorRole: '',
        authorAvatar: '',
    },
    'Design': {
        author: 'Grey InfoTech Ltd.',
        authorRole: '',
        authorAvatar: '',
    },
    'Development': {
        author: 'Grey InfoTech Ltd.',
        authorRole: '',
        authorAvatar: '',
    },
    'Lightflows': {
        author: 'Grey InfoTech Ltd.',
        authorRole: '',
        authorAvatar: '',
    },
    'Security': {
        author: 'Grey InfoTech Ltd.',
        authorRole: '',
        authorAvatar: '',
    },
    'Startups': {
        author: 'Grey InfoTech Ltd.',
        authorRole: '',
        authorAvatar: '',
    },
    'Trends': {
        author: 'Grey InfoTech Ltd.',
        authorRole: '',
        authorAvatar: '',
    },
    'Web design': {
        author: 'Grey InfoTech Ltd.',
        authorRole: '',
        authorAvatar: '',
    },
    Uncategorized: {
        author: 'Grey InfoTech Ltd.',
        authorRole: '',
        authorAvatar: '',
    },
};

const TAGS_BY_CATEGORY: Record<string, string[]> = {
    'Product Strategy': ['Strategy', 'Discovery', 'Growth'],
    'Delivery': ['MVP', 'Scope', 'Launch'],
    'Engineering': ['Architecture', 'Code', 'Systems'],
    'Operations': ['Workflow', 'Efficiency', 'Internal Tools'],
    'Web Performance': ['Performance', 'SEO', 'Speed'],
    'UX': ['UX', 'Research', 'Interaction'],
    'Backend': ['APIs', 'Data', 'Reliability'],
    'Quality': ['Testing', 'QA', 'Automation'],
    'People': ['Hiring', 'Culture', 'Teams'],
    'Product': ['Analytics', 'Metrics', 'Retention'],
    'Business': ['Pricing', 'Value', 'Revenue'],
    'Process': ['Async', 'Communication', 'Workflow'],
    'AI': ['AI', 'Automation', 'Innovation'],
    'Design': ['UI', 'Visuals', 'Systems'],
    'Development': ['Frontend', 'Code', 'Build'],
    'Lightflows': ['Studio', 'Company', 'Culture'],
    'Security': ['Privacy', 'Compliance', 'Trust'],
    'Startups': ['Founders', 'Scale', 'Startup'],
    'Trends': ['Trends', 'Tools', '2025'],
    'Web design': ['Web Design', 'Creative', 'Brand'],
    Uncategorized: ['Blog', 'Insights'],
};

export function getBlogPostMeta(post: BlogPost): BlogPostMeta {
    const author = AUTHOR_BY_CATEGORY[post.tag] || AUTHOR_BY_CATEGORY.Uncategorized;
    return {
        author: post.author || author.author,
        authorRole: post.authorRole ?? author.authorRole,
        authorAvatar: post.authorAvatar || author.authorAvatar,
        publishedAt: new Date(post.date).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        }),
        heroImage: post.heroImage || getBlogImage(post.slug, post.tag),
        tags: post.tags?.length ? post.tags : (TAGS_BY_CATEGORY[post.tag] || [post.tag, 'Insights']),
    };
}

