import React from 'react';
import Link from 'next/link';
import Section from '@/components/Section';
import Card from '@/components/Card';
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
            <Card key={project.id} className="flex flex-col h-full overflow-hidden">
              {/* Project Image */}
              {project.image_url && (
                <div className="w-full aspect-[16/9] mb-4 rounded-md overflow-hidden">
                  <img
                    src={project.image_url}
                    alt={project.title}
                    className="w-full h-full object-cover object-center mx-auto"
                  />
                </div>
              )}
              
              <div className={project.image_url ? '' : 'pt-6'}>
                {project.featured && (
                  <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent mb-4 w-fit">
                    Featured
                  </div>
                )}
                
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-foreground flex-1">
                    {project.title}
                  </h3>
                  {project.work_type && (
                    <span className="ml-2 px-2 py-1 bg-highlight/10 text-highlight text-xs rounded-full flex-shrink-0">
                      {project.work_type}
                    </span>
                  )}
                </div>
              
                <ExpandableText 
                  text={project.description_markdown}
                  maxLength={150}
                  className="mb-4"
                />
                
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {project.tech_stack.slice(0, 4).map((tech: string) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs font-medium bg-highlight/10 text-highlight rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.tech_stack.length > 4 && (
                      <span className="px-2 py-1 text-xs font-medium bg-muted/10 text-muted rounded-md">
                        +{project.tech_stack.length - 4} more
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="flex gap-3 mt-auto">
                  {project.live_url && (
                    <Button
                      href={project.live_url}
                      target="_blank"
                      variant="primary"
                      size="sm"
                      className="flex-1"
                    >
                      Live Demo
                    </Button>
                  )}
                  {project.repo_url && (
                    <Button
                      href={project.repo_url}
                      target="_blank"
                      variant="secondary"
                      size="sm"
                      className="flex-1"
                    >
                      Code
                    </Button>
                  )}
                </div>
              </div>
            </Card>
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
