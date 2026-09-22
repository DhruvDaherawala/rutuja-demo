'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[580px] sm:min-h-[660px] md:min-h-[760px] lg:min-h-[820px] flex items-center overflow-hidden bg-[#FFFAF9]">
      {/* 1. Mobile Floral Background (9:16 tailored composition) */}
      <div className="absolute inset-0 md:hidden pointer-events-none select-none z-0">
        <Image
          src="/images/hero-bg-mobile.jpg"
          alt="Aesthetic watercolor floral background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-top"
        />
        {/* Soft bottom vignette to ensure smooth transition to categories section */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-white/70 pointer-events-none" />
      </div>

      {/* 2. Desktop Floral Background (16:9 panoramic watercolor composition) */}
      <div className="absolute inset-0 hidden md:block pointer-events-none select-none z-0">
        <Image
          src="/images/hero-bg-desktop.jpg"
          alt="Aesthetic watercolor floral background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-top"
        />
        {/* Soft bottom vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-white/50 pointer-events-none" />
      </div>

      {/* Main Container */}
      <div className="max-w-[1240px] mx-auto px-5 sm:px-6 lg:px-8 w-full relative z-10 pt-24 pb-16 sm:pt-32 sm:pb-24 md:pt-40 md:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Hero Content */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="lg:col-span-8 xl:col-span-7 flex flex-col justify-center items-start text-left sm:pl-4 lg:pl-8 max-w-xl"
          >
            {/* Demo Work Tag for Rutuja */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-white/85 backdrop-blur-md border border-[#FCE3E7] shadow-[0_2px_8px_rgba(183,92,104,0.08)] mb-5 sm:mb-6"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#B75C68] animate-pulse" />
              <span className="text-[10px] sm:text-xs font-semibold tracking-[0.2em] text-[#B75C68] uppercase">
                Demo Work for Rutuja • Floral Studio
              </span>
            </motion.div>

            {/* Editorial Serif Title */}
            <h1 className="font-serif leading-[0.98] tracking-tight">
              <span className="block text-5xl sm:text-7xl md:text-8xl lg:text-[6.2rem] font-normal text-[#B75C68] drop-shadow-xs">
                Rutuja
              </span>
              <span className="block text-5xl sm:text-7xl md:text-8xl lg:text-[6.2rem] font-normal text-[#7D916D] mt-1 sm:mt-2">
                Florals
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mt-5 sm:mt-7 text-sm sm:text-base md:text-lg text-[#665D5E] font-light leading-relaxed max-w-md bg-white/40 md:bg-transparent backdrop-blur-[2px] md:backdrop-blur-none rounded-lg p-1 -ml-1">
              Made on Earth, designed with you in mind.
              <br />
              Bespoke floral arrangements handcrafted for life’s most meaningful moments.
            </p>

            {/* CTAs */}
            <div className="mt-7 sm:mt-9 flex flex-wrap items-center gap-3 sm:gap-4">
              <Button
                variant="primary"
                size="md"
                href="#about"
                className="min-w-[125px] sm:min-w-[135px] !bg-[#B75C68] hover:!bg-[#9e4a56] shadow-sm tracking-[0.25em] text-xs font-semibold transition-transform duration-200 active:scale-95"
              >
                MORE
              </Button>
              <Button
                variant="outline"
                size="md"
                href="/products"
                className="min-w-[125px] sm:min-w-[135px] !border-[#B75C68] !text-[#B75C68] bg-white/70 hover:bg-white tracking-[0.25em] text-xs font-semibold transition-transform duration-200 active:scale-95"
              >
                SHOP
              </Button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

