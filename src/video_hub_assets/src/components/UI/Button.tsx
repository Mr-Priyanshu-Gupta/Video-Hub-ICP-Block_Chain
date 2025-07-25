import React from 'react';
import {  LucideIcon } from 'lucide-react';

interface ButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  disabled?: boolean;
  loading?: boolean;
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  icon: Icon,
  iconPosition = 'left',
  fullWidth = false,
  className = '',
}) => {
  const baseClasses = `
    relative inline-flex items-center justify-center font-medium rounded-xl
    transition-all duration-300 ease-out transform-gpu
    focus:outline-none focus:ring-4 focus:ring-opacity-50
    disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
    active:scale-95 hover:scale-105
    before:absolute before:inset-0 before:rounded-xl before:transition-all before:duration-300
    overflow-hidden group
  `;

  const variantClasses = {
    primary: `
      bg-gradient-to-r from-orange-500 via-orange-600 to-red-500
      hover:from-orange-400 hover:via-orange-500 hover:to-red-400
      text-white shadow-lg shadow-orange-500/25
      hover:shadow-xl hover:shadow-orange-500/40
      focus:ring-orange-500
      before:bg-gradient-to-r before:from-white/0 before:via-white/10 before:to-white/0
      before:translate-x-[-100%] hover:before:translate-x-[100%]
      border border-orange-400/20 hover:border-orange-300/30
    `,
    secondary: `
      bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800
      hover:from-gray-700 hover:via-gray-600 hover:to-gray-700
      text-white shadow-lg shadow-gray-900/25
      hover:shadow-xl hover:shadow-gray-900/40
      focus:ring-gray-600
      before:bg-gradient-to-r before:from-white/0 before:via-white/5 before:to-white/0
      before:translate-x-[-100%] hover:before:translate-x-[100%]
      border border-gray-600/20 hover:border-gray-500/30
    `,
    ghost: `
      bg-transparent hover:bg-gray-800/50
      text-gray-300 hover:text-white
      shadow-none hover:shadow-lg hover:shadow-gray-900/20
      focus:ring-gray-600
      border border-transparent hover:border-gray-700/50
    `,
    danger: `
      bg-gradient-to-r from-red-600 via-red-500 to-red-600
      hover:from-red-500 hover:via-red-400 hover:to-red-500
      text-white shadow-lg shadow-red-500/25
      hover:shadow-xl hover:shadow-red-500/40
      focus:ring-red-500
      before:bg-gradient-to-r before:from-white/0 before:via-white/10 before:to-white/0
      before:translate-x-[-100%] hover:before:translate-x-[100%]
      border border-red-400/20 hover:border-red-300/30
    `,
    success: `
      bg-gradient-to-r from-green-600 via-green-500 to-green-600
      hover:from-green-500 hover:via-green-400 hover:to-green-500
      text-white shadow-lg shadow-green-500/25
      hover:shadow-xl hover:shadow-green-500/40
      focus:ring-green-500
      before:bg-gradient-to-r before:from-white/0 before:via-white/10 before:to-white/0
      before:translate-x-[-100%] hover:before:translate-x-[100%]
      border border-green-400/20 hover:border-green-300/30
    `,
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs gap-1.5 min-h-[32px]',
    md: 'px-4 py-2 text-sm gap-2 min-h-[40px]',
    lg: 'px-6 py-3 text-base gap-2.5 min-h-[48px]',
    xl: 'px-8 py-4 text-lg gap-3 min-h-[56px]',
  };

  const iconSizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
    xl: 'w-6 h-6',
  };

  const widthClass = fullWidth ? 'w-full' : '';

  const combinedClasses = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${widthClass}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={combinedClasses}
    >
      {/* Loading spinner */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      
      {/* Content */}
      <span className={`flex items-center gap-inherit ${loading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-200`}>
        {Icon && iconPosition === 'left' && (
          <Icon className={`${iconSizeClasses[size]} transition-transform duration-300 group-hover:scale-110`} />
        )}
        {children}
        {Icon && iconPosition === 'right' && (
          <Icon className={`${iconSizeClasses[size]} transition-transform duration-300 group-hover:scale-110`} />
        )}
      </span>
      
      {/* Ripple effect */}
      <span className="absolute inset-0 rounded-xl opacity-0 group-active:opacity-100 bg-white/10 transition-opacity duration-150" />
    </button>
  );
};

export default Button;