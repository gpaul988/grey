'use client';
import dynamic from 'next/dynamic';

const Empty = dynamic(() => import('@/screens/empty'), { ssr: false });

export default function Page() {
  return <Empty />;
}
