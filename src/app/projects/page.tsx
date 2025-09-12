import React from 'react';
import Link from 'next/link';
import Section from '@/components/Section';
import ProjectCard from '@/components/ProjectCard';
import Button from '@/components/Button';
import ExpandableText from '@/components/ExpandableText';
import { supabase, Project } from '@/lib/supabaseClient';

// Default projects data
const defaultProjects: Project[] = [
  {
    id: '1',
    title: 'Smart IoT Dashboard',
    slug: 'smart-iot-dashboard',
    description_markdown: 'A comprehensive IoT monitoring and control system built with modern web technologies. This project features real-time data visualization, device management, automated alerts, and a responsive dashboard that works across all devices. Built with React, Node.js, and MQTT for seamless communication with IoT sensors and actuators.',
    tech_stack: ['React', 'Node.js', 'TypeScript', 'MQTT', 'MongoDB'],
    repo_url: 'https://github.com',
    live_url: 'https://example.com',
    image_url: undefined,
    work_type: 'Personal',
    featured: true,
    created_at: '2023-01-01',
    updated_at: '2023-01-01'
  },
  {
    id: '2',
    title: 'E-Commerce Platform',
    slug: 'ecommerce-platform',
    description_markdown: 'Full-featured e-commerce solution with modern UI and robust backend. Includes user authentication, product catalog, shopping cart, payment processing with Stripe, order management, and admin dashboard. Features include real-time inventory tracking, customer reviews, wishlist functionality, and comprehensive analytics dashboard.',
    tech_stack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Stripe'],
    repo_url: 'https://github.com',
    live_url: 'https://example.com',
    image_url: undefined,
    work_type: 'Client',
    featured: true,
    created_at: '2023-01-01',
    updated_at: '2023-01-01'
  }
];

async function getProjects() {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('featured', { ascending: false })
      .order('created_at', { ascending: false });

    if (error) {
      console.log('Using default projects data');
      return defaultProjects;
    }

    return data || defaultProjects;
  } catch (error) {
    console.log('Using default projects data');
    return defaultProjects;
  }
}

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div>
      <Section className="pt-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
            My Projects
          </h1>
          <p className="text-xl text-muted max-w-3xl mx-auto">
            A showcase of my work, featuring web applications, IoT solutions, and innovative projects built with modern technologies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project: Project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {projects.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted text-lg">No projects found. Check back soon!</p>
          </div>
        )}
      </Section>
    </div>
  );
}
