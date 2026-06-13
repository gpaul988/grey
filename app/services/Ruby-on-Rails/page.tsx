import type {Metadata} from 'next';
import {buildMetadata} from '@/lib/seo';
import Screen from '@/screens/services/Ruby-on-Rails';

export const metadata: Metadata = buildMetadata('/services/Ruby-on-Rails');

export default function Page() {
    return <Screen/>;
}
