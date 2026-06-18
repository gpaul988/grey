/**
 * Local LLM Chat using Ollama
 * FREE alternative to OpenAI GPT-4
 * 
 * Supported models: Llama 2, Mistral, Neural Chat, etc.
 * Run locally: ollama serve (defaults to localhost:11434)
 */

import { Ollama } from 'ollama';

const ollama = new Ollama({
  host: process.env.OLLAMA_URL || 'http://localhost:11434',
});

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface ChatResponse {
  message: ChatMessage;
  totalDuration: number;
  loadDuration: number;
  promptEvalCount: number;
  evalCount: number;
  confidence: number;
}

/**
 * Single message completion (non-streaming)
 */
export const chat = async (
  messages: ChatMessage[],
  systemPrompt?: string
): Promise<ChatResponse> => {
  try {
    const formattedMessages = systemPrompt
      ? [{ role: 'system' as const, content: systemPrompt }, ...messages]
      : messages;

    const response = await ollama.chat({
      model: process.env.OLLAMA_MODEL || 'mistral',
      messages: formattedMessages,
      stream: false,
    });

    return {
      message: {
        role: (response.message.role as 'user' | 'assistant' | 'system') || 'assistant',
        content: response.message.content || '',
      },
      totalDuration: response.total_duration || 0,
      loadDuration: response.load_duration || 0,
      promptEvalCount: response.prompt_eval_count || 0,
      evalCount: response.eval_count || 0,
      confidence: 0.9, // Ollama doesn't provide confidence, estimate high
    };
  } catch (error) {
    console.error('Ollama chat error:', error);
    throw error;
  }
};

/**
 * Streaming chat response
 */
export const chatStream = async (
  messages: ChatMessage[],
  systemPrompt?: string,
  onToken?: (token: string) => void
): Promise<string> => {
  try {
    const formattedMessages = systemPrompt
      ? [{ role: 'system' as const, content: systemPrompt }, ...messages]
      : messages;

    let fullResponse = '';

    const response = await ollama.chat({
      model: process.env.OLLAMA_MODEL || 'mistral',
      messages: formattedMessages,
      stream: true,
    });

    for await (const chunk of response) {
      const content = chunk.message?.content || '';
      fullResponse += content;
      if (onToken) {
        onToken(content);
      }
    }

    return fullResponse;
  } catch (error) {
    console.error('Ollama stream error:', error);
    throw error;
  }
};

/**
 * Code analysis using local LLM
 */
export const analyzeCode = async (
  code: string,
  language: string = 'typescript'
): Promise<{
  issues: string[];
  suggestions: string[];
  score: number;
}> => {
  const prompt = `Analyze this ${language} code for issues and improvements:

\`\`\`${language}
${code}
\`\`\`

Respond in JSON format:
{
  "issues": ["issue1", "issue2"],
  "suggestions": ["suggestion1", "suggestion2"],
  "score": 0.0-1.0
}`;

  try {
    const response = await chat([{ role: 'user', content: prompt }]);
    const content = response.message.content;

    // Parse JSON response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }

    return {
      issues: [],
      suggestions: [content],
      score: 0.5,
    };
  } catch (error) {
    console.error('Code analysis error:', error);
    throw error;
  }
};

/**
 * Document/text summarization
 */
export const summarize = async (text: string, maxLength: number = 200): Promise<string> => {
  const prompt = `Summarize the following text in ${maxLength} characters or less:

${text}`;

  try {
    const response = await chat([{ role: 'user', content: prompt }]);
    return response.message.content.substring(0, maxLength);
  } catch (error) {
    console.error('Summarization error:', error);
    throw error;
  }
};

/**
 * Question answering
 */
export const answerQuestion = async (
  question: string,
  context?: string
): Promise<string> => {
  const prompt = context
    ? `Based on this context:\n${context}\n\nAnswer the question: ${question}`
    : question;

  try {
    const response = await chat([{ role: 'user', content: prompt }]);
    return response.message.content;
  } catch (error) {
    console.error('Q&A error:', error);
    throw error;
  }
};

/**
 * Get list of available Ollama models
 */
export const getAvailableModels = async (): Promise<string[]> => {
  try {
    const response = await fetch(
      `${process.env.OLLAMA_URL || 'http://localhost:11434'}/api/tags`
    );
    const data = (await response.json()) as { models: Array<{ name: string }> };
    return data.models.map((m) => m.name);
  } catch (error) {
    console.error('Failed to get Ollama models:', error);
    return [];
  }
};

/**
 * Pull/download an Ollama model
 */
export const downloadModel = async (modelName: string): Promise<void> => {
  try {
    const response = await fetch(
      `${process.env.OLLAMA_URL || 'http://localhost:11434'}/api/pull`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: modelName }),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to pull model: ${response.statusText}`);
    }

    // Stream the response (Ollama sends progress updates)
    const reader = response.body?.getReader();
    if (reader) {
      while (true) {
        const { done } = await reader.read();
        if (done) break;
      }
    }
  } catch (error) {
    console.error('Model download error:', error);
    throw error;
  }
};

/**
 * Check if Ollama is running and accessible
 */
export const isOllamaRunning = async (): Promise<boolean> => {
  try {
    const response = await fetch(
      `${process.env.OLLAMA_URL || 'http://localhost:11434'}/api/tags`
    );
    return response.ok;
  } catch {
    return false;
  }
};

/**
 * Get system information and available memory
 */
export const getSystemInfo = async (): Promise<{
  running: boolean;
  currentModel: string | null;
  availableModels: string[];
  responseTime: number;
}> => {
  const startTime = Date.now();

  try {
    const models = await getAvailableModels();
    const responseTime = Date.now() - startTime;

    return {
      running: true,
      currentModel: process.env.OLLAMA_MODEL || 'mistral',
      availableModels: models,
      responseTime,
    };
  } catch {
    return {
      running: false,
      currentModel: null,
      availableModels: [],
      responseTime: Date.now() - startTime,
    };
  }
};
