import type {Metadata} from 'next';
import {buildMetadata} from '@/lib/seo';
import Screen from '@/screens/store/account/login';

export const metadata: Metadata = buildMetadata('/store/account/login');

export default function Page() {
    return <Screen/>;
}
