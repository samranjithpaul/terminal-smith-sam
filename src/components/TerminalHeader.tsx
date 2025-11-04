import React from 'react';
import { useTerminal } from '@/contexts/TerminalContext';
import { Terminal, Volume2, VolumeX, Minimize2, Maximize2, X } from 'lucide-react';

export const TerminalHeader: React.FC = () => {
  const { 
    theme, 
    setTheme, 
    cursorStyle, 
    setCursorStyle,
    scanlinesEnabled, 
    toggleScanlines,
    soundEnabled,
    toggleSound
  } = useTerminal();

  const themes = [
    { name: 'green', label: 'Matrix' },
    { name: 'purple', label: 'Cyber' },
    { name: 'white', label: 'Mono' },
    { name: 'grey', label: 'Smoke' },
  ] as const;

  return (
    <div className="flex items-center justify-between mb-6 pb-4 border-b border-terminal-border">
      <div className="flex items-center gap-3">
        <Terminal className="w-5 h-5 text-terminal-accent terminal-glow" />
        <span className="text-terminal-text-dim text-sm">terminal v1.0.0</span>
      </div>

      <div className="flex items-center gap-4">
        {/* Theme Selector */}
        <div className="flex gap-2">
          {themes.map(({ name, label }) => (
            <button
              key={name}
              onClick={() => setTheme(name)}
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

        {/* Cursor Style Toggle */}
        <button
          onClick={() => setCursorStyle(cursorStyle === 'block' ? 'underscore' : 'block')}
          className="px-2 py-1 text-xs bg-terminal-surface text-terminal-text-dim hover:text-terminal-text rounded transition-all"
          title="Toggle cursor style"
        >
          {cursorStyle === 'block' ? '█' : '_'}
        </button>

        {/* Scanlines Toggle */}
        <button
          onClick={toggleScanlines}
          className="px-2 py-1 text-xs bg-terminal-surface text-terminal-text-dim hover:text-terminal-text rounded transition-all"
          title="Toggle scanlines"
        >
          {scanlinesEnabled ? <Maximize2 className="w-3 h-3" /> : <Minimize2 className="w-3 h-3" />}
        </button>

        {/* Sound Toggle */}
        <button
          onClick={toggleSound}
          className="px-2 py-1 text-xs bg-terminal-surface text-terminal-text-dim hover:text-terminal-text rounded transition-all"
          title="Toggle sound effects"
        >
          {soundEnabled ? <Volume2 className="w-3 h-3" /> : <VolumeX className="w-3 h-3" />}
        </button>

        {/* Decorative Window Controls */}
        <div className="flex gap-1.5 ml-2">
          <div className="w-3 h-3 rounded-full bg-terminal-accent-dim opacity-50" />
          <div className="w-3 h-3 rounded-full bg-terminal-accent-dim opacity-50" />
          <div className="w-3 h-3 rounded-full bg-terminal-accent-dim opacity-50" />
        </div>
      </div>
    </div>
  );
};
