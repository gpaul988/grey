import type {Metadata} from 'next';
import {buildMetadata} from '@/lib/seo';
import Screen from '@/screens/services/ai-development-services';

export const metadata: Metadata = buildMetadata('/services/ai-development-services');

export default function Page() {
    return <Screen/>;
}
