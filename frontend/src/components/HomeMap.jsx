import { motion } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup, Polyline, CircleMarker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useState, useEffect } from 'react';
import { MapPin, Truck } from 'lucide-react';

// Custom Icons
const donorIcon = new L.DivIcon({
  html: `<div class="w-8 h-8 bg-accent-500 rounded-full flex items-center justify-center text-white shadow-lg border-2 border-white animate-bounce"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg></div>`,
  className: 'custom-icon',
  iconSize: [32, 32],
  iconAnchor: [16, 32]
});

const ngoIcon = new L.DivIcon({
  html: `<div class="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center text-white shadow-xl border-2 border-white"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18"></path><path d="M9 8h1"></path><path d="M9 12h1"></path><path d="M9 16h1"></path><path d="M14 8h1"></path><path d="M14 12h1"></path><path d="M14 16h1"></path><path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16"></path></svg></div>`,
  className: 'custom-icon',
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

const HomeMap = () => {
  const center = [40.7128, -74.0060]; // NYC as demo center
  
  const donors = [
    { id: 1, pos: [40.7150, -74.0100], name: 'Fresh Bakery' },
    { id: 2, pos: [40.7200, -73.9950], name: 'Green Grocery' },
    { id: 3, pos: [40.7050, -74.0150], name: 'Tech Campus Cafe' }
  ];
  
  const ngos = [
    { id: 1, pos: [40.7128, -74.0060], name: 'City Food Bank' },
    { id: 2, pos: [40.7250, -73.9900], name: 'Hope Shelter' }
  ];

  const routes = [
    [donors[0].pos, ngos[0].pos],
    [donors[1].pos, ngos[1].pos],
    [donors[2].pos, ngos[0].pos]
  ];

  return (
    <section className="py-24 bg-gray-100 dark:bg-[#111111] relative border-y border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
            Live <span className="text-gradient">Impact Map</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Watch food redistribution happen in real-time. Our routing algorithm connects donors to the nearest NGOs for zero waste.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative h-[600px]">
        <div className="absolute inset-0 rounded-[2rem] overflow-hidden shadow-2xl glass-card mx-4 sm:mx-6 lg:mx-8 border border-white/20 z-10 p-2 bg-white/50 dark:bg-gray-900/50">
          <div className="w-full h-full rounded-3xl overflow-hidden relative">
            <MapContainer center={center} zoom={13} style={{ height: '100%', width: '100%' }} zoomControl={false} scrollWheelZoom={false}>
              {/* Dark mode tile layer for modern look */}
              <TileLayer
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                attribution='&copy; <a href="https://carto.com/">Carto</a>'
              />
              
              {/* Plot NGOs */}
              {ngos.map(ngo => (
                <Marker key={`ngo-${ngo.id}`} position={ngo.pos} icon={ngoIcon}>
                  <Popup className="custom-popup">
                    <div className="font-bold">{ngo.name}</div>
                    <div className="text-xs text-gray-500">Verified NGO Partner</div>
                  </Popup>
                </Marker>
              ))}

              {/* Plot Donors */}
              {donors.map(donor => (
                <Marker key={`donor-${donor.id}`} position={donor.pos} icon={donorIcon}>
                  <Popup>
                    <div className="font-bold">{donor.name}</div>
                    <div className="text-xs text-gray-500">Surplus Food Available</div>
                  </Popup>
                </Marker>
              ))}

              {/* Plot Animated Routes */}
              {routes.map((route, i) => (
                <Polyline 
                  key={`route-${i}`} 
                  positions={route} 
                  color="#10b981" 
                  weight={3} 
                  dashArray="10, 10" 
                  className="animate-[dash_10s_linear_infinite]"
                  opacity={0.6}
                />
              ))}

              {/* Add an animated volunteer truck along one of the routes */}
              <CircleMarker center={[40.7139, -74.0080]} radius={8} color="#f59e0b" fillColor="#f59e0b" fillOpacity={1}>
                <Popup>Volunteer in transit</Popup>
              </CircleMarker>
            </MapContainer>

            {/* Map Overlay Stats */}
            <div className="absolute top-4 left-4 z-[400] glass p-4 rounded-2xl hidden md:block">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-3 h-3 rounded-full bg-accent-500 animate-pulse"></div>
                <span className="text-sm font-bold text-gray-800 dark:text-gray-200">Active Donors (3)</span>
              </div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-3 h-3 rounded-full bg-primary-500"></div>
                <span className="text-sm font-bold text-gray-800 dark:text-gray-200">NGO Centers (2)</span>
              </div>
              <div className="flex items-center gap-3">
                <Truck size={14} className="text-orange-400" />
                <span className="text-sm font-bold text-gray-800 dark:text-gray-200">En Route (12)</span>
              </div>
            </div>

          </div>
        </div>
      </div>
      
      {/* Add keyframes for polyline dash animation in global css or inline here */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes dash {
          to {
            stroke-dashoffset: -100;
          }
        }
      `}} />
    </section>
  );
};

export default HomeMap;
