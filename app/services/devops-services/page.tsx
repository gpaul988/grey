import type {Metadata} from 'next';
import {buildMetadata} from '@/lib/seo';
import Screen from '@/screens/services/devops-services';

export const metadata: Metadata = buildMetadata('/services/devops-services');

export default function Page() {
    return <Screen/>;
}
