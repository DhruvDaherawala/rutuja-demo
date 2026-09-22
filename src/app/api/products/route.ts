import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { ProductModel } from '@/models/Product';
import { INITIAL_PRODUCTS } from '@/lib/seedData';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const sort = searchParams.get('sort');
    const featured = searchParams.get('featured');
    const bestseller = searchParams.get('bestseller');

    const db = await connectToDatabase();

    let products = INITIAL_PRODUCTS;

    if (db) {
      // If DB has products, use them, otherwise fallback to seed data
      const count = await ProductModel.countDocuments();
      if (count === 0) {
        // Automatically seed
        await ProductModel.insertMany(INITIAL_PRODUCTS);
      }
      const query: Record<string, unknown> = {};
      if (category && category !== 'all') {
        query.category = { $regex: new RegExp(`^${category}$`, 'i') };
      }
      if (featured === 'true') {
        query.featured = true;
      }
      if (bestseller === 'true') {
        query.bestseller = true;
      }
      if (search) {
        query.$or = [
          { name: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
          { tags: { $in: [new RegExp(search, 'i')] } },
        ];
      }

      let sortOptions: Record<string, 1 | -1> = { createdAt: -1 };
      if (sort === 'price-asc') sortOptions = { price: 1 };
      if (sort === 'price-desc') sortOptions = { price: -1 };
      if (sort === 'featured') sortOptions = { featured: -1, createdAt: -1 };

      const dbProducts = await ProductModel.find(query).sort(sortOptions).lean();
      return NextResponse.json({ success: true, data: dbProducts });
    }

    // In-memory fallback
    let filtered = [...products];

    if (category && category !== 'all') {
      filtered = filtered.filter(
        (p) => p.category.toLowerCase() === category.toLowerCase()
      );
    }
    if (bestseller === 'true') {
      filtered = filtered.filter((p) => p.bestseller);
    }
    if (featured === 'true') {
      filtered = filtered.filter((p) => p.featured);
    }
    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (sort === 'price-asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sort === 'price-desc') {
      filtered.sort((a, b) => b.price - a.price);
    }

    return NextResponse.json({ success: true, data: filtered });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch products', data: INITIAL_PRODUCTS },
      { status: 500 }
    );
  }
}
