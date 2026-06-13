import type {Metadata} from 'next';
import {buildMetadata} from '@/lib/seo';
import Screen from '@/screens/store/account/index';

export const metadata: Metadata = buildMetadata('/store/account');

export default function Page() {
    return <Screen/>;
}
