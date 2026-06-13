import type {Metadata} from 'next';
import {buildMetadata} from '@/lib/seo';
import Screen from '@/screens/services/PHP-Development';

export const metadata: Metadata = buildMetadata('/services/PHP-Development');

export default function Page() {
    return <Screen/>;
}
