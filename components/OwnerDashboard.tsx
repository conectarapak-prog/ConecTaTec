import React from 'react';
import { User, Space } from '../types';
import { Icons } from './Icons';
import { StatCard } from './StatCard';

interface OwnerDashboardProps {
  user: User;
  spaces: Space[]; // Assuming these are the user's spaces
}

const OwnerDashboard: React.FC<OwnerDashboardProps> = ({ user, spaces }) => {
  // Mock data for owner view
  const mySpaces = spaces.slice(0, 3); 
  const requests = [
    { id: 1, client: 'María González', date: '20 Oct, 2024', space: 'Gran Salón Tarapacá', guests: 200, status: 'pending' },
    { id: 2, client: 'Tech Solutions Ltd', date: '05 Nov, 2024', space: 'Auditorio Norte', guests: 50, status: 'pending' }
  ];

  return (
    <div className="animate-fade-in space-y-8 pb-12">
      
      {/* Welcome & Context */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
             <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-gray-900 text-white uppercase tracking-wider">Soy Dueño</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Panel de Control</h1>
          <p className="text-gray-500">Gestiona tus {mySpaces.length} espacios y revisa nuevas solicitudes.</p>
        </div>
        <div className="flex gap-3">
           <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors text-sm">
             Ver Calendario
           </button>
           <button className="bg-primary hover:bg-primary-hover text-white px-5 py-2 rounded-xl font-bold text-sm shadow-lg shadow-primary/20 transition-all flex items-center gap-2">
             <Icons.Plus className="w-4 h-4" />
             Publicar Espacio
           </button>
        </div>
      </div>

      {/* Block 1: Business Overview (Concise KPIs) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
           <div className="flex justify-between items-start mb-2">
              <span className="text-gray-500 text-xs font-bold uppercase">Ingresos Mes</span>
              <Icons.DollarSign className="w-4 h-4 text-emerald-500" />
           </div>
           <div>
              <span className="text-2xl font-bold text-gray-900">$4.2M</span>
              <span className="text-xs text-emerald-500 ml-2 font-medium">+12% vs mes anterior</span>
           </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
           <div className="flex justify-between items-start mb-2">
              <span className="text-gray-500 text-xs font-bold uppercase">Solicitudes</span>
              <Icons.Bell className="w-4 h-4 text-primary" />
           </div>
           <div>
              <span className="text-2xl font-bold text-gray-900">5</span>
              <span className="text-xs text-primary ml-2 font-medium">2 pendientes hoy</span>
           </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
           <div className="flex justify-between items-start mb-2">
              <span className="text-gray-500 text-xs font-bold uppercase">Visualizaciones</span>
              <Icons.Eye className="w-4 h-4 text-blue-500" />
           </div>
           <div>
              <span className="text-2xl font-bold text-gray-900">1.2k</span>
              <span className="text-xs text-gray-400 ml-2 font-medium">Últimos 30 días</span>
           </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
           <div className="flex justify-between items-start mb-2">
              <span className="text-gray-500 text-xs font-bold uppercase">Valoración</span>
              <Icons.Star className="w-4 h-4 text-yellow-500" />
           </div>
           <div>
              <span className="text-2xl font-bold text-gray-900">4.8</span>
              <span className="text-xs text-gray-400 ml-2 font-medium">Excelencia</span>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Block 2: Pending Requests (Actionable) */}
         <section className="lg:col-span-2">
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Icons.Clock className="w-5 h-5 text-primary" />
              Solicitudes Pendientes
            </h2>
            <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm">
               {requests.map((req, idx) => (
                  <div key={req.id} className={`p-5 flex flex-col sm:flex-row items-center justify-between gap-4 ${idx !== requests.length -1 ? 'border-b border-gray-100' : ''}`}>
                     <div className="flex items-center gap-4 w-full sm:w-auto">
                        <div className="w-10 h-10 rounded-full bg-orange-100 text-primary flex items-center justify-center font-bold text-sm">
                           {req.client.charAt(0)}
                        </div>
                        <div>
                           <h4 className="font-bold text-gray-900">{req.client}</h4>
                           <p className="text-xs text-gray-500">{req.space} • {req.date}</p>
                           <p className="text-xs font-medium text-gray-700 mt-0.5">{req.guests} Personas</p>
                        </div>
                     </div>
                     <div className="flex gap-2 w-full sm:w-auto">
                        <button className="flex-1 sm:flex-none px-4 py-2 rounded-lg border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 transition-colors">
                           Detalles
                        </button>
                        <button className="flex-1 sm:flex-none px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary-hover transition-colors shadow-sm">
                           Aceptar
                        </button>
                     </div>
                  </div>
               ))}
               <div className="p-3 bg-gray-50 text-center border-t border-gray-100">
                  <button className="text-xs font-bold text-gray-500 hover:text-primary transition-colors">Ver todas las solicitudes</button>
               </div>
            </div>
         </section>

         {/* Block 3: My Spaces (Inventory) */}
         <section>
            <div className="flex items-center justify-between mb-4">
               <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <Icons.Home className="w-5 h-5 text-gray-600" />
                  Mis Espacios
               </h2>
               <button className="text-xs font-bold text-primary">Gestionar</button>
            </div>
            
            <div className="space-y-3">
               {mySpaces.map(space => (
                  <div key={space.id} className="group flex gap-3 p-2 bg-white rounded-xl border border-gray-100 hover:border-primary/30 transition-all cursor-pointer">
                     <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 relative">
                        <img src={space.imageUrl} alt={space.name} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                     </div>
                     <div className="flex-1 flex flex-col justify-center">
                        <h4 className="font-bold text-gray-900 text-sm leading-tight mb-1">{space.name}</h4>
                        <div className="flex items-center justify-between">
                           <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded font-bold">Activo</span>
                           <span className="text-xs text-gray-500 font-medium">{space.rating} ★</span>
                        </div>
                     </div>
                     <div className="flex items-center pr-2">
                        <Icons.Settings className="w-4 h-4 text-gray-300 group-hover:text-gray-500" />
                     </div>
                  </div>
               ))}
            </div>
         </section>
      </div>
    </div>
  );
};

export default OwnerDashboard;