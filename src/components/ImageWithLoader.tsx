"use client";

import React, { useState } from 'react';

interface ImageWithLoaderProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  containerClassName?: string;
}

export default function ImageWithLoader({
  src,
  alt,
  className = '',
  containerClassName = '',
  onLoad,
  onError,
  ...rest
}: ImageWithLoaderProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setIsLoaded(true);
    onLoad?.(e);
  };

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setHasError(true);
    onError?.(e);
  };

  return (
    <div className={`relative ${containerClassName}`}>
      {!isLoaded && !hasError && (
        <div className={`absolute inset-0 animate-pulse bg-gray-800/50`} />
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt || ''}
        className={`${className} ${!isLoaded ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        onLoad={handleLoad}
        onError={handleError}
        {...rest}
      />
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50 text-muted text-sm">
          Failed to load image
        </div>
      )}
    </div>
  );
}


