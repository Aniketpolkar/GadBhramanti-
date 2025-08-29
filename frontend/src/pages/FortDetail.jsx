
import { useEffect, useState, useContext } from 'react';
import API from '../api/axios';
import { useParams, Link } from 'react-router-dom';
import { AuthContext } from "../context/authcontext";
import { MapContainer, TileLayer, Polyline, useMap,Popup,Marker } from 'react-leaflet';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
const downloadMapPDF = () => {
  const mapElement = document.querySelector(".leaflet-container"); // Leaflet map div
  html2canvas(mapElement).then((canvas) => {
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "px",
      format: [canvas.width, canvas.height],
    });
    pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
    pdf.save("fort-map.pdf");
  });
};

const FortDetail = () => {
  const { id } = useParams();
  const [fort, setFort] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { user } = useContext(AuthContext);
  const [commentText, setCommentText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [routes, setRoutes] = useState([]);
  const [routeLoading, setRouteLoading] = useState(true);
  const [routeError, setRouteError] = useState(null);


  navigator.geolocation.getCurrentPosition(
  (position) => {
    console.log("Latitude:", position.coords.latitude);
    console.log("Longitude:", position.coords.longitude);
  },
  (error) => {
    console.error("Error getting location:", error);
  }
);


  const LocateUser = () => {
  const map = useMap();
  const [userPos, setUserPos] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setUserPos([lat, lng]);
        map.setView([lat, lng], 8); // Center map on user
      });
    }
  }, [map]);

  if (!userPos) return null;
  return <Marker position={userPos}></Marker>; // Marker on your location
};


