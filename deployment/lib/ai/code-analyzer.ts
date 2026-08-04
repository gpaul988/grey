/**
 * AI Code Analyzer - Analyze code patterns and complexity
 * Free alternative to paid code analysis services
 */

import { parse } from '@babel/parser';

export interface CodeAnalysisResult {
  language: string;
  lineCount: number;
  complexity: 'low' | 'medium' | 'high';
  patterns: string[];
  issues: string[];
  score: number; // 0-100
  metrics: {
    functions: number;
    classes: number;
    asyncFunctions: number;
    errorHandling: number;
    documentation: number;
  };
}

/**
 * Detect language from code snippet
 */
export const detectLanguage = (code: string): string => {
  // TypeScript indicators
  if (code.includes(': string') || code.includes(': number') || code.includes('interface ') || code.includes('type ')) {
    return 'typescript';
  }
  // JSX/TSX - check for HTML-like tags in function
  if ((code.includes('<') && code.includes('</') && code.includes('return')) || code.includes('ReactDOM')) {
    return 'jsx';
  }
  // Python indicators
  if (code.includes('def ') || (code.includes('import ') && code.includes(':'))) {
    return 'python';
  }
  // Go indicators
  if (code.includes('package ') || code.includes('func ')) {
    return 'go';
  }
  return 'javascript';
};

/**
 * Analyze code snippet for patterns and issues
 */
