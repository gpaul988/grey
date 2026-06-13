import type {Metadata} from 'next';
import {buildMetadata} from '@/lib/seo';
import Screen from '@/screens/services/Python-Development';

export const metadata: Metadata = buildMetadata('/services/Python-Development');

export default function Page() {
    return <Screen/>;
}
