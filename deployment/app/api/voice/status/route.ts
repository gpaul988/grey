import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/voice/status
 * Check voice service status
 */
export async function GET(req: NextRequest) {
  try {
    return NextResponse.json(
      {
        status: 'not_configured',
        services: {
          transcription: false,
          text_to_speech: false,
          voice_chat: false,
        },
        message: 'Voice services are not yet configured. Set up OpenAI Whisper, TTS service, etc. in .env',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error checking voice status:', error);
    return NextResponse.json(
      { error: 'Failed to check voice service status' },
      { status: 500 }
    );
  }
}
