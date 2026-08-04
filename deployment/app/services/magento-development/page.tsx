import type {Metadata} from 'next';
import {buildMetadata} from '@/lib/seo';
import Screen from '@/screens/services/magento-development';

export const metadata: Metadata = buildMetadata('/services/magento-development');

export default function Page() {
    return <Screen/>;
}
