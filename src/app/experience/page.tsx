import React from 'react';
import Section from '@/components/Section';
import Card from '@/components/Card';
import { supabase, Experience } from '@/lib/supabaseClient';

// Default experience data
const defaultExperience: Experience[] = [
  {
    id: '1',
    company: 'TechCorp Solutions',
    role: 'Senior Full Stack Developer',
    start_date: '2022-01-01',
    end_date: null,
    description_markdown: `## Key Responsibilities
- Lead development of customer-facing web applications
- Architect and implement scalable backend services
- Mentor junior developers and conduct code reviews
- Collaborate with product team on feature planning

## Achievements
- Reduced application load time by 40% through optimization
- Led migration to microservices architecture
- Implemented CI/CD pipeline reducing deployment time by 60%`,
    created_at: '2023-01-01',
    updated_at: '2023-01-01'
  },
  {
    id: '2',
    company: 'Innovation Labs',
    role: 'Full Stack Developer',
    start_date: '2020-06-01',
    end_date: '2021-12-31',
    description_markdown: `## Key Responsibilities
- Developed IoT solutions for smart home applications
- Built RESTful APIs and real-time communication systems
- Implemented responsive web interfaces
- Integrated with various IoT protocols (MQTT, CoAP)

## Projects
- Smart home automation system
- Environmental monitoring dashboard
- Mobile companion applications`,
    created_at: '2023-01-01',
    updated_at: '2023-01-01'
  }
];

async function getExperience() {
  try {
    const { data, error } = await supabase
      .from('experience')
      .select('*')
      .order('start_date', { ascending: false });

    if (error) {
      console.log('Using default experience data');
      return defaultExperience;
    }

    return data || defaultExperience;
  } catch (error) {
    console.log('Using default experience data');
    return defaultExperience;
  }
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long'
  });
}

function formatMarkdown(markdown: string) {
  return markdown
    .replace(/## (.*)/g, '<h3 class="text-lg font-semibold text-foreground mb-2">$1</h3>')
    .replace(/- (.*)/g, '<li class="text-muted mb-1">$1</li>')
    .replace(/\n\n/g, '<br><br>')
    .replace(/\n/g, '<br>');
}

export default async function ExperiencePage() {
  const experience = await getExperience();

  return (
    <div>
      <Section className="pt-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
            Experience
          </h1>
          <p className="text-xl text-muted max-w-3xl mx-auto">
            My professional journey in software development, from junior developer to senior roles, building scalable applications and leading teams.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-accent/30 hidden md:block"></div>
            
            {experience.map((exp: Experience, index: number) => (
              <div key={exp.id} className="relative mb-12 last:mb-0">
                {/* Timeline dot */}
                <div className="absolute left-6 w-4 h-4 bg-accent rounded-full border-4 border-background hidden md:block"></div>
                
                <div className="md:ml-16">
                  <Card>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-foreground">
                          {exp.role}
                        </h3>
                        <h4 className="text-lg text-accent font-semibold">
                          {exp.company}
                        </h4>
                      </div>
                      <div className="text-muted text-sm mt-2 sm:mt-0">
                        {formatDate(exp.start_date)} - {exp.end_date ? formatDate(exp.end_date) : 'Present'}
                      </div>
                    </div>
                    
                    <div 
                      className="prose prose-sm max-w-none text-muted"
                      dangerouslySetInnerHTML={{ 
                        __html: formatMarkdown(exp.description_markdown) 
                      }}
                    />
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>

        {experience.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted text-lg">No experience data found. Check back soon!</p>
          </div>
        )}
      </Section>
    </div>
  );
}
