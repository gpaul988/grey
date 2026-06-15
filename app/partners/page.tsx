import type {Metadata} from 'next';
import {buildMetadata} from '@/lib/seo';
import Screen from '@/screens/partners';

export const metadata: Metadata = buildMetadata('/partners');

export default function Page() {
    return <Screen/>;
}
