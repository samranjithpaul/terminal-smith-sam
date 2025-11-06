import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { terminalSounds } from '@/utils/sounds';

export const CommandInput: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    setCommandHistory([...commandHistory, `$ ${cmd}`]);
    setInputValue('');

    terminalSounds.playEnter();

    switch (trimmedCmd) {
      case 'help':
        setCommandHistory(prev => [...prev, 'Available commands: about, skills, projects, contact, cat resume.pdf, clear, home']);
        break;
      case 'home':
        navigate('/');
        break;
      case 'about':
        navigate('/about');
        break;
      case 'skills':
        navigate('/skills');
        break;
      case 'projects':
        navigate('/projects');
        break;
      case 'contact':
        navigate('/contact');
        break;
      case 'cat resume.pdf':
      case 'resume':
        window.open('/resume.pdf', '_blank');
        setCommandHistory(prev => [...prev, 'Opening resume...']);
        break;
      case 'clear':
        setCommandHistory([]);
        break;
      default:
        terminalSounds.playError();
        setCommandHistory(prev => [...prev, `Command not found: ${trimmedCmd}. Type 'help' for available commands.`]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      handleCommand(inputValue);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    terminalSounds.playKeypress();
    setInputValue(e.target.value);
  };

  return (
    <div className="mt-6 md:mt-8 lg:mt-10 pt-4 md:pt-6 border-t border-terminal-border">
      {commandHistory.length > 0 && (
        <div className="mb-4 space-y-1 text-sm md:text-base">
          {commandHistory.map((line, idx) => (
            <div key={idx} className="text-terminal-text-dim">
              {line}
            </div>
          ))}
        </div>
      )}
      
      <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm md:text-base lg:text-lg">
        <span className="hidden sm:inline text-terminal-accent-dim">sam@terminal</span>
        <span className="hidden sm:inline text-terminal-text-dim">:</span>
        <span className="hidden md:inline text-terminal-accent-bright">~{location.pathname}</span>
        <span className="text-terminal-text-dim">$</span>
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent border-none outline-none text-terminal-text caret-terminal-accent min-w-0"
          placeholder="type command..."
          autoComplete="off"
          spellCheck="false"
        />
      </div>
    </div>
  );
};
