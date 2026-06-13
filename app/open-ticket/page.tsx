import type {Metadata} from 'next';
import {buildMetadata} from '@/lib/seo';
import Screen from '@/screens/open-ticket';

export const metadata: Metadata = buildMetadata('/open-ticket');

export default function Page() {
    return <Screen/>;
}
