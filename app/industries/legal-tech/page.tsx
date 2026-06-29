import type {Metadata} from 'next';
import {buildMetadata} from '@/lib/seo';
import Screen from '@/screens/industries/legal-tech';

export const metadata: Metadata = buildMetadata('/industries/legal-tech');

export default function Page() {
    return <Screen/>;
}
