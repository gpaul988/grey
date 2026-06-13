import type {Metadata} from 'next';
import {buildMetadata} from '@/lib/seo';
import Screen from '@/screens/quote-request';

export const metadata: Metadata = buildMetadata('/quote-request');

export default function Page() {
    return <Screen/>;
}
