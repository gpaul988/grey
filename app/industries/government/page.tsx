import type {Metadata} from 'next';
import {buildMetadata} from '@/lib/seo';
import Screen from '@/screens/industries/government';

export const metadata: Metadata = buildMetadata('/industries/government');

export default function Page() {
    return <Screen/>;
}
