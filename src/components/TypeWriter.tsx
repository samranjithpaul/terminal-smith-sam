import React, { useState, useEffect } from 'react';
import { useTerminal } from '@/contexts/TerminalContext';

interface TypeWriterProps {
  text: string;
  delay?: number;
  onComplete?: () => void;
  className?: string;
  showCursor?: boolean;
}

export const TypeWriter: React.FC<TypeWriterProps> = ({
  text,
  delay = 50,
  onComplete,
  className = '',
  showCursor = true,
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const { cursorStyle } = useTerminal();

  useEffect(() => {
    if (displayedText.length < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, delay);
      return () => clearTimeout(timeout);
    } else if (!isComplete) {
      setIsComplete(true);
      onComplete?.();
    }
  }, [displayedText, text, delay, isComplete, onComplete]);

  return (
    <span className={className}>
      {displayedText}
      {showCursor && (
        <span className={cursorStyle === 'block' ? 'cursor-block' : 'cursor-underscore'} />
      )}
    </span>
  );
};
