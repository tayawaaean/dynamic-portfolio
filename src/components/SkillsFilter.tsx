'use client';

import React from 'react';
import Button from './Button';

interface SkillsFilterProps {
  categories: string[];
  selectedCategory: string;
  sortBy: 'level' | 'name' | 'experience';
  showOnlyExpert: boolean;
  onCategoryChange: (category: string) => void;
  onSortChange: (sort: 'level' | 'name' | 'experience') => void;
  onExpertToggle: (show: boolean) => void;
  onClearFilters: () => void;
}

export default function SkillsFilter({
  categories,
  selectedCategory,
  sortBy,
  showOnlyExpert,
  onCategoryChange,
  onSortChange,
  onExpertToggle,
  onClearFilters
}: SkillsFilterProps) {
  const hasActiveFilters = selectedCategory !== 'All' || showOnlyExpert || sortBy !== 'level';

  return (
    <div className="bg-background/50 border border-gray-800 rounded-lg p-6 backdrop-blur-sm mb-8">
      <div className="flex flex-wrap items-center gap-4">
        {/* Category Filter */}
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-foreground">Category:</label>
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="px-3 py-1 bg-background border border-gray-700 rounded-md focus:outline-none focus:border-accent text-foreground text-sm"
          >
            <option value="All">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Sort By */}
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-foreground">Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as 'level' | 'name' | 'experience')}
            className="px-3 py-1 bg-background border border-gray-700 rounded-md focus:outline-none focus:border-accent text-foreground text-sm"
          >
            <option value="level">Proficiency Level</option>
            <option value="name">Name (A-Z)</option>
            <option value="experience">Experience</option>
          </select>
        </div>

        {/* Expert Only Toggle */}
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-foreground">
            <input
              type="checkbox"
              checked={showOnlyExpert}
              onChange={(e) => onExpertToggle(e.target.checked)}
              className="mr-2 rounded border-gray-700 text-accent focus:ring-accent"
            />
            Expert level only
          </label>
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
        <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-gray-800">
          <span className="text-sm text-muted">Active filters:</span>
          {selectedCategory !== 'All' && (
            <span className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-full">
              Category: {selectedCategory}
            </span>
          )}
          {showOnlyExpert && (
            <span className="px-2 py-1 bg-highlight/10 text-highlight text-xs rounded-full">
              Expert Level Only
            </span>
          )}
          {sortBy !== 'level' && (
            <span className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-full">
              Sorted by: {sortBy === 'name' ? 'Name' : 'Experience'}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

