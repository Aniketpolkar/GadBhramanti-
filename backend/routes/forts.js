

// import express from 'express';
// import Fort from '../models/fort.js';
// import { verifyToken, authMiddleware } from '../middleware/auth.js';
// import User from '../models/user.js';

// const router = express.Router();

// // GET all forts
// router.get('/', async (req, res) => {
//   try {
//     const forts = await Fort.find();
//     res.json(forts);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // GET single fort by ID with populated comments
// router.get('/:id', async (req, res) => {
//   try {
//     const fort = await Fort.findById(req.params.id)
//       .populate({ 
//         path: "comments.user", 
//         select: "username profilePic" 
//       });
    
//     if (!fort) return res.status(404).json({ message: 'Fort not found' });
//     res.json(fort);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // POST comment to fort
// router.post("/:fortId/comment", verifyToken, async (req, res) => {
//   try {
//     // 1. Find the fort by ID
//     const fort = await Fort.findById(req.params.fortId);
    
//     if (!fort) {
//       return res.status(404).json({ message: "Fort not found" });
//     }

//     // 2. Add new comment
//     fort.comments.push({ 
//       user: req.user.id, 
//       text: req.body.text,
//       createdAt: new Date() // Optional: add timestamp
//     });
    
//     // 3. Save the fort
//     await fort.save();

//     // 4. Fetch the updated fort with populated user data
//     const updatedFort = await Fort.findById(req.params.fortId)
//       .populate({ 
//         path: "comments.user", 
//         select: "username profilePic" 
//       });

//     // 5. Return the updated fort
//     res.json(updatedFort);

//   } catch (err) {
//     console.error("Error adding comment:", err);
//     res.status(500).json({ error: err.message });
//   }
// });

// // GET comments for a specific fort (alternative endpoint)
// router.get("/:fortId/comments", async (req, res) => {
//   try {
//     const fort = await Fort.findById(req.params.fortId)
//       .populate({ 
//         path: "comments.user", 
//         select: "username profilePic" 
//       })
//       .select('comments');
    
//     if (!fort) {
//       return res.status(404).json({ message: "Fort not found" });
//     }

//     res.json(fort.comments);
//   } catch (err) {
//     console.error("Error fetching comments:", err);
//     res.status(500).json({ error: err.message });
//   }
// });

// // DELETE comment (optional - for comment management)
// router.delete("/:fortId/comment/:commentId", verifyToken, async (req, res) => {
//   try {
//     const fort = await Fort.findById(req.params.fortId);
    
//     if (!fort) {
//       return res.status(404).json({ message: "Fort not found" });
//     }

//     // Find the comment
//     const comment = fort.comments.id(req.params.commentId);
    
//     if (!comment) {
//       return res.status(404).json({ message: "Comment not found" });
//     }

//     // Check if user owns the comment or is admin
//     if (comment.user.toString() !== req.user.id) {
//       return res.status(403).json({ message: "Not authorized to delete this comment" });
//     }

//     // Remove the comment
//     comment.remove();
//     await fort.save();

//     // Return updated fort with populated comments
//     const updatedFort = await Fort.findById(req.params.fortId)
//       .populate({ 
//         path: "comments.user", 
//         select: "username profilePic" 
//       });

//     res.json(updatedFort);

//   } catch (err) {
//     console.error("Error deleting comment:", err);
//     res.status(500).json({ error: err.message });
//   }
// });

// export default router;

import express from 'express';
import Fort from '../models/fort.js';
import { verifyToken, authMiddleware } from '../middleware/auth.js';
import User from '../models/user.js';
import Route from '../models/route.js';
const router = express.Router();

// GET all forts
router.get('/', async (req, res) => {
  try {
    const forts = await Fort.find();
    res.json(forts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single fort by ID with populated comments
router.get('/:id', async (req, res) => {
  try {
    const fort = await Fort.findById(req.params.id)
      .populate({ 
        path: "comments.user", 
        select: "username profilePic bio city createdAt" 
      });
    
    if (!fort) return res.status(404).json({ message: 'Fort not found' });
    res.json(fort);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET routes for a fort
router.get('/:id/routes', async (req, res) => {
  try {
    const routes = await Route.find({ fortId: req.params.id });
    res.json(routes);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// POST comment to fort
router.post("/:fortId/comment", verifyToken, async (req, res) => {
  try {
    // 1. Find the fort by ID
    const fort = await Fort.findById(req.params.fortId);
    
    if (!fort) {
      return res.status(404).json({ message: "Fort not found" });
    }

    // 2. Add new comment
    fort.comments.push({ 
      user: req.user.id, 
      text: req.body.text,
      createdAt: new Date() // Optional: add timestamp
    });
    
    // 3. Save the fort
    await fort.save();

    // 4. Fetch the updated fort with populated user data
    const updatedFort = await Fort.findById(req.params.fortId)
      .populate({ 
        path: "comments.user", 
        select: "username profilePic bio city createdAt" 
      });

    // 5. Return the updated fort
    res.json(updatedFort);

  } catch (err) {
    console.error("Error adding comment:", err);
    res.status(500).json({ error: err.message });
  }
});

// GET comments for a specific fort (alternative endpoint)
router.get("/:fortId/comments", async (req, res) => {
  try {
    const fort = await Fort.findById(req.params.fortId)
      .populate({ 
        path: "comments.user", 
        select: "username profilePic bio city createdAt" 
      })
      .select('comments');
    
    if (!fort) {
      return res.status(404).json({ message: "Fort not found" });
    }

    res.json(fort.comments);
  } catch (err) {
    console.error("Error fetching comments:", err);
    res.status(500).json({ error: err.message });
  }
});

// DELETE comment (optional - for comment management)
// router.delete("/:fortId/comment/:commentId", verifyToken, async (req, res) => {
//   try {
//     const fort = await Fort.findById(req.params.fortId);
    
//     if (!fort) {
//       return res.status(404).json({ message: "Fort not found" });
//     }

//     // Find the comment
//     const comment = fort.comments.id(req.params.commentId);
    
//     if (!comment) {
//       return res.status(404).json({ message: "Comment not found" });
//     }

//     // Check if user owns the comment or is admin
//     if (comment.user.toString() !== req.user.id) {
//       return res.status(403).json({ message: "Not authorized to delete this comment" });
//     }

//     // Remove the comment
//     comment.remove();
//     await fort.save();

//     // Return updated fort with populated comments
//     const updatedFort = await Fort.findById(req.params.fortId)
//       .populate({ 
//         path: "comments.user", 
//         select: "username profilePic bio city createdAt" 
//       });

//     res.json(updatedFort);

//   } catch (err) {
//     console.error("Error deleting comment:", err);
//     res.status(500).json({ error: err.message });
//   }
// });

export default router;