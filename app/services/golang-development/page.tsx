import type {Metadata} from 'next';
import {buildMetadata} from '@/lib/seo';
import Screen from '@/screens/services/golang-development';

export const metadata: Metadata = buildMetadata('/services/golang-development');

export default function Page() {
    return <Screen/>;
}
