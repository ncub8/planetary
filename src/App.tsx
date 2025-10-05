import React, { useState, useEffect } from 'react';
import './App.css';
import { Location, PlanetaryHoursCalculation } from './types';
import { calculatePlanetaryHours, getCurrentPlanetaryHour, formatTime } from './utils/planetaryHours';
import PlanetaryHourDisplay from './components/PlanetaryHourDisplay';
import LocationForm from './components/LocationForm';
import PlanetaryTable from './components/PlanetaryTable';

const App: React.FC = () => {
  const [location, setLocation] = useState<Location>({
    latitude: 40.7128,
    longitude: -74.0060,
    city: 'New York',
    timezone: 'America/New_York'
  });

  const [calculation, setCalculation] = useState<PlanetaryHoursCalculation | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update current time every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  // Recalculate when location or date changes
  useEffect(() => {
    const newCalculation = calculatePlanetaryHours(currentTime, location);
    setCalculation(newCalculation);
  }, [location, currentTime]);

  const handleLocationChange = (newLocation: Location) => {
    setLocation(newLocation);
  };

  const currentHour = calculation ? getCurrentPlanetaryHour(calculation) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      <div className="container mx-auto px-6 py-8">
        <header className="text-center mb-12">
          <h1 className="text-6xl font-bold text-white mb-4 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
            Planetary Hours
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Calculate planetary hours based on Chaldean astrology for any location and time
          </p>
          <div className="mt-4 text-gray-400">
            Current Time: {formatTime(currentTime)} | Location: {location.city}
          </div>
        </header>

        {currentHour && (
          <div className="mb-12">
            <PlanetaryHourDisplay
              currentHour={currentHour}
              calculation={calculation!}
            />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-1">
            <LocationForm
              location={location}
              onLocationChange={handleLocationChange}
            />
          </div>

          <div className="lg:col-span-2">
            {calculation && (
              <PlanetaryTable calculation={calculation} />
            )}
          </div>
        </div>

        {calculation && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                ☀️ Day Information
              </h3>
              <div className="space-y-2 text-gray-300">
                <p>Sunrise: {formatTime(calculation.sunData.sunrise)}</p>
                <p>Sunset: {formatTime(calculation.sunData.sunset)}</p>
                <p>Day Length: {Math.round(calculation.sunData.dayLength / 1000 / 60 / 60 * 100) / 100} hours</p>
                <p>Ruling Planet: {calculation.rulingPlanet.symbol} {calculation.rulingPlanet.name}</p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                🌙 Night Information
              </h3>
              <div className="space-y-2 text-gray-300">
                <p>Night Length: {Math.round(calculation.sunData.nightLength / 1000 / 60 / 60 * 100) / 100} hours</p>
                <p>Each Day Hour: {Math.round(calculation.sunData.dayLength / 12 / 1000 / 60)} minutes</p>
                <p>Each Night Hour: {Math.round(calculation.sunData.nightLength / 12 / 1000 / 60)} minutes</p>
                <p>Date: {calculation.date.toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
