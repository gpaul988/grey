import type {Metadata} from 'next';
import {buildMetadata} from '@/lib/seo';
import Screen from '@/screens/services/blockchain-development';

export const metadata: Metadata = buildMetadata('/services/blockchain-development');

export default function Page() {
    return <Screen/>;
}
