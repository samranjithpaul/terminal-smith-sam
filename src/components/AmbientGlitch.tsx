import { useEffect, useState, useCallback } from 'react';

interface AmbientGlitchProps {
  interval?: number; // ms between glitches
  duration?: number; // ms per glitch
}

export const AmbientGlitch = ({ interval = 22000, duration = 200 }: AmbientGlitchProps) => {
  const [isGlitching, setIsGlitching] = useState(false);
  const [isEnabled, setIsEnabled] = useState(true);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsEnabled(!mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setIsEnabled(!e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const triggerGlitch = useCallback(() => {
    if (!isEnabled) return;
    
    // Random duration between 150-300ms
    const glitchDuration = 150 + Math.random() * 150;
    
    setIsGlitching(true);
    setTimeout(() => setIsGlitching(false), glitchDuration);
  }, [isEnabled]);

  useEffect(() => {
    if (!isEnabled) return;

    let intervalId: ReturnType<typeof setInterval>;
    
    const startInterval = () => {
      intervalId = setInterval(triggerGlitch, interval);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        clearInterval(intervalId);
      } else {
        startInterval();
      }
    };

    // Start the interval
    startInterval();
    
    // Listen for visibility changes
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(intervalId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [interval, triggerGlitch, isEnabled]);

  if (!isEnabled || !isGlitching) return null;

  return (
    <div className="ambient-glitch-overlay" aria-hidden="true">
      <div className="ambient-scanline" />
      <div className="ambient-noise" />
    </div>
  );
};
