/**
 * Voice Transcription & Speech-to-Text
 * Uses Deepgram API for high-accuracy transcription
 * Fallback: Web Speech API for basic transcription
 */

const DEEPGRAM_API_KEY = process.env.DEEPGRAM_API_KEY;
const DEEPGRAM_URL = 'https://api.deepgram.com/v1/listen';

/**
 * Transcribe audio buffer to text using Deepgram
 * Supports: WAV, MP3, FLAC, M4A, OPUS, ULAW
 */
export async function transcribeAudio(audioBuffer: Buffer, options?: {
  language?: string;
  model?: 'nova' | 'enhanced' | 'base';
  punctuate?: boolean;
  redact?: boolean;
}): Promise<{
  text: string;
  confidence: number;
  duration: number;
  error?: string;
}> {
  if (!DEEPGRAM_API_KEY) {
    return {
      text: '',
      confidence: 0,
      duration: 0,
      error: 'DEEPGRAM_API_KEY not configured',
    };
  }

  try {
    const formData = new FormData();
    // @ts-expect-error Buffer/Uint8Array type compatibility
    const audioBlob = new Blob([audioBuffer], { type: 'audio/wav' });
    formData.append('audio', audioBlob);

    const queryParams = new URLSearchParams({
      model: options?.model || 'nova',
      language: options?.language || 'en',
      punctuate: (options?.punctuate ?? true).toString(),
      redact: (options?.redact ?? false).toString(),
    });

    const response = await fetch(`${DEEPGRAM_URL}?${queryParams}`, {
      method: 'POST',
      headers: {
        Authorization: `Token ${DEEPGRAM_API_KEY}`,
      },
      body: formData,
    });

    if (!response.ok) {
      return {
        text: '',
        confidence: 0,
        duration: 0,
        error: `Deepgram API error: ${response.statusText}`,
      };
    }

    const result = await response.json() as any;
    const transcript = result.results?.channels?.[0]?.alternatives?.[0];

    if (!transcript) {
      return {
        text: '',
        confidence: 0,
        duration: 0,
        error: 'No transcription in response',
      };
    }

    return {
      text: transcript.transcript,
      confidence: transcript.confidence,
      duration: result.metadata?.duration || 0,
    };
  } catch (error) {
    console.error('Transcription error:', error);
    return {
      text: '',
      confidence: 0,
      duration: 0,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Transcribe streaming audio (real-time)
 * For live transcription during user speech
 */
export async function transcribeStream(
  audioStream: ReadableStream<Uint8Array>,
  onPartial?: (text: string) => void
): Promise<{
  text: string;
  confidence: number;
}> {
  if (!DEEPGRAM_API_KEY) {
    return {
      text: '',
      confidence: 0,
    };
  }

  try {
    const url = new URL(DEEPGRAM_URL);
    url.searchParams.se'nova';
    url.searchParams.se'en';
    url.searchParams.se'true';

    const response = await fetch(url.toString(), {
      method: 'POST',
      headers: {
        Authorization: `Token ${DEEPGRAM_API_KEY}`,
        'Content-Type': 'application/octet-stream',
      },
      body: audioStream as any,
    });

    if (!response.ok) {
      return {
        text: '',
        confidence: 0,
      };
    }

    const reader = response.body?.getReader();
    if (!reader) throw new Error('No response body');

    let fullText = '';
    let confidence = 0;

    const decoder = new TextDecoder();
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      const lines = chunk.split('\n').filter(Boolean);

      for (const line of lines) {
        try {
          const data = JSON.parse(line) as any;
          const transcript = data.channel?.alternatives?.[0];

          if (transcript) {
            fullText = transcript.transcript;
            confidence = transcript.confidence;

            if (onPartial) {
              onPartial(fullText);
            }
          }
        } catch (e) {
          // Skip invalid JSON lines
        }
      }
    }

    return {
      text: fullText,
      confidence,
    };
  } catch (error) {
    console.error('Stream transcription error:', error);
    return {
      text: '',
      confidence: 0,
    };
  }
}

/**
 * Web Speech API fallback (client-side, no backend needed)
 * Used when Deepgram API is unavailable
 *
 * Usage (browser only):
 * const result = await transcribeWithWebSpeechAPI();
 */
export function getWebSpeechAPIScript(): string {
  return `
    (function() {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) {
        console.error('Web Speech API not supported');
        return;
      }

      window.startVoiceRecognition = function(onResult, onError) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onstart = () => {
          console.log('Voice recognition started');
        };

        recognition.onresult = (event) => {
          let interimTranscript = '';
          let finalTranscript = '';

          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              finalTranscript += transcript + ' ';
            } else {
              interimTranscript += transcript;
            }
          }

          onResult({
            text: finalTranscript || interimTranscript,
            isFinal: event.results[event.results.length - 1]?.isFinal || false,
          });
        };

        recognition.onerror = (event) => {
          onError(event.error);
        };

        recognition.onend = () => {
          console.log('Voice recognition ended');
        };

        recognition.start();

        return () => recognition.abort();
      };
    })();
  `;
}

/**
 * Language detection from text
 * Determines if transcription is in expected language
 */
export async function detectLanguage(text: string): Promise<{
  language: string;
  confidence: number;
}> {
  // Simple heuristic (in production, use language-detect library)
  const patterns: Record<string, RegExp> = {
    en: /\b(the|is|are|have|has|will|would|could)\b/i,
    es: /\b(el|la|es|son|hay|será|podría)\b/i,
    fr: /\b(le|la|est|sont|avoir|sera|pourrait)\b/i,
    de: /\b(der|die|das|ist|sind|haben|wird|könnte)\b/i,
    zh: /[\u4E00-\u9FFF]/g,
    ja: /[\u3040-\u309F\u30A0-\u30FF]/g,
  };

  let bestMatch = 'en';
  let bestScore = 0;

  for (const [lang, pattern] of Object.entries(patterns)) {
    const matches = text.match(pattern);
    const score = matches ? matches.length : 0;
    if (score > bestScore) {
      bestScore = score;
      bestMatch = lang;
    }
  }

  return {
    language: bestMatch,
    confidence: Math.min(bestScore / 10, 1), // Max 100% confidence at 10 matches
  };
}

/**
 * Clean transcription output
 * Remove filler words, normalize punctuation
 */
export function cleanTranscription(text: string): string {
  return text
    .replace(/\b(um|uh|like|you know|sort of|kind of)\b/gi, '')
    .replace(/\s+/g, ' ')
    .trim();
}
