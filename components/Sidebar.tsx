import React from 'react';
import { View } from '../types';
import { Icons } from './Icons';

interface SidebarProps {
  currentView: View;
  setCurrentView: (view: View) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setCurrentView, isOpen, setIsOpen }) => {
  const menuItems = [
    { id: View.DASHBOARD, label: 'Panel Principal', icon: Icons.Dashboard },
    { id: View.ANALYTICS, label: 'Analítica', icon: Icons.Analytics },
    { id: View.AI_ASSISTANT, label: 'ConecTATE', icon: Icons.Cpu },
    { id: View.SETTINGS, label: 'Configuración', icon: Icons.Settings },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 z-20 lg:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsOpen(false)}
      />

      {/* Sidebar Container */}
      <aside className={`
        fixed top-0 left-0 z-30 h-full w-64 
        bg-background/95 backdrop-blur-xl border-r border-white/10
        transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="h-16 flex items-center px-6 border-b border-white/10">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center mr-3">
              <span className="text-white font-bold text-lg">R</span>
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              RinconIQQ
            </h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 py-6 px-3 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentView(item.id);
                    if (window.innerWidth < 1024) setIsOpen(false);
                  }}
                  className={`
                    w-full flex items-center px-3 py-3 rounded-lg transition-all duration-200 group
                    ${isActive 
                      ? 'bg-primary/10 text-primary border border-primary/20' 
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'}
                  `}
                >
                  <Icon className={`w-5 h-5 mr-3 transition-colors ${isActive ? 'text-primary' : 'group-hover:text-white'}`} />
                  <span className="font-medium text-sm">{item.label}</span>
                  {isActive && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(99,102,241,0.5)]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* User Profile Snippet at Bottom */}
          <div className="p-4 border-t border-white/10">
            <button className="flex items-center w-full p-2 rounded-lg hover:bg-white/5 transition-colors">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-accent to-primary flex items-center justify-center text-white font-medium text-xs">
                JD
              </div>
              <div className="ml-3 text-left">
                <p className="text-sm font-medium text-white">John Doe</p>
                <p className="text-xs text-gray-500">Admin</p>
              </div>
              <Icons.LogOut className="w-4 h-4 text-gray-500 ml-auto" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;