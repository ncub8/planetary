import { Planet } from '../types';

// Traditional Chaldean planetary hour sequence (by speed/orbital period)
// This is the correct order for planetary hours: Saturn, Sun, Venus, Jupiter, Mercury, Mars, Moon
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
    id: 'jupiter',
    name: 'Jupiter',
    symbol: '♃',
    color: '#3182CE',
    description: 'Expansion, growth, luck, and abundance',
    element: 'Fire',
    qualities: ['expansion', 'luck', 'wisdom', 'abundance', 'optimism']
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
    id: 'mars',
    name: 'Mars',
    symbol: '♂',
    color: '#E53E3E',
    description: 'Action, energy, conflict, and courage',
    element: 'Fire',
    qualities: ['action', 'courage', 'conflict', 'energy', 'passion']
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

// Get the correct day ruler based on traditional astrology
export const getDayRuler = (date: Date): Planet => {
  const dayOfWeek = date.getDay();
  // Sunday=0, Monday=1, Tuesday=2, Wednesday=3, Thursday=4, Friday=5, Saturday=6
  const rulers = [
    CHALDEAN_PLANETS[1], // Sunday - Sun (index 1 in our corrected array)
    CHALDEAN_PLANETS[6], // Monday - Moon (index 6)
    CHALDEAN_PLANETS[5], // Tuesday - Mars (index 5)
    CHALDEAN_PLANETS[4], // Wednesday - Mercury (index 4)
    CHALDEAN_PLANETS[3], // Thursday - Jupiter (index 3)
    CHALDEAN_PLANETS[2], // Friday - Venus (index 2)
    CHALDEAN_PLANETS[0], // Saturday - Saturn (index 0)
  ];
  return rulers[dayOfWeek];
};

export const getPlanetByIndex = (index: number): Planet => {
  return CHALDEAN_PLANETS[index % 7];
};