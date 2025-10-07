// import React, { useState, useEffect } from 'react';
// import { Cloud, Sun, CloudRain, CloudSnow, Wind, Thermometer, Droplets, Eye, Gauge } from 'lucide-react';

// const WeatherApp = ({ name, latitude , longitude , apiKey }) => {
//   const [weather, setWeather] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Mock weather data for demo purposes (since we need API key for real data)
//   const mockWeatherData = {
//     location: "New York City",
//     temperature: 22,
//     condition: "Partly Cloudy",
//     description: "Partly cloudy with gentle breeze",
//     humidity: 65,
//     windSpeed: 12,
//     pressure: 1013,
//     visibility: 10,
//     uvIndex: 6,
//     feelsLike: 24,
//     icon: "partly-cloudy"
//   };

//   useEffect(() => {
//     const fetchWeather = async () => {
//       setLoading(true);
//       try {
//         // Simulate API call delay
//         await new Promise(resolve => setTimeout(resolve, 1000));
        
//         // For demo purposes, we'll use mock data
//         // In production, you'd replace this with actual API call:
//         const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`);
//         const data = await response.json();
        
//         setWeather(data);
//         setError(null);
//       } catch (err) {
//         setError('Failed to fetch weather data');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchWeather();
//   }, [latitude, longitude, apiKey]);

//   const getWeatherIcon = (condition) => {
//     switch (condition?.toLowerCase()) {
//       case 'clear':
//       case 'sunny':
//         return <Sun className="w-12 h-12 text-yellow-500" />;
//       case 'rain':
//       case 'drizzle':
//         return <CloudRain className="w-12 h-12 text-blue-500" />;
//       case 'snow':
//         return <CloudSnow className="w-12 h-12 text-blue-200" />;
//       case 'partly-cloudy':
//       case 'partly cloudy':
//         return <Cloud className="w-12 h-12 text-gray-500" />;
//       default:
//         return <Sun className="w-12 h-12 text-yellow-500" />;
//     }
//   };

//   const getBackgroundGradient = (condition) => {
//     switch (condition?.toLowerCase()) {
//       case 'clear':
//       case 'sunny':
//         return 'from-blue-400 via-blue-500 to-blue-600';
//       case 'rain':
//       case 'drizzle':
//         return 'from-gray-600 via-gray-700 to-gray-800';
//       case 'snow':
//         return 'from-blue-200 via-blue-300 to-blue-400';
//       case 'partly-cloudy':
//       case 'partly cloudy':
//         return 'from-blue-300 via-blue-400 to-blue-500';
//       default:
//         return 'from-blue-400 via-blue-500 to-blue-600';
//     }
//   };

//   if (loading) {
//     return (
//       <div className="max-w-md mx-auto bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl shadow-xl p-6 text-white">
//         <div className="animate-pulse">
//           <div className="h-6 bg-white bg-opacity-20 rounded mb-4"></div>
//           <div className="flex items-center justify-between mb-6">
//             <div className="h-16 w-16 bg-white bg-opacity-20 rounded-full"></div>
//             <div className="h-12 w-20 bg-white bg-opacity-20 rounded"></div>
//           </div>
//           <div className="space-y-3">
//             <div className="h-4 bg-white bg-opacity-20 rounded"></div>
//             <div className="h-4 bg-white bg-opacity-20 rounded w-3/4"></div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="max-w-md mx-auto bg-red-500 rounded-2xl shadow-xl p-6 text-white">
//         <div className="text-center">
//           <Cloud className="w-12 h-12 mx-auto mb-4 opacity-50" />
//           <h3 className="text-lg font-semibold mb-2">Weather Unavailable</h3>
//           <p className="text-red-100">{error}</p>
//           <p className="text-sm text-red-200 mt-2">
//             Coordinates: {latitude.toFixed(4)}, {longitude.toFixed(4)}
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className={`max-w-md mx-auto bg-gradient-to-br ${getBackgroundGradient(weather.condition)} rounded-2xl shadow-xl overflow-hidden text-white`}>
//       <div className="p-6">
//         {/* Header */}
//         <div className="text-center mb-6">
//           <h2 className="text-xl font-bold">{weather.location}</h2>
//           <p className="text-sm opacity-75">
//             {latitude.toFixed(4)}°, {longitude.toFixed(4)}°
//           </p>
//         </div>

//         {/* Main Weather */}
//         <div className="flex items-center justify-between mb-8">
//           <div className="flex items-center space-x-4">
//             {getWeatherIcon(weather.condition)}
//             <div>
//               <div className="text-4xl font-bold">{weather.temperature}°C</div>
//               <div className="text-lg opacity-90">{weather.condition}</div>
//             </div>
//           </div>
//         </div>

//         {/* Weather Details */}
//         <div className="space-y-4">
//           <div className="flex items-center justify-between text-sm">
//             <div className="flex items-center space-x-2">
//               <Thermometer className="w-4 h-4" />
//               <span>Feels like</span>
//             </div>
//             <span className="font-semibold">{weather.feelsLike}°C</span>
//           </div>

//           <div className="flex items-center justify-between text-sm">
//             <div className="flex items-center space-x-2">
//               <Droplets className="w-4 h-4" />
//               <span>Humidity</span>
//             </div>
//             <span className="font-semibold">{weather.humidity}%</span>
//           </div>

