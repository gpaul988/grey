import type {Metadata} from 'next';
import {buildMetadata} from '@/lib/seo';
import Screen from '@/screens/services/Mobile-Application-Development';

export const metadata: Metadata = buildMetadata('/services/Mobile-Application-Development');

export default function Page() {
    return <Screen/>;
}
