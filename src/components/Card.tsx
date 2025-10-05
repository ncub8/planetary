import React from 'react';
import { CardProps } from '../types';

const Card: React.FC<CardProps> = ({ title, description, icon, className = '', onClick }) => {
  return (
    <div
      className={`bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer ${className}`}
      onClick={onClick}
    >
      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4 text-2xl">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  );
};

export default Card;