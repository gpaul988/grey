import type {Metadata} from 'next';
import {buildMetadata} from '@/lib/seo';
import Screen from '@/screens/store/account/forgot-password';

export const metadata: Metadata = buildMetadata('/store/account/login', {
    title: 'Forgot Password',
    description: 'Reset your Grey TechStore account password.',
});

export default function Page() {
    return <Screen />;
}
