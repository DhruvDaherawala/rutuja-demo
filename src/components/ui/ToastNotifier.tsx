'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';
import { CheckCircle2 } from 'lucide-react';

export const ToastNotifier: React.FC = () => {
  const { toastMessage } = useCart();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="bg-[#4A4545] text-white px-5 py-3 rounded-full shadow-xl flex items-center gap-3 border border-white/10 text-xs sm:text-sm font-medium">
        <CheckCircle2 className="w-4 h-4 text-[#F48A9A] shrink-0" />
        <span>{toastMessage}</span>
      </div>
    </div>
  );
};
