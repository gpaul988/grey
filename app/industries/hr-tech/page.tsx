import type {Metadata} from 'next';
import {buildMetadata} from '@/lib/seo';
import Screen from '@/screens/industries/hr-tech';

export const metadata: Metadata = buildMetadata('/industries/hr-tech');

export default function Page() {
    return <Screen/>;
}
