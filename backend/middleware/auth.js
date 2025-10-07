// import jwt from 'jsonwebtoken';

// const JWT_SECRET_USER = process.env.JWT_SECRET_USER || 'your_jwt_secret';

// // 1. Define verifyToken
// const verifyToken = (req, res, next) => {
//   const token = req.headers["authorization"]?.split(" ")[1]; // Bearer <token>
//   if (!token) return res.status(403).json({ message: "No token provided" });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET_USER);
//     req.user = decoded; // attach user data from token
//     next();
//   } catch (err) {
//     res.status(401).json({ message: "Invalid token" });
//   }
// };

// const authMiddleware = (req, res, next) => {
//   const authHeader = req.headers['authorization'];
//   if (!authHeader) return res.status(401).json({ message: 'Authorization header missing' });

//   const token = authHeader.split(' ')[1]; // Bearer <token>
//   if (!token) return res.status(401).json({ message: 'Token missing' });

//   try {
//     const decoded = jwt.verify(token, JWT_SECRET_USER);
//     req.user = decoded;
//     next();
//   } catch (err) {
//     return res.status(401).json({ message: 'Invalid token' });
//   }
// };
// // 3. Export them properly
// export { verifyToken, authMiddleware };

// middleware/isUser.js
import jwt from "jsonwebtoken";

const JWT_SECRET_USER = process.env.JWT_SECRET_USER || "your_jwt_secret";

// Middleware to verify user token
const verifyUserToken = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Authorization header missing or invalid" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Token missing" });

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET_USER);

    // Ensure it's a user token
    if (decoded.type !== "user") {
      return res.status(403).json({ message: "Users only" });
    }

    req.user = decoded; // attach user payload
    next();
  } catch (err) {
    console.error("User token verification error:", err);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default verifyUserToken;
