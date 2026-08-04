import type {Metadata} from 'next';
import {buildMetadata} from '@/lib/seo';
import Screen from '@/screens/services/discovery-phase';

export const metadata: Metadata = buildMetadata('/services/discovery-phase');

export default function Page() {
    return <Screen/>;
}
