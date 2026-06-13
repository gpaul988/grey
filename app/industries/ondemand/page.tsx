import type {Metadata} from 'next';
import {buildMetadata} from '@/lib/seo';
import Screen from '@/screens/industries/ondemand';

export const metadata: Metadata = buildMetadata('/industries/ondemand');

export default function Page() {
    return <Screen/>;
}
