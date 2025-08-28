import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
});

const nearestSchema = new mongoose.Schema({
  railway: String,
  bus: String,
  airport: String,
});

const locationSchema = new mongoose.Schema({
  lat: {
    type: Number,
    required: true,
  },
  lng: {
    type: Number,
    required: true,
  },
});

const fortSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  region: {
    type: String,
    trim: true,
  },
  history: {
    type: String,
    trim: true,
  },
  difficulty: {
    type: String,
    trim: true,
  },
  bestSeason: {
    type: String,
    trim: true,
  },
  trekDuration: {
    type: String,
    trim: true,
  },
  nearest: nearestSchema,
  contacts: {
    guides: [contactSchema],
    drivers: [contactSchema],
  },
  location: locationSchema,
  images: [String],
  pdfGuide: {
    type: String,
    trim: true,
  },
});

export default mongoose.model("Fort", fortSchema,'fort');
