import type {Metadata} from 'next';
import {buildMetadata} from '@/lib/seo';
import Screen from '@/screens/careers';

export const metadata: Metadata = buildMetadata('/careers');

export default function Page() {
    return <Screen/>;
}
