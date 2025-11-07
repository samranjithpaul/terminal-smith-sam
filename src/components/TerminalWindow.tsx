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
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16 py-4 md:py-6 lg:py-8 max-w-[1600px]">
        {children}
      </div>
    </div>
  );
};
