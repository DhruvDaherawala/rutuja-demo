'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  Truck,
  Sparkles,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, clearCart, subtotal } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');

  // Checkout modal form state
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [placingOrder, setPlacingOrder] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    notes: '',
  });

  const shipping = subtotal > 100 ? 0 : 15;
  const total = Math.max(0, subtotal - discount + shipping);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    setPromoSuccess('');

    const clean = promoCode.trim().toUpperCase();
    if (clean === 'BLOSSOM20' || clean === 'RUTUJA20' || clean === 'GARDEN15') {
      const discountAmount = clean === 'BLOSSOM20' || clean === 'RUTUJA20' ? subtotal * 0.2 : subtotal * 0.15;
      setDiscount(discountAmount);
      setPromoSuccess(`Applied! Saved $${discountAmount.toFixed(2)}`);
    } else {
      setPromoError('Invalid code. Try "RUTUJA20" for 20% off!');
    }
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setPlacingOrder(true);

    try {
      const payload = {
        customer: formData,
        items: items.map((it) => ({
          productId: it.product._id,
          name: it.product.name,
          price: it.product.price,
          quantity: it.quantity,
          image: it.product.images[0] || '/images/products/velvet-plum-symphony.jpg',
        })),
        subtotal,
        shipping,
        total,
      };

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setOrderConfirmed(data.orderId || 'ORD-RUTUJA');
        clearCart();
        // Fire celebration confetti!
        try {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#F48A9A', '#B75C68', '#FCE3E7', '#7D916D'],
          });
        } catch {
          // ignore confetti errors
        }
      }
    } catch {
      // Fallback
      setOrderConfirmed(`ORD-${Date.now().toString(36).toUpperCase()}`);
      clearCart();
    } finally {
      setPlacingOrder(false);
    }
  };

  if (orderConfirmed) {
    return (
      <div className="py-20 bg-white min-h-[70vh] flex items-center">
        <Container>
          <div className="max-w-lg mx-auto text-center bg-[#FFF3F5]/60 p-8 sm:p-12 rounded-3xl border border-[#FCE3E7] shadow-sm">
            <div className="w-16 h-16 rounded-full bg-[#B75C68] text-white flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8" />
            </div>
            <span className="text-xs uppercase tracking-widest text-[#B75C68] font-bold">
              Order Confirmed
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#4A4545] mt-2 mb-4">
              Thank You for Your Bloom Order!
            </h1>
            <p className="text-sm text-[#8A8080] font-light leading-relaxed mb-6">
              Your order reference is <strong className="text-[#B75C68]">{orderConfirmed}</strong>.
              Our artisan florists have begun curating your fresh bouquet. A confirmation
              email with delivery tracking has been sent to your inbox.
            </p>
            <Button variant="primary" size="lg" href="/products" className="!bg-[#B75C68]">
              Continue Exploring Blooms
            </Button>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-16 md:pt-36 md:pb-20 bg-white min-h-[80vh]">
      <Container>
        <SectionHeading
          title="YOUR FLORAL BASKET"
          subtitle="Review your handpicked floral arrangements and prepare for delivery to your recipient or doorstep."
          align="center"
        />

        {items.length === 0 ? (
          <div className="text-center py-16 max-w-md mx-auto space-y-5">
            <div className="w-20 h-20 rounded-full bg-[#FFF3F5] text-[#B75C68] flex items-center justify-center mx-auto">
              <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
            </div>
            <h2 className="font-serif text-2xl text-[#4A4545]">Your cart is empty</h2>
            <p className="text-sm text-[#8A8080] font-light">
              Add bouquets from our best sellers to create an unforgettable floral gesture.
            </p>
            <Button variant="primary" size="md" href="/products" className="!bg-[#B75C68]">
              Discover Bouquets
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Items Table / List */}
            <div className="lg:col-span-8 space-y-6">
              <div className="border border-[#FCE3E7] rounded-3xl p-6 sm:p-8 bg-white shadow-xs">
                <div className="flex items-center justify-between pb-4 border-b border-[#FCE3E7]">
                  <span className="font-serif text-base text-[#4A4545] uppercase tracking-wider">
                    Floral Items ({items.length})
                  </span>
                  <button
                    onClick={clearCart}
                    className="text-xs uppercase tracking-wider text-[#8A8080] hover:text-[#B75C68] transition-colors"
                  >
                    Clear All
                  </button>
                </div>

                <div className="divide-y divide-[#FCE3E7]/60">
                  {items.map((item) => (
                    <div
                      key={item.product._id}
                      className="py-6 flex flex-col sm:flex-row items-center justify-between gap-6"
                    >
                      {/* Thumbnail & Title */}
                      <div className="flex items-center gap-4 w-full sm:w-auto">
                        <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-[#FFF3F5] shrink-0 border border-[#FCE3E7]">
                          <Image
                            src={
                              item.product.images[0] ||
                              '/images/products/velvet-plum-symphony.jpg'
                            }
                            alt={item.product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <span className="text-[10px] uppercase tracking-wider text-[#8A8080]">
                            {item.product.category}
                          </span>
                          <Link
                            href={`/products/${item.product.slug}`}
                            className="block font-serif text-base text-[#4A4545] hover:text-[#B75C68] transition-colors"
                          >
                            {item.product.name}
                          </Link>
                          <span className="text-xs text-[#B75C68] font-medium">
                            ${item.product.price} each
                          </span>
                        </div>
                      </div>

                      {/* Quantity & Total */}
                      <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                        {/* Quantity adjust */}
                        <div className="flex items-center border border-[#F3C5CD] rounded-full px-3 py-1 bg-[#FFF3F5]/40">
                          <button
                            onClick={() =>
                              updateQuantity(item.product._id, item.quantity - 1)
                            }
                            className="p-1 text-[#8A8080] hover:text-[#4A4545]"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-3 text-xs font-semibold text-[#4A4545]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.product._id, item.quantity + 1)
                            }
                            className="p-1 text-[#8A8080] hover:text-[#4A4545]"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Price Subtotal */}
                        <span className="font-serif text-lg text-[#B75C68] font-semibold min-w-[70px] text-right">
                          ${item.product.price * item.quantity}
                        </span>

                        {/* Remove */}
                        <button
                          onClick={() => removeFromCart(item.product._id)}
                          className="text-[#8A8080] hover:text-[#B75C68] p-1.5 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Free delivery notice banner */}
              <div className="p-4 rounded-2xl bg-[#FFF3F5] border border-[#F3C5CD] flex items-center gap-3 text-xs text-[#4A4545]">
                <Truck className="w-5 h-5 text-[#B75C68] shrink-0" />
                <span>
                  {subtotal >= 100 ? (
                    <strong className="text-[#B75C68]">
                      Congratulations! You unlocked FREE luxury courier delivery!
                    </strong>
                  ) : (
                    <>
                      Add <strong>${(100 - subtotal).toFixed(2)}</strong> more of
                      blooms to qualify for complimentary delivery!
                    </>
                  )}
                </span>
              </div>
            </div>

            {/* Right Order Summary */}
            <div className="lg:col-span-4 space-y-6">
              <div className="border border-[#FCE3E7] rounded-3xl p-6 sm:p-8 bg-[#FFF3F5]/30 shadow-xs space-y-6">
                <h3 className="font-serif text-lg text-[#4A4545] uppercase tracking-wider">
                  Order Summary
                </h3>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between text-[#8A8080]">
                    <span>Subtotal</span>
                    <span className="text-[#4A4545] font-medium">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-600 font-medium">
                      <span>Discount</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-[#8A8080]">
                    <span>Delivery</span>
                    <span className="text-[#4A4545] font-medium">
                      {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>

                  <div className="pt-3 border-t border-[#FCE3E7] flex justify-between text-base">
                    <span className="font-serif font-semibold text-[#4A4545]">
                      Total
                    </span>
                    <span className="font-serif text-2xl font-bold text-[#B75C68]">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Promo Code Form */}
                <form onSubmit={handleApplyPromo} className="pt-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Coupon (e.g. BLOSSOM20)"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="w-full text-xs px-4 py-2.5 rounded-full border border-[#F3C5CD] bg-white focus:outline-none focus:border-[#B75C68] uppercase tracking-wider"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2.5 rounded-full bg-[#FFF3F5] border border-[#B75C68] text-[#B75C68] hover:bg-[#B75C68] hover:text-white text-xs font-semibold uppercase tracking-wider transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                  {promoError && (
                    <p className="text-[11px] text-rose-600 mt-1.5">{promoError}</p>
                  )}
                  {promoSuccess && (
                    <p className="text-[11px] text-emerald-600 mt-1.5 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> {promoSuccess}
                    </p>
                  )}
                </form>

                {/* Checkout Trigger Button */}
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => setIsCheckingOut(true)}
                  className="w-full justify-center !bg-[#B75C68] hover:!bg-[#9e4a56] shadow-md tracking-[0.2em] gap-2"
                >
                  CHECKOUT NOW <ArrowRight className="w-4 h-4" />
                </Button>

                <div className="pt-2 flex items-center justify-center gap-2 text-[11px] text-[#8A8080]">
                  <ShieldCheck className="w-4 h-4 text-[#B75C68]" />
                  <span>Secure SSL Checkout & Freshness Guarantee</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Checkout Modal Form */}
        {isCheckingOut && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in">
            <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-[#FCE3E7] max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-4 border-b border-[#FCE3E7]">
                <h3 className="font-serif text-xl text-[#B75C68] uppercase tracking-wider">
                  Complete Your Order
                </h3>
                <button
                  onClick={() => setIsCheckingOut(false)}
                  className="text-xs uppercase tracking-wider text-[#8A8080] hover:text-[#4A4545]"
                >
                  Close
                </button>
              </div>

              <form onSubmit={handlePlaceOrder} className="mt-6 space-y-4 text-left">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#8A8080] mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Recipient or Sender Name"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    className="w-full h-11 px-4 rounded-full border border-[#F3C5CD] text-xs focus:outline-none focus:border-[#B75C68] bg-[#FFF3F5]/30"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#8A8080] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="receipt@example.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full h-11 px-4 rounded-full border border-[#F3C5CD] text-xs focus:outline-none focus:border-[#B75C68] bg-[#FFF3F5]/30"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#8A8080] mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full h-11 px-4 rounded-full border border-[#F3C5CD] text-xs focus:outline-none focus:border-[#B75C68] bg-[#FFF3F5]/30"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#8A8080] mb-1">
                    Delivery Address *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Street, Apartment or Suite"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    className="w-full h-11 px-4 rounded-full border border-[#F3C5CD] text-xs focus:outline-none focus:border-[#B75C68] bg-[#FFF3F5]/30"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#8A8080] mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="City"
                      value={formData.city}
                      onChange={(e) =>
                        setFormData({ ...formData, city: e.target.value })
                      }
                      className="w-full h-11 px-4 rounded-full border border-[#F3C5CD] text-xs focus:outline-none focus:border-[#B75C68] bg-[#FFF3F5]/30"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#8A8080] mb-1">
                      Postal Code *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="ZIP / Postal code"
                      value={formData.postalCode}
                      onChange={(e) =>
                        setFormData({ ...formData, postalCode: e.target.value })
                      }
                      className="w-full h-11 px-4 rounded-full border border-[#F3C5CD] text-xs focus:outline-none focus:border-[#B75C68] bg-[#FFF3F5]/30"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#8A8080] mb-1">
                    Gift Message or Delivery Notes (Optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="E.g., 'Happy Anniversary My Love!' or 'Gate code 1234'"
                    value={formData.notes}
                    onChange={(e) =>
                      setFormData({ ...formData, notes: e.target.value })
                    }
                    className="w-full p-4 rounded-2xl border border-[#F3C5CD] text-xs focus:outline-none focus:border-[#B75C68] bg-[#FFF3F5]/30 resize-none"
                  />
                </div>

                <div className="pt-4 border-t border-[#FCE3E7] flex items-center justify-between">
                  <span className="font-serif text-lg font-bold text-[#B75C68]">
                    Pay Total: ${total.toFixed(2)}
                  </span>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setIsCheckingOut(false)}
                      className="px-5 py-2.5 rounded-full border border-[#8A8080] text-[#8A8080] text-xs uppercase tracking-wider"
                    >
                      Cancel
                    </button>
                    <Button
                      type="submit"
                      disabled={placingOrder}
                      variant="primary"
                      size="md"
                      className="!bg-[#B75C68]"
                    >
                      {placingOrder ? 'Processing...' : 'Place Order'}
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
