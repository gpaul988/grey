import type {Metadata} from 'next';
import {buildMetadata} from '@/lib/seo';
import Screen from '@/screens/store/products/index';

export const metadata: Metadata = buildMetadata('/store/products');

export default function Page() {
    return <Screen/>;
}
