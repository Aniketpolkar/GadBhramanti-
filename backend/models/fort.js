// 1 
// import mongoose from "mongoose";

// const commentSchema = new mongoose.Schema({
//   user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   text: { type: String, required: true },
//   createdAt: { type: Date, default: Date.now }
// });


// const contactSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   phone: {
//     type: String,
//     required: true,
//     trim: true,
//   },
// });

// const nearestSchema = new mongoose.Schema({
//   railway: String,
//   bus: String,
//   airport: String,
// });

// const locationSchema = new mongoose.Schema({
//   lat: {
//     type: Number,
//     required: true,
//   },
//   lng: {
//     type: Number,
//     required: true,
//   },
// });

// const fortSchema = new mongoose.Schema({
//   id: {
//     type: Number,
//     required: true,
//     unique: true,
//   },
//   name: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   region: {
//     type: String,
//     trim: true,
//   },
//   history: {
//     type: String,
//     trim: true,
//   },
//   difficulty: {
//     type: String,
//     trim: true,
//   },
//   bestSeason: {
//     type: String,
//     trim: true,
//   },
//   trekDuration: {
//     type: String,
//     trim: true,
//   },
//   nearest: nearestSchema,
//   contacts: {
//     guides: [contactSchema],
//     drivers: [contactSchema],
//   },
//   location: locationSchema,
//   images: [String],
//   pdfGuide: {
//     type: String,
//     trim: true,
//   },
//     comments: [commentSchema]  ,
// });

// export default mongoose.model("Fort", fortSchema,'fort');


// 2

// import mongoose from "mongoose";

// const commentSchema = new mongoose.Schema({
//   user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   text: { type: String, required: true },
//   createdAt: { type: Date, default: Date.now }
// });

// const contactSchema = new mongoose.Schema({
//   name: { type: String, required: true, trim: true },
//   phone: { type: String, required: true, trim: true },
// });

// const nearestSchema = new mongoose.Schema({
//   railway: String,
//   bus: String,
//   airport: String,
// });

// const locationSchema = new mongoose.Schema({
//   lat: { type: Number, required: true },
//   lng: { type: Number, required: true },
// });

// const routeSchema = new mongoose.Schema({
//   name: String,
//   lengthKm: Number,
//   difficulty: String,
// });

// const fortSchema = new mongoose.Schema({
//   id: { type: Number, required: true, unique: true },
//   name: { type: String, required: true, trim: true },
//   region: { type: String, trim: true },
//   history: { type: String, trim: true },
//   altitude: { type: Number }, // in meters/feet
//   baseVillage: { type: String, trim: true },
//   difficulty: { type: String, trim: true },
//   bestSeason: { type: String, trim: true },
//   trekDuration: { type: String, trim: true },
//   routes: [routeSchema],
//   nearest: nearestSchema,
//   contacts: {
//     guides: [contactSchema],
//     drivers: [contactSchema],
//   },
//   location: locationSchema,
//   images: [String],
//   pdfGuide: { type: String, trim: true },
//   comments: [commentSchema],

//   // 🔹 New fields
//   entryFee: { type: String, trim: true }, // string to handle seasonal/varied fees
//   openingHours: { type: String, trim: true }, // "6am–6pm"
//   campingAllowed: { type: Boolean, default: false },
//   safetyTips: [String],
//   specialAttractions: [String], // temples, caves, viewpoints
//   nearbyForts: [String],
//   hotelFacility: { type: String, trim: true },
//   waterFacility: { type: String, trim: true },
// });

// export default mongoose.model("Fort", fortSchema, "fort");


import mongoose from "mongoose";

// Comment schema
const commentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Contact schema (guides/drivers)
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  phone: { type: String, required: true, trim: true },
});

// Nearest transport schema
const nearestSchema = new mongoose.Schema({
  railway: String,
  bus: String,
  airport: String,
});

// Location schema
const locationSchema = new mongoose.Schema({
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
});

// Route schema for multiple trekking routes
const routeSchema = new mongoose.Schema({
  name: String,
  lengthKm: Number,
  difficulty: String,
});

// Main Fort schema
const fortSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true, trim: true },
  region: { type: String, trim: true },
  history: { type: String, trim: true },
  altitude: { type: Number }, // meters/feet
  baseVillage: { type: String, trim: true },
  difficulty: { type: String, trim: true },
  bestSeason: { type: String, trim: true },
  trekDuration: { type: String, trim: true },
  routes: [routeSchema],
  nearest: nearestSchema,
  contacts: {
    guides: [contactSchema],
    drivers: [contactSchema],
  },
  location: locationSchema,
  images: [String],
  pdfGuide: { type: String, trim: true },
  comments: [commentSchema],
   likes: { type: Number, default: 0 },         // total likes
   likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  visitedCount: { type: Number, default: 0 }, // total visited
 visitedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // ✅ NEW
  // Additional traveler-friendly fields
  entryFee: { type: String, trim: true }, // can handle seasonal or varied fees
  openingHours: { type: String, trim: true }, // e.g., "6am–6pm"
  campingAllowed: { type: Boolean, default: false },
  safetyTips: [String],
  specialAttractions: [String], // temples, caves, viewpoints
  nearbyForts: [String],
  hotelFacility: { type: String, trim: true },
  waterFacility: { type: String, trim: true },
});

export default mongoose.model("Fort", fortSchema, "fort");
