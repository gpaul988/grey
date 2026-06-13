import type {Metadata} from 'next';
import {buildMetadata} from '@/lib/seo';
import Screen from '@/screens/Our-Approach';

export const metadata: Metadata = buildMetadata('/Our-Approach');

export default function Page() {
    return <Screen/>;
}
