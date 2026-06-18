import { db } from '@/lib/db';
import { userBehavior, recommendations, reviews, services } from '@/lib/db/schema';
import { eq, and, sql } from 'drizzle-orm';
import { Decimal } from 'decimal.js';

/**
 * Generate AI recommendations for a user based on their behavior
 */
export async function generateRecommendations(userId: number, limit: number = 5) {
  try {
    // Get user's behavior history
    const behaviors = await db
      .select()
      .from(userBehavior)
      .where(eq(userBehavior.userId, userId))
      .orderBy(userBehavior.timestamp)
      .limit(50); // Last 50 actions

    if (behaviors.length === 0) {
      return []; // No behavior, no recommendations yet
    }

    // Get user's service preferences (services they interacted with)
    const preferredServices = behaviors
      .filter((b) => b.serviceId)
      .map((b) => b.serviceId) as number[];

    if (preferredServices.length === 0) {
      // Fallback: recommend popular services
      return await getPopularServices(limit, userId);
    }

    // Get all services
    const allServices = await db.select().from(services);

    // Score each service
    const scored = await Promise.all(
      allServices.map(async (service) => {
        if (preferredServices.includes(service.id)) {
          return { service, score: 0 }; // Skip already viewed
        }

        let score = 0;

        // 1. Behavior-based: similar category/tags
        const categoryMatches = behaviors.filter(
          (b) =>
            b.serviceId &&
            allServices.find((s) => s.id === b.serviceId)?.category === service.category
        );
        score += categoryMatches.length * 20;

        // 2. Rating-based: highly rated services
        const serviceReviews = await db
          .select()
          .from(reviews)
          .where(
            and(
              eq(reviews.serviceId, service.id),
              eq(reviews.status, 'approved')
            )
          );

        if (serviceReviews.length > 0) {
          const avgRating = serviceReviews.reduce((sum: number, r: any) => sum + r.rating, 0) / serviceReviews.length;
          score += avgRating * 10;
        }

        // 3. Popularity: number of reviews
        score += Math.min(serviceReviews.length, 50) * 2;

        return { service, score };
      })
    );

    // Sort by score and return top N
    const topServices = scored
      .filter((s) => s.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);

    // Save recommendations to DB
    await db.delete(recommendations).where(eq(recommendations.userId, userId));

    for (const { service, score } of topServices) {
      const scoreValue = new Decimal(Math.round(score * 100) / 100).toString();
      await db.insert(recommendations).values({
        userId,
        serviceId: service.id,
        score: scoreValue,
        reason: `Based on your interest in ${service.category || 'similar services'}`,
        algorithm: 'behavior_based',
      });
    }

    return topServices;
  } catch (error) {
    console.error('Recommendations generation error:', error);
    return [];
  }
}

/**
 * Get popular services when user has no behavior
 */
async function getPopularServices(limit: number, userId: number) {
  const allServices = await db.select().from(services).limit(limit);

  // Score by reviews
  const scored = await Promise.all(
    allServices.map(async (service) => {
      const serviceReviews = await db
        .select()
        .from(reviews)
        .where(and(
          eq(reviews.serviceId, service.id),
          eq(reviews.status, 'approved')
        ));

      const avgRating = serviceReviews.length > 0 
        ? serviceReviews.reduce((sum: number, r) => sum + r.rating, 0) / serviceReviews.length
        : 0;

      return { service, score: avgRating * 10 + Math.min(serviceReviews.length, 20) };
    })
  );

  const topServices = scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  // Save to DB
  for (const { service, score } of topServices) {
    const scoreValue = new Decimal(Math.round(score * 100) / 100).toString();
    await db.insert(recommendations).values({
      userId,
      serviceId: service.id,
      score: scoreValue,
      reason: 'Popular service',
      algorithm: 'popularity',
    });
  }

  return topServices;
}

/**
 * Track recommendation click/conversion
 */
export async function trackRecommendationClick(recommendationId: number, converted: boolean = false) {
  return db
    .update(recommendations)
    .set({
      clicked: true,
      converted: converted,
    })
    .where(eq(recommendations.id, recommendationId));
}
