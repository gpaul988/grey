import type {Metadata} from 'next';
import {buildMetadata} from '@/lib/seo';
import Screen from '@/screens/services/hybrid-app-development';

export const metadata: Metadata = buildMetadata('/services/hybrid-app-development');

export default function Page() {
    return <Screen/>;
}
