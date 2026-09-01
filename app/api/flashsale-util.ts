export function isActiveFlashSale(item: any, now: number = Date.now()): boolean {
  try {
    if (!item) return false;
    if (Number(item.flash_sale) !== 1) return false;
    const starts = item.flash_sale_starts ? Date.parse(item.flash_sale_starts) : NaN;
    const ends = item.flash_sale_ends ? Date.parse(item.flash_sale_ends) : NaN;
    if (!isNaN(starts) && now < starts) return false;
    if (!isNaN(ends) && now > ends) return false;
    return true;
  } catch (e) {
    return false;
  }
}
