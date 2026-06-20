import { NextRequest, NextResponse } from 'next/server';
import { getLanguageFromHeaders } from '@/i18n.config';
import { getAllTranslations } from '@/lib/translations';

/**
 * GET /api/i18n?lang=en
 * Returns translations for the specified language.
 * If no language specified, auto-detects from Accept-Language header.
 */
export async function GET(request: NextRequest) {
    try {
        // Get language from query param or header
        const searchParams = request.nextUrl.searchParams;
        let language = searchParams.get('lang');

        if (!language) {
            language = getLanguageFromHeaders(request.headers.get('accept-language') || undefined);
        }

        const translations = await getAllTranslations(language);

        return NextResponse.json({
            language,
            translations,
        });
    } catch (error) {
        console.error('[i18n API]', error);
        return NextResponse.json(
            { error: 'Failed to load translations' },
            { status: 500 }
        );
    }
}