//           <div className="flex items-center justify-between text-sm">
//             <div className="flex items-center space-x-2">
//               <Wind className="w-4 h-4" />
//               <span>Wind Speed</span>
//             </div>
//             <span className="font-semibold">{weather.windSpeed} km/h</span>
//           </div>

//           <div className="flex items-center justify-between text-sm">
//             <div className="flex items-center space-x-2">
//               <Gauge className="w-4 h-4" />
//               <span>Pressure</span>
//             </div>
//             <span className="font-semibold">{weather.pressure} hPa</span>
//           </div>

//           <div className="flex items-center justify-between text-sm">
//             <div className="flex items-center space-x-2">
//               <Eye className="w-4 h-4" />
//               <span>Visibility</span>
//             </div>
//             <span className="font-semibold">{weather.visibility} km</span>
//           </div>
//         </div>

//         {/* Description */}
//         <div className="mt-6 pt-4 border-t border-white border-opacity-20">
//           <p className="text-sm opacity-90 text-center">{weather.description}</p>
//         </div>
//       </div>

//       {/* Footer */}
//       <div className="bg-black bg-opacity-10 px-6 py-3">
//         <p className="text-xs opacity-75 text-center">
//           Last updated: {new Date().toLocaleTimeString()}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default WeatherApp;


import React, { useState, useEffect } from "react";
import {
  Cloud,
  Sun,
  CloudRain,
  CloudSnow,
  Wind,
  Thermometer,
  Droplets,
  Eye,
  Gauge,
} from "lucide-react";

const WeatherApp = ({ name, latitude, longitude, apiKey }) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${latitude},${longitude}&aqi=no`
        );
        const data = await response.json();

        if (data.error) {
          throw new Error(data.error.message);
        }

        // ✅ Normalize WeatherAPI.com response
        const formatted = {
          location: data.location.name || name,
          region: data.location.region,
          country: data.location.country,
          temperature: data.current.temp_c,
          feelsLike: data.current.feelslike_c,
          humidity: data.current.humidity,
          windSpeed: data.current.wind_kph,
          pressure: data.current.pressure_mb,
          visibility: data.current.vis_km,
          condition: data.current.condition.text, // e.g. "Partly cloudy"
          icon: data.current.condition.icon, // WeatherAPI provides icon URL
          description: `${data.current.condition.text}, UV Index ${data.current.uv}`,
        };

        setWeather(formatted);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [latitude, longitude, apiKey, name]);

  const getWeatherIcon = (condition) => {
    if (!condition) return <Sun className="w-12 h-12 text-yellow-500" />;
    const c = condition.toLowerCase();

    if (c.includes("cloud")) return <Cloud className="w-12 h-12 text-gray-400" />;
    if (c.includes("rain")) return <CloudRain className="w-12 h-12 text-blue-500" />;
    if (c.includes("snow")) return <CloudSnow className="w-12 h-12 text-blue-200" />;
    if (c.includes("clear") || c.includes("sun")) return <Sun className="w-12 h-12 text-yellow-500" />;

    return <Sun className="w-12 h-12 text-yellow-500" />;
  };

  if (loading) {
    return (
      <div className="max-w-md mx-auto bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl shadow-xl p-6 text-white">
        <p className="text-center animate-pulse">Loading weather...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto bg-red-500 rounded-2xl shadow-xl p-6 text-white">
        <div className="text-center">
          <Cloud className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-semibold mb-2">Weather Unavailable</h3>
          <p className="text-red-100">{error}</p>
          <p className="text-sm text-red-200 mt-2">
            Coordinates: {latitude.toFixed(4)}, {longitude.toFixed(4)}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl shadow-xl overflow-hidden text-white">
      <div className="p-6">
        {/* Header */}
        <div className="text-center mb-6">
          {/* <h2 className="text-xl font-bold">  </h2> */}
          <h2 className="text-lg font-bold"><span className="font-bold text-2xl text-red-100">{name}</span> : ({weather.location})</h2>
          <p className="text-sm opacity-75">
            {weather.region}, {weather.country}
          </p>
        </div>

        {/* Main Weather */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            {getWeatherIcon(weather.condition)}
            <div>
              <div className="text-4xl font-bold">{weather.temperature}°C</div>
              <div className="text-lg opacity-90">{weather.condition}</div>
            </div>
          </div>
        </div>

        {/* Weather Details */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <Thermometer className="w-4 h-4" />
              <span>Feels like</span>
            </div>
            <span className="font-semibold">{weather.feelsLike}°C</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <Droplets className="w-4 h-4" />
              <span>Humidity</span>
            </div>
            <span className="font-semibold">{weather.humidity}%</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <Wind className="w-4 h-4" />
              <span>Wind Speed</span>
            </div>
            <span className="font-semibold">{weather.windSpeed} km/h</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <Gauge className="w-4 h-4" />
              <span>Pressure</span>
            </div>
            <span className="font-semibold">{weather.pressure} hPa</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <Eye className="w-4 h-4" />
              <span>Visibility</span>
            </div>
            <span className="font-semibold">{weather.visibility} km</span>
          </div>
        </div>

        {/* Description */}
        <div className="mt-6 pt-4 border-t border-white border-opacity-20">
          <p className="text-sm opacity-90 text-center">{weather.description}</p>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-black bg-opacity-10 px-6 py-3">
        <p className="text-xs opacity-75 text-center">
          Last updated: {new Date().toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
};

export default WeatherApp;
