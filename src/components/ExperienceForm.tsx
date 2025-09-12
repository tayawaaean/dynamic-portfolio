'use client';

import React, { useState, useEffect } from 'react';
import { supabase, Experience } from '@/lib/supabaseClient';
import Button from './Button';

interface ExperienceFormProps {
  experience?: Experience;
  onSave: () => void;
  onCancel: () => void;
}

export default function ExperienceForm({ experience, onSave, onCancel }: ExperienceFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    start_date: '',
    end_date: '',
    description_markdown: '',
    current: false
  });

  useEffect(() => {
    if (experience) {
      setFormData({
        company: experience.company,
        role: experience.role,
        start_date: experience.start_date,
        end_date: experience.end_date || '',
        description_markdown: experience.description_markdown,
        current: !experience.end_date
      });
    }
  }, [experience]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ 
        ...prev, 
        [name]: checked,
        end_date: checked ? '' : prev.end_date
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const experienceData = {
        company: formData.company,
        role: formData.role,
        start_date: formData.start_date,
        end_date: formData.current ? null : formData.end_date || null,
        description_markdown: formData.description_markdown
      };

      let error;
      
      if (experience) {
        // Update existing experience
        ({ error } = await supabase
          .from('experience')
          .update(experienceData)
          .eq('id', experience.id));
      } else {
        // Create new experience
        ({ error } = await supabase
          .from('experience')
          .insert([experienceData]));
      }

      if (error) {
        console.error('Error saving experience:', error);
        alert('Failed to save experience. Please try again.');
        return;
      }

      onSave();
    } catch (error) {
      console.error('Error saving experience:', error);
      alert('Failed to save experience. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Company */}
      <div>
        <label className="block text-foreground font-medium mb-2">
          Company *
        </label>
        <input
          type="text"
          name="company"
          value={formData.company}
          onChange={handleInputChange}
          required
          className="w-full px-4 py-3 bg-background border border-gray-700 rounded-lg focus:outline-none focus:border-accent text-foreground"
          placeholder="Company Name"
        />
      </div>

      {/* Role */}
      <div>
        <label className="block text-foreground font-medium mb-2">
          Job Title / Role *
        </label>
        <input
          type="text"
          name="role"
          value={formData.role}
          onChange={handleInputChange}
          required
          className="w-full px-4 py-3 bg-background border border-gray-700 rounded-lg focus:outline-none focus:border-accent text-foreground"
          placeholder="Senior Full Stack Developer"
        />
      </div>

      {/* Dates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-foreground font-medium mb-2">
            Start Date *
          </label>
          <input
            type="date"
            name="start_date"
            value={formData.start_date}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 bg-background border border-gray-700 rounded-lg focus:outline-none focus:border-accent text-foreground"
          />
        </div>

        <div>
          <label className="block text-foreground font-medium mb-2">
            End Date
          </label>
          <input
            type="date"
            name="end_date"
            value={formData.end_date}
            onChange={handleInputChange}
            disabled={formData.current}
            className="w-full px-4 py-3 bg-background border border-gray-700 rounded-lg focus:outline-none focus:border-accent text-foreground disabled:opacity-50"
          />
        </div>
      </div>

      {/* Current Position */}
      <div className="flex items-center">
        <input
          type="checkbox"
          id="current"
          name="current"
          checked={formData.current}
          onChange={handleInputChange}
          className="w-4 h-4 text-accent bg-background border-gray-700 rounded focus:ring-accent focus:ring-2"
        />
        <label htmlFor="current" className="ml-2 text-foreground">
          This is my current position
        </label>
      </div>

      {/* Description */}
      <div>
        <label className="block text-foreground font-medium mb-2">
          Job Description (Markdown) *
        </label>
        <textarea
          name="description_markdown"
          value={formData.description_markdown}
          onChange={handleInputChange}
          required
          rows={10}
          className="w-full px-4 py-3 bg-background border border-gray-700 rounded-lg focus:outline-none focus:border-accent text-foreground resize-vertical"
          placeholder="## Key Responsibilities
- Led development of customer-facing web applications
- Architected and implemented scalable backend services
- Mentored junior developers and conducted code reviews

## Achievements
- Reduced application load time by 40% through optimization
- Led migration to microservices architecture
- Implemented CI/CD pipeline reducing deployment time by 60%"
        />
        <p className="text-muted text-sm mt-1">
          Use Markdown formatting to structure your experience details
        </p>
      </div>

      {/* Actions */}
      <div className="flex gap-4 pt-4">
        <Button type="submit" disabled={loading} className="flex-1">
          {loading ? 'Saving...' : experience ? 'Update Experience' : 'Add Experience'}
        </Button>
        <Button type="button" onClick={onCancel} variant="secondary" className="flex-1">
          Cancel
        </Button>
      </div>
    </form>
  );
}

