import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { CategoryModel } from '@/models/Category';
import { INITIAL_CATEGORIES } from '@/lib/seedData';

export async function GET() {
  try {
    const db = await connectToDatabase();

    if (db) {
      const count = await CategoryModel.countDocuments();
      if (count === 0) {
        await CategoryModel.insertMany(INITIAL_CATEGORIES);
      }
      const categories = await CategoryModel.find().lean();
      return NextResponse.json({ success: true, data: categories });
    }

    return NextResponse.json({ success: true, data: INITIAL_CATEGORIES });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch categories', data: INITIAL_CATEGORIES },
      { status: 500 }
    );
  }
}
