import React from 'react';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: 'center' | 'left' | 'right';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  subtitle,
  align = 'center',
  className = '',
}) => {
  const alignmentClass =
    align === 'center'
      ? 'text-center items-center'
      : align === 'right'
      ? 'text-right items-end'
      : 'text-left items-start';

  return (
    <div className={`flex flex-col mb-10 md:mb-14 ${alignmentClass} ${className}`}>
      <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#B75C68] tracking-wider uppercase font-normal">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-sm md:text-base text-[#8A8080] max-w-2xl font-light leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};
