import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import { Link } from 'react-router-dom';
// import iconRetinaUrl from '../assets/location.png';

import customIcon from "../assets/location.png";
// Fix default marker icon issue in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
     iconRetinaUrl: customIcon, // Retina version
  iconUrl: customIcon,       // Normal version (use same image if no separate one)
  shadowUrl: null,           // remove shadow if not needed
  iconSize: [40, 40],        // <-- set size here (width, height)
  iconAnchor: [20, 40],      // <-- point of the icon which corresponds to marker’s location
  popupAnchor: [0, -40],     // <-- popup position relative to icon
});

const FortMap = ({ forts }) => {
  return (
    <div className='flex justify-center items-center  mx-15 my-5 border-amber-500 border-4 '>
    <MapContainer center={[18.5204, 74.8567]} zoom={8} scrollWheelZoom={false} style={{ height: '550px', width: '100%',zIndex:-0 }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {forts.map((fort) => (
        <Marker key={fort._id} position={[fort.location.lat, fort.location.lng]}>
          <Popup className="text-sm">
            <div className="text-center">
              <h3 className="font-bold text-orange-600">{fort.name}</h3>
                {/* Fort Image */}
             {fort.images?.length >0 && <img src={fort.images[0]} alt={fort.name} className="w-full h-24 object-cover my-1 rounded" />} 
              <p className='my-0 py-0'><strong>Region:</strong> {fort.region}</p>
              <p className='my-0 py-0'><strong>Difficulty:</strong> {fort.difficulty}</p>
              <div>
              <Link to={`/forts/${fort._id}`}  className="inline-block  w-full text-center bg-gradient-to-r from-orange-400 to-red-400 hover:from-orange-500 hover:to-red-500 text-black font-semibold px-3 py-2 rounded-lg transition-all duration-300 transform hover:scale-102 shadow-md hover:shadow-lg"
              >View Details</Link>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
    </div>
  );
};

export default FortMap;