export const analyzeCode = (code: string): CodeAnalysisResult => {
  const language = detectLanguage(code);
  const lines = code.split('\n').length;

  const patterns: string[] = [];
  const issues: string[] = [];
  let score = 75;

  // Detect async patterns
  const hasAsync = code.includes('async ') || code.includes('await ');
  if (hasAsync) {
    patterns.push('async-await');
    // Check for proper error handling
    if (!code.includes('try') || !code.includes('catch')) {
      issues.push('Missing error handling in async code');
      score -= 10;
    }
  }

  // Detect class usage
  const classCount = (code.match(/class /g) || []).length;
  if (classCount > 0) {
    patterns.push('oop-style');
  }

  // Detect functional programming
  if (code.includes('.map(') || code.includes('.filter(') || code.includes('.reduce(')) {
    patterns.push('functional-style');
  }

  // Detect module patterns
  if (code.includes('export ') || code.includes('export default')) {
    patterns.push('es6-modules');
  }

  // Detect dependency injection
  if (code.includes('constructor(') || code.includes('function(')) {
    patterns.push('dependency-injection');
  }

  // Detect testing
  if (code.includes('describe(') || code.includes('it(') || code.includes('test(')) {
    patterns.push('testing');
  }

  // Detect type safety (TypeScript)
  if (language === 'typescript' || code.includes(': ')) {
    patterns.push('type-safe');
    score += 10;
  }

  // Check for console.log (bad practice in production)
  if (code.includes('console.log')) {
    issues.push('Excessive console.log statements');
    score -= 5;
  }

  // Check for hardcoded secrets
  if (code.includes('password') || code.includes('secret') || code.includes('API_KEY')) {
    if (!code.includes('process.env') && !code.includes('env')) {
      issues.push('Potential hardcoded secrets');
      score -= 15;
    }
  }

  // Check for proper indentation (heuristic)
  const hasGoodIndentation = code.split('\n').filter(line => line.startsWith('  ') || line.startsWith('\t')).length > lines * 0.5;
  if (!hasGoodIndentation) {
    issues.push('Inconsistent indentation');
    score -= 5;
  }

  // Count metrics
  const functionCount = (code.match(/function|const.*=.*\(/g) || []).length;
  const classCount2 = (code.match(/class /g) || []).length;
  const asyncCount = (code.match(/async /g) || []).length;
  const tryCount = (code.match(/try\s*{/g) || []).length;
  const docCount = (code.match(/\/\/|\/\*|\*\//g) || []).length;

  // Determine complexity
  let complexity: 'low' | 'medium' | 'high' = 'low';
  if (lines > 500 || functionCount > 20) {
    complexity = 'high';
  } else if (lines > 200 || functionCount > 10) {
    complexity = 'medium';
  }

  score = Math.max(0, Math.min(100, score));

  return {
    language,
    lineCount: lines,
    complexity,
    patterns: [...new Set(patterns)],
    issues: [...new Set(issues)],
    score,
    metrics: {
      functions: functionCount,
      classes: classCount2,
      asyncFunctions: asyncCount,
      errorHandling: tryCount,
      documentation: Math.round(docCount / Math.max(functionCount, 1)),
    },
  };
};

/**
 * Parse TypeScript/JavaScript and extract AST info
 */
export const parseAndAnalyze = (code: string): Partial<CodeAnalysisResult> => {
  try {
    const ast = parse(code, {
      sourceType: 'module',
      plugins: [
        'typescript',
        'jsx',
        'decorators-legacy',
        // Pipeline operator not needed for basic parsing
      ],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);

    let functionCount = 0;
    let classCount = 0;
    let asyncCount = 0;
    let exportCount = 0;

    // Simple traversal (not full AST walk for simplicity)
    const codeStr = JSON.stringify(ast);
    functionCount = (codeStr.match(/"type":"FunctionDeclaration"/g) || []).length;
    functionCount += (codeStr.match(/"type":"ArrowFunctionExpression"/g) || []).length;
    classCount = (codeStr.match(/"type":"ClassDeclaration"/g) || []).length;
    asyncCount = (codeStr.match(/"async":true/g) || []).length;
    exportCount = (codeStr.match(/"type":"ExportNamedDeclaration"/g) || []).length;

    return {
      metrics: {
        functions: functionCount,
        classes: classCount,
        asyncFunctions: asyncCount,
        errorHandling: 0,
        documentation: 0,
      },
    };
  } catch (error) {
    // If parsing fails, return empty analysis
    return {};
  }
};

/**
 * Generate code quality score (0-100)
 */
export const calculateQualityScore = (analysis: CodeAnalysisResult): number => {
  let score = 80;

  // Penalize issues
  score -= analysis.issues.length * 5;

  // Reward patterns
  if (analysis.patterns.includes('type-safe')) score += 10;
  if (analysis.patterns.includes('testing')) score += 10;
  if (analysis.patterns.includes('functional-style')) score += 5;

  // Complexity adjustment
  if (analysis.complexity === 'high') score -= 10;
  if (analysis.complexity === 'low') score += 5;

  // Metrics-based adjustments
  const hasErrorHandling = analysis.metrics.errorHandling > 0;
  if (hasErrorHandling && analysis.metrics.asyncFunctions > 0) {
    score += 10;
  }

  return Math.max(0, Math.min(100, score));
};

/**
 * Generate recommendations based on analysis
 */
export const getRecommendations = (analysis: CodeAnalysisResult): string[] => {
  const recommendations: string[] = [];

  if (analysis.complexity === 'high') {
    recommendations.push('Consider breaking down complex functions into smaller modules');
  }

  if (analysis.issues.includes('Missing error handling in async code')) {
    recommendations.push('Add try-catch blocks around async operations');
  }

  if (!analysis.patterns.includes('type-safe')) {
    recommendations.push('Consider using TypeScript for better type safety');
  }

  if (!analysis.patterns.includes('testing')) {
    recommendations.push('Add unit tests to improve code coverage');
  }

  if (analysis.metrics.documentation === 0) {
    recommendations.push('Add JSDoc comments to document functions');
  }

  if (analysis.issues.includes('Inconsistent indentation')) {
    recommendations.push('Use a code formatter like Prettier');
  }

  if (analysis.issues.includes('Potential hardcoded secrets')) {
    recommendations.push('Use environment variables for sensitive data');
  }

  return recommendations;
};
