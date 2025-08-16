import React from 'react';

type ButtonProps = {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  isLoading?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ children, variant = 'primary', isLoading = false, ...props }: ButtonProps): React.ReactNode => {
  const baseClasses = 'px-6 py-3 font-semibold rounded-lg focus:outline-none transition-all duration-300 ease-in-out transform inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 active:scale-95';

  const variantClasses = {
    primary: 'text-black bg-primary hover:bg-primary-hover focus:ring-4 focus:ring-primary/40 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30',
    secondary: 'text-slate-300 bg-surface/50 border border-border hover:bg-surface hover:border-slate-600 focus:ring-2 focus:ring-primary/50 hover:text-white',
  };

  const loadingSpinner = (
    <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  );

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading && loadingSpinner}
      {children}
    </button>
  );
};

export default Button;