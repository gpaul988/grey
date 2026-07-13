import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import Screen from '@/screens/industries/port';

export const metadata: Metadata = buildMetadata('/industries/port');

export default function Page() {
    return <Screen />;
}
