import React, { useState, useEffect } from 'react';
import { Location } from '../types';

interface LocationFormProps {
  location: Location;
  onLocationChange: (location: Location) => void;
  className?: string;
}

const LocationForm: React.FC<LocationFormProps> = ({ location, onLocationChange, className = '' }) => {
  const [formData, setFormData] = useState<Location>(location);

  // Update form data when location prop changes
  useEffect(() => {
    setFormData(location);
  }, [location]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'latitude' || name === 'longitude'
        ? (value === '' ? 0 : parseFloat(value))
        : value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate latitude and longitude
    if (isNaN(formData.latitude) || isNaN(formData.longitude)) {
      alert('Please enter valid numeric values for latitude and longitude.');
      return;
    }

    if (formData.latitude < -90 || formData.latitude > 90) {
      alert('Latitude must be between -90 and 90 degrees.');
      return;
    }

    if (formData.longitude < -180 || formData.longitude > 180) {
      alert('Longitude must be between -180 and 180 degrees.');
      return;
    }

    onLocationChange(formData);
  };

  const useCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation: Location = {
            latitude: Math.round(position.coords.latitude * 10000) / 10000, // Round to 4 decimal places
            longitude: Math.round(position.coords.longitude * 10000) / 10000, // Round to 4 decimal places
            city: 'Current Location',
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
          };
          setFormData(newLocation);
          onLocationChange(newLocation);
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Unable to get your current location. Please enter manually.');
        },
        {
          enableHighAccuracy: false,
          timeout: 10000,
          maximumAge: 300000 // 5 minutes cache
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  return (
    <div className={`bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 ${className}`}>
      <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
        📍 Location Settings
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-300 mb-2">
            City Name
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm"
            placeholder="Enter city name"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="latitude" className="block text-sm font-medium text-gray-300 mb-2">
              Latitude
            </label>
            <input
              type="number"
              id="latitude"
              name="latitude"
              value={formData.latitude}
              onChange={handleChange}
              step="0.0001"
              min="-90"
              max="90"
              required
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm"
              placeholder="0.0000"
            />
          </div>

          <div>
            <label htmlFor="longitude" className="block text-sm font-medium text-gray-300 mb-2">
              Longitude
            </label>
            <input
              type="number"
              id="longitude"
              name="longitude"
              value={formData.longitude}
              onChange={handleChange}
              step="0.0001"
              min="-180"
              max="180"
              required
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm"
              placeholder="0.0000"
            />
          </div>
        </div>

        <div>
          <label htmlFor="timezone" className="block text-sm font-medium text-gray-300 mb-2">
            Timezone
          </label>
          <input
            type="text"
            id="timezone"
            name="timezone"
            value={formData.timezone}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm"
            placeholder="America/New_York"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={useCurrentLocation}
            className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            📱 Use My Location
          </button>

          <button
            type="submit"
            className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Update Location
          </button>
        </div>
      </form>

      <div className="mt-6 p-4 bg-white/5 rounded-lg">
        <h4 className="text-sm font-medium text-gray-300 mb-2">Quick Locations</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {[
            { city: 'New York', lat: 40.7128, lng: -74.0060, tz: 'America/New_York' },
            { city: 'London', lat: 51.5074, lng: -0.1278, tz: 'Europe/London' },
            { city: 'Paris', lat: 48.8566, lng: 2.3522, tz: 'Europe/Paris' },
            { city: 'Tokyo', lat: 35.6762, lng: 139.6503, tz: 'Asia/Tokyo' }
          ].map((loc) => (
            <button
              key={loc.city}
              type="button"
              onClick={() => {
                const newLocation = {
                  city: loc.city,
                  latitude: loc.lat,
                  longitude: loc.lng,
                  timezone: loc.tz
                };
                setFormData(newLocation);
                onLocationChange(newLocation);
              }}
              className="text-sm px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-gray-300 hover:text-white transition-colors"
            >
              {loc.city}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LocationForm;