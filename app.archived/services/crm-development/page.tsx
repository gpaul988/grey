import type {Metadata} from 'next';
import {buildMetadata} from '@/lib/seo';
import Screen from '@/screens/services/crm-development';

export const metadata: Metadata = buildMetadata('/services/crm-development');

export default function Page() {
    return <Screen/>;
}
