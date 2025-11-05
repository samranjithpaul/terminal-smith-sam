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
    <nav className="mb-6 md:mb-8 lg:mb-10">
      <div className="flex flex-wrap gap-3 md:gap-4 lg:gap-6 text-xs sm:text-sm lg:text-base">
        {navItems.map(({ path, label, command }) => {
          const isActive = location.pathname === path;
          return (
            <Link
              key={path}
              to={path}
              className={`group flex items-center gap-1.5 sm:gap-2 transition-all ${
                isActive
                  ? 'text-terminal-accent terminal-glow'
                  : 'text-terminal-text-dim hover:text-terminal-text'
              }`}
            >
              <span className="text-terminal-accent-dim flex-shrink-0">$</span>
              <span className="group-hover:terminal-glow transition-all break-all">
                {command}
              </span>
              {isActive && <span className="text-terminal-accent flex-shrink-0">→</span>}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
