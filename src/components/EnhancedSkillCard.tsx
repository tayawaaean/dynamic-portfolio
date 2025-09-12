'use client';

import React, { useState } from 'react';
import Card from './Card';
import Button from './Button';
import { Skill } from '@/lib/supabaseClient';

interface EnhancedSkill extends Skill {
  years_experience?: number;
  description?: string;
  projects_used?: string[];
  certifications?: string[];
  last_used?: string;
}

interface EnhancedSkillCardProps {
  skill: EnhancedSkill;
  showDetails?: boolean;
}

export default function EnhancedSkillCard({ skill, showDetails = false }: EnhancedSkillCardProps) {
  const [expanded, setExpanded] = useState(false);
  
  const percentage = (skill.level / 5) * 100;
  
  const getLevelLabel = (level: number) => {
    const labels = {
      1: 'Beginner',
      2: 'Novice', 
      3: 'Intermediate',
      4: 'Advanced',
      5: 'Expert'
    };
    return labels[level as keyof typeof labels] || 'Intermediate';
  };

  const getLevelColor = (level: number) => {
    if (level >= 5) return 'from-emerald-500 to-green-400';
    if (level >= 4) return 'from-blue-500 to-cyan-400';
    if (level >= 3) return 'from-yellow-500 to-orange-400';
    if (level >= 2) return 'from-orange-500 to-red-400';
    return 'from-red-500 to-pink-400';
  };

  const getExperienceText = (years?: number) => {
    if (!years) return '';
    if (years < 1) return 'Less than 1 year';
    if (years === 1) return '1 year';
    return `${years} years`;
  };

  return (
    <Card className="h-full flex flex-col">
      <div className="flex-1">
        {/* Header */}
        <div className="flex justify-between items-start mb-3">
          <div>
            <h4 className="text-lg font-semibold text-foreground">{skill.name}</h4>
            {skill.years_experience && (
              <p className="text-sm text-muted">{getExperienceText(skill.years_experience)} experience</p>
            )}
          </div>
          <div className="text-right">
            <span className="text-sm font-medium text-foreground">{getLevelLabel(skill.level)}</span>
            <p className="text-xs text-muted">{skill.level}/5</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="w-full bg-gray-800 rounded-full h-2.5">
            <div
              className={`bg-gradient-to-r ${getLevelColor(skill.level)} h-2.5 rounded-full transition-all duration-700 ease-out`}
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        {/* Description */}
        {skill.description && (
          <p className="text-sm text-muted mb-3 line-clamp-2">
            {skill.description}
          </p>
        )}

        {/* Last Used */}
        {skill.last_used && (
          <p className="text-xs text-muted mb-3">
            Last used: {skill.last_used}
          </p>
        )}

        {/* Expandable Details */}
        {showDetails && (expanded || skill.projects_used?.length || skill.certifications?.length) && (
          <div className={`space-y-3 ${!expanded ? 'hidden' : ''}`}>
            {/* Projects Used In */}
            {skill.projects_used && skill.projects_used.length > 0 && (
              <div>
                <h5 className="text-sm font-medium text-foreground mb-2">Used in projects:</h5>
                <div className="flex flex-wrap gap-1">
                  {skill.projects_used.slice(0, expanded ? undefined : 3).map((project, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs bg-accent/10 text-accent rounded-md"
                    >
                      {project}
                    </span>
                  ))}
                  {!expanded && skill.projects_used.length > 3 && (
                    <span className="px-2 py-1 text-xs bg-muted/10 text-muted rounded-md">
                      +{skill.projects_used.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Certifications */}
            {skill.certifications && skill.certifications.length > 0 && (
              <div>
                <h5 className="text-sm font-medium text-foreground mb-2">Certifications:</h5>
                <div className="space-y-1">
                  {skill.certifications.map((cert, index) => (
                    <p key={index} className="text-xs text-highlight">
                      • {cert}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Expand/Collapse Button */}
      {showDetails && (skill.projects_used?.length || skill.certifications?.length) && (
        <div className="mt-3 pt-3 border-t border-gray-800">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setExpanded(!expanded)}
            className="w-full text-xs"
          >
            {expanded ? 'Show Less' : 'Show More'}
          </Button>
        </div>
      )}
    </Card>
  );
}

