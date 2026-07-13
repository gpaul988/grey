/**
 * AI Chatbot Integration
 * Powered by OpenAI GPT-4 / Claude
 * Handles product recommendations, support, voice commands
 */

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_URL = 'https://api.openai.com/v1/chat/completions';

interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface ChatResponse {
  message: string;
  confidence: number;
  recommendation?: {
    type: 'product' | 'service';
    id: string;
    name: string;
    reason: string;
  };
  action?: {
    type: 'navigate' | 'search' | 'checkout';
    target: string;
  };
  error?: string;
}

/**
 * System prompt for grey.git chatbot
 */
const SYSTEM_PROMPT = `You are a helpful AI assistant for grey.git, a cutting-edge tech services platform.

You help users:
1. Discover services (React, Node.js, Python, Vue, etc.)
2. Get technical recommendations
3. Answer questions about services
4. Suggest the best tech stack for their needs
5. Process inquiries and bookings

Current Services:
- Frontend: React, Vue, Angular, Next.js, Svelte
- Backend: Node.js, Python, Java, Go, Rust, PHP, Ruby
- Mobile: React Native, Flutter, iOS (Swift), Android (Kotlin)
- DevOps: CI/CD, Docker, Kubernetes, AWS, GCP
- CMS: Headless CMS, WordPress, Drupal
- Database: PostgreSQL, MongoDB, Redis, MySQL
- And many more...

Guidelines:
- Be friendly and professional
- Provide specific recommendations with reasoning
- Suggest relevant services based on user needs
- If a user asks about a service, explain its benefits
- Offer to help with booking or more information
- Keep responses concise (max 2-3 sentences)
- Extract actionable recommendations`;

let conversationHistory: ChatMessage[] = [];

/**
 * Chat with AI (conversation context maintained)
 */
export async function chat(
  userMessage: string,
  context?: {
    userId?: string;
    previousMessages?: ChatMessage[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    searchContext?: { query: string; results: any[] };
  }
): Promise<ChatResponse> {
  if (!OPENAI_API_KEY) {
    return {
      message: 'I am currently offline. Please try again later.',
      confidence: 0,
      error: 'OPENAI_API_KEY not configured',
    };
  }

  try {
    // Use provided history or maintain conversation
    if (context?.previousMessages) {
      conversationHistory = context.previousMessages;
    }

    // Add user message
    conversationHistory.push({
      role: 'user',
      content: userMessage,
    });

    // Add search context if available
    let systemPrompt = SYSTEM_PROMPT;
    if (context?.searchContext) {
      systemPrompt += `\n\nSearch Context: User searched for "${context.searchContext.query}"`;
      systemPrompt += `\nRelevant results: ${JSON.stringify(context.searchContext.results, null, 2)}`;
    }

    // Call OpenAI API
    const response = await fetch(OPENAI_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [{ role: 'system', content: systemPrompt }, ...conversationHistory],
        temperature: 0.7,
        max_tokens: 300,
        top_p: 0.9,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      return {
        message: 'Sorry, I encountered an error. Please try again.',
        confidence: 0,
        error: error.error?.message || 'OpenAI API error',
      };
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data = (await response.json()) as any;
    const assistantMessage = data.choices?.[0]?.message?.content;

    if (!assistantMessage) {
      return {
        message: 'I could not generate a response. Please try again.',
        confidence: 0,
        error: 'No message in response',
      };
    }

    // Add assistant response to history
    conversationHistory.push({
      role: 'assistant',
      content: assistantMessage,
    });

    // Keep conversation history manageable (last 10 messages)
    if (conversationHistory.length > 20) {
      conversationHistory = conversationHistory.slice(-20);
    }

    // Parse response for recommendations and actions
    const recommendation = extractRecommendation(assistantMessage);
    const action = extractAction(assistantMessage);

    return {
      message: assistantMessage,
      confidence: 0.95,
      recommendation,
      action,
    };
  } catch (error) {
    console.error('Chatbot error:', error);
    return {
      message: 'Sorry, something went wrong. Please try again.',
      confidence: 0,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Extract recommendation from assistant message
 */
function extractRecommendation(message: string): ChatResponse['recommendation'] {
  // Look for patterns like "I recommend React" or "You should use Node.js"
  const recommendationPattern =
    /(?:recommend|suggest|should use|best choice|try)([\w\s\.]+?)(?:\.|,|because|for)/i;
  const match = message.match(recommendationPattern);

  if (!match) return undefined;

  const serviceName = match[1].trim();
  // Map service names to IDs (in production, query database)
  const serviceMap: Record<string, string> = {
    'react': 'react',
    'vue': 'vue',
    'angular': 'angular',
    'node.js': 'nodejs',
    'python': 'python',
    'flutter': 'flutter',
    'kubernetes': 'kubernetes',
    'docker': 'docker',
  };

  const serviceId = serviceMap[serviceName.toLowerCase()];
  if (!serviceId) return undefined;

  return {
    type: 'service',
    id: serviceId,
    name: serviceName,
    reason: `Recommended based on your requirements: ${message.substring(0, 100)}`,
  };
}

/**
 * Extract action from assistant message
 */
function extractAction(message: string): ChatResponse['action'] {
  if (message.includes('checkout') || message.includes('book') || message.includes('reserve')) {
    return { type: 'checkout', target: '/checkout' };
  }

  if (message.includes('learn more') || message.includes('details')) {
    return { type: 'navigate', target: '/services' };
  }

  return undefined;
}

/**
 * Reset conversation history
 */
export function resetConversation(): void {
  conversationHistory = [];
}

/**
 * Get conversation history
 */
export function getConversationHistory(): ChatMessage[] {
  return conversationHistory;
}

/**
 * Analyze intent from user message
 */
export async function analyzeIntent(message: string): Promise<{
  intent: 'product_inquiry' | 'booking' | 'support' | 'recommendation' | 'general';
  confidence: number;
  entities: string[];
}> {
  const intents = {
    product_inquiry: /(?:what|how|tell me about|explain|details of)([\w\s]+)/i,
    booking: /(?:book|reserve|schedule|hire|engage)([\w\s]+)/i,
    support: /(?:help|issue|problem|error|broken|not working)/i,
    recommendation: /(?:recommend|suggest|what should|best for|which)([\w\s]+)/i,
  };

  let detectedIntent: keyof typeof intents = 'support';
  let confidence = 0;

  for (const [intent, pattern] of Object.entries(intents)) {
    if (pattern.test(message)) {
      detectedIntent = intent as keyof typeof intents;
      confidence = 0.85;
      break;
    }
  }

  // Extract entities (service names, technologies)
  const serviceNames = [
    'react', 'vue', 'angular', 'svelte', 'next.js',
    'node.js', 'python', 'java', 'go', 'rust',
    'flutter', 'react native', 'ios', 'android',
    'kubernetes', 'docker', 'aws', 'gcp',
  ];

  const entities = serviceNames.filter(
    service => new RegExp(`\\b${service}\\b`, 'i').test(message)
  );

  return {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    intent: detectedIntent as any,
    confidence,
    entities,
  };
}

/**
 * Generate suggested responses for UI
 */
export function generateSuggestions(): string[] {
  return [
    'Show me React services',
    'What backend should I use?',
    'Tell me about Node.js',
    'How much does it cost?',
    'Can you help me book?',
    "What's the best tech stack for startups?",
  ];
}
