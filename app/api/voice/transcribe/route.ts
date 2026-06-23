import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/voice/transcribe
 * Transcribe audio to text (uses Web Speech API or external service)
 */
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const audioBlob = formData.get('audio') as Blob;

    if (!audioBlob) {
      return NextResponse.json(
        { error: 'No audio provided' },
        { status: 400 }
      );
    }

    // TODO: Implement transcription using:
    // - OpenAI Whisper API
    // - Google Cloud Speech-to-Text
    // - AWS Transcribe
    // For now, return placeholder response

    return NextResponse.json(
      {
        success: true,
        text: '[Transcription service not yet configured. Configure Whisper API or similar in .env]',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error transcribing audio:', error);
    return NextResponse.json(
      { error: 'Failed to transcribe audio' },
      { status: 500 }
    );
  }
}
