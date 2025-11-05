import React, { useState, useRef, useEffect } from 'react';
import { TypeWriter } from '@/components/TypeWriter';
import { Download } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { terminalSounds } from '@/utils/sounds';

const suggestedCommands = [
  { cmd: 'help', desc: 'Show available commands' },
  { cmd: 'about', desc: 'Display information about me', link: '/about' },
  { cmd: 'skills', desc: 'List technical skills', link: '/skills' },
  { cmd: 'projects', desc: 'Browse project portfolio', link: '/projects' },
  { cmd: 'contact', desc: 'Get in touch', link: '/contact' },
  { cmd: 'cat resume.pdf', desc: 'Download resume', action: 'download' },
];

export default function Home() {
  const [showCommands, setShowCommands] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (showCommands && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showCommands]);

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    setCommandHistory([...commandHistory, `$ ${cmd}`]);
    setInputValue('');

    terminalSounds.playEnter();

    switch (trimmedCmd) {
      case 'help':
        setCommandHistory(prev => [...prev, 'Available commands: about, skills, projects, contact, cat resume.pdf, clear']);
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

  const handleLinkClick = () => {
    terminalSounds.playClick();
  };

  return (
    <div className="space-y-4 md:space-y-6 lg:space-y-8">
      {/* Hero */}
      <div className="space-y-4 md:space-y-6 lg:space-y-8">
        <div className="border-2 border-terminal-accent p-4 md:p-6 lg:p-8 terminal-box-glow">
          <div className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-terminal-accent terminal-glow mb-3 md:mb-4 lg:mb-6 font-mono break-words">
            <TypeWriter
              text="SAM RANJITH PAUL"
              delay={80}
              showCursor={false}
              onComplete={() => setTimeout(() => setShowCommands(true), 500)}
            />
          </div>
          <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-terminal-text-dim">
            <TypeWriter text="Full-Stack Developer" delay={60} showCursor={false} />
          </div>
        </div>

        {/* Command Suggestions */}
        {showCommands && (
          <div className="space-y-4 lg:space-y-6">
            <div className="text-terminal-text mb-3 text-sm md:text-base lg:text-lg">
              <TypeWriter text="Type a command to begin:" delay={40} showCursor={false} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4 pl-2 md:pl-4">
              {suggestedCommands.map(({ cmd, desc, link, action }) => (
                <div key={cmd} className="flex items-start gap-2 md:gap-3 group text-sm md:text-base lg:text-lg">
                  <span className="text-terminal-accent-dim flex-shrink-0">$</span>
                  {link ? (
                    <Link
                      to={link}
                      onClick={handleLinkClick}
                      className="flex-1 hover:text-terminal-accent transition-all terminal-glow break-words"
                    >
                      <span className="text-terminal-accent font-semibold">{cmd}</span>
                      <span className="text-terminal-text-dim ml-2 md:ml-3">// {desc}</span>
                    </Link>
                  ) : action === 'download' ? (
                    <a
                      href="/resume.pdf"
                      download
                      onClick={handleLinkClick}
                      className="flex-1 hover:text-terminal-accent transition-all terminal-glow flex items-center gap-2 break-words"
                    >
                      <span className="text-terminal-accent font-semibold">{cmd}</span>
                      <span className="text-terminal-text-dim ml-2 md:ml-3">// {desc}</span>
                      <Download className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 ml-2" />
                    </a>
                  ) : (
                    <div className="flex-1 break-words">
                      <span className="text-terminal-accent font-semibold">{cmd}</span>
                      <span className="text-terminal-text-dim ml-2 md:ml-3">// {desc}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Command History */}
            {commandHistory.length > 0 && (
              <div className="mt-4 lg:mt-6 space-y-1 text-sm md:text-base lg:text-lg">
                {commandHistory.map((line, idx) => (
                  <div key={idx} className="text-terminal-text-dim">
                    {line}
                  </div>
                ))}
              </div>
            )}

            {/* Interactive Input */}
            <div className="mt-6 md:mt-8 lg:mt-10 pt-4 md:pt-6 border-t border-terminal-border">
              <div className="flex items-center gap-2 text-sm md:text-base lg:text-lg">
                <span className="text-terminal-accent-dim">sam@terminal</span>
                <span className="text-terminal-text-dim">:</span>
                <span className="text-terminal-accent-bright">~</span>
                <span className="text-terminal-text-dim">$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent border-none outline-none text-terminal-text caret-terminal-accent"
                  placeholder="type 'help' for commands..."
                  autoComplete="off"
                  spellCheck="false"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
