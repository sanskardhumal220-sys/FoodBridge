import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useState, useEffect } from 'react';

// Fix for default marker icon in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const LocationMarker = ({ setPosition, position }) => {
  const map = useMapEvents({
    click(e) {
      setPosition(e.latlng);
    },
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, 15); // Zoom in closer when location is found
    },
  });

  // Automatic location via map.locate is sometimes blocked or fails silently
  // We'll rely on a manual effect in the parent component instead
  useEffect(() => {
    map.locate();
  }, [map]);

  return position === null ? null : (
    <Marker position={position}>
      <Popup>Selected Location</Popup>
    </Marker>
  );
};

const MapComponent = ({ onLocationSelect }) => {
  const [position, setPosition] = useState(null);

  const handlePosition = async (pos) => {
    setPosition(pos);
    // Reverse Geocoding using Nominatim
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${pos.lat}&lon=${pos.lng}`);
      if (response.ok) {
        const data = await response.json();
        // data.display_name contains the full address, data.address contains parts including postcode
        onLocationSelect(pos.lat, pos.lng, data.display_name || 'Address not found');
      } else {
        onLocationSelect(pos.lat, pos.lng, 'Could not fetch address');
      }
    } catch (error) {
      console.error('Reverse geocoding failed', error);
      onLocationSelect(pos.lat, pos.lng, 'Could not fetch address');
    }
  };

  const handleManualLocate = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const latlng = { lat: pos.coords.latitude, lng: pos.coords.longitude };
          handlePosition(latlng);
        },
        (err) => {
          console.error('Geolocation error:', err);
          alert('Could not get location automatically. Please click on the map to set your location.');
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  };

  // Try to automatically get location on component mount using standard browser API
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const latlng = { lat: pos.coords.latitude, lng: pos.coords.longitude };
          handlePosition(latlng);
        },
        (err) => {
          console.error('Automatic geolocation error:', err);
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    }
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <button 
        type="button" 
        onClick={handleManualLocate}
        className="bg-blue-100 text-blue-600 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400 py-2 px-4 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2 w-full"
      >
        📍 Use My Current Location
      </button>
      <div className="h-64 w-full rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 relative z-0">
        <MapContainer 
          center={[20.5937, 78.9629]} // Default to India roughly
          zoom={4} 
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; OpenStreetMap contributors'
          />
          <LocationMarker setPosition={handlePosition} position={position} />
        </MapContainer>
      </div>
    </div>
  );
};

export default MapComponent;
