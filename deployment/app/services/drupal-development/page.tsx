import type {Metadata} from 'next';
import {buildMetadata} from '@/lib/seo';
import Screen from '@/screens/services/drupal-development';

export const metadata: Metadata = buildMetadata('/services/drupal-development');

export default function Page() {
    return <Screen/>;
}
