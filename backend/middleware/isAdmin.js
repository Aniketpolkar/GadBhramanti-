// middleware/isAdmin.js
import jwt from "jsonwebtoken";
import Admin from "../models/admin.js";

export default async function isAdmin(req, res, next) {

  try {
    // Read token from cookie first (if using cookies)
    console.log("step 1")
    const token = req.cookies?.adminToken || (
      req.headers.authorization?.split(" ")[1] || null
    );
    console.log("Token:", token);
    console.log("step 2")
        console.log("Incoming token:", token);
            if(token){
                const decoded = jwt.decode(token);
                console.log("Decoded token without verification:", decoded);
            }
    
    if (!token) return res.status(401).json({ message: "Not authenticated" });
        console.log("step 3")

    const payload = jwt.verify(token, process.env.JWT_SECRET_ADMIN);
    console.log("Decoded payload:", payload);
    console.log("step 4")
    if (payload.type !== "admin") {
        console.log("payload type is not admin",payload.type)
      return res.status(403).json({ message: "Admins only" });
    }
        console.log("step 5")

    const admin = await Admin.findById(payload.adminId).select("-passwordHash");
    if (!admin) return res.status(401).json({ message: "Invalid admin" });

    req.admin = admin; // attach admin to request
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}
