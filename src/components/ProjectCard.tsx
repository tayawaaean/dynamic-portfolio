"use client";

import React, { useState } from 'react';
import Card from './Card';
import Button from './Button';
import Modal from './Modal';
import { Project } from '@/lib/supabaseClient';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Card className="flex flex-col h-full overflow-hidden">
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

        <div className={`${project.image_url ? '' : 'pt-6'} flex-1 flex flex-col`}>
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

          {/* Short description */}
          {project.description_markdown && (
            <p className="text-muted mb-4 line-clamp-3">
              {project.description_markdown}
            </p>
          )}

          {/* Tech stack preview */}
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
            <Button
              variant="secondary"
              size="sm"
              className="flex-1"
              onClick={() => setIsOpen(true)}
            >
              View more
            </Button>
          </div>
        </div>
      </Card>

      {/* Modal with blurred backdrop and centered content */}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title={project.title} maxWidth="lg">
        <div className="space-y-4 flex flex-col min-h-[320px]">
          {/* Image */}
          {project.image_url && (
            <div className="w-full rounded-md overflow-hidden">
              <img
                src={project.image_url}
                alt={project.title}
                className="w-full h-auto object-cover"
              />
            </div>
          )}
          {/* Tech stack */}
          {project.tech_stack && project.tech_stack.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-2">Tech stack</h4>
              <div className="flex flex-wrap gap-2">
                {project.tech_stack.map((tech: string) => (
                  <span
                    key={tech}
                    className="px-2 py-1 text-xs font-medium bg-highlight/10 text-highlight rounded-md"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Description */}
          {project.description_markdown && (
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-2">Overview</h4>
              <p className="text-muted whitespace-pre-wrap">{project.description_markdown}</p>
            </div>
          )}

          {/* Links */}
          <div className="flex flex-wrap gap-3 pt-2 mt-auto">
            {project.live_url && (
              <Button href={project.live_url} target="_blank" variant="primary" size="sm">
                Visit Live Demo
              </Button>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
}


