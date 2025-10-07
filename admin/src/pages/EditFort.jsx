import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getFortByIdApi, updateFortApi } from "../api/adminApi";

export default function EditFort() {
  const { id } = useParams();
  const navigate = useNavigate();

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
    routes: "", // comma separated string for easier input
    nearest: { railway: "", bus: "", airport: "" },
    contacts: { guides: "", drivers: "" }, // comma separated "name:phone" strings
    location: { lat: "", lng: "" },
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

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchFort = async () => {
      try {
        const res = await getFortByIdApi(id);
        const fort = res.data;

        setForm({
          id: fort.id || "",
          name: fort.name || "",
          region: fort.region || "",
          history: fort.history || "",
          altitude: fort.altitude || "",
          baseVillage: fort.baseVillage || "",
          difficulty: fort.difficulty || "",
          bestSeason: fort.bestSeason || "",
          trekDuration: fort.trekDuration || "",
          routes: Array.isArray(fort.routes)
            ? fort.routes.map((r) => r.name).join(", ")
            : "",
          nearest: fort.nearest || { railway: "", bus: "", airport: "" },
          contacts: {
            guides: fort.contacts?.guides
              ? fort.contacts.guides.map((c) => `${c.name}:${c.phone}`).join(", ")
              : "",
            drivers: fort.contacts?.drivers
              ? fort.contacts.drivers.map((c) => `${c.name}:${c.phone}`).join(", ")
              : "",
          },
          location: fort.location || { lat: "", lng: "" },
          images: Array.isArray(fort.images) ? fort.images.join(", ") : "",
          pdfGuide: fort.pdfGuide || "",
          entryFee: fort.entryFee || "",
          openingHours: fort.openingHours || "",
          campingAllowed: fort.campingAllowed || false,
          safetyTips: fort.safetyTips ? fort.safetyTips.join(", ") : "",
          specialAttractions: fort.specialAttractions ? fort.specialAttractions.join(", ") : "",
          nearbyForts: fort.nearbyForts ? fort.nearbyForts.join(", ") : "",
          hotelFacility: fort.hotelFacility || "",
          waterFacility: fort.waterFacility || "",
        });
      } catch (err) {
        console.error("Failed to fetch fort:", err);
        setError("Failed to load fort data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchFort();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Clear previous error and success messages
    setError("");
    setSuccess("");

    // handle nested fields
    if (name.startsWith("nearest.")) {
      const key = name.split(".")[1];
      setForm((prev) => ({
        ...prev,
        nearest: { ...prev.nearest, [key]: value },
      }));
    } else if (name.startsWith("location.")) {
      const key = name.split(".")[1];
      setForm((prev) => ({
        ...prev,
        location: { ...prev.location, [key]: parseFloat(value) || 0 },
      }));
    } else if (name === "campingAllowed") {
      setForm((prev) => ({ ...prev, campingAllowed: checked }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validateForm = () => {
    if (!form.name.trim()) {
      setError("Fort name is required");
      return false;
    }
    if (!form.location.lat || !form.location.lng) {
      setError("Location coordinates are required");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    setError("");

    try {
      // Prepare payload
      const payload = {
        ...form,
        routes: form.routes
          ? form.routes.split(",").map((name) => ({ name: name.trim() }))
          : [],
        contacts: {
          guides: form.contacts.guides
            ? form.contacts.guides.split(",").map((c) => {
                const [name, phone] = c.split(":").map((s) => s.trim());
                return { name, phone };
              })
            : [],
          drivers: form.contacts.drivers
            ? form.contacts.drivers.split(",").map((c) => {
                const [name, phone] = c.split(":").map((s) => s.trim());
                return { name, phone };
              })
            : [],
        },
        images: form.images ? form.images.split(",").map((i) => i.trim()) : [],
        safetyTips: form.safetyTips
          ? form.safetyTips.split(",").map((i) => i.trim())
          : [],
        specialAttractions: form.specialAttractions
          ? form.specialAttractions.split(",").map((i) => i.trim())
          : [],
        nearbyForts: form.nearbyForts
          ? form.nearbyForts.split(",").map((i) => i.trim())
          : [],
      };

      await updateFortApi(id, payload);
      setSuccess("Fort updated successfully!");
      setTimeout(() => navigate("/manage-forts"), 2000);
    } catch (err) {
      console.error("Failed to update fort:", err);
      setError("Failed to update fort. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading && !form.name) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-lg">Loading fort data...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Edit Fort Information</h1>
          
          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Basic Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-2">
                    Fort Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter fort name (e.g., Shivneri Fort)"
                    className="w-full px-3 py-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-2">
                    Region
                  </label>
                  <input
                    type="text"
                    name="region"
                    value={form.region}
                    onChange={handleChange}
                    placeholder="Enter region (e.g., Western Ghats, Maharashtra)"
                    className="w-full px-3 py-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-2">
                    Altitude (meters)
                  </label>
                  <input
                    type="number"
                    name="altitude"
                    value={form.altitude}
                    onChange={handleChange}
                    placeholder="Enter altitude (e.g., 1200)"
                    className="w-full px-3 py-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-2">
                    Base Village
                  </label>
                  <input
                    type="text"
                    name="baseVillage"
                    value={form.baseVillage}
                    onChange={handleChange}
                    placeholder="Enter base village name (e.g., Junnar)"
                    className="w-full px-3 py-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-2">
                    Difficulty Level
                  </label>
                  <select
                    name="difficulty"
                    value={form.difficulty}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select difficulty</option>
                    <option value="Easy">Easy</option>
                    <option value="Moderate">Moderate</option>
                    <option value="Difficult">Difficult</option>
                    <option value="Very Difficult">Very Difficult</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-2">
                    Best Season
                  </label>
                  <input
                    type="text"
                    name="bestSeason"
                    value={form.bestSeason}
                    onChange={handleChange}
                    placeholder="Enter best season (e.g., October to March)"
                    className="w-full px-3 py-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-2">
                    Trek Duration
                  </label>
                  <input
                    type="text"
                    name="trekDuration"
                    value={form.trekDuration}
                    onChange={handleChange}
                    placeholder="Enter trek duration (e.g., 2-3 hours)"
                    className="w-full px-3 py-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-800 mb-2">
                  Historical Information
                </label>
                <textarea
                  name="history"
                  value={form.history}
                  onChange={handleChange}
                  placeholder="Enter historical information about the fort..."
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Location Information */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Location & Coordinates</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-2">
                    Latitude *
                  </label>
                  <input
                    type="number"
                    step="any"
                    name="location.lat"
                    value={form.location.lat}
                    onChange={handleChange}
                    placeholder="Enter latitude (e.g., 19.2183)"
                    className="w-full px-3 py-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-2">
                    Longitude *
                  </label>
                  <input
                    type="number"
                    step="any"
                    name="location.lng"
                    value={form.location.lng}
                    onChange={handleChange}
                    placeholder="Enter longitude (e.g., 73.8567)"
                    className="w-full px-3 py-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Transportation */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Nearest Transportation</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-2">
                    Nearest Railway Station
                  </label>
                  <input
                    type="text"
                    name="nearest.railway"
                    value={form.nearest.railway}
                    onChange={handleChange}
                    placeholder="Enter nearest railway station (e.g., Pune Junction - 60km)"
                    className="w-full px-3 py-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-2">
                    Nearest Bus Stop
                  </label>
                  <input
                    type="text"
                    name="nearest.bus"
                    value={form.nearest.bus}
                    onChange={handleChange}
                    placeholder="Enter nearest bus stop (e.g., Junnar Bus Stand - 8km)"
                    className="w-full px-3 py-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-2">
                    Nearest Airport
                  </label>
                  <input
                    type="text"
                    name="nearest.airport"
                    value={form.nearest.airport}
                    onChange={handleChange}
                    placeholder="Enter nearest airport (e.g., Pune Airport - 75km)"
                    className="w-full px-3 py-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Contact Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-2">
                    Local Guides
                  </label>
                  <input
                    type="text"
                    name="contacts.guides"
                    value={form.contacts.guides}
                    onChange={handleChange}
                    placeholder="Enter guides info (e.g., Ramesh Patil:9876543210, Suresh Kumar:9123456789)"
                    className="w-full px-3 py-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">Format: Name:Phone, Name:Phone</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-2">
                    Local Drivers
                  </label>
                  <input
                    type="text"
                    name="contacts.drivers"
                    value={form.contacts.drivers}
                    onChange={handleChange}
                    placeholder="Enter drivers info (e.g., Ajay Sharma:9876543210, Vikram Singh:9123456789)"
                    className="w-full px-3 py-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">Format: Name:Phone, Name:Phone</p>
                </div>
              </div>
            </div>

            {/* Routes and Facilities */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Routes & Facilities</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-2">
                    Trekking Routes
                  </label>
                  <input
                    type="text"
                    name="routes"
                    value={form.routes}
                    onChange={handleChange}
                    placeholder="Enter route names (e.g., Main Route, Alternative Path, Rock Climbing Route)"
                    className="w-full px-3 py-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">Separate multiple routes with commas</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-2">
                    Entry Fee
                  </label>
                  <input
                    type="text"
                    name="entryFee"
                    value={form.entryFee}
                    onChange={handleChange}
                    placeholder="Enter entry fee (e.g., ₹50 per person, Free)"
                    className="w-full px-3 py-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-2">
                    Opening Hours
                  </label>
                  <input
                    type="text"
                    name="openingHours"
                    value={form.openingHours}
                    onChange={handleChange}
                    placeholder="Enter opening hours (e.g., 6:00 AM - 6:00 PM, 24 hours)"
                    className="w-full px-3 py-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-2">
                    Hotel Facilities
                  </label>
                  <input
                    type="text"
                    name="hotelFacility"
                    value={form.hotelFacility}
                    onChange={handleChange}
                    placeholder="Enter hotel facilities (e.g., Available in base village, None)"
                    className="w-full px-3 py-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-2">
                    Water Facilities
                  </label>
                  <input
                    type="text"
                    name="waterFacility"
                    value={form.waterFacility}
                    onChange={handleChange}
                    placeholder="Enter water facilities (e.g., Available at base, Carry your own)"
                    className="w-full px-3 py-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="campingAllowed"
                    checked={form.campingAllowed}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-500 rounded"
                  />
                  <label className="ml-2 text-sm font-medium text-gray-800">
                    Camping Allowed
                  </label>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Additional Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-2">
                    Safety Tips
                  </label>
                  <textarea
                    name="safetyTips"
                    value={form.safetyTips}
                    onChange={handleChange}
                    placeholder="Enter safety tips (e.g., Carry sufficient water, Wear proper trekking shoes, Start early in summer)"
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">Separate multiple tips with commas</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-2">
                    Special Attractions
                  </label>
                  <textarea
                    name="specialAttractions"
                    value={form.specialAttractions}
                    onChange={handleChange}
                    placeholder="Enter special attractions (e.g., Ancient temple, Panoramic view, Cave exploration, Rock formations)"
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">Separate multiple attractions with commas</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-2">
                    Nearby Forts
                  </label>
                  <input
                    type="text"
                    name="nearbyForts"
                    value={form.nearbyForts}
                    onChange={handleChange}
                    placeholder="Enter nearby forts (e.g., Naneghat, Chavand Fort, Lenyadri Caves)"
                    className="w-full px-3 py-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">Separate multiple forts with commas</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-2">
                    Image URLs
                  </label>
                  <textarea
                    name="images"
                    value={form.images}
                    onChange={handleChange}
                    placeholder="Enter image URLs (e.g., https://example.com/image1.jpg, https://example.com/image2.jpg)"
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">Separate multiple URLs with commas</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-2">
                    PDF Guide URL
                  </label>
                  <input
                    type="url"
                    name="pdfGuide"
                    value={form.pdfGuide}
                    onChange={handleChange}
                    placeholder="Enter PDF guide URL (e.g., https://example.com/fort-guide.pdf)"
                    className="w-full px-3 py-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4 pt-6">
              <button
                type="button"
                onClick={() => navigate("/manage-forts")}
                className="px-6 py-3 border border-gray-500 text-gray-800 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
              >
                {loading ? "Updating..." : "Update Fort"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}