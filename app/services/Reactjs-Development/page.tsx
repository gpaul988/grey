import type {Metadata} from 'next';
import {buildMetadata} from '@/lib/seo';
import Screen from '@/screens/services/Reactjs-Development';

export const metadata: Metadata = buildMetadata('/services/Reactjs-Development');

export default function Page() {
    return <Screen/>;
}
