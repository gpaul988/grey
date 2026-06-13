import type {Metadata} from 'next';
import {buildMetadata} from '@/lib/seo';
import ProductScreen from '@/screens/store/products/[slug]';

export async function generateMetadata({params}: {params: Promise<{slug: string}>}): Promise<Metadata> {
    const {slug} = await params;
    const title = slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
    return buildMetadata('/store/products/' + slug, {
        title: title + ' — Store | Grey InfoTech',
        description: 'Buy ' + title + ' from the Grey InfoTech store.',
    });
}

export default function Page() {
    return <ProductScreen/>;
}
