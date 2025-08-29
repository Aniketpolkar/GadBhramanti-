import mongoose from "mongoose";

const routeSchema = new mongoose.Schema({
  fortId: { type: mongoose.Schema.Types.ObjectId, ref: "Fort", required: true },
  name: { type: String, required: true },
  difficulty: { type: String, enum: ["Easy", "Moderate", "Hard"], default: "Moderate" },
  // GeoJSON LineString: [ [lng, lat], [lng, lat], ... ]
  geometry: {
    type: { type: String, enum: ["LineString"], required: true, default: "LineString" },
    coordinates: { type: [[Number]], required: true }, // [[lng, lat], [lng, lat], ...]
  },
  lengthKm: Number,
  gpxUrl: String,
}, { timestamps: true });

routeSchema.index({ geometry: "2dsphere" });

export default mongoose.model("Route", routeSchema, "route");
