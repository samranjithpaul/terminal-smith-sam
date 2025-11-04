import React from 'react';
import { TypeWriter } from '@/components/TypeWriter';
import { Github, Linkedin, Mail, ExternalLink } from 'lucide-react';

export default function About() {
  return (
    <div className="space-y-6">
      {/* Command Output Header */}
      <div className="flex items-center gap-2 text-terminal-text-dim text-sm mb-6">
        <span className="text-terminal-accent">$</span>
        <TypeWriter text="cat about.txt" delay={50} showCursor={false} />
      </div>

      {/* Content */}
      <div className="space-y-6 pl-4">
        <div className="border-l-2 border-terminal-accent pl-4 space-y-4">
          <div className="text-terminal-text">
            <TypeWriter
              text="Full-stack developer. Building fast, scalable web applications."
              delay={30}
              showCursor={false}
            />
          </div>

          <div className="text-terminal-text-dim space-y-2">
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
        <div className="space-y-3 pt-6 border-t border-terminal-border">
          <div className="text-terminal-text-dim text-sm">
            <TypeWriter text="[LINKS]" delay={50} showCursor={false} />
          </div>
          
          <div className="space-y-2 pl-4">
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
                className="flex items-center gap-3 text-terminal-text-dim hover:text-terminal-accent transition-all group"
              >
                <Icon className="w-4 h-4 group-hover:terminal-glow" />
                <span className="text-terminal-accent-dim">{label}:</span>
                <span className="group-hover:terminal-glow">{handle}</span>
                <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            ))}
          </div>
        </div>

        {/* File Stats */}
        <div className="text-terminal-text-dim text-xs pt-4 border-t border-terminal-border">
          <span className="text-terminal-accent-dim">File:</span> about.txt | 
          <span className="text-terminal-accent-dim ml-2">Size:</span> 1.2KB | 
          <span className="text-terminal-accent-dim ml-2">Modified:</span> 2025-01-15
        </div>
      </div>
    </div>
  );
}
