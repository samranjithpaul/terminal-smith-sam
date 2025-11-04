import React from 'react';
import { useTerminal } from '@/contexts/TerminalContext';

interface CommandPromptProps {
  user?: string;
  path?: string;
  className?: string;
}

export const CommandPrompt: React.FC<CommandPromptProps> = ({
  user = 'guest',
  path = '~',
  className = '',
}) => {
  const { cursorStyle } = useTerminal();

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="text-terminal-accent-dim">{user}@terminal</span>
      <span className="text-terminal-text-dim">:</span>
      <span className="text-terminal-accent-bright">{path}</span>
      <span className="text-terminal-text-dim">$</span>
      <span className={cursorStyle === 'block' ? 'cursor-block' : 'cursor-underscore'} />
    </div>
  );
};
