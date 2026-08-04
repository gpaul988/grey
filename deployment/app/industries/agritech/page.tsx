import type {Metadata} from 'next';
import {buildMetadata} from '@/lib/seo';
import Screen from '@/screens/industries/agritech';

export const metadata: Metadata = buildMetadata('/industries/agritech');

export default function Page() {
    return <Screen/>;
}
