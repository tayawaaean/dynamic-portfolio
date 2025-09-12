-- Fix RLS for resume_sections table
-- Run this in your Supabase SQL editor

-- Enable RLS for resume_sections table
ALTER TABLE resume_sections ENABLE ROW LEVEL SECURITY;

-- Create public read policy (only active sections)
CREATE POLICY "Public can read resume_sections" ON resume_sections 
FOR SELECT 
USING (is_active = true);

-- Verify the policies were created
SELECT * FROM pg_policies WHERE tablename = 'resume_sections';
