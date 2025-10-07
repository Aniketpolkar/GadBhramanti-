// import { useState,useEffect } from "react";
// import AdminFooter from "../components/AdminFooter";
// import API from "../api/axios";
// import { addFortApi } from "../api/adminApi";
// import { useParams, useNavigate } from "react-router-dom";

// // Maharashtra-specific options
// const MAHARASHTRA_OPTIONS = {
//   regions: [
//     "Western Ghats",
//     "Konkan",
//     "Marathwada",
//     "Vidarbha",
//     "Khandesh",
//     "Pune District",
//     "Mumbai Suburban",
//     "Thane District",
//     "Nashik District",
//     "Aurangabad District",
//     "Kolhapur District",
//     "Satara District",
//     "Sangli District",
//     "Solapur District",
//     "Ahmednagar District",
//     "Raigad District",
//     "Ratnagiri District",
//     "Sindhudurg District"
//   ],
  
//   difficulties: [
//     "Easy",
//     "Easy-Moderate", 
//     "Moderate",
//     "Moderate-Difficult",
//     "Difficult",
//     "Very Difficult"
//   ],
  
//   seasons: [
//     "October to March",
//     "November to February", 
//     "October to February",
//     "December to March",
//     "Post-Monsoon (Oct-Nov)",
//     "Winter (Dec-Feb)",
//     "Monsoon (Jun-Sep) - Not Recommended",
//     "Year Round"
//   ],
  
//   durations: [
//     "2-3 hours",
//     "3-4 hours",
//     "4-5 hours",
//     "5-6 hours",
//     "6-8 hours",
//     "1 day",
//     "2 days",
//     "Multi-day"
//   ],

//   railwayStations: [
//     "Mumbai CST",
//     "Pune Junction",
//     "Lonavala",
//     "Karjat",
//     "Igatpuri",
//     "Nashik Road",
//     "Aurangabad",
//     "Kolhapur",
//     "Satara",
//     "Sangli",
//     "Solapur",
//     "Ahmednagar",
//     "Kalyan",
//     "Thane",
//     "Panvel",
//     "Ratnagiri",
//     "Kudal"
//   ],

//   airports: [
//     "Chhatrapati Shivaji International Airport, Mumbai",
//     "Pune Airport",
//     "Aurangabad Airport", 
//     "Kolhapur Airport",
//     "Nashik Airport",
//     "Solapur Airport"
//   ],

//   entryFees: [
//     "Free",
//     "₹5 per person",
//     "₹10 per person",
//     "₹15 per person",
//     "₹20 per person",
//     "₹25 per person",
//     "₹30 per person",
//     "₹50 per person",
//     "₹100 per person"
//   ],

//   openingHours: [
//     "24 hours",
//     "Sunrise to Sunset",
//     "6:00 AM to 6:00 PM",
//     "7:00 AM to 5:00 PM",
//     "8:00 AM to 6:00 PM",
//     "9:00 AM to 5:00 PM"
//   ],

//   commonAttractions: [
//     "Ancient caves",
//     "Water tanks",
//     "Darwaza (entrance gate)",
//     "Bastions", 
//     "Secret passages",
//     "Temples",
//     "Palace ruins",
//     "Granary",
//     "Prison cells",
//     "Cannons",
//     "Watch towers",
//     "Ancient inscriptions",
//     "Rock-cut architecture",
//     "Natural caves",
//     "Waterfalls nearby",
//     "Valley views",
//     "Sunrise/Sunset points"
//   ],

//   safetyTips: [
//     "Carry sufficient water",
//     "Wear proper trekking shoes",
//     "Start early morning",
//     "Check weather conditions",
//     "Inform someone about your trek",
//     "Carry first aid kit",
//     "Don't trek alone",
//     "Avoid monsoon season",
//     "Be careful on rocky patches",
//     "Watch for loose rocks",
//     "Stay on marked trails",
//     "Carry torch/flashlight"
//   ],

//   facilities: [
//     "Available",
//     "Limited availability", 
//     "Seasonal availability",
//     "Not available",
//     "Available in base village",
//     "Available at nearby towns"
//   ]
// };

// export default function AddFort() {
//   const { id } = useParams();
//   const isEdit = Boolean(id);
//   const [form, setForm] = useState({
//     id: "",
//     name: "",
//     region: "",
//     history: "",
//     altitude: "",
//     baseVillage: "",
//     difficulty: "",
//     bestSeason: "",
//     trekDuration: "",
//     nearest: { railway: "", bus: "", airport: "" },
//     location: { lat: "", lng: "" },
//     routes: "",
//     images: "",
//     pdfGuide: "",
//     entryFee: "",
//     openingHours: "",
//     campingAllowed: false,
//     safetyTips: "",
//     specialAttractions: "",
//     nearbyForts: "",
//     hotelFacility: "",
//     waterFacility: "",
//   });

//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//     //   useEffect(() => {
//     //   if (id) {
//     //     getFortByIdApi(id)
//     //       .then((res) => setFormData(res.data))
//     //       .catch(() => setError("Failed to load fort"));
//     //   }
//     // }, [id]);

//    useEffect(() => {
//   if (isEdit) {
//     getFortByIdApi(id)
//       .then((res) => {
//         const fort = res.data; // or res.data.fort (check your API shape)
//         setForm({
//           ...fort,
//           // convert arrays -> comma strings for inputs
//           images: fort.images?.join(", ") || "",
//           nearbyForts: fort.nearbyForts?.join(", ") || "",
//           safetyTips: fort.safetyTips?.join(", ") || "",
//           specialAttractions: fort.specialAttractions?.join(", ") || "",
//           routes: fort.routes
//             ?.map((r) => `${r.name}:${r.lengthKm}:${r.difficulty}`)
//             .join(", ") || "",
//         });
//       })
//       .catch(() => setError("Failed to load fort"));
//   }
// }, [id, isEdit]);

