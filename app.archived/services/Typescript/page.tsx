import type {Metadata} from 'next';
import {buildMetadata} from '@/lib/seo';
import Screen from '@/screens/services/Typescript';

export const metadata: Metadata = buildMetadata('/services/Typescript');

export default function Page() {
    return <Screen/>;
}
