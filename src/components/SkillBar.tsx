import React, { useState, useEffect } from 'react';

interface SkillBarProps {
  label: string;
  level: number; // 0-100
  tier?: string; // Optional tier label like "Expert", "Proficient"
  maxWidth?: number;
  animated?: boolean;
  className?: string;
  showPercentage?: boolean;
}

export const SkillBar: React.FC<SkillBarProps> = ({
  label,
  level,
  tier,
  maxWidth = 30,
  animated = true,
  className = '',
  showPercentage = true,
}) => {
  const [currentLevel, setCurrentLevel] = useState(0);

  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => {
        setCurrentLevel(level);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setCurrentLevel(level);
    }
  }, [level, animated]);

  const filledBars = Math.round((currentLevel / 100) * maxWidth);
  const emptyBars = maxWidth - filledBars;

  // Tier color mapping
  const getTierColor = (tier?: string) => {
    switch (tier) {
      case 'Expert': return 'text-terminal-accent';
      case 'Proficient': return 'text-emerald-400';
      case 'Familiar': return 'text-cyan-400';
      case 'Learning': return 'text-amber-400';
      default: return 'text-terminal-accent';
    }
  };

  return (
    <div className={`flex items-center gap-2 sm:gap-3 lg:gap-4 text-xs sm:text-sm lg:text-base xl:text-lg ${className}`}>
      <span className="text-terminal-text-dim w-20 sm:w-28 lg:w-36 xl:w-44 text-right flex-shrink-0">{label}</span>
      <span className="text-terminal-accent-dim flex-shrink-0">[</span>
      <div className="flex transition-all duration-500 min-w-0">
        {[...Array(filledBars)].map((_, i) => (
          <span key={`filled-${i}`} className="text-terminal-accent">
            ═
          </span>
        ))}
        {[...Array(emptyBars)].map((_, i) => (
          <span key={`empty-${i}`} className="text-terminal-border">
            ─
          </span>
        ))}
      </div>
      <span className="text-terminal-accent-dim flex-shrink-0">]</span>
      {showPercentage ? (
        <span className="text-terminal-accent w-8 sm:w-12 lg:w-14 text-right terminal-glow flex-shrink-0">
          {currentLevel}%
        </span>
      ) : tier ? (
        <span className={`w-16 sm:w-20 lg:w-24 text-right font-medium flex-shrink-0 ${getTierColor(tier)}`}>
          {tier}
        </span>
      ) : null}
    </div>
  );
};
