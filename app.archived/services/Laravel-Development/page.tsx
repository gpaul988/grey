import type {Metadata} from 'next';
import {buildMetadata} from '@/lib/seo';
import Screen from '@/screens/services/Laravel-Development';

export const metadata: Metadata = buildMetadata('/services/Laravel-Development');

export default function Page() {
    return <Screen/>;
}
