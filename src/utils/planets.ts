import { Planet } from '../types';

// Chaldean order of planets (7 classical planets)
export const CHALDEAN_PLANETS: Planet[] = [
  {
    id: 'saturn',
    name: 'Saturn',
    symbol: '♄',
    color: '#4A5568',
    description: 'Discipline, structure, limitations, and wisdom',
    element: 'Earth',
    qualities: ['discipline', 'restriction', 'patience', 'wisdom', 'melancholy']
  },
  {
    id: 'jupiter',
    name: 'Jupiter',
    symbol: '♃',
    color: '#3182CE',
    description: 'Expansion, growth, luck, and abundance',
    element: 'Fire',
    qualities: ['expansion', 'luck', 'wisdom', 'abundance', 'optimism']
  },
  {
    id: 'mars',
    name: 'Mars',
    symbol: '♂',
    color: '#E53E3E',
    description: 'Action, energy, conflict, and courage',
    element: 'Fire',
    qualities: ['action', 'courage', 'conflict', 'energy', 'passion']
  },
  {
    id: 'sun',
    name: 'Sun',
    symbol: '☉',
    color: '#F6AD55',
    description: 'Leadership, vitality, ego, and success',
    element: 'Fire',
    qualities: ['leadership', 'vitality', 'success', 'authority', 'creativity']
  },
  {
    id: 'venus',
    name: 'Venus',
    symbol: '♀',
    color: '#48BB78',
    description: 'Love, beauty, harmony, and pleasure',
    element: 'Earth',
    qualities: ['love', 'beauty', 'harmony', 'pleasure', 'relationships']
  },
  {
    id: 'mercury',
    name: 'Mercury',
    symbol: '☿',
    color: '#9F7AEA',
    description: 'Communication, intellect, and travel',
    element: 'Air',
    qualities: ['communication', 'intellect', 'travel', 'commerce', 'versatility']
  },
  {
    id: 'moon',
    name: 'Moon',
    symbol: '☽',
    color: '#63B3ED',
    description: 'Emotions, intuition, and cycles',
    element: 'Water',
    qualities: ['emotion', 'intuition', 'cycles', 'reflection', 'subconscious']
  }
];

// Day of week to ruling planet mapping
export const DAY_RULERS: { [key: number]: Planet } = {
  0: CHALDEAN_PLANETS[6], // Sunday - Sun (index 3 in Chaldean order, but we start with Moon at 6)
  1: CHALDEAN_PLANETS[6], // Monday - Moon
  2: CHALDEAN_PLANETS[2], // Tuesday - Mars
  3: CHALDEAN_PLANETS[5], // Wednesday - Mercury
  4: CHALDEAN_PLANETS[1], // Thursday - Jupiter
  5: CHALDEAN_PLANETS[4], // Friday - Venus
  6: CHALDEAN_PLANETS[0], // Saturday - Saturn
};

// Get the correct day ruler
export const getDayRuler = (date: Date): Planet => {
  const dayOfWeek = date.getDay();
  const rulers = [
    CHALDEAN_PLANETS[3], // Sunday - Sun
    CHALDEAN_PLANETS[6], // Monday - Moon
    CHALDEAN_PLANETS[2], // Tuesday - Mars
    CHALDEAN_PLANETS[5], // Wednesday - Mercury
    CHALDEAN_PLANETS[1], // Thursday - Jupiter
    CHALDEAN_PLANETS[4], // Friday - Venus
    CHALDEAN_PLANETS[0], // Saturday - Saturn
  ];
  return rulers[dayOfWeek];
};

export const getPlanetByIndex = (index: number): Planet => {
  return CHALDEAN_PLANETS[index % 7];
};