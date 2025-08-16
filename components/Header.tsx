import React from 'react';

interface HeaderProps {
  onMenuClick: () => void;
  showMenuButton?: boolean;
}

const Header = ({ onMenuClick, showMenuButton = false }: HeaderProps): React.ReactNode => {
  return (
    <header className="fixed top-0 left-0 right-0 z-20 bg-base/80 backdrop-blur-xl border-b border-border shadow-lg shadow-black/20 h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8">
      <a href="/" className="flex items-center gap-3 text-decoration-none focus:outline-none focus:ring-2 focus:ring-primary rounded-lg p-1 -ml-1">
        <div className="p-2 bg-surface rounded-lg border border-border">
          <i className="fa-solid fa-wand-magic-sparkles w-5 h-5 text-primary"></i>
        </div>
        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-200 to-slate-400 hidden sm:block">
          AI Prompt Crafter
        </h1>
      </a>
      
      {showMenuButton && (
        <div className="md:hidden">
            <button 
              onClick={onMenuClick} 
              className="p-2 rounded-md text-muted hover:text-white hover:bg-surface/50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-base focus:ring-white" 
              aria-label="Open controls menu"
            >
              <i className="fa-solid fa-bars w-6 h-6"></i>
            </button>
        </div>
      )}
    </header>
  );
};

export default Header;