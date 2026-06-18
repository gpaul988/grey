/**
 * API Endpoint: POST /api/ai/recommend
 * Get service recommendations based on tech stack
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { recommendServices, detectTechStack } from '@/lib/ai/service-recommender';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { techStack, codePatterns, language, files } = req.body;

    // Validate input
    if (!techStack && !codePatterns && !language) {
      return res.status(400).json({
        error: 'Provide techStack, codePatterns, or language for recommendations',
      });
    }

    // Detect or use provided tech stack
    let detected: string[] = [];
    if (Array.isArray(techStack)) {
      detected = techStack;
    } else if (codePatterns || language) {
      detected = detectTechStack(codePatterns || [], language || '', files);
    }

    if (detected.length === 0) {
      detected = ['General Development'];
    }

    // Get recommendations
    const recommendations = recommendServices(detected);

    return res.status(200).json({
      success: true,
      detectedTech: detected,
      recommendations: recommendations.slice(0, 10), // Top 10 recommendations
      count: recommendations.length,
    });
  } catch (error) {
    console.error('Recommendation error:', error);
    return res.status(500).json({
      error: 'Failed to generate recommendations',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
