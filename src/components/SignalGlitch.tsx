import { useEffect, useState, useCallback } from 'react';

interface SignalGlitchProps {
  interval?: number; // ms between glitches
  duration?: number; // total duration in ms
}

export const SignalGlitch = ({ interval = 15000, duration = 2000 }: SignalGlitchProps) => {
  const [phase, setPhase] = useState<'idle' | 'entry' | 'peak' | 'recovery'>('idle');
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
    
    // Phase 1: Entry (0-400ms)
    setPhase('entry');
    
    setTimeout(() => {
      // Phase 2: Peak (400-1400ms)
      setPhase('peak');
    }, 400);
    
    setTimeout(() => {
      // Phase 3: Recovery (1400-2000ms)
      setPhase('recovery');
    }, 1400);
    
    setTimeout(() => {
      // Back to idle
      setPhase('idle');
    }, duration);
  }, [isEnabled, duration]);

  useEffect(() => {
    if (!isEnabled) return;

    let intervalId: ReturnType<typeof setInterval>;
    
    const startInterval = () => {
      intervalId = setInterval(triggerGlitch, interval);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        clearInterval(intervalId);
        setPhase('idle');
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

  if (!isEnabled || phase === 'idle') return null;

  return (
    <div 
      className={`signal-glitch-overlay signal-glitch-${phase}`} 
      aria-hidden="true"
    >
      <div className="signal-interference-lines" />
      <div className="signal-noise-layer" />
      <div className="signal-phosphor-glow" />
    </div>
  );
};
