import type {Metadata} from 'next';
import {buildMetadata} from '@/lib/seo';
import Screen from '@/screens/industries/saas';

export const metadata: Metadata = buildMetadata('/industries/saas');

export default function Page() {
    return <Screen/>;
}
