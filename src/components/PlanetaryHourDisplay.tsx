import React from 'react';
import { PlanetaryHour, PlanetaryHoursCalculation } from '../types';
import { formatTime, getNextPlanetaryHour } from '../utils/planetaryHours';

interface PlanetaryHourDisplayProps {
  currentHour: PlanetaryHour;
  calculation: PlanetaryHoursCalculation;
}

const PlanetaryHourDisplay: React.FC<PlanetaryHourDisplayProps> = ({ currentHour, calculation }) => {
  const nextHour = getNextPlanetaryHour(calculation);
  const timeRemaining = currentHour.endTime.getTime() - Date.now();
  const minutesRemaining = Math.max(0, Math.floor(timeRemaining / (1000 * 60)));

  return (
    <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-lg rounded-3xl p-8 border border-white/30 shadow-2xl">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2">Current Planetary Hour</h2>
        <div className="flex items-center justify-center mb-6">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center text-3xl mr-4 shadow-lg"
            style={{ backgroundColor: currentHour.planet.color }}
          >
            {currentHour.planet.symbol}
          </div>
          <div className="text-left">
            <h3 className="text-2xl font-bold text-white">{currentHour.planet.name}</h3>
            <p className="text-gray-300">
              {currentHour.isDayHour ? 'Day' : 'Night'} Hour #{currentHour.hourNumber}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white/10 rounded-xl p-4">
            <h4 className="text-sm font-medium text-gray-300 mb-1">Start Time</h4>
            <p className="text-lg font-bold text-white">{formatTime(currentHour.startTime)}</p>
          </div>
          <div className="bg-white/10 rounded-xl p-4">
            <h4 className="text-sm font-medium text-gray-300 mb-1">End Time</h4>
            <p className="text-lg font-bold text-white">{formatTime(currentHour.endTime)}</p>
          </div>
          <div className="bg-white/10 rounded-xl p-4">
            <h4 className="text-sm font-medium text-gray-300 mb-1">Time Remaining</h4>
            <p className="text-lg font-bold text-yellow-400">{minutesRemaining} minutes</p>
          </div>
        </div>

        <div className="bg-white/10 rounded-xl p-6 mb-6">
          <h4 className="text-lg font-semibold text-white mb-3">Planet Qualities</h4>
          <p className="text-gray-300 mb-3">{currentHour.planet.description}</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {currentHour.planet.qualities.map((quality, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-white/20 rounded-full text-sm text-white capitalize"
              >
                {quality}
              </span>
            ))}
          </div>
        </div>

        {nextHour && (
          <div className="bg-white/10 rounded-xl p-4">
            <h4 className="text-sm font-medium text-gray-300 mb-2">Next Hour</h4>
            <div className="flex items-center justify-center">
              <span
                className="w-8 h-8 rounded-full flex items-center justify-center text-lg mr-3"
                style={{ backgroundColor: nextHour.planet.color }}
              >
                {nextHour.planet.symbol}
              </span>
              <span className="text-white font-semibold">
                {nextHour.planet.name} at {formatTime(nextHour.startTime)}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlanetaryHourDisplay;