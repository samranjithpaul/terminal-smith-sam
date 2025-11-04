import React from 'react';
import { useTerminal } from '@/contexts/TerminalContext';
import { cn } from '@/lib/utils';

interface TerminalWindowProps {
  children: React.ReactNode;
  className?: string;
}

export const TerminalWindow: React.FC<TerminalWindowProps> = ({ children, className }) => {
  const { scanlinesEnabled } = useTerminal();

  return (
    <div className={cn(
      "min-h-screen bg-terminal-bg text-terminal-text",
      scanlinesEnabled && "scanlines",
      className
    )}>
      <div className="container mx-auto px-4 py-6 max-w-5xl">
        {children}
      </div>
    </div>
  );
};
