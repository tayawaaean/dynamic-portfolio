import React from 'react';
import Button from './Button';

interface HeroProps {
  name: string;
  headline: string;
  bio: string;
  githubUrl?: string;
  linkedinUrl?: string;
  email?: string;
}

export default function Hero({
  name,
  headline,
  bio,
  githubUrl,
  linkedinUrl,
  email
}: HeroProps) {
  return (
    <section className="min-h-[80vh] flex items-center justify-center bg-gradient-to-b from-background to-background/95">
      <div className="container-max px-4 sm:px-6 lg:px-8">
        <div className="text-center animate-fade-in">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            {name}
          </h1>
          
          <h2 className="text-xl sm:text-2xl lg:text-3xl text-accent font-semibold mb-6">
            {headline}
          </h2>
          
          <p className="text-lg sm:text-xl text-muted max-w-3xl mx-auto mb-8 leading-relaxed">
            {bio}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Button href="/projects" variant="primary" size="lg">
              View Projects
            </Button>
            <Button href="/contact" variant="secondary" size="lg">
              Get In Touch
            </Button>
            <a
              href="/resume.pdf"
              download="Aean_Gabrielle_Tayawa_Resume.pdf"
              className="inline-flex items-center justify-center px-8 py-4 bg-highlight text-white font-semibold rounded-lg hover:bg-highlight/90 transition-all duration-200 hover:scale-[1.02] min-w-[200px]"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download Resume
            </a>
          </div>
          
          <div className="flex items-center justify-center space-x-6">
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-highlight transition-colors duration-200 hover:scale-110 transform"
                aria-label="GitHub"
              >
                <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            )}
            
            {linkedinUrl && (
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-highlight transition-colors duration-200 hover:scale-110 transform"
                aria-label="LinkedIn"
              >
                <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            )}
            
            {email && (
              <a
                href={`mailto:${email}`}
                className="text-muted hover:text-highlight transition-colors duration-200 hover:scale-110 transform"
                aria-label="Email"
              >
                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

