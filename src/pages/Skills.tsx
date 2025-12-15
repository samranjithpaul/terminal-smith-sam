import React, { useState } from 'react';
import { TypeWriter } from '@/components/TypeWriter';
import { ProgressBar } from '@/components/ProgressBar';
import { SkillBar } from '@/components/SkillBar';
import { useGitHubLanguages } from '@/hooks/useGitHubLanguages';

// Static skill categories (manually configured)
const staticSkillCategories = [
  {
    category: 'Frameworks',
    skills: [
      { name: 'React / Next.js', level: 95 },
      { name: 'Node.js / Express', level: 90 },
      { name: 'Tailwind CSS', level: 92 },
      { name: 'FastAPI / Django', level: 85 },
    ],
  },
  {
    category: 'Tools',
    skills: [
      { name: 'Git / GitHub', level: 93 },
      { name: 'Docker / K8s', level: 82 },
      { name: 'CI/CD Pipelines', level: 85 },
      { name: 'AWS / Vercel', level: 88 },
    ],
  },
  {
    category: 'OS & Systems',
    skills: [
      { name: 'Linux / Unix', level: 90 },
      { name: 'Shell Scripting', level: 87 },
      { name: 'System Design', level: 85 },
      { name: 'Performance Opt', level: 88 },
    ],
  },
];

// Map relative usage to recruiter-friendly tier labels
const getTierFromUsage = (relativeUsage: number): { tier: string; level: number } => {
  if (relativeUsage >= 0.7) {
    return { tier: 'Expert', level: Math.round(90 + relativeUsage * 10) };
  } else if (relativeUsage >= 0.3) {
    return { tier: 'Proficient', level: Math.round(75 + relativeUsage * 20) };
  } else if (relativeUsage >= 0.1) {
    return { tier: 'Familiar', level: Math.round(60 + relativeUsage * 30) };
  } else {
    return { tier: 'Learning', level: Math.round(45 + relativeUsage * 50) };
  }
};

