// import express from 'express';
// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
// import User from '../models/user.js';

// const router = express.Router();
// const JWT_SECRET_USER = process.env.JWT_SECRET_USER || 'your_jwt_secret';

// // -------- Register --------
// router.post('/register', async (req, res) => {
//   try {
//     const { username, email, password,bio,city,profilePic } = req.body;

//     const existingUser = await User.findOne({ email });
//     if (existingUser) return res.status(400).json({ message: 'Email already registered' });

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = new User({ username, email, password: hashedPassword ,bio,city,profilePic});
//     await user.save();

//     res.status(201).json({ message: 'User registered successfully' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // -------- Login --------
// router.post('/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ message: 'Invalid credentials' });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

//     const token = jwt.sign({ id: user._id,type: 'user' }, JWT_SECRET_USER, { expiresIn: '1d' });

//     res.json({
//       token,
//       user: { id: user._id, username: user.username, email: user.email }
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// export default router;


// routes/userAuth.js
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const router = express.Router();
const JWT_SECRET_USER = process.env.JWT_SECRET_USER || 'your_jwt_secret';

// -------- Register --------
router.post('/register', async (req, res) => {
  try {
    const { username, email, password, bio, city, profilePic } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = new User({
      username,
      email,
      password: hashedPassword,
      bio,
      city,
      profilePic
    });

    await user.save();

    return res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (err) {
    console.error('User register error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
});

// // -------- Login --------
// router.post('/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Find user
//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ message: 'Invalid credentials' });

//     // Compare password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

//     // // Create JWT token with type 'user'
//     // const token = jwt.sign(
//     //   { id: user._id, type: 'user' },
//     //   JWT_SECRET_USER,
//     //   { expiresIn: '1d' }
//     // );

//     const decoded = jwt.verify(token, JWT_SECRET_USER);
// if (decoded.type !== "user") return res.status(403).json({ message: "Users only" });
// req.user = { id: decoded.id }; // attach id
// next();

//     // Return token in JSON response
//     return res.json({
//       message: 'Login successful',
//       token,
//       user: {
//         id: user._id,
//         username: user.username,
//         email: user.email
//       }
//     });
//   } catch (err) {
//     console.error('User login error:', err);
//     return res.status(500).json({ message: 'Server error' });
//   }
// });

// -------- Login --------
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    // Compare password (plain entered vs hashed from DB)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // ✅ Create JWT token with type 'user'
    const token = jwt.sign(
      { id: user._id, type: 'user' },
      JWT_SECRET_USER,
      { expiresIn: '1d' }
    );

    // ✅ Return token and user info
    return res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (err) {
    console.error('User login error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
});


export default router;
