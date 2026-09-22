import React from 'react';
import Link from 'next/link';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'white' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  children: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  href,
  children,
  className = '',
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium tracking-wider uppercase transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#F48A9A]/40 disabled:opacity-50 disabled:cursor-not-allowed';

  const sizeStyles = {
    sm: 'text-xs px-5 py-1.5 h-8',
    md: 'text-xs md:text-sm px-7 py-2.5 h-10',
    lg: 'text-sm md:text-base px-9 py-3.5 h-12',
  };

  const variantStyles = {
    primary:
      'bg-[#B75C68] hover:bg-[#9E4A56] text-white shadow-sm hover:shadow active:scale-[0.98]',
    outline:
      'bg-transparent border border-[#B75C68] text-[#B75C68] hover:bg-[#FFF3F5] active:scale-[0.98]',
    white:
      'bg-white text-[#F58A97] hover:bg-[#FFF3F5] shadow-sm hover:shadow-md active:scale-[0.98]',
    secondary:
      'bg-[#F48A9A] hover:bg-[#e07585] text-white shadow-sm hover:shadow active:scale-[0.98]',
    ghost:
      'bg-transparent text-[#4A4545] hover:text-[#B75C68] hover:bg-[#FFF3F5]/60',
  };

  const combinedClasses = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={combinedClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  );
};
