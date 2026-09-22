import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

// Brand flower emblem in header & footer
export const GardenFlowerEmblem: React.FC<IconProps> = ({
  className = 'w-6 h-6 text-[#B75C68]',
}) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* 8 symmetric delicate floral petals */}
    <path d="M24 16C24 11 20 7 16 11C12 15 17 20 21 22" />
    <path d="M24 16C24 11 28 7 32 11C36 15 31 20 27 22" />
    <path d="M32 24C37 24 41 20 37 16C33 12 28 17 26 21" />
    <path d="M32 24C37 24 41 28 37 32C33 36 28 31 26 27" />
    <path d="M24 32C24 37 28 41 32 37C36 33 31 28 27 26" />
    <path d="M24 32C24 37 20 41 16 37C12 33 17 28 21 26" />
    <path d="M16 24C11 24 7 28 11 32C15 36 20 31 22 27" />
    <path d="M16 24C11 24 7 20 11 16C15 12 20 17 22 21" />
    <circle cx="24" cy="24" r="3.5" fill="none" />
  </svg>
);

// 1. New Baby icon: Baby in floral bonnet / swaddle
export const NewBabyIcon: React.FC<IconProps> = ({
  className = 'w-8 h-8 text-[#B75C68]',
}) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Swaddle envelope */}
    <path d="M16 38L24 43L32 38L34 26L24 20L14 26L16 38Z" />
    {/* Baby face inside bonnet */}
    <circle cx="24" cy="20" r="7.5" />
    {/* Sleeping eyes */}
    <path d="M20 20C20.5 21 21.5 21 22 20" />
    <path d="M26 20C26.5 21 27.5 21 28 20" />
    {/* Cute baby tuft / flower atop bonnet */}
    <path d="M24 12.5C24 10 26 8 27.5 9.5C29 11 27 13 25 13" />
    <path d="M18 28L24 32L30 28" />
  </svg>
);

// 2. Anniversaries icon: Tied bouquet with ribbon
export const AnniversariesIcon: React.FC<IconProps> = ({
  className = 'w-8 h-8 text-[#B75C68]',
}) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Bouquet cone wrapper */}
    <path d="M17 24L24 41L31 24" />
    {/* Flower heads */}
    <circle cx="24" cy="18" r="4.5" />
    <circle cx="17" cy="16" r="3.5" />
    <circle cx="31" cy="16" r="3.5" />
    <circle cx="24" cy="10" r="3.5" />
    {/* Ribbon bow */}
    <path d="M21 34C18 34 16 36 17 38C18 40 21 37 24 35C27 37 30 40 31 38C32 36 30 34 27 34" />
  </svg>
);

// 3. Birthdays icon: Festive balloons & confetti
export const BirthdaysIcon: React.FC<IconProps> = ({
  className = 'w-8 h-8 text-[#B75C68]',
}) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Left balloon */}
    <path d="M18 10C13 10 11 15 11 20C11 26 17 28 17 29L19 29C19 28 25 26 25 20C25 15 23 10 18 10Z" />
    {/* Right balloon */}
    <path d="M29 14C25 14 23 18 23 22C23 27 28 29 28 30L30 30C30 29 35 27 35 22C35 18 33 14 29 14Z" />
    {/* Balloon strings */}
    <path d="M18 29C18 35 22 38 23 41" />
    <path d="M29 30C29 35 25 38 24 41" />
    {/* Little star / highlight */}
    <path d="M15 15C15 17 14 18 14 18" />
  </svg>
);

// 4. Roses icon: Elegant single blooming rose
export const RosesIcon: React.FC<IconProps> = ({
  className = 'w-8 h-8 text-[#B75C68]',
}) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Rose petals swirl */}
    <path d="M24 14C24 11.5 22 10 20 11C18 12 18 15 21 17C24 19 27 16 27 13C27 9 21 7 17 11C13 15 15 22 21 24C27 26 31 21 31 16" />
    {/* Rose calyx / base */}
    <path d="M19 24C21 27 24 28 24 28C24 28 27 27 29 24" />
    {/* Stem */}
    <path d="M24 28V42" />
    {/* Leaves */}
    <path d="M24 33C20 31 16 33 16 35C18 37 22 36 24 35" />
    <path d="M24 37C28 35 32 37 32 39C30 41 26 40 24 39" />
  </svg>
);

// 5. Weddings icon: Two interlocking rings
export const WeddingsIcon: React.FC<IconProps> = ({
  className = 'w-8 h-8 text-[#B75C68]',
}) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Left ring */}
    <ellipse cx="20" cy="25" rx="9" ry="11" />
    {/* Right ring interlocking */}
    <ellipse cx="28" cy="25" rx="9" ry="11" />
    {/* Diamond gem on left ring top */}
    <path d="M18 12L20 9L22 12L20 14L18 12Z" />
  </svg>
);
