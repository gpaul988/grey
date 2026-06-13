import type {Metadata} from 'next';
import {buildMetadata} from '@/lib/seo';
import Screen from '@/screens/services/erp-development';

export const metadata: Metadata = buildMetadata('/services/erp-development');

export default function Page() {
    return <Screen/>;
}
