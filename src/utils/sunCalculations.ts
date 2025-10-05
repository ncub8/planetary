import { Location, SunCalculation } from '../types';

// Convert degrees to radians
const toRadians = (degrees: number): number => degrees * (Math.PI / 180);

// Convert radians to degrees
const toDegrees = (radians: number): number => radians * (180 / Math.PI);

// Calculate Julian day number
const getJulianDay = (date: Date): number => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  let a = Math.floor((14 - month) / 12);
  let y = year - a;
  let m = month + 12 * a - 3;

  return day + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) + 1721119;
};

// Calculate sun position for a given Julian day
const getSunPosition = (julianDay: number): { declination: number; equationOfTime: number } => {
  const n = julianDay - 2451545.0;
  const L = (280.460 + 0.9856474 * n) % 360;
  const g = toRadians((357.528 + 0.9856003 * n) % 360);
  const lambda = toRadians(L + 1.915 * Math.sin(g) + 0.020 * Math.sin(2 * g));

  const declination = Math.asin(Math.sin(toRadians(23.439)) * Math.sin(lambda));
  const equationOfTime = 4 * (L - toDegrees(Math.atan2(Math.tan(lambda), Math.cos(toRadians(23.439)))));

  return { declination, equationOfTime };
};

// Calculate sunrise and sunset times
export const calculateSunTimes = (date: Date, location: Location): SunCalculation => {
  const julianDay = getJulianDay(date);
  const { declination, equationOfTime } = getSunPosition(julianDay);

  const latRad = toRadians(location.latitude);
  const cosHourAngle = -Math.tan(latRad) * Math.tan(declination);

  // Handle polar day/night cases
  if (cosHourAngle > 1) {
    // Polar night - sun never rises
    const midnight = new Date(date);
    midnight.setHours(0, 0, 0, 0);
    return {
      sunrise: midnight,
      sunset: midnight,
      dayLength: 0,
      nightLength: 24 * 60 * 60 * 1000
    };
  } else if (cosHourAngle < -1) {
    // Polar day - sun never sets
    const midnight = new Date(date);
    midnight.setHours(0, 0, 0, 0);
    const nextMidnight = new Date(midnight.getTime() + 24 * 60 * 60 * 1000);
    return {
      sunrise: midnight,
      sunset: nextMidnight,
      dayLength: 24 * 60 * 60 * 1000,
      nightLength: 0
    };
  }

  const hourAngle = Math.acos(cosHourAngle);
  const solarNoon = 12 - equationOfTime / 60 - location.longitude / 15;
  const sunriseTime = solarNoon - toDegrees(hourAngle) / 15;
  const sunsetTime = solarNoon + toDegrees(hourAngle) / 15;

  const sunrise = new Date(date);
  sunrise.setHours(Math.floor(sunriseTime), Math.floor((sunriseTime % 1) * 60), 0, 0);

  const sunset = new Date(date);
  sunset.setHours(Math.floor(sunsetTime), Math.floor((sunsetTime % 1) * 60), 0, 0);

  const dayLength = sunset.getTime() - sunrise.getTime();
  const nightLength = 24 * 60 * 60 * 1000 - dayLength;

  return {
    sunrise,
    sunset,
    dayLength,
    nightLength
  };
};