// // useEffect(() => {
// //   if (id) {
// //     getFortByIdApi(id)
// //       .then((res) => {
// //         const fort = res.data;

// //         // Convert arrays back to comma-separated strings for text inputs
// //         setForm({
// //           ...fort,
// //           images: fort.images?.join(", ") || "",
// //           nearbyForts: fort.nearbyForts?.join(", ") || "",
// //           safetyTips: fort.safetyTips?.join(", ") || "",
// //           specialAttractions: fort.specialAttractions?.join(", ") || "",
// //           routes: fort.routes
// //             ?.map((r) => `${r.name}:${r.lengthKm}:${r.difficulty}`)
// //             .join(", ") || "",
// //         });
// //       })
// //       .catch(() => setError("Failed to load fort details"));
// //   }
// // }, [id]);


//   // handle normal input change
//   // const handleChange = (e) => {
//   //   const { name, value, type, checked } = e.target;
//   //   setForm({
//   //     ...form,
//   //     [name]: type === "checkbox" ? checked : value,
//   //   });
//   // };

//   useEffect(() => {
//   console.log("Form state after fetching:", form);
// }, [form]);

//   const handleChange = (e) => {
//   const { name, value, type, checked } = e.target;

//   // Handle checkbox
//   const newValue = type === "checkbox" ? checked : value;

//   // Handle nested fields like location.lat or nearest.bus
//   if (name.includes(".")) {
//     const [parent, child] = name.split(".");
//     setForm((prev) => ({
//       ...prev,
//       [parent]: {
//         ...prev[parent],
//         [child]: newValue,
//       },
//     }));
//   } else {
//     setForm((prev) => ({
//       ...prev,
//       [name]: newValue,
//     }));
//   }
// };


//   // handle nested input change (nearest, location)
//   const handleNestedChange = (e, section) => {
//     setForm({
//       ...form,
//       [section]: { ...form[section], [e.target.name]: e.target.value },
//     });
//   };

//   // Function to add quick selection items
//   const addQuickSelection = (field, value) => {
//     const currentItems = form[field] ? form[field].split(",").map(item => item.trim()) : [];
//     if (!currentItems.includes(value)) {
//       setForm({ ...form, [field]: [...currentItems, value].join(", ") });
//     }
//   };

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   setError("");
//   //   setSuccess("");

//   //   try {
//   //     const payload = {
//   //       ...form,
//   //       id: Number(form.id),
//   //       altitude: Number(form.altitude),
//   //       location: {
//   //         lat: Number(form.location.lat),
//   //         lng: Number(form.location.lng),
//   //       },
//   //       images: form.images.split(",").map((i) => i.trim()),
//   //       nearbyForts: form.nearbyForts
//   //         ? form.nearbyForts.split(",").map((f) => f.trim())
//   //         : [],
//   //       safetyTips: form.safetyTips
//   //         ? form.safetyTips.split(",").map((t) => t.trim())
//   //         : [],
//   //       specialAttractions: form.specialAttractions
//   //         ? form.specialAttractions.split(",").map((s) => s.trim())
//   //         : [],
//   //       routes: form.routes
//   //         ? form.routes.split(",").map((r) => {
//   //             const [name, lengthKm, difficulty] = r.split(":");
//   //             return { name, lengthKm: Number(lengthKm), difficulty };
//   //           })
//   //         : [],
//   //     };
//   //     const res = await addFortApi(payload);
//   //     setSuccess("Fort added successfully!");
//   //     // Reset form
//   //     setForm({
//   //       id: "",
//   //       name: "",
//   //       region: "",
//   //       history: "",
//   //       altitude: "",
//   //       baseVillage: "",
//   //       difficulty: "",
//   //       bestSeason: "",
//   //       trekDuration: "",
//   //       nearest: { railway: "", bus: "", airport: "" },
//   //       location: { lat: "", lng: "" },
//   //       routes: "",
//   //       images: "",
//   //       pdfGuide: "",
//   //       entryFee: "",
//   //       openingHours: "",
//   //       campingAllowed: false,
//   //       safetyTips: "",
//   //       specialAttractions: "",
//   //       nearbyForts: "",
//   //       hotelFacility: "",
//   //       waterFacility: "",
//   //     });
//   //   } catch (err) {
//   //     setError(err.response?.data?.message || "Failed to add fort");
//   //   }
//   // };

//   const handleSubmit = async (e) => {
//   e.preventDefault();
//   setError("");
//   setSuccess("");

//   try {
//     // Build payload
//     const payload = {
//       ...form,
//       id: Number(form.id),
//       altitude: Number(form.altitude),
//       location: {
//         lat: Number(form.location.lat),
//         lng: Number(form.location.lng),
//       },
//       images: form.images
//         ? form.images.split(",").map((i) => i.trim())
//         : [],
//       nearbyForts: form.nearbyForts
//         ? form.nearbyForts.split(",").map((f) => f.trim())
//         : [],
//       safetyTips: form.safetyTips
//         ? form.safetyTips.split(",").map((t) => t.trim())
//         : [],
//       specialAttractions: form.specialAttractions
//         ? form.specialAttractions.split(",").map((s) => s.trim())
//         : [],
//       routes: form.routes
//         ? form.routes.split(",").map((r) => {
//             const [name, lengthKm, difficulty] = r.split(":");
//             return { name, lengthKm: Number(lengthKm), difficulty };
//           })
//         : [],
//     };

//     let res;
//     if (id) {
//       // Edit mode
//       console.log("this is update fort")
//       res = await updateFortApi(id, payload);
//       setSuccess("Fort updated successfully!");
//     } else {
//       // Add mode
//       res = await addFortApi(payload);
//       setSuccess("Fort added successfully!");

//       // Reset form only after adding
//       setForm({
//         id: "",
//         name: "",
//         region: "",
//         history: "",
//         altitude: "",
//         baseVillage: "",
//         difficulty: "",
//         bestSeason: "",
//         trekDuration: "",
//         nearest: { railway: "", bus: "", airport: "" },
//         location: { lat: "", lng: "" },
//         routes: "",
//         images: "",
//         pdfGuide: "",
//         entryFee: "",
//         openingHours: "",
//         campingAllowed: false,
//         safetyTips: "",
//         specialAttractions: "",
//         nearbyForts: "",
//         hotelFacility: "",
//         waterFacility: "",
//       });
//     }
//   } catch (err) {
//     setError(err.response?.data?.message || "Failed to save fort");
//   }
// };

//   return (
//     <div className="min-h-screen flex flex-col bg-gray-100">
      
//       <main className="flex-1 max-w-6xl mx-auto p-6">
//         <h1 className="text-3xl font-bold mb-6 text-gray-800">Add New Fort</h1>

//         {error && (
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//             {error}
//           </div>
//         )}
//         {success && (
//           <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
//             {success}
//           </div>
//         )}

//         <form
//           onSubmit={handleSubmit}
//           className="bg-white shadow-lg p-8 rounded-lg"
//         >
//           {/* Basic Information Section */}
//           <div className="mb-8">
//             <h2 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">Basic Information</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
//               <div className="space-y-2">
//                 <label className="block text-sm font-medium text-gray-700">Fort ID *</label>
//                 <input 
//                   name="id" 
//                   type="number"
//                   placeholder="Enter unique fort ID" 
//                   value={form.id} 
//                   onChange={handleChange} 
//                   className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
//                   required 
//                 />
//               </div>
              
//               <div className="space-y-2">
//                 <label className="block text-sm font-medium text-gray-700">Fort Name *</label>
//                 <input 
//                   name="name" 
//                   placeholder="e.g., Rajgad Fort" 
//                   value={form.name} 
//                   onChange={handleChange} 
//                   className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
//                   required 
//                 />
//               </div>
              
//               <div className="space-y-2">
//                 <label className="block text-sm font-medium text-gray-700">Region</label>
//                 <select 
//                   name="region" 
//                   value={form.region} 
//                   onChange={handleChange} 
//                   className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 >
//                   <option value="">Select Region</option>
//                   {MAHARASHTRA_OPTIONS.regions.map((region, index) => (
//                     <option key={index} value={region}>{region}</option>
//                   ))}
//                 </select>
//               </div>
              
//               <div className="space-y-2">
//                 <label className="block text-sm font-medium text-gray-700">Altitude (meters)</label>
//                 <input 
//                   name="altitude" 
//                   type="number"
//                   placeholder="e.g., 1400" 
//                   value={form.altitude} 
//                   onChange={handleChange} 
//                   className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
//                 />
//               </div>
              
//               <div className="space-y-2">
//                 <label className="block text-sm font-medium text-gray-700">Base Village</label>
//                 <input 
//                   name="baseVillage" 
//                   placeholder="e.g., Gunjavane" 
//                   value={form.baseVillage} 
//                   onChange={handleChange} 
//                   className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
//                 />
//               </div>
              
//               <div className="space-y-2">
//                 <label className="block text-sm font-medium text-gray-700">Difficulty Level</label>
//                 <select 
//                   name="difficulty" 
//                   value={form.difficulty} 
//                   onChange={handleChange} 
//                   className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 >
//                   <option value="">Select Difficulty</option>
//                   {MAHARASHTRA_OPTIONS.difficulties.map((difficulty, index) => (
//                     <option key={index} value={difficulty}>{difficulty}</option>
//                   ))}
//                 </select>
//               </div>
              
//               <div className="space-y-2">
//                 <label className="block text-sm font-medium text-gray-700">Best Season</label>
//                 <select 
//                   name="bestSeason" 
//                   value={form.bestSeason} 
//                   onChange={handleChange} 
//                   className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 >
//                   <option value="">Select Best Season</option>
//                   {MAHARASHTRA_OPTIONS.seasons.map((season, index) => (
//                     <option key={index} value={season}>{season}</option>
//                   ))}
//                 </select>
//               </div>
              
//               <div className="space-y-2">
//                 <label className="block text-sm font-medium text-gray-700">Trek Duration</label>
//                 <select 
//                   name="trekDuration" 
//                   value={form.trekDuration} 
//                   onChange={handleChange} 
//                   className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 >
//                   <option value="">Select Duration</option>
//                   {MAHARASHTRA_OPTIONS.durations.map((duration, index) => (
//                     <option key={index} value={duration}>{duration}</option>
//                   ))}
//                 </select>
//               </div>
//             </div>

//             <div className="mt-6 space-y-2">
//               <label className="block text-sm font-medium text-gray-700">History</label>
//               <textarea 
//                 name="history" 
//                 placeholder="Enter the historical significance and background of the fort..." 
//                 value={form.history} 
//                 onChange={handleChange} 
//                 rows="4"
//                 className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
//               />
//             </div>
//           </div>

