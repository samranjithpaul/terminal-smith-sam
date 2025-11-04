import React, { useState } from 'react';
import { TypeWriter } from '@/components/TypeWriter';
import { CommandPrompt } from '@/components/CommandPrompt';
import { Download } from 'lucide-react';
import { Link } from 'react-router-dom';

const bootSequence = [
  'Initializing terminal session...',
  'Loading system modules... [OK]',
  'Checking network connection... [OK]',
  'Mounting file systems... [OK]',
  'Starting shell environment... [OK]',
  'Welcome to the system.',
];

const suggestedCommands = [
  { cmd: 'help', desc: 'Show available commands' },
  { cmd: 'about', desc: 'Display information about me', link: '/about' },
  { cmd: 'skills', desc: 'List technical skills', link: '/skills' },
  { cmd: 'projects', desc: 'Browse project portfolio', link: '/projects' },
  { cmd: 'contact', desc: 'Get in touch', link: '/contact' },
  { cmd: 'cat resume.pdf', desc: 'Download resume', action: 'download' },
];

export default function Home() {
  const [bootComplete, setBootComplete] = useState(false);
  const [showCommands, setShowCommands] = useState(false);

  return (
    <div className="space-y-6">
      {/* Boot Sequence */}
      <div className="space-y-2 mb-8">
        {bootSequence.map((line, i) => (
          <div key={i} className="text-terminal-text-dim text-sm">
            <TypeWriter
              text={line}
              delay={30}
              showCursor={false}
              onComplete={() => {
                if (i === bootSequence.length - 1) {
                  setTimeout(() => setBootComplete(true), 500);
                }
              }}
            />
          </div>
        ))}
      </div>

      {/* Hero */}
      {bootComplete && (
        <div className="space-y-6">
          <div className="border-2 border-terminal-accent p-6 terminal-box-glow">
            <div className="text-5xl md:text-7xl font-bold text-terminal-accent terminal-glow mb-4 font-mono">
              <TypeWriter
                text="SAM RANJITH PAUL"
                delay={80}
                showCursor={false}
                onComplete={() => setTimeout(() => setShowCommands(true), 500)}
              />
            </div>
            <div className="text-xl md:text-2xl text-terminal-text-dim">
              <TypeWriter text="Full-Stack Developer" delay={60} showCursor={false} />
            </div>
          </div>

          {/* Command Suggestions */}
          {showCommands && (
            <div className="space-y-4">
              <div className="text-terminal-text mb-3">
                <TypeWriter text="Type a command to begin:" delay={40} showCursor={false} />
              </div>

              <div className="space-y-2 pl-4">
                {suggestedCommands.map(({ cmd, desc, link, action }) => (
                  <div key={cmd} className="flex items-start gap-3 group">
                    <span className="text-terminal-accent-dim">$</span>
                    {link ? (
                      <Link
                        to={link}
                        className="flex-1 hover:text-terminal-accent transition-all terminal-glow"
                      >
                        <span className="text-terminal-accent font-semibold">{cmd}</span>
                        <span className="text-terminal-text-dim ml-3">// {desc}</span>
                      </Link>
                    ) : action === 'download' ? (
                      <a
                        href="/resume.pdf"
                        download
                        className="flex-1 hover:text-terminal-accent transition-all terminal-glow flex items-center gap-2"
                      >
                        <span className="text-terminal-accent font-semibold">{cmd}</span>
                        <span className="text-terminal-text-dim ml-3">// {desc}</span>
                        <Download className="w-4 h-4 ml-2" />
                      </a>
                    ) : (
                      <div className="flex-1">
                        <span className="text-terminal-accent font-semibold">{cmd}</span>
                        <span className="text-terminal-text-dim ml-3">// {desc}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Interactive Prompt */}
              <div className="mt-8 pt-6 border-t border-terminal-border">
                <CommandPrompt user="sam" />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
