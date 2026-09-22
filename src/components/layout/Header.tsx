'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag, Search, Menu, X, Heart, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GardenFlowerEmblem } from '@/components/ui/FloralIcons';
import { useCart } from '@/context/CartContext';

export const Header: React.FC = () => {
  const pathname = usePathname();
  const { totalItems, openCart } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeHash, setActiveHash] = useState('');

  // Handle scroll and glassmorphism intensity
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sync active section based on scroll and hash
  useEffect(() => {
    const updateHash = () => {
      setActiveHash(window.location.hash || '');
    };
    updateHash();
    window.addEventListener('hashchange', updateHash);

    if (pathname !== '/') return () => window.removeEventListener('hashchange', updateHash);

    const sections = ['about', 'testimonials', 'faq', 'contact'];
    const observers: IntersectionObserver[] = [];

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveHash(`#${entry.target.id}`);
        }
      });
    };

    const handleScrollPos = () => {
      if (window.scrollY < 200) {
        setActiveHash('');
      }
    };
    window.addEventListener('scroll', handleScrollPos);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        const obs = new IntersectionObserver(observerCallback, {
          rootMargin: '-15% 0px -65% 0px',
        });
        obs.observe(el);
        observers.push(obs);
      }
    });

    return () => {
      window.removeEventListener('hashchange', updateHash);
      window.removeEventListener('scroll', handleScrollPos);
      observers.forEach((obs) => obs.disconnect());
    };
  }, [pathname]);

  const navLinks = [
    { label: 'Home', href: '/', id: '' },
    { label: 'About', href: '/#about', id: '#about' },
    { label: 'Products', href: '/products', id: 'products' },
    { label: 'Reviews', href: '/#testimonials', id: '#testimonials' },
    { label: 'FAQ', href: '/#faq', id: '#faq' },
  ];

  const isLinkActive = (link: { href: string; id: string }) => {
    if (link.id === 'products') {
      return pathname.startsWith('/products');
    }
    if (pathname === '/') {
      return activeHash === link.id;
    }
    return false;
  };

  return (
    <>
      {/* Floating Pill Capsule Header Container */}
      <header className="fixed top-3 sm:top-5 inset-x-0 z-50 flex flex-col items-center pointer-events-none px-3 sm:px-4">
        {/* Main Glass Pill Navbar */}
        <div
          className={`pointer-events-auto flex items-center justify-between gap-2 sm:gap-4 md:gap-6 px-3 sm:px-5 py-2 rounded-full border transition-all duration-300 w-full max-w-[1120px] ${
            scrolled
              ? 'bg-white/90 backdrop-blur-2xl border-[#FCE3E7] shadow-[0_12px_36px_rgba(183,92,104,0.15)]'
              : 'bg-white/80 backdrop-blur-xl border-white/90 shadow-[0_8px_30px_rgba(183,92,104,0.10)]'
          }`}
        >
          {/* 1. Left Brand Mark */}
          <Link
            href="/"
            className="flex items-center gap-2 group pl-1 transition-transform duration-300 hover:opacity-95 shrink-0"
          >
            <GardenFlowerEmblem className="w-5 h-5 sm:w-6 sm:h-6 text-[#B75C68] transition-transform duration-500 group-hover:rotate-45 shrink-0" />
            <div className="flex items-center gap-1.5">
              <span className="font-serif text-sm sm:text-base font-medium tracking-[0.16em] text-[#4A4545] uppercase">
                Rutuja
              </span>
              <span className="font-serif text-sm sm:text-base font-light tracking-[0.16em] text-[#B75C68] uppercase hidden sm:inline">
                Florals
              </span>
            </div>
            <span className="hidden xl:inline-block text-[9px] tracking-widest text-[#B75C68] bg-[#FFF0F2] border border-[#FCE3E7] px-2 py-0.5 rounded-full uppercase font-medium">
              Demo
            </span>
          </Link>

          {/* 2. Center Pill Track Navigation (Exact match to reference design) */}
          <nav className="hidden md:flex items-center p-1 rounded-full bg-[#F6EDEF]/70 backdrop-blur-md border border-[#F3C5CD]/50">
            {navLinks.map((link) => {
              const active = isLinkActive(link);
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`relative px-3.5 lg:px-4 py-1.5 rounded-full text-xs tracking-wider transition-all duration-200 select-none ${
                    active
                      ? 'bg-white text-[#B75C68] shadow-[0_2px_8px_rgba(183,92,104,0.15)] font-semibold'
                      : 'text-[#615758] hover:text-[#B75C68] hover:bg-white/40 font-medium'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* 3. Right Action Icons & Pill Contact Button */}
          <div className="flex items-center space-x-1.5 sm:space-x-3 text-[#5A5152]">
            {/* Search Trigger */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="w-8 h-8 rounded-full flex items-center justify-center hover:text-[#B75C68] hover:bg-[#FFF3F5] transition-colors focus:outline-none"
              aria-label="Search bouquets"
            >
              <Search className="w-4 h-4 stroke-[1.8]" />
            </button>

            {/* Wishlist Link */}
            <Link
              href="/products?filter=bestseller"
              className="hidden lg:flex w-8 h-8 rounded-full items-center justify-center hover:text-[#B75C68] hover:bg-[#FFF3F5] transition-colors"
              aria-label="Favorites"
            >
              <Heart className="w-4 h-4 stroke-[1.8]" />
            </Link>

            {/* Cart Trigger */}
            <button
              onClick={openCart}
              className="relative w-8 h-8 rounded-full flex items-center justify-center hover:text-[#B75C68] hover:bg-[#FFF3F5] transition-colors focus:outline-none"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4 stroke-[1.8]" />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#B75C68] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse shadow-xs">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Solid Pill CTA Button (Matching reference design Contact button) */}
            <Link
              href="/#contact"
              className="hidden sm:inline-flex items-center justify-center px-4 sm:px-5 py-2 rounded-full bg-[#B75C68] hover:bg-[#9E4A56] text-white text-xs font-semibold tracking-wider transition-all duration-200 shadow-[0_2px_10px_rgba(183,92,104,0.25)] active:scale-95"
            >
              Contact
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden w-8 h-8 rounded-full flex items-center justify-center hover:text-[#B75C68] hover:bg-[#FFF3F5] transition-colors focus:outline-none"
              aria-label="Open mobile menu"
            >
              <Menu className="w-5 h-5 stroke-[1.8]" />
            </button>
          </div>
        </div>

        {/* Expandable Frosted Glass Search Pill Bar */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="mt-2.5 w-full max-w-xl pointer-events-auto rounded-full bg-white/95 backdrop-blur-2xl border border-[#FCE3E7] shadow-[0_12px_36px_rgba(183,92,104,0.16)] px-4 py-2 flex items-center gap-2"
            >
              <Search className="w-4 h-4 text-[#B75C68] shrink-0 ml-1" />
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (searchQuery.trim()) {
                    window.location.href = `/products?search=${encodeURIComponent(
                      searchQuery.trim()
                    )}`;
                  }
                }}
                className="flex-1 flex items-center gap-2"
              >
                <input
                  type="text"
                  placeholder="Search roses, bouquets, wedding arrangements..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full text-xs sm:text-sm bg-transparent text-[#4A4545] placeholder-[#9E9495] focus:outline-none"
                />
                <button
                  type="submit"
                  className="text-xs uppercase tracking-wider font-semibold text-[#B75C68] px-3 py-1 rounded-full bg-[#FFF0F2] hover:bg-[#FCE3E7] transition-colors"
                >
                  Search
                </button>
              </form>
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="text-[#9E9495] hover:text-[#4A4545] p-1 rounded-full"
                aria-label="Close search"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Modern Frosted Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 flex md:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Drawer Content */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 240 }}
              className="relative ml-auto w-4/5 max-w-xs bg-white/95 backdrop-blur-2xl h-full shadow-2xl p-6 flex flex-col justify-between z-10 border-l border-[#FCE3E7]"
            >
              <div>
                {/* Drawer Header */}
                <div className="flex items-center justify-between pb-6 border-b border-[#FCE3E7]">
                  <div className="flex items-center gap-2">
                    <GardenFlowerEmblem className="w-5 h-5 text-[#B75C68]" />
                    <div className="flex flex-col">
                      <span className="font-serif text-sm tracking-widest text-[#4A4545] uppercase font-semibold">
                        Rutuja Florals
                      </span>
                      <span className="text-[9px] tracking-wider text-[#B75C68] uppercase font-semibold">
                        Demo Work for Rutuja
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1 rounded-full text-[#8A8080] hover:text-[#4A4545]"
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Mobile Pill Nav Items */}
                <div className="flex flex-col space-y-2.5 mt-8">
                  {navLinks.map((link) => {
                    const active = isLinkActive(link);
                    return (
                      <Link
                        key={link.label}
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`text-xs font-medium tracking-[0.16em] uppercase px-4 py-2.5 rounded-full transition-all flex items-center justify-between ${
                          active
                            ? 'bg-[#B75C68] text-white font-semibold shadow-xs'
                            : 'text-[#4A4545] hover:bg-[#FFF3F5] hover:text-[#B75C68]'
                        }`}
                      >
                        <span>{link.label}</span>
                        {active && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </Link>
                    );
                  })}

                  {/* Mobile Contact Pill Button */}
                  <Link
                    href="/#contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className="mt-4 text-xs font-semibold tracking-[0.16em] uppercase px-4 py-2.5 rounded-full bg-[#B75C68] text-white text-center shadow-sm hover:bg-[#9e4a56] transition-colors"
                  >
                    Contact Boutique
                  </Link>
                </div>
              </div>

              {/* Drawer Footer */}
              <div className="pt-6 border-t border-[#FCE3E7] text-xs text-[#8A8080]">
                <p>Fresh floral arrangements delivered with love.</p>
                <p className="mt-2 text-[11px] font-medium text-[#B75C68]">
                  Demo Portfolio for Rutuja • © 2026
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

