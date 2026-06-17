/**
 * AI Recommendations Engine
 * Uses collaborative filtering + content-based approach
 */

import { db } from './db';

interface UserInteraction {
  userId: string;
  serviceId: string;
  type: 'view' | 'quote' | 'purchase'; // Different weights
  timestamp: Date;
}

interface ServiceVector {
  serviceId: string;
  category: string;
  price: number;
  description: string;
}

/**
 * Calculate cosine similarity between two vectors
 */
function cosineSimilarity(a: number[], b: number[]): number {
  const dotProduct = a.reduce((sum, x, i) => sum + x * b[i], 0);
  const magA = Math.sqrt(a.reduce((sum, x) => sum + x * x, 0));
  const magB = Math.sqrt(b.reduce((sum, x) => sum + x * x, 0));

  if (magA === 0 || magB === 0) return 0;
  return dotProduct / (magA * magB);
}

/**
 * Get recommendations for a user
 * Combines collaborative + content-based filtering
 */
export async function getRecommendations(
  userId: string,
  limit: number = 5
): Promise<string[]> {
  try {
    // Get user's interaction history
    const userHistory = await getUserInteractions(userId);

    if (userHistory.length === 0) {
      // Cold start: return trending/popular services
      return getPopularServices(limit);
    }

    // Get all services
    const allServices = await getAllServices();

    // Score each service based on collaborative + content similarity
    const scores = new Map<string, number>();

    for (const service of allServices) {
      // Skip already viewed/purchased
      if (userHistory.some(h => h.serviceId === service.serviceId)) {
        continue;
      }

      let score = 0;

      // Content-based: similarity to user's viewed services
      for (const interaction of userHistory) {
        const viewedService = allServices.find(s => s.serviceId === interaction.serviceId);
        if (viewedService) {
          const similarity = calculateServiceSimilarity(viewedService, service);
          const weight = getInteractionWeight(interaction.type);
          score += similarity * weight;
        }
      }

      // Collaborative: similar users liked this
      const collaborativeScore = await getCollaborativeScore(userId, service.serviceId);
      score += collaborativeScore * 0.3; // 30% weight on collaborative

      scores.set(service.serviceId, score);
    }

    // Return top recommendations
    return Array.from(scores.entries())
      .sort(([, a], [, b]) => b - a)
      .slice(0, limit)
      .map(([serviceId]) => serviceId);
  } catch (error) {
    console.error('Recommendation error:', error);
    return getPopularServices(limit);
  }
}

/**
 * Get user interactions (views, quotes, purchases)
 */
async function getUserInteractions(userId: string): Promise<UserInteraction[]> {
  // Mock: fetch from analytics/logs
  return [];
}

/**
 * Get all services
 */
async function getAllServices(): Promise<ServiceVector[]> {
  // Mock: fetch from database
  return [];
}

/**
 * Calculate similarity between two services
 * Based on category, price range, description keywords
 */
function calculateServiceSimilarity(a: ServiceVector, b: ServiceVector): number {
  let similarity = 0;

  // Category match (50%)
  if (a.category === b.category) similarity += 0.5;

  // Price proximity (30%)
  const priceDiff = Math.abs(a.price - b.price);
  const maxPrice = Math.max(a.price, b.price) || 1;
  const priceProximity = 1 - priceDiff / maxPrice;
  similarity += priceProximity * 0.3;

  // Description similarity (20%)
  const descriptionSim = descriptionSimilarity(a.description, b.description);
  similarity += descriptionSim * 0.2;

  return Math.min(similarity, 1);
}

/**
 * Simple text similarity (TF-IDF approximation)
 */
function descriptionSimilarity(a: string, b: string): number {
  const wordsA = new Set(a.toLowerCase().split(/\s+/));
  const wordsB = new Set(b.toLowerCase().split(/\s+/));

  const intersection = new Set([...wordsA].filter(w => wordsB.has(w)));
  const union = new Set([...wordsA, ...wordsB]);

  return intersection.size / union.size;
}

/**
 * Get interaction weight (views < quotes < purchases)
 */
function getInteractionWeight(type: string): number {
  const weights: Record<string, number> = {
    view: 1,
    quote: 5,
    purchase: 10,
  };
  return weights[type] || 1;
}

/**
 * Get collaborative filtering score
 * Find similar users and see what they liked
 */
async function getCollaborativeScore(userId: string, serviceId: string): Promise<number> {
  // Mock: implement collaborative filtering
  return 0;
}

/**
 * Get popular/trending services (for cold start)
 */
async function getPopularServices(limit: number): Promise<string[]> {
  // Mock: fetch trending services
  return [];
}

/**
 * Track interaction for recommendation engine
 */
export async function trackInteraction(
  userId: string,
  serviceId: string,
  type: 'view' | 'quote' | 'purchase'
) {
  // Store in Redis for fast access, periodically sync to DB
  // Implementation depends on your event logging setup
}
