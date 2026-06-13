import type {Metadata} from 'next';
import {buildMetadata} from '@/lib/seo';
import Screen from '@/screens/industries/e-commerce-development';

export const metadata: Metadata = buildMetadata('/industries/e-commerce-development');

export default function Page() {
    return <Screen/>;
}
