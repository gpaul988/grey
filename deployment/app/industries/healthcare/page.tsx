import type {Metadata} from 'next';
import {buildMetadata} from '@/lib/seo';
import Screen from '@/screens/industries/healthcare';

export const metadata: Metadata = buildMetadata('/industries/healthcare');

export default function Page() {
    return <Screen/>;
}
