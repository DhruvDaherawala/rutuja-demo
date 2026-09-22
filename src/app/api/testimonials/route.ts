import { NextResponse } from 'next/server';
import { z } from 'zod';
import { connectToDatabase } from '@/lib/mongodb';
import { TestimonialModel } from '@/models/Testimonial';
import { INITIAL_TESTIMONIALS } from '@/lib/seedData';
import { Testimonial } from '@/types';

// In-memory runtime cache for testimonials fallback
const localTestimonials: Testimonial[] = [...INITIAL_TESTIMONIALS];

const TestimonialSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(60),
  email: z.string().email('Please enter a valid email address'),
  message: z.string().min(5, 'Message must be at least 5 characters').max(600),
  rating: z.number().min(1).max(5).default(5),
});

export async function GET() {
  try {
    const db = await connectToDatabase();

    if (db) {
      const count = await TestimonialModel.countDocuments();
      if (count === 0) {
        await TestimonialModel.insertMany(INITIAL_TESTIMONIALS);
      }
      const testimonials = await TestimonialModel.find({ approved: true })
        .sort({ createdAt: -1 })
        .lean();
      return NextResponse.json({ success: true, data: testimonials });
    }

    return NextResponse.json({
      success: true,
      data: localTestimonials.filter((t) => t.approved),
    });
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch testimonials', data: localTestimonials },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = TestimonialSchema.safeParse(body);

    if (!validatedData.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          issues: validatedData.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { name, email, message, rating } = validatedData.data;
    const db = await connectToDatabase();

    if (db) {
      const newTestimonial = await TestimonialModel.create({
        name,
        email,
        message,
        rating,
        approved: true,
      });

      return NextResponse.json(
        {
          success: true,
          message: 'Testimonial submitted successfully! Thank you for your kind words.',
          data: newTestimonial,
        },
        { status: 201 }
      );
    }

    // In-memory fallback
    const newLocal: Testimonial = {
      _id: `test-${Date.now()}`,
      name,
      email,
      message,
      rating,
      approved: true,
      createdAt: new Date().toISOString(),
    };
    localTestimonials.unshift(newLocal);

    return NextResponse.json(
      {
        success: true,
        message: 'Testimonial submitted successfully! Thank you for your kind words.',
        data: newLocal,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating testimonial:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to submit testimonial' },
      { status: 500 }
    );
  }
}
