import type {Metadata} from 'next';
import {buildMetadata} from '@/lib/seo';
import Screen from '@/screens/services/Web-Design';

export const metadata: Metadata = buildMetadata('/services/Web-Design');

export default function Page() {
    return <Screen/>;
}
