import type {Metadata} from 'next';
import {buildMetadata} from '@/lib/seo';
import Screen from '@/screens/faq';

export const metadata: Metadata = buildMetadata('/faq');

export default function Page() {
    return <Screen/>;
}
