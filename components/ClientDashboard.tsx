import React from 'react';
import { User, Space } from '../types';
import { Icons } from './Icons';

interface ClientDashboardProps {
  user: User;
  spaces: Space[]; // To show recommendations/favorites
  onNavigate: () => void; // To go to search/map
}

const ClientDashboard: React.FC<ClientDashboardProps> = ({ user, spaces, onNavigate }) => {
  // Mock data for specific client view
  const upcomingBooking = {
    spaceName: 'Gran Salón Tarapacá',
    date: '15 Oct, 2024',
    time: '18:00 - 23:00',
    guests: 120,
    status: 'Confirmado',
    image: spaces[0]?.imageUrl
  };

  const favorites = [spaces[1], spaces[4]];

  return (
    <div className="animate-fade-in space-y-8 pb-12">
      {/* Welcome Block */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Hola, {user.name} 👋</h1>
          <p className="text-gray-500">Aquí tienes el resumen de tus eventos y espacios guardados.</p>
        </div>
        <button 
          onClick={onNavigate}
          className="bg-primary hover:bg-primary-hover text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-primary/20 transition-all flex items-center gap-2"
        >
          <Icons.Search className="w-4 h-4" />
          Explorar Nuevo Espacio
        </button>
      </div>

      {/* Block 1: Upcoming Event (Hero Card) */}
      <section>
        <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Icons.Calendar className="w-5 h-5 text-primary" />
          Tu Próximo Evento
        </h2>
        <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-64 h-full bg-gradient-to-l from-gray-50 to-transparent -z-0"></div>
           
           <div className="flex flex-col md:flex-row gap-6 relative z-10">
              <div className="w-full md:w-48 h-32 rounded-2xl overflow-hidden shadow-sm flex-shrink-0">
                <img src={upcomingBooking.image} alt="Event Venue" className="w-full h-full object-cover" />
              </div>
              
              <div className="flex-1 flex flex-col justify-center">
                 <div className="flex justify-between items-start">
                    <div>
                       <span className="inline-block px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold mb-2">
                          {upcomingBooking.status}
                       </span>
                       <h3 className="text-xl font-bold text-gray-900 mb-1">{upcomingBooking.spaceName}</h3>
                       <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1"><Icons.Clock className="w-4 h-4" /> {upcomingBooking.date} • {upcomingBooking.time}</span>
                          <span className="flex items-center gap-1"><Icons.Users className="w-4 h-4" /> {upcomingBooking.guests} Invitados</span>
                       </div>
                    </div>
                    <div className="hidden md:block">
                       <button className="text-primary font-bold text-sm hover:underline">Ver detalles</button>
                    </div>
                 </div>
                 
                 {/* Progress/Steps visualization */}
                 <div className="mt-6 flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-emerald-500 rounded-full"></div>
                    <div className="flex-1 h-1.5 bg-emerald-500 rounded-full"></div>
                    <div className="flex-1 h-1.5 bg-emerald-500 rounded-full"></div>
                    <div className="flex-1 h-1.5 bg-gray-200 rounded-full"></div>
                    <span className="text-xs font-medium text-gray-500 ml-2">Pagos pendientes</span>
                 </div>
              </div>
           </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Block 2: Favorites */}
         <section className="lg:col-span-2">
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Icons.Heart className="w-5 h-5 text-red-500" />
              Tus Favoritos
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
               {favorites.map(space => (
                 <div key={space?.id} className="bg-white border border-gray-100 rounded-2xl p-3 flex gap-4 hover:border-primary/30 transition-colors cursor-pointer group">
                    <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                       <img src={space?.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={space?.name} />
                    </div>
                    <div className="flex flex-col justify-center">
                       <h4 className="font-bold text-gray-900 line-clamp-1">{space?.name}</h4>
                       <p className="text-xs text-gray-500 mb-2">{space?.type}</p>
                       <p className="text-sm font-bold text-primary">${(space?.price || 0).toLocaleString()}</p>
                    </div>
                 </div>
               ))}
               <div className="bg-gray-50 border border-dashed border-gray-300 rounded-2xl p-3 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-100 hover:border-gray-400 transition-all min-h-[120px]">
                  <Icons.Search className="w-6 h-6 text-gray-400 mb-2" />
                  <p className="text-sm font-medium text-gray-600">Explorar más espacios</p>
               </div>
            </div>
         </section>

         {/* Block 3: Quick Actions / Categories */}
         <section>
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
               <Icons.TrendingUp className="w-5 h-5 text-primary" />
               Descubre
            </h2>
            <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
               <p className="text-sm text-gray-500 mb-4">Categorías populares esta semana en Tarapacá.</p>
               <div className="space-y-3">
                  {['Bodas en la Playa', 'Cumpleaños Infantiles', 'Seminarios Corporativos'].map((cat, i) => (
                     <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-primary/5 hover:text-primary transition-colors cursor-pointer group">
                        <span className="font-medium text-sm">{cat}</span>
                        <Icons.ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-primary" />
                     </div>
                  ))}
               </div>
            </div>
         </section>
      </div>
    </div>
  );
};

export default ClientDashboard;