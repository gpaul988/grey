import type {Metadata} from 'next';
import {buildMetadata} from '@/lib/seo';
import Screen from '@/screens/services/unity-development';

export const metadata: Metadata = buildMetadata('/services/unity-development');

export default function Page() {
    return <Screen/>;
}
