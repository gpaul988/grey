/**
 * Voice AI System Status
 * Shows which components are available (Whisper, Ollama, Piper)
 */

import { NextApiRequest, NextApiResponse } from 'next';
import { isWhisperAvailable, getAvailableModels as getWhisperModels } from '@/lib/voice/whisper-local';
import { isOllamaRunning, getAvailableModels as getOllamaModels } from '@/lib/voice/ollama-chat';
import { isPiperAvailable, getAvailableVoices } from '@/lib/voice/piper-tts';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const [whisperAvailable, ollamaRunning, piperAvailable] = await Promise.all([
      Promise.resolve(isWhisperAvailable()),
      isOllamaRunning(),
      Promise.resolve(isPiperAvailable()),
    ]);

    let ollamaModels: string[] = [];
    if (ollamaRunning) {
      try {
        ollamaModels = await getOllamaModels();
      } catch {
        ollamaModels = [];
      }
    }

    const piperVoices = getAvailableVoices();

    const status = {
      system: {
        timestamp: new Date().toISOString(),
        allComponentsReady:
          whisperAvailable && ollamaRunning && piperAvailable,
      },
      components: {
        whisper: {
          available: whisperAvailable,
          status: whisperAvailable
            ? '✅ Ready (Speech-to-Text)'
            : '⚠️ Not installed',
          description: 'Local speech recognition (free alternative to Deepgram)',
          installation: whisperAvailable
            ? null
            : 'Install: pip install openai-whisper',
          languages: [
            'en', 'es', 'fr', 'de', 'pt', 'ja', 'zh', 'ar', 'ru', 'it',
          ],
        },
        ollama: {
          available: ollamaRunning,
          status: ollamaRunning
            ? '✅ Running (Chat/LLM)'
            : '⚠️ Not running',
          description: 'Local LLM for chat (free alternative to GPT-4)',
          installation: ollamaRunning
            ? null
            : 'Start: ollama serve (in another terminal)',
          downloadedModels: ollamaModels,
          availableModels: [
            'mistral',
            'llama2',
            'neural-chat',
            'dolphin-mixtral',
          ],
          estimatedVRAM: {
            mistral: '7GB',
            llama2: '13GB',
            neural_chat: '4GB',
          },
        },
        piper: {
          available: piperAvailable,
          status: piperAvailable
            ? '✅ Ready (Text-to-Speech)'
            : '⚠️ Not installed',
          description: 'Local neural TTS (free alternative to Eleven Labs)',
          installation: piperAvailable
            ? null
            : 'Install: pip install piper-tts',
          availableVoices: piperVoices,
          languageCount: Object.keys(piperVoices).length,
        },
      },
      costs: {
        whisper: {
          cost: 'FREE (local)',
          paid_alternative: 'Deepgram (~$0.0043/min)',
          annual_savings: 'Unlimited transcription',
        },
        ollama: {
          cost: 'FREE (local)',
          paid_alternative: 'OpenAI GPT-4 (~$0.03/1K tokens)',
          annual_savings: 'Unlimited chat requests',
        },
        piper: {
          cost: 'FREE (local)',
          paid_alternative: 'Eleven Labs (~$0.30/1000 chars)',
          annual_savings: 'Unlimited TTS synthesis',
        },
      },
      recommendations: getRecommendations(
        whisperAvailable,
        ollamaRunning,
        piperAvailable
      ),
      quickStart: {
        installAll: `
# Install all components:
pip install openai-whisper ollama piper-tts ffmpeg

# In Terminal 1 - Start Ollama:
ollama serve

# In Terminal 2 - Download models:
ollama pull mistral
ollama pull neural-chat

# In Terminal 3 - Start your app:
npm run dev
        `,
        testApi: `
# Test Speech-to-Text
curl -X POST http://localhost:3000/api/voice/transcribe \\
  -H "Authorization: Bearer YOUR_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{"audio":"base64_audio_here","language":"en"}'

# Test Chat
curl -X POST http://localhost:3000/api/voice/chat \\
  -H "Authorization: Bearer YOUR_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{"messages":[{"role":"user","content":"Hello!"}]}'

# Test Text-to-Speech
curl -X POST http://localhost:3000/api/voice/synthesize \\
  -H "Authorization: Bearer YOUR_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{"text":"Hello world","language":"en"}' > output.wav
        `,
      },
    };

    return res.status(200).json(status);
  } catch (error) {
    console.error('Status check error:', error);
    return res.status(500).json({ error: 'Failed to check voice system status' });
  }
}

function getRecommendations(
  whisperAvailable: boolean,
  ollamaRunning: boolean,
  piperAvailable: boolean
): string[] {
  const recommendations: string[] = [];

  if (!whisperAvailable) {
    recommendations.push(
      '📥 Install Whisper: pip install openai-whisper'
    );
  }

  if (!ollamaRunning) {
    recommendations.push(
      '🚀 Start Ollama: ollama serve (in another terminal)'
    );
  }

  if (!piperAvailable) {
    recommendations.push(
      '🔊 Install Piper: pip install piper-tts'
    );
  }

  if (
    !whisperAvailable ||
    !ollamaRunning ||
    !piperAvailable
  ) {
    recommendations.push(
      '💡 Tip: Run "npm run setup-voice" to install all voice components'
    );
  } else {
    recommendations.push(
      '✅ All voice components ready! Your system is 100% free & self-hosted.'
    );
    recommendations.push(
      '🎉 Estimated annual savings: $10,000+ vs. commercial APIs'
    );
  }

  return recommendations;
}
