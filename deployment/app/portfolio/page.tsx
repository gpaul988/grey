import type {Metadata} from 'next';
import {buildMetadata} from '@/lib/seo';
import Screen from '@/screens/portfolio';

export const metadata: Metadata = buildMetadata('/portfolio');

export default function Page() {
    return <Screen/>;
}
