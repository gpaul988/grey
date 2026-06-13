import type {Metadata} from 'next';
import {buildMetadata} from '@/lib/seo';
import Screen from '@/screens/services/Software-Development';

export const metadata: Metadata = buildMetadata('/services/Software-Development');

export default function Page() {
    return <Screen/>;
}