//           {/* Transportation Section */}
//           <div className="mb-8">
//             <h2 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">Nearest Transportation</h2>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
//               <div className="space-y-2">
//                 <label className="block text-sm font-medium text-gray-700">Nearest Railway Station</label>
//                 <select 
//                   name="railway" 
//                   value={form.nearest.railway} 
//                   onChange={(e) => handleNestedChange(e, "nearest")} 
//                   className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 >
//                   <option value="">Select Railway Station</option>
//                   {MAHARASHTRA_OPTIONS.railwayStations.map((station, index) => (
//                     <option key={index} value={station}>{station}</option>
//                   ))}
//                 </select>
//               </div>
              
//               <div className="space-y-2">
//                 <label className="block text-sm font-medium text-gray-700">Nearest Bus Stop</label>
//                 <input 
//                   name="bus" 
//                   placeholder="e.g., Pune ST Stand" 
//                   value={form.nearest.bus} 
//                   onChange={(e) => handleNestedChange(e, "nearest")} 
//                   className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
//                 />
//               </div>
              
//               <div className="space-y-2">
//                 <label className="block text-sm font-medium text-gray-700">Nearest Airport</label>
//                 <select 
//                   name="airport" 
//                   value={form.nearest.airport} 
//                   onChange={(e) => handleNestedChange(e, "nearest")} 
//                   className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 >
//                   <option value="">Select Airport</option>
//                   {MAHARASHTRA_OPTIONS.airports.map((airport, index) => (
//                     <option key={index} value={airport}>{airport}</option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//           </div>

//           {/* Location Section */}
//           <div className="mb-8">
//             <h2 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">Location Coordinates</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
//               <div className="space-y-2">
//                 <label className="block text-sm font-medium text-gray-700">Latitude</label>
//                 <input 
//                   name="lat" 
//                   type="number"
//                   step="any"
//                   placeholder="e.g., 18.2345" 
//                   value={form.location.lat} 
//                   onChange={(e) => handleNestedChange(e, "location")} 
//                   className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
//                 />
//               </div>
              
//               <div className="space-y-2">
//                 <label className="block text-sm font-medium text-gray-700">Longitude</label>
//                 <input 
//                   name="lng" 
//                   type="number"
//                   step="any"
//                   placeholder="e.g., 73.8567" 
//                   value={form.location.lng} 
//                   onChange={(e) => handleNestedChange(e, "location")} 
//                   className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Routes and Facilities Section */}
//           <div className="mb-8">
//             <h2 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">Routes and Facilities</h2>
            
//             <div className="space-y-6">
//               <div className="space-y-2">
//                 <label className="block text-sm font-medium text-gray-700">Routes</label>
//                 <input 
//                   name="routes" 
//                   placeholder="Format: Route1:5:Easy, Route2:7:Moderate" 
//                   value={form.routes} 
//                   onChange={handleChange} 
//                   className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
//                 />
//                 <p className="text-sm text-gray-500">Enter as: RouteName:LengthInKm:Difficulty, separated by commas</p>
//               </div>
              
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div className="space-y-2">
//                   <label className="block text-sm font-medium text-gray-700">Hotel Facility</label>
//                   <select 
//                     name="hotelFacility" 
//                     value={form.hotelFacility} 
//                     onChange={handleChange} 
//                     className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   >
//                     <option value="">Select Availability</option>
//                     {MAHARASHTRA_OPTIONS.facilities.map((facility, index) => (
//                       <option key={index} value={facility}>{facility}</option>
//                     ))}
//                   </select>
//                 </div>
                
//                 <div className="space-y-2">
//                   <label className="block text-sm font-medium text-gray-700">Water Facility</label>
//                   <select 
//                     name="waterFacility" 
//                     value={form.waterFacility} 
//                     onChange={handleChange} 
//                     className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   >
//                     <option value="">Select Availability</option>
//                     {MAHARASHTRA_OPTIONS.facilities.map((facility, index) => (
//                       <option key={index} value={facility}>{facility}</option>
//                     ))}
//                   </select>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Visitor Information Section */}
//           <div className="mb-8">
//             <h2 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">Visitor Information</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
//               <div className="space-y-2">
//                 <label className="block text-sm font-medium text-gray-700">Entry Fee</label>
//                 <select 
//                   name="entryFee" 
//                   value={form.entryFee} 
//                   onChange={handleChange} 
//                   className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 >
//                   <option value="">Select Entry Fee</option>
//                   {MAHARASHTRA_OPTIONS.entryFees.map((fee, index) => (
//                     <option key={index} value={fee}>{fee}</option>
//                   ))}
//                 </select>
//               </div>
              
//               <div className="space-y-2">
//                 <label className="block text-sm font-medium text-gray-700">Opening Hours</label>
//                 <select 
//                   name="openingHours" 
//                   value={form.openingHours} 
//                   onChange={handleChange} 
//                   className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 >
//                   <option value="">Select Opening Hours</option>
//                   {MAHARASHTRA_OPTIONS.openingHours.map((hours, index) => (
//                     <option key={index} value={hours}>{hours}</option>
//                   ))}
//                 </select>
//               </div>
//             </div>

//             <div className="mt-6 space-y-4">
//               <label className="flex items-center gap-3">
//                 <input 
//                   type="checkbox" 
//                   name="campingAllowed" 
//                   checked={form.campingAllowed} 
//                   onChange={handleChange}
//                   className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
//                 />
//                 <span className="text-sm font-medium text-gray-700">Camping Allowed</span>
//               </label>
//             </div>
//           </div>

//           {/* Additional Information Section */}
//           <div className="mb-8">
//             <h2 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">Additional Information</h2>
            
