import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import Screen from '@/screens/services/maritime-port-management';

export const metadata: Metadata = buildMetadata('/services/maritime-port-management');

export default function Page() {
    return <Screen />;
}
