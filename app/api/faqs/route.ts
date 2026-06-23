import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { faqs } from '@/lib/db/schema';
import { eq, asc } from 'drizzle-orm';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    // Fetch all active FAQs, ordered by category then sort_order
    const faqItems = await db
      .select()
      .from(faqs)
      .where(eq(faqs.active, true))
      .orderBy(asc(faqs.category), asc(faqs.sortOrder));

    // Group FAQs by category
    const grouped: { [key: string]: typeof faqItems } = {};
    
    for (const item of faqItems) {
      if (!grouped[item.category]) {
        grouped[item.category] = [];
      }
      grouped[item.category].push(item);
    }

    // Convert to the expected format { name, items }
    const categories = Object.entries(grouped).map(([name, items]) => ({
      name,
      items: items.map((item) => ({
        id: item.id,
        question: item.question,
        answer: item.answer,
      })),
    }));

    return NextResponse.json(
      { 
        success: true,
        categories,
        total: faqItems.length,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch FAQs',
        categories: [],
      },
      { status: 500 }
    );
  }
}

// POST - Create a new FAQ (admin only)
export async function POST(req: NextRequest) {
  try {
    // TODO: Add admin auth check
    const body = await req.json();

    const { question, answer, category = 'General', sortOrder = 0 } = body;

    if (!question || !answer) {
      return NextResponse.json(
        { error: 'Missing required fields: question, answer' },
        { status: 400 }
      );
    }

    const result = await db
      .insert(faqs)
      .values({
        question,
        answer,
        category,
        sortOrder,
        active: true,
      })
      .returning();

    return NextResponse.json(
      {
        success: true,
        faq: result[0],
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating FAQ:', error);
    return NextResponse.json(
      { error: 'Failed to create FAQ' },
      { status: 500 }
    );
  }
}
