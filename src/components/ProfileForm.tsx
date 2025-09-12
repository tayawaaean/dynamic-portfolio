'use client';

import React, { useState, useEffect } from 'react';
import { supabase, Profile } from '@/lib/supabaseClient';
import Button from './Button';

interface ProfileFormProps {
  profile?: Profile;
  onSave: () => void;
  onCancel: () => void;
}

export default function ProfileForm({ profile, onSave, onCancel }: ProfileFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    headline: '',
    bio: '',
    github_url: '',
    linkedin_url: '',
    email: ''
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name,
        headline: profile.headline,
        bio: profile.bio,
        github_url: profile.github_url || '',
        linkedin_url: profile.linkedin_url || '',
        email: profile.email || ''
      });
    }
  }, [profile]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const profileData = {
        name: formData.name,
        headline: formData.headline,
        bio: formData.bio,
        github_url: formData.github_url || null,
        linkedin_url: formData.linkedin_url || null,
        email: formData.email || null
      };

      let error;
      
      if (profile) {
        // Update existing profile
        ({ error } = await supabase
          .from('profiles')
          .update(profileData)
          .eq('id', profile.id));
      } else {
        // Create new profile
        ({ error } = await supabase
          .from('profiles')
          .insert([profileData]));
      }

      if (error) {
        console.error('Error saving profile:', error);
        alert('Failed to save profile. Please try again.');
        return;
      }

      onSave();
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Failed to save profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name */}
      <div>
        <label className="block text-foreground font-medium mb-2">
          Full Name *
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
          className="w-full px-4 py-3 bg-background border border-gray-700 rounded-lg focus:outline-none focus:border-accent text-foreground"
          placeholder="Your Full Name"
        />
      </div>

      {/* Headline */}
      <div>
        <label className="block text-foreground font-medium mb-2">
          Professional Headline *
        </label>
        <input
          type="text"
          name="headline"
          value={formData.headline}
          onChange={handleInputChange}
          required
          className="w-full px-4 py-3 bg-background border border-gray-700 rounded-lg focus:outline-none focus:border-accent text-foreground"
          placeholder="Full Stack Developer & IoT Specialist"
        />
        <p className="text-muted text-sm mt-1">
          This appears as your title/role on the homepage
        </p>
      </div>

      {/* Bio */}
      <div>
        <label className="block text-foreground font-medium mb-2">
          About Me / Bio *
        </label>
        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleInputChange}
          required
          rows={6}
          className="w-full px-4 py-3 bg-background border border-gray-700 rounded-lg focus:outline-none focus:border-accent text-foreground resize-vertical"
          placeholder="Write a compelling bio that describes your expertise, passion, and what makes you unique as a developer..."
        />
        <p className="text-muted text-sm mt-1">
          This appears in the hero section and tells visitors about you
        </p>
      </div>

      {/* Contact Information */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-foreground">Contact Information</h4>
        
        <div>
          <label className="block text-foreground font-medium mb-2">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-background border border-gray-700 rounded-lg focus:outline-none focus:border-accent text-foreground"
            placeholder="your.email@example.com"
          />
        </div>

        <div>
          <label className="block text-foreground font-medium mb-2">
            GitHub URL
          </label>
          <input
            type="url"
            name="github_url"
            value={formData.github_url}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-background border border-gray-700 rounded-lg focus:outline-none focus:border-accent text-foreground"
            placeholder="https://github.com/yourusername"
          />
        </div>

        <div>
          <label className="block text-foreground font-medium mb-2">
            LinkedIn URL
          </label>
          <input
            type="url"
            name="linkedin_url"
            value={formData.linkedin_url}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-background border border-gray-700 rounded-lg focus:outline-none focus:border-accent text-foreground"
            placeholder="https://linkedin.com/in/yourprofile"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-4 pt-4">
        <Button type="submit" disabled={loading} className="flex-1">
          {loading ? 'Saving...' : profile ? 'Update Profile' : 'Create Profile'}
        </Button>
        <Button type="button" onClick={onCancel} variant="secondary" className="flex-1">
          Cancel
        </Button>
      </div>
    </form>
  );
}

