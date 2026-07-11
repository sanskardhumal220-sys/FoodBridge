import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import { io } from 'socket.io-client';
import 'leaflet/dist/leaflet.css';
import { Clock, MapPin } from 'lucide-react';
import { isValidCoordinate } from '../utils/location';

// Custom Icons
const createCustomIcon = (color) => {
  return L.divIcon({
    className: 'custom-div-icon',
    html: `<div style="background-color: ${color}; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 10px rgba(0,0,0,0.5);"></div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12]
  });
};

const pickupIcon = createCustomIcon('#3b82f6'); // Blue
const dropoffIcon = createCustomIcon('#ef4444'); // Red
const volunteerIcon = createCustomIcon('#22c55e'); // Green

// Component to handle map bounds and following
const MapController = ({ volunteerLoc, pickup, dropoff }) => {
  const map = useMap();
  useEffect(() => {
    if (volunteerLoc && pickup && dropoff) {
      const bounds = L.latLngBounds([
        [volunteerLoc.lat, volunteerLoc.lng],
        [pickup.lat, pickup.lng],
        [dropoff.lat, dropoff.lng]
      ]);
      map.fitBounds(bounds, { padding: [50, 50] });
    } else if (pickup && dropoff) {
        const bounds = L.latLngBounds([
            [pickup.lat, pickup.lng],
            [dropoff.lat, dropoff.lng]
        ]);
        map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [volunteerLoc, pickup, dropoff, map]);
  return null;
};

const LiveTrackingMap = ({ donationId, pickupLocation, dropoffLocation, isVolunteer, onClose }) => {
  const [volLocation, setVolLocation] = useState(null);
  const [route, setRoute] = useState(null);
  const [etaInfo, setEtaInfo] = useState({ duration: 0, distance: 0 });
  const socketRef = useRef(null);
  const watchIdRef = useRef(null);

  const DEFAULT_LOCATION = {
    lat: 26.2183,
    lng: 78.1828,
  };

  const isPickupValid = pickupLocation && isValidCoordinate(pickupLocation.lat, pickupLocation.lng);
  const isDropoffValid = dropoffLocation && isValidCoordinate(dropoffLocation.lat, dropoffLocation.lng);
  
  let finalPickup = pickupLocation;
  let finalDropoff = dropoffLocation;

  if (import.meta.env.DEV) {
    if (!isPickupValid) finalPickup = DEFAULT_LOCATION;
    if (!isDropoffValid) finalDropoff = DEFAULT_LOCATION;
  }

  const shouldShowFallback = !import.meta.env.DEV && (!isPickupValid || !isDropoffValid);

  useEffect(() => {
    socketRef.current = io(import.meta.env.VITE_API_URL || (import.meta.env.VITE_API_URL || 'http://localhost:5000') + '');
    
    if (isVolunteer) {
      if ('geolocation' in navigator) {
        watchIdRef.current = navigator.geolocation.watchPosition(
          (pos) => {
            const { latitude, longitude } = pos.coords;
            const newLoc = { lat: latitude, lng: longitude };
            setVolLocation(newLoc);
            socketRef.current.emit('update_location', {
              donationId,
              lat: latitude,
              lng: longitude
            });
          },
          (err) => console.error('Geolocation error:', err),
          { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 }
        );
      } else {
          console.error("Geolocation is not supported by this browser.");
      }
    } else {
      socketRef.current.emit('join_tracking', donationId);
      socketRef.current.on('location_update', (data) => {
        setVolLocation({ lat: data.lat, lng: data.lng });
      });
    }

    return () => {
      if (watchIdRef.current) navigator.geolocation.clearWatch(watchIdRef.current);
      if (socketRef.current) socketRef.current.disconnect();
    };
  }, [donationId, isVolunteer]);

  // Fetch Route from OSRM
  useEffect(() => {
    // If volunteer location exists, route from volunteer to dropoff.
    // Otherwise route from pickup to dropoff just to show the path.
    const startLoc = volLocation || finalPickup;

    if (startLoc?.lat && finalDropoff?.lat && !shouldShowFallback) {
      const fetchRoute = async () => {
        try {
          // OSRM expects longitude,latitude
          const url = `https://router.project-osrm.org/route/v1/driving/${startLoc.lng},${startLoc.lat};${finalDropoff.lng},${finalDropoff.lat}?overview=full&geometries=geojson`;
          const res = await fetch(url);
          const data = await res.json();
          
          if (data.routes && data.routes.length > 0) {
            const routeData = data.routes[0];
            const coordinates = routeData.geometry.coordinates.map(coord => [coord[1], coord[0]]); // Leaflet needs [lat, lng]
            setRoute(coordinates);
            setEtaInfo({
              duration: Math.ceil(routeData.duration / 60), // minutes
              distance: (routeData.distance / 1000).toFixed(1) // km
            });
          }
        } catch (error) {
          console.error("Failed to fetch route", error);
        }
      };
      
      fetchRoute();
      // Polling route every 30 seconds
      const interval = setInterval(fetchRoute, 30000);
      return () => clearInterval(interval);
    }
  }, [volLocation, finalPickup, finalDropoff]);


  if (shouldShowFallback) {
    return (
      <div className="relative w-full h-[600px] bg-gray-100 dark:bg-gray-800 rounded-2xl flex flex-col items-center justify-center p-8 text-center border border-gray-200 dark:border-gray-700 shadow-xl z-50">
         <MapPin size={48} className="text-gray-400 mb-4" />
         <h3 className="text-xl font-bold dark:text-white mb-2">Live Tracking</h3>
         <p className="text-red-500 font-medium mb-1">Location unavailable</p>
         <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md">The donor or NGO has not shared a valid location yet.</p>
         
         <div className="flex gap-4">
           <button onClick={onClose} className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-xl font-bold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
             Close
           </button>
           <button onClick={() => window.location.reload()} className="px-6 py-2 bg-blue-500 text-white rounded-xl font-bold hover:bg-blue-600 transition-colors">
             Retry
           </button>
         </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[600px] bg-gray-100 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-xl z-50">
      {/* Top Status Bar */}
      <div className="absolute top-4 left-4 right-4 z-[1000] flex justify-between items-start pointer-events-none">
        
        {/* ETA Card */}
        {etaInfo.duration > 0 && (
          <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md p-4 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 pointer-events-auto flex items-center gap-4">
            <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full text-green-600 dark:text-green-400">
              <Clock size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Estimated Arrival</p>
              <p className="text-2xl font-bold dark:text-white">{etaInfo.duration} min</p>
              <p className="text-xs text-gray-400 dark:text-gray-500">{etaInfo.distance} km remaining</p>
            </div>
          </div>
        )}

        <button 
          onClick={onClose}
          className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-lg shadow-lg pointer-events-auto font-bold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          Close Map
        </button>
      </div>
      
      {/* Volunteer Active Status */}
      {isVolunteer && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[1000] bg-green-500 text-white px-6 py-3 rounded-full shadow-lg font-bold flex items-center gap-2 pointer-events-auto">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
          </span>
          Live Broadcasting Location
        </div>
      )}

      {/* Map */}
      <MapContainer 
        center={[finalPickup.lat, finalPickup.lng]} 
        zoom={13} 
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        
        {/* Pickup Marker */}
        <Marker position={[finalPickup.lat, finalPickup.lng]} icon={pickupIcon}>
          <Popup>Pickup Location</Popup>
        </Marker>

        {/* Dropoff Marker */}
        <Marker position={[finalDropoff.lat, finalDropoff.lng]} icon={dropoffIcon}>
          <Popup>Dropoff Location (NGO)</Popup>
        </Marker>

        {/* Volunteer Marker */}
        {volLocation && (
          <Marker position={[volLocation.lat, volLocation.lng]} icon={volunteerIcon}>
            <Popup>Volunteer Location</Popup>
          </Marker>
        )}

        {/* Route Polyline */}
        {route && (
          <Polyline 
            positions={route} 
            color="#3b82f6" 
            weight={5} 
            opacity={0.8} 
            dashArray="10, 10" 
          />
        )}

        <MapController volunteerLoc={volLocation} pickup={finalPickup} dropoff={finalDropoff} />
      </MapContainer>
    </div>
  );
};

export default LiveTrackingMap;
