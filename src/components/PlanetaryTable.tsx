import React, { useState } from 'react';
import { PlanetaryHoursCalculation, PlanetaryHour } from '../types';
import { formatTime } from '../utils/planetaryHours';

interface PlanetaryTableProps {
  calculation: PlanetaryHoursCalculation;
  className?: string;
}

const PlanetaryTable: React.FC<PlanetaryTableProps> = ({ calculation, className = '' }) => {
  const [activeTab, setActiveTab] = useState<'day' | 'night'>('day');

  const currentTime = new Date();
  const isDayTime = currentTime >= calculation.sunData.sunrise && currentTime < calculation.sunData.sunset;

  const isCurrentHour = (hour: PlanetaryHour): boolean => {
    return currentTime >= hour.startTime && currentTime < hour.endTime;
  };

  const renderHourRow = (hour: PlanetaryHour, index: number) => {
    const isCurrent = isCurrentHour(hour);

    return (
      <tr
        key={index}
        className={`hover:bg-white/10 transition-colors duration-200 ${
          isCurrent ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-l-4 border-yellow-400' : ''
        }`}
      >
        <td className="px-4 py-3 text-center">
          <span className={`text-lg font-bold ${isCurrent ? 'text-yellow-400' : 'text-white'}`}>
            {hour.hourNumber}
          </span>
        </td>
        <td className="px-4 py-3">
          <div className="flex items-center">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-lg mr-3 shadow-lg"
              style={{ backgroundColor: hour.planet.color }}
            >
              {hour.planet.symbol}
            </div>
            <span className={`font-semibold ${isCurrent ? 'text-yellow-400' : 'text-white'}`}>
              {hour.planet.name}
            </span>
          </div>
        </td>
        <td className={`px-4 py-3 font-mono ${isCurrent ? 'text-yellow-400' : 'text-gray-300'}`}>
          {formatTime(hour.startTime)}
        </td>
        <td className={`px-4 py-3 font-mono ${isCurrent ? 'text-yellow-400' : 'text-gray-300'}`}>
          {formatTime(hour.endTime)}
        </td>
        <td className={`px-4 py-3 text-sm ${isCurrent ? 'text-yellow-300' : 'text-gray-400'}`}>
          <div className="flex flex-wrap gap-1">
            {hour.planet.qualities.slice(0, 2).map((quality, i) => (
              <span
                key={i}
                className={`px-2 py-1 rounded text-xs ${
                  isCurrent ? 'bg-yellow-500/20 text-yellow-200' : 'bg-white/20 text-gray-300'
                }`}
              >
                {quality}
              </span>
            ))}
          </div>
        </td>
      </tr>
    );
  };

  return (
    <div className={`bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 overflow-hidden ${className}`}>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
          🕐 Planetary Hours Schedule
        </h3>

        {/* Tab Navigation */}
        <div className="flex mb-6">
          <button
            onClick={() => setActiveTab('day')}
            className={`flex-1 py-3 px-6 rounded-l-lg font-semibold transition-all duration-300 ${
              activeTab === 'day'
                ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg'
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
          >
            ☀️ Day Hours
            {isDayTime && (
              <span className="ml-2 px-2 py-1 bg-green-500 text-white text-xs rounded-full">
                CURRENT
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('night')}
            className={`flex-1 py-3 px-6 rounded-r-lg font-semibold transition-all duration-300 ${
              activeTab === 'night'
                ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg'
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
          >
            🌙 Night Hours
            {!isDayTime && (
              <span className="ml-2 px-2 py-1 bg-green-500 text-white text-xs rounded-full">
                CURRENT
              </span>
            )}
          </button>
        </div>

        {/* Hours Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/20">
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-300 uppercase tracking-wider text-center">
                  Hour
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">
                  Planet
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">
                  Start
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">
                  End
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">
                  Qualities
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {activeTab === 'day'
                ? calculation.dayHours.map(renderHourRow)
                : calculation.nightHours.map(renderHourRow)
              }
            </tbody>
          </table>
        </div>

        {/* Legend */}
        <div className="mt-6 p-4 bg-white/5 rounded-lg">
          <h4 className="text-sm font-medium text-gray-300 mb-3">Legend</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-l-2 border-yellow-400 rounded mr-2"></div>
              <span className="text-sm text-gray-300">Current planetary hour</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-white/20 rounded mr-2"></div>
              <span className="text-sm text-gray-300">Planet quality tags</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanetaryTable;