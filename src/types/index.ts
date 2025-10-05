export interface Planet {
  id: string;
  name: string;
  description: string;
  image?: string;
  distanceFromSun: number;
  diameter: number;
  mass: number;
  moons: number;
}

export interface Mission {
  id: string;
  name: string;
  description: string;
  launchDate: Date;
  status: 'planned' | 'active' | 'completed' | 'failed';
  agency: string;
  target?: string;
}

export interface Astronomer {
  id: string;
  name: string;
  bio: string;
  discoveries: string[];
  birthYear: number;
  deathYear?: number;
}

export interface CardProps {
  title: string;
  description: string;
  icon: string;
  className?: string;
  onClick?: () => void;
}