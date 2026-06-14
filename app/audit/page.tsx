import type {Metadata} from 'next';
import {buildMetadata} from '@/lib/seo';
import Screen from '@/screens/audit';

export const metadata: Metadata = buildMetadata('/', {
    title: 'Free Website & GitHub Repo Audit',
    description:
        'Run a brutally honest security, performance, SEO, and engineering audit on any live website or GitHub repository — and see exactly what it lacks.',
});

export default function Page() {
    return <Screen />;
}
