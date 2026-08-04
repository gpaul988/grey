import type {Metadata} from 'next';
import {buildMetadata} from '@/lib/seo';
import Screen from '@/screens/services/cybersecurity';

export const metadata: Metadata = buildMetadata('/services/cybersecurity');

export default function Page() {
    return <Screen/>;
}
