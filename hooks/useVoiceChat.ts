'use client';

import { useState, useCallback } from 'react';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface UseChatOptions {
  systemPrompt?: string;
  apiToken?: string;
  language?: string;
}

/**
 * Hook for managing voice chat state and operations
 */
export const useVoiceChat = (options: UseChatOptions = {}) => {
  const { systemPrompt, apiToken, language = 'en' } = options;

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [systemStatus, setSystemStatus] = useState<any>(null);

  // Transcribe audio to text
  const transcribe = useCallback(
    async (audioBlob: Blob): Promise<string> => {
      try {
        setError(null);
        const audioBuffer = await audioBlob.arrayBuffer();
        const base64 = Buffer.from(audioBuffer).toString('base64');

        const response = await fetch('/api/voice/transcribe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiToken || localStorage.getItem('token')}`,
          },
          body: JSON.stringify({
            audio: base64,
            language,
          }),
        });

        if (!response.ok) {
          throw new Error('Transcription failed');
        }

        const data = await response.json();
        return data.text;
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Transcription error';
        setError(message);
        throw err;
      }
    },
    [apiToken, language]
  );

  // Send chat message
  const sendMessage = useCallback(
    async (message: string): Promise<string> => {
      try {
        setIsLoading(true);
        setError(null);

        const updatedMessages: ChatMessage[] = [
          ...messages,
          { role: 'user', content: message },
        ];
        setMessages(updatedMessages);

        const response = await fetch('/api/voice/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiToken || localStorage.getItem('token')}`,
          },
          body: JSON.stringify({
            messages: updatedMessages,
            systemPrompt,
            stream: false,
          }),
        });

        if (!response.ok) {
          throw new Error('Chat request failed');
        }

        const data = await response.json();
        const assistantMessage = data.message.content;

        setMessages([
          ...updatedMessages,
          { role: 'assistant', content: assistantMessage },
        ]);

        return assistantMessage;
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Chat error';
        setError(message);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [messages, systemPrompt, apiToken]
  );

  // Synthesize text to speech
  const synthesize = useCallback(
    async (text: string): Promise<Blob> => {
      try {
        setError(null);

        const response = await fetch('/api/voice/synthesize', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiToken || localStorage.getItem('token')}`,
          },
          body: JSON.stringify({
            text,
            language,
          }),
        });

        if (!response.ok) {
          throw new Error('Synthesis failed');
        }

        return await response.blob();
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Synthesis error';
        setError(message);
        throw err;
      }
    },
    [apiToken, language]
  );

  // Voice-to-chat pipeline (record audio → transcribe → chat → synthesize)
  const voiceToChat = useCallback(
    async (audioBlob: Blob): Promise<{ text: string; response: string; audio: Blob }> => {
      try {
        // 1. Transcribe
        const text = await transcribe(audioBlob);

        // 2. Chat
        const response = await sendMessage(text);

        // 3. Synthesize
        const audio = await synthesize(response);

        return { text, response, audio };
      } catch (err) {
        throw err;
      }
    },
    [transcribe, sendMessage, synthesize]
  );

  // Check system status
  const checkStatus = useCallback(async () => {
    try {
      const response = await fetch('/api/voice/status');
      const data = await response.json();
      setSystemStatus(data);
      return data;
    } catch (err) {
      setError('Failed to check system status');
      throw err;
    }
  }, []);

  // Clear chat history
  const clearChat = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  return {
    // State
    messages,
    isLoading,
    error,
    systemStatus,

    // Actions
    transcribe,
    sendMessage,
    synthesize,
    voiceToChat,
    checkStatus,
    clearChat,

    // Utils
    addMessage: (role: ChatMessage['role'], content: string) => {
      setMessages((prev) => [...prev, { role, content }]);
    },
    setError,
  };
};
