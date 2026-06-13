import type {Metadata} from 'next';
import {buildMetadata} from '@/lib/seo';
import Screen from '@/screens/store/cart';

export const metadata: Metadata = buildMetadata('/store/cart');

export default function Page() {
    return <Screen/>;
}
