import type {Metadata} from 'next';
import {buildMetadata} from '@/lib/seo';
import Screen from '@/screens/industries/sports-tech';

export const metadata: Metadata = buildMetadata('/industries/sports-tech');

export default function Page() {
    return <Screen/>;
}
