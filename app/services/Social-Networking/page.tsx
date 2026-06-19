import type {Metadata} from 'next';
import {buildMetadata} from '@/lib/seo';
import Screen from '@/screens/services/Social-Networking';

export const metadata: Metadata = buildMetadata('/services/Social-Networking');

export default function Page() {
    return <Screen/>;
}
