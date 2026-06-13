import type {Metadata} from 'next';
import {buildMetadata} from '@/lib/seo';
import Screen from '@/screens/industries/real-estate';

export const metadata: Metadata = buildMetadata('/industries/real-estate');

export default function Page() {
    return <Screen/>;
}
