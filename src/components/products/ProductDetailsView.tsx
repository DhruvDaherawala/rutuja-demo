'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Star,
  ShoppingBag,
  Plus,
  Minus,
  Truck,
  ShieldCheck,
  Heart,
  ChevronRight,
} from 'lucide-react';
import NextLink from 'next/link';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { ProductCard } from '@/components/home/ProductCard';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';

interface ProductDetailsViewProps {
  product: Product;
  relatedProducts: Product[];
}

export const ProductDetailsView: React.FC<ProductDetailsViewProps> = ({
  product,
  relatedProducts,
}) => {
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [liked, setLiked] = useState(false);

  return (
    <div className="pt-28 pb-16 md:pt-36 md:pb-20 bg-white">
      <Container>
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs text-[#8A8080] mb-8 uppercase tracking-wider">
          <NextLink href="/" className="hover:text-[#B75C68] transition-colors">
            Home
          </NextLink>
          <ChevronRight className="w-3.5 h-3.5" />
          <NextLink href="/products" className="hover:text-[#B75C68] transition-colors">
            Products
          </NextLink>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#B75C68] font-medium">{product.name}</span>
        </nav>

        {/* Product Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Gallery: Big Image with Blush Circle Backdrop */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <div className="relative w-full aspect-square max-w-[480px] flex items-center justify-center">
              {/* Circular blush aura */}
              <div className="absolute inset-4 rounded-full bg-[#FCE3E7]/70" />

              {/* Main Product Image */}
              <div className="relative z-10 w-4/5 h-4/5">
                <Image
                  src={
                    product.images[selectedImage] ||
                    product.images[0] ||
                    '/images/products/velvet-plum-symphony.jpg'
                  }
                  alt={product.name}
                  fill
                  priority
                  className="object-contain drop-shadow-md transition-all duration-300"
                  sizes="(max-width: 768px) 380px, 480px"
                />
              </div>
            </div>

            {/* Thumbnail Selectors */}
            {product.images.length > 1 && (
              <div className="flex items-center gap-3 mt-6">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative w-16 h-16 rounded-2xl overflow-hidden border-2 transition-all ${
                      selectedImage === idx
                        ? 'border-[#B75C68] shadow-sm scale-105'
                        : 'border-[#FCE3E7] hover:border-[#F48A9A]'
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} angle ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Purchase Details */}
          <div className="lg:col-span-6 flex flex-col justify-start text-left">
            {/* Category Tag */}
            <span className="text-xs uppercase tracking-widest text-[#8A8080] font-medium">
              {product.category} Occasion
            </span>

            {/* Title */}
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#B75C68] font-normal mt-2 tracking-tight">
              {product.name}
            </h1>

            {/* Ratings & Reviews */}
            <div className="flex items-center gap-2 mt-3">
              <div className="flex items-center text-[#B75C68]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#B75C68]" />
                ))}
              </div>
              <span className="text-xs text-[#8A8080]">
                {product.rating || 4.9} ({product.reviewsCount || 34} reviews)
              </span>
            </div>

            {/* Price Row */}
            <div className="mt-6 flex items-baseline gap-3">
              <span className="font-serif text-3xl sm:text-4xl font-semibold text-[#B75C68]">
                ${product.price}
              </span>
              {product.compareAtPrice && product.compareAtPrice > product.price && (
                <span className="text-lg text-[#8A8080] line-through font-light">
                  ${product.compareAtPrice}
                </span>
              )}
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                In Stock ({product.stock} available)
              </span>
            </div>

            {/* Editorial Description */}
            <p className="mt-6 text-sm sm:text-base text-[#8A8080] font-light leading-relaxed border-t border-b border-[#FCE3E7] py-6">
              {product.description}
            </p>

            {/* Botanical Details */}
            {product.details && product.details.length > 0 && (
              <div className="mt-6">
                <h4 className="font-serif text-sm uppercase tracking-wider text-[#4A4545] font-semibold mb-3">
                  Arrangement Details:
                </h4>
                <ul className="space-y-1.5 text-xs sm:text-sm text-[#8A8080]">
                  {product.details.map((detail, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#B75C68]" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Quantity Selector & Add to Cart */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              {/* Quantity */}
              <div className="flex items-center border border-[#F3C5CD] rounded-full px-3 py-2 bg-[#FFF3F5]/30">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-1 text-[#8A8080] hover:text-[#4A4545] transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 text-sm font-semibold text-[#4A4545]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-1 text-[#8A8080] hover:text-[#4A4545] transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Add to Cart Button */}
              <Button
                variant="primary"
                size="lg"
                onClick={() => addToCart(product, quantity)}
                className="flex-1 min-w-[200px] !bg-[#B75C68] hover:!bg-[#9e4a56] shadow-md tracking-[0.2em] gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                ADD TO CART
              </Button>

              {/* Wishlist Heart */}
              <button
                onClick={() => setLiked(!liked)}
                className={`w-12 h-12 rounded-full border border-[#F3C5CD] flex items-center justify-center transition-colors ${
                  liked ? 'bg-[#FFF3F5] text-[#B75C68]' : 'text-[#8A8080] hover:text-[#B75C68]'
                }`}
                aria-label="Save to wishlist"
              >
                <Heart className={`w-5 h-5 ${liked ? 'fill-[#B75C68]' : ''}`} />
              </button>
            </div>

            {/* Service badges */}
            <div className="mt-8 pt-6 border-t border-[#FCE3E7] grid grid-cols-2 gap-4 text-xs text-[#8A8080]">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#B75C68]" />
                <span>Next-day or chosen delivery date</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#B75C68]" />
                <span>7-day bloom freshness guarantee</span>
              </div>
            </div>
          </div>

        </div>

        {/* Related Bouquets */}
        {relatedProducts.length > 0 && (
          <div className="mt-24 pt-16 border-t border-[#FCE3E7]">
            <h3 className="font-serif text-2xl sm:text-3xl text-[#B75C68] text-center uppercase tracking-wider mb-12 font-normal">
              You May Also Adore
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
              {relatedProducts.slice(0, 3).map((item, idx) => (
                <ProductCard key={item._id} product={item} index={idx} />
              ))}
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};