//             <div className="space-y-6">
//               <div className="space-y-2">
//                 <label className="block text-sm font-medium text-gray-700">Safety Tips</label>
//                 <input 
//                   name="safetyTips" 
//                   placeholder="Select or type custom safety tips (comma separated)" 
//                   value={form.safetyTips} 
//                   onChange={handleChange} 
//                   className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
//                 />
//                 <div className="flex flex-wrap gap-2 mt-2">
//                   {MAHARASHTRA_OPTIONS.safetyTips.slice(0, 8).map((tip, index) => (
//                     <button
//                       key={index}
//                       type="button"
//                       onClick={() => addQuickSelection('safetyTips', tip)}
//                       className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors"
//                     >
//                       + {tip}
//                     </button>
//                   ))}
//                 </div>
//               </div>
              
//               <div className="space-y-2">
//                 <label className="block text-sm font-medium text-gray-700">Special Attractions</label>
//                 <input 
//                   name="specialAttractions" 
//                   placeholder="Select or type custom attractions (comma separated)" 
//                   value={form.specialAttractions} 
//                   onChange={handleChange} 
//                   className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
//                 />
//                 <div className="flex flex-wrap gap-2 mt-2">
//                   {MAHARASHTRA_OPTIONS.commonAttractions.slice(0, 10).map((attraction, index) => (
//                     <button
//                       key={index}
//                       type="button"
//                       onClick={() => addQuickSelection('specialAttractions', attraction)}
//                       className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded-full hover:bg-green-200 transition-colors"
//                     >
//                       + {attraction}
//                     </button>
//                   ))}
//                 </div>
//               </div>
              
//               <div className="space-y-2">
//                 <label className="block text-sm font-medium text-gray-700">Nearby Forts</label>
//                 <input 
//                   name="nearbyForts" 
//                   placeholder="e.g., Sinhagad Fort, Purandar Fort (comma separated)" 
//                   value={form.nearbyForts} 
//                   onChange={handleChange} 
//                   className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Media Section */}
//           <div className="mb-8">
//             <h2 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">Media</h2>
//             <div className="space-y-6">
              
//               <div className="space-y-2">
//                 <label className="block text-sm font-medium text-gray-700">Image URLs</label>
//                 <input 
//                   name="images" 
//                   placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg" 
//                   value={form.images} 
//                   onChange={handleChange} 
//                   className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
//                 />
//               </div>
              
//               <div className="space-y-2">
//                 <label className="block text-sm font-medium text-gray-700">PDF Guide URL</label>
//                 <input 
//                   name="pdfGuide" 
//                   placeholder="https://example.com/fort-guide.pdf" 
//                   value={form.pdfGuide} 
//                   onChange={handleChange} 
//                   className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Action Buttons */}
//           <div className="flex gap-4">
//             <button 
//               type="submit" 
//               className="flex-1 py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//             >
//               Save Fort
//             </button>
//             <button 
//               type="button" 
//               onClick={() => {
//                 setForm({
//                   id: "", name: "", region: "", history: "", altitude: "", baseVillage: "", 
//                   difficulty: "", bestSeason: "", trekDuration: "", 
//                   nearest: { railway: "", bus: "", airport: "" }, 
//                   location: { lat: "", lng: "" }, routes: "", images: "", pdfGuide: "", 
//                   entryFee: "", openingHours: "", campingAllowed: false, safetyTips: "", 
//                   specialAttractions: "", nearbyForts: "", hotelFacility: "", waterFacility: ""
//                 });
//                 setError(""); 
//                 setSuccess("");
//               }}
//               className="px-6 py-3 bg-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-400 transition-colors"
//             >
//               Reset Form
//             </button>
//           </div>
//         </form>
//       </main>
//       <AdminFooter />
//     </div>
//   );
// }


import { useState, useEffect } from "react";
import AdminFooter from "../components/AdminFooter";
import API from "../api/axios";
import { addFortApi, getFortByIdApi, updateFortApi } from "../api/adminApi";
import { useParams, useNavigate } from "react-router-dom";

// Maharashtra-specific options
const MAHARASHTRA_OPTIONS = {
  regions: [
    "Western Ghats",
    "Konkan",
    "Marathwada",
    "Vidarbha",
    "Khandesh",
    "Pune District",
    "Mumbai Suburban",
    "Thane District",
    "Nashik District",
    "Aurangabad District",
    "Kolhapur District",
    "Satara District",
    "Sangli District",
    "Solapur District",
    "Ahmednagar District",
    "Raigad District",
    "Ratnagiri District",
    "Sindhudurg District"
  ],
  
  difficulties: [
    "Easy",
    "Easy-Moderate", 
    "Moderate",
    "Moderate-Difficult",
    "Difficult",
    "Very Difficult"
  ],
  
  seasons: [
    "October to March",
    "November to February", 
    "October to February",
    "December to March",
    "Post-Monsoon (Oct-Nov)",
    "Winter (Dec-Feb)",
    "Monsoon (Jun-Sep) - Not Recommended",
    "Year Round"
  ],
  
  durations: [
    "2-3 hours",
    "3-4 hours",
    "4-5 hours",
    "5-6 hours",
    "6-8 hours",
    "1 day",
    "2 days",
    "Multi-day"
  ],

  railwayStations: [
    "Mumbai CST",
    "Pune Junction",
    "Lonavala",
    "Karjat",
    "Igatpuri",
    "Nashik Road",
    "Aurangabad",
    "Kolhapur",
    "Satara",
    "Sangli",
    "Solapur",
    "Ahmednagar",
    "Kalyan",
    "Thane",
    "Panvel",
    "Ratnagiri",
    "Kudal"
  ],

  airports: [
    "Chhatrapati Shivaji International Airport, Mumbai",
    "Pune Airport",
    "Aurangabad Airport", 
    "Kolhapur Airport",
    "Nashik Airport",
    "Solapur Airport"
  ],

  entryFees: [
    "Free",
    "₹5 per person",
    "₹10 per person",
    "₹15 per person",
    "₹20 per person",
    "₹25 per person",
    "₹30 per person",
    "₹50 per person",
    "₹100 per person"
  ],

  openingHours: [
    "24 hours",
    "Sunrise to Sunset",
    "6:00 AM to 6:00 PM",
    "7:00 AM to 5:00 PM",
    "8:00 AM to 6:00 PM",
    "9:00 AM to 5:00 PM"
  ],

  commonAttractions: [
    "Ancient caves",
    "Water tanks",
    "Darwaza (entrance gate)",
    "Bastions", 
    "Secret passages",
    "Temples",
    "Palace ruins",
    "Granary",
    "Prison cells",
    "Cannons",
    "Watch towers",
    "Ancient inscriptions",
    "Rock-cut architecture",
    "Natural caves",
    "Waterfalls nearby",
    "Valley views",
    "Sunrise/Sunset points"
  ],

  safetyTips: [
    "Carry sufficient water",
    "Wear proper trekking shoes",
    "Start early morning",
    "Check weather conditions",
    "Inform someone about your trek",
    "Carry first aid kit",
    "Don't trek alone",
    "Avoid monsoon season",
    "Be careful on rocky patches",
    "Watch for loose rocks",
    "Stay on marked trails",
    "Carry torch/flashlight"
  ],

  facilities: [
    "Available",
    "Limited availability", 
    "Seasonal availability",
    "Not available",
    "Available in base village",
    "Available at nearby towns"
  ]
};

