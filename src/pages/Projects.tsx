import React, { useState } from 'react';
import { TypeWriter } from '@/components/TypeWriter';
import { ExternalLink, Github, ChevronRight } from 'lucide-react';

const projects = [
  {
    id: 'realtime-collab',
    name: 'realtime-collab-platform',
    description: 'Real-time collaborative workspace with WebSocket architecture. Multiplayer text editing, live cursors, presence awareness.',
    tech: ['React', 'Node.js', 'Socket.io', 'Redis', 'PostgreSQL'],
    github: 'https://github.com/samranjithpaul/realtime-collab',
    live: 'https://collab-demo.example.com',
    buildLog: [
      'Installing dependencies... ✓',
      'Compiling TypeScript... ✓',
      'Building WebSocket server... ✓',
      'Optimizing production build... ✓',
      'Deploy complete.',
    ],
  },
  {
    id: 'api-gateway',
    name: 'distributed-api-gateway',
    description: 'Microservices API gateway with rate limiting, authentication, and service discovery. Handles 10k+ req/sec.',
    tech: ['Node.js', 'Express', 'Redis', 'Docker', 'Nginx'],
    github: 'https://github.com/samranjithpaul/api-gateway',
    live: null,
    buildLog: [
      'Initializing Docker containers... ✓',
      'Configuring load balancer... ✓',
      'Setting up Redis cluster... ✓',
      'Health check passed... ✓',
    ],
  },
  {
    id: 'ml-pipeline',
    name: 'ml-data-pipeline',
    description: 'ETL pipeline for ML model training. Automated data ingestion, transformation, and model deployment.',
    tech: ['Python', 'Airflow', 'PostgreSQL', 'AWS S3', 'Scikit-learn'],
    github: 'https://github.com/samranjithpaul/ml-pipeline',
    live: null,
    buildLog: [
      'Validating data sources... ✓',
      'Running transformation jobs... ✓',
      'Training model... ✓',
      'Model accuracy: 94.2%... ✓',
    ],
  },
  {
    id: 'terminal-portfolio',
    name: 'terminal-portfolio',
    description: 'This portfolio. Terminal-themed developer showcase with live command execution and theme switching.',
    tech: ['React', 'TypeScript', 'Tailwind', 'Framer Motion'],
    github: 'https://github.com/samranjithpaul/portfolio',
    live: 'https://samranjithpaul.dev',
    buildLog: [
      'Compiling React components... ✓',
      'Optimizing assets... ✓',
      'Building production bundle... ✓',
      'Deployed to Vercel... ✓',
    ],
  },
];

export default function Projects() {
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  const [showProjects, setShowProjects] = useState(false);

  return (
    <div className="space-y-4 md:space-y-6 lg:space-y-8 animate-fade-in max-w-6xl mx-auto">
      {/* Command Output Header */}
      <div className="flex items-center gap-2 text-terminal-text-dim text-xs sm:text-sm lg:text-base mb-4 md:mb-6 lg:mb-8">
        <span className="text-terminal-accent">$</span>
        <TypeWriter
          text="show projects --detailed"
          delay={50}
          showCursor={false}
          onComplete={() => setTimeout(() => setShowProjects(true), 300)}
        />
      </div>

      {/* Directory Listing */}
      {showProjects && (
        <div className="space-y-3 md:space-y-4 lg:space-y-6 xl:space-y-8 pl-2 sm:pl-4 lg:pl-8">
          <div className="text-terminal-text-dim text-xs sm:text-sm lg:text-lg xl:text-xl mb-3 md:mb-4 lg:mb-6">
            <TypeWriter
              text={`total ${projects.length} projects`}
              delay={30}
              showCursor={false}
            />
          </div>

          {projects.map((project) => {
            const isExpanded = expandedProject === project.id;

            return (
              <div key={project.id} className="space-y-3 lg:space-y-4">
                {/* Project Header */}
                <button
                  onClick={() => setExpandedProject(isExpanded ? null : project.id)}
                  className="w-full flex items-start gap-2 sm:gap-3 lg:gap-5 text-left group hover:bg-terminal-surface p-2 sm:p-3 lg:p-5 xl:p-6 rounded transition-all"
                >
                  <ChevronRight
                    className={`w-3 h-3 sm:w-4 sm:h-4 lg:w-6 lg:h-6 text-terminal-accent-dim mt-1 flex-shrink-0 transition-transform ${
                      isExpanded ? 'rotate-90' : ''
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 lg:gap-3 mb-1 lg:mb-2">
                      <span className="text-terminal-accent terminal-glow font-semibold text-sm sm:text-base lg:text-2xl xl:text-3xl break-all">
                        {project.name}/
                      </span>
                      <span className="text-terminal-text-dim text-xs lg:text-base xl:text-lg flex-shrink-0">
                        [{project.tech.length} tech]
                      </span>
                    </div>
                    <p className="text-terminal-text-dim text-xs sm:text-sm lg:text-lg xl:text-xl leading-relaxed">{project.description}</p>
                  </div>
                </button>

                {/* Expanded Content */}
                {isExpanded && (
                  <div className="pl-5 sm:pl-10 lg:pl-16 space-y-3 md:space-y-4 lg:space-y-6 animate-fade-in">
                    {/* Tech Stack */}
                    <div>
                      <div className="text-terminal-accent-dim text-xs sm:text-sm lg:text-lg mb-2 lg:mb-3">Tech Stack:</div>
                      <div className="flex flex-wrap gap-1.5 sm:gap-2 lg:gap-3">
                        {project.tech.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 lg:px-4 lg:py-2 text-xs lg:text-base bg-terminal-surface text-terminal-text border border-terminal-border rounded"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Build Log */}
                    <div>
                      <div className="text-terminal-accent-dim text-xs sm:text-sm lg:text-lg mb-2 lg:mb-3">Build Log:</div>
                      <div className="bg-terminal-surface p-2 sm:p-3 lg:p-5 rounded border border-terminal-border space-y-1 lg:space-y-2">
                        {project.buildLog.map((log, i) => (
                          <div key={i} className="text-terminal-text-dim text-xs lg:text-base font-mono break-all">
                            <TypeWriter text={log} delay={20} showCursor={false} />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Links */}
                    <div className="flex flex-wrap gap-3 sm:gap-4 lg:gap-6">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 sm:gap-2 lg:gap-3 text-terminal-text-dim hover:text-terminal-accent transition-all group"
                      >
                        <Github className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 group-hover:terminal-glow flex-shrink-0" />
                        <span className="text-xs sm:text-sm lg:text-lg">Source</span>
                        <ExternalLink className="w-2.5 h-2.5 sm:w-3 sm:h-3 lg:w-4 lg:h-4 flex-shrink-0" />
                      </a>
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 sm:gap-2 lg:gap-3 text-terminal-text-dim hover:text-terminal-accent transition-all group"
                        >
                          <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 group-hover:terminal-glow flex-shrink-0" />
                          <span className="text-xs sm:text-sm lg:text-lg">Live Demo</span>
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {/* Summary */}
          <div className="pt-4 md:pt-6 lg:pt-10 border-t border-terminal-border text-terminal-text-dim text-xs sm:text-sm lg:text-lg xl:text-xl leading-relaxed">
            <TypeWriter
              text="Use arrow keys or click to expand project details. All source code available on GitHub."
              delay={20}
              showCursor={false}
            />
          </div>
        </div>
      )}
    </div>
  );
}
