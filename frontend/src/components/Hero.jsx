import { Link } from 'react-router-dom';
import React from 'react'

const Hero = () => {
  return (
    <header className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20 bg-gray-100">
      <h2 className="text-4xl font-bold mb-4">Explore the Hidden Forts of Maharashtra</h2>
      <p className="text-gray-700 mb-6 max-w-xl">
        Discover offbeat forts, trekking trails, and travel tips. Plan your next adventure and explore hidden gems in the Sahyadris.
      </p>
      <Link
        to="/forts"
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
      >
        Explore Forts
      </Link>
    </header>
  );
};

export default Hero;

