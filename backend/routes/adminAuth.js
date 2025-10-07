// routes/adminAuth.js
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Admin from "../models/admin.js";

const router = express.Router();
const JWT_SECRET_ADMIN = process.env.JWT_SECRET_ADMIN;

// -------- Admin Register --------
router.post("/register", async (req, res) => {
  try {
    const { username, email, password ,image} = req.body;

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new admin
    const newAdmin = new Admin({
      username,
      email,
      passwordHash: hashedPassword,
      image,
    });
    await newAdmin.save();

    // Create JWT token with type 'admin'
    const token = jwt.sign(
      { adminId: newAdmin._id, type: "admin" },  // ✅ payload
       process.env.JWT_SECRET_ADMIN,                           // ✅ admin secret
      { expiresIn: "1h" }
    );

    // Send token in JSON response only (no cookies)
    return res.status(201).json({
      message: "Admin registered",
      token,
      admin: {
        id: newAdmin._id,
        username: newAdmin.username,
        email: newAdmin.email,
        image : newAdmin.image,
      },
    });
  } catch (err) {
    console.error("Admin register error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

// -------- Admin Login --------
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(401).json({ message: "Invalid email" });

    const isMatch = await bcrypt.compare(password, admin.passwordHash);
    if (!isMatch) return res.status(401).json({ message: "Invalid password" });

    // Create JWT token with type 'admin'
    const token = jwt.sign(
      { adminId: admin._id, type: "admin" },   // ✅ payload
      process.env.JWT_SECRET_ADMIN,                         // ✅ admin secret
      { expiresIn: "1h" }
    );

    // Update last login
    admin.lastLogin = new Date();
    await admin.save();

    // Send token in JSON response only
    // return res.json({
    //   message: "Login successful",
    //   token,
    //   admin: {
    //     id: admin._id,
    //     username: admin.username,
    //     email: admin.email,
    //   },
    // });
    res.json({ token, admin: { id: admin._id, username: admin.username, email: admin.email,image:admin.image } });
  } catch (err) {
    console.error("Admin login error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

export default router;
