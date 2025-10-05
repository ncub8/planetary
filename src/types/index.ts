export interface Planet {
  id: string;
  name: string;
  symbol: string;
  color: string;
  description: string;
  element: string;
  qualities: string[];
}

export interface PlanetaryHour {
  planet: Planet;
  startTime: Date;
  endTime: Date;
  hourNumber: number;
  isDayHour: boolean;
}

export interface Location {
  latitude: number;
  longitude: number;
  city: string;
  timezone: string;
}

export interface SunCalculation {
  sunrise: Date;
  sunset: Date;
  dayLength: number;
  nightLength: number;
}

export interface PlanetaryHoursCalculation {
  date: Date;
  location: Location;
  sunData: SunCalculation;
  dayHours: PlanetaryHour[];
  nightHours: PlanetaryHour[];
  currentHour?: PlanetaryHour;
  rulingPlanet: Planet;
}

export interface CardProps {
  title: string;
  description: string;
  icon: string;
  className?: string;
  onClick?: () => void;
}

export interface FormData {
  latitude: number;
  longitude: number;
  city: string;
  date: string;
  time: string;
}