import React from 'react';
import Hero from '@/components/Hero';
import { supabase } from '@/lib/supabaseClient';

// Default data in case Supabase is not configured yet
const defaultProfile = {
  name: "Aean Gabrielle Tayawa",
  headline: "Full Stack Developer",
  bio: "Passionate developer specializing in modern web technologies, IoT solutions, and scalable applications. Building innovative solutions with React, Next.js, and cutting-edge technologies.",
  github_url: "https://github.com",
  linkedin_url: "https://linkedin.com",
  email: "hello@aean.dev"
};

async function getProfile() {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .single();

    if (error) {
      console.log('Using default profile data');
      return defaultProfile;
    }

    return data;
  } catch (error) {
    console.log('Using default profile data');
    return defaultProfile;
  }
}

export default async function Home() {
  const profile = await getProfile();

  return (
    <div>
      <Hero
        name={profile.name}
        headline={profile.headline}
        bio={profile.bio}
        githubUrl={profile.github_url}
        linkedinUrl={profile.linkedin_url}
        email={profile.email}
      />
    </div>
  );
}