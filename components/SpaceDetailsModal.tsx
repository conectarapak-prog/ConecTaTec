import React, { useState } from 'react';
import { Space } from '../types';
import { Icons } from './Icons';

interface SpaceDetailsModalProps {
  space: Space;
  onClose: () => void;
}

const SpaceDetailsModal: React.FC<SpaceDetailsModalProps> = ({ space, onClose }) => {
  const [isPricingOpen, setIsPricingOpen] = useState(false);
  const [selectedHours, setSelectedHours] = useState(2); // Default 2 hours
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Fallback price calculation if pricePerHour isn't in mock data
  const basePricePerHour = space.pricePerHour || Math.round(space.price / 10);
  const totalPrice = selectedHours * basePricePerHour;

  // Prepare images array
  const images = space.images && space.images.length > 0 ? space.images : [space.imageUrl];

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Helper to map amenity strings to icons
  const getAmenityIcon = (amenity: string) => {
    switch(amenity) {
      case 'wifi': return <Icons.Wifi className="w-4 h-4" />;
      case 'parking': return <Icons.Car className="w-4 h-4" />;
      case 'music': return <Icons.Music className="w-4 h-4" />;
      case 'catering': return <Icons.Utensils className="w-4 h-4" />;
      case 'bar': return <Icons.Wine className="w-4 h-4" />;
      case 'ac': return <Icons.Wind className="w-4 h-4" />;
      default: return <Icons.CheckCircle className="w-4 h-4" />;
    }
  };

  const getAmenityLabel = (amenity: string) => {
    const labels: Record<string, string> = {
      wifi: 'Wi-Fi Alta Velocidad',
      parking: 'Estacionamiento',
      music: 'Sistema de Audio',
      catering: 'Servicio Catering',
      bar: 'Barra Libre',
      ac: 'Aire Acondicionado'
    };
    return labels[amenity] || amenity;
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      {/* Modal Container: Fixed height on desktop for independent scrolling */}
      <div className="relative w-full max-w-5xl max-h-[90vh] md:h-[85vh] bg-white rounded-3xl shadow-2xl flex flex-col md:flex-row animate-fade-in overflow-hidden">
        
        {/* Close Button Mobile */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full backdrop-blur md:hidden"
        >
          <Icons.Close className="w-5 h-5" />
        </button>

        {/* Left Col: Image Carousel */}
        <div className="w-full md:w-2/5 h-56 md:h-full relative bg-gray-100 flex-shrink-0 group/carousel">
          <img 
            src={images[currentImageIndex]} 
            alt={`${space.name} - View ${currentImageIndex + 1}`} 
            className="w-full h-full object-cover transition-opacity duration-300"
          />
          
          {/* Carousel Navigation */}
          {images.length > 1 && (
            <>
              <button 
                onClick={handlePrevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-1.5 rounded-full backdrop-blur-sm opacity-0 group-hover/carousel:opacity-100 transition-opacity disabled:opacity-0"
              >
                <Icons.ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={handleNextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-1.5 rounded-full backdrop-blur-sm opacity-0 group-hover/carousel:opacity-100 transition-opacity disabled:opacity-0"
              >
                <Icons.ChevronRight className="w-5 h-5" />
              </button>
              
              {/* Dots */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10 md:bottom-6">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImageIndex(idx);
                    }}
                    className={`w-1.5 h-1.5 rounded-full transition-all shadow-sm ${
                      idx === currentImageIndex 
                        ? 'bg-white w-3' 
                        : 'bg-white/50 hover:bg-white/80'
                    }`}
                  />
                ))}
              </div>
            </>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:hidden pointer-events-none"></div>
          
          <div className="absolute bottom-0 left-0 w-full p-5 text-white md:hidden pointer-events-none">
            <span className="inline-block px-2.5 py-0.5 mb-1 text-[10px] font-bold uppercase tracking-wider bg-primary/90 rounded-full">
              {space.type}
            </span>
            <h2 className="text-xl font-bold leading-tight">{space.name}</h2>
          </div>
        </div>

        {/* Right Col: Content (Scrollable) */}
        <div className="flex-1 p-5 md:p-6 lg:p-8 flex flex-col overflow-y-auto custom-scrollbar bg-white">
          
          {/* Header Desktop */}
          <div className="hidden md:flex justify-between items-start mb-4">
            <div>
               <span className="inline-block px-2.5 py-0.5 mb-1.5 text-[10px] font-bold uppercase tracking-wider bg-orange-100 text-primary rounded-full">
                {space.type}
              </span>
              <h2 className="text-2xl lg:text-3xl font-extrabold text-gray-900 leading-tight">{space.name}</h2>
              <div className="flex items-center gap-1.5 text-gray-500 mt-1 text-sm">
                <Icons.MapPin className="w-3.5 h-3.5" />
                {space.location}
              </div>
            </div>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-full transition-colors -mr-2 -mt-2"
            >
              <Icons.Close className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 text-center hover:border-primary/30 transition-colors group">
              <Icons.Users className="w-5 h-5 mx-auto mb-1.5 text-primary group-hover:scale-110 transition-transform" />
              <p className="text-[10px] text-gray-500 font-medium uppercase">Capacidad</p>
              <p className="text-base font-bold text-gray-900">{space.capacity} Pax</p>
            </div>
            
            <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 text-center hover:border-primary/30 transition-colors group">
              <Icons.Maximize className="w-5 h-5 mx-auto mb-1.5 text-primary group-hover:scale-110 transition-transform" />
              <p className="text-[10px] text-gray-500 font-medium uppercase">Tamaño</p>
              <p className="text-base font-bold text-gray-900">{space.sizeM2 || 150} m²</p>
            </div>
            
            {/* COLLAPSIBLE PRICING TOGGLE */}
            <div 
              onClick={() => setIsPricingOpen(!isPricingOpen)}
              className={`
                cursor-pointer p-3 rounded-xl border text-center transition-all group relative
                ${isPricingOpen 
                  ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20' 
                  : 'bg-gray-50 border-gray-100 hover:border-primary/30 hover:bg-white'}
              `}
            >
               <div className="absolute top-1.5 right-1.5">
                 {isPricingOpen ? <Icons.ChevronUp className="w-3 h-3" /> : <Icons.ChevronDown className="w-3 h-3 text-gray-400" />}
               </div>
              <Icons.Clock className={`w-5 h-5 mx-auto mb-1.5 transition-transform group-hover:scale-110 ${isPricingOpen ? 'text-white' : 'text-primary'}`} />
              <p className={`text-[10px] font-medium uppercase ${isPricingOpen ? 'text-white/80' : 'text-gray-500'}`}>Por Hora</p>
              <p className={`text-base font-bold leading-tight ${isPricingOpen ? 'text-white' : 'text-gray-900'}`}>
                ${(basePricePerHour/1000).toFixed(0)}k
                <span className={`text-[10px] font-normal ml-0.5 ${isPricingOpen ? 'text-white/80' : 'text-gray-400'}`}>/hr</span>
              </p>
            </div>
          </div>

          {/* COLLAPSIBLE BLOCK CONTENT */}
          {isPricingOpen && (
            <div className="mb-4 bg-surface border border-primary/20 rounded-xl p-4 animate-fade-in origin-top shadow-inner">
               <div className="flex items-center justify-between mb-3">
                  <h4 className="font-bold text-gray-800 text-sm flex items-center gap-1.5">
                    <Icons.Dollar className="w-4 h-4 text-primary" />
                    Calculadora
                  </h4>
                  <span className="text-[10px] font-medium bg-white px-1.5 py-0.5 rounded border border-gray-200 text-gray-500">
                    Mínimo 2 horas
                  </span>
               </div>
               
               <div className="mb-4">
                 <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-gray-600">Duración:</span>
                    <span className="font-bold text-primary">{selectedHours} Horas</span>
                 </div>
                 <input 
                   type="range" 
                   min="2" 
                   max="24" 
                   step="1"
                   value={selectedHours}
                   onChange={(e) => setSelectedHours(parseInt(e.target.value))}
                   className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                 />
                 <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                    <span>2h</span>
                    <span>12h</span>
                    <span>24h</span>
                 </div>
               </div>

               <div className="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
                  <div>
                    <p className="text-[10px] text-gray-500 mb-0.5">Total Estimado</p>
                    <p className="text-xl font-extrabold text-gray-900">${totalPrice.toLocaleString()}</p>
                  </div>
                  <button className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg text-xs font-bold transition-transform active:scale-95 shadow-lg shadow-primary/20">
                    Reservar
                  </button>
               </div>
            </div>
          )}

          {/* Access Info Cards */}
          {space.accessInfo && (
            <div className="grid grid-cols-3 gap-3 mb-5">
               <div className="bg-white border border-gray-200 rounded-xl p-3 flex flex-col items-center justify-center text-center h-24 hover:border-gray-300 transition-colors">
                  <Icons.ArrowUp className="w-5 h-5 text-gray-600 mb-1.5" />
                  <span className="text-xs font-semibold text-gray-900 leading-tight">
                    {space.accessInfo.floorLevel}
                    <span className="block text-[10px] text-gray-500 font-normal mt-0.5">Nivel</span>
                  </span>
               </div>
               <div className="bg-white border border-gray-200 rounded-xl p-3 flex flex-col items-center justify-center text-center h-24 hover:border-gray-300 transition-colors">
                  <Icons.Car className="w-5 h-5 text-gray-600 mb-1.5" />
                  <span className="text-xs font-semibold text-gray-900 leading-tight">
                    Estacionamiento
                    <span className="block text-[10px] text-gray-500 font-normal mt-0.5">
                      {space.accessInfo.parkingSlots > 0 ? `${space.accessInfo.parkingSlots} cupos` : 'No disponible'}
                    </span>
                  </span>
               </div>
               <div className="bg-white border border-gray-200 rounded-xl p-3 flex flex-col items-center justify-center text-center h-24 hover:border-gray-300 transition-colors relative overflow-hidden">
                  <div className="relative mb-1.5">
                     <Icons.ChevronsUpDown className="w-5 h-5 text-gray-600" />
                     {!space.accessInfo.hasElevator && (
                       <div className="absolute -top-1 -right-1 bg-white rounded-full p-0.5">
                          <Icons.Ban className="w-3 h-3 text-red-500" />
                       </div>
                     )}
                  </div>
                  <span className="text-xs font-semibold text-gray-900 leading-tight">
                     Ascensor
                     <span className="block text-[10px] text-gray-500 font-normal mt-0.5">
                        {space.accessInfo.hasElevator ? 'Disponible' : 'No disponible'}
                     </span>
                  </span>
               </div>
            </div>
          )}

          {/* Description */}
          <div className="mb-5">
            <h3 className="text-sm font-bold text-gray-900 mb-2">Sobre este espacio</h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              {space.description || "Un espacio versátil diseñado para crear momentos inolvidables. Cuenta con iluminación natural, excelente acústica y todas las comodidades necesarias."}
            </p>
          </div>

          {/* Amenities */}
          <div className="mb-6">
            <h3 className="text-sm font-bold text-gray-900 mb-3">Servicios Incluidos</h3>
            <div className="grid grid-cols-2 gap-y-2.5 gap-x-4">
              {(space.amenities || ['wifi', 'parking', 'ac', 'music']).map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-gray-700">
                  <div className="text-primary/80 bg-orange-50 p-1 rounded-md">
                    {getAmenityIcon(item)}
                  </div>
                  <span className="text-xs sm:text-sm font-medium">{getAmenityLabel(item)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Strategic Rating / Metrics Block */}
          <div className="mt-auto bg-gray-900 rounded-xl p-5 text-white relative overflow-hidden flex-shrink-0">
             <div className="absolute top-0 right-0 w-24 h-24 bg-primary/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
             
             <div className="relative z-10">
               <div className="flex items-center justify-between mb-4">
                 <div>
                   <h3 className="font-bold text-base flex items-center gap-2">
                     <Icons.Activity className="w-4 h-4 text-primary" />
                     Calidad Nova
                   </h3>
                   <p className="text-gray-400 text-[10px] mt-0.5">{space.reviewsCount || 124} reseñas verificadas</p>
                 </div>
                 <div className="text-center bg-white/10 px-2 py-1 rounded-lg backdrop-blur-sm">
                   <p className="text-lg font-bold text-primary leading-none">{space.rating}</p>
                   <div className="flex gap-0.5 justify-center mt-0.5">
                     {[1,2,3,4,5].map(star => (
                       <Icons.Star key={star} className={`w-2 h-2 ${star <= Math.round(space.rating) ? 'fill-yellow-500 text-yellow-500' : 'text-gray-600'}`} />
                     ))}
                   </div>
                 </div>
               </div>

               {/* Metrics Bars */}
               <div className="space-y-2 mb-5">
                 {(space.ratingBreakdown || [
                   {category: 'Servicio', score: 4.8},
                   {category: 'Ubicación', score: 4.7}
                 ]).slice(0, 2).map((metric, i) => (
                   <div key={i}>
                     <div className="flex justify-between text-[10px] mb-1">
                       <span className="text-gray-300">{metric.category}</span>
                       <span className="font-bold">{metric.score}/5.0</span>
                     </div>
                     <div className="w-full bg-gray-700 rounded-full h-1">
                       <div className="bg-gradient-to-r from-primary to-orange-400 h-1 rounded-full" style={{ width: `${(metric.score/5)*100}%` }}></div>
                     </div>
                   </div>
                 ))}
               </div>

               <div className="flex gap-2.5">
                 <button className="flex-1 bg-white/10 hover:bg-white/20 text-white py-2.5 rounded-lg font-bold text-xs transition-colors border border-white/10">
                   Cotizar Evento
                 </button>
                 <button className="px-3 bg-primary hover:bg-primary-hover text-white rounded-lg font-medium text-xs transition-colors flex items-center justify-center gap-1.5 shadow-lg shadow-primary/20" title="Dejar Feedback">
                   <Icons.MessageCircle className="w-3.5 h-3.5" />
                   <span className="hidden sm:inline">Opiniones</span>
                 </button>
               </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SpaceDetailsModal;