export default function AddFort() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  
  const [form, setForm] = useState({
    id: "",
    name: "",
    region: "",
    history: "",
    altitude: "",
    baseVillage: "",
    difficulty: "",
    bestSeason: "",
    trekDuration: "",
    nearest: { railway: "", bus: "", airport: "" },
    location: { lat: "", lng: "" },
    routes: "",
    images: "",
    pdfGuide: "",
    entryFee: "",
    openingHours: "",
    campingAllowed: false,
    safetyTips: "",
    specialAttractions: "",
    nearbyForts: "",
    hotelFacility: "",
    waterFacility: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch fort data if editing
  useEffect(() => {
    if (isEdit && id) {
      setLoading(true);
      getFortByIdApi(id)
        .then((res) => {
          const fort = res.data;
          
          // Convert arrays to comma-separated strings for form inputs
          setForm({
            ...fort,
            // Ensure nested objects are properly structured
            nearest: {
              railway: fort.nearest?.railway || "",
              bus: fort.nearest?.bus || "",
              airport: fort.nearest?.airport || ""
            },
            location: {
              lat: fort.location?.lat || "",
              lng: fort.location?.lng || ""
            },
            // Convert arrays to comma-separated strings
            images: Array.isArray(fort.images) ? fort.images.join(", ") : fort.images || "",
            nearbyForts: Array.isArray(fort.nearbyForts) ? fort.nearbyForts.join(", ") : fort.nearbyForts || "",
            safetyTips: Array.isArray(fort.safetyTips) ? fort.safetyTips.join(", ") : fort.safetyTips || "",
            specialAttractions: Array.isArray(fort.specialAttractions) ? fort.specialAttractions.join(", ") : fort.specialAttractions || "",
            routes: Array.isArray(fort.routes) 
              ? fort.routes.map((r) => `${r.name}:${r.lengthKm}:${r.difficulty}`).join(", ")
              : fort.routes || "",
            // Ensure other fields have default values
            id: fort.id || "",
            name: fort.name || "",
            region: fort.region || "",
            history: fort.history || "",
            altitude: fort.altitude || "",
            baseVillage: fort.baseVillage || "",
            difficulty: fort.difficulty || "",
            bestSeason: fort.bestSeason || "",
            trekDuration: fort.trekDuration || "",
            pdfGuide: fort.pdfGuide || "",
            entryFee: fort.entryFee || "",
            openingHours: fort.openingHours || "",
            campingAllowed: fort.campingAllowed || false,
            hotelFacility: fort.hotelFacility || "",
            waterFacility: fort.waterFacility || "",
          });
        })
        .catch((err) => {
          console.error("Error fetching fort:", err);
          setError("Failed to load fort details");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id, isEdit]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    // Handle nested fields like location.lat or nearest.railway
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setForm((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: newValue,
        },
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: newValue,
      }));
    }
  };

  // Handle nested input changes (for backward compatibility)
  const handleNestedChange = (e, section) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [section]: { 
        ...prev[section], 
        [name]: value 
      },
    }));
  };

  // Function to add quick selection items
  const addQuickSelection = (field, value) => {
    const currentItems = form[field] ? form[field].split(",").map(item => item.trim()) : [];
    if (!currentItems.includes(value)) {
      setForm(prev => ({ 
        ...prev, 
        [field]: [...currentItems, value].join(", ") 
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      // Build payload with proper data types
      const payload = {
        ...form,
        id: Number(form.id),
        altitude: form.altitude ? Number(form.altitude) : 0,
        location: {
          lat: form.location.lat ? Number(form.location.lat) : 0,
          lng: form.location.lng ? Number(form.location.lng) : 0,
        },
        // Convert comma-separated strings back to arrays
        images: form.images
          ? form.images.split(",").map((i) => i.trim()).filter(i => i)
          : [],
        nearbyForts: form.nearbyForts
          ? form.nearbyForts.split(",").map((f) => f.trim()).filter(f => f)
          : [],
        safetyTips: form.safetyTips
          ? form.safetyTips.split(",").map((t) => t.trim()).filter(t => t)
          : [],
        specialAttractions: form.specialAttractions
          ? form.specialAttractions.split(",").map((s) => s.trim()).filter(s => s)
          : [],
        routes: form.routes
          ? form.routes.split(",").map((r) => {
              const parts = r.trim().split(":");
              if (parts.length === 3) {
                return { 
                  name: parts[0].trim(), 
                  lengthKm: Number(parts[1].trim()) || 0, 
                  difficulty: parts[2].trim() 
                };
              }
              return null;
            }).filter(r => r !== null)
          : [],
      };

      let res;
      if (isEdit) {
        // Edit mode - update existing fort
        res = await updateFortApi(id, payload);
        setSuccess("Fort updated successfully!");
      } else {
        // Add mode - create new fort
        res = await addFortApi(payload);
        setSuccess("Fort added successfully!");
        
        // Reset form only after adding (not editing)
        setForm({
          id: "",
          name: "",
          region: "",
          history: "",
          altitude: "",
          baseVillage: "",
          difficulty: "",
          bestSeason: "",
          trekDuration: "",
          nearest: { railway: "", bus: "", airport: "" },
          location: { lat: "", lng: "" },
          routes: "",
          images: "",
          pdfGuide: "",
          entryFee: "",
          openingHours: "",
          campingAllowed: false,
          safetyTips: "",
          specialAttractions: "",
          nearbyForts: "",
          hotelFacility: "",
          waterFacility: "",
        });
      }
      
      // Optional: Navigate back to admin dashboard after success
      // setTimeout(() => navigate("/admin/forts"), 2000);
      
    } catch (err) {
      console.error("Error saving fort:", err);
      setError(err.response?.data?.message || `Failed to ${isEdit ? 'update' : 'add'} fort`);
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEdit) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading fort details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <main className="flex-1 max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          {isEdit ? 'Edit Fort' : 'Add New Fort'}
        </h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white shadow-lg p-8 rounded-lg">
          {/* Basic Information Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Fort ID *</label>
                <input 
                  name="id" 
                  type="number"
                  placeholder="Enter unique fort ID" 
                  value={form.id} 
                  onChange={handleChange} 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                  required 
                  disabled={isEdit} // Disable ID field when editing
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Fort Name *</label>
                <input 
                  name="name" 
                  placeholder="e.g., Rajgad Fort" 
                  value={form.name} 
                  onChange={handleChange} 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Region</label>
                <select 
                  name="region" 
                  value={form.region} 
                  onChange={handleChange} 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Region</option>
                  {MAHARASHTRA_OPTIONS.regions.map((region, index) => (
                    <option key={index} value={region}>{region}</option>
                  ))}
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Altitude (meters)</label>
                <input 
                  name="altitude" 
                  type="number"
                  placeholder="e.g., 1400" 
                  value={form.altitude} 
                  onChange={handleChange} 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Base Village</label>
                <input 
                  name="baseVillage" 
                  placeholder="e.g., Gunjavane" 
                  value={form.baseVillage} 
                  onChange={handleChange} 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Difficulty Level</label>
                <select 
                  name="difficulty" 
                  value={form.difficulty} 
                  onChange={handleChange} 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Difficulty</option>
                  {MAHARASHTRA_OPTIONS.difficulties.map((difficulty, index) => (
                    <option key={index} value={difficulty}>{difficulty}</option>
                  ))}
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Best Season</label>
                <select 
                  name="bestSeason" 
                  value={form.bestSeason} 
                  onChange={handleChange} 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Best Season</option>
                  {MAHARASHTRA_OPTIONS.seasons.map((season, index) => (
                    <option key={index} value={season}>{season}</option>
                  ))}
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Trek Duration</label>
                <select 
                  name="trekDuration" 
                  value={form.trekDuration} 
                  onChange={handleChange} 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Duration</option>
                  {MAHARASHTRA_OPTIONS.durations.map((duration, index) => (
                    <option key={index} value={duration}>{duration}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-6 space-y-2">
              <label className="block text-sm font-medium text-gray-700">History</label>
              <textarea 
                name="history" 
                placeholder="Enter the historical significance and background of the fort..." 
                value={form.history} 
                onChange={handleChange} 
                rows="4"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
              />
            </div>
          </div>

          {/* Transportation Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">Nearest Transportation</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Nearest Railway Station</label>
                <select 
                  name="railway" 
                  value={form.nearest.railway} 
                  onChange={(e) => handleNestedChange(e, "nearest")} 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Railway Station</option>
                  {MAHARASHTRA_OPTIONS.railwayStations.map((station, index) => (
                    <option key={index} value={station}>{station}</option>
                  ))}
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Nearest Bus Stop</label>
                <input 
                  name="bus" 
                  placeholder="e.g., Pune ST Stand" 
                  value={form.nearest.bus} 
                  onChange={(e) => handleNestedChange(e, "nearest")} 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Nearest Airport</label>
                <select 
                  name="airport" 
                  value={form.nearest.airport} 
                  onChange={(e) => handleNestedChange(e, "nearest")} 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Airport</option>
                  {MAHARASHTRA_OPTIONS.airports.map((airport, index) => (
                    <option key={index} value={airport}>{airport}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Location Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">Location Coordinates</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Latitude</label>
                <input 
                  name="lat" 
                  type="number"
                  step="any"
                  placeholder="e.g., 18.2345" 
                  value={form.location.lat} 
                  onChange={(e) => handleNestedChange(e, "location")} 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Longitude</label>
                <input 
                  name="lng" 
                  type="number"
                  step="any"
                  placeholder="e.g., 73.8567" 
                  value={form.location.lng} 
                  onChange={(e) => handleNestedChange(e, "location")} 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                />
              </div>
            </div>
          </div>

          {/* Routes and Facilities Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">Routes and Facilities</h2>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Routes</label>
                <input 
                  name="routes" 
                  placeholder="Format: Route1:5:Easy, Route2:7:Moderate" 
                  value={form.routes} 
                  onChange={handleChange} 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                />
                <p className="text-sm text-gray-500">Enter as: RouteName:LengthInKm:Difficulty, separated by commas</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Hotel Facility</label>
                  <select 
                    name="hotelFacility" 
                    value={form.hotelFacility} 
                    onChange={handleChange} 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Availability</option>
                    {MAHARASHTRA_OPTIONS.facilities.map((facility, index) => (
                      <option key={index} value={facility}>{facility}</option>
                    ))}
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Water Facility</label>
                  <select 
                    name="waterFacility" 
                    value={form.waterFacility} 
                    onChange={handleChange} 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Availability</option>
                    {MAHARASHTRA_OPTIONS.facilities.map((facility, index) => (
                      <option key={index} value={facility}>{facility}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Visitor Information Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">Visitor Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Entry Fee</label>
                <select 
                  name="entryFee" 
                  value={form.entryFee} 
                  onChange={handleChange} 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Entry Fee</option>
                  {MAHARASHTRA_OPTIONS.entryFees.map((fee, index) => (
                    <option key={index} value={fee}>{fee}</option>
                  ))}
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Opening Hours</label>
                <select 
                  name="openingHours" 
                  value={form.openingHours} 
                  onChange={handleChange} 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Opening Hours</option>
                  {MAHARASHTRA_OPTIONS.openingHours.map((hours, index) => (
                    <option key={index} value={hours}>{hours}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <label className="flex items-center gap-3">
                <input 
                  type="checkbox" 
                  name="campingAllowed" 
                  checked={form.campingAllowed} 
                  onChange={handleChange}
                  className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">Camping Allowed</span>
              </label>
            </div>
          </div>

          {/* Additional Information Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">Additional Information</h2>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Safety Tips</label>
                <input 
                  name="safetyTips" 
                  placeholder="Select or type custom safety tips (comma separated)" 
                  value={form.safetyTips} 
                  onChange={handleChange} 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                />
                <div className="flex flex-wrap gap-2 mt-2">
                  {MAHARASHTRA_OPTIONS.safetyTips.slice(0, 8).map((tip, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => addQuickSelection('safetyTips', tip)}
                      className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors"
                    >
                      + {tip}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Special Attractions</label>
                <input 
                  name="specialAttractions" 
                  placeholder="Select or type custom attractions (comma separated)" 
                  value={form.specialAttractions} 
                  onChange={handleChange} 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                />
                <div className="flex flex-wrap gap-2 mt-2">
                  {MAHARASHTRA_OPTIONS.commonAttractions.slice(0, 10).map((attraction, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => addQuickSelection('specialAttractions', attraction)}
                      className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded-full hover:bg-green-200 transition-colors"
                    >
                      + {attraction}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Nearby Forts</label>
                <input 
                  name="nearbyForts" 
                  placeholder="e.g., Sinhagad Fort, Purandar Fort (comma separated)" 
                  value={form.nearbyForts} 
                  onChange={handleChange} 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                />
              </div>
            </div>
          </div>

          {/* Media Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">Media</h2>
            <div className="space-y-6">
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Image URLs</label>
                <input 
                  name="images" 
                  placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg" 
                  value={form.images} 
                  onChange={handleChange} 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">PDF Guide URL</label>
                <input 
                  name="pdfGuide" 
                  placeholder="https://example.com/fort-guide.pdf" 
                  value={form.pdfGuide} 
                  onChange={handleChange} 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button 
              type="submit" 
              disabled={loading}
              className={`flex-1 py-3 px-6 font-semibold rounded-lg transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                loading 
                  ? 'bg-gray-400 text-gray-200 cursor-not-allowed' 
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {isEdit ? 'Updating...' : 'Saving...'}
                </span>
              ) : (
                isEdit ? 'Update Fort' : 'Save Fort'
              )}
            </button>
            
            {!isEdit && (
              <button 
                type="button" 
                disabled={loading}
                onClick={() => {
                  setForm({
                    id: "", name: "", region: "", history: "", altitude: "", baseVillage: "", 
                    difficulty: "", bestSeason: "", trekDuration: "", 
                    nearest: { railway: "", bus: "", airport: "" }, 
                    location: { lat: "", lng: "" }, routes: "", images: "", pdfGuide: "", 
                    entryFee: "", openingHours: "", campingAllowed: false, safetyTips: "", 
                    specialAttractions: "", nearbyForts: "", hotelFacility: "", waterFacility: ""
                  });
                  setError(""); 
                  setSuccess("");
                }}
                className="px-6 py-3 bg-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Reset Form
              </button>
            )}
            
            {isEdit && (
              <button 
                type="button" 
                disabled={loading}
                onClick={() => navigate(-1)} // Go back to previous page
                className="px-6 py-3 bg-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </main>
      <AdminFooter />
    </div>
  );
}