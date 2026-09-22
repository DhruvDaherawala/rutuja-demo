import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ITestimonialDocument extends Document {
  name: string;
  email: string;
  message: string;
  rating: number;
  approved: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TestimonialSchema = new Schema<ITestimonialDocument>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    message: { type: String, required: true, trim: true },
    rating: { type: Number, required: true, default: 5, min: 1, max: 5 },
    approved: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const TestimonialModel: Model<ITestimonialDocument> =
  mongoose.models.Testimonial || mongoose.model<ITestimonialDocument>('Testimonial', TestimonialSchema);
