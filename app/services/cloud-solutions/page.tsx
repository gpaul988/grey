import type {Metadata} from 'next';
import {buildMetadata} from '@/lib/seo';
import Screen from '@/screens/services/cloud-solutions';

export const metadata: Metadata = buildMetadata('/services/cloud-solutions');

export default function Page() {
    return <Screen/>;
}
