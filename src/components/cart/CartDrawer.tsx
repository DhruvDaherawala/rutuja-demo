'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/Button';

export const CartDrawer: React.FC = () => {
  const { items, isOpen, closeCart, updateQuantity, removeFromCart, subtotal } =
    useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-300"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
          {/* Drawer Header */}
          <div className="p-6 border-b border-[#FCE3E7] flex items-center justify-between bg-[#FFF3F5]/50">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#B75C68]" />
              <h2 className="font-serif text-lg tracking-wider text-[#4A4545] uppercase">
                Your Bouquet Cart
              </h2>
            </div>
            <button
              onClick={closeCart}
              className="p-1 rounded-full text-[#8A8080] hover:text-[#4A4545] hover:bg-white transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-20 h-20 rounded-full bg-[#FFF3F5] flex items-center justify-center text-[#B75C68]">
                  <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
                </div>
                <p className="font-serif text-xl text-[#4A4545]">
                  Your cart is empty
                </p>
                <p className="text-sm text-[#8A8080] max-w-xs">
                  Fill it with radiant seasonal blooms crafted with care and elegance.
                </p>
                <Button variant="primary" size="md" onClick={closeCart} href="/products">
                  Shop Best Sellers
                </Button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.product._id}
                  className="flex gap-4 p-3 rounded-2xl border border-[#FCE3E7] hover:border-[#F48A9A]/60 transition-colors bg-white"
                >
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-[#FFF3F5] shrink-0">
                    <Image
                      src={item.product.images[0] || '/images/products/velvet-plum-symphony.jpg'}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-[#8A8080]">
                          {item.product.category}
                        </span>
                        <h4 className="font-serif text-sm text-[#4A4545] font-medium leading-tight">
                          {item.product.name}
                        </h4>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.product._id)}
                        className="text-[#8A8080] hover:text-[#B75C68] transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-[#F3C5CD] rounded-full px-2 py-0.5 bg-[#FFF3F5]/30">
                        <button
                          onClick={() =>
                            updateQuantity(item.product._id, item.quantity - 1)
                          }
                          className="p-1 text-[#8A8080] hover:text-[#4A4545]"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-semibold text-[#4A4545]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.product._id, item.quantity + 1)
                          }
                          className="p-1 text-[#8A8080] hover:text-[#4A4545]"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="font-semibold text-sm text-[#B75C68]">
                        ${item.product.price * item.quantity}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer */}
          {items.length > 0 && (
            <div className="p-6 border-t border-[#FCE3E7] bg-[#FFF3F5]/40 space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#8A8080]">Subtotal</span>
                <span className="font-serif text-lg text-[#B75C68] font-semibold">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <p className="text-[11px] text-[#8A8080]">
                Taxes and complimentary local delivery calculated at checkout.
              </p>

              <div className="space-y-2 pt-2">
                <Button
                  variant="primary"
                  size="md"
                  href="/cart"
                  onClick={closeCart}
                  className="w-full justify-center gap-2"
                >
                  Go to Checkout <ArrowRight className="w-4 h-4" />
                </Button>
                <button
                  onClick={closeCart}
                  className="w-full text-center text-xs tracking-wider uppercase text-[#8A8080] hover:text-[#4A4545] py-1"
                >
                  Continue Browsing
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
