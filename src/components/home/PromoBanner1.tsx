'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';

export const PromoBanner1: React.FC = () => {
  return (
    <section className="relative bg-[#fe909d] overflow-hidden my-12 sm:my-16 md:my-20">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-16 sm:py-20 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 xl:col-span-7 text-white text-left z-20"
          >
            {/* Editorial Mixed Typography matching design guide */}
            <h2 className="leading-[1.15]">
              <span className="font-sans font-bold text-3xl sm:text-4xl md:text-5xl lg:text-[3.8rem] tracking-wider block uppercase">
                BLOSSOM{' '}
                <span className="font-serif italic font-normal text-3xl sm:text-4xl md:text-5xl lg:text-[3.8rem] normal-case">
                  of joy,
                </span>
              </span>
              <span className="font-serif font-normal text-3xl sm:text-4xl md:text-5xl lg:text-[3.8rem] block mt-1">
                delivered{' '}
                <span className="font-serif italic font-normal text-3xl sm:text-4xl md:text-5xl lg:text-[3.8rem]">
                  with
                </span>{' '}
                <span className="font-sans font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-[3.8rem] tracking-wider uppercase">
                  LOVE.
                </span>
              </span>
            </h2>

            {/* Reference description text */}
            <p className="mt-6 text-sm md:text-base text-white/95 max-w-lg font-light leading-relaxed">
              Every petal is an artistic reflection of nature’s grace. Hand-tied in Rutuja’s floral studio, our signature bouquets are designed to carry your deepest emotions to those who matter most.
            </p>

            {/* CTA Button */}
            <div className="mt-8">
              <Button
                variant="white"
                size="md"
                href="/products"
                className="min-w-[120px] font-bold text-xs tracking-[0.25em] shadow-sm text-[#fe909d] hover:bg-[#FFF3F5]"
              >
                EXPLORE
              </Button>
            </div>
          </motion.div>

          {/* Right White Tulips Bouquet */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="lg:col-span-5 xl:col-span-5 relative flex justify-center lg:justify-end"
          >
            <div className="relative w-[280px] sm:w-[360px] md:w-[440px] lg:w-[500px] h-[320px] sm:h-[420px] md:h-[480px] lg:h-[540px] my-4 sm:-my-10 lg:-my-24 sm:-mr-6 lg:-mr-12">
              <Image
                src="/images/promo1-tulips.png"
                alt="White Tulips Arrangement"
                fill
                priority
                className="object-contain object-center lg:object-right"
                sizes="(max-width: 640px) 280px, (max-width: 768px) 360px, 500px"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
