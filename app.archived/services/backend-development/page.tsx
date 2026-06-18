import type {Metadata} from 'next';
import {buildMetadata} from '@/lib/seo';
import Screen from '@/screens/services/backend-development';

export const metadata: Metadata = buildMetadata('/services/backend-development');

export default function Page() {
    return <Screen/>;
}
