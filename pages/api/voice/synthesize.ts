/**
 * Text-to-Speech API
 * Uses: Piper TTS (local, FREE)
 * Alternative to: Eleven Labs ($0.30/1000 chars)
 */

import { NextApiRequest, NextApiResponse } from 'next';
import { synthesize, getAvailableVoices } from '@/lib/voice/piper-tts';
import { authenticate } from '@/lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    return handleSynthesizeRequest(req, res);
  }

  if (req.method === 'GET') {
    return handleVoicesRequest(req, res);
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

async function handleSynthesizeRequest(req: NextApiRequest, res: NextApiResponse) {
  try {
    const user = await authenticate(req, res);
    if (!user) return;

    const { text, language = 'en', speaker, speed, pitch } = req.body;

    if (!text || typeof text !== 'string') {
      return res.status(400).json({ error: 'Text content required' });
    }

    if (text.length > 5000) {
      return res.status(400).json({ error: 'Text too long (max 5000 chars)' });
    }

    // Synthesize using Piper (free, local)
    const result = await synthesize(text, {
      language,
      speaker,
      speed: speed ? parseFloat(speed) : 1.0,
      pitch: pitch ? parseFloat(pitch) : 1.0,
    });

    // Log usage (track free tier)
    console.log(`[TTS] ${user.id} synthesized ${text.length} chars in ${language} (FREE)`);

    // Return audio as binary
    res.setHeader('Content-Type', 'audio/wav');
    res.setHeader('Content-Length', result.audioBuffer.length);
    res.setHeader('X-Audio-Duration', result.duration.toString());
    res.setHeader('X-Provider', 'piper-tts (FREE)');
    res.setHeader('X-Cost', '0');

    return res.end(result.audioBuffer);
  } catch (error) {
    console.error('TTS error:', error);
    return res.status(500).json({ error: 'Speech synthesis failed' });
  }
}

async function handleVoicesRequest(req: NextApiRequest, res: NextApiResponse) {
  try {
    const voices = getAvailableVoices();

    return res.status(200).json({
      success: true,
      voices,
      provider: 'piper-tts (FREE)',
      note: 'All voices are free to use locally',
    });
  } catch (error) {
    console.error('Voices list error:', error);
    return res.status(500).json({ error: 'Failed to fetch voices' });
  }
}
