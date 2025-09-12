'use client';

import React, { useState, useEffect } from 'react';
import { supabase, Project } from '@/lib/supabaseClient';
import Button from './Button';
import ImageUpload from './ImageUpload';

interface ProjectFormProps {
  project?: Project;
  onSave: () => void;
  onCancel: () => void;
}

export default function ProjectForm({ project, onSave, onCancel }: ProjectFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description_markdown: '',
    tech_stack: [] as string[],
    repo_url: '',
    live_url: '',
    image_url: '',
    work_type: '',
    featured: false
  });
  const [techInput, setTechInput] = useState('');

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title,
        slug: project.slug,
        description_markdown: project.description_markdown,
        tech_stack: project.tech_stack,
        repo_url: project.repo_url || '',
        live_url: project.live_url || '',
        image_url: project.image_url || '',
        work_type: project.work_type || '',
        featured: project.featured
      });
    }
  }, [project]);

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
      
      // Auto-generate slug from title
      if (name === 'title' && !project) {
        setFormData(prev => ({ ...prev, slug: generateSlug(value) }));
      }
    }
  };

  const addTech = () => {
    if (techInput.trim() && !formData.tech_stack.includes(techInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tech_stack: [...prev.tech_stack, techInput.trim()]
      }));
      setTechInput('');
    }
  };

  const removeTech = (tech: string) => {
    setFormData(prev => ({
      ...prev,
      tech_stack: prev.tech_stack.filter(t => t !== tech)
    }));
  };

  const handleTechKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTech();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const projectData = {
        title: formData.title,
        slug: formData.slug,
        description_markdown: formData.description_markdown,
        tech_stack: formData.tech_stack,
        repo_url: formData.repo_url || null,
        live_url: formData.live_url || null,
        image_url: formData.image_url || null,
        work_type: formData.work_type || null,
        featured: formData.featured
      };

      let error;
      
      if (project) {
        // Update existing project
        ({ error } = await supabase
          .from('projects')
          .update(projectData)
          .eq('id', project.id));
      } else {
        // Create new project
        ({ error } = await supabase
          .from('projects')
          .insert([projectData]));
      }

      if (error) {
        console.error('Error saving project:', error);
        alert('Failed to save project. Please try again.');
        return;
      }

      onSave();
    } catch (error) {
      console.error('Error saving project:', error);
      alert('Failed to save project. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title */}
      <div>
        <label className="block text-foreground font-medium mb-2">
          Project Title *
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          required
          className="w-full px-4 py-3 bg-background border border-gray-700 rounded-lg focus:outline-none focus:border-accent text-foreground"
          placeholder="My Awesome Project"
        />
      </div>

      {/* Slug */}
      <div>
        <label className="block text-foreground font-medium mb-2">
          URL Slug *
        </label>
        <input
          type="text"
          name="slug"
          value={formData.slug}
          onChange={handleInputChange}
          required
          className="w-full px-4 py-3 bg-background border border-gray-700 rounded-lg focus:outline-none focus:border-accent text-foreground"
          placeholder="my-awesome-project"
        />
        <p className="text-muted text-sm mt-1">
          This will be used in the URL: /projects/{formData.slug}
        </p>
      </div>

      {/* Work Type */}
      <div>
        <label className="block text-foreground font-medium mb-2">
          Work Type
        </label>
        <select
          name="work_type"
          value={formData.work_type}
          onChange={handleInputChange}
          className="w-full px-4 py-3 bg-background border border-gray-700 rounded-lg focus:outline-none focus:border-accent text-foreground"
        >
          <option value="">Select work type</option>
          <option value="Personal">Personal Project</option>
          <option value="Client">Client Work</option>
          <option value="Open Source">Open Source</option>
          <option value="Freelance">Freelance</option>
          <option value="Company">Company Project</option>
        </select>
      </div>

      {/* Image Upload */}
      <div>
        <label className="block text-foreground font-medium mb-2">
          Project Image
        </label>
        <ImageUpload
          value={formData.image_url}
          onChange={(url) => setFormData(prev => ({ ...prev, image_url: url }))}
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-foreground font-medium mb-2">
          Description (Markdown) *
        </label>
        <textarea
          name="description_markdown"
          value={formData.description_markdown}
          onChange={handleInputChange}
          required
          rows={8}
          className="w-full px-4 py-3 bg-background border border-gray-700 rounded-lg focus:outline-none focus:border-accent text-foreground resize-vertical"
          placeholder="# Project Description

A detailed description of your project...

## Features
- Feature 1
- Feature 2

## Technical Details
Built using modern technologies..."
        />
        <p className="text-muted text-sm mt-1">
          You can use Markdown formatting for rich text
        </p>
      </div>

      {/* Tech Stack */}
      <div>
        <label className="block text-foreground font-medium mb-2">
          Tech Stack
        </label>
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={techInput}
            onChange={(e) => setTechInput(e.target.value)}
            onKeyPress={handleTechKeyPress}
            className="flex-1 px-4 py-2 bg-background border border-gray-700 rounded-lg focus:outline-none focus:border-accent text-foreground"
            placeholder="Enter technology (e.g., React, Node.js)"
          />
          <Button type="button" onClick={addTech} variant="secondary" size="sm">
            Add
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.tech_stack.map((tech: string) => (
            <span
              key={tech}
              className="inline-flex items-center px-3 py-1 bg-accent/10 text-accent rounded-full text-sm"
            >
              {tech}
              <button
                type="button"
                onClick={() => removeTech(tech)}
                className="ml-2 text-accent hover:text-red-400 transition-colors"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-foreground font-medium mb-2">
            Repository URL
          </label>
          <input
            type="url"
            name="repo_url"
            value={formData.repo_url}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-background border border-gray-700 rounded-lg focus:outline-none focus:border-accent text-foreground"
            placeholder="https://github.com/username/project"
          />
        </div>

        <div>
          <label className="block text-foreground font-medium mb-2">
            Live Demo URL
          </label>
          <input
            type="url"
            name="live_url"
            value={formData.live_url}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-background border border-gray-700 rounded-lg focus:outline-none focus:border-accent text-foreground"
            placeholder="https://myproject.com"
          />
        </div>
      </div>

      {/* Featured */}
      <div className="flex items-center">
        <input
          type="checkbox"
          id="featured"
          name="featured"
          checked={formData.featured}
          onChange={handleInputChange}
          className="w-4 h-4 text-accent bg-background border-gray-700 rounded focus:ring-accent focus:ring-2"
        />
        <label htmlFor="featured" className="ml-2 text-foreground">
          Featured Project (show prominently on homepage)
        </label>
      </div>

      {/* Actions */}
      <div className="flex gap-4 pt-4">
        <Button type="submit" disabled={loading} className="flex-1">
          {loading ? 'Saving...' : project ? 'Update Project' : 'Create Project'}
        </Button>
        <Button type="button" onClick={onCancel} variant="secondary" className="flex-1">
          Cancel
        </Button>
      </div>
    </form>
  );
}

