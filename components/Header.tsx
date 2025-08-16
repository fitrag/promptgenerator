import React from 'react';

interface HeaderProps {
  onMenuClick: () => void;
  showMenuButton?: boolean;
}

const Header = ({ onMenuClick, showMenuButton = false }: HeaderProps): React.ReactNode => {
  return (
    <header className="fixed top-0 left-0 right-0 z-20 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 shadow-lg shadow-black/20 h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8">
      <a href="/" className="flex items-center gap-3 text-decoration-none focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-lg p-1">
        <div className="p-2 bg-slate-800 rounded-lg border border-slate-700">
          <i className="fa-solid fa-wand-magic-sparkles w-5 h-5 text-indigo-400"></i>
        </div>
        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400 hidden sm:block">
          AI Prompt Crafter
        </h1>
      </a>
      
      {showMenuButton && (
        <div className="md:hidden">
            <button 
              onClick={onMenuClick} 
              className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-700/50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-white" 
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