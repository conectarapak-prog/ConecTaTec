import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DashboardView from './components/DashboardView';
import AIChatView from './components/AIChatView';
import SettingsView from './components/SettingsView';
import { View } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.DASHBOARD);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (currentView) {
      case View.DASHBOARD:
        return <DashboardView />;
      case View.AI_CHAT:
        return <AIChatView />;
      case View.ANALYTICS:
        return (
          <div className="flex flex-col items-center justify-center h-[60vh] text-gray-400 animate-fade-in">
             <div className="glass-panel p-8 rounded-2xl text-center">
              <h2 className="text-2xl font-bold text-white mb-2">Analítica Avanzada</h2>
              <p>Módulo en construcción. Vuelve pronto.</p>
             </div>
          </div>
        );
      case View.SETTINGS:
        return <SettingsView />;
      default:
        return <DashboardView />;
    }
  };

  const getTitle = () => {
    switch(currentView) {
      case View.DASHBOARD: return 'Panel Principal';
      case View.AI_CHAT: return 'Asistente IA';
      case View.ANALYTICS: return 'Analítica';
      case View.SETTINGS: return 'Configuración';
      default: return 'Nova Platform';
    }
  }

  return (
    <div className="flex h-screen bg-background text-white overflow-hidden selection:bg-primary/30">
      
      {/* Decorative Background Glows */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[128px] pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-secondary/10 rounded-full blur-[100px] pointer-events-none z-0"></div>

      <Sidebar 
        currentView={currentView} 
        setCurrentView={setCurrentView}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      <div className="flex-1 flex flex-col min-w-0 z-10 relative">
        <Header 
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
          title={getTitle()}
        />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-6 lg:p-8 scroll-smooth">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;