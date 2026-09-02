export interface ShippingQuoteInput {
  country?: string | null;
  state?: string | null;
  subtotal?: number;
  weightKg?: number;
}

export interface CouponValidationResult {
  valid: boolean;
  type: 'percentage' | 'fixed' | 'none';
  value: number;
  message?: string;
  discount: number;
}

const couponCatalog: Record<string, { type: 'percentage' | 'fixed'; value: number; minOrder: number }> = {
  GREY10: { type: 'percentage', value: 10, minOrder: 40000 },
  GREY20: { type: 'percentage', value: 20, minOrder: 120000 },
  SAVE5000: { type: 'fixed', value: 5000, minOrder: 70000 },
  FREESHIP: { type: 'fixed', value: 5000, minOrder: 0 },
};

export function calculateShippingCost({ country, state, subtotal = 0, weightKg = 0 }: ShippingQuoteInput) {
  const normalizedCountry = String(country || 'NG').trim().toUpperCase();
  const normalizedState = String(state || 'Lagos').trim().toLowerCase();

  const base = normalizedCountry === 'NG' ? 2500 : 9000;
  const stateSurcharge = ['lagos', 'abuja', 'port harcourt', 'ibadan'].includes(normalizedState) ? 0 : 1800;
  const subtotalSurcharge = subtotal >= 200000 ? 0 : 1200;
  const weightCharge = Math.max(0, Number(weightKg || 0)) * 1200;

  return Math.round(base + stateSurcharge + subtotalSurcharge + weightCharge);
}

export function calculateTax({ country, state, subtotal = 0 }: { country?: string | null; state?: string | null; subtotal?: number }) {
  const normalizedCountry = String(country || 'NG').trim().toUpperCase();
  const normalizedState = String(state || '').trim().toLowerCase();

  if (normalizedCountry !== 'NG') {
    return Math.round(subtotal * 0.08);
  }

  const rate = ['lagos', 'abuja', 'rivers'].includes(normalizedState) ? 0.075 : 0.085;
  return Math.round(subtotal * rate);
}

export function validateCouponCode(code: string, subtotal: number): CouponValidationResult {
  const normalized = String(code || '').trim().toUpperCase();
  if (!normalized) {
    return { valid: false, type: 'none', value: 0, message: 'Coupon code is required.', discount: 0 };
  }

  const coupon = couponCatalog[normalized];
  if (!coupon) {
    return { valid: false, type: 'none', value: 0, message: 'Coupon code is invalid or expired.', discount: 0 };
  }

  if (subtotal < coupon.minOrder) {
    return {
      valid: false,
      type: coupon.type,
      value: coupon.value,
      message: `Minimum order value not reached for ${normalized}.`,
      discount: 0,
    };
  }

  const discount = coupon.type === 'percentage' ? subtotal * (coupon.value / 100) : coupon.value;
  return {
    valid: true,
    type: coupon.type,
    value: coupon.value,
    message: 'Coupon applied successfully.',
    discount: Math.round(discount),
  };
}

export function validateAddress({
  firstName,
  lastName,
  phone,
  address,
  city,
  state,
  country,
}: {
  firstName?: string | null;
  lastName?: string | null;
  phone?: string | null;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  country?: string | null;
}) {
  const errors: string[] = [];

  if (!firstName || firstName.trim().length < 2) errors.push('First name is required.');
  if (!lastName || lastName.trim().length < 2) errors.push('Last name is required.');
  if (!phone || phone.replace(/\D/g, '').length < 7) errors.push('A valid phone number is required.');
  if (!address || address.trim().length < 5) errors.push('Street address is required.');
  if (!city || city.trim().length < 2) errors.push('City is required.');
  if (!state || state.trim().length < 2) errors.push('State is required.');
  if (!country || country.trim().length < 2) errors.push('Country is required.');

  return {
    valid: errors.length === 0,
    errors,
  };
}

export function buildOrderSummary({
  subtotal,
  shippingCost,
  tax,
  couponDiscount = 0,
}: {
  subtotal: number;
  shippingCost: number;
  tax: number;
  couponDiscount?: number;
}) {
  const discountedSubtotal = Math.max(0, subtotal - couponDiscount);
  const total = discountedSubtotal + shippingCost + tax;

  return {
    subtotal,
    couponDiscount,
    discountedSubtotal,
    shippingCost,
    tax,
    total,
  };
}
