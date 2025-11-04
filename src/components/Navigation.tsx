import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { path: '/', label: 'home', command: 'cd ~' },
  { path: '/about', label: 'about', command: 'cat about.txt' },
  { path: '/skills', label: 'skills', command: 'list --skills' },
  { path: '/projects', label: 'projects', command: 'show projects' },
  { path: '/contact', label: 'contact', command: 'contact --info' },
];

export const Navigation: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="mb-8">
      <div className="flex flex-wrap gap-4 text-sm">
        {navItems.map(({ path, label, command }) => {
          const isActive = location.pathname === path;
          return (
            <Link
              key={path}
              to={path}
              className={`group flex items-center gap-2 transition-all ${
                isActive
                  ? 'text-terminal-accent terminal-glow'
                  : 'text-terminal-text-dim hover:text-terminal-text'
              }`}
            >
              <span className="text-terminal-accent-dim">$</span>
              <span className="group-hover:terminal-glow transition-all">
                {command}
              </span>
              {isActive && <span className="text-terminal-accent">→</span>}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
