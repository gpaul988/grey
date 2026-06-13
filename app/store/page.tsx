import type {Metadata} from 'next';
import {buildMetadata} from '@/lib/seo';
import Screen from '@/screens/store/index';

export const metadata: Metadata = buildMetadata('/store');

export default function Page() {
    return <Screen/>;
}
