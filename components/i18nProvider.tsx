'use client';

import React, { ReactNode, Suspense, useEffect, useState } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';

// Initialize i18next on client side only
let isInitialized = false;

const initI18n = async () => {
  if (isInitialized) return;

  try {
    if (!i18next.isInitialized) {
      // Only import and use i18n on client side
      const { default: i18n } = await import('@/lib/i18n');
      await i18n.init?.();
    }
    isInitialized = true;
  } catch (error) {
    console.error('Failed to initialize i18n:', error);
  }
};

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    initI18n().then(() => setIsReady(true));
  }, []);

  if (!isReady) {
    return <>{children}</>;
  }

  return (
    <I18nextProvider i18n={i18next}>
      <Suspense fallback={null}>
        {children}
      </Suspense>
    </I18nextProvider>
  );
};
