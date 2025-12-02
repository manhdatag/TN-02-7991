import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "px-6 py-3 rounded-xl font-semibold transition-all duration-200 transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variants = {
    primary: "bg-teal-600 hover:bg-teal-700 text-white shadow-lg shadow-teal-600/30 focus:ring-teal-500 border border-transparent",
    secondary: "bg-white hover:bg-teal-50 text-teal-700 shadow-md border border-teal-100 focus:ring-teal-500",
    outline: "bg-transparent border-2 border-teal-600 text-teal-700 hover:bg-teal-50 focus:ring-teal-500",
    ghost: "bg-transparent text-teal-600 hover:bg-teal-50/50 hover:text-teal-800",
  };

  const widthStyle = fullWidth ? "w-full" : "";

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${widthStyle} ${className} disabled:opacity-50 disabled:cursor-not-allowed`}
      {...props}
    >
      {children}
    </button>
  );
};