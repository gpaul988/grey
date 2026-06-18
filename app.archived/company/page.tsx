import type {Metadata} from 'next';
import {buildMetadata} from '@/lib/seo';
import Screen from '@/screens/company';

export const metadata: Metadata = buildMetadata('/company');

export default function Page() {
    return <Screen/>;
}
