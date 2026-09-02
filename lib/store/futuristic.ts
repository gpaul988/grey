export interface ProductSignal {
  id: number;
  name: string;
  category?: string;
  tags?: string[];
  featured?: number;
  stock?: number;
  price?: number;
  rating?: number;
}

export interface RecommendationItem {
  id: number;
  name: string;
  reason: string;
  score: number;
  category: string;
}

export function buildRecommendations(products: ProductSignal[], intent?: string, cartCategory?: string) {
  const profile = (intent || cartCategory || 'laptops').toLowerCase();
  return products
    .map((product) => {
      const tags = (product.tags || []).map((tag) => tag.toLowerCase());
      const category = (product.category || 'general').toLowerCase();
      let score = 36;
      if (product.featured) score += 18;
      if (product.stock && product.stock > 0) score += 8;
      if (product.rating) score += product.rating * 4;
      if (category.includes(profile) || tags.some((tag) => tag.includes(profile))) score += 20;
      if (cartCategory && (category.includes(cartCategory.toLowerCase()) || tags.some((tag) => tag.includes(cartCategory.toLowerCase())))) score += 12;
      if (profile.includes('phone') && tags.some((tag) => tag.includes('phone') || tag.includes('mobile'))) score += 18;
      if (profile.includes('laptop') && tags.some((tag) => tag.includes('laptop') || tag.includes('creator'))) score += 18;
      if (profile.includes('server') && tags.some((tag) => tag.includes('server') || tag.includes('enterprise'))) score += 18;
      if (product.price && product.price > 2500000) score -= 4;
      return {
        id: product.id,
        name: product.name,
        reason: buildReason(category, tags, profile),
        score: Math.max(0, Math.min(100, Math.round(score))),
        category: category || 'general',
      } as RecommendationItem;
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 6);
}

function buildReason(category: string, tags: string[], profile: string) {
  if (category.includes(profile) || tags.some((tag) => tag.includes(profile))) {
    return 'Highly aligned with your current shopping intent';
  }
  if (tags.some((tag) => tag.includes('creator') || tag.includes('business') || tag.includes('premium'))) {
    return 'Top-rated choice for modern work and performance';
  }
  return 'Popular with customers who prefer premium, reliable tech';
}

export function getLoyaltySnapshot() {
  return {
    customerId: 'guest-user',
    points: 3850,
    tier: 'Platinum',
    nextTier: 'Diamond',
    progress: 74,
    rewards: [
      { name: 'Free express delivery', value: 1200 },
      { name: 'Premium support credit', value: 800 },
      { name: 'Laptop bundle discount', value: 1500 },
    ],
    referrals: 8,
    vipBenefits: ['Priority checkout', 'Exclusive drops', 'Early product access'],
  };
}

export const storeAnalytics = new Map<string, number>();

export function recordStoreEvent(eventType: string, value = 1) {
  const key = eventType.toLowerCase();
  storeAnalytics.set(key, (storeAnalytics.get(key) || 0) + value);
}

export function getAnalyticsSnapshot() {
  return {
    pageViews: storeAnalytics.get('page_view') || 0,
    addToCart: storeAnalytics.get('add_to_cart') || 0,
    checkoutStarts: storeAnalytics.get('checkout_start') || 0,
    completedOrders: storeAnalytics.get('order_completed') || 0,
    loyaltyClaims: storeAnalytics.get('loyalty_claim') || 0,
    activeFunnels: [
      { name: 'Homepage to product', rate: 72 },
      { name: 'Product to cart', rate: 61 },
      { name: 'Cart to checkout', rate: 48 },
      { name: 'Checkout to order', rate: 41 },
    ],
    topSearches: ['laptops', 'gaming laptops', 'phones', 'servers', 'accessories'],
  };
}

export function getAbandonedCartSuggestions() {
  return {
    reminderDelay: '2 hours',
    recoveryRate: '26%',
    subject: 'Your cart is still waiting',
    message: 'You left premium tech in your cart. We saved it for you with a limited-time bundle offer.',
  };
}
