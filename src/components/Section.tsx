import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  id?: string;
}

export default function Section({ 
  children, 
  className = '', 
  containerClassName = '',
  id 
}: SectionProps) {
  return (
    <section id={id} className={`section-padding ${className}`}>
      <div className={`container-max ${containerClassName}`}>
        {children}
      </div>
    </section>
  );
}

