'use client';

import React, { useState, useEffect } from 'react';
import Section from '@/components/Section';
import Card from '@/components/Card';
import Button from '@/components/Button';
import { supabase, Profile } from '@/lib/supabaseClient';

interface FormData {
  name: string;
  email: string;
  message: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [profile, setProfile] = useState<Profile | null>(null);

  // Default profile data
  const defaultProfile: Profile = {
    id: '1',
    name: 'Aean Gabrielle Tayawa',
    headline: 'Full Stack Developer & IoT Engineer',
    bio: 'Passionate about creating innovative solutions that bridge the gap between hardware and software.',
    github_url: 'https://github.com/aean-dev',
    linkedin_url: 'https://linkedin.com/in/aean-tayawa',
    email: 'hello@aean.dev',
    created_at: '2023-01-01',
    updated_at: '2023-01-01'
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .single();

        if (error) {
          console.log('Using default profile data');
          setProfile(defaultProfile);
        } else {
          setProfile(data || defaultProfile);
        }
      } catch (error) {
        console.log('Using default profile data');
        setProfile(defaultProfile);
      }
    };

    fetchProfile();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Section className="pt-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
            Get In Touch
          </h1>
          <p className="text-xl text-muted max-w-3xl mx-auto">
            Have a project in mind or need a remote Full Stack Developer? Whether you're based in Ilocos Norte, elsewhere in the Philippines, or anywhere in the world, I'd love to hear from you.
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div>
            <Card>
              <h3 className="text-xl font-bold text-foreground mb-6">
                Let's Connect
              </h3>
              
              {profile && (
                <div className="space-y-6">
                  {profile.email && (
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mr-4">
                        <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">Email</h4>
                        <a href={`mailto:${profile.email}`} className="text-muted hover:text-accent transition-colors">
                          {profile.email}
                        </a>
                      </div>
                    </div>
                  )}

                  {profile.github_url && (
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-highlight/10 rounded-lg flex items-center justify-center mr-4">
                        <svg className="w-6 h-6 text-highlight" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">GitHub</h4>
                        <a href={profile.github_url} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-highlight transition-colors">
                          {profile.github_url.replace('https://', '')}
                        </a>
                      </div>
                    </div>
                  )}

                  {profile.linkedin_url && (
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mr-4">
                        <svg className="w-6 h-6 text-accent" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">LinkedIn</h4>
                        <a href={profile.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-accent transition-colors">
                          {profile.linkedin_url.replace('https://', '')}
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="mt-8 pt-6 border-t border-gray-800">
                <h4 className="font-semibold text-foreground mb-3">Response Time</h4>
                <p className="text-muted text-sm">
                  I typically respond to messages within 24 hours. For urgent inquiries, 
                  feel free to reach out via email directly.
                </p>
              </div>
            </Card>
          </div>

          {/* Contact Form */}
          <div>
            <Card>
              <h3 className="text-xl font-bold text-foreground mb-6">
                Send Message
              </h3>

              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-highlight/10 border border-highlight/20 rounded-lg">
                  <p className="text-highlight font-medium">
                    ✅ Message sent successfully! I'll get back to you soon.
                  </p>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <p className="text-red-400 font-medium">
                    ❌ Failed to send message. Please try again or email me directly.
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-foreground font-medium mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-background border border-gray-700 rounded-lg focus:outline-none focus:border-accent text-foreground placeholder-muted"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-foreground font-medium mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-background border border-gray-700 rounded-lg focus:outline-none focus:border-accent text-foreground placeholder-muted"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-foreground font-medium mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-background border border-gray-700 rounded-lg focus:outline-none focus:border-accent text-foreground placeholder-muted resize-vertical"
                    placeholder="Tell me about your project, idea, or just say hello..."
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  variant="primary"
                  size="lg"
                  className="w-full"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </Section>
    </div>
  );
}

