import React from 'react';
import { TypeWriter } from '@/components/TypeWriter';
import { Github, Linkedin, Mail, ExternalLink } from 'lucide-react';

export default function About() {
  return (
    <div className="space-y-4 md:space-y-6 lg:space-y-8 animate-fade-in">
      {/* Command Output Header */}
      <div className="flex items-center gap-2 text-terminal-text-dim text-xs sm:text-sm lg:text-base mb-4 md:mb-6 lg:mb-8">
        <span className="text-terminal-accent">$</span>
        <TypeWriter text="cat about.txt" delay={50} showCursor={false} />
      </div>

      {/* Content */}
      <div className="space-y-4 md:space-y-6 lg:space-y-10 pl-2 sm:pl-4 lg:pl-8">
        <div className="border-l-2 lg:border-l-4 border-terminal-accent pl-3 sm:pl-4 lg:pl-8 space-y-3 md:space-y-4 lg:space-y-6 xl:space-y-8">
          <div className="text-terminal-text text-sm sm:text-base lg:text-2xl xl:text-3xl leading-relaxed">
            <TypeWriter
              text="Full-stack developer. Building fast, scalable web applications."
              delay={30}
              showCursor={false}
            />
          </div>

          <div className="text-terminal-text-dim text-xs sm:text-sm lg:text-xl xl:text-2xl space-y-2 md:space-y-3 lg:space-y-5 xl:space-y-6 leading-relaxed lg:leading-loose">
            <p>
              Specialized in modern web technologies. React, TypeScript, Node.js. Backend APIs,
              database design, cloud infrastructure.
            </p>
            <p>
              Focus on clean code, performance optimization, and user experience. Analytical
              approach to problem-solving. No-nonsense implementation.
            </p>
            <p>
              Experience with distributed systems, real-time applications, and complex data flows.
              Open-source contributor. Continuous learner.
            </p>
          </div>
        </div>

        {/* Social Links */}
        <div className="space-y-3 lg:space-y-5 pt-4 md:pt-6 lg:pt-10 border-t border-terminal-border">
          <div className="text-terminal-text-dim text-xs sm:text-sm lg:text-xl">
            <TypeWriter text="[LINKS]" delay={50} showCursor={false} />
          </div>
          
          <div className="space-y-2 lg:space-y-4 pl-2 sm:pl-4 lg:pl-8">
            {[
              { icon: Github, label: 'GitHub', url: 'https://github.com/samranjithpaul', handle: '@samranjithpaul' },
              { icon: Linkedin, label: 'LinkedIn', url: 'https://linkedin.com/in/samranjithpaul', handle: '/samranjithpaul' },
              { icon: Mail, label: 'Email', url: 'mailto:sam@example.com', handle: 'sam@example.com' },
            ].map(({ icon: Icon, label, url, handle }) => (
              <a
                key={label}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-wrap items-center gap-2 sm:gap-3 lg:gap-4 text-terminal-text-dim hover:text-terminal-accent transition-all group text-xs sm:text-sm lg:text-lg xl:text-xl"
              >
                <Icon className="w-3 h-3 sm:w-4 sm:h-4 lg:w-6 lg:h-6 group-hover:terminal-glow flex-shrink-0" />
                <span className="text-terminal-accent-dim">{label}:</span>
                <span className="group-hover:terminal-glow break-all">{handle}</span>
                <ExternalLink className="w-2.5 h-2.5 sm:w-3 sm:h-3 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
              </a>
            ))}
          </div>
        </div>

        {/* File Stats */}
        <div className="text-terminal-text-dim text-xs pt-3 md:pt-4 border-t border-terminal-border flex flex-wrap gap-1">
          <span className="text-terminal-accent-dim">File:</span> <span>about.txt</span>
          <span className="text-terminal-accent-dim ml-2">Size:</span> <span>1.2KB</span>
          <span className="text-terminal-accent-dim ml-2">Modified:</span> <span>2025-01-15</span>
        </div>
      </div>
    </div>
  );
}
