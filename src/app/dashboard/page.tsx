'use client';

import React, { useState, useEffect } from 'react';
import { supabase, Project, Experience, Skill, Profile, Message } from '@/lib/supabaseClient';
import { signOut } from '@/lib/auth';
import Section from '@/components/Section';
import Card from '@/components/Card';
import Button from '@/components/Button';
import Modal from '@/components/Modal';
import ProjectForm from '@/components/ProjectForm';
import ProfileForm from '@/components/ProfileForm';
import ExperienceForm from '@/components/ExperienceForm';
import SkillForm from '@/components/SkillForm';
// ResumeSectionForm removed - using static resume.pdf instead
import Pagination from '@/components/Pagination';
import ProjectFilter from '@/components/ProjectFilter';

interface User {
  id: string;
  email?: string;
}

type ModalType = 'profile' | 'project' | 'experience' | 'skill' | null;

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'profile' | 'projects' | 'experience' | 'skills' | 'messages'>('profile');

  // Modal states
  const [modalType, setModalType] = useState<ModalType>(null);
  const [editingItem, setEditingItem] = useState<any>(null);

  // Data states
  const [profile, setProfile] = useState<Profile | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [experience, setExperience] = useState<Experience[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  // Resume sections removed - using static resume.pdf instead

  // Pagination and filtering states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [searchTerm, setSearchTerm] = useState('');
  const [workTypeFilter, setWorkTypeFilter] = useState('All');
  const [featuredFilter, setFeaturedFilter] = useState('All');

  useEffect(() => {
    checkUser();
    
    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setUser(session.user);
        loadData();
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkUser = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
        await loadData();
      }
    } catch (error) {
      console.error('Error checking user:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadData = async () => {
    try {
      // Load profile
      const { data: profileData } = await supabase.from('profiles').select('*').single();
      if (profileData) setProfile(profileData);

      // Load projects
      const { data: projectsData } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
      if (projectsData) setProjects(projectsData);

      // Load experience
      const { data: experienceData } = await supabase.from('experience').select('*').order('start_date', { ascending: false });
      if (experienceData) setExperience(experienceData);

      // Load skills
      const { data: skillsData } = await supabase.from('skills').select('*').order('category').order('name');
      if (skillsData) setSkills(skillsData);

      // Load messages
      const { data: messagesData } = await supabase.from('messages').select('*').order('created_at', { ascending: false });
      if (messagesData) setMessages(messagesData);

      // Resume sections removed - using static resume.pdf instead

    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      setUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const openModal = (type: ModalType, item?: any) => {
    setModalType(type);
    setEditingItem(item || null);
  };

  const closeModal = () => {
    setModalType(null);
    setEditingItem(null);
  };

  const handleSave = async () => {
    await loadData();
    closeModal();
  };

  const handleDelete = async (type: string, id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    try {
      console.log(`Deleting ${type} with id: ${id}`);
      const { error } = await supabase.from(type).delete().eq('id', id);
      
      if (error) {
        console.error('Supabase delete error:', error);
        throw error;
      }
      
      console.log(`Successfully deleted ${type} with id: ${id}`);
      await loadData();
    } catch (error) {
      console.error('Error deleting item:', error);
      alert(`Failed to delete ${type}. Error: ${error.message || 'Unknown error'}`);
    }
  };

  // Filter and paginate projects
  const getFilteredProjects = () => {
    let filtered = [...projects];

    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(project => 
        project.title.toLowerCase().includes(term) ||
        project.description_markdown.toLowerCase().includes(term) ||
        project.tech_stack.some(tech => tech.toLowerCase().includes(term))
      );
    }

    // Work type filter
    if (workTypeFilter !== 'All') {
      filtered = filtered.filter(project => project.work_type === workTypeFilter);
    }

    // Featured filter
    if (featuredFilter === 'Featured Only') {
      filtered = filtered.filter(project => project.featured);
    } else if (featuredFilter === 'Not Featured') {
      filtered = filtered.filter(project => !project.featured);
    }

    return filtered;
  };

  const getPaginatedProjects = () => {
    const filtered = getFilteredProjects();
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filtered.slice(startIndex, endIndex);
  };

  const getTotalPages = () => {
    const filtered = getFilteredProjects();
    return Math.ceil(filtered.length / itemsPerPage);
  };

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, workTypeFilter, featuredFilter]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setWorkTypeFilter('All');
    setFeaturedFilter('All');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
      </div>
    );
  }

  if (!user) {
    return <LoginForm />;
  }

  const tabs = [
    { id: 'profile', name: 'Profile', count: profile ? 1 : 0 },
    { id: 'projects', name: 'Projects', count: projects.length },
    { id: 'experience', name: 'Experience', count: experience.length },
    { id: 'skills', name: 'Skills', count: skills.length },
    { id: 'messages', name: 'Messages', count: messages.length },
    // Resume tab removed - using static resume.pdf instead
  ] as const;

  return (
    <div>
      <Section className="pt-24">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Admin Dashboard</h1>
            <p className="text-muted">Welcome back, {user.email}</p>
          </div>
          <Button onClick={handleSignOut} variant="secondary" size="sm">
            Sign Out
          </Button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-800 mb-8">
          <nav className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab: typeof tabs[number]) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'border-accent text-accent'
                    : 'border-transparent text-muted hover:text-foreground hover:border-gray-600'
                }`}
              >
                {tab.name} ({tab.count})
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'profile' && (
          <ProfileTab 
            profile={profile} 
            onEdit={() => openModal('profile', profile)} 
            onCreate={() => openModal('profile')} 
          />
        )}
        {activeTab === 'projects' && (
          <ProjectsTab 
            projects={getPaginatedProjects()} 
            totalProjects={getFilteredProjects().length}
            currentPage={currentPage}
            totalPages={getTotalPages()}
            onPageChange={handlePageChange}
            searchTerm={searchTerm}
            workTypeFilter={workTypeFilter}
            featuredFilter={featuredFilter}
            onSearchChange={setSearchTerm}
            onWorkTypeChange={setWorkTypeFilter}
            onFeaturedChange={setFeaturedFilter}
            onClearFilters={handleClearFilters}
            onEdit={(project) => openModal('project', project)} 
            onCreate={() => openModal('project')} 
            onDelete={(id) => handleDelete('projects', id)} 
          />
        )}
        {activeTab === 'experience' && (
          <ExperienceTab 
            experience={experience} 
            onEdit={(exp) => openModal('experience', exp)} 
            onCreate={() => openModal('experience')} 
            onDelete={(id) => handleDelete('experience', id)} 
          />
        )}
        {activeTab === 'skills' && (
          <SkillsTab 
            skills={skills} 
            onEdit={(skill) => openModal('skill', skill)} 
            onCreate={() => openModal('skill')} 
            onDelete={(id) => handleDelete('skills', id)} 
          />
        )}
        {activeTab === 'messages' && <MessagesTab messages={messages} onDelete={handleDelete} />}
        {/* Resume tab removed - using static resume.pdf instead */}

        {/* Modals */}
        <Modal
          isOpen={modalType === 'profile'}
          onClose={closeModal}
          title={editingItem ? 'Edit Profile' : 'Create Profile'}
          maxWidth="lg"
        >
          <ProfileForm
            profile={editingItem}
            onSave={handleSave}
            onCancel={closeModal}
          />
        </Modal>

        <Modal
          isOpen={modalType === 'project'}
          onClose={closeModal}
          title={editingItem ? 'Edit Project' : 'Create Project'}
          maxWidth="2xl"
        >
          <ProjectForm
            project={editingItem}
            onSave={handleSave}
            onCancel={closeModal}
          />
        </Modal>

        <Modal
          isOpen={modalType === 'experience'}
          onClose={closeModal}
          title={editingItem ? 'Edit Experience' : 'Add Experience'}
          maxWidth="lg"
        >
          <ExperienceForm
            experience={editingItem}
            onSave={handleSave}
            onCancel={closeModal}
          />
        </Modal>

        <Modal
          isOpen={modalType === 'skill'}
          onClose={closeModal}
          title={editingItem ? 'Edit Skill' : 'Add Skill'}
          maxWidth="md"
        >
          <SkillForm
            skill={editingItem}
            onSave={handleSave}
            onCancel={closeModal}
          />
        </Modal>

        {/* Resume modal removed - using static resume.pdf instead */}
      </Section>
    </div>
  );
}

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Section className="pt-24">
      <div className="max-w-md mx-auto">
        <Card>
          <h1 className="text-2xl font-bold text-foreground mb-6 text-center">Admin Login</h1>
          
          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-foreground font-medium mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-background border border-gray-700 rounded-lg focus:outline-none focus:border-accent text-foreground"
                required
              />
            </div>
            
            <div>
              <label className="block text-foreground font-medium mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-background border border-gray-700 rounded-lg focus:outline-none focus:border-accent text-foreground"
                required
              />
            </div>
            
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
        </Card>
      </div>
    </Section>
  );
}

// Enhanced tab components with CRUD functionality
function ProfileTab({ 
  profile, 
  onEdit, 
  onCreate 
}: { 
  profile: Profile | null, 
  onEdit: () => void, 
  onCreate: () => void 
}) {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-foreground">Profile Management</h2>
        {!profile && (
          <Button variant="primary" size="sm" onClick={onCreate}>
            Create Profile
          </Button>
        )}
      </div>
      
      {profile ? (
        <Card>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-foreground">{profile.name}</h3>
              <p className="text-accent">{profile.headline}</p>
            </div>
            <p className="text-muted">{profile.bio}</p>
            <div className="flex flex-wrap gap-4 text-sm text-muted">
              {profile.email && <span>📧 {profile.email}</span>}
              {profile.github_url && <span>🐙 GitHub</span>}
              {profile.linkedin_url && <span>💼 LinkedIn</span>}
            </div>
            <div className="pt-4">
              <Button variant="secondary" size="sm" onClick={onEdit}>
                Edit Profile
              </Button>
            </div>
          </div>
        </Card>
      ) : (
        <Card>
          <div className="text-center py-8">
            <p className="text-muted mb-4">No profile found. Create one to get started.</p>
            <Button variant="primary" size="sm" onClick={onCreate}>
              Create Profile
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}

function ProjectsTab({ 
  projects, 
  totalProjects,
  currentPage,
  totalPages,
  onPageChange,
  searchTerm,
  workTypeFilter,
  featuredFilter,
  onSearchChange,
  onWorkTypeChange,
  onFeaturedChange,
  onClearFilters,
  onEdit, 
  onCreate, 
  onDelete 
}: { 
  projects: Project[], 
  totalProjects: number,
  currentPage: number,
  totalPages: number,
  onPageChange: (page: number) => void,
  searchTerm: string,
  workTypeFilter: string,
  featuredFilter: string,
  onSearchChange: (value: string) => void,
  onWorkTypeChange: (value: string) => void,
  onFeaturedChange: (value: string) => void,
  onClearFilters: () => void,
  onEdit: (project: Project) => void, 
  onCreate: () => void, 
  onDelete: (id: string) => void 
}) {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-foreground">Projects Management ({totalProjects})</h2>
        <Button variant="primary" size="sm" onClick={onCreate}>
          Add Project
        </Button>
      </div>

      {/* Filters */}
      <ProjectFilter
        searchTerm={searchTerm}
        workTypeFilter={workTypeFilter}
        featuredFilter={featuredFilter}
        onSearchChange={onSearchChange}
        onWorkTypeChange={onWorkTypeChange}
        onFeaturedChange={onFeaturedChange}
        onClearFilters={onClearFilters}
        className="mb-6"
      />
      
      {/* Projects Grid */}
      <div className="grid gap-4 mb-6">
        {projects.map((project: Project) => (
          <Card key={project.id}>
            <div className="flex gap-4">
              {project.image_url && (
                <img
                  src={project.image_url}
                  alt={project.title}
                  className="w-24 h-16 object-cover rounded border border-gray-700 flex-shrink-0"
                />
              )}
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-foreground">{project.title}</h3>
                      {project.featured && (
                        <span className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-full">
                          Featured
                        </span>
                      )}
                    </div>
                    <p className="text-muted text-sm">{project.slug}</p>
                    {project.work_type && (
                      <span className="inline-block px-2 py-1 bg-highlight/10 text-highlight text-xs rounded mt-1">
                        {project.work_type}
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={() => onEdit(project)}>
                      Edit
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => onDelete(project.id)}>
                      Delete
                    </Button>
                  </div>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {project.tech_stack.slice(0, 3).map((tech: string) => (
                    <span key={tech} className="px-2 py-1 bg-accent/10 text-accent text-xs rounded">
                      {tech}
                    </span>
                  ))}
                  {project.tech_stack.length > 3 && (
                    <span className="px-2 py-1 bg-muted/10 text-muted text-xs rounded">
                      +{project.tech_stack.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
        
        {projects.length === 0 && (
          <Card>
            <div className="text-center py-8">
              <p className="text-muted mb-4">
                {totalProjects === 0 ? 'No projects yet. Create your first project!' : 'No projects match your current filters.'}
              </p>
              <div className="flex gap-2 justify-center">
                <Button variant="primary" size="sm" onClick={onCreate}>
                  Add Project
                </Button>
                {totalProjects > 0 && (
                  <Button variant="secondary" size="sm" onClick={onClearFilters}>
                    Clear Filters
                  </Button>
                )}
              </div>
            </div>
          </Card>
        )}
      </div>

      {/* Pagination */}
      {totalProjects > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
          itemsPerPage={6}
          totalItems={totalProjects}
        />
      )}
    </div>
  );
}

function ExperienceTab({ 
  experience, 
  onEdit, 
  onCreate, 
  onDelete 
}: { 
  experience: Experience[], 
  onEdit: (exp: Experience) => void, 
  onCreate: () => void, 
  onDelete: (id: string) => void 
}) {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-foreground">Experience Management</h2>
        <Button variant="primary" size="sm" onClick={onCreate}>
          Add Experience
        </Button>
      </div>
      
      <div className="grid gap-4">
        {experience.map((exp: Experience) => (
          <Card key={exp.id}>
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="font-bold text-foreground">{exp.role}</h3>
                <p className="text-accent">{exp.company}</p>
                <p className="text-muted text-sm">
                  {new Date(exp.start_date).getFullYear()} - {exp.end_date ? new Date(exp.end_date).getFullYear() : 'Present'}
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={() => onEdit(exp)}>
                  Edit
                </Button>
                <Button variant="ghost" size="sm" onClick={() => onDelete(exp.id)}>
                  Delete
                </Button>
              </div>
            </div>
          </Card>
        ))}
        
        {experience.length === 0 && (
          <Card>
            <div className="text-center py-8">
              <p className="text-muted mb-4">No experience entries yet. Add your work history!</p>
              <Button variant="primary" size="sm" onClick={onCreate}>
                Add Experience
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}

function SkillsTab({ 
  skills, 
  onEdit, 
  onCreate, 
  onDelete 
}: { 
  skills: Skill[], 
  onEdit: (skill: Skill) => void, 
  onCreate: () => void, 
  onDelete: (id: string) => void 
}) {
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-foreground">Skills Management</h2>
        <Button variant="primary" size="sm" onClick={onCreate}>
          Add Skill
        </Button>
      </div>
      
      <div className="grid gap-6">
        {Object.entries(groupedSkills).map(([category, categorySkills]: [string, Skill[]]) => (
          <Card key={category}>
            <h3 className="font-bold text-foreground mb-3">{category}</h3>
            <div className="grid gap-2">
              {categorySkills.map((skill: Skill) => (
                <div key={skill.id} className="flex justify-between items-center">
                  <div className="flex-1">
                    <span className="text-foreground">{skill.name}</span>
                    <div className="w-full bg-gray-700 rounded-full h-2 mt-1">
                      <div
                        className="bg-gradient-to-r from-accent to-highlight h-2 rounded-full"
                        style={{ width: `${(skill.level / 5) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <span className="text-muted text-sm">{skill.level}/5</span>
                    <Button variant="ghost" size="sm" onClick={() => onEdit(skill)}>
                      Edit
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => onDelete(skill.id)}>
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        ))}
        
        {skills.length === 0 && (
          <Card>
            <div className="text-center py-8">
              <p className="text-muted mb-4">No skills yet. Add your technical expertise!</p>
              <Button variant="primary" size="sm" onClick={onCreate}>
                Add Skill
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}

function MessagesTab({ messages, onDelete }: { messages: Message[], onDelete: (type: string, id: string) => void }) {
  return (
    <div>
      <h2 className="text-xl font-bold text-foreground mb-4">Messages ({messages.length})</h2>
      
      <div className="grid gap-4">
        {messages.map((message: Message) => (
          <Card key={message.id}>
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1">
                <h3 className="font-bold text-foreground">{message.name}</h3>
                <p className="text-accent text-sm">{message.email}</p>
                <span className="text-muted text-sm">
                  {new Date(message.created_at).toLocaleDateString()} at {new Date(message.created_at).toLocaleTimeString()}
                </span>
              </div>
              <div className="flex gap-2 ml-4">
                <a 
                  href={`mailto:${message.email}?subject=Re: Contact Form Message&body=Hi ${message.name},%0D%0A%0D%0AThank you for reaching out through my portfolio contact form.%0D%0A%0D%0AYour message:%0D%0A"${message.message}"%0D%0A%0D%0A`}
                  className="px-3 py-1 bg-accent/10 text-accent text-sm rounded-md hover:bg-accent/20 transition-colors"
                >
                  Reply
                </a>
                <button
                  onClick={() => onDelete('messages', message.id)}
                  className="px-3 py-1 bg-red-500/10 text-red-400 text-sm rounded-md hover:bg-red-500/20 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
            <div className="mt-3 p-3 bg-gray-800/50 rounded-md">
              <p className="text-muted whitespace-pre-wrap">{message.message}</p>
            </div>
          </Card>
        ))}
        
        {messages.length === 0 && (
          <Card>
            <p className="text-muted text-center">No messages yet.</p>
          </Card>
        )}
      </div>
    </div>
  );
}

// ResumeTab function removed - using static resume.pdf instead