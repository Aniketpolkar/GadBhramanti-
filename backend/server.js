import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import authRoutes from './routes/userAuth.js';
import userRoutes from './routes/users.js';
import fortRoutes from './routes/userForts.js';
import adminAuthRoutes  from './routes/adminAuth.js';
import adminFortRoutes from './routes/adminForts.js';
import adminFortCommentRoutes from './routes/adminComments.js'
import userBlogRoutes from './routes/userBlog.js'
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
// app.use(cors());
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));

app.use(express.json());
// , { useNewUrlParser: true, useUnifiedTopology: true }
// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/forts', fortRoutes);
app.use('/admin', adminAuthRoutes );
app.use('/adminForts', adminFortRoutes);
app.use('/adminComments', adminFortCommentRoutes);
app.use('/blogs', userBlogRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
