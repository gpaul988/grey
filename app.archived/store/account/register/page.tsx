import type {Metadata} from 'next';
import {buildMetadata} from '@/lib/seo';
import Screen from '@/screens/store/account/register';

export const metadata: Metadata = buildMetadata('/store/account/register');

export default function Page() {
    return <Screen/>;
}
