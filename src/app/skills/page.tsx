'use client';

import React, { useState, useEffect } from 'react';
import Section from '@/components/Section';
import Card from '@/components/Card';
import Button from '@/components/Button';
import CompactSkillCard from '@/components/CompactSkillCard';
import { supabase, Skill } from '@/lib/supabaseClient';

// Enhanced skills data with additional information
interface EnhancedSkill extends Skill {
  years_experience?: number;
  description?: string;
  projects_used?: string[];
  certifications?: string[];
  last_used?: string;
}

const defaultSkills: EnhancedSkill[] = [
  { 
    id: '1', 
    name: 'JavaScript', 
    category: 'Languages', 
    level: 5, 
    years_experience: 4,
    description: 'Core language for web development, used in both frontend and backend projects.',
    projects_used: ['Smart IoT Dashboard', 'E-Commerce Platform', 'Portfolio Website'],
    last_used: '2024',
    created_at: '2023-01-01', 
    updated_at: '2023-01-01' 
  },
  { 
    id: '2', 
    name: 'TypeScript', 
    category: 'Languages', 
    level: 5, 
    years_experience: 3,
    description: 'Strongly typed JavaScript for scalable applications and better developer experience.',
    projects_used: ['Next.js Portfolio', 'Enterprise Dashboard'],
    last_used: '2024',
    created_at: '2023-01-01', 
    updated_at: '2023-01-01' 
  },
  { 
    id: '3', 
    name: 'Python', 
    category: 'Languages', 
    level: 4, 
    years_experience: 3,
    description: 'Versatile language for backend development, data analysis, and automation scripts.',
    projects_used: ['Data Processing Pipeline', 'API Backend'],
    last_used: '2024',
    created_at: '2023-01-01', 
    updated_at: '2023-01-01' 
  },
  { 
    id: '4', 
    name: 'React', 
    category: 'Frontend', 
    level: 5, 
    years_experience: 4,
    description: 'Primary frontend framework for building interactive user interfaces and SPAs.',
    projects_used: ['Smart IoT Dashboard', 'E-Commerce Platform', 'Admin Panel'],
    last_used: '2024',
    created_at: '2023-01-01', 
    updated_at: '2023-01-01' 
  },
  { 
    id: '5', 
    name: 'Next.js', 
    category: 'Frontend', 
    level: 5, 
    years_experience: 2,
    description: 'Full-stack React framework for production-ready applications with SSR and SSG.',
    projects_used: ['Portfolio Website', 'Client Landing Pages'],
    last_used: '2024',
    created_at: '2023-01-01', 
    updated_at: '2023-01-01' 
  },
  { 
    id: '6', 
    name: 'Tailwind CSS', 
    category: 'Frontend', 
    level: 4, 
    years_experience: 2,
    description: 'Utility-first CSS framework for rapid UI development and consistent design systems.',
    projects_used: ['Portfolio Website', 'Dashboard UI'],
    last_used: '2024',
    created_at: '2023-01-01', 
    updated_at: '2023-01-01' 
  },
  { 
    id: '7', 
    name: 'Node.js', 
    category: 'Backend', 
    level: 5, 
    years_experience: 4,
    description: 'JavaScript runtime for building scalable server-side applications and APIs.',
    projects_used: ['E-Commerce API', 'IoT Data Server', 'Microservices'],
    last_used: '2024',
    created_at: '2023-01-01', 
    updated_at: '2023-01-01' 
  },
  { 
    id: '8', 
    name: 'PostgreSQL', 
    category: 'Backend', 
    level: 4, 
    years_experience: 3,
    description: 'Advanced relational database for complex data relationships and transactions.',
    projects_used: ['E-Commerce Platform', 'User Management System'],
    last_used: '2024',
    created_at: '2023-01-01', 
    updated_at: '2023-01-01' 
  },
  { 
    id: '9', 
    name: 'Docker', 
    category: 'DevOps', 
    level: 4, 
    years_experience: 2,
    description: 'Containerization platform for consistent deployment across environments.',
    projects_used: ['Microservices Architecture', 'Development Environment'],
    last_used: '2024',
    created_at: '2023-01-01', 
    updated_at: '2023-01-01' 
  },
  { 
    id: '10', 
    name: 'AWS', 
    category: 'DevOps', 
    level: 3, 
    years_experience: 1,
    description: 'Cloud platform for hosting, storage, and various managed services.',
    projects_used: ['Static Site Hosting', 'File Storage'],
    last_used: '2024',
    created_at: '2023-01-01', 
    updated_at: '2023-01-01' 
  },
  { 
    id: '11', 
    name: 'Arduino', 
    category: 'IoT', 
    level: 4, 
    years_experience: 3,
    description: 'Microcontroller platform for IoT projects and hardware prototyping.',
    projects_used: ['Smart Home System', 'Sensor Networks'],
    last_used: '2024',
    created_at: '2023-01-01', 
    updated_at: '2023-01-01' 
  },
  { 
    id: '12', 
    name: 'MQTT', 
    category: 'IoT', 
    level: 4, 
    years_experience: 2,
    description: 'Lightweight messaging protocol for IoT device communication.',
    projects_used: ['Smart IoT Dashboard', 'Device Monitoring'],
    last_used: '2024',
    created_at: '2023-01-01', 
    updated_at: '2023-01-01' 
  },
];

