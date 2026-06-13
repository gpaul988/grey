import type {Metadata} from 'next';
import {buildMetadata} from '@/lib/seo';
import Screen from '@/screens/services/cross-platform-development';

export const metadata: Metadata = buildMetadata('/services/cross-platform-development');

export default function Page() {
    return <Screen/>;
}
