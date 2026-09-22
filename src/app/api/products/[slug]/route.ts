import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { ProductModel } from '@/models/Product';
import { INITIAL_PRODUCTS } from '@/lib/seedData';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const db = await connectToDatabase();

    if (db) {
      const product = await ProductModel.findOne({ slug }).lean();
      if (product) {
        return NextResponse.json({ success: true, data: product });
      }
    }

    // In-memory fallback
    const fallback = INITIAL_PRODUCTS.find(
      (p) => p.slug === slug || p._id === slug
    );

    if (!fallback) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: fallback });
  } catch (error) {
    console.error('Error fetching product by slug:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}
