import React, { useState } from 'react';
import { TypeWriter } from '@/components/TypeWriter';
import { RotatingTypeWriter } from '@/components/RotatingTypeWriter';
import { Download } from 'lucide-react';
import { Link } from 'react-router-dom';
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

  const handleLinkClick = () => {
    terminalSounds.playClick();
  };

  return (
    <div className="space-y-4 md:space-y-6 lg:space-y-10 animate-fade-in">
      {/* Hero */}
      <div className="space-y-4 md:space-y-6 lg:space-y-8">
        <div className="border-2 border-terminal-accent p-4 md:p-6 lg:p-10 xl:p-12 terminal-box-glow">
          <div className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-bold text-terminal-accent terminal-glow mb-3 md:mb-4 lg:mb-6 xl:mb-8 font-mono break-words leading-tight">
            <TypeWriter
              text="SAM RANJITH PAUL"
              delay={80}
              showCursor={false}
              onComplete={() => setTimeout(() => setShowCommands(true), 500)}
            />
          </div>
          <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-terminal-text-dim">
            <RotatingTypeWriter
              texts={[
                'Full-Stack Developer',
                'Software Developer',
                'Web Developer'
              ]}
              typingDelay={100}
              deletingDelay={50}
              pauseDelay={2000}
            />
          </div>
        </div>

        {/* Command Suggestions */}
        {showCommands && (
          <div className="space-y-4 lg:space-y-6 xl:space-y-8">
            <div className="text-terminal-text mb-3 text-sm md:text-base lg:text-xl xl:text-2xl">
              <TypeWriter text="Type a command to begin:" delay={40} showCursor={false} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-5 xl:gap-6 pl-2 md:pl-4 lg:pl-6">
              {suggestedCommands.map(({ cmd, desc, link, action }) => (
                <div key={cmd} className="flex items-start gap-2 md:gap-3 lg:gap-4 group text-sm md:text-base lg:text-lg xl:text-xl">
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
          </div>
        )}
      </div>
    </div>
  );
}
