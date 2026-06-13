import type {Metadata} from 'next';
import {buildMetadata} from '@/lib/seo';
import Screen from '@/screens/industries/biotech';

export const metadata: Metadata = buildMetadata('/industries/biotech');

export default function Page() {
    return <Screen/>;
}
