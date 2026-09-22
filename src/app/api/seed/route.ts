import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { ProductModel } from '@/models/Product';
import { CategoryModel } from '@/models/Category';
import { TestimonialModel } from '@/models/Testimonial';
import { INITIAL_PRODUCTS, INITIAL_CATEGORIES, INITIAL_TESTIMONIALS } from '@/lib/seedData';

export async function GET() {
  try {
    const db = await connectToDatabase();

    if (!db) {
      return NextResponse.json({
        success: false,
        message: 'No active MongoDB connection. Using in-memory seed data.',
        counts: {
          products: INITIAL_PRODUCTS.length,
          categories: INITIAL_CATEGORIES.length,
          testimonials: INITIAL_TESTIMONIALS.length,
        },
      });
    }

    await ProductModel.deleteMany({});
    await CategoryModel.deleteMany({});
    await TestimonialModel.deleteMany({});

    const seededProducts = await ProductModel.insertMany(INITIAL_PRODUCTS);
    const seededCategories = await CategoryModel.insertMany(INITIAL_CATEGORIES);
    const seededReviews = await TestimonialModel.insertMany(INITIAL_TESTIMONIALS);

    return NextResponse.json({
      success: true,
      message: 'Database seeded successfully!',
      counts: {
        products: seededProducts.length,
        categories: seededCategories.length,
        testimonials: seededReviews.length,
      },
    });
  } catch (error) {
    console.error('Seed error:', error);
    return NextResponse.json(
      { success: false, error: 'Database seeding failed' },
      { status: 500 }
    );
  }
}
