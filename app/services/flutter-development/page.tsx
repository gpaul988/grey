import type {Metadata} from 'next';
import {buildMetadata} from '@/lib/seo';
import Screen from '@/screens/services/flutter-development';

export const metadata: Metadata = buildMetadata('/services/flutter-development');

export default function Page() {
    return <Screen/>;
}
