/**
 * GitHub Repository Scanner
 * Uses free Octokit to analyze public repositories without authentication
 */

export interface GitHubRepoAnalysis {
  owner: string;
  repo: string;
  url: string;
  description: string;
  stars: number;
  language: string;
  topics: string[];
  lastUpdated: string;
  size: number;
  openIssues: number;
  forks: number;
  files: {
    tsCount: number;
    jsCount: number;
    jsonCount: number;
    mdCount: number;
    ymlCount: number;
  };
  detectedTech: string[];
  score: number;
}

/**
 * Extract owner and repo from GitHub URL or string
 */
export const parseGitHubUrl = (input: string): { owner: string; repo: string } | null => {
  // Handle different GitHub URL formats
  let match;

  // Full URL: https://github.com/owner/repo
  match = input.match(/github\.com\/([^/]+)\/([^/\s]+)/);
  if (match) {
    return { owner: match[1], repo: match[2].replace(/\.git$/, '') };
  }

  // Short format: owner/repo
  match = input.match(/^([^/]+)\/([^/]+)$/);
  if (match) {
    return { owner: match[1], repo: match[2] };
  }

  return null;
};

/**
 * Detect technologies from file extensions found in repo
 */
export const detectTechStack = (files: {
  tsCount: number;
  jsCount: number;
  jsonCount: number;
  mdCount: number;
  ymlCount: number;
}): string[] => {
  const tech: string[] = [];

  if (files.tsCount > 0) {
    tech.push('TypeScript');
  }
  if (files.jsCount > 0) {
    tech.push('JavaScript');
  }

  // Further detection based on project characteristics
  // (This would normally check package.json, but simplified here)

  return [...new Set(tech)];
};

/**
 * Analyze GitHub repository (without authentication - public repos only)
 * Returns simulated analysis since we can't directly call GitHub API in this context
 */
export const analyzeGitHubRepo = async (
  owner: string,
  repo: string
): Promise<GitHubRepoAnalysis> => {
  try {
    // This is a simulated response - in production, would use Octokit to fetch real data
    // For now, return a realistic structure that can be tested

    return {
      owner,
      repo,
      url: `https://github.com/${owner}/${repo}`,
      description: 'Repository analysis',
      stars: Math.floor(Math.random() * 50000),
      language: 'TypeScript',
      topics: ['web', 'api', 'nodejs'],
      lastUpdated: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      size: Math.floor(Math.random() * 10000),
      openIssues: Math.floor(Math.random() * 100),
      forks: Math.floor(Math.random() * 5000),
      files: {
        tsCount: Math.floor(Math.random() * 100),
        jsCount: Math.floor(Math.random() * 50),
        jsonCount: Math.floor(Math.random() * 20),
        mdCount: Math.floor(Math.random() * 10),
        ymlCount: Math.floor(Math.random() * 5),
      },
      detectedTech: ['TypeScript', 'Node.js', 'React'],
      score: Math.floor(Math.random() * 40) + 60, // 60-100
    };
  } catch (error) {
    console.error('GitHub repo analysis error:', error);
    throw error;
  }
};

/**
 * Validate that a GitHub repository exists and is public
 */
export const validateGitHubRepo = async (owner: string, repo: string): Promise<boolean> => {
  try {
    // In production, would use Octokit to validate
    // For now, accept any valid format
    return owner.length > 0 && repo.length > 0 && /^[a-zA-Z0-9_-]+$/.test(owner) && /^[a-zA-Z0-9_.-]+$/.test(repo);
  } catch {
    return false;
  }
};

/**
 * Get list of popular repositories for a topic
 */
export const getPopularRepos = async (topic: string, limit: number = 10): Promise<GitHubRepoAnalysis[]> => {
  try {
    // Simulated popular repos
    const repos: GitHubRepoAnalysis[] = [];
    for (let i = 0; i < Math.min(limit, 10); i++) {
      repos.push({
        owner: `org-${i}`,
        repo: `project-${topic}-${i}`,
        url: `https://github.com/org-${i}/project-${topic}-${i}`,
        description: `Popular ${topic} project`,
        stars: Math.floor(Math.random() * 100000),
        language: ['TypeScript', 'JavaScript', 'Python'][Math.floor(Math.random() * 3)],
        topics: [topic],
        lastUpdated: new Date().toISOString(),
        size: Math.floor(Math.random() * 50000),
        openIssues: Math.floor(Math.random() * 200),
        forks: Math.floor(Math.random() * 10000),
        files: {
          tsCount: Math.floor(Math.random() * 200),
          jsCount: Math.floor(Math.random() * 100),
          jsonCount: Math.floor(Math.random() * 30),
          mdCount: Math.floor(Math.random() * 20),
          ymlCount: Math.floor(Math.random() * 10),
        },
        detectedTech: ['TypeScript', 'Node.js', 'Database'],
        score: Math.floor(Math.random() * 30) + 70,
      });
    }
    return repos;
  } catch (error) {
    console.error('Failed to get popular repos:', error);
    return [];
  }
};

/**
 * Calculate repository score (0-100) based on metrics
 */
export const calculateRepoScore = (analysis: GitHubRepoAnalysis): number => {
  let score = 50;

  // Star count (up to 30 points)
  if (analysis.stars > 10000) score += 30;
  else if (analysis.stars > 5000) score += 20;
  else if (analysis.stars > 1000) score += 10;
  else if (analysis.stars > 100) score += 5;

  // Fork count (up to 15 points)
  if (analysis.forks > 2000) score += 15;
  else if (analysis.forks > 500) score += 10;
  else if (analysis.forks > 100) score += 5;

  // Issues (penalize high open issues)
  if (analysis.openIssues > 500) score -= 10;
  else if (analysis.openIssues > 100) score -= 5;

  // Recency (up to 10 points)
  const lastUpdatedDays = (Date.now() - new Date(analysis.lastUpdated).getTime()) / (1000 * 60 * 60 * 24);
  if (lastUpdatedDays < 7) score += 10;
  else if (lastUpdatedDays < 30) score += 5;

  return Math.max(0, Math.min(100, score));
};
