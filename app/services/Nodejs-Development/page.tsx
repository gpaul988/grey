import type {Metadata} from 'next';
import {buildMetadata} from '@/lib/seo';
import Screen from '@/screens/services/Nodejs-Development';

export const metadata: Metadata = buildMetadata('/services/Nodejs-Development');

export default function Page() {
    return <Screen/>;
}