export default function SkillsPage() {
  const [skills, setSkills] = useState<EnhancedSkill[]>(defaultSkills);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState<'level' | 'name' | 'experience'>('level');
  const [showOnlyExpert, setShowOnlyExpert] = useState(false);

  useEffect(() => {
    async function fetchSkills() {
      try {
        const { data, error } = await supabase
          .from('skills')
          .select('*')
          .order('category')
          .order('level', { ascending: false });

        if (error) {
          console.log('Using default skills data');
          setSkills(defaultSkills);
        } else {
          // Merge with default data for enhanced fields
          const enhancedData = (data || []).map(skill => {
            const defaultSkill = defaultSkills.find(d => d.name === skill.name);
            return { ...skill, ...defaultSkill };
          });
          setSkills(enhancedData.length > 0 ? enhancedData : defaultSkills);
        }
      } catch (error) {
        console.log('Using default skills data');
        setSkills(defaultSkills);
      } finally {
        setLoading(false);
      }
    }
    
    fetchSkills();
  }, []);

  // Filter and sort skills
  const filteredSkills = skills
    .filter(skill => {
      if (selectedCategory !== 'All' && skill.category !== selectedCategory) {
        return false;
      }
      if (showOnlyExpert && skill.level < 4) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'experience':
          return (b.years_experience || 0) - (a.years_experience || 0);
        case 'level':
        default:
          return b.level - a.level;
      }
    });

  const categories = Array.from(new Set(skills.map(skill => skill.category))).sort();
  const groupedSkills = filteredSkills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, EnhancedSkill[]>);

  const handleClearFilters = () => {
    setSelectedCategory('All');
    setSortBy('level');
    setShowOnlyExpert(false);
  };

  if (loading) {
    return (
      <div>
        <Section className="pt-24">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Skills & Expertise
            </h1>
            <p className="text-xl text-muted max-w-3xl mx-auto">
              Loading skills data...
            </p>
          </div>
        </Section>
      </div>
    );
  }

  return (
    <div>
      <Section className="pt-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
            Skills & Expertise
          </h1>
          <p className="text-xl text-muted max-w-3xl mx-auto">
            A comprehensive overview of my technical skills, experience levels, and real-world applications across different technologies.
          </p>
        </div>

        {/* Compact Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 p-4 bg-background/30 border border-gray-800 rounded-lg">
          <div className="flex flex-wrap items-center gap-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-1 bg-background border border-gray-700 rounded-md focus:outline-none focus:border-accent text-foreground text-sm"
            >
              <option value="All">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'level' | 'name' | 'experience')}
              className="px-3 py-1 bg-background border border-gray-700 rounded-md focus:outline-none focus:border-accent text-foreground text-sm"
            >
              <option value="level">By Level</option>
              <option value="name">A-Z</option>
              <option value="experience">By Experience</option>
            </select>

            <label className="flex items-center gap-2 text-sm text-foreground">
              <input
                type="checkbox"
                checked={showOnlyExpert}
                onChange={(e) => setShowOnlyExpert(e.target.checked)}
                className="rounded border-gray-700 text-accent focus:ring-accent"
              />
              Expert only
            </label>
          </div>
          
          <div className="text-sm text-muted">
            {filteredSkills.length} skills • {filteredSkills.filter(s => s.level >= 5).length} expert
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
          {filteredSkills.map((skill: EnhancedSkill) => (
            <CompactSkillCard key={skill.id} skill={skill} />
          ))}
        </div>

        {/* Empty State */}
        {filteredSkills.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted text-lg">No skills match your current filters.</p>
            <Button onClick={handleClearFilters} className="mt-4">
              Clear Filters
            </Button>
          </div>
        )}

        {/* Compact Legend */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-6 text-sm text-muted bg-background/30 px-4 py-2 rounded-lg border border-gray-800">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-gradient-to-r from-red-500 to-pink-400 rounded-full"></div>
              <span>Beginner</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-gradient-to-r from-yellow-500 to-orange-400 rounded-full"></div>
              <span>Intermediate</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"></div>
              <span>Advanced</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-green-400 rounded-full"></div>
              <span>Expert</span>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
