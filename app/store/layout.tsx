import React from 'react';
import Database from 'better-sqlite3';
import path from 'node:path';
import StoreLayout from '@/components/store/StoreLayout';
import { StoreProvider } from '@/components/store/StoreContext';

const DB_PATH = path.join(process.cwd(), 'Admin', 'data', 'grey.db');

export default function StoreLayoutWrapper({ children }: { children: React.ReactNode }) {
  let hasFlashSale = false;
  try {
    const db = new Database(DB_PATH, { readonly: true });
    try {
      const row = db.prepare("SELECT flash_sale, flash_sale_starts, flash_sale_ends FROM products WHERE status = 'active' AND flash_sale = 1 LIMIT 1").get();
      if (row) {
        const now = Date.now();
        const starts = row.flash_sale_starts ? Date.parse(row.flash_sale_starts) : NaN;
        const ends = row.flash_sale_ends ? Date.parse(row.flash_sale_ends) : NaN;
        if ((isNaN(starts) || now >= starts) && (isNaN(ends) || now <= ends)) {
          hasFlashSale = true;
        }
      }
    } finally {
      db.close();
    }
  } catch (err) {
    // swallow DB errors server-side but log for debugging
    // eslint-disable-next-line no-console
    console.error('[store layout] flash-sale check failed', err && (err as any).stack ? (err as any).stack : err);
    hasFlashSale = false;
  }

  return (
    <StoreProvider usdRate={1600} usdEnabled={true}>
      <StoreLayout hasFlashSale={hasFlashSale}>
        {children}
      </StoreLayout>
    </StoreProvider>
  );
}
