import type {Metadata} from 'next';
import {buildMetadata} from '@/lib/seo';
import Screen from '@/screens/store/account/reset-password';

export const metadata: Metadata = buildMetadata('/store/account/login', {
    title: 'Reset Password',
    description: 'Choose a new password for your Grey TechStore account.',
});

export default function Page() {
    return <Screen />;
}
