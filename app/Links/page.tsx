import type {Metadata} from 'next';
import {buildMetadata} from '@/lib/seo';
import Screen from '@/screens/Links';

export const metadata: Metadata = buildMetadata('/Links');

export default function Page() {
    return <Screen/>;
}
