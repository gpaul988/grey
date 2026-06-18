import type {Metadata} from 'next';
import {buildMetadata} from '@/lib/seo';
import Screen from '@/screens/industries/education';

export const metadata: Metadata = buildMetadata('/industries/education');

export default function Page() {
    return <Screen/>;
}
