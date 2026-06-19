import type {Metadata} from 'next';
import {buildMetadata} from '@/lib/seo';
import Screen from '@/screens/store/checkout';

export const metadata: Metadata = buildMetadata('/store/checkout');

export default function Page() {
    return <Screen/>;
}
