import React from 'react';
import { Icons } from './Icons';

interface HeaderProps {
  toggleSidebar: () => void;
  title: string;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, title }) => {
  return (
    <header className="h-16 border-b border-white/10 bg-background/50 backdrop-blur-md sticky top-0 z-20 px-6 flex items-center justify-between">
      <div className="flex items-center">
        <button 
          onClick={toggleSidebar}
          className="lg:hidden mr-4 p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/10"
        >
          <Icons.Menu className="w-5 h-5" />
        </button>
        <h2 className="text-lg font-semibold text-white tracking-wide">{title}</h2>
      </div>

      <div className="flex items-center space-x-4">
        {/* Search */}
        <div className="hidden md:flex relative group">
          <Icons.Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2 group-focus-within:text-primary transition-colors" />
          <input 
            type="text" 
            placeholder="Buscar..." 
            className="bg-surface/50 border border-white/10 rounded-full py-1.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-primary/50 focus:bg-surface/80 w-64 transition-all"
          />
        </div>

        {/* Notifications */}
        <button className="relative p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors">
          <Icons.Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-surface"></span>
        </button>
      </div>
    </header>
  );
};

export default Header;
