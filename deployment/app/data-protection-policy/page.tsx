import type {Metadata} from 'next';
import {buildMetadata} from '@/lib/seo';
import Screen from '@/screens/data-protection-policy';

export const metadata: Metadata = buildMetadata('/data-protection-policy');

export default function Page() {
    return <Screen/>;
}
