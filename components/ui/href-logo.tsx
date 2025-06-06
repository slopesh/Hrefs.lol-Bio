import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface LogoProps {
  variant?: 'default' | 'footer' | 'minimal';
  className?: string;
  showText?: boolean;
  brandName?: string;
  brandUrl?: string;
}

const Logo = ({
  variant = 'default',
  className,
  showText = true,
  brandName = 'href.lol',
  brandUrl = '/',
}: LogoProps) => {
  const logoClasses = cn(
    'flex items-center gap-2 transition-opacity hover:opacity-80',
    {
      'h-12': variant === 'default',
      'h-8': variant === 'footer',
      'h-6': variant === 'minimal',
    },
    className
  );

  const iconClasses = cn('text-white', {
    'w-12 h-12': variant === 'default',
    'w-8 h-8': variant === 'footer',
    'w-6 h-6': variant === 'minimal',
  });

  const textClasses = cn('font-poppins font-semibold text-white', {
    'text-2xl': variant === 'default',
    'text-lg': variant === 'footer',
    'text-base': variant === 'minimal',
  });

  return (
    <Link href={brandUrl} className={logoClasses}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={iconClasses}
      >
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.7" />
      </svg>
      {showText && <span className={textClasses}>{brandName}</span>}
    </Link>
  );
};

export default Logo; 