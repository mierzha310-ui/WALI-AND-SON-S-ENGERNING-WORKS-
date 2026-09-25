import React from 'react';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost' | 'whatsapp';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  disabled,
  className = '',
  ...props
}) => {
  const baseClasses =
    'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 active:scale-[0.98]';

  const sizeClasses = {
    sm: 'text-xs px-3 py-1.5 gap-1.5 min-h-[36px]',
    md: 'text-sm px-4 py-2 gap-2 min-h-[42px]',
    lg: 'text-base px-6 py-3 gap-2.5 min-h-[48px]',
  }[size];

  const variantClasses = {
    primary:
      'bg-amber-500 text-slate-950 hover:bg-amber-400 active:bg-amber-500 shadow-md shadow-amber-500/10 border border-amber-400/30',
    secondary:
      'bg-slate-800 text-slate-100 hover:bg-slate-700 active:bg-slate-800 border border-slate-700/80',
    outline:
      'border border-slate-700 text-slate-200 hover:bg-slate-800/80 hover:border-amber-500/60 active:bg-slate-800',
    danger:
      'bg-rose-600 text-white hover:bg-rose-500 active:bg-rose-700 border border-rose-500/30',
    ghost:
      'text-slate-300 hover:bg-slate-800 hover:text-white active:bg-slate-800/60',
    whatsapp:
      'bg-emerald-600 text-white hover:bg-emerald-500 active:bg-emerald-700 border border-emerald-500/40 shadow-lg shadow-emerald-950/20',
  }[variant];

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${baseClasses} ${sizeClasses} ${variantClasses} ${widthClass} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin shrink-0" />
      ) : (
        leftIcon && <span className="shrink-0">{leftIcon}</span>
      )}
      <span>{children}</span>
      {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
    </button>
  );
};
