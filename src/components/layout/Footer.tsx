import React from 'react';
import Link from 'next/link';
import { GardenFlowerEmblem } from '@/components/ui/FloralIcons';

export const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-white border-t border-[#FCE3E7] pt-16 pb-12">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Centered Brand Emblem */}
        <div className="flex flex-col items-center justify-center mb-12 sm:mb-16">
          <div className="flex items-center gap-3 group">
            <span className="font-serif text-sm sm:text-base tracking-[0.25em] text-[#4A4545] font-medium uppercase">
              Rutuja
            </span>
            <GardenFlowerEmblem className="w-7 h-7 text-[#B75C68] transition-transform duration-500 group-hover:rotate-45" />
            <span className="font-serif text-sm sm:text-base tracking-[0.25em] text-[#B75C68] font-normal uppercase">
              Florals
            </span>
          </div>
          <p className="mt-2 text-xs tracking-wider uppercase text-[#8A8080]">
            Artisanal Floral Studio • Demo Work for Rutuja
          </p>
        </div>

        {/* 4 Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 pb-12 border-b border-[#FCE3E7]/60">
          {/* Column 1: ABOUT */}
          <div>
            <h4 className="font-serif text-sm font-semibold tracking-[0.2em] text-[#B75C68] uppercase mb-4">
              ABOUT
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#8A8080]">
              <li>
                <Link href="/#about" className="hover:text-[#B75C68] transition-colors">
                  About us
                </Link>
              </li>
              <li>
                <Link href="/#about" className="hover:text-[#B75C68] transition-colors">
                  Our story
                </Link>
              </li>
              <li>
                <Link href="/#about" className="hover:text-[#B75C68] transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[#B75C68] transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: PRODUCTS */}
          <div>
            <h4 className="font-serif text-sm font-semibold tracking-[0.2em] text-[#B75C68] uppercase mb-4">
              PRODUCTS
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#8A8080]">
              <li>
                <Link
                  href="/products?category=Roses"
                  className="hover:text-[#B75C68] transition-colors"
                >
                  Roses
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="hover:text-[#B75C68] transition-colors"
                >
                  Bouquets
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=Wedding"
                  className="hover:text-[#B75C68] transition-colors"
                >
                  Wedding
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=Birthday"
                  className="hover:text-[#B75C68] transition-colors"
                >
                  Birthday
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: QUESTIONS */}
          <div id="faq">
            <h4 className="font-serif text-sm font-semibold tracking-[0.2em] text-[#B75C68] uppercase mb-4">
              QUESTIONS
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#8A8080]">
              <li>
                <Link href="/faq" className="hover:text-[#B75C68] transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-[#B75C68] transition-colors">
                  Shipping & Delivery
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-[#B75C68] transition-colors">
                  Returns & Care
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#B75C68] transition-colors">
                  Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: CONTACT */}
          <div>
            <h4 className="font-serif text-sm font-semibold tracking-[0.2em] text-[#B75C68] uppercase mb-4">
              CONTACT
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#8A8080]">
              <li className="text-[#4A4545] font-medium">hello@rutujaflorals.com</li>
              <li>+1 (800) 555-BLOOM</li>
              <li>72 Magnolia Boulevard, Suite 4B</li>
              <li className="pt-1 flex items-center gap-3">
                <span className="hover:text-[#B75C68] cursor-pointer">Instagram</span>
                <span>•</span>
                <span className="hover:text-[#B75C68] cursor-pointer">Pinterest</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Sub-bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#8A8080] gap-4 text-center sm:text-left">
          <p>© {new Date().getFullYear()} Rutuja Florals — Demo Work for Rutuja. All rights reserved.</p>
          <p className="italic font-serif text-[#B75C68]">Made on Earth, designed with you in mind.</p>
        </div>
      </div>
    </footer>
  );
};
