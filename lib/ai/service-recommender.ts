/**
 * Service Recommender
 * Recommends grey.git services based on detected tech stack
 */

export interface ServiceRecommendation {
  service: string;
  description: string;
  matchScore: number; // 0-100
  reasons: string[];
  resources: {
    docs: string;
    demo: string;
    github: string;
  };
}

// Service database mapping tech to grey.git services
const SERVICE_DATABASE = {
  'frontend-react': {
    service: 'React Frontend Services',
    description: 'Building modern UIs with React',
    docs: '/services/frontend-react',
    demo: '/services/frontend-react/demo',
    github: 'https://github.com/greybot-ai/grey.git',
  },
  'frontend-vue': {
    service: 'Vue.js Frontend Services',
    description: 'Building UIs with Vue.js',
    docs: '/services/frontend-vue',
    demo: '/services/frontend-vue/demo',
    github: 'https://github.com/greybot-ai/grey.git',
  },
  'backend-nodejs': {
    service: 'Node.js Backend Services',
    description: 'Building scalable APIs with Node.js and Express',
    docs: '/services/backend-nodejs',
    demo: '/services/backend-nodejs/demo',
    github: 'https://github.com/greybot-ai/grey.git',
  },
  'backend-python': {
    service: 'Python Backend Services',
    description: 'Building APIs with Python and FastAPI',
    docs: '/services/backend-python',
    demo: '/services/backend-python/demo',
    github: 'https://github.com/greybot-ai/grey.git',
  },
  'mobile-react-native': {
    service: 'React Native Mobile Services',
    description: 'Cross-platform mobile development',
    docs: '/services/mobile-react-native',
    demo: '/services/mobile-react-native/demo',
    github: 'https://github.com/greybot-ai/grey.git',
  },
  'database-postgres': {
    service: 'PostgreSQL Database Services',
    description: 'Relational database design and optimization',
    docs: '/services/database-postgres',
    demo: '/services/database-postgres/demo',
    github: 'https://github.com/greybot-ai/grey.git',
  },
  'database-mongodb': {
    service: 'MongoDB Services',
    description: 'NoSQL database design',
    docs: '/services/database-mongodb',
    demo: '/services/database-mongodb/demo',
    github: 'https://github.com/greybot-ai/grey.git',
  },
  'devops-docker': {
    service: 'Docker & Containerization',
    description: 'Containerizing applications',
    docs: '/services/devops-docker',
    demo: '/services/devops-docker/demo',
    github: 'https://github.com/greybot-ai/grey.git',
  },
  'devops-kubernetes': {
    service: 'Kubernetes Services',
    description: 'Container orchestration',
    docs: '/services/devops-kubernetes',
    demo: '/services/devops-kubernetes/demo',
    github: 'https://github.com/greybot-ai/grey.git',
  },
  'api-graphql': {
    service: 'GraphQL API Services',
    description: 'Building GraphQL APIs',
    docs: '/services/api-graphql',
    demo: '/services/api-graphql/demo',
    github: 'https://github.com/greybot-ai/grey.git',
  },
  'api-rest': {
    service: 'REST API Services',
    description: 'Building RESTful APIs',
    docs: '/services/api-rest',
    demo: '/services/api-rest/demo',
    github: 'https://github.com/greybot-ai/grey.git',
  },
  'cloud-aws': {
    service: 'AWS Cloud Services',
    description: 'Deploying to AWS',
    docs: '/services/cloud-aws',
    demo: '/services/cloud-aws/demo',
    github: 'https://github.com/greybot-ai/grey.git',
  },
  'cloud-gcp': {
    service: 'Google Cloud Services',
    description: 'Deploying to GCP',
    docs: '/services/cloud-gcp',
    demo: '/services/cloud-gcp/demo',
    github: 'https://github.com/greybot-ai/grey.git',
  },
  'testing-jest': {
    service: 'Jest Testing Services',
    description: 'JavaScript/TypeScript testing',
    docs: '/services/testing-jest',
    demo: '/services/testing-jest/demo',
    github: 'https://github.com/greybot-ai/grey.git',
  },
  'auth-oauth': {
    service: 'OAuth & Authentication',
    description: 'User authentication and authorization',
    docs: '/services/auth-oauth',
    demo: '/services/auth-oauth/demo',
    github: 'https://github.com/greybot-ai/grey.git',
  },
} as const;

type ServiceKey = keyof typeof SERVICE_DATABASE;

/**
 * Detect tech stack from code patterns
 */
