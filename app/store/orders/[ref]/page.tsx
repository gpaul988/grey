import type {Metadata} from 'next';
import {buildMetadata} from '@/lib/seo';
import OrderScreen from '@/screens/store/orders/[ref]';

export async function generateMetadata({params}: {params: Promise<{ref: string}>}): Promise<Metadata> {
    const {ref} = await params;
    return buildMetadata('/store/orders', {
        title: 'Order ' + ref + ' — Grey InfoTech Store',
        description: 'View your order details and status.',
        noindex: true,
    });
}

export default function Page() {
    return <OrderScreen/>;
}
