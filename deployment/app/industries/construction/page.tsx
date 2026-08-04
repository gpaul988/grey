import type {Metadata} from 'next';
import {buildMetadata} from '@/lib/seo';
import Screen from '@/screens/industries/construction';

export const metadata: Metadata = buildMetadata('/industries/construction');

export default function Page() {
    return <Screen/>;
}
