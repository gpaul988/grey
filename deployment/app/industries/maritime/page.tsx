import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import Screen from '@/screens/industries/maritime';

export const metadata: Metadata = buildMetadata('/industries/maritime');

export default function Page() {
    return <Screen />;
}
