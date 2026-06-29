import type {Metadata} from 'next';
import {buildMetadata} from '@/lib/seo';
import Screen from '@/screens/services/data-analytics';

export const metadata: Metadata = buildMetadata('/services/data-analytics');

export default function Page() {
    return <Screen/>;
}
