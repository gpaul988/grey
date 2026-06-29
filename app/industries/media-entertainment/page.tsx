import type {Metadata} from 'next';
import {buildMetadata} from '@/lib/seo';
import Screen from '@/screens/industries/media-entertainment';

export const metadata: Metadata = buildMetadata('/industries/media-entertainment');

export default function Page() {
    return <Screen/>;
}
