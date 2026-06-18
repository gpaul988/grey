import type {Metadata} from 'next';
import {buildMetadata} from '@/lib/seo';
import Screen from '@/screens/services/React-Native-Development';

export const metadata: Metadata = buildMetadata('/services/React-Native-Development');

export default function Page() {
    return <Screen/>;
}
