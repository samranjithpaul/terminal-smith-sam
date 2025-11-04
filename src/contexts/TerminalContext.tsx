import React, { createContext, useContext, useState, useEffect } from 'react';

type TerminalTheme = 'green' | 'purple' | 'white' | 'grey';
type CursorStyle = 'block' | 'underscore';

interface TerminalContextType {
  theme: TerminalTheme;
  setTheme: (theme: TerminalTheme) => void;
  cursorStyle: CursorStyle;
  setCursorStyle: (style: CursorStyle) => void;
  scanlinesEnabled: boolean;
  toggleScanlines: () => void;
  soundEnabled: boolean;
  toggleSound: () => void;
}

const TerminalContext = createContext<TerminalContextType | undefined>(undefined);

export const TerminalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<TerminalTheme>('green');
  const [cursorStyle, setCursorStyle] = useState<CursorStyle>('block');
  const [scanlinesEnabled, setScanlinesEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-terminal-theme', theme);
  }, [theme]);

  const toggleScanlines = () => setScanlinesEnabled(prev => !prev);
  const toggleSound = () => setSoundEnabled(prev => !prev);

  return (
    <TerminalContext.Provider
      value={{
        theme,
        setTheme,
        cursorStyle,
        setCursorStyle,
        scanlinesEnabled,
        toggleScanlines,
        soundEnabled,
        toggleSound,
      }}
    >
      {children}
    </TerminalContext.Provider>
  );
};

export const useTerminal = () => {
  const context = useContext(TerminalContext);
  if (!context) {
    throw new Error('useTerminal must be used within TerminalProvider');
  }
  return context;
};
