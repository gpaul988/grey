export interface FlashItem { flash_sale?: number | string; flash_sale_starts?: string | null; flash_sale_ends?: string | null }

export function isActiveFlashSale(item: FlashItem, now = Date.now()): boolean {
  if (Number(item.flash_sale ?? 0) !== 1) return false;
  const starts = item.flash_sale_starts ? Date.parse(item.flash_sale_starts) : NaN;
  const ends = item.flash_sale_ends ? Date.parse(item.flash_sale_ends) : NaN;
  if (!isNaN(starts) && now < starts) return false;
  if (!isNaN(ends) && now > ends) return false;
  return true;
}
