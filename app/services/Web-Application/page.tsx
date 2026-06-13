import type {Metadata} from 'next';
import {buildMetadata} from '@/lib/seo';
import Screen from '@/screens/services/Web-Application';

export const metadata: Metadata = buildMetadata('/services/Web-Application');

export default function Page() {
    return <Screen/>;
}
