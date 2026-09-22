import { NextResponse } from 'next/server';
import { z } from 'zod';
import { connectToDatabase } from '@/lib/mongodb';
import { OrderModel } from '@/models/Order';

const OrderSchema = z.object({
  customer: z.object({
    fullName: z.string().min(2, 'Full name is required'),
    email: z.string().email('Invalid email address'),
    phone: z.string().min(6, 'Valid phone number is required'),
    address: z.string().min(5, 'Delivery address is required'),
    city: z.string().min(2, 'City is required'),
    postalCode: z.string().min(3, 'Postal code is required'),
    notes: z.string().optional(),
  }),
  items: z
    .array(
      z.object({
        productId: z.string(),
        name: z.string(),
        price: z.number().positive(),
        quantity: z.number().int().positive(),
        image: z.string(),
      })
    )
    .min(1, 'Cart cannot be empty'),
  subtotal: z.number().nonnegative(),
  shipping: z.number().nonnegative().default(0),
  total: z.number().positive(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = OrderSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          issues: result.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const orderData = result.data;
    const db = await connectToDatabase();

    if (db) {
      const order = await OrderModel.create({
        ...orderData,
        status: 'pending',
        paymentStatus: 'paid',
      });
      return NextResponse.json(
        {
          success: true,
          message: 'Order placed successfully!',
          orderId: order._id,
        },
        { status: 201 }
      );
    }

    // Mock response when DB is not connected
    const mockOrderId = `ORD-${Date.now().toString(36).toUpperCase()}`;
    return NextResponse.json(
      {
        success: true,
        message: 'Order placed successfully!',
        orderId: mockOrderId,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process order' },
      { status: 500 }
    );
  }
}
