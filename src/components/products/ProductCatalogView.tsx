'use client';

import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { Filter, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ProductCard } from '@/components/home/ProductCard';
import { Product, Category } from '@/types';

interface ProductCatalogViewProps {
  initialProducts: Product[];
  categories: Category[];
}

export const ProductCatalogView: React.FC<ProductCatalogViewProps> = ({
  initialProducts,
  categories,
}) => {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const initialSearch = searchParams.get('search') || '';

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [priceFilter, setPriceFilter] = useState<number>(250);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);

  // Filter and sort logic
  const filteredProducts = useMemo(() => {
    let result = [...initialProducts];

    // Category filter
    if (selectedCategory !== 'all') {
      result = result.filter(
        (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Price ceiling filter
    result = result.filter((p) => p.price <= priceFilter);

    // Stock availability
    if (inStockOnly) {
      result = result.filter((p) => p.stock > 0);
    }

    // Sorting
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result.sort(
          (a, b) =>
            new Date(b.createdAt || '').getTime() -
            new Date(a.createdAt || '').getTime()
        );
        break;
      case 'featured':
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    return result;
  }, [
    initialProducts,
    selectedCategory,
    searchQuery,
    priceFilter,
    inStockOnly,
    sortBy,
  ]);

  return (
    <div className="pt-28 pb-16 md:pt-36 md:pb-20 bg-white min-h-[80vh]">
      <Container>
        {/* Page Title */}
        <SectionHeading
          title="OUR FLORAL COLLECTION"
          subtitle="Hand-arranged bouquets, farm-fresh roses, and bespoke floral compositions for life's most heartfelt milestones."
          align="center"
        />

        {/* Top Control Bar for Mobile & Quick Sort */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#FCE3E7] mb-8">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-full border border-[#F3C5CD] text-xs font-semibold uppercase tracking-wider text-[#4A4545] bg-[#FFF3F5]"
            >
              <Filter className="w-3.5 h-3.5 text-[#B75C68]" />
              Filters
            </button>
            <span className="text-xs text-[#8A8080]">
              Showing <strong className="text-[#4A4545]">{filteredProducts.length}</strong> bouquets
            </span>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#8A8080] hidden sm:inline flex items-center gap-1">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#B75C68]" /> Sort by:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-xs uppercase tracking-wider font-medium text-[#4A4545] border border-[#F3C5CD] rounded-full px-4 py-2 bg-[#FFF3F5]/40 focus:outline-none focus:border-[#B75C68] transition-colors"
            >
              <option value="featured">Featured Collection</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="newest">Newest Arrivals</option>
            </select>
          </div>
        </div>

        {/* Layout Grid: Sidebar Filters + Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Desktop & Mobile Filters Sidebar */}
          <aside
            className={`lg:col-span-3 space-y-8 ${
              mobileFilterOpen ? 'block' : 'hidden lg:block'
            } bg-white lg:bg-transparent p-6 lg:p-0 rounded-3xl border border-[#FCE3E7] lg:border-none shadow-sm lg:shadow-none`}
          >
            {/* Category Filter */}
            <div>
              <h3 className="font-serif text-sm font-semibold tracking-wider uppercase text-[#B75C68] mb-3 flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4" /> Categories
              </h3>
              <div className="space-y-1.5">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`block w-full text-left text-xs py-1.5 px-3 rounded-full transition-all ${
                    selectedCategory === 'all'
                      ? 'bg-[#B75C68] text-white font-medium'
                      : 'text-[#4A4545] hover:bg-[#FFF3F5]'
                  }`}
                >
                  All Occasions
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.slug}
                    onClick={() => setSelectedCategory(cat.name)}
                    className={`block w-full text-left text-xs py-1.5 px-3 rounded-full transition-all ${
                      selectedCategory.toLowerCase() === cat.name.toLowerCase()
                        ? 'bg-[#B75C68] text-white font-medium'
                        : 'text-[#4A4545] hover:bg-[#FFF3F5]'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="pt-4 border-t border-[#FCE3E7]/60">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-serif text-sm font-semibold tracking-wider uppercase text-[#B75C68]">
                  Max Price
                </h3>
                <span className="font-semibold text-xs text-[#B75C68]">
                  ${priceFilter}
                </span>
              </div>
              <input
                type="range"
                min="50"
                max="250"
                step="10"
                value={priceFilter}
                onChange={(e) => setPriceFilter(Number(e.target.value))}
                className="w-full accent-[#B75C68] cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-[#8A8080] mt-1">
                <span>$50</span>
                <span>$250</span>
              </div>
            </div>

            {/* Availability Filter */}
            <div className="pt-4 border-t border-[#FCE3E7]/60">
              <label className="flex items-center gap-2 text-xs text-[#4A4545] cursor-pointer">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="rounded accent-[#B75C68] w-4 h-4"
                />
                <span>In Stock & Ready for Delivery</span>
              </label>
            </div>

            {/* Reset Filters */}
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
                setPriceFilter(250);
                setInStockOnly(false);
              }}
              className="text-[11px] uppercase tracking-wider text-[#8A8080] hover:text-[#B75C68] underline"
            >
              Reset all filters
            </button>
          </aside>

          {/* Product Grid Area */}
          <main className="lg:col-span-9">
            {filteredProducts.length === 0 ? (
              <div className="py-16 text-center space-y-4 bg-[#FFF3F5]/30 rounded-3xl p-8 border border-[#FCE3E7]">
                <p className="font-serif text-xl text-[#B75C68]">
                  No floral arrangements found
                </p>
                <p className="text-xs text-[#8A8080] max-w-sm mx-auto">
                  Try clearing your filters or exploring another category to discover our available blooms.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setPriceFilter(250);
                    setSearchQuery('');
                  }}
                  className="text-xs font-semibold uppercase tracking-wider text-[#B75C68] underline"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-y-12 gap-x-8 justify-items-center">
                {filteredProducts.map((product, index) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    index={index}
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      </Container>
    </div>
  );
};
