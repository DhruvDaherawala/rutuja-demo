'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Truck, Award, Tag } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-14 sm:py-20 md:py-24 bg-white relative scroll-mt-24">
      <Container>
        {/* Main Two-Column Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Left: Artistic Floral Composition */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 flex justify-center items-center order-2 lg:order-1"
          >
            <div className="relative w-[280px] sm:w-[360px] md:w-[440px] h-[340px] sm:h-[440px] md:h-[520px]">
              <Image
                src="/images/about-composition.png"
                alt="Rutuja Florals Flower Arrangement in Vase"
                fill
                priority
                className="object-contain"
                sizes="(max-width: 640px) 280px, (max-width: 768px) 360px, 440px"
              />
            </div>
          </motion.div>

          {/* Right: Brand Story */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 flex flex-col justify-center items-start text-left order-1 lg:order-2"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF3F5] border border-[#FCE3E7] mb-3">
              <span className="text-[10px] font-semibold tracking-widest text-[#B75C68] uppercase">
                Artisanal Studio • Demo Showcase
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#B75C68] tracking-wider uppercase font-normal">
              ABOUT US
            </h2>

            <p className="mt-5 text-sm sm:text-base text-[#665D5E] font-light leading-relaxed">
              Welcome to <strong>Rutuja Florals</strong> — an artisanal boutique atelier dedicated to the poetic language of flowers. Handcrafted with passion, our botanical designs celebrate life’s most cherished celebrations and heartfelt moments.
            </p>
            <p className="mt-3 text-sm sm:text-base text-[#8A8080] font-light leading-relaxed">
              Every stem is consciously sourced from premium growers to ensure vibrant freshness, delicate fragrances, and unforgettable memories for every recipient.
            </p>

            <div className="mt-7">
              <Button
                variant="primary"
                size="md"
                href="/products"
                className="min-w-[130px] !bg-[#B75C68] hover:!bg-[#9e4a56] shadow-sm tracking-[0.25em] text-xs font-semibold"
              >
                EXPLORE
              </Button>
            </div>
          </motion.div>
        </div>

        {/* 3 Service / Value Indicators */}
        <div className="mt-14 sm:mt-18 md:mt-24 pt-8 border-t border-[#FCE3E7]/50">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 md:gap-12 justify-items-center sm:justify-items-start">
            {/* Service 1: Fast Delivery */}
            <div className="flex items-center gap-4 w-full max-w-xs">
              <div className="text-[#B75C68] shrink-0 p-2.5 rounded-full bg-[#FFF3F5]">
                <Truck className="w-8 h-8 stroke-[1.4]" />
              </div>
              <div>
                <h4 className="font-sans text-xs sm:text-sm text-[#B75C68] uppercase tracking-wider font-semibold">
                  FAST DELIVERY
                </h4>
                <p className="text-xs text-[#8A8080] mt-0.5 font-light">
                  Same-day fresh doorstep arrival
                </p>
              </div>
            </div>

            {/* Service 2: Good Quality */}
            <div className="flex items-center gap-4 w-full max-w-xs">
              <div className="text-[#B75C68] shrink-0 p-2.5 rounded-full bg-[#FFF3F5]">
                <Award className="w-8 h-8 stroke-[1.4]" />
              </div>
              <div>
                <h4 className="font-sans text-xs sm:text-sm text-[#B75C68] uppercase tracking-wider font-semibold">
                  GOOD QUALITY
                </h4>
                <p className="text-xs text-[#8A8080] mt-0.5 font-light">
                  100% farm-fresh premium blooms
                </p>
              </div>
            </div>

            {/* Service 3: Good Prices */}
            <div className="flex items-center gap-4 w-full max-w-xs">
              <div className="text-[#B75C68] shrink-0 p-2.5 rounded-full bg-[#FFF3F5]">
                <Tag className="w-8 h-8 stroke-[1.4]" />
              </div>
              <div>
                <h4 className="font-sans text-xs sm:text-sm text-[#B75C68] uppercase tracking-wider font-semibold">
                  GOOD PRICES
                </h4>
                <p className="text-xs text-[#8A8080] mt-0.5 font-light">
                  Bespoke value & honest pricing
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
