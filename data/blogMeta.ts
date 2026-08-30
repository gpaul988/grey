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
        author: 'Graham Sobiribo Paul',
        authorRole: '',
        authorAvatar: '',
    },
    'Delivery': {
        author: 'Graham Sobiribo Paul',
        authorRole: '',
        authorAvatar: '',
    },
    'Engineering': {
        author: 'Graham Sobiribo Paul',
        authorRole: '',
        authorAvatar: '',
    },
    'Operations': {
        author: 'Graham Sobiribo Paul',
        authorRole: '',
        authorAvatar: '',
    },
    'Web Performance': {
        author: 'Graham Sobiribo Paul',
        authorRole: '',
        authorAvatar: '',
    },
    'UX': {
        author: 'Graham Sobiribo Paul',
        authorRole: '',
        authorAvatar: '',
    },
    'Backend': {
        author: 'Graham Sobiribo Paul',
        authorRole: '',
        authorAvatar: '',
    },
    'Quality': {
        author: 'Graham Sobiribo Paul',
        authorRole: '',
        authorAvatar: '',
    },
    'People': {
        author: 'Graham Sobiribo Paul',
        authorRole: '',
        authorAvatar: '',
    },
    'Product': {
        author: 'Graham Sobiribo Paul',
        authorRole: '',
        authorAvatar: '',
    },
    'Business': {
        author: 'Graham Sobiribo Paul',
        authorRole: '',
        authorAvatar: '',
    },
    'Process': {
        author: 'Graham Sobiribo Paul',
        authorRole: '',
        authorAvatar: '',
    },
    'AI': {
        author: 'Graham Sobiribo Paul',
        authorRole: '',
        authorAvatar: '',
    },
    'Design': {
        author: 'Graham Sobiribo Paul',
        authorRole: '',
        authorAvatar: '',
    },
    'Development': {
        author: 'Graham Sobiribo Paul',
        authorRole: '',
        authorAvatar: '',
    },
    'Lightflows': {
        author: 'Graham Sobiribo Paul',
        authorRole: '',
        authorAvatar: '',
    },
    'Security': {
        author: 'Graham Sobiribo Paul',
        authorRole: '',
        authorAvatar: '',
    },
    'Startups': {
        author: 'Graham Sobiribo Paul',
        authorRole: '',
        authorAvatar: '',
    },
    'Trends': {
        author: 'Graham Sobiribo Paul',
        authorRole: '',
        authorAvatar: '',
    },
    'Web design': {
        author: 'Graham Sobiribo Paul',
        authorRole: '',
        authorAvatar: '',
    },
    Uncategorized: {
        author: 'Graham Sobiribo Paul',
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

