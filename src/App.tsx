import React from 'react';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-6 py-8">
        <header className="text-center mb-12">
          <h1 className="text-6xl font-bold text-white mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Planetary
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Explore the cosmos with our modern space exploration platform
          </p>
        </header>

        <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
            <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mb-4">
              🌍
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Earth Sciences</h3>
            <p className="text-gray-300">Study our home planet's atmosphere, geology, and climate systems.</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
            <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mb-4">
              🚀
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Space Exploration</h3>
            <p className="text-gray-300">Discover missions, satellites, and deep space exploration projects.</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
            <div className="w-12 h-12 bg-pink-500 rounded-xl flex items-center justify-center mb-4">
              ⭐
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Astronomy</h3>
            <p className="text-gray-300">Observe stars, galaxies, and celestial phenomena across the universe.</p>
          </div>
        </main>

        <div className="text-center">
          <button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg">
            Start Exploring
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
