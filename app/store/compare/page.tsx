import type {Metadata} from 'next';
import {buildMetadata} from '@/lib/seo';
import Screen from '@/screens/store/compare';

export const metadata: Metadata = buildMetadata('/store/compare');

export default function Page() {
    return <Screen/>;
}
