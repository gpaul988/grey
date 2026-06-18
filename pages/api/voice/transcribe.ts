/**
 * Speech-to-Text API
 * Uses: Whisper.cpp (local, FREE)
 * Alternative to: Deepgram ($0.0043/min)
 */

import { NextApiRequest, NextApiResponse } from 'next';
import { transcribeStream } from '@/lib/voice/whisper-local';
import { authenticate } from '@/lib/auth';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '25mb', // Max audio size: 25MB
    },
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const user = await authenticate(req, res);
    if (!user) return;

    const { audio, language = 'en', format = 'wav' } = req.body;

    if (!audio) {
      return res.status(400).json({ error: 'Audio data required' });
    }

    // Convert base64 or Buffer to Buffer
    const audioBuffer = typeof audio === 'string' ? Buffer.from(audio, 'base64') : audio;

    // Transcribe using Whisper.cpp (free, local)
    const result = await transcribeStream(audioBuffer, language);

    // Log usage (track free tier)
    const duration = result.duration || audioBuffer.length / (16000 * 2); // Estimate from buffer size
    console.log(`[Transcribe] ${user.id} used ${duration.toFixed(2)}s of transcription (FREE)`);

    return res.status(200).json({
      success: true,
      text: result.text,
      language: result.language,
      duration: result.duration,
      confidence: result.confidence,
      provider: 'whisper-cpp (FREE)',
      cost: 0, // FREE!
    });
  } catch (error) {
    console.error('Transcription error:', error);
    return res.status(500).json({ error: 'Transcription failed' });
  }
}
