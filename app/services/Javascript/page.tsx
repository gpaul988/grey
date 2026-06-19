import type {Metadata} from 'next';
import {buildMetadata} from '@/lib/seo';
import Screen from '@/screens/services/Javascript';

export const metadata: Metadata = buildMetadata('/services/Javascript');

export default function Page() {
    return <Screen/>;
}
