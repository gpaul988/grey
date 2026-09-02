import { NextRequest, NextResponse } from 'next/server';

const demoReviews = [
  {
    id: 'r1',
    productId: 'p1',
    customerName: 'Ada',
    rating: 5,
    comment: 'Excellent quality and delivery speed. Very satisfied.',
    createdAt: new Date().toISOString(),
    approved: true,
  },
  {
    id: 'r2',
    productId: 'p2',
    customerName: 'Kola',
    rating: 4,
    comment: 'Looks premium and works exactly as expected.',
    createdAt: new Date().toISOString(),
    approved: true,
  },
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const productId = searchParams.get('productId') || searchParams.get('product_id');
  const reviews = productId ? demoReviews.filter((review) => review.productId === productId) : demoReviews;
  return NextResponse.json({ reviews });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const productId = String(body.productId || body.product_id || '');
    const customerName = String(body.customerName || body.customer_name || 'Customer').trim();
    const rating = Number(body.rating ?? 5);
    const comment = String(body.comment || '').trim();

    if (!productId || !comment || Number.isNaN(rating) || rating < 1 || rating > 5) {
      return NextResponse.json({ error: 'Valid product id, rating, and comment are required.' }, { status: 400 });
    }

    const review = {
      id: `review_${Date.now()}`,
      productId,
      customerName: customerName || 'Customer',
      rating: Math.min(5, Math.max(1, Math.round(rating))),
      comment,
      createdAt: new Date().toISOString(),
      approved: true,
    };

    demoReviews.unshift(review);
    return NextResponse.json({ success: true, review }, { status: 201 });
  } catch (error) {
    console.error('[Store Reviews]', error);
    return NextResponse.json({ error: 'Failed to submit review' }, { status: 500 });
  }
}
