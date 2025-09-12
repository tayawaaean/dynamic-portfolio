import React from 'react';
import Section from '@/components/Section';
import Card from '@/components/Card';
import { supabase, Skill } from '@/lib/supabaseClient';

// Default skills data
const defaultSkills: Skill[] = [
  { id: '1', name: 'JavaScript', category: 'Languages', level: 5, created_at: '2023-01-01', updated_at: '2023-01-01' },
  { id: '2', name: 'TypeScript', category: 'Languages', level: 5, created_at: '2023-01-01', updated_at: '2023-01-01' },
  { id: '3', name: 'Python', category: 'Languages', level: 4, created_at: '2023-01-01', updated_at: '2023-01-01' },
  { id: '4', name: 'React', category: 'Frontend', level: 5, created_at: '2023-01-01', updated_at: '2023-01-01' },
  { id: '5', name: 'Next.js', category: 'Frontend', level: 5, created_at: '2023-01-01', updated_at: '2023-01-01' },
  { id: '6', name: 'Tailwind CSS', category: 'Frontend', level: 4, created_at: '2023-01-01', updated_at: '2023-01-01' },
  { id: '7', name: 'Node.js', category: 'Backend', level: 5, created_at: '2023-01-01', updated_at: '2023-01-01' },
  { id: '8', name: 'PostgreSQL', category: 'Backend', level: 4, created_at: '2023-01-01', updated_at: '2023-01-01' },
  { id: '9', name: 'Docker', category: 'DevOps', level: 4, created_at: '2023-01-01', updated_at: '2023-01-01' },
  { id: '10', name: 'AWS', category: 'DevOps', level: 3, created_at: '2023-01-01', updated_at: '2023-01-01' },
  { id: '11', name: 'Arduino', category: 'IoT', level: 4, created_at: '2023-01-01', updated_at: '2023-01-01' },
  { id: '12', name: 'MQTT', category: 'IoT', level: 4, created_at: '2023-01-01', updated_at: '2023-01-01' },
];

async function getSkills() {
  try {
    const { data, error } = await supabase
      .from('skills')
      .select('*')
      .order('category')
      .order('level', { ascending: false });

    if (error) {
      console.log('Using default skills data');
      return defaultSkills;
    }

    return data || defaultSkills;
  } catch (error) {
    console.log('Using default skills data');
    return defaultSkills;
  }
}

function groupSkillsByCategory(skills: Skill[]) {
  return skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);
}

function SkillBar({ skill }: { skill: Skill }) {
  const percentage = (skill.level / 5) * 100;
  
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-foreground font-medium">{skill.name}</span>
        <span className="text-muted text-sm">{skill.level}/5</span>
      </div>
      <div className="w-full bg-gray-800 rounded-full h-2">
        <div
          className="bg-gradient-to-r from-accent to-highlight h-2 rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

export default async function SkillsPage() {
  const skills = await getSkills();
  const groupedSkills = groupSkillsByCategory(skills);
  const categories = Object.keys(groupedSkills);

  return (
    <div>
      <Section className="pt-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
            Skills & Expertise
          </h1>
          <p className="text-xl text-muted max-w-3xl mx-auto">
            A comprehensive overview of my technical skills, from programming languages to frameworks, tools, and specialized technologies.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {categories.map((category: string) => (
            <Card key={category} className="h-fit">
              <h3 className="text-xl font-bold text-foreground mb-6 flex items-center">
                <span className="w-3 h-3 bg-accent rounded-full mr-3"></span>
                {category}
              </h3>
              
              <div className="space-y-4">
                {groupedSkills[category].map((skill: Skill) => (
                  <SkillBar key={skill.id} skill={skill} />
                ))}
              </div>
            </Card>
          ))}
        </div>

        {categories.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted text-lg">No skills data found. Check back soon!</p>
          </div>
        )}

        {/* Skills Legend */}
        <div className="mt-16 text-center">
          <Card className="inline-block">
            <h4 className="text-lg font-semibold text-foreground mb-4">Proficiency Scale</h4>
            <div className="flex items-center justify-center space-x-8 text-sm text-muted">
              <span>1 - Beginner</span>
              <span>2 - Novice</span>
              <span>3 - Intermediate</span>
              <span>4 - Advanced</span>
              <span>5 - Expert</span>
            </div>
          </Card>
        </div>
      </Section>
    </div>
  );
}
