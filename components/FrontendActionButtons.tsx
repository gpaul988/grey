'use client';

import { usePathname } from 'next/navigation';
import AIChat from '@/components/AIChat';
import FloatingButton from '@/components/FloatingButton';

export default function FrontendActionButtons() {
  const pathname = usePathname();

  if (!pathname || pathname.startsWith('/store') || pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <>
      <AIChat />
      <FloatingButton />
    </>
  );
}
