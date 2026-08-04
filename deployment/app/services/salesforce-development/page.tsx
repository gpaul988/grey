import type {Metadata} from 'next';
import {buildMetadata} from '@/lib/seo';
import Screen from '@/screens/services/salesforce-development';

export const metadata: Metadata = buildMetadata('/services/salesforce-development');

export default function Page() {
    return <Screen/>;
}
