'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ProductCard } from './ProductCard';
import { Product } from '@/types';

interface BestSellersProps {
  products: Product[];
}

export const BestSellers: React.FC<BestSellersProps> = ({ products }) => {
  // Display the 6 bestsellers from the reference design
  const displayProducts = products.slice(0, 6);

  return (
    <section className="py-16 md:py-24 bg-white relative">
      <Container>
        <SectionHeading
          title="BEST-SELLERS"
          subtitle="Discover our Best Sellers, featuring the most popular and beloved floral arrangements. These favorites are sure to impress and delight for any occasion."
          align="center"
        />

        {/* 3-Column Desktop Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-12 sm:gap-y-16 gap-x-8 md:gap-x-12 justify-items-center">
          {displayProducts.map((product, index) => (
            <ProductCard key={product._id} product={product} index={index} />
          ))}
        </div>

        {/* "VIEW ALL PRODUCTS >" CTA Link */}
        <div className="mt-14 md:mt-18 text-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 font-serif text-sm md:text-base font-semibold text-[#B75C68] hover:text-[#9E4A56] tracking-[0.18em] uppercase transition-all duration-200 group"
          >
            <span>VIEW ALL PRODUCTS</span>
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </Container>
    </section>
  );
};
