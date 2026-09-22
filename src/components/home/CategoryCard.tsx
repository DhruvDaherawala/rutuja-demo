'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Category } from '@/types';

interface CategoryCardProps {
  category: Category;
  index: number;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <Link
        href={`/products?category=${encodeURIComponent(category.name)}`}
        className="group flex flex-col items-center text-center focus:outline-none"
      >
        {/* Category Circle from Reference Design */}
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 transition-transform duration-300 group-hover:scale-105 group-hover:drop-shadow-md">
          <Image
            src={category.image || `/images/categories/${category.slug}.png`}
            alt={category.name}
            fill
            className="object-contain"
            sizes="(max-width: 640px) 96px, 128px"
          />
        </div>

        {/* Category Label Underneath */}
        <span className="mt-4 font-sans text-sm sm:text-base text-[#4A4545] font-normal tracking-wide group-hover:text-[#B75C68] transition-colors duration-200">
          {category.name}
        </span>
      </Link>
    </motion.div>
  );
};
