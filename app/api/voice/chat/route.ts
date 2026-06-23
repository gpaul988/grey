import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/voice/chat
 * Process voice chat with AI assistant
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { text } = body;

    if (!text) {
      return NextResponse.json(
        { error: 'No text provided' },
        { status: 400 }
      );
    }

    // TODO: Integrate with /api/ai/chat endpoint
    // For now, return placeholder response

    return NextResponse.json(
      {
        success: true,
        response: 'Voice chat feature is not yet configured. Use text chat instead.',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing voice chat:', error);
    return NextResponse.json(
      { error: 'Failed to process voice chat' },
      { status: 500 }
    );
  }
}
