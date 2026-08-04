import type {Metadata} from 'next';
import {buildMetadata} from '@/lib/seo';
import Screen from '@/screens/services/wordpress-development';

export const metadata: Metadata = buildMetadata('/services/wordpress-development');

export default function Page() {
    return <Screen/>;
}
