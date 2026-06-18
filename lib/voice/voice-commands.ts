/**
 * Voice Commands Parser & Executor
 * Converts voice commands into executable actions
 * Examples: "Show me React services", "Search for Node.js", "Take me to checkout"
 */

export interface VoiceCommand {
  type:
    | 'search'
    | 'navigate'
    | 'filter'
    | 'checkout'
    | 'info'
    | 'recommendation'
    | 'unknown';
  intent: string;
  target?: string;
  params?: Record<string, string | string[]>;
  confidence: number;
}

export interface CommandAction {
  type: 'navigate' | 'search' | 'filter' | 'execute' | 'unknown';
  url?: string;
  query?: string;
  filters?: Record<string, any>;
  message?: string;
}

/**
 * Parse voice command text
 */
export function parseVoiceCommand(text: string): VoiceCommand {
  const normalized = text.toLowerCase().trim();

  // Search commands: "Search for X", "Show me X", "Find X"
  if (/^(search|show me|find|look for|search for)/i.test(normalized)) {
    const match = normalized.match(
      /^(?:search|show me|find|look for|search for)\s+(.+?)(?:\s+(?:services|courses|tutorials))?$/i
    );
    if (match) {
      return {
        type: 'search',
        intent: 'search',
        target: match[1],
        confidence: 0.9,
      };
    }
  }

  // Navigation commands: "Go to X", "Take me to X", "Show X"
  if (/^(?:go to|take me to|show|navigate to|open)/i.test(normalized)) {
    const routes: Record<string, string> = {
      'home': '/',
      'products': '/store/products',
      'services': '/services',
      'about': '/about',
      'contact': '/contact',
      'dashboard': '/dashboard',
      'cart': '/store/cart',
      'checkout': '/store/checkout',
      'account': '/store/account',
      'orders': '/store/account/orders',
    };

    for (const [keyword, route] of Object.entries(routes)) {
      if (normalized.includes(keyword)) {
        return {
          type: 'navigate',
          intent: 'navigate',
          target: route,
          confidence: 0.95,
        };
      }
    }
  }

  // Filter commands: "Show me X in Y", "Filter by X"
  if (/^(?:show me|filter|sort|order)/i.test(normalized)) {
    const match = normalized.match(/(?:in|by|for)\s+(\w+)/i);
    if (match) {
      return {
        type: 'filter',
        intent: 'filter',
        target: match[1],
        confidence: 0.85,
      };
    }
  }

  // Checkout commands: "Checkout", "Buy now", "Place order"
  if (/^(?:checkout|buy now|place order|proceed to payment)/i.test(normalized)) {
    return {
      type: 'checkout',
      intent: 'checkout',
      target: '/store/checkout',
      confidence: 0.95,
    };
  }

  // Info commands: "What is X", "Tell me about X", "Info on X"
  if (/^(?:what is|tell me about|info on|describe)/i.test(normalized)) {
    const match = normalized.match(
      /^(?:what is|tell me about|info on|describe)\s+(.+?)$/i
    );
    if (match) {
      return {
        type: 'info',
        intent: 'info',
        target: match[1],
        confidence: 0.85,
      };
    }
  }

  // Recommendation commands: "Recommend X for Y"
  if (/^(?:recommend|suggest|what.*for)/i.test(normalized)) {
    const match = normalized.match(/(?:for|to)\s+(.+?)$/i);
    if (match) {
      return {
        type: 'recommendation',
        intent: 'recommendation',
        target: match[1],
        confidence: 0.8,
      };
    }
  }

  // Unknown command
  return {
    type: 'unknown',
    intent: normalized,
    confidence: 0.5,
  };
}

/**
 * Convert parsed command to executable action
 */
export function commandToAction(command: VoiceCommand): CommandAction {
  switch (command.type) {
    case 'search':
      return {
        type: 'search',
        query: command.target || '',
        url: `/search?q=${encodeURIComponent(command.target || '')}`,
      };

    case 'navigate':
      return {
        type: 'navigate',
        url: command.target || '/',
      };

    case 'filter':
      return {
        type: 'filter',
        filters: {
          category: command.target,
        },
        url: `/services?category=${encodeURIComponent(command.target || '')}`,
      };

    case 'checkout':
      return {
        type: 'navigate',
        url: '/store/checkout',
      };

    case 'info':
      return {
        type: 'search',
        query: command.target || '',
        message: `Searching for information about ${command.target}...`,
      };

    case 'recommendation':
      return {
        type: 'execute',
        message: `Finding recommendations for ${command.target}...`,
      };

    default:
      return {
        type: 'unknown',
        message: `I didn't understand that command. Try: "Show me React services" or "Go to checkout"`,
      };
  }
}

/**
 * Execute voice command
 */
export function executeCommand(command: VoiceCommand): string {
  const action = commandToAction(command);

  switch (action.type) {
    case 'navigate':
      // In browser: window.location.href = action.url
      return `Navigating to ${action.url}`;

    case 'search':
      return `Searching for: ${action.query}`;

    case 'filter':
      return `Filtering by: ${action.filters?.category}`;

    case 'execute':
      return action.message || 'Command executed';

    default:
      return action.message || 'Command not recognized';
  }
}

/**
 * Extract service names from text
 */
export function extractServices(text: string): string[] {
  const services = [
    'react',
    'vue',
    'angular',
    'svelte',
    'next.js',
    'node.js',
    'python',
    'java',
    'go',
    'rust',
    'flutter',
    'react native',
    'ios',
    'android',
    'kubernetes',
    'docker',
    'aws',
    'gcp',
    'postgresql',
    'mongodb',
    'redis',
  ];

  return services.filter(
    service => new RegExp(`\\b${service}\\b`, 'i').test(text)
  );
}

/**
 * Get command suggestions based on current context
 */
export function getCommandSuggestions(context?: {
  currentPage?: string;
  recentSearches?: string[];
}): string[] {
  const generalCommands = [
    'Show me React services',
    'Search for Node.js',
    'Go to cart',
    'Checkout',
    'Tell me about Python',
    'Filter by frontend',
    'What is Docker?',
  ];

  if (context?.currentPage === '/store/cart') {
    return ['Checkout', 'Go home', 'Continue shopping', 'Show cart total'];
  }

  if (context?.recentSearches && context.recentSearches.length > 0) {
    return [
      `Search for ${context.recentSearches[0]} again`,
      ...generalCommands,
    ];
  }

  return generalCommands;
}

/**
 * Validate voice command
 */
export function isValidCommand(command: VoiceCommand): boolean {
  return command.confidence >= 0.7 && command.type !== 'unknown';
}

/**
 * Format command for logging/analytics
 */
export function formatCommandLog(command: VoiceCommand): object {
  return {
    timestamp: new Date().toISOString(),
    type: command.type,
    intent: command.intent,
    target: command.target,
    confidence: command.confidence,
    valid: isValidCommand(command),
  };
}