const FitBounds = ({ routes }) => {
  const map = useMap();
  if (routes.length === 0) return null;

  const allPoints = routes.flatMap(r => r.geometry.coordinates.map(([lng, lat]) => [lat, lng]));
  map.fitBounds(allPoints, { padding: [50, 50] });
  return null;
};


  const fetchFortDetails = async () => {
    try {
      setLoading(true);
      const res = await API.get(`/forts/${id}`);
      setFort(res.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching fort details:", err);
      setError("Failed to load fort details. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFortDetails();
  }, [id]);

  useEffect(() => {
  const fetchRoutes = async () => {
    try {
      setRouteLoading(true);
      const res = await API.get(`/forts/${id}/routes`);
      setRoutes(res.data);
      setRouteError(null);
    } catch (err) {
      console.error("Error fetching routes:", err);
      setRouteError("Failed to load trek routes. Please try again later.");
    } finally {
      setRouteLoading(false);
    }
  };

  fetchRoutes();
}, [id]);
  

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("You must log in to comment!");
      return;
    }
    if (!commentText.trim()) {
      alert("Comment cannot be empty.");
      return;
    }

    setIsSubmitting(true);
    try {
      await API.post(
        `/forts/${fort._id}/comment`,
        { text: commentText },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setCommentText("");
      // Refresh the fort data to display the new comment
      await fetchFortDetails();
    } catch (err) {
      console.error("Error posting comment:", err);
      alert("Failed to post comment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextImage = () => {
    if (fort.images?.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % fort.images.length);
    }
  };

  const prevImage = () => {
    if (fort.images?.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + fort.images.length) % fort.images.length);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-orange-50 flex items-center justify-center">
        <p className="text-orange-700 text-lg animate-pulse">Loading fort details...</p>
      </div>
    );
  }

  if (error || !fort) {
    return (
      <div className="min-h-screen bg-orange-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 text-lg mb-4">{error || "Fort not found."}</p>
          <Link
            to="/forts"
            className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition"
          >
            Back to Forts
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-16 min-h-screen bg-orange-50 p-4">
      {/* Back Button */}
      <div className="max-w-4xl mx-auto mb-4">
        <Link
          to="/forts"
          className="text-orange-600 hover:text-orange-800 font-medium transition duration-200"
        >
          ← Back to Forts
        </Link>
      </div>

      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
        {/* Fort Header */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-6 flex flex-col items-center">
          <h1 className="text-4xl font-extrabold mb-2 text-center drop-shadow-md">{fort.name}</h1>
          {fort.region && (
            <h2 className="text-xl font-semibold text-white/90">Region: {fort.region}</h2>
          )}
            {user.visitedForts && (
            <h2 className="text-xl font-semibold text-white/90">visited: {user.visitedForts[0]}</h2>
          )}
          {user && (
            <h2 className="text-xl font-semibold text-white/90">add to wishlist {user.name}</h2>
          )}
       
        </div>
        <div className="p-8">
          {/* Image Slider */}
          {fort.images?.length > 0 && (
            <div className="mb-8 relative">
              <img
                src={fort.images[currentImageIndex]}
                alt={`${fort.name} - Image ${currentImageIndex + 1}`}
                className="w-full h-96 object-cover rounded-lg shadow-md"
              />
              {fort.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-40 text-white p-3 rounded-full hover:bg-opacity-60 transition duration-300"
                    aria-label="Previous image"
                  >
                    ←
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-40 text-white p-3 rounded-full hover:bg-opacity-60 transition duration-300"
                    aria-label="Next image"
                  >
                    →
                  </button>
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {fort.images.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentImageIndex(idx)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          currentImageIndex === idx ? 'bg-white scale-125' : 'bg-white bg-opacity-50 hover:bg-opacity-80'
                        }`}
                        aria-label={`Go to image ${idx + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
          {/* Basic Info */}
          <div className="grid md:grid-cols-2 gap-8 mb-8 text-gray-700">
            <div className="space-y-4">
              <p><span className="font-semibold text-orange-600">Difficulty:</span> {fort.difficulty}</p>
              <p><span className="font-semibold text-orange-600">Best Season:</span> {fort.bestSeason}</p>
              <p><span className="font-semibold text-orange-600">Trek Duration:</span> {fort.trekDuration}</p>
              {fort.location && (
                <p><span className="font-semibold text-orange-600">Location:</span> Lat: {fort.location.lat}, Lng: {fort.location.lng}</p>
              )}
            </div>
            <div className="space-y-4">
              {fort.history && (
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">History</h3>
                  <p className="text-gray-700 leading-relaxed">{fort.history}</p>
                </div>
              )}
            </div>
          </div>

          <hr className="my-8 border-gray-200" />

          {/* Transport & Contacts */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {fort.nearest && (
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Nearest Transport 🚌</h3>
                <ul className="space-y-2">
                  {fort.nearest.railway && <li><span className="font-medium text-gray-900">🚂 Railway:</span> {fort.nearest.railway}</li>}
                  {fort.nearest.bus && <li><span className="font-medium text-gray-900">🚌 Bus:</span> {fort.nearest.bus}</li>}
                  {fort.nearest.airport && <li><span className="font-medium text-gray-900">✈️ Airport:</span> {fort.nearest.airport}</li>}
                </ul>
              </div>
            )}
            {fort.contacts?.guides?.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Contacts 📞</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-800">Guides:</h4>
                    <ul className="space-y-1 mt-2">
                      {fort.contacts.guides.map((g, idx) => (
                        <li key={idx} className="text-gray-700 text-sm">{g.name} - {g.phone}</li>
                      ))}
                    </ul>
                  </div>
                  {fort.contacts.drivers?.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-800">Drivers:</h4>
                      <ul className="space-y-1 mt-2">
                        {fort.contacts.drivers.map((d, idx) => (
                          <li key={idx} className="text-gray-700 text-sm">{d.name} - {d.phone}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          

          {/* PDF Guide */}
          {fort.pdfGuide && (
            <div className="text-center mb-8">
              <a
                href={fort.pdfGuide}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-orange-600 text-white px-8 py-3 rounded-lg shadow-md hover:bg-orange-700 transition duration-300 font-bold"
              >
                <span className="mr-2">📄</span> Download PDF Guide
              </a>
            </div>
          )}

          <hr className="my-8 border-gray-800" />

          {/* Comments Section */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Comments 🗣️</h3>
            
            {/* Display comments */}
            <div className="space-y-4 mb-6">
              {fort.comments?.length > 0 ? (
                fort.comments.map(c => (
                  <div key={c._id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-start space-x-4">
                    <img
                      src={c.user?.profilePic || 'https://via.placeholder.com/40'}
                      alt={c.user?.username || "User"}
                      className="h-10 w-10 rounded-full object-cover border-2 border-orange-500"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-orange-600 text-lg">{c.user?.username || "Unknown User"}</span>
                        <span className="text-xs text-gray-500">
                          {new Date(c.createdAt).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric"
                          })}
                        </span>
                      </div>
                      <p className="mt-1 text-gray-700 leading-snug">{c.text}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center">No comments yet. Be the first to share your thoughts!</p>
              )}
            </div>
            
            {/* Comment Form */}
            <form onSubmit={handleCommentSubmit} className="space-y-4">
              {user ? (
                <div>
                  <textarea
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Share your experience or ask a question..."
                    rows="3"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full bg-orange-600 text-white font-bold py-2 px-4 rounded-md hover:bg-orange-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Posting...' : 'Post Comment'}
                  </button>
    
                </div>
              ) : (
                <p className="text-center text-gray-500 font-medium">
                  <Link to="/login" className="text-orange-600 hover:underline">Log in</Link> to post a comment.
                </p>
              )}
            </form>
          </div>
              
           <hr className="my-8 border-gray-800" />
           {/* For route */}

            {routes && routes.length > 0 ? (
                  <div>
                    <MapContainer
                      center={[routes[0].geometry.coordinates[0][1], routes[0].geometry.coordinates[0][0]]}
                      scrollWheelZoom={false}
                      zoom={15}
                      style={{ height: '600px', width: '100%' }}
                    >
                      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                      {routes.map(route => (
                        <Polyline
                          key={route._id}
                          positions={route.geometry.coordinates.map(([lng, lat]) => [lat, lng])}
                          color="red"
                          weight={5}
                        />
                      ))}
                      <FitBounds routes={routes} />
                      <Marker
                        position={[
                          routes[0].geometry.coordinates[0][1],
                          routes[0].geometry.coordinates[0][0],
                        ]}
                      >
                        <Popup>Finish</Popup>
                      </Marker>
                      <LocateUser />
                    </MapContainer>
                  </div>
                ) : (
                  <p className = "flex justify-center text-black items-center text-2xl mt-2 p-4">
                    Map not uploaded
                  </p>
                )}

            <button
              onClick={downloadMapPDF}
              className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
            >
              Download Map
            </button>

        </div>
      </div>
    </div>
  );
};

export default FortDetail;