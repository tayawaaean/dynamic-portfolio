import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables from .env.local (fallback to .env)
dotenv.config({ path: '.env.local' });
dotenv.config();

// Make sure to set these environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing required environment variables: NEXT_PUBLIC_SUPABASE_URL and/or SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Resume data based on typical portfolio structure
const resumeData = {
  profile: {
    name: "Aean Gabrielle Tayawa",
    headline: "Full Stack Developer & IoT Specialist",
    bio: "Passionate full-stack developer with expertise in modern web technologies, IoT solutions, and scalable applications. Experienced in React, Next.js, Node.js, and embedded systems development.",
    github_url: "https://github.com/aean-dev",
    linkedin_url: "https://linkedin.com/in/aean-tayawa",
    email: "hello@aean.dev"
  },
  
  projects: [
    {
      title: "Smart IoT Dashboard",
      slug: "smart-iot-dashboard",
      description_markdown: `# Smart IoT Dashboard

A comprehensive IoT monitoring and control system built with modern web technologies.

## Features
- Real-time sensor data visualization
- Device control and automation
- Historical data analysis
- Mobile-responsive design

## Technical Implementation
Built using React, Node.js, and MQTT for real-time communication with IoT devices.`,
      tech_stack: ["React", "Node.js", "TypeScript", "MQTT", "MongoDB", "Chart.js"],
      repo_url: "https://github.com/aean-dev/smart-iot-dashboard",
      live_url: "https://iot-dashboard.aean.dev",
      image_url: null,
      work_type: "Personal",
      featured: true
    },
    {
      title: "E-Commerce Platform",
      slug: "ecommerce-platform",
      description_markdown: `# Modern E-Commerce Platform

Full-featured e-commerce solution with modern UI and robust backend.

## Features
- Product catalog with search and filtering
- Shopping cart and checkout process
- User authentication and profiles
- Admin dashboard for inventory management

## Technology Stack
Built with Next.js, Stripe for payments, and PostgreSQL for data persistence.`,
      tech_stack: ["Next.js", "TypeScript", "PostgreSQL", "Stripe", "Tailwind CSS"],
      repo_url: "https://github.com/aean-dev/ecommerce-platform",
      live_url: "https://shop.aean.dev",
      image_url: null,
      work_type: "Client",
      featured: true
    },
    {
      title: "Task Management App",
      slug: "task-management-app",
      description_markdown: `# Collaborative Task Management

A productivity app for teams to manage projects and tasks efficiently.

## Features
- Kanban board interface
- Team collaboration tools
- Time tracking and reporting
- Mobile app companion

## Technical Details
Built with React Native for mobile and React for web, sharing business logic.`,
      tech_stack: ["React", "React Native", "Node.js", "PostgreSQL", "Socket.io"],
      repo_url: "https://github.com/aean-dev/task-manager",
      image_url: null,
      work_type: "Open Source",
      featured: false
    }
  ],
  
  experience: [
    {
      company: "TechCorp Solutions",
      role: "Senior Full Stack Developer",
      start_date: "2022-01-01",
      end_date: null,
      description_markdown: `## Key Responsibilities
- Lead development of customer-facing web applications
- Architect and implement scalable backend services
- Mentor junior developers and conduct code reviews
- Collaborate with product team on feature planning

## Achievements
- Reduced application load time by 40% through optimization
- Led migration to microservices architecture
- Implemented CI/CD pipeline reducing deployment time by 60%`
    },
    {
      company: "Innovation Labs",
      role: "Full Stack Developer",
      start_date: "2020-06-01",
      end_date: "2021-12-31",
      description_markdown: `## Key Responsibilities
- Developed IoT solutions for smart home applications
- Built RESTful APIs and real-time communication systems
- Implemented responsive web interfaces
- Integrated with various IoT protocols (MQTT, CoAP)

## Projects
- Smart home automation system
- Environmental monitoring dashboard
- Mobile companion applications`
    },
    {
      company: "StartupXYZ",
      role: "Junior Developer",
      start_date: "2019-01-01",
      end_date: "2020-05-31",
      description_markdown: `## Key Responsibilities
- Contributed to web application development
- Assisted in database design and optimization
- Participated in agile development processes
- Learned modern development practices and tools

## Growth Areas
- Frontend development with React
- Backend development with Node.js
- Database management and optimization`
    }
  ],
  
  skills: [
    // Languages
    { name: "JavaScript", category: "Languages", level: 5 },
    { name: "TypeScript", category: "Languages", level: 5 },
    { name: "Python", category: "Languages", level: 4 },
    { name: "C++", category: "Languages", level: 3 },
    { name: "SQL", category: "Languages", level: 4 },
    
    // Frontend
    { name: "React", category: "Frontend", level: 5 },
    { name: "Next.js", category: "Frontend", level: 5 },
    { name: "Vue.js", category: "Frontend", level: 3 },
    { name: "Tailwind CSS", category: "Frontend", level: 4 },
    { name: "HTML/CSS", category: "Frontend", level: 5 },
    
    // Backend
    { name: "Node.js", category: "Backend", level: 5 },
    { name: "Express.js", category: "Backend", level: 4 },
    { name: "PostgreSQL", category: "Backend", level: 4 },
    { name: "MongoDB", category: "Backend", level: 3 },
    { name: "Redis", category: "Backend", level: 3 },
    
    // DevOps & Tools
    { name: "Docker", category: "DevOps", level: 4 },
    { name: "AWS", category: "DevOps", level: 3 },
    { name: "Git", category: "DevOps", level: 5 },
    { name: "CI/CD", category: "DevOps", level: 4 },
    { name: "Linux", category: "DevOps", level: 4 },
    
    // IoT
    { name: "Arduino", category: "IoT", level: 4 },
    { name: "Raspberry Pi", category: "IoT", level: 4 },
    { name: "MQTT", category: "IoT", level: 4 },
    { name: "Sensor Integration", category: "IoT", level: 4 },
    { name: "Embedded C", category: "IoT", level: 3 }
  ]
};

async function seedDatabase() {
  try {
    console.log('Starting database seeding...');
    
    // Clear existing data
    console.log('Clearing existing data...');
    await supabase.from('skills').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('experience').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('projects').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('profiles').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    
    // Insert profile
    console.log('Inserting profile...');
    const { error: profileError } = await supabase
      .from('profiles')
      .insert([resumeData.profile]);
    
    if (profileError) {
      console.error('Error inserting profile:', profileError);
      throw profileError;
    }
    
    // Insert projects
    console.log('Inserting projects...');
    const { error: projectsError } = await supabase
      .from('projects')
      .insert(resumeData.projects);
    
    if (projectsError) {
      console.error('Error inserting projects:', projectsError);
      throw projectsError;
    }
    
    // Insert experience
    console.log('Inserting experience...');
    const { error: experienceError } = await supabase
      .from('experience')
      .insert(resumeData.experience);
    
    if (experienceError) {
      console.error('Error inserting experience:', experienceError);
      throw experienceError;
    }
    
    // Insert skills
    console.log('Inserting skills...');
    const { error: skillsError } = await supabase
      .from('skills')
      .insert(resumeData.skills);
    
    if (skillsError) {
      console.error('Error inserting skills:', skillsError);
      throw skillsError;
    }
    
    console.log('✅ Database seeded successfully!');
    console.log(`
Seeded:
- 1 profile
- ${resumeData.projects.length} projects
- ${resumeData.experience.length} experience entries
- ${resumeData.skills.length} skills
    `);
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seed function
seedDatabase();
