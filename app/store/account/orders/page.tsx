import type {Metadata} from 'next';
import {buildMetadata} from '@/lib/seo';
import Screen from '@/screens/store/account/orders';

export const metadata: Metadata = buildMetadata('/store/account/orders');

export default function Page() {
    return <Screen/>;
}
