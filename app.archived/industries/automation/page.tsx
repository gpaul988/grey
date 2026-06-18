import type {Metadata} from 'next';
import {buildMetadata} from '@/lib/seo';
import Screen from '@/screens/industries/automation';

export const metadata: Metadata = buildMetadata('/industries/automation');

export default function Page() {
    return <Screen/>;
}
