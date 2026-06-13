import type {Metadata} from 'next';
import {buildMetadata} from '@/lib/seo';
import BlogPostScreen from '@/screens/blog/[slug]';

import {getBlogPostBySlug, blogPosts} from '@/data/blogPosts';
export function generateStaticParams() {
    return blogPosts.map((p) => ({slug: p.slug}));
}
export async function generateMetadata({params}: {params: Promise<{slug: string}>}): Promise<Metadata> {
    const {slug} = await params;
    const post = getBlogPostBySlug(slug);
    if (!post) return buildMetadata('/blog');
    return buildMetadata('/blog/' + slug, {
        title: post.title + ' — Grey InfoTech Blog',
        description: post.excerpt || post.title,
        image: post.heroImage,
    });
}

export default function Page() {
    return <BlogPostScreen/>;
}
