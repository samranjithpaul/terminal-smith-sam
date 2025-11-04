import React, { useState, useEffect } from 'react';

interface ProgressBarProps {
  label: string;
  percentage: number;
  maxWidth?: number;
  animated?: boolean;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  label,
  percentage,
  maxWidth = 30,
  animated = true,
  className = '',
}) => {
  const [currentPercentage, setCurrentPercentage] = useState(0);

  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => {
        setCurrentPercentage(percentage);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setCurrentPercentage(percentage);
    }
  }, [percentage, animated]);

  const filledBars = Math.round((currentPercentage / 100) * maxWidth);
  const emptyBars = maxWidth - filledBars;

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className="text-terminal-text-dim w-28 text-right">{label}</span>
      <span className="text-terminal-accent-dim">[</span>
      <div className="flex transition-all duration-500">
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
      <span className="text-terminal-accent-dim">]</span>
      <span className="text-terminal-accent w-12 text-right terminal-glow">
        {currentPercentage}%
      </span>
    </div>
  );
};
