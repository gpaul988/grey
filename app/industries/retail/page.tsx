import type {Metadata} from 'next';
import {buildMetadata} from '@/lib/seo';
import Screen from '@/screens/industries/retail';

export const metadata: Metadata = buildMetadata('/industries/retail');

export default function Page() {
    return <Screen/>;
}
