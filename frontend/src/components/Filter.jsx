import React from 'react';

const Filter = ({ forts,search,setSearch, regionFilter, setRegionFilter, difficultyFilter, setDifficultyFilter }) => {
  // Get unique regions and difficulties
  const regions = [...new Set(forts.map(f => f.region))];
  const difficulties = [...new Set(forts.map(f => f.difficulty))];

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-orange-100 mb-8">
      <div className="flex flex-col md:flex-row items-center justify-center gap-4">
      <div className="flex items-center gap-2">
       <input
        type="text"
        placeholder="Search forts..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="px-4 py-2 border border-orange-200 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400 transition-all"
          />
          </div>
        {/* Region Filter */}
        <div className="flex items-center gap-2">
          <span className="text-gray-700 font-medium text-lg">Region:</span>
          <select
            value={regionFilter}
            onChange={(e) => setRegionFilter(e.target.value)}
            className="px-4 py-2 border border-orange-200 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400 transition-all"
          >
            <option value="All">All Regions</option>
            {regions.map(region => (
              <option key={region} value={region}>{region}</option>
            ))}
          </select>
        </div>

        {/* Difficulty Filter */}
        <div className="flex items-center gap-2">
          <span className="text-gray-700 font-medium text-lg"> Difficulty:</span>
          <select
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
            className="px-4 py-2 border border-orange-200 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400 transition-all"
          >
            <option value="All">All Difficulties</option>
            {difficulties.map(difficulty => (
              <option key={difficulty} value={difficulty}>{difficulty}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Filter;