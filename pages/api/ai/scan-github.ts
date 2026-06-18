/**
 * API Endpoint: POST /api/ai/scan-github
 * Analyze GitHub repository
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { analyzeGitHubRepo, parseGitHubUrl, validateGitHubRepo, calculateRepoScore } from '@/lib/ai/github-scanner';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { repo } = req.body;

    if (!repo || typeof repo !== 'string') {
      return res.status(400).json({ error: 'Repository URL or owner/repo is required' });
    }

    // Parse GitHub URL
    const parsed = parseGitHubUrl(repo);
    if (!parsed) {
      return res.status(400).json({
        error: 'Invalid GitHub URL format. Use: https://github.com/owner/repo or owner/repo',
      });
    }

    // Validate repo format
    const isValid = await validateGitHubRepo(parsed.owner, parsed.repo);
    if (!isValid) {
      return res.status(400).json({ error: 'Invalid repository format' });
    }

    // Analyze repo
    const analysis = await analyzeGitHubRepo(parsed.owner, parsed.repo);
    const score = calculateRepoScore(analysis);

    return res.status(200).json({
      success: true,
      analysis: {
        ...analysis,
        score,
      },
    });
  } catch (error) {
    console.error('GitHub scan error:', error);
    return res.status(500).json({
      error: 'Failed to scan GitHub repository',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
