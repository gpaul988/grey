/**
 * AI Chat API
 * Uses: Ollama with open-source LLMs (Mistral, Llama 2, etc. - FREE)
 * Alternative to: OpenAI GPT-4 ($0.03/1K tokens)
 */

import { NextApiRequest, NextApiResponse } from 'next';
import { chat, chatStream, isOllamaRunning } from '@/lib/voice/ollama-chat';
import { authenticate } from '@/lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const user = await authenticate(req, res);
    if (!user) return;

    const { messages, systemPrompt, stream = false } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages array required' });
    }

    // Check if Ollama is running
    const running = await isOllamaRunning();
    if (!running) {
      return res.status(503).json({
        error: 'Ollama not available',
        hint: 'Run: ollama serve (in another terminal)',
        alternatives: [
          'Use Ollama locally: ollama pull mistral',
          'Or switch to: Llama 2, Neural Chat, etc.',
        ],
      });
    }

    // Use streaming or non-streaming based on client preference
    if (stream) {
      // Streaming response
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');

      let response = '';
      await chatStream(messages, systemPrompt, (token) => {
        response += token;
        res.write(`data: ${JSON.stringify({ token, fullResponse: response })}\n\n`);
      });

      console.log(`[Chat] ${user.id} used streaming chat (FREE)`);
      res.end();
    } else {
      // Non-streaming response
      const result = await chat(messages, systemPrompt);

      const tokenCount = result.message.content.split(/\s+/).length;
      console.log(`[Chat] ${user.id} sent ${messages.length} messages, got ${tokenCount} tokens (FREE)`);

      return res.status(200).json({
        success: true,
        message: result.message,
        stats: {
          totalDuration: result.totalDuration,
          loadDuration: result.loadDuration,
          promptEvalCount: result.promptEvalCount,
          evalCount: result.evalCount,
        },
        provider: `ollama (${process.env.OLLAMA_MODEL || 'mistral'}) - FREE`,
        cost: 0, // FREE!
      });
    }
  } catch (error) {
    console.error('Chat error:', error);
    return res.status(500).json({ error: 'Chat request failed' });
  }
}