export default function Skills() {
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(0);
  const { languages, loading: languagesLoading, error: languagesError } = useGitHubLanguages();

  // Map languages to recruiter-friendly tiers based on usage
  const languageSkills = React.useMemo(() => {
    if (languages.length === 0) return [];
    
    const maxLevel = Math.max(...languages.map(l => l.level));
    
    return languages.map((lang) => {
      const relativeUsage = lang.level / maxLevel;
      const { tier, level } = getTierFromUsage(relativeUsage);
      
      return {
        name: lang.name,
        tier,
        level: Math.min(100, level),
      };
    });
  }, [languages]);

  const totalCategories = staticSkillCategories.length + 1; // +1 for Programming Languages

  return (
    <div className="space-y-6 sm:space-y-8 md:space-y-6 lg:space-y-8 animate-fade-in">
      {/* Command Output Header */}
      <div className="flex items-center gap-2 text-terminal-text-dim text-xs sm:text-sm lg:text-base mb-6 sm:mb-8 md:mb-6 lg:mb-8">
        <span className="text-terminal-accent">sam@terminal</span>
        <span className="text-terminal-accent">$</span>
        <TypeWriter
          text="list --skills --verbose"
          delay={50}
          showCursor={false}
          enableSound={false}
          onComplete={() => setTimeout(() => setLoadingComplete(true), 300)}
        />
      </div>

      {/* Loading Animation */}
      {loadingComplete && (
        <div className="space-y-2 sm:space-y-3 md:space-y-2 lg:space-y-3 pl-3 sm:pl-4 lg:pl-8 mb-6 sm:mb-8 md:mb-6 lg:mb-8">
          <div className="text-terminal-text-dim text-xs sm:text-sm lg:text-lg">
            <TypeWriter text="[INFO] Loading skill database..." delay={30} showCursor={false} enableSound={false} />
          </div>
          <div className="text-terminal-text-dim text-xs sm:text-sm lg:text-lg">
            <TypeWriter 
              text="[INFO] Fetching language stats from GitHub..." 
              delay={30} 
              showCursor={false} 
              enableSound={false} 
            />
          </div>
          <div className="text-terminal-accent-dim text-xs sm:text-sm lg:text-lg">
            <TypeWriter
              text="[OK] Skills loaded successfully."
              delay={30}
              showCursor={false}
              enableSound={false}
              onComplete={() => setCurrentCategory(totalCategories)}
            />
          </div>
        </div>
      )}

      {/* Skills Display */}
      {loadingComplete && (
        <div className="space-y-8 sm:space-y-10 md:space-y-8 lg:space-y-12 pl-3 sm:pl-4 lg:pl-8">
          
          {/* Programming Languages - Dynamic from GitHub */}
          <div
            className={`space-y-4 sm:space-y-5 md:space-y-4 lg:space-y-6 transition-all duration-500 ${
              currentCategory > 0 ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 mb-4 sm:mb-5 md:mb-4 lg:mb-6">
              <span className="text-terminal-accent terminal-glow font-semibold text-xs sm:text-sm md:text-base lg:text-xl xl:text-2xl">
                [PROGRAMMING LANGUAGES]
              </span>
              <span className="text-terminal-text-dim text-xs">
                (from GitHub repositories)
              </span>
              <div className="flex-1 h-px bg-terminal-border" />
            </div>

            <div className="space-y-3 sm:space-y-4 md:space-y-3 lg:space-y-4">
              {languagesLoading ? (
                <div className="text-terminal-text-dim text-xs sm:text-sm animate-pulse">
                  Fetching language data...
                </div>
              ) : languagesError ? (
                <div className="text-red-400 text-xs sm:text-sm">
                  Error: {languagesError}
                </div>
              ) : languageSkills.length === 0 ? (
                <div className="text-terminal-text-dim text-xs sm:text-sm">
                  No language data available.
                </div>
              ) : (
                languageSkills.map((lang) => (
                  <SkillBar
                    key={lang.name}
                    label={lang.name}
                    level={lang.level}
                    tier={lang.tier}
                    maxWidth={30}
                    animated={currentCategory > 0}
                    showPercentage={false}
                  />
                ))
              )}
            </div>
          </div>

          {/* Static Skill Categories */}
          {staticSkillCategories.map((category, catIndex) => (
            <div
              key={category.category}
              className={`space-y-4 sm:space-y-5 md:space-y-4 lg:space-y-6 transition-all duration-500 ${
                currentCategory > catIndex + 1 ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 mb-4 sm:mb-5 md:mb-4 lg:mb-6">
                <span className="text-terminal-accent terminal-glow font-semibold text-xs sm:text-sm md:text-base lg:text-xl xl:text-2xl">
                  [{category.category.toUpperCase()}]
                </span>
                <div className="flex-1 h-px bg-terminal-border" />
              </div>

              <div className="space-y-3 sm:space-y-4 md:space-y-3 lg:space-y-4">
                {category.skills.map((skill) => (
                  <ProgressBar
                    key={skill.name}
                    label={skill.name}
                    percentage={skill.level}
                    maxWidth={30}
                    animated={currentCategory > catIndex + 1}
                  />
                ))}
              </div>
            </div>
          ))}

          {/* Summary */}
          {currentCategory >= totalCategories && (
            <div className="pt-6 sm:pt-8 md:pt-6 lg:pt-10 border-t border-terminal-border space-y-2 sm:space-y-3 md:space-y-2 lg:space-y-4">
              <div className="text-terminal-text-dim text-xs sm:text-sm lg:text-lg xl:text-xl leading-relaxed">
                <TypeWriter
                  text="[SUMMARY] Language data pulled from GitHub. Other skills manually configured."
                  delay={20}
                  showCursor={false}
                  enableSound={false}
                />
              </div>
              <div className="text-terminal-accent-dim text-xs lg:text-base">
                Languages from GitHub: {languageSkills.length} | Manual skills: {staticSkillCategories.reduce((acc, cat) => acc + cat.skills.length, 0)}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
