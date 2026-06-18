import type {Metadata} from 'next';
import {buildMetadata} from '@/lib/seo';
import Screen from '@/screens/services/Web-Development';

export const metadata: Metadata = buildMetadata('/services/Web-Development');

export default function Page() {
    return <Screen/>;
}
