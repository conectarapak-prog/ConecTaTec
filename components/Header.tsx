import React from 'react';
import { Icons } from './Icons';
import { View } from '../types';

interface HeaderProps {
  currentView: View;
  setCurrentView: (view: View) => void;
  onOpenSignUp?: () => void; // Optional callback for opening the signup modal
}

const Header: React.FC<HeaderProps> = ({ currentView, setCurrentView, onOpenSignUp }) => {
  return (
    <header className="h-20 bg-white border-b border-gray-100 sticky top-0 z-50 px-6 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-8">
        {/* Logo */}
        <div 
          className="flex items-center cursor-pointer" 
          onClick={() => setCurrentView(View.HOME)}
        >
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center mr-3 shadow-lg shadow-primary/30">
            <Icons.MapPin className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-gray-800 leading-none">Espacios<span className="text-primary">Nova</span></h1>
            <p className="text-[10px] text-gray-500 tracking-wider font-medium">EVENTOS & CONVENCIONES</p>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6">
          <button 
            onClick={() => setCurrentView(View.HOME)}
            className={`text-sm font-medium transition-colors ${currentView === View.HOME ? 'text-primary' : 'text-gray-600 hover:text-primary'}`}
          >
            Explorar Espacios
          </button>
          <button 
            onClick={() => setCurrentView(View.MAP)}
            className={`text-sm font-medium transition-colors ${currentView === View.MAP ? 'text-primary' : 'text-gray-600 hover:text-primary'}`}
          >
            Mapa Interactivo
          </button>
        </nav>
      </div>

      <div className="flex items-center space-x-3">
        <button 
          onClick={() => setCurrentView(View.AI_ASSISTANT)}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all
            ${currentView === View.AI_ASSISTANT 
              ? 'bg-primary text-white shadow-lg shadow-primary/30' 
              : 'bg-primary/10 text-primary hover:bg-primary/20'}
          `}
        >
          <Icons.Cpu className="w-4 h-4" />
          <span className="hidden sm:inline">Asistente Nova</span>
        </button>

        <div className="h-6 w-px bg-gray-200 mx-2 hidden sm:block"></div>

        <button className="hidden sm:block text-sm font-medium text-gray-600 hover:text-primary px-3 py-2">
          Iniciar Sesión
        </button>
        <button 
          onClick={onOpenSignUp}
          className="bg-primary hover:bg-primary-hover text-white px-5 py-2.5 rounded-lg text-sm font-semibold shadow-md transition-all hover:shadow-lg"
        >
          Registrarse
        </button>
      </div>
    </header>
  );
};

export default Header;