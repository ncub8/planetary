import { Location, PlanetaryHour, PlanetaryHoursCalculation } from '../types';
import { calculateSunTimes } from './sunCalculations';
import { CHALDEAN_PLANETS, getDayRuler } from './planets';

export const calculatePlanetaryHours = (date: Date, location: Location): PlanetaryHoursCalculation => {
  const sunData = calculateSunTimes(date, location);
  const rulingPlanet = getDayRuler(date);

  // Find the index of the ruling planet in the Chaldean order
  const rulingPlanetIndex = CHALDEAN_PLANETS.findIndex(p => p.id === rulingPlanet.id);

  // Calculate day hours (sunrise to sunset)
  const dayHours: PlanetaryHour[] = [];
  const dayHourLength = sunData.dayLength / 12; // 12 planetary hours during the day

  for (let i = 0; i < 12; i++) {
    const planetIndex = (rulingPlanetIndex + i) % 7;
    const planet = CHALDEAN_PLANETS[planetIndex];

    const startTime = new Date(sunData.sunrise.getTime() + (i * dayHourLength));
    const endTime = new Date(sunData.sunrise.getTime() + ((i + 1) * dayHourLength));

    dayHours.push({
      planet,
      startTime,
      endTime,
      hourNumber: i + 1,
      isDayHour: true
    });
  }

  // Calculate night hours (sunset to next sunrise)
  const nightHours: PlanetaryHour[] = [];
  const nightHourLength = sunData.nightLength / 12; // 12 planetary hours during the night

  // Night hours start with the planet that would be the 13th hour if we continued the sequence
  const nightStartPlanetIndex = (rulingPlanetIndex + 12) % 7;

  for (let i = 0; i < 12; i++) {
    const planetIndex = (nightStartPlanetIndex + i) % 7;
    const planet = CHALDEAN_PLANETS[planetIndex];

    const startTime = new Date(sunData.sunset.getTime() + (i * nightHourLength));
    const endTime = new Date(sunData.sunset.getTime() + ((i + 1) * nightHourLength));

    nightHours.push({
      planet,
      startTime,
      endTime,
      hourNumber: i + 1,
      isDayHour: false
    });
  }

  // Find current planetary hour
  const now = new Date();
  const currentHour = [...dayHours, ...nightHours].find(hour =>
    now >= hour.startTime && now < hour.endTime
  );

  return {
    date,
    location,
    sunData,
    dayHours,
    nightHours,
    currentHour,
    rulingPlanet
  };
};

export const getCurrentPlanetaryHour = (calculation: PlanetaryHoursCalculation): PlanetaryHour | undefined => {
  const now = new Date();

  // Check day hours
  for (const hour of calculation.dayHours) {
    if (now >= hour.startTime && now < hour.endTime) {
      return hour;
    }
  }

  // Check night hours
  for (const hour of calculation.nightHours) {
    if (now >= hour.startTime && now < hour.endTime) {
      return hour;
    }
  }

  return undefined;
};

export const formatTime = (date: Date): string => {
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
};

export const getNextPlanetaryHour = (calculation: PlanetaryHoursCalculation): PlanetaryHour | undefined => {
  const now = new Date();
  const allHours = [...calculation.dayHours, ...calculation.nightHours];

  return allHours.find(hour => hour.startTime > now);
};