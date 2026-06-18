import type {Metadata} from 'next';
import {buildMetadata} from '@/lib/seo';
import Screen from '@/screens/services/Vuejs-Development';

export const metadata: Metadata = buildMetadata('/services/Vuejs-Development');

export default function Page() {
    return <Screen/>;
}
