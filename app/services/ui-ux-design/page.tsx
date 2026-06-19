import type {Metadata} from 'next';
import {buildMetadata} from '@/lib/seo';
import Screen from '@/screens/services/ui-ux-design';

export const metadata: Metadata = buildMetadata('/services/ui-ux-design');

export default function Page() {
    return <Screen/>;
}
