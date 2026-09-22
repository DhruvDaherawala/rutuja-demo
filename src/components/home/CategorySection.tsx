'use client';

import React from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Container } from '@/components/ui/Container';
import { CategoryCard } from './CategoryCard';
import { Category } from '@/types';

interface CategorySectionProps {
  categories: Category[];
}

export const CategorySection: React.FC<CategorySectionProps> = ({ categories }) => {
  return (
    <section id="categories" className="py-14 sm:py-18 md:py-24 bg-white relative scroll-mt-20">
      <Container>
        <SectionHeading
          title="FLOWER CATEGORIES"
          subtitle="Explore our Flower Categories to find the perfect blooms for any occasion. From vibrant roses to delicate lilies, our selection offers something for every taste and celebration."
          align="center"
        />

        {/* Categories Grid - Mobile optimized 2 columns, tablet 3, desktop 5 */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 md:gap-10 lg:gap-12 justify-items-center max-w-5xl mx-auto mt-8 sm:mt-12">
          {categories.map((category, index) => (
            <div
              key={category.slug || category.name}
              className={index === 4 ? 'col-span-2 sm:col-span-1 flex justify-center' : 'flex justify-center'}
            >
              <CategoryCard
                category={category}
                index={index}
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
