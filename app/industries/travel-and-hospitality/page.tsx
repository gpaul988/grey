import type {Metadata} from 'next';
import {buildMetadata} from '@/lib/seo';
import Screen from '@/screens/industries/travel-and-hospitality';

export const metadata: Metadata = buildMetadata('/industries/travel-and-hospitality');

export default function Page() {
    return <Screen/>;
}
