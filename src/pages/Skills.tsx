import React, { useState } from 'react';
import { TypeWriter } from '@/components/TypeWriter';
import { ProgressBar } from '@/components/ProgressBar';

const skillCategories = [
  {
    category: 'Frontend',
    skills: [
      { name: 'React / Next.js', level: 95 },
      { name: 'TypeScript', level: 90 },
      { name: 'Tailwind CSS', level: 92 },
      { name: 'State Management', level: 88 },
    ],
  },
  {
    category: 'Backend',
    skills: [
      { name: 'Node.js / Express', level: 90 },
      { name: 'Python / FastAPI', level: 85 },
      { name: 'GraphQL / REST', level: 87 },
      { name: 'Database Design', level: 88 },
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

export default function Skills() {
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(0);

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Command Output Header */}
      <div className="flex items-center gap-2 text-terminal-text-dim text-xs sm:text-sm mb-4 md:mb-6">
        <span className="text-terminal-accent">$</span>
        <TypeWriter
          text="list --skills --verbose"
          delay={50}
          showCursor={false}
          onComplete={() => setTimeout(() => setLoadingComplete(true), 300)}
        />
      </div>

      {/* Loading Animation */}
      {loadingComplete && (
        <div className="space-y-1.5 md:space-y-2 pl-2 sm:pl-4 mb-4 md:mb-6">
          <div className="text-terminal-text-dim text-xs sm:text-sm">
            <TypeWriter text="[INFO] Loading skill database..." delay={30} showCursor={false} />
          </div>
          <div className="text-terminal-accent-dim text-xs sm:text-sm">
            <TypeWriter
              text="[OK] Skills loaded successfully."
              delay={30}
              showCursor={false}
              onComplete={() => setCurrentCategory(skillCategories.length)}
            />
          </div>
        </div>
      )}

      {/* Skills Display */}
      {loadingComplete && (
        <div className="space-y-6 md:space-y-8 pl-2 sm:pl-4">
          {skillCategories.map((category, catIndex) => (
            <div
              key={category.category}
              className={`space-y-3 md:space-y-4 transition-all duration-500 ${
                currentCategory > catIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="flex items-center gap-2 sm:gap-3 mb-3 md:mb-4">
                <span className="text-terminal-accent terminal-glow font-semibold text-xs sm:text-sm md:text-base">
                  [{category.category.toUpperCase()}]
                </span>
                <div className="flex-1 h-px bg-terminal-border" />
              </div>

              <div className="space-y-2 md:space-y-3">
                {category.skills.map((skill) => (
                  <ProgressBar
                    key={skill.name}
                    label={skill.name}
                    percentage={skill.level}
                    maxWidth={30}
                    animated={currentCategory > catIndex}
                  />
                ))}
              </div>
            </div>
          ))}

          {/* Summary */}
          {currentCategory >= skillCategories.length && (
            <div className="pt-4 md:pt-6 border-t border-terminal-border space-y-1.5 md:space-y-2">
              <div className="text-terminal-text-dim text-xs sm:text-sm">
                <TypeWriter
                  text="[SUMMARY] Proficient across full-stack development. Focus on scalable architecture and clean implementation."
                  delay={20}
                  showCursor={false}
                />
              </div>
              <div className="text-terminal-accent-dim text-xs">
                Total skills loaded: {skillCategories.reduce((acc, cat) => acc + cat.skills.length, 0)}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
