import type {Metadata} from 'next';
import {buildMetadata} from '@/lib/seo';
import Screen from '@/screens/industries/insurance';

export const metadata: Metadata = buildMetadata('/industries/insurance');

export default function Page() {
    return <Screen/>;
}
