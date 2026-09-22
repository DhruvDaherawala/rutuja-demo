'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';

export const PromoBanner2: React.FC = () => {
  return (
    <section className="relative bg-[#fe909d] overflow-hidden my-12 sm:my-16 md:my-20">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-16 sm:py-20 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left: Kraft paper bag bouquet spilling out */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="lg:col-span-6 xl:col-span-6 flex justify-center lg:justify-start"
          >
            <div className="relative w-[280px] sm:w-[380px] md:w-[460px] lg:w-[540px] h-[300px] sm:h-[400px] md:h-[460px] lg:h-[520px] my-2 sm:-my-10 lg:-my-24 sm:-ml-6 lg:-ml-12">
              <Image
                src="/images/promo2-bag.png"
                alt="Kraft Bag of White Blooms"
                fill
                priority
                className="object-contain object-center lg:object-left"
                sizes="(max-width: 640px) 280px, (max-width: 768px) 380px, 540px"
              />
            </div>
          </motion.div>

          {/* Right: Editorial Typography matching reference */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 xl:col-span-6 text-white text-center lg:text-right z-20"
          >
            <h2 className="leading-[0.98]">
              <span className="font-serif font-normal text-4xl sm:text-5xl md:text-6xl lg:text-7xl block uppercase tracking-wider">
                OFF ON
              </span>
              <span className="font-sans font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.4rem] tracking-wider block uppercase mt-1">
                ALL ITEMS
              </span>
            </h2>

            <p className="mt-4 sm:mt-6 font-serif italic text-xl sm:text-2xl md:text-3xl text-white font-normal">
              Get it now for Sale
            </p>

            <div className="mt-8 flex justify-center lg:justify-end">
              <Button
                variant="white"
                size="lg"
                href="/products"
                className="min-w-[140px] tracking-[0.25em] font-bold text-xs shadow-md text-[#fe909d] hover:bg-[#FFF3F5]"
              >
                GET NOW
              </Button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
