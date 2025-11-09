import React, { useState, useEffect } from 'react';
import { useTerminal } from '@/contexts/TerminalContext';
import { terminalSounds } from '@/utils/sounds';

interface RotatingTypeWriterProps {
  texts: string[];
  typingDelay?: number;
  deletingDelay?: number;
  pauseDelay?: number;
  className?: string;
  enableSound?: boolean;
}

export const RotatingTypeWriter: React.FC<RotatingTypeWriterProps> = ({
  texts,
  typingDelay = 100,
  deletingDelay = 50,
  pauseDelay = 2000,
  className = '',
  enableSound = false,
}) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const { cursorStyle } = useTerminal();

  useEffect(() => {
    const currentFullText = texts[currentTextIndex];

    if (isPaused) {
      const pauseTimeout = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, pauseDelay);
      return () => clearTimeout(pauseTimeout);
    }

    if (isDeleting) {
      if (displayedText.length === 0) {
        setIsDeleting(false);
        setCurrentTextIndex((prev) => (prev + 1) % texts.length);
      } else {
        const timeout = setTimeout(() => {
          setDisplayedText(currentFullText.slice(0, displayedText.length - 1));
          // Softer sound when deleting (if enabled)
          if (enableSound && displayedText.length % 2 === 0) {
            terminalSounds.playKeypress();
          }
        }, deletingDelay);
        return () => clearTimeout(timeout);
      }
    } else {
      if (displayedText.length === currentFullText.length) {
        setIsPaused(true);
      } else {
        const timeout = setTimeout(() => {
          setDisplayedText(currentFullText.slice(0, displayedText.length + 1));
          // Play typing sound (if enabled)
          if (enableSound) {
            terminalSounds.playKeypress();
          }
        }, typingDelay);
        return () => clearTimeout(timeout);
      }
    }
  }, [displayedText, isDeleting, isPaused, currentTextIndex, texts, typingDelay, deletingDelay, pauseDelay]);

  return (
    <span className={className}>
      {displayedText}
      <span className={cursorStyle === 'block' ? 'cursor-block' : 'cursor-underscore'} />
    </span>
  );
};
