    // models/Admin.js
    import mongoose from "mongoose";

    const AdminSchema = new mongoose.Schema({
    username: { type: String, required: true },
    image: { type: String },
    email: { type: String, required: true, unique: true, lowercase: true },
    passwordHash: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    lastLogin: Date
    });

    export default mongoose.model("Admin", AdminSchema);
