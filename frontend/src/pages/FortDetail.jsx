import { useEffect, useState } from 'react';
import API from '../api/axios';
import { useParams, Link } from 'react-router-dom';

const FortDetail = () => {
  const { id } = useParams();
  const [fort, setFort] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchFort = async () => {
      try {
        const res = await API.get(`/forts/${id}`);
        setFort(res.data);
        console.log("success");
      } catch (err) {
        console.error("error", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFort();
  }, [id]);

  const nextImage = () => {
    if (fort.images && fort.images.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % fort.images.length);
    }
  };

  const prevImage = () => {
    if (fort.images && fort.images.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + fort.images.length) % fort.images.length);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center">
      <p className="text-orange-700 text-lg">Loading fort details...</p>
    </div>
  );

  if (!fort) return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center">
      <div className="text-center">
        <p className="text-gray-600 text-lg mb-4">Fort not found.</p>
        <Link 
          to="/forts" 
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
        >
          Back to Forts
        </Link>
      </div>
    </div>
  );

  return (
    <div className=" mt-16 min-h-screen bg-orange-50 p-4">
      {/* Back Button */}
      <div className="max-w-4xl mx-auto mb-4">
        <Link 
          to="/forts" 
          className="text-orange-600 hover:text-orange-800 font-medium"
        >
          ← Back to Forts
        </Link>
      </div>

      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        
        {/* Fort Header */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-3 flex justify-center flex-col items-center">
          <h1 className="text-3xl font-bold mb-2">{fort.name}</h1>
          {fort.region && (
            <h1 className="text-white font-bold text-xl">Region: {fort.region} </h1>
            
          )}
        </div>

        <div className="p-6">
          {/* Image Slider */}
          {fort.images?.length > 0 && (
            <div className="mb-8">
              <div className="relative">
                <img
                  src={fort.images[currentImageIndex]}
                  alt={`${fort.name}`}
                  className="w-full h-80 object-cover rounded-lg"
                />
                
                {fort.images.length > 1 && (
                  <>
                    {/* Previous Button */}
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition"
                    >
                      ←
                    </button>
                    
                    {/* Next Button */}
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition"
                    >
                      →
                    </button>
                    
                    {/* Image Indicators */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                      {fort.images.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentImageIndex(idx)}
                          className={`w-3 h-3 rounded-full transition ${
                            currentImageIndex === idx 
                              ? 'bg-white' 
                              : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Basic Info Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-3">
              {fort.difficulty && (
                <p className="text-gray-700">
                  <span className="font-semibold text-orange-600">Difficulty:</span> {fort.difficulty}
                </p>
              )}
              {fort.bestSeason && (
                <p className="text-gray-700">
                  <span className="font-semibold text-orange-600">Best Season:</span> {fort.bestSeason}
                </p>
              )}
              {fort.trekDuration && (
                <p className="text-gray-700">
                  <span className="font-semibold text-orange-600">Trek Duration:</span> {fort.trekDuration}
                </p>
              )}
            </div>
            
            <div className="space-y-3">
              {fort.location && (
                <p className="text-gray-700">
                  <span className="font-semibold text-orange-600">Location:</span> 
                  <br />Lat: {fort.location.lat}, Lng: {fort.location.lng}
                </p>
              )}
            </div>
          </div>

          {/* History */}
          {fort.history && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">History</h3>
              <p className="text-gray-700 leading-relaxed">{fort.history}</p>
             
            </div>
          )}

          {/* Transport */}
          {fort.nearest && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Nearest Transport</h3>
              <div className="space-y-2">
                {fort.nearest.railway && (
                  <p className="text-gray-700">
                    <span className="font-medium">🚂 Railway:</span> {fort.nearest.railway}
                  </p>
                )}
                {fort.nearest.bus && (
                  <p className="text-gray-700">
                    <span className="font-medium">🚌 Bus:</span> {fort.nearest.bus}
                  </p>
                )}
                {fort.nearest.airport && (
                  <p className="text-gray-700">
                    <span className="font-medium">✈️ Airport:</span> {fort.nearest.airport}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Contacts */}
          {fort.contacts && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Contacts</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {fort.contacts.guides?.length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">Guides:</h4>
                    <div className="space-y-1">
                      {fort.contacts.guides.map((g, idx) => (
                        <p key={idx} className="text-gray-700 text-sm">
                          {g.name} - {g.phone}
                        </p>
                      ))}
                    </div>
                  </div>
                )}
                
                {fort.contacts.drivers?.length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">Drivers:</h4>
                    <div className="space-y-1">
                      {fort.contacts.drivers.map((d, idx) => (
                        <p key={idx} className="text-gray-700 text-sm">
                          {d.name} - {d.phone}
                        </p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          <div>
            { (
            <div className="text-center mb-2">
              <a
                href={fort.pdfGuide}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition font-medium"
              >
                📄 Download Map Offline
              </a>
            </div>
          )}
          </div>
          {/* PDF Guide */}
          {fort.pdfGuide && (
            <div className="text-center">
              <a
                href={fort.pdfGuide}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition font-medium"
              >
                📄 Download PDF Guide
              </a>
            </div>
          )}
          
        </div>
        
      </div>
    </div>
  );
};

export default FortDetail;