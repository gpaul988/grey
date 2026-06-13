import type {Metadata} from 'next';
import {buildMetadata} from '@/lib/seo';
import Screen from '@/screens/services/ios-development';

export const metadata: Metadata = buildMetadata('/services/ios-development');

export default function Page() {
    return <Screen/>;
}
