import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className = '', hover = true }: CardProps) {
  const baseClasses = 'bg-background/50 border border-gray-800 rounded-lg p-6 backdrop-blur-sm';
  const hoverClasses = hover ? 'transition-all duration-200 hover:scale-[1.02] hover:border-accent/50 hover:shadow-lg hover:shadow-accent/10' : '';
  
  return (
    <div className={`${baseClasses} ${hoverClasses} ${className}`}>
      {children}
    </div>
  );
}

