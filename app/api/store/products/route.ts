import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import {
  storeProducts,
  storeCategories,
  storeBrands,
  storeProductReviews,
} from '@/lib/db/store-schema';
import { eq, and, like, sql } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');
    const brand = searchParams.get('brand');
    const search = searchParams.get('search');
    const featured = searchParams.get('featured');
    const productType = searchParams.get('type'); // hardware or software
    const limit = parseInt(searchParams.get('limit') || '100', 10);
    const offset = parseInt(searchParams.get('offset') || '0', 10);

    const whereConditions = [eq(storeProducts.isActive, true)];

    if (category) {
      const cat = await db
        .select()
        .from(storeCategories)
        .where(eq(storeCategories.slug, category))
        .limit(1)
        .then((r: any[]) => r[0]);
      if (cat) {
        whereConditions.push(eq(storeProducts.categoryId, cat.id));
      }
    }

    if (brand) {
      const b = await db
        .select()
        .from(storeBrands)
        .where(eq(storeBrands.slug, brand))
        .limit(1)
        .then((r: any[]) => r[0]);
      if (b) {
        whereConditions.push(eq(storeProducts.brandId, b.id));
      }
    }

    if (featured === '1') {
      whereConditions.push(eq(storeProducts.featured, true));
    }

    if (productType && ['hardware', 'software'].includes(productType)) {
      whereConditions.push(eq(storeProducts.productType, productType));
    }

    if (search) {
      whereConditions.push(
        sql`(${storeProducts.name} LIKE ${'%' + search + '%'} OR ${storeProducts.description} LIKE ${'%' + search + '%'})`
      );
    }

    const products = await db
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
        rating: storeProducts.rating,
        review_count: storeProducts.reviewCount,
      })
      .from(storeProducts)
      .leftJoin(storeCategories, eq(storeProducts.categoryId, storeCategories.id))
      .leftJoin(storeBrands, eq(storeProducts.brandId, storeBrands.id))
      .where(and(...whereConditions))
      .limit(limit)
      .offset(offset);

    // Fetch categories
    const categories = await db.select().from(storeCategories);

    // Fetch brands
    const brands = await db.select().from(storeBrands);

    return NextResponse.json({
      products: products.map((p: any) => ({
        ...p,
        images: p.images ? JSON.parse(p.images) : [],
        specs: p.specs ? JSON.parse(p.specs) : {},
        tags: p.tags ? JSON.parse(p.tags) : [],
      })),
      categories,
      brands,
      total: products.length,
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products', details: String(error) },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      name,
      description,
      categoryId,
      brandId,
      price,
      priceUsd,
      comparePrice,
      stock,
      images = [],
      thumbnail,
      specs = {},
      tags = [],
      featured = false,
      productType = 'hardware',
      downloadUrl,
      licenseType,
      licenseCount,
      supportEmail,
    } = body;

    // Validate required fields
    if (!name || !categoryId || price === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields: name, categoryId, price' },
        { status: 400 }
      );
    }

    // Generate slug from name
    const slug = name
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]/g, '')
      .substring(0, 200);

    // Validate software product requirements
    if (productType === 'software' && !downloadUrl) {
      return NextResponse.json(
        { error: 'Software products must include downloadUrl' },
        { status: 400 }
      );
    }

    const result = await db.insert(storeProducts).values({
      name,
      slug,
      description,
      categoryId,
      brandId: brandId || null,
      price,
      priceUsd: priceUsd || null,
      comparePrice: comparePrice || null,
      stock,
      images: JSON.stringify(images),
      thumbnail,
      specs: JSON.stringify(specs),
      tags: JSON.stringify(tags),
      featured,
      productType,
      downloadUrl: downloadUrl || null,
      licenseType: licenseType || null,
      licenseCount: licenseCount || null,
      supportEmail: supportEmail || null,
    });

    const newProduct = await db
      .select()
      .from(storeProducts)
      .where(eq(storeProducts.slug, slug))
      .limit(1)
      .then((r: any[]) => r[0]);

    if (!newProduct) {
      return NextResponse.json(
        { error: 'Failed to create product' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        id: newProduct.id,
        message: `${productType.charAt(0).toUpperCase() + productType.slice(1)} product created successfully`,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Failed to create product', details: String(error) },
      { status: 500 }
    );
  }
}
