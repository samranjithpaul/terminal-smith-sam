import React, { useState, useMemo } from 'react';
import { TypeWriter } from '@/components/TypeWriter';
import { ProgressBar } from '@/components/ProgressBar';
import { useGitHubLanguages } from '@/hooks/useGitHubLanguages';

// Core Skills - Manual, authoritative (skills I want to be hired for)
const coreSkills = [
  { name: 'TypeScript / JavaScript', level: 92 },
  { name: 'Python', level: 88 },
  { name: 'React / Next.js', level: 90 },
  { name: 'Node.js / Express', level: 85 },
  { name: 'Databases / APIs', level: 83 },
  { name: 'C++ / C', level: 79 },
  { name: 'Java', level: 76 },
];

// Other skill categories (manually configured)
const otherSkillCategories = [
  {
    category: 'Frameworks & Libraries',
    skills: [
      { name: 'Tailwind CSS', level: 90 },
      { name: 'FastAPI / Django', level: 82 },
      { name: 'Docker / K8s', level: 78 },
    ],
  },
  {
    category: 'Tools & DevOps',
    skills: [
      { name: 'Git / GitHub', level: 93 },
      { name: 'CI/CD Pipelines', level: 83 },
      { name: 'AWS / Vercel', level: 85 },
    ],
  },
  {
    category: 'Systems',
    skills: [
      { name: 'Linux / Unix', level: 88 },
      { name: 'Shell Scripting', level: 84 },
      { name: 'System Design', level: 80 },
    ],
  },
];

// Map relative usage to confidence values (70-100) with natural variation
function mapToConfidence(languages: { name: string; level: number }[]): { name: string; level: number }[] {
  if (languages.length === 0) return [];
  
  const maxLevel = Math.max(...languages.map(l => l.level));
  
  return languages.map((lang, index) => {
    const ratio = lang.level / maxLevel;
    let confidence: number;
    
    // Create natural tiers with variation
    if (ratio >= 0.8) {
      // Dominant: 94-98
      confidence = 94 + Math.round((ratio - 0.8) * 20);
    } else if (ratio >= 0.4) {
      // Primary: 85-93
      confidence = 85 + Math.round((ratio - 0.4) * 20);
    } else if (ratio >= 0.15) {
      // Regular: 78-84
      confidence = 78 + Math.round((ratio - 0.15) * 24);
    } else {
      // Familiar: 70-77
      confidence = 70 + Math.round(ratio * 47);
    }
    
    // Add slight natural variation (-1 to +1) based on position
    const variation = (index % 3) - 1;
    confidence = Math.max(70, Math.min(98, confidence + variation));
    
    return { name: lang.name, level: confidence };
  });
}

export default function Skills() {
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const { languages, loading: languagesLoading, error: languagesError } = useGitHubLanguages();

  // Map GitHub languages to confidence values
  const githubLanguages = useMemo(() => mapToConfidence(languages), [languages]);

  // Total sections: Core Skills + GitHub Languages + Other Categories
  const totalSections = 2 + otherSkillCategories.length;

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
              onComplete={() => setCurrentSection(totalSections)}
            />
          </div>
        </div>
      )}

      {/* Skills Display */}
      {loadingComplete && (
        <div className="space-y-8 sm:space-y-10 md:space-y-8 lg:space-y-12 pl-3 sm:pl-4 lg:pl-8">
          
          {/* ========== SECTION 1: CORE SKILLS (Manual, Authoritative) ========== */}
          <div
            className={`space-y-4 sm:space-y-5 md:space-y-4 lg:space-y-6 transition-all duration-500 ${
              currentSection > 0 ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 mb-4 sm:mb-5 md:mb-4 lg:mb-6">
              <span className="text-terminal-accent terminal-glow font-semibold text-xs sm:text-sm md:text-base lg:text-xl xl:text-2xl">
                [CORE SKILLS]
              </span>
              <div className="flex-1 h-px bg-terminal-border" />
            </div>

            <div className="space-y-3 sm:space-y-4 md:space-y-3 lg:space-y-4">
              {coreSkills.map((skill) => (
                <ProgressBar
                  key={skill.name}
                  label={skill.name}
                  percentage={skill.level}
                  maxWidth={30}
                  animated={currentSection > 0}
                />
              ))}
            </div>
          </div>

          {/* ========== SECTION 2: OTHER LANGUAGES (from GitHub Projects) ========== */}
          <div
            className={`space-y-4 sm:space-y-5 md:space-y-4 lg:space-y-6 transition-all duration-500 ${
              currentSection > 0 ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="flex flex-col gap-1 mb-4 sm:mb-5 md:mb-4 lg:mb-6">
              <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
                <span className="text-terminal-accent terminal-glow font-semibold text-xs sm:text-sm md:text-base lg:text-xl xl:text-2xl">
                  [OTHER LANGUAGES]
                </span>
                <span className="text-terminal-text-dim text-xs sm:text-sm md:text-base lg:text-lg">
                  — from GitHub Projects
                </span>
                <div className="flex-1 h-px bg-terminal-border" />
              </div>
              <span className="text-terminal-text-dim text-xs sm:text-sm italic">
                Automatically detected across my public GitHub repositories. Levels reflect practical exposure, not proficiency.
              </span>
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
              ) : githubLanguages.length === 0 ? (
                <div className="text-terminal-text-dim text-xs sm:text-sm">
                  No language data available.
                </div>
              ) : (
                githubLanguages.map((lang) => (
                  <ProgressBar
                    key={lang.name}
                    label={lang.name}
                    percentage={lang.level}
                    maxWidth={30}
                    animated={currentSection > 0}
                  />
                ))
              )}
            </div>
          </div>

          {/* Other Skill Categories */}
          {otherSkillCategories.map((category, catIndex) => (
            <div
              key={category.category}
              className={`space-y-4 sm:space-y-5 md:space-y-4 lg:space-y-6 transition-all duration-500 ${
                currentSection > catIndex + 2 ? 'opacity-100' : 'opacity-0'
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
                    animated={currentSection > catIndex + 2}
                  />
                ))}
              </div>
            </div>
          ))}

          {/* Summary */}
          {currentSection >= totalSections && (
            <div className="pt-6 sm:pt-8 md:pt-6 lg:pt-10 border-t border-terminal-border space-y-2 sm:space-y-3 md:space-y-2 lg:space-y-4">
              <div className="text-terminal-text-dim text-xs sm:text-sm lg:text-lg xl:text-xl leading-relaxed">
                <TypeWriter
                  text="[SUMMARY] Skills loaded. Ready for review."
                  delay={20}
                  showCursor={false}
                  enableSound={false}
                />
              </div>
              <div className="text-terminal-accent-dim text-xs lg:text-base">
                Core: {coreSkills.length} | Languages: {githubLanguages.length} | Other: {otherSkillCategories.reduce((acc, cat) => acc + cat.skills.length, 0)}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
