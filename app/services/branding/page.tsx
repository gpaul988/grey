import type {Metadata} from 'next';
import {buildMetadata} from '@/lib/seo';
import Screen from '@/screens/services/branding';

export const metadata: Metadata = buildMetadata('/services/branding');

export default function Page() {
    return <Screen/>;
}
