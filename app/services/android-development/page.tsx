import type {Metadata} from 'next';
import {buildMetadata} from '@/lib/seo';
import Screen from '@/screens/services/android-development';

export const metadata: Metadata = buildMetadata('/services/android-development');

export default function Page() {
    return <Screen/>;
}
