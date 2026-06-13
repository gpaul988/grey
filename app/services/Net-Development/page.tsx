import type {Metadata} from 'next';
import {buildMetadata} from '@/lib/seo';
import Screen from '@/screens/services/Net-Development';

export const metadata: Metadata = buildMetadata('/services/Net-Development');

export default function Page() {
    return <Screen/>;
}
