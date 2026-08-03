import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import {
  storeProducts,
  storeCategories,
  storeBrands,
  storeProductReviews,
} from '@/lib/db/store-schema';
import { eq, and } from 'drizzle-orm';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const product = await db
      .select({
        id: storeProducts.id,
        name: storeProducts.name,
        slug: storeProducts.slug,
        sku: storeProducts.sku,
        price: storeProducts.price,
        price_usd: storeProducts.priceUsd,
        compare_price: storeProducts.comparePrice,
        stock: storeProducts.stock,
        images: storeProducts.images,
        thumbnail: storeProducts.thumbnail,
        description: storeProducts.description,
        specs: storeProducts.specs,
        featured: storeProducts.featured,
        tags: storeProducts.tags,
        category_id: storeProducts.categoryId,
        category_name: storeCategories.name,
        category_slug: storeCategories.slug,
        brand_name: storeBrands.name,
        brand_slug: storeBrands.slug,
        product_type: storeProducts.productType,
        download_url: storeProducts.downloadUrl,
        license_type: storeProducts.licenseType,
        license_count: storeProducts.licenseCount,
        support_email: storeProducts.supportEmail,
        rating: storeProducts.rating,
        review_count: storeProducts.reviewCount,
        created_at: storeProducts.createdAt,
      })
      .from(storeProducts)
      .leftJoin(storeCategories, eq(storeProducts.categoryId, storeCategories.id))
      .leftJoin(storeBrands, eq(storeProducts.brandId, storeBrands.id))
      .where(and(eq(storeProducts.slug, slug), eq(storeProducts.isActive, true)))
      .limit(1)
      .then((r: any[]) => r[0]);

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    // Fetch reviews
    const reviews = await db
      .select()
      .from(storeProductReviews)
      .where(
        and(
          eq(storeProductReviews.productId, product.id),
          eq(storeProductReviews.status, 'approved')
        )
      )
      .orderBy(storeProductReviews.createdAt);

    // Calculate rating
    const rating =
      reviews.length > 0
        ? reviews.reduce((sum: number, r: any) => sum + r.rating, 0) / reviews.length
        : product.rating || 0;

    return NextResponse.json({
      product: {
        ...product,
        images: product.images ? JSON.parse(product.images) : [],
        specs: product.specs ? JSON.parse(product.specs) : {},
        tags: product.tags ? JSON.parse(product.tags) : [],
        rating: Math.round(rating * 10) / 10,
      },
      reviews: reviews.map((r: any) => ({
        id: r.id,
        rating: r.rating,
        title: r.title,
        content: r.content,
        isVerified: r.isVerified,
        helpful: r.helpful,
        unhelpful: r.unhelpful,
        createdAt: r.createdAt,
      })),
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product', details: String(error) },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const body = await request.json();

    const { rating, title, content, customerId } = body;

    // Validate review
    if (!rating || !title || !content || !customerId) {
      return NextResponse.json(
        { error: 'Missing required fields: rating, title, content, customerId' },
        { status: 400 }
      );
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: 'Rating must be between 1 and 5' },
        { status: 400 }
      );
    }

    // Find product
    const product = await db
      .select()
      .from(storeProducts)
      .where(eq(storeProducts.slug, slug))
      .limit(1)
      .then((r: any[]) => r[0]);

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    // Create review
    const review = await db.insert(storeProductReviews).values({
      productId: product.id,
      customerId,
      rating,
      title,
      content,
      status: 'pending', // Reviews need approval
    });

    return NextResponse.json(
      {
        message: 'Review submitted successfully and pending approval',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating review:', error);
    return NextResponse.json(
      { error: 'Failed to create review', details: String(error) },
      { status: 500 }
    );
  }
}
