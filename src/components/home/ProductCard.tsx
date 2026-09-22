'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ShoppingBag, Eye } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, index = 0 }) => {
  const { addToCart } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
      className="group flex flex-col items-center text-center relative w-full max-w-[340px]"
    >
      {/* Product Image Container */}
      <div className="relative w-full aspect-square max-w-[280px] sm:max-w-[320px] flex items-center justify-center">
        <Link
          href={`/products/${product.slug}`}
          className="relative w-full h-full flex items-center justify-center"
        >
          <div className="relative w-full h-full transition-transform duration-500 group-hover:scale-105 group-hover:-translate-y-1">
            <Image
              src={product.images[0] || '/images/products/velvet-plum-symphony.jpg'}
              alt={product.name}
              fill
              className="object-contain"
              sizes="(max-width: 640px) 260px, (max-width: 1024px) 300px, 320px"
            />
          </div>
        </Link>

        {/* Quick-Action floating buttons (always visible on touch/mobile, hover on desktop) */}
        <div className="absolute bottom-3 sm:bottom-4 z-20 flex items-center gap-2 sm:opacity-0 group-hover:opacity-100 transition-all duration-300 sm:translate-y-2 group-hover:translate-y-0">
          <button
            onClick={(e) => {
              e.preventDefault();
              addToCart(product, 1);
            }}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#B75C68] hover:bg-[#9E4A56] text-white flex items-center justify-center shadow-md transition-transform hover:scale-110 active:scale-90"
            title="Add to cart"
            aria-label="Add to cart"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
          <Link
            href={`/products/${product.slug}`}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white hover:bg-[#FFF3F5] text-[#4A4545] border border-[#F3C5CD] flex items-center justify-center shadow-md transition-transform hover:scale-110 active:scale-90"
            title="View details"
            aria-label="View product details"
          >
            <Eye className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Category Label */}
      <span className="mt-2 text-xs sm:text-sm text-[#4A4545] font-normal">
        {product.category}
      </span>

      {/* Product Name in Editorial Serif */}
      <Link
        href={`/products/${product.slug}`}
        className="group-hover:text-[#B75C68] transition-colors"
      >
        <h3 className="font-serif text-xl sm:text-2xl text-[#B75C68] font-normal mt-0.5 tracking-tight">
          {product.name}
        </h3>
      </Link>

      {/* Pricing */}
      <div className="mt-1 flex items-baseline gap-2">
        <span className="font-sans text-lg sm:text-xl font-bold text-[#4A4545]">
          ${product.price}
        </span>
        {product.compareAtPrice && product.compareAtPrice > product.price && (
          <span className="text-sm text-[#8A8080] line-through font-light">
            ${product.compareAtPrice}
          </span>
        )}
      </div>
    </motion.div>
  );
};
