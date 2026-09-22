import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProductDocument extends Document {
  name: string;
  slug: string;
  category: string;
  description: string;
  details?: string[];
  price: number;
  compareAtPrice?: number;
  images: string[];
  featured: boolean;
  bestseller: boolean;
  stock: number;
  tags: string[];
  rating?: number;
  reviewsCount?: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProductDocument>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true },
    category: { type: String, required: true, index: true },
    description: { type: String, required: true },
    details: [{ type: String }],
    price: { type: Number, required: true, min: 0 },
    compareAtPrice: { type: Number, min: 0 },
    images: [{ type: String, required: true }],
    featured: { type: Boolean, default: false },
    bestseller: { type: Boolean, default: false },
    stock: { type: Number, required: true, default: 10, min: 0 },
    tags: [{ type: String }],
    rating: { type: Number, default: 5.0, min: 1, max: 5 },
    reviewsCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const ProductModel: Model<IProductDocument> =
  mongoose.models.Product || mongoose.model<IProductDocument>('Product', ProductSchema);
