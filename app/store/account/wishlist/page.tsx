import type {Metadata} from 'next';
import {buildMetadata} from '@/lib/seo';
import Screen from '@/screens/store/account/wishlist';

export const metadata: Metadata = buildMetadata('/store/account/wishlist');

export default function Page() {
    return <Screen/>;
}
