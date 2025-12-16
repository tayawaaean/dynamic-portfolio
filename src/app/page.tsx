import React from 'react';
import Hero from '@/components/Hero';
import { supabase } from '@/lib/supabaseClient';

// Enable Incremental Static Regeneration - revalidate every 60 seconds
// This ensures the page updates within 1 minute of admin changes without needing redeployment
export const revalidate = 60;

// Default data in case Supabase is not configured yet
const defaultProfile = {
  name: "Aean Gabrielle D. Tayawa",
  headline: "Remote Full Stack Developer based in Ilocos Norte, Philippines",
  bio: "Full Stack Developer based in Ilocos Norte, Philippines, building modern web and IoT solutions for international clients and remote teams worldwide using React, Next.js, TypeScript, and cloud-native technologies.",
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