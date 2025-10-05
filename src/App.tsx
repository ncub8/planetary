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
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Update current time every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  // Recalculate when location or selected date changes
  useEffect(() => {
    const newCalculation = calculatePlanetaryHours(selectedDate, location);
    setCalculation(newCalculation);
  }, [location, selectedDate]);

  const handleLocationChange = (newLocation: Location) => {
    setLocation(newLocation);
  };

  const handleDateChange = (newDate: Date) => {
    setSelectedDate(newDate);
  };

  const goToPreviousDay = () => {
    const previousDay = new Date(selectedDate);
    previousDay.setDate(previousDay.getDate() - 1);
    setSelectedDate(previousDay);
  };

  const goToNextDay = () => {
    const nextDay = new Date(selectedDate);
    nextDay.setDate(nextDay.getDate() + 1);
    setSelectedDate(nextDay);
  };

  const goToToday = () => {
    setSelectedDate(new Date());
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
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

        {/* Date Navigation Controls */}
        <div className="mb-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={goToPreviousDay}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-white border border-white/20"
              title="Previous Day"
            >
              ← Previous
            </button>

            <div className="flex items-center gap-3">
              <input
                type="date"
                value={selectedDate.toISOString().split('T')[0]}
                onChange={(e) => handleDateChange(new Date(e.target.value))}
                className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm"
              />

              {!isToday(selectedDate) && (
                <button
                  onClick={goToToday}
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Today
                </button>
              )}
            </div>

            <button
              onClick={goToNextDay}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-white border border-white/20"
              title="Next Day"
            >
              Next →
            </button>
          </div>

          {calculation && (
            <div className="text-center sm:text-left">
              <div className="text-sm text-gray-300">
                Selected Date: <span className="text-white font-semibold">{selectedDate.toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
              </div>
              <div className="text-sm text-gray-400">
                Day Ruler: <span className="text-yellow-400">{calculation.rulingPlanet.symbol} {calculation.rulingPlanet.name}</span>
              </div>
            </div>
          )}
        </div>

        {currentHour && isToday(selectedDate) && (
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
                <p>Date: {selectedDate.toLocaleDateString()}</p>
                {isToday(selectedDate) && (
                  <p className="text-green-400 text-sm">● Live calculations</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
