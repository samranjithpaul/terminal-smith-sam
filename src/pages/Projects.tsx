import React, { useState } from 'react';
import { TypeWriter } from '@/components/TypeWriter';
import { ExternalLink, Github, ChevronRight, Star, RefreshCw, Loader2 } from 'lucide-react';
import { terminalSounds } from '@/utils/sounds';
import { useGitHubStarred } from '@/hooks/useGitHubStarred';

// Language color mapping for visual consistency
const languageColors: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f7df1e',
  Python: '#3572A5',
  Java: '#b07219',
  Go: '#00ADD8',
  Rust: '#dea584',
  Ruby: '#701516',
  PHP: '#4F5D95',
  C: '#555555',
  'C++': '#f34b7d',
  'C#': '#239120',
  Swift: '#ffac45',
  Kotlin: '#A97BFF',
  Dart: '#00B4AB',
  Vue: '#41b883',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Shell: '#89e051',
  Dockerfile: '#384d54',
};

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'today';
  if (diffDays === 1) return 'yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
}

export default function Projects() {
  const [expandedProject, setExpandedProject] = useState<number | null>(null);
  const [showProjects, setShowProjects] = useState(false);
  const { repos, loading, error, refetch } = useGitHubStarred();

  return (
    <div className="space-y-6 sm:space-y-8 md:space-y-6 lg:space-y-8 animate-fade-in">
      {/* Command Output Header */}
      <div className="flex items-center gap-2 text-terminal-text-dim text-xs sm:text-sm lg:text-base mb-6 sm:mb-8 md:mb-6 lg:mb-8">
        <span className="text-terminal-accent">sam@terminal</span>
        <span className="text-terminal-accent">$</span>
        <TypeWriter
          text="fetch github --starred --limit=8"
          delay={50}
          showCursor={false}
          enableSound={false}
          onComplete={() => setTimeout(() => setShowProjects(true), 300)}
        />
      </div>

      {/* Loading State */}
      {showProjects && loading && (
        <div className="flex items-center gap-3 pl-3 sm:pl-4 lg:pl-8 text-terminal-text-dim">
          <Loader2 className="w-4 h-4 lg:w-5 lg:h-5 animate-spin text-terminal-accent" />
          <span className="text-xs sm:text-sm lg:text-lg">Fetching starred repositories...</span>
        </div>
      )}

      {/* Error State */}
      {showProjects && error && !loading && (
        <div className="pl-3 sm:pl-4 lg:pl-8 space-y-4">
          <div className="text-red-400 text-xs sm:text-sm lg:text-lg">
            Error: {error}
          </div>
          <button
            onClick={() => {
              terminalSounds.playClick();
              refetch();
            }}
            className="flex items-center gap-2 text-terminal-accent hover:text-terminal-accent/80 transition-colors text-xs sm:text-sm lg:text-lg"
          >
            <RefreshCw className="w-3 h-3 lg:w-4 lg:h-4" />
            <span>Retry</span>
          </button>
        </div>
      )}

      {/* Repository Listing */}
      {showProjects && !loading && !error && (
        <div className="space-y-5 sm:space-y-6 md:space-y-4 lg:space-y-6 xl:space-y-8 pl-3 sm:pl-4 lg:pl-8">
          <div className="flex items-center justify-between">
            <div className="text-terminal-text-dim text-xs sm:text-sm lg:text-lg xl:text-xl">
              <TypeWriter
                text={`total ${repos.length} starred repositories`}
                delay={30}
                showCursor={false}
                enableSound={false}
              />
            </div>
            <button
              onClick={() => {
                terminalSounds.playClick();
                refetch();
              }}
              className="flex items-center gap-1.5 text-terminal-text-dim hover:text-terminal-accent transition-colors text-xs lg:text-sm"
              title="Refresh"
            >
              <RefreshCw className="w-3 h-3 lg:w-4 lg:h-4" />
            </button>
          </div>

          {repos.map((repo) => {
            const isExpanded = expandedProject === repo.id;

            return (
              <div key={repo.id} className="space-y-4 sm:space-y-5 md:space-y-3 lg:space-y-4">
                {/* Repository Header */}
                <button
                  onClick={() => {
                    terminalSounds.playClick();
                    setExpandedProject(isExpanded ? null : repo.id);
                  }}
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
                        {repo.name}/
                      </span>
                      <div className="flex items-center gap-2 text-terminal-text-dim text-xs lg:text-base">
                        <Star className="w-3 h-3 lg:w-4 lg:h-4 text-yellow-500" />
                        <span>{repo.stargazers_count}</span>
                      </div>
                      {repo.language && (
                        <span 
                          className="flex items-center gap-1.5 text-xs lg:text-sm"
                          style={{ color: languageColors[repo.language] || '#888' }}
                        >
                          <span 
                            className="w-2 h-2 lg:w-3 lg:h-3 rounded-full"
                            style={{ backgroundColor: languageColors[repo.language] || '#888' }}
                          />
                          {repo.language}
                        </span>
                      )}
                    </div>
                    <p className="text-terminal-text-dim text-xs sm:text-sm lg:text-lg xl:text-xl leading-relaxed">
                      {repo.description}
                    </p>
                  </div>
                </button>

                {/* Expanded Content */}
                {isExpanded && (
                  <div className="pl-6 sm:pl-10 lg:pl-16 space-y-5 sm:space-y-6 md:space-y-4 lg:space-y-6 animate-fade-in">
                    {/* Repository Details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <div className="text-terminal-accent-dim text-xs sm:text-sm lg:text-lg mb-2 lg:mb-3">Owner:</div>
                        <div className="flex items-center gap-2">
                          <img 
                            src={repo.owner.avatar_url} 
                            alt={repo.owner.login}
                            className="w-6 h-6 lg:w-8 lg:h-8 rounded-full border border-terminal-border"
                          />
                          <span className="text-terminal-text text-xs sm:text-sm lg:text-base">
                            {repo.owner.login}
                          </span>
                        </div>
                      </div>
                      <div>
                        <div className="text-terminal-accent-dim text-xs sm:text-sm lg:text-lg mb-2 lg:mb-3">Updated:</div>
                        <span className="text-terminal-text text-xs sm:text-sm lg:text-base">
                          {formatDate(repo.updated_at)}
                        </span>
                      </div>
                    </div>

                    {/* Topics */}
                    {repo.topics && repo.topics.length > 0 && (
                      <div>
                        <div className="text-terminal-accent-dim text-xs sm:text-sm lg:text-lg mb-2 lg:mb-3">Topics:</div>
                        <div className="flex flex-wrap gap-1.5 sm:gap-2 lg:gap-3">
                          {repo.topics.map((topic) => (
                            <span
                              key={topic}
                              className="px-2 py-1 lg:px-4 lg:py-2 text-xs lg:text-base bg-terminal-surface text-terminal-text border border-terminal-border rounded"
                            >
                              {topic}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Links */}
                    <div className="flex flex-wrap gap-3 sm:gap-4 lg:gap-6">
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 sm:gap-2 lg:gap-3 text-terminal-text-dim hover:text-terminal-accent transition-all group"
                      >
                        <Github className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 group-hover:terminal-glow flex-shrink-0" />
                        <span className="text-xs sm:text-sm lg:text-lg">View on GitHub</span>
                        <ExternalLink className="w-2.5 h-2.5 sm:w-3 sm:h-3 lg:w-4 lg:h-4 flex-shrink-0" />
                      </a>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {/* Summary */}
          <div className="pt-6 sm:pt-8 md:pt-6 lg:pt-10 border-t border-terminal-border text-terminal-text-dim text-xs sm:text-sm lg:text-lg xl:text-xl leading-relaxed">
            <TypeWriter
              text="Displaying starred repositories from GitHub. Click to expand details."
              delay={20}
              showCursor={false}
              enableSound={false}
            />
          </div>
        </div>
      )}
    </div>
  );
}
