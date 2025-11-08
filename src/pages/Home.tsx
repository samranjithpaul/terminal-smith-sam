import React, { useState } from 'react';
import { TypeWriter } from '@/components/TypeWriter';
import { RotatingTypeWriter } from '@/components/RotatingTypeWriter';
import { Download, FastForward } from 'lucide-react';
import { Link } from 'react-router-dom';
import { terminalSounds } from '@/utils/sounds';
import { Button } from '@/components/ui/button';

const suggestedCommands = [
  { cmd: 'help', desc: 'Show available commands' },
  { cmd: 'about', desc: 'Display information about me', link: '/about' },
  { cmd: 'skills', desc: 'List technical skills', link: '/skills' },
  { cmd: 'projects', desc: 'Browse project portfolio', link: '/projects' },
  { cmd: 'contact', desc: 'Get in touch', link: '/contact' },
  { cmd: 'cat resume.pdf', desc: 'Download resume', action: 'download' },
];

export default function Home() {
  const [stage, setStage] = useState(0);
  const [skipped, setSkipped] = useState(false);

  const handleLinkClick = () => {
    terminalSounds.playClick();
  };

  const handleSkip = () => {
    setSkipped(true);
    setStage(3);
    terminalSounds.playClick();
  };

  return (
    <div className="space-y-6 sm:space-y-8 md:space-y-6 lg:space-y-10 animate-fade-in relative">
      {/* Skip Button - only show during typing animation */}
      {stage < 3 && !skipped && (
        <Button
          onClick={handleSkip}
          variant="ghost"
          size="sm"
          className="fixed top-20 right-4 z-50 text-terminal-accent hover:text-terminal-accent-bright border border-terminal-accent/30 hover:border-terminal-accent"
        >
          <FastForward className="w-4 h-4 mr-2" />
          Skip
        </Button>
      )}

      {/* Hero */}
      <div className="space-y-6 sm:space-y-8 md:space-y-6 lg:space-y-8">
        <div className="border-2 border-terminal-accent p-6 sm:p-8 md:p-6 lg:p-10 xl:p-12 terminal-box-glow">
          {/* Stage 0: Type name */}
          <div className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-bold text-terminal-accent terminal-glow mb-3 md:mb-4 lg:mb-6 xl:mb-8 break-words leading-tight">
            {skipped ? (
              'SAM RANJITH PAUL'
            ) : (
              <TypeWriter
                text="SAM RANJITH PAUL"
                delay={80}
                showCursor={stage === 0}
                onComplete={() => setTimeout(() => setStage(1), 300)}
              />
            )}
          </div>
          
          {/* Stage 1: Type subtitle (only show after name is done or skipped) */}
          {(stage >= 1 || skipped) && (
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
          )}
        </div>

        {/* Stage 2: Type "Type a command to begin:" (with delay after subtitle starts) */}
        {(stage >= 1 || skipped) && (
          <div className="space-y-6 sm:space-y-8 md:space-y-4 lg:space-y-6 xl:space-y-8">
            <div className="text-terminal-text mb-4 sm:mb-6 md:mb-3 text-sm md:text-base lg:text-xl xl:text-2xl">
              {skipped ? (
                'Type a command to begin:'
              ) : (
                <TypeWriter 
                  text="Type a command to begin:" 
                  delay={40} 
                  showCursor={stage === 1}
                  onComplete={() => setTimeout(() => setStage(2), 200)}
                />
              )}
            </div>

            {/* Stage 3: Show commands (after "Type a command" is done or skipped) */}
            {(stage >= 2 || skipped) && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 md:gap-3 lg:gap-5 xl:gap-6 pl-3 sm:pl-4 md:pl-4 lg:pl-6">
                {suggestedCommands.map(({ cmd, desc, link, action }, index) => {
                  const shouldShow = skipped || stage >= 3;
                  
                  return (
                    <div 
                      key={cmd} 
                      className={`flex items-start gap-2 md:gap-3 lg:gap-4 group text-sm md:text-base lg:text-lg xl:text-xl ${
                        shouldShow ? 'opacity-100' : 'opacity-0'
                      } transition-opacity duration-300`}
                      style={{ 
                        transitionDelay: skipped ? '0ms' : `${index * 150}ms` 
                      }}
                    >
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
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
