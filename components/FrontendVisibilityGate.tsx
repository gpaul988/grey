'use client';

import { usePathname } from 'next/navigation';
import AIChat from '@/components/AIChat';
import FloatingButton from '@/components/FloatingButton';
import AnnouncementBarWrapper from '@/components/futuristic/AnnouncementBarWrapper';

export default function FrontendVisibilityGate() {
  const pathname = usePathname();
  const isStoreFrontend = pathname?.startsWith('/store') || pathname?.startsWith('/admin');

  if (isStoreFrontend) return null;

  return (
    <>
      <AnnouncementBarWrapper />
      <AIChat />
      <FloatingButton />
    </>
  );
}
