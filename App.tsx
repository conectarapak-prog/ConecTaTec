import React, { useState } from 'react';
import Header from './components/Header';
import HomeView from './components/HomeView';
import AIChatView from './components/AIChatView';
import InteractiveMap from './components/InteractiveMap';
import SettingsView from './components/SettingsView';
import SpaceDetailsModal from './components/SpaceDetailsModal';
import SignUpModal from './components/SignUpModal';
import LoginModal from './components/LoginModal';
import ClientDashboard from './components/ClientDashboard'; // Import Client Dashboard
import OwnerDashboard from './components/OwnerDashboard'; // Import Owner Dashboard
import { View, Space, User } from './types';
import { Icons } from './components/Icons';

// Mock Data for Spaces (Enhanced)
const spacesData: Space[] = [
  {
    id: '1',
    name: 'Gran Salón Tarapacá',
    type: 'Salón de Eventos',
    capacity: 250,
    price: 1500000,
    pricePerHour: 20000, // 20k per hour
    location: 'Iquique, Sector Cavancha',
    coordinates: [-20.2312, -70.1438],
    imageUrl: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2098&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2098&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070&auto=format&fit=crop'
    ],
    rating: 4.8,
    sizeM2: 300,
    description: 'Elegancia y sofisticación frente al mar. El Gran Salón Tarapacá cuenta con techos altos, lámparas de cristal y una vista panorámica inigualable a Playa Cavancha. Ideal para bodas de lujo y cenas de gala corporativas.',
    amenities: ['wifi', 'ac', 'catering', 'music', 'parking', 'bar'],
    reviewsCount: 156,
    ratingBreakdown: [
      { category: 'Servicio', score: 4.9 },
      { category: 'Ubicación', score: 5.0 },
      { category: 'Limpieza', score: 4.7 }
    ],
    accessInfo: {
      floorLevel: '1er piso',
      parkingSlots: 50,
      hasElevator: true
    }
  },
  {
    id: '2',
    name: 'Terraza Vista Mar',
    type: 'Terraza',
    capacity: 80,
    price: 600000,
    pricePerHour: 60000,
    location: 'Iquique, Península',
    coordinates: [-20.2173, -70.1557],
    imageUrl: 'https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?q=80&w=1974&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?q=80&w=1974&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=1974',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1974'
    ],
    rating: 4.9,
    sizeM2: 120,
    description: 'Disfruta de la brisa marina en nuestra exclusiva terraza al aire libre. Perfecta para cócteles al atardecer, cumpleaños íntimos y lanzamientos de marca. Ambiente relajado con mobiliario lounge incluido.',
    amenities: ['wifi', 'bar', 'music'],
    reviewsCount: 89,
    ratingBreakdown: [
      { category: 'Vibe', score: 5.0 },
      { category: 'Bebidas', score: 4.8 },
      { category: 'Accesibilidad', score: 4.2 }
    ],
    accessInfo: {
      floorLevel: '2do piso',
      parkingSlots: 1,
      hasElevator: false
    }
  },
  {
    id: '3',
    name: 'Hacienda El Tamarugo',
    type: 'Quincho/Jardín',
    capacity: 500,
    price: 2200000,
    pricePerHour: 200000,
    location: 'Alto Hospicio',
    coordinates: [-20.2687, -70.1030],
    imageUrl: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=2069&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=2069&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1505944357481-51b542cd779d?q=80&w=2069'
    ],
    rating: 4.6,
    sizeM2: 2000,
    description: 'Un oasis en el desierto. Extensas áreas verdes con quincho totalmente equipado, piscina y zona de juegos. La opción predilecta para eventos de empresa masivos y matrimonios campestres.',
    amenities: ['parking', 'catering', 'music', 'wifi'],
    reviewsCount: 210,
    ratingBreakdown: [
      { category: 'Espacio', score: 4.9 },
      { category: 'Comodidad', score: 4.5 },
      { category: 'Precio/Calidad', score: 4.8 }
    ],
    accessInfo: {
      floorLevel: 'Planta baja',
      parkingSlots: 200,
      hasElevator: true // Technically irrelevant for ground floor, but logically accessible
    }
  },
  {
    id: '4',
    name: 'Auditorio Empresarial Norte',
    type: 'Auditorio',
    capacity: 150,
    price: 900000,
    pricePerHour: 80000,
    location: 'Iquique, Centro',
    coordinates: [-20.2133, -70.1500],
    imageUrl: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=2069&auto=format&fit=crop',
    images: [
       'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=2069&auto=format&fit=crop',
       'https://images.unsplash.com/photo-1475721027767-f4213d50532f?q=80&w=2070'
    ],
    rating: 4.5,
    sizeM2: 180,
    description: 'Tecnología de punta para tus conferencias. Proyectores 4K, sistema de audio envolvente y butacas ergonómicas. Ubicado en el corazón financiero de la ciudad.',
    amenities: ['wifi', 'ac', 'coffee'],
    reviewsCount: 45,
    ratingBreakdown: [
      { category: 'Tecnología', score: 4.8 },
      { category: 'Acústica', score: 4.7 },
      { category: 'Catering', score: 4.0 }
    ],
    accessInfo: {
      floorLevel: '5to piso',
      parkingSlots: 10,
      hasElevator: true
    }
  },
  {
    id: '5',
    name: 'Jardines de Pica',
    type: 'Jardín',
    capacity: 300,
    price: 1800000,
    pricePerHour: 150000,
    location: 'Pica, Región Interior',
    coordinates: [-20.4900, -69.3300],
    imageUrl: 'https://images.unsplash.com/photo-1587271407850-8d43891882c0?q=80&w=2070&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1587271407850-8d43891882c0?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=2070'
    ],
    rating: 5.0,
    sizeM2: 5000,
    description: 'Experiencia mágica entre mangos y limones. Un entorno natural único con clima privilegiado todo el año. Alojamiento disponible para invitados.',
    amenities: ['parking', 'catering', 'music', 'pool'],
    reviewsCount: 32,
    ratingBreakdown: [
      { category: 'Entorno', score: 5.0 },
      { category: 'Clima', score: 5.0 },
      { category: 'Atención', score: 4.9 }
    ],
    accessInfo: {
      floorLevel: 'Nivel Suelo',
      parkingSlots: 100,
      hasElevator: true
    }
  }
];

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.HOME);
  const [selectedSpace, setSelectedSpace] = useState<Space | null>(null);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const handleSpaceSelect = (space: Space) => {
    setSelectedSpace(space);
  };

  const closeModal = () => {
    setSelectedSpace(null);
  };

  const handleLoginSuccess = (loggedInUser: User) => {
    setUser(loggedInUser);
    setCurrentView(View.DASHBOARD); // Redirect to dashboard on login
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView(View.HOME);
  };

  const renderContent = () => {
    switch (currentView) {
      case View.HOME:
        return <HomeView spaces={spacesData} onSelectSpace={handleSpaceSelect} />;
      case View.MAP:
        return (
          <div className="h-[calc(100vh-6rem)] animate-fade-in">
             <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-900">Mapa de Espacios</h2>
                <span className="text-sm text-gray-500">Explora la ubicación de nuestros {spacesData.length} venues exclusivos</span>
             </div>
             <div className="h-full rounded-2xl overflow-hidden border border-gray-200 shadow-xl">
               <InteractiveMap spaces={spacesData} />
             </div>
          </div>
        );
      case View.AI_ASSISTANT:
        return (
          <div className="max-w-4xl mx-auto py-8 animate-fade-in">
             <div className="mb-6 text-center">
               <h2 className="text-3xl font-bold text-gray-900 mb-2">ConecTATE</h2>
               <p className="text-gray-600">Déjanos ayudarte a planificar cada detalle de tu evento.</p>
             </div>
             <AIChatView />
          </div>
        );
      case View.DASHBOARD:
        if (!user) return <HomeView spaces={spacesData} onSelectSpace={handleSpaceSelect} />;
        if (user.role === 'owner') {
          return <OwnerDashboard user={user} spaces={spacesData} />;
        }
        return <ClientDashboard user={user} spaces={spacesData} onNavigate={() => setCurrentView(View.HOME)} />;
      default:
        return <HomeView spaces={spacesData} onSelectSpace={handleSpaceSelect} />;
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 selection:bg-primary/20 selection:text-primary relative">
      <Header 
        currentView={currentView}
        setCurrentView={setCurrentView}
        onOpenSignUp={() => setIsSignUpOpen(true)}
        onOpenLogin={() => setIsLoginOpen(true)}
        user={user}
        onLogout={handleLogout}
      />
      
      <main className="container mx-auto px-4 md:px-6 py-6 min-h-screen">
        {renderContent()}
      </main>

      {/* Detail Modal Overlay */}
      {selectedSpace && (
        <SpaceDetailsModal 
          space={selectedSpace} 
          onClose={closeModal} 
        />
      )}

      {/* Sign Up Modal Overlay */}
      <SignUpModal 
        isOpen={isSignUpOpen}
        onClose={() => setIsSignUpOpen(false)}
        onSwitchToLogin={() => {
          setIsSignUpOpen(false);
          setIsLoginOpen(true);
        }}
      />

      {/* Login Modal Overlay */}
      <LoginModal 
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onSwitchToSignUp={() => {
          setIsLoginOpen(false);
          setIsSignUpOpen(true);
        }}
        onLogin={handleLoginSuccess}
      />

      {/* Simple Footer */}
      <footer className="bg-gray-50 border-t border-gray-100 py-12 mt-12">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
           <div>
              <div className="flex items-center gap-2 mb-4">
                 <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                    <Icons.MapPin className="w-4 h-4 text-white" />
                 </div>
                 <span className="font-bold text-lg">RinconIQQ</span>
              </div>
              <p className="text-sm text-gray-500">
                La plataforma líder en gestión de espacios para eventos en la región de Tarapacá.
              </p>
           </div>
           <div>
              <h4 className="font-bold mb-4">Explorar</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                 <li><button onClick={() => setCurrentView(View.HOME)}>Inicio</button></li>
                 <li><button onClick={() => setCurrentView(View.MAP)}>Mapa</button></li>
                 <li>Eventos</li>
                 <li>Blog</li>
              </ul>
           </div>
           <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                 <li>Términos y Condiciones</li>
                 <li>Política de Privacidad</li>
                 <li>Cookies</li>
              </ul>
           </div>
           <div>
              <h4 className="font-bold mb-4">Síguenos</h4>
              <div className="flex gap-4">
                 <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                 <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                 <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
              </div>
           </div>
        </div>
        <div className="container mx-auto px-4 mt-8 pt-8 border-t border-gray-200 text-center text-xs text-gray-400">
           © 2024 RinconIQQ. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
};

export default App;