import type {Metadata} from 'next';
import {buildMetadata} from '@/lib/seo';
import Screen from '@/screens/services/seo';

export const metadata: Metadata = buildMetadata('/services/seo');

export default function Page() {
    return <Screen/>;
}
