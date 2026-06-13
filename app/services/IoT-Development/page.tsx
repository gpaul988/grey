import type {Metadata} from 'next';
import {buildMetadata} from '@/lib/seo';
import Screen from '@/screens/services/IoT-Development';

export const metadata: Metadata = buildMetadata('/services/IoT-Development');

export default function Page() {
    return <Screen/>;
}
