import type {Metadata} from 'next';
import {buildMetadata} from '@/lib/seo';
import Screen from '@/screens/blog';

export const metadata: Metadata = buildMetadata('/blog');

export default function Page() {
    return <Screen/>;
}
