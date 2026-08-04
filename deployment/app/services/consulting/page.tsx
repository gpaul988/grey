import type {Metadata} from 'next';
import {buildMetadata} from '@/lib/seo';
import Screen from '@/screens/services/consulting';

export const metadata: Metadata = buildMetadata('/services/consulting');

export default function Page() {
    return <Screen/>;
}
