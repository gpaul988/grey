import type {Metadata} from 'next';
import {buildMetadata} from '@/lib/seo';
import Screen from '@/screens/services/MVP';

export const metadata: Metadata = buildMetadata('/services/MVP');

export default function Page() {
    return <Screen/>;
}
