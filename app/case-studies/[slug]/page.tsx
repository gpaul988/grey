import type {Metadata} from 'next';
import {buildMetadata} from '@/lib/seo';
import CaseStudyScreen from '@/screens/case-studies/[slug]';

const CASE_SLUGS = ['healthcare-platform-transformation','logistics-dashboard-optimization','fintech-product-launch','education-platform-expansion','enterprise-saas-rebrand'];
export function generateStaticParams() {
    return CASE_SLUGS.map((slug) => ({slug}));
}
export async function generateMetadata({params}: {params: Promise<{slug: string}>}): Promise<Metadata> {
    const {slug} = await params;
    const title = slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
    return buildMetadata('/case-studies/' + slug, {
        title: title + ' — Case Study | Grey InfoTech',
        description: 'How Grey InfoTech delivered measurable results: ' + title + '.',
    });
}

export default function Page() {
    return <CaseStudyScreen/>;
}
