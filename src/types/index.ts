export interface Product {
  _id: string;
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
  createdAt?: string;
  updatedAt?: string;
}

export interface Category {
  _id?: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  image?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Testimonial {
  _id?: string;
  name: string;
  email: string;
  message: string;
  rating: number;
  approved: boolean;
  createdAt: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface OrderCustomer {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  notes?: string;
}

export interface Order {
  _id?: string;
  customer: OrderCustomer;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  status: 'pending' | 'confirmed' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'paid';
  createdAt?: string;
}
