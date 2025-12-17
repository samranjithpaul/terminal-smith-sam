import { useState, useEffect } from 'react';

const bootMessages = [
  'booting system...',
  'initializing modules...',
  'loading portfolio...',
  'error: signal noise detected',
  're-syncing display...',
  'connection established.',
];

interface BootSequenceProps {
  onComplete: () => void;
  duration?: number;
}

export function BootSequence({ onComplete, duration = 2000 }: BootSequenceProps) {
  const [currentLine, setCurrentLine] = useState(0);
  const [glitchPhase, setGlitchPhase] = useState(true);

  useEffect(() => {
    // Cycle through boot messages
    const messageInterval = setInterval(() => {
      setCurrentLine((prev) => {
        if (prev < bootMessages.length - 1) return prev + 1;
        return prev;
      });
    }, duration / bootMessages.length);

    // End glitch phase slightly before completion
    const glitchTimer = setTimeout(() => {
      setGlitchPhase(false);
    }, duration - 300);

    // Complete the sequence
    const completeTimer = setTimeout(() => {
      onComplete();
    }, duration);

    return () => {
      clearInterval(messageInterval);
      clearTimeout(glitchTimer);
      clearTimeout(completeTimer);
    };
  }, [duration, onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-[hsl(var(--terminal-bg))] flex items-center justify-center overflow-hidden">
      {/* Scanline overlay */}
      <div className="absolute inset-0 pointer-events-none boot-scanlines" />
      
      {/* CRT flicker overlay */}
      <div className={`absolute inset-0 pointer-events-none ${glitchPhase ? 'boot-crt-flicker' : ''}`} />
      
      {/* Glitch lines */}
      {glitchPhase && (
        <>
          <div className="absolute left-0 right-0 h-px bg-[hsl(var(--terminal-accent))] boot-glitch-line-1 opacity-60" />
          <div className="absolute left-0 right-0 h-0.5 bg-[hsl(var(--terminal-accent))] boot-glitch-line-2 opacity-40" />
          <div className="absolute left-0 right-0 h-px bg-[hsl(var(--terminal-accent)/0.5)] boot-glitch-line-3 opacity-50" />
        </>
      )}

      {/* RGB shift container */}
      <div className={`relative ${glitchPhase ? 'boot-rgb-shift' : ''}`}>
        {/* Main content */}
        <div className="font-mono text-[hsl(var(--terminal-accent))] space-y-1 sm:space-y-2 p-4 max-w-md">
          {bootMessages.slice(0, currentLine + 1).map((message, index) => (
            <div
              key={index}
              className={`text-xs sm:text-sm ${
                index === currentLine ? 'boot-text-jitter' : ''
              } ${message.includes('error') ? 'text-red-500/80' : ''}`}
            >
              <span className="text-[hsl(var(--terminal-accent-dim))]">&gt;</span>{' '}
              <span className={glitchPhase && index === currentLine ? 'boot-char-glitch' : ''}>
                {message}
              </span>
              {index === currentLine && (
                <span className="inline-block w-2 h-4 ml-1 bg-[hsl(var(--terminal-accent))] animate-pulse" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Noise overlay */}
      {glitchPhase && <div className="absolute inset-0 pointer-events-none boot-noise opacity-[0.03]" />}
      
      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none boot-vignette" />
    </div>
  );
}
