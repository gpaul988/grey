import type {Metadata} from 'next';
import {buildMetadata} from '@/lib/seo';
import Screen from '@/screens/services/Nextjs-Development';

export const metadata: Metadata = buildMetadata('/services/Nextjs-Development');

export default function Page() {
    return <Screen/>;
}
