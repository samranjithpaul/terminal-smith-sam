import React from 'react';
import { useTerminal } from '@/contexts/TerminalContext';
import { Terminal, Volume2, VolumeX } from 'lucide-react';
import { terminalSounds } from '@/utils/sounds';

export const TerminalHeader: React.FC = () => {
  const { 
    theme, 
    setTheme, 
    soundEnabled,
    toggleSound
  } = useTerminal();

  const handleThemeClick = (themeName: any) => {
    terminalSounds.playClick();
    setTheme(themeName);
  };

  const handleSoundToggle = () => {
    terminalSounds.playClick();
    toggleSound();
  };

  const themes = [
    { name: 'green', label: 'Matrix' },
  ] as const;

  return (
    <div className="flex items-center justify-between mb-4 md:mb-6 pb-3 md:pb-4 border-b border-terminal-border">
      <div className="flex items-center gap-2 md:gap-3">
        <Terminal className="w-4 h-4 md:w-5 md:h-5 text-terminal-accent terminal-glow" />
        <span className="text-terminal-text-dim text-xs md:text-sm">terminal v1.0.0</span>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        {/* Theme Selector - Hidden on small mobile */}
        <div className="hidden sm:flex gap-2">
          {themes.map(({ name, label }) => (
            <button
              key={name}
              onClick={() => handleThemeClick(name)}
              className={`px-2 py-1 text-xs rounded transition-all ${
                theme === name
                  ? 'bg-terminal-accent text-terminal-bg terminal-box-glow'
                  : 'bg-terminal-surface text-terminal-text-dim hover:text-terminal-text'
              }`}
              title={`Switch to ${label} theme`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Sound Toggle */}
        <button
          onClick={handleSoundToggle}
          className="p-1.5 md:p-2 bg-terminal-surface text-terminal-text-dim hover:text-terminal-accent rounded transition-all hover:terminal-box-glow"
          title="Toggle sound effects"
        >
          {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
};
