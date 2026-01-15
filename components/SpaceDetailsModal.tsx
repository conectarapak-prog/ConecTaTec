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
      case 'wifi': return <Icons.Wifi className="w-5 h-5" />;
      case 'parking': return <Icons.Car className="w-5 h-5" />;
      case 'music': return <Icons.Music className="w-5 h-5" />;
      case 'catering': return <Icons.Utensils className="w-5 h-5" />;
      case 'bar': return <Icons.Wine className="w-5 h-5" />;
      case 'ac': return <Icons.Wind className="w-5 h-5" />;
      default: return <Icons.CheckCircle className="w-5 h-5" />;
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
      
      <div className="relative w-full max-w-5xl max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-y-auto overflow-x-hidden flex flex-col md:flex-row animate-fade-in custom-scrollbar">
        
        {/* Close Button Mobile */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full backdrop-blur md:hidden"
        >
          <Icons.Close className="w-6 h-6" />
        </button>

        {/* Left Col: Image Carousel & Key Stats */}
        <div className="w-full md:w-2/5 h-64 md:h-auto relative bg-gray-100 flex-shrink-0 group/carousel">
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
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full backdrop-blur-sm opacity-0 group-hover/carousel:opacity-100 transition-opacity disabled:opacity-0"
              >
                <Icons.ChevronLeft className="w-6 h-6" />
              </button>
              <button 
                onClick={handleNextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full backdrop-blur-sm opacity-0 group-hover/carousel:opacity-100 transition-opacity disabled:opacity-0"
              >
                <Icons.ChevronRight className="w-6 h-6" />
              </button>
              
              {/* Dots */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10 md:bottom-6">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImageIndex(idx);
                    }}
                    className={`w-2 h-2 rounded-full transition-all shadow-sm ${
                      idx === currentImageIndex 
                        ? 'bg-white w-4' 
                        : 'bg-white/50 hover:bg-white/80'
                    }`}
                  />
                ))}
              </div>
            </>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:hidden pointer-events-none"></div>
          
          <div className="absolute bottom-0 left-0 w-full p-6 text-white md:hidden pointer-events-none">
            <span className="inline-block px-3 py-1 mb-2 text-xs font-bold uppercase tracking-wider bg-primary/90 rounded-full">
              {space.type}
            </span>
            <h2 className="text-2xl font-bold leading-tight">{space.name}</h2>
          </div>
        </div>

        {/* Right Col: Content */}
        <div className="flex-1 p-6 md:p-10 flex flex-col">
          
          {/* Header Desktop */}
          <div className="hidden md:flex justify-between items-start mb-6">
            <div>
               <span className="inline-block px-3 py-1 mb-2 text-xs font-bold uppercase tracking-wider bg-orange-100 text-primary rounded-full">
                {space.type}
              </span>
              <h2 className="text-3xl font-extrabold text-gray-900">{space.name}</h2>
              <div className="flex items-center gap-2 text-gray-500 mt-1">
                <Icons.MapPin className="w-4 h-4" />
                {space.location}
              </div>
            </div>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Icons.Close className="w-6 h-6" />
            </button>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 text-center hover:border-primary/30 transition-colors group">
              <Icons.Users className="w-6 h-6 mx-auto mb-2 text-primary group-hover:scale-110 transition-transform" />
              <p className="text-xs text-gray-500 font-medium uppercase">Capacidad</p>
              <p className="text-lg font-bold text-gray-900">{space.capacity} Pax</p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 text-center hover:border-primary/30 transition-colors group">
              <Icons.Maximize className="w-6 h-6 mx-auto mb-2 text-primary group-hover:scale-110 transition-transform" />
              <p className="text-xs text-gray-500 font-medium uppercase">Tamaño</p>
              <p className="text-lg font-bold text-gray-900">{space.sizeM2 || 150} m²</p>
            </div>
            
            {/* COLLAPSIBLE PRICING TOGGLE */}
            <div 
              onClick={() => setIsPricingOpen(!isPricingOpen)}
              className={`
                cursor-pointer p-4 rounded-2xl border text-center transition-all group relative
                ${isPricingOpen 
                  ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20' 
                  : 'bg-gray-50 border-gray-100 hover:border-primary/30 hover:bg-white'}
              `}
            >
               <div className="absolute top-2 right-2">
                 {isPricingOpen ? <Icons.ChevronUp className="w-4 h-4" /> : <Icons.ChevronDown className="w-4 h-4 text-gray-400" />}
               </div>
              <Icons.Clock className={`w-6 h-6 mx-auto mb-2 transition-transform group-hover:scale-110 ${isPricingOpen ? 'text-white' : 'text-primary'}`} />
              <p className={`text-xs font-medium uppercase ${isPricingOpen ? 'text-white/80' : 'text-gray-500'}`}>Por Hora</p>
              <p className={`text-lg font-bold leading-tight ${isPricingOpen ? 'text-white' : 'text-gray-900'}`}>
                ${(basePricePerHour/1000).toFixed(0)}k
                <span className={`text-xs font-normal ml-0.5 ${isPricingOpen ? 'text-white/80' : 'text-gray-400'}`}>/hr</span>
              </p>
            </div>
          </div>

          {/* COLLAPSIBLE BLOCK CONTENT */}
          {isPricingOpen && (
            <div className="mb-6 bg-surface border border-primary/20 rounded-2xl p-5 animate-fade-in origin-top shadow-inner">
               <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold text-gray-800 flex items-center gap-2">
                    <Icons.Dollar className="w-5 h-5 text-primary" />
                    Calculadora de Arriendo
                  </h4>
                  <span className="text-xs font-medium bg-white px-2 py-1 rounded border border-gray-200 text-gray-500">
                    Mínimo 2 horas
                  </span>
               </div>
               
               <div className="mb-6">
                 <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Duración del evento:</span>
                    <span className="font-bold text-primary">{selectedHours} Horas</span>
                 </div>
                 <input 
                   type="range" 
                   min="2" 
                   max="24" 
                   step="1"
                   value={selectedHours}
                   onChange={(e) => setSelectedHours(parseInt(e.target.value))}
                   className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                 />
                 <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>2h</span>
                    <span>12h</span>
                    <span>24h</span>
                 </div>
               </div>

               <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Total Estimado</p>
                    <p className="text-2xl font-extrabold text-gray-900">${totalPrice.toLocaleString()}</p>
                  </div>
                  <button className="bg-primary hover:bg-primary-hover text-white px-6 py-2.5 rounded-lg text-sm font-bold transition-transform active:scale-95 shadow-lg shadow-primary/20">
                    Reservar {selectedHours}h
                  </button>
               </div>
            </div>
          )}

          {/* Access Info Cards */}
          {space.accessInfo && (
            <div className="grid grid-cols-3 gap-3 md:gap-4 mb-6">
               <div className="bg-white border border-gray-200 rounded-2xl p-3 md:p-4 flex flex-col items-center justify-center text-center h-28 md:h-32 shadow-sm">
                  <Icons.ArrowUp className="w-6 h-6 md:w-8 md:h-8 text-gray-700 mb-2" />
                  <span className="text-xs md:text-sm font-medium text-gray-900 leading-tight">
                    {space.accessInfo.floorLevel} <br/><span className="text-gray-500 font-normal">sobre el suelo</span>
                  </span>
               </div>
               <div className="bg-white border border-gray-200 rounded-2xl p-3 md:p-4 flex flex-col items-center justify-center text-center h-28 md:h-32 shadow-sm">
                  <Icons.Car className="w-6 h-6 md:w-8 md:h-8 text-gray-700 mb-2" />
                  <span className="text-xs md:text-sm font-medium text-gray-900 leading-tight">
                    Estacionamiento <br/>
                    <span className="text-gray-500 font-normal">
                      {space.accessInfo.parkingSlots > 0 ? `para ${space.accessInfo.parkingSlots} autos` : 'no disponible'}
                    </span>
                  </span>
               </div>
               <div className="bg-white border border-gray-200 rounded-2xl p-3 md:p-4 flex flex-col items-center justify-center text-center h-28 md:h-32 shadow-sm relative overflow-hidden">
                  <div className="relative mb-2">
                     <Icons.ChevronsUpDown className="w-6 h-6 md:w-8 md:h-8 text-gray-700" />
                     {!space.accessInfo.hasElevator && (
                       <div className="absolute -top-1 -right-1 bg-white rounded-full">
                          <Icons.Ban className="w-4 h-4 text-red-500" />
                       </div>
                     )}
                  </div>
                  <span className="text-xs md:text-sm font-medium text-gray-900 leading-tight">
                     {space.accessInfo.hasElevator ? 'Con Ascensor' : 'Sin Ascensor'}
                  </span>
               </div>
            </div>
          )}

          {/* Description */}
          <div className="mb-8 mt-2">
            <h3 className="text-lg font-bold text-gray-900 mb-3">Sobre este espacio</h3>
            <p className="text-gray-600 leading-relaxed text-sm md:text-base">
              {space.description || "Un espacio versátil diseñado para crear momentos inolvidables. Cuenta con iluminación natural, excelente acústica y todas las comodidades necesarias para tu evento, desde reuniones corporativas hasta grandes celebraciones."}
            </p>
          </div>

          {/* Amenities */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Servicios Incluidos</h3>
            <div className="grid grid-cols-2 gap-y-3 gap-x-6">
              {(space.amenities || ['wifi', 'parking', 'ac', 'music']).map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 text-gray-700">
                  <div className="text-primary/80 bg-orange-50 p-1.5 rounded-lg">
                    {getAmenityIcon(item)}
                  </div>
                  <span className="text-sm font-medium">{getAmenityLabel(item)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Strategic Rating / Metrics Block */}
          <div className="mt-auto bg-gray-900 rounded-2xl p-6 text-white relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
             
             <div className="relative z-10">
               <div className="flex items-center justify-between mb-6">
                 <div>
                   <h3 className="font-bold text-lg flex items-center gap-2">
                     <Icons.Activity className="w-5 h-5 text-primary" />
                     Métricas de Calidad
                   </h3>
                   <p className="text-gray-400 text-xs mt-1">Basado en {space.reviewsCount || 124} experiencias verificadas</p>
                 </div>
                 <div className="text-center bg-white/10 p-2 rounded-lg backdrop-blur-sm">
                   <p className="text-2xl font-bold text-primary">{space.rating}</p>
                   <div className="flex gap-0.5">
                     {[1,2,3,4,5].map(star => (
                       <Icons.Star key={star} className={`w-3 h-3 ${star <= Math.round(space.rating) ? 'fill-yellow-500 text-yellow-500' : 'text-gray-600'}`} />
                     ))}
                   </div>
                 </div>
               </div>

               {/* Metrics Bars */}
               <div className="space-y-3 mb-6">
                 {(space.ratingBreakdown || [
                   {category: 'Servicio', score: 4.8},
                   {category: 'Infraestructura', score: 4.9},
                   {category: 'Ubicación', score: 4.7}
                 ]).map((metric, i) => (
                   <div key={i}>
                     <div className="flex justify-between text-xs mb-1">
                       <span className="text-gray-300">{metric.category}</span>
                       <span className="font-bold">{metric.score}/5.0</span>
                     </div>
                     <div className="w-full bg-gray-700 rounded-full h-1.5">
                       <div className="bg-gradient-to-r from-primary to-orange-400 h-1.5 rounded-full" style={{ width: `${(metric.score/5)*100}%` }}></div>
                     </div>
                   </div>
                 ))}
               </div>

               <div className="flex gap-3">
                 <button className="flex-1 bg-white/10 hover:bg-white/20 text-white py-3 rounded-xl font-bold text-sm transition-colors border border-white/10">
                   Cotizar Evento Completo
                 </button>
                 <button className="px-4 bg-primary hover:bg-primary-hover text-white rounded-xl font-medium text-sm transition-colors flex items-center justify-center gap-2 shadow-lg shadow-primary/20" title="Dejar Feedback">
                   <Icons.MessageCircle className="w-4 h-4" />
                   <span className="hidden sm:inline">Calificar</span>
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