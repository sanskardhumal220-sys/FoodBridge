import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { motion } from 'framer-motion';

const MapBounds = ({ markers, center, zoom }) => {
  const map = useMap();
  
  useEffect(() => {
    if (markers && markers.length > 0) {
      const bounds = L.latLngBounds(markers.map(m => [m.lat, m.lng]));
      if (markers.length === 1) {
          map.setView([markers[0].lat, markers[0].lng], zoom);
      } else {
          map.fitBounds(bounds, { padding: [50, 50], maxZoom: 15 });
      }
    } else {
      map.setView(center, zoom);
    }
  }, [markers, map, center, zoom]);

  return null;
};

// Fix for default marker icon in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export const RedIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

export const BlueIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const RadarMapComponent = ({ markers, donorLocation, center = [19.0760, 72.8777], zoom = 11, className = "h-96" }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`${className} w-full rounded-2xl overflow-hidden border-4 border-white dark:border-gray-800 shadow-xl relative z-0`}
    >
      <MapContainer 
        center={center} 
        zoom={zoom} 
        style={{ height: '100%', width: '100%' }}
      >
        <MapBounds markers={markers} center={center} zoom={zoom} />
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        
        {markers.map((marker) => (
          <Marker 
            key={marker.id} 
            position={[marker.lat, marker.lng]}
            icon={marker.isUrgent ? RedIcon : new L.Icon.Default()}
          >
            <Popup className="custom-popup">
              <div className="p-1">
                <h3 className="font-bold text-gray-900 text-lg mb-1">{marker.title}</h3>
                {marker.subtitle && <p className="text-sm text-gray-600 mb-2">{marker.subtitle}</p>}
                {marker.popupContent}
              </div>
            </Popup>
          </Marker>
        ))}

        {donorLocation && (
          <Marker 
            position={[donorLocation.lat, donorLocation.lng]}
            icon={BlueIcon}
          >
            <Popup>
              <div className="font-bold">You are here</div>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </motion.div>
  );
};

export default RadarMapComponent;
