import type {Metadata} from 'next';
import {buildMetadata} from '@/lib/seo';
import Screen from '@/screens/case-studies';

export const metadata: Metadata = buildMetadata('/case-studies');

export default function Page() {
    return <Screen/>;
}
