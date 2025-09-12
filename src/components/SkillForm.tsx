'use client';

import React, { useState, useEffect } from 'react';
import { supabase, Skill } from '@/lib/supabaseClient';
import Button from './Button';

interface SkillFormProps {
  skill?: Skill;
  onSave: () => void;
  onCancel: () => void;
}

const SKILL_CATEGORIES = [
  'Languages',
  'Frontend',
  'Backend',
  'Database',
  'DevOps',
  'Mobile',
  'IoT',
  'Cloud',
  'Testing',
  'Design',
  'Other'
];

export default function SkillForm({ skill, onSave, onCancel }: SkillFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    level: 3,
    years_experience: 1,
    description: '',
    projects_used: '',
    last_used: new Date().getFullYear().toString()
  });

  useEffect(() => {
    if (skill) {
      setFormData({
        name: skill.name,
        category: skill.category,
        level: skill.level,
        years_experience: (skill as any).years_experience || 1,
        description: (skill as any).description || '',
        projects_used: (skill as any).projects_used?.join(', ') || '',
        last_used: (skill as any).last_used || new Date().getFullYear().toString()
      });
    }
  }, [skill]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'range' || name === 'level' || name === 'years_experience') {
      setFormData(prev => ({ ...prev, [name]: parseInt(value) }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const skillData = {
        name: formData.name,
        category: formData.category,
        level: formData.level,
        years_experience: formData.years_experience,
        description: formData.description,
        projects_used: formData.projects_used.split(',').map(p => p.trim()).filter(p => p),
        last_used: formData.last_used
      };

      let error;
      
      if (skill) {
        // Update existing skill
        ({ error } = await supabase
          .from('skills')
          .update(skillData)
          .eq('id', skill.id));
      } else {
        // Create new skill
        ({ error } = await supabase
          .from('skills')
          .insert([skillData]));
      }

      if (error) {
        console.error('Error saving skill:', error);
        alert('Failed to save skill. Please try again.');
        return;
      }

      onSave();
    } catch (error) {
      console.error('Error saving skill:', error);
      alert('Failed to save skill. Please try again.');
    } finally {
      setLoading(false);
    }
  };

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

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Skill Name */}
      <div>
        <label className="block text-foreground font-medium mb-2">
          Skill Name *
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
          className="w-full px-4 py-3 bg-background border border-gray-700 rounded-lg focus:outline-none focus:border-accent text-foreground"
          placeholder="e.g., JavaScript, React, Python, Docker"
        />
      </div>

      {/* Category */}
      <div>
        <label className="block text-foreground font-medium mb-2">
          Category *
        </label>
        <select
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          required
          className="w-full px-4 py-3 bg-background border border-gray-700 rounded-lg focus:outline-none focus:border-accent text-foreground"
        >
          <option value="">Select a category</option>
          {SKILL_CATEGORIES.map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Proficiency Level */}
      <div>
        <label className="block text-foreground font-medium mb-2">
          Proficiency Level: {getLevelLabel(formData.level)} ({formData.level}/5)
        </label>
        <div className="space-y-3">
          <input
            type="range"
            name="level"
            min="1"
            max="5"
            value={formData.level}
            onChange={handleInputChange}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-sm text-muted">
            <span>1 - Beginner</span>
            <span>2 - Novice</span>
            <span>3 - Intermediate</span>
            <span>4 - Advanced</span>
            <span>5 - Expert</span>
          </div>
        </div>
        <div className="mt-3 p-3 bg-gray-800/50 rounded-lg">
          <p className="text-sm text-muted">
            <strong>{getLevelLabel(formData.level)}:</strong>{' '}
            {formData.level === 1 && 'Just getting started with this technology'}
            {formData.level === 2 && 'Basic understanding with some hands-on experience'}
            {formData.level === 3 && 'Comfortable using this in projects with good understanding'}
            {formData.level === 4 && 'Very experienced, can handle complex tasks independently'}
            {formData.level === 5 && 'Expert level, can teach others and solve complex problems'}
          </p>
        </div>
      </div>

      {/* Years of Experience */}
      <div>
        <label className="block text-foreground font-medium mb-2">
          Years of Experience: {formData.years_experience} {formData.years_experience === 1 ? 'year' : 'years'}
        </label>
        <input
          type="range"
          name="years_experience"
          min="0"
          max="10"
          step="0.5"
          value={formData.years_experience}
          onChange={handleInputChange}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
        />
        <div className="flex justify-between text-xs text-muted mt-1">
          <span>0</span>
          <span>2</span>
          <span>4</span>
          <span>6</span>
          <span>8</span>
          <span>10+</span>
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-foreground font-medium mb-2">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          rows={3}
          className="w-full px-4 py-3 bg-background border border-gray-700 rounded-lg focus:outline-none focus:border-accent text-foreground resize-none"
          placeholder="Brief description of how you use this skill..."
        />
      </div>

      {/* Projects Used */}
      <div>
        <label className="block text-foreground font-medium mb-2">
          Projects Used (comma-separated)
        </label>
        <input
          type="text"
          name="projects_used"
          value={formData.projects_used}
          onChange={handleInputChange}
          className="w-full px-4 py-3 bg-background border border-gray-700 rounded-lg focus:outline-none focus:border-accent text-foreground"
          placeholder="Project A, Project B, Project C"
        />
        <p className="text-xs text-muted mt-1">
          List the projects where you've used this skill
        </p>
      </div>

      {/* Last Used */}
      <div>
        <label className="block text-foreground font-medium mb-2">
          Last Used (Year)
        </label>
        <input
          type="text"
          name="last_used"
          value={formData.last_used}
          onChange={handleInputChange}
          className="w-full px-4 py-3 bg-background border border-gray-700 rounded-lg focus:outline-none focus:border-accent text-foreground"
          placeholder="2024"
        />
      </div>

      {/* Actions */}
      <div className="flex gap-4 pt-4">
        <Button type="submit" disabled={loading} className="flex-1">
          {loading ? 'Saving...' : skill ? 'Update Skill' : 'Add Skill'}
        </Button>
        <Button type="button" onClick={onCancel} variant="secondary" className="flex-1">
          Cancel
        </Button>
      </div>
    </form>
  );
}

