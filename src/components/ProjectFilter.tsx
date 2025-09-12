'use client';

import React from 'react';
import Button from './Button';

interface ProjectFilterProps {
  searchTerm: string;
  workTypeFilter: string;
  featuredFilter: string;
  onSearchChange: (value: string) => void;
  onWorkTypeChange: (value: string) => void;
  onFeaturedChange: (value: string) => void;
  onClearFilters: () => void;
  className?: string;
}

export default function ProjectFilter({
  searchTerm,
  workTypeFilter,
  featuredFilter,
  onSearchChange,
  onWorkTypeChange,
  onFeaturedChange,
  onClearFilters,
  className = ''
}: ProjectFilterProps) {
  const workTypes = ['All', 'Personal', 'Client', 'Freelance', 'Open Source'];
  const featuredOptions = ['All', 'Featured Only', 'Not Featured'];

  const hasActiveFilters = searchTerm || workTypeFilter !== 'All' || featuredFilter !== 'All';

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search projects by title or description..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full px-4 py-2 pl-10 bg-background border border-gray-700 rounded-lg focus:outline-none focus:border-accent text-foreground placeholder-muted"
        />
        <svg
          className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      {/* Filter Controls */}
      <div className="flex flex-wrap items-center gap-4">
        {/* Work Type Filter */}
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-foreground">Work Type:</label>
          <select
            value={workTypeFilter}
            onChange={(e) => onWorkTypeChange(e.target.value)}
            className="px-3 py-1 bg-background border border-gray-700 rounded-md focus:outline-none focus:border-accent text-foreground text-sm"
          >
            {workTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Featured Filter */}
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-foreground">Featured:</label>
          <select
            value={featuredFilter}
            onChange={(e) => onFeaturedChange(e.target.value)}
            className="px-3 py-1 bg-background border border-gray-700 rounded-md focus:outline-none focus:border-accent text-foreground text-sm"
          >
            {featuredOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <Button
            variant="secondary"
            size="sm"
            onClick={onClearFilters}
            className="px-3 py-1"
          >
            Clear Filters
          </Button>
        )}
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-muted">Active filters:</span>
          {searchTerm && (
            <span className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-full">
              Search: "{searchTerm}"
            </span>
          )}
          {workTypeFilter !== 'All' && (
            <span className="px-2 py-1 bg-highlight/10 text-highlight text-xs rounded-full">
              Work Type: {workTypeFilter}
            </span>
          )}
          {featuredFilter !== 'All' && (
            <span className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-full">
              {featuredFilter}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