export const detectTechStack = (
  codePatterns: string[],
  language: string,
  files?: { tsCount: number; jsCount: number }
): string[] => {
  const tech: string[] = [];

  // Language detection
  if (language === 'typescript') {
    tech.push('TypeScript');
  } else if (language === 'jsx') {
    tech.push('TypeScript');
    tech.push('React');
  } else if (language === 'javascript') {
    tech.push('JavaScript');
  }

  if (language === 'python') {
    tech.push('Python');
  }

  // Pattern detection
  if (codePatterns.includes('async-await') || codePatterns.includes('promise-based')) {
    tech.push('Async/Await');
  }

  if (codePatterns.includes('oop-style')) {
    tech.push('OOP');
  }

  if (codePatterns.includes('functional-style')) {
    tech.push('Functional Programming');
  }

  // Framework detection (from patterns or file analysis)
  if (files && files.tsCount > files.jsCount * 2) {
    tech.push('TypeScript-heavy');
  }

  return [...new Set(tech)];
};

/**
 * Recommend services based on tech stack
 */
export const recommendServices = (techStack: string[]): ServiceRecommendation[] => {
  const recommendations: ServiceRecommendation[] = [];
  const seenServices = new Set<string>();

  for (const tech of techStack) {
    const matchedServices: ServiceKey[] = [];

    // Match tech to services
    if (tech.includes('React') || tech.includes('TypeScript')) {
      matchedServices.push('frontend-react');
    }
    if (tech.includes('Vue')) {
      matchedServices.push('frontend-vue');
    }
    if (tech.includes('Node.js') || tech === 'JavaScript') {
      matchedServices.push('backend-nodejs');
    }
    if (tech.includes('Python')) {
      matchedServices.push('backend-python');
    }
    if (tech.includes('React Native')) {
      matchedServices.push('mobile-react-native');
    }
    if (tech.includes('PostgreSQL') || tech.includes('Postgres')) {
      matchedServices.push('database-postgres');
    }
    if (tech.includes('MongoDB')) {
      matchedServices.push('database-mongodb');
    }
    if (tech.includes('Docker')) {
      matchedServices.push('devops-docker');
    }
    if (tech.includes('Kubernetes')) {
      matchedServices.push('devops-kubernetes');
    }
    if (tech.includes('GraphQL')) {
      matchedServices.push('api-graphql');
    }
    if (tech.includes('REST')) {
      matchedServices.push('api-rest');
    }
    if (tech.includes('AWS')) {
      matchedServices.push('cloud-aws');
    }
    if (tech.includes('GCP') || tech.includes('Google Cloud')) {
      matchedServices.push('cloud-gcp');
    }
    if (tech.includes('Jest') || tech.includes('Testing')) {
      matchedServices.push('testing-jest');
    }
    if (tech.includes('OAuth') || tech.includes('Auth')) {
      matchedServices.push('auth-oauth');
    }

    // Add matched services
    for (const serviceKey of matchedServices) {
      if (!seenServices.has(serviceKey)) {
        const serviceInfo = SERVICE_DATABASE[serviceKey];
        recommendations.push({
          service: serviceInfo.service,
          description: serviceInfo.description,
          matchScore: 80 + Math.floor(Math.random() * 20), // 80-100
          reasons: [`Tech stack includes ${tech}`, 'Recommended based on project type'],
          resources: {
            docs: serviceInfo.docs,
            demo: serviceInfo.demo,
            github: serviceInfo.github,
          },
        });
        seenServices.add(serviceKey);
      }
    }
  }

  // If no services matched, recommend general backend service
  if (recommendations.length === 0) {
    const service = SERVICE_DATABASE['api-rest'];
    recommendations.push({
      service: service.service,
      description: service.description,
      matchScore: 50,
      reasons: ['General API development recommendation'],
      resources: {
        docs: service.docs,
        demo: service.demo,
        github: service.github,
      },
    });
  }

  // Sort by match score
  return recommendations.sort((a, b) => b.matchScore - a.matchScore);
};

/**
 * Get service details by ID
 */
export const getServiceDetail = (serviceId: ServiceKey): (typeof SERVICE_DATABASE)[ServiceKey] | null => {
  return SERVICE_DATABASE[serviceId] || null;
};

/**
 * Get all available services
 */
export const getAllServices = () => {
  return Object.entries(SERVICE_DATABASE).map(([id, service]) => ({
    id,
    ...service,
  }));
};

/**
 * Calculate recommendation score based on tech match
 */
export const calculateRecommendationScore = (
  techStack: string[],
  serviceRequiredTech: string[]
): number => {
  let score = 0;
  let matches = 0;

  for (const required of serviceRequiredTech) {
    if (techStack.some(tech => tech.toLowerCase().includes(required.toLowerCase()))) {
      matches++;
    }
  }

  if (serviceRequiredTech.length > 0) {
    score = Math.floor((matches / serviceRequiredTech.length) * 100);
  }

  return score;
};
