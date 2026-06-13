import type {Metadata} from 'next';
import {buildMetadata} from '@/lib/seo';
import Screen from '@/screens/industries/logistics';

export const metadata: Metadata = buildMetadata('/industries/logistics');

export default function Page() {
    return <Screen/>;
}
