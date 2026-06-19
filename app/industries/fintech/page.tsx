import type {Metadata} from 'next';
import {buildMetadata} from '@/lib/seo';
import Screen from '@/screens/industries/fintech';

export const metadata: Metadata = buildMetadata('/industries/fintech');

export default function Page() {
    return <Screen/>;
}
