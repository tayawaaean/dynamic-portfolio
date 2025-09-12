'use client';

import React, { useState } from 'react';

interface ExpandableTextProps {
  text: string;
  maxLength?: number;
  className?: string;
}

export default function ExpandableText({ 
  text, 
  maxLength = 150, 
  className = '' 
}: ExpandableTextProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Clean markdown formatting
  const cleanText = text.replace(/[#*]/g, '');
  
  // Check if text needs truncation
  const needsTruncation = cleanText.length > maxLength;
  const displayText = isExpanded || !needsTruncation 
    ? cleanText 
    : cleanText.substring(0, maxLength) + '...';

  return (
    <div className={className}>
      <p className="text-muted mb-4 flex-1">
        {displayText}
      </p>
      {needsTruncation && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-accent hover:text-accent/80 text-sm font-medium transition-colors"
        >
          {isExpanded ? 'View Less' : 'View More'}
        </button>
      )}
    </div>
  );
}
