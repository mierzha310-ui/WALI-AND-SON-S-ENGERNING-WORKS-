import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'info' | 'danger' | 'amber';
  size?: 'sm' | 'md';
  dot?: boolean;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'sm',
  dot = false,
  className = '',
}) => {
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
  }[size];

  const variantClasses = {
    default: 'bg-slate-800/80 text-slate-300 border border-slate-700/60',
    success: 'bg-emerald-950/60 text-emerald-300 border border-emerald-800/50',
    warning: 'bg-amber-950/60 text-amber-300 border border-amber-800/50',
    info: 'bg-sky-950/60 text-sky-300 border border-sky-800/50',
    danger: 'bg-rose-950/60 text-rose-300 border border-rose-800/50',
    amber: 'bg-amber-500/15 text-amber-400 border border-amber-500/30',
  }[variant];

  const dotColors = {
    default: 'bg-slate-400',
    success: 'bg-emerald-400',
    warning: 'bg-amber-400',
    info: 'bg-sky-400',
    danger: 'bg-rose-400',
    amber: 'bg-amber-400',
  }[variant];

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium rounded-md tracking-normal ${sizeClasses} ${variantClasses} ${className}`}
    >
      {dot && <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotColors}`} aria-hidden="true" />}
      <span>{children}</span>
    </span>
  );
};
