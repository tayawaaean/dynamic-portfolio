import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Profile {
  id: string
  name: string
  headline: string
  bio: string
  github_url?: string
  linkedin_url?: string
  email?: string
  created_at: string
  updated_at: string
}

export interface Project {
  id: string
  title: string
  slug: string
  description_markdown: string
  tech_stack: string[]
  repo_url?: string
  live_url?: string
  image_url?: string
  work_type?: string
  featured: boolean
  created_at: string
  updated_at: string
}

export interface Experience {
  id: string
  company: string
  role: string
  start_date: string
  end_date?: string | null
  description_markdown: string
  created_at: string
  updated_at: string
}

export interface Skill {
  id: string
  name: string
  category: string
  level: number
  created_at: string
  updated_at: string
}

export interface Message {
  id: string
  name: string
  email: string
  message: string
  created_at: string
}

// ResumeSection interface removed - using static resume.pdf instead
