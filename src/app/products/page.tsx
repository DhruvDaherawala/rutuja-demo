import { Suspense } from 'react';
import { ProductCatalogView } from '@/components/products/ProductCatalogView';
import { INITIAL_PRODUCTS, INITIAL_CATEGORIES } from '@/lib/seedData';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'All Products — Rutuja Florals Studio',
  description:
    'Explore our artisanal flower catalog. Filter by occasion, flowers, and price to find the perfect luxury arrangement.',
};

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="py-24 text-center">
          <div className="w-10 h-10 border-2 border-[#B75C68] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="font-serif text-[#B75C68]">Loading fresh artisanal blooms...</p>
        </div>
      }
    >
      <ProductCatalogView
        initialProducts={INITIAL_PRODUCTS}
        categories={INITIAL_CATEGORIES}
      />
    </Suspense>
  );
}
