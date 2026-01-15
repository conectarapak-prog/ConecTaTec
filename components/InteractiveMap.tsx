import React, { useEffect, useRef } from 'react';
import { Space } from '../types';
import L from 'leaflet';

// Fix for default Leaflet markers not showing
const iconUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png';
const iconRetinaUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png';
const shadowUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png';

interface InteractiveMapProps {
  spaces: Space[];
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({ spaces }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (mapContainerRef.current && !mapInstanceRef.current) {
      // Initialize map centered on Iquique/Tarapacá region approximation
      const map = L.map(mapContainerRef.current).setView([-20.2133, -70.1500], 13);
      mapInstanceRef.current = map;

      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20
      }).addTo(map);

      // Custom Icon
      const customIcon = L.icon({
        iconUrl: iconUrl,
        iconRetinaUrl: iconRetinaUrl,
        shadowUrl: shadowUrl,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        tooltipAnchor: [16, -28],
        shadowSize: [41, 41]
      });

      // Add markers
      spaces.forEach(space => {
        const marker = L.marker(space.coordinates, { icon: customIcon }).addTo(map);
        
        const popupContent = `
          <div style="font-family: Inter, sans-serif; width: 200px;">
            <img src="${space.imageUrl}" style="width: 100%; height: 100px; object-fit: cover; border-radius: 8px; margin-bottom: 8px;" />
            <h3 style="margin: 0; font-weight: 600; font-size: 14px; color: #1e293b;">${space.name}</h3>
            <p style="margin: 4px 0; font-size: 12px; color: #64748b;">${space.type} • Cap. ${space.capacity}</p>
            <p style="margin: 0; font-weight: bold; color: #ea580c; font-size: 13px;">$${space.price.toLocaleString()}</p>
          </div>
        `;
        
        marker.bindPopup(popupContent);
      });
    }

    // Cleanup
    return () => {
      // We don't remove the map instance to prevent re-initialization issues in React 18 strict mode usually,
      // but for this snippet we'll let it persist or manage it via ref check.
    };
  }, [spaces]);

  return (
    <div className="w-full h-full rounded-xl overflow-hidden shadow-lg border border-gray-200 relative z-0">
      <div ref={mapContainerRef} className="w-full h-full bg-slate-100" />
      
      {/* Overlay Filters within Map */}
      <div className="absolute top-4 right-4 z-[400] bg-white p-2 rounded-lg shadow-md flex flex-col gap-2">
         <button className="p-2 hover:bg-gray-100 rounded text-gray-600" title="Centrar">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/><path d="M12 22V2"/><path d="M22 12H2"/></svg>
         </button>
      </div>
    </div>
  );
};

export default InteractiveMap;