import React, { useState } from 'react';
import { Icons } from './Icons';
import { Space } from '../types';

interface HomeViewProps {
  spaces: Space[];
  onSelectSpace: (space: Space) => void;
}

const HomeView: React.FC<HomeViewProps> = ({ spaces, onSelectSpace }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const categories = ['Todos', 'Salones', 'Terrazas', 'Auditorios', 'Quinchos'];

  const filteredSpaces = spaces.filter(space => {
    const matchesSearch = space.name.toLowerCase().includes(searchTerm.toLowerCase()) || space.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Todos' || space.type.includes(selectedCategory.slice(0, -1)); // Simple matching logic
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="animate-fade-in pb-12">
      
      {/* HERO SECTION */}
      <div className="relative w-full h-[500px] rounded-2xl overflow-hidden mb-12 shadow-2xl">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2098&auto=format&fit=crop")' }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent flex flex-col justify-center px-8 md:px-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-orange-400 mb-4 font-semibold tracking-wide uppercase text-sm">
              <Icons.MapPin className="w-4 h-4" />
              <span>Región de Tarapacá, Chile</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
              Encuentra el espacio <br/>
              perfecto para tu <span className="text-primary">próximo evento</span>
            </h1>
            <p className="text-lg text-gray-200 mb-8 max-w-xl">
              Desde íntimas reuniones familiares hasta grandes celebraciones corporativas. Descubre espacios únicos.
            </p>

            {/* Search Bar */}
            <div className="bg-white p-2 rounded-xl shadow-xl flex flex-col md:flex-row gap-2 max-w-xl">
              <div className="flex-1 relative">
                <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input 
                  type="text" 
                  placeholder="¿Qué tipo de evento estás planeando?" 
                  className="w-full h-12 pl-10 pr-4 rounded-lg bg-gray-50 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button className="bg-primary hover:bg-primary-hover text-white px-8 h-12 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2">
                Buscar
              </button>
            </div>
            
            {/* Category Pills */}
            <div className="flex flex-wrap gap-2 mt-6">
              {categories.map(cat => (
                <button 
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium backdrop-blur-md transition-all ${
                    selectedCategory === cat 
                      ? 'bg-primary text-white border border-primary' 
                      : 'bg-white/10 text-white border border-white/20 hover:bg-white/20'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* STATS STRIP */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 px-4 mb-16 max-w-5xl mx-auto">
        <div className="text-center">
          <p className="text-3xl font-bold text-gray-900">50+</p>
          <p className="text-sm text-gray-500 font-medium uppercase tracking-wide">Espacios Disponibles</p>
        </div>
        <div className="text-center">
          <p className="text-3xl font-bold text-gray-900">5</p>
          <p className="text-sm text-gray-500 font-medium uppercase tracking-wide">Ciudades</p>
        </div>
        <div className="text-center">
          <p className="text-3xl font-bold text-gray-900">1000+</p>
          <p className="text-sm text-gray-500 font-medium uppercase tracking-wide">Eventos Realizados</p>
        </div>
        <div className="text-center">
          <p className="text-3xl font-bold text-gray-900">4.9/5</p>
          <p className="text-sm text-gray-500 font-medium uppercase tracking-wide">Valoración Usuarios</p>
        </div>
      </div>

      {/* LISTINGS SECTION */}
      <div className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Espacios Destacados</h2>
          <button className="text-primary font-medium hover:underline flex items-center gap-1">
            Ver todos <Icons.TrendingUp className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSpaces.map(space => (
            <div key={space.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col">
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={space.imageUrl} 
                  alt={space.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-gray-800 uppercase tracking-wider">
                  {space.type}
                </div>
                <div className="absolute top-4 right-4 bg-gray-900/50 backdrop-blur p-2 rounded-full text-white">
                   <Icons.Heart className="w-4 h-4 fill-transparent hover:fill-red-500 hover:text-red-500 transition-colors cursor-pointer" />
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors">{space.name}</h3>
                  <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-md">
                    <Icons.Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                    <span className="text-xs font-bold text-yellow-700">{space.rating}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
                  <Icons.MapPin className="w-4 h-4 text-gray-400" />
                  {space.location}
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6 py-4 border-y border-gray-100">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Icons.Users className="w-4 h-4 text-primary/70" />
                    <span className="text-sm">{space.capacity} pax</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                     <Icons.DollarSign className="w-4 h-4 text-primary/70" />
                     <span className="text-sm">Desde ${space.price.toLocaleString()}</span>
                  </div>
                </div>

                <div className="mt-auto">
                   <button 
                     onClick={() => onSelectSpace(space)}
                     className="w-full py-3 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-900 font-semibold text-sm transition-colors border border-gray-200 hover:border-gray-300"
                   >
                     Ver Detalles
                   </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CONTACT STRATEGY BLOCK */}
      <div className="bg-dark rounded-3xl p-8 md:p-16 relative overflow-hidden">
        {/* Abstract shapes */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

        <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">¿Tienes un espacio y quieres listarlo?</h2>
            <p className="text-gray-300 mb-8 text-lg">
              Únete a la red de espacios más exclusiva de Tarapacá. Gestiona reservas, aumenta tu visibilidad y conecta con miles de clientes potenciales.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-primary hover:bg-primary-hover text-white px-8 py-3 rounded-xl font-bold transition-transform hover:scale-105 shadow-lg shadow-primary/25">
                Publicar mi Espacio
              </button>
              <button className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-3 rounded-xl font-bold backdrop-blur-sm transition-colors">
                Contactar Soporte
              </button>
            </div>
            <div className="mt-8 flex items-center gap-6 text-gray-400">
              <div className="flex items-center gap-2">
                <Icons.Phone className="w-5 h-5" />
                <span>+56 9 1234 5678</span>
              </div>
              <div className="flex items-center gap-2">
                <Icons.Mail className="w-5 h-5" />
                <span>hola@espaciosnova.cl</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl">
             <h3 className="text-white font-semibold mb-4 text-xl">Consulta Rápida</h3>
             <div className="space-y-4">
                <input type="text" placeholder="Nombre completo" className="w-full bg-white/10 border border-white/20 rounded-lg p-3 text-white placeholder-gray-400 focus:outline-none focus:border-primary" />
                <input type="email" placeholder="Correo electrónico" className="w-full bg-white/10 border border-white/20 rounded-lg p-3 text-white placeholder-gray-400 focus:outline-none focus:border-primary" />
                <textarea placeholder="¿En qué podemos ayudarte?" className="w-full bg-white/10 border border-white/20 rounded-lg p-3 text-white placeholder-gray-400 focus:outline-none focus:border-primary h-32"></textarea>
                <button className="w-full bg-white text-dark font-bold py-3 rounded-lg hover:bg-gray-100 transition-colors">Enviar Mensaje</button>
             </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default HomeView;