import { Hero } from '@/components/home/Hero';
import { CategorySection } from '@/components/home/CategorySection';
import { BestSellers } from '@/components/home/BestSellers';
import { PromoBanner1 } from '@/components/home/PromoBanner1';
import { AboutSection } from '@/components/home/AboutSection';
import { PromoBanner2 } from '@/components/home/PromoBanner2';
import { TestimonialSection } from '@/components/home/TestimonialSection';
import { INITIAL_CATEGORIES, INITIAL_PRODUCTS, INITIAL_TESTIMONIALS } from '@/lib/seedData';

export const revalidate = 60; // ISR revalidation

export default function HomePage() {
  return (
    <div className="w-full">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Flower Categories */}
      <CategorySection categories={INITIAL_CATEGORIES} />

      {/* 3. Best Sellers */}
      <BestSellers products={INITIAL_PRODUCTS} />

      {/* 4. Large Promotional Banner 1 */}
      <PromoBanner1 />

      {/* 5. About Us Section */}
      <AboutSection />

      {/* 6. Second Promotional Banner */}
      <PromoBanner2 />

      {/* 7. Testimonial Section */}
      <TestimonialSection initialTestimonials={INITIAL_TESTIMONIALS} />
    </div>
  );
}
