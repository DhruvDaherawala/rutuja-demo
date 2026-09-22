'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Star, CheckCircle2, AlertCircle, Quote } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Testimonial } from '@/types';

interface TestimonialSectionProps {
  initialTestimonials: Testimonial[];
}

export const TestimonialSection: React.FC<TestimonialSectionProps> = ({
  initialTestimonials,
}) => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(5);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; text: string } | null>(
    null
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus({ type: 'error', text: 'Please complete all required fields.' });
      return;
    }

    setSubmitting(true);
    setStatus(null);

    try {
      const res = await fetch('/api/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message, rating }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus({
          type: 'success',
          text: 'Thank you! Your testimonial has been received and added.',
        });
        if (data.data) {
          setTestimonials((prev) => [data.data, ...prev]);
        }
        setName('');
        setEmail('');
        setMessage('');
      } else {
        setStatus({
          type: 'error',
          text: data.error || 'Failed to submit testimonial. Please try again.',
        });
      }
    } catch {
      setStatus({
        type: 'error',
        text: 'Network error occurred. Testimonial added to session.',
      });
      // Optimistic local add
      const optimistic: Testimonial = {
        _id: `test-${Date.now()}`,
        name,
        email,
        message,
        rating,
        approved: true,
        createdAt: new Date().toISOString(),
      };
      setTestimonials((prev) => [optimistic, ...prev]);
      setName('');
      setEmail('');
      setMessage('');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="testimonials" className="py-14 sm:py-20 md:py-24 bg-white relative scroll-mt-24">
      <Container>
        {/* Top Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Left: Artistic Floral & Candle Composition */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 flex justify-center items-center order-2 lg:order-1"
          >
            <div className="relative w-[280px] sm:w-[380px] md:w-[460px] h-[320px] sm:h-[440px] md:h-[520px]">
              <Image
                src="/images/testimonial-composition.png"
                alt="Flower Arrangement with Candles"
                fill
                priority
                className="object-contain"
                sizes="(max-width: 640px) 280px, (max-width: 768px) 380px, 460px"
              />
            </div>
          </motion.div>

          {/* Right: Testimonial Submission Form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 flex flex-col justify-center items-start text-left w-full pl-0 lg:pl-6 order-1 lg:order-2"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF3F5] border border-[#FCE3E7] mb-3">
              <span className="text-[10px] font-semibold tracking-widest text-[#B75C68] uppercase">
                Client Love • Feedback
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#B75C68] tracking-wider uppercase font-normal leading-[1.1]">
              LEAVE YOUR
              <br />
              TESTIMONIAL.
            </h2>

            <form onSubmit={handleSubmit} className="mt-8 w-full space-y-4 max-w-md">
              {/* Star Rating Selector */}
              <div className="flex items-center gap-1.5 pb-1">
                <span className="text-xs uppercase tracking-wider text-[#8A8080] mr-2">
                  Rating:
                </span>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="text-[#B75C68] focus:outline-none"
                    aria-label={`Rate ${star} stars`}
                  >
                    <Star
                      className={`w-4 h-4 ${
                        star <= rating
                          ? 'fill-[#B75C68] text-[#B75C68]'
                          : 'text-[#F3C5CD]'
                      }`}
                    />
                  </button>
                ))}
              </div>

              {/* Name Input - Rounded capsule pill with thin rose border */}
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full h-11 px-6 rounded-full border border-[#F3C5CD] bg-[#FFF3F5]/30 text-xs sm:text-sm text-[#4A4545] placeholder-[#8A8080] focus:outline-none focus:border-[#B75C68] focus:bg-white transition-all"
                />
              </div>

              {/* Email Input */}
              <div>
                <input
                  type="email"
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full h-11 px-6 rounded-full border border-[#F3C5CD] bg-[#FFF3F5]/30 text-xs sm:text-sm text-[#4A4545] placeholder-[#8A8080] focus:outline-none focus:border-[#B75C68] focus:bg-white transition-all"
                />
              </div>

              {/* Message Textarea - Rounded capsule corners */}
              <div>
                <textarea
                  rows={4}
                  placeholder="Your Words & Floral Experience..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  className="w-full p-5 rounded-3xl border border-[#F3C5CD] bg-[#FFF3F5]/30 text-xs sm:text-sm text-[#4A4545] placeholder-[#8A8080] focus:outline-none focus:border-[#B75C68] focus:bg-white transition-all resize-none"
                />
              </div>

              {/* Status alerts */}
              {status && (
                <div
                  className={`flex items-center gap-2 text-xs px-4 py-2.5 rounded-full ${
                    status.type === 'success'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-rose-50 text-rose-700 border border-rose-200'
                  }`}
                >
                  {status.type === 'success' ? (
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 shrink-0" />
                  )}
                  <span>{status.text}</span>
                </div>
              )}

              {/* Submit CTA button: READ MORE */}
              <div>
                <Button
                  type="submit"
                  disabled={submitting}
                  variant="primary"
                  size="md"
                  className="min-w-[130px] !bg-[#B75C68] hover:!bg-[#9e4a56] shadow-sm tracking-[0.25em] text-xs font-semibold"
                >
                  {submitting ? 'SUBMITTING...' : 'READ MORE'}
                </Button>
              </div>
            </form>
          </motion.div>
        </div>

        {/* Existing Testimonials Display */}
        {testimonials.length > 0 && (
          <div className="mt-20 pt-12 border-t border-[#FCE3E7]/60">
            <h3 className="font-serif text-xl sm:text-2xl text-[#B75C68] text-center uppercase tracking-wider mb-8 font-normal">
              Words From Our Flower Lovers
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {testimonials.slice(0, 3).map((item) => (
                <div
                  key={item._id}
                  className="p-6 rounded-3xl bg-[#FFF3F5]/50 border border-[#FCE3E7] relative flex flex-col justify-between hover:border-[#F48A9A]/60 transition-colors"
                >
                  <Quote className="w-8 h-8 text-[#F48A9A]/30 absolute top-4 right-4" />
                  <div>
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(item.rating || 5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-[#B75C68] text-[#B75C68]"
                        />
                      ))}
                    </div>
                    <p className="text-sm text-[#4A4545] font-light leading-relaxed italic">
                      &ldquo;{item.message}&rdquo;
                    </p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-[#FCE3E7] flex items-center justify-between">
                    <span className="font-serif text-sm font-medium text-[#B75C68]">
                      {item.name}
                    </span>
                    <span className="text-[11px] text-[#8A8080]">Verified Buyer</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </Container>
    </section>
  );
};
