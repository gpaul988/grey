import type {Metadata} from 'next';
import {buildMetadata} from '@/lib/seo';
import Screen from '@/screens/industries/oil-and-gas';

export const metadata: Metadata = buildMetadata('/industries/oil-and-gas');

export default function Page() {
    return <Screen/>;
}
