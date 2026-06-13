import type {Metadata} from 'next';
import {buildMetadata} from '@/lib/seo';
import Screen from '@/screens/Startups';

export const metadata: Metadata = buildMetadata('/Startups');

export default function Page() {
    return <Screen/>;
}
