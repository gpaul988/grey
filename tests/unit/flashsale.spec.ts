import { describe, it, expect } from 'vitest';
import { isActiveFlashSale } from '../../app/api/store/flashsale-util';

describe('isActiveFlashSale', () => {
  it('returns false when flash_sale is not 1', () => {
    expect(isActiveFlashSale({ flash_sale: 0 })).toBe(false);
  });

  it('returns true when flash_sale is 1 and no starts/ends set', () => {
    expect(isActiveFlashSale({ flash_sale: 1 })).toBe(true);
  });

  it('respects start and end times (future start)', () => {
    const future = new Date(Date.now() + 60 * 60 * 1000).toISOString();
    expect(isActiveFlashSale({ flash_sale: 1, flash_sale_starts: future })).toBe(false);
  });

  it('respects start and end times (ended)', () => {
    const past = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    expect(isActiveFlashSale({ flash_sale: 1, flash_sale_ends: past })).toBe(false);
  });

  it('returns true when within window', () => {
    const past = new Date(Date.now() - 10 * 60 * 1000).toISOString();
    const future = new Date(Date.now() + 10 * 60 * 60 * 1000).toISOString();
    expect(isActiveFlashSale({ flash_sale: 1, flash_sale_starts: past, flash_sale_ends: future })).toBe(true);
  });
});
