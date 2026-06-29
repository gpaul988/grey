import type {Metadata} from 'next';
import {buildMetadata} from '@/lib/seo';
import Screen from '@/screens/services/qa-testing';

export const metadata: Metadata = buildMetadata('/services/qa-testing');

export default function Page() {
    return <Screen/>;
}
