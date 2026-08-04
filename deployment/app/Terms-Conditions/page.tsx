import type {Metadata} from 'next';
import {buildMetadata} from '@/lib/seo';
import Screen from '@/screens/Terms-Conditions';

export const metadata: Metadata = buildMetadata('/Terms-Conditions');

export default function Page() {
    return <Screen/>;
}
