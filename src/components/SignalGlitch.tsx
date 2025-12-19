import { useEffect, useState, useCallback, useRef } from 'react';

interface SignalGlitchProps {
  duration?: number; // total duration in ms
}

// Non-uniform interval pattern in seconds: [8, 4, 8, 8, 2, 4] → loop
const INTERVAL_PATTERN = [8000, 4000, 8000, 8000, 2000, 4000];

export const SignalGlitch = ({ duration = 1500 }: SignalGlitchProps) => {
  const [phase, setPhase] = useState<'idle' | 'entry' | 'peak' | 'recovery'>('idle');
  const [isEnabled, setIsEnabled] = useState(true);
  const patternIndexRef = useRef(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  // Apply/remove glitch class on body
  useEffect(() => {
    if (phase === 'idle') {
      document.body.classList.remove('signal-glitch-active', 'signal-glitch-entry', 'signal-glitch-peak', 'signal-glitch-recovery');
    } else {
      document.body.classList.add('signal-glitch-active');
      document.body.classList.remove('signal-glitch-entry', 'signal-glitch-peak', 'signal-glitch-recovery');
      document.body.classList.add(`signal-glitch-${phase}`);
    }
  }, [phase]);

  const triggerGlitch = useCallback(() => {
    if (!isEnabled) return;
    
    // Phase 1: Entry (0-200ms) - quick signal tear
    setPhase('entry');
    
    setTimeout(() => {
      // Phase 2: Peak (200-700ms)
      setPhase('peak');
    }, 200);
    
    setTimeout(() => {
      // Phase 3: Recovery (700-1500ms) - smooth fade out
      setPhase('recovery');
    }, 700);
    
    setTimeout(() => {
      // Back to idle
      setPhase('idle');
    }, duration);
  }, [isEnabled, duration]);

  const scheduleNextGlitch = useCallback(() => {
    if (!isEnabled) return;

    const currentInterval = INTERVAL_PATTERN[patternIndexRef.current];
    
    timeoutRef.current = setTimeout(() => {
      triggerGlitch();
      
      // After glitch completes, advance pattern and schedule next
      setTimeout(() => {
        patternIndexRef.current = (patternIndexRef.current + 1) % INTERVAL_PATTERN.length;
        scheduleNextGlitch();
      }, duration);
    }, currentInterval);
  }, [isEnabled, triggerGlitch, duration]);

  useEffect(() => {
    if (!isEnabled) return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
        setPhase('idle');
      } else {
        scheduleNextGlitch();
      }
    };

    // Start the scheduled loop
    scheduleNextGlitch();
    
    // Listen for visibility changes
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      // Clean up body classes
      document.body.classList.remove('signal-glitch-active', 'signal-glitch-entry', 'signal-glitch-peak', 'signal-glitch-recovery');
    };
  }, [scheduleNextGlitch, isEnabled]);

  if (!isEnabled || phase === 'idle') return null;

  // Overlay for noise and scanlines only
  return (
    <div 
      className="signal-glitch-overlay" 
      aria-hidden="true"
    >
      <div className="signal-interference-lines" />
      <div className="signal-noise-layer" />
    </div>
  );
};
