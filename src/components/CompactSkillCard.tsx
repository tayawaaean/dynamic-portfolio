'use client';

import React from 'react';

interface CompactSkill {
  id: string;
  name: string;
  category: string;
  level: number;
  years_experience?: number;
  description?: string;
  projects_used?: string[];
}

interface CompactSkillCardProps {
  skill: CompactSkill;
}

export default function CompactSkillCard({ skill }: CompactSkillCardProps) {
  const percentage = (skill.level / 5) * 100;
  
  const getLevelColor = (level: number) => {
    if (level >= 5) return 'from-emerald-500 to-green-400';
    if (level >= 4) return 'from-blue-500 to-cyan-400';
    if (level >= 3) return 'from-yellow-500 to-orange-400';
    if (level >= 2) return 'from-orange-500 to-red-400';
    return 'from-red-500 to-pink-400';
  };

  const getLevelLabel = (level: number) => {
    const labels = { 1: 'Beginner', 2: 'Novice', 3: 'Intermediate', 4: 'Advanced', 5: 'Expert' };
    return labels[level as keyof typeof labels] || 'Intermediate';
  };

  return (
    <div className="bg-background/50 border border-gray-800 rounded-lg p-4 hover:border-accent/50 transition-all duration-200 hover:scale-[1.02]">
      {/* Header */}
      <div className="flex justify-between items-start mb-2">
        <div>
          <h4 className="text-lg font-semibold text-foreground">{skill.name}</h4>
          <p className="text-xs text-muted">{skill.category}</p>
        </div>
        <div className="text-right">
          <span className="text-sm font-medium text-foreground">{getLevelLabel(skill.level)}</span>
          {skill.years_experience && (
            <p className="text-xs text-muted">{skill.years_experience}y exp</p>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-3">
        <div className="w-full bg-gray-800 rounded-full h-2">
          <div
            className={`bg-gradient-to-r ${getLevelColor(skill.level)} h-2 rounded-full transition-all duration-700 ease-out`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Description */}
      {skill.description && (
        <p className="text-sm text-muted mb-2 line-clamp-2">{skill.description}</p>
      )}

      {/* Projects Used - Top 2 only */}
      {skill.projects_used && skill.projects_used.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {skill.projects_used.slice(0, 2).map((project, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs bg-accent/10 text-accent rounded-md"
            >
              {project}
            </span>
          ))}
          {skill.projects_used.length > 2 && (
            <span className="px-2 py-1 text-xs bg-muted/10 text-muted rounded-md">
              +{skill.projects_used.length - 2}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

