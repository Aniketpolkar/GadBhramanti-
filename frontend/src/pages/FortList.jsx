
import { useEffect, useState } from 'react';
import API from '../api/axios';
import { Link } from 'react-router-dom';
import Filter from '../components/Filter';
import SearchBar from "../components/SearchBar"; // ⬅️ import it
import 'leaflet/dist/leaflet.css';
import FortMap from '../components/FortMap';

const FortList = () => {
  const [forts, setForts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [regionFilter, setRegionFilter] = useState('All');
  const [difficultyFilter, setDifficultyFilter] = useState('All');
  const [search, setSearch] = useState("");

   const filteredForts = forts.filter(fort => {
        return (regionFilter === 'All' || fort.region === regionFilter) &&
                (difficultyFilter === 'All' || fort.difficulty === difficultyFilter) && 
                fort.name.toLowerCase().startsWith(search.toLowerCase());
        });

  useEffect(() => {
    const fetchForts = async () => {
      try {
        const res = await API.get('/forts');
        setForts(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchForts();
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center">
      <p className="text-center text-orange-700 text-xl font-semibold">Loading forts...</p>
    </div>
  );

  return (
    
    <div className="min-h-screen bg-gradient-to-br from-orange-250 via-red-50 to-orange-200 p-6">
      {/* Header with gradient background */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mt-18 mb-4 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent" style={{ fontFamily: 'Tiro Devanagari Marathi, serif' }}>
              Explore the Forts of Maharashtra
        </h1>
         

        <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto rounded-full"></div>
        {/* <input
        type="text"
        placeholder="Search forts..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="px-4 py-2 border rounded shadow w-full mb-4"
      /> */}
          {/* <SearchBar onSearch={handleSearch} /> */}
          {/* Filter Component */}
      <Filter
        forts={forts}
        search = {search}
        setSearch={setSearch}
        regionFilter={regionFilter}
        setRegionFilter={setRegionFilter}
        difficultyFilter={difficultyFilter}
        setDifficultyFilter={setDifficultyFilter}
      />

      </div>
   

      {/* Fort Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        
        {filteredForts.map((fort) => (
          <div 
            key={fort._id} 
            className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-orange-100 overflow-hidden"
          >
            {/* Fort Image */}
            {fort.images?.length > 0 && (
              <div className="relative overflow-hidden">
                <img
                  src={fort.images[0]}
                  alt={fort.name}
                  className="w-full h-58 object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            )}

            {/* Card Content */}
            <div className="p-6">
              {/* Fort Name */}
              <h3 className="text-2xl font-bold mb-3 text-gray-800 hover:text-orange-600 transition-colors">
                {fort.name}
              </h3>

              {/* Fort Details */}
              <div className="space-y-2 mb-6">
                {/* Fort Region */}
                {fort.region && (
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-orange-400 rounded-full mr-3"></span>
                    <p className="text-gray-700">
                      <strong className="text-black-400">Region:</strong> {fort.region}
                    </p>
                  </div>
                )}

                {/* Fort Difficulty */}
                {fort.difficulty && (
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-orange-400 rounded-full mr-3"></span>
                    <p className="text-gray-700">
                      <strong className="text-black-600">Difficulty:</strong> 
                      <span className={`ml-1 px-2 py-1 rounded-full text-xs font-semibold ${
                        fort.difficulty.toLowerCase() === 'easy' ? 'bg-green-100 text-green-700' :
                        fort.difficulty.toLowerCase() === 'moderate' ? 'bg-orange-100 text-orange-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {fort.difficulty}
                      </span>
                    </p>
                  </div>
                )}
              </div>

              {/* View Details Button */}
              <Link
                to={`/forts/${fort._id}`}
                className="inline-block  w-full text-center bg-gradient-to-r from-orange-400 to-red-400 hover:from-orange-500 hover:to-red-500 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-102 shadow-md hover:shadow-lg"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
      
      {/* Fort Map */}
     <FortMap forts={filteredForts} />
    
      {/* Empty State */}
      {/* {forts.length === 0 && !loading && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-400 rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-white text-2xl">🏰</span>
          </div>
          <p className="text-gray-600 text-lg">No forts found</p>
        </div>
      )} */}
      
      {filteredForts.length === 0 && !loading && (
  <div className="text-center py-12">
    <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-400 rounded-full mx-auto mb-4 flex items-center justify-center">
      <span className="text-white text-2xl">🏰</span>
    </div>
    <p className="text-gray-600 text-lg">No forts found for selected filters</p>
  </div>
)}

    </div>
  );
};

export default FortList;