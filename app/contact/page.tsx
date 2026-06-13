import type {Metadata} from 'next';
import {buildMetadata} from '@/lib/seo';
import Screen from '@/screens/contact';

export const metadata: Metadata = buildMetadata('/contact');

export default function Page() {
    return <Screen/>;
}
