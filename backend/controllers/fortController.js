// import Fort from "./models/Fort.js";
import Fort from '../models/fort.js';
import User from "../models/user.js";
// // ✅ Like toggle
// export const toggleLike = async (req, res) => {
//   try {
//     const fortId = req.params.id;
//     const userId = req.user.id;

//     const fort = await Fort.findById(fortId);
//     if (!fort) return res.status(404).json({ message: "Fort not found" });

//     const index = fort.likedBy.indexOf(userId);

//     if (index === -1) {
//       fort.likedBy.push(userId);
//       fort.likes += 1;
//     } else {
//       fort.likedBy.splice(index, 1);
//       fort.likes = Math.max(0, fort.likes - 1);
//     }

//     await fort.save();
//     res.json({ likes: fort.likes, likedBy: fort.likedBy });
//   } catch (err) {
//     res.status(500).json({ message: "Error toggling like", error: err.message });
//   }
// };

export const toggleLike = async (req, res) => {
  try {
    const fortId = req.params.id;
    const userId = req.user?.id; // from auth middleware

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: user not found" });
    }

    const fort = await Fort.findById(fortId);
    if (!fort) {
      return res.status(404).json({ message: "Fort not found" });
    }

    const index = fort.likedBy.indexOf(userId);

    if (index === -1) {
      fort.likedBy.push(userId);
      fort.likes += 1;
    } else {
      fort.likedBy.splice(index, 1);
      fort.likes = Math.max(0, fort.likes - 1);
    }

    await fort.save();
    res.json({ likes: fort.likes, likedBy: fort.likedBy });
  } catch (err) {
    console.error("❌ ToggleLike Error:", err); // 👈 add console
    res.status(500).json({ message: "Error toggling like", error: err.message });
  }
};


// ✅ Wishlist toggle
export const toggleWishlist = async (req, res) => {
  try {
    const fortId = req.params.id;
    const userId = req.user.id;

    const fort = await Fort.findById(fortId);
    if (!fort) return res.status(404).json({ message: "Fort not found" });

    const index = fort.wishlistBy.indexOf(userId);

    if (index === -1) {
      fort.wishlistBy.push(userId);
    } else {
      fort.wishlistBy.splice(index, 1);
    }

    await fort.save();
    res.json({ wishlistBy: fort.wishlistBy });
  } catch (err) {
    res.status(500).json({ message: "Error toggling wishlist", error: err.message });
  }
};

// // ✅ Visited toggle
// export const toggleVisited = async (req, res) => {
//   try {
//     const fortId = req.params.id;
//     const userId = req.user.id;

//     const fort = await Fort.findById(fortId);
//     if (!fort) return res.status(404).json({ message: "Fort not found" });

//     const index = fort.visitedBy.indexOf(userId);

//     if (index === -1) {
//       fort.visitedBy.push(userId);
//     } else {
//       fort.visitedBy.splice(index, 1);
//     }

//     await fort.save();
//     res.json({ visitedBy: fort.visitedBy });
//   } catch (err) {
//     res.status(500).json({ message: "Error toggling visited", error: err.message });
//   }
// };


// Toggle visited fort
export const toggleVisited = async (req, res) => {
  try {
    const fortId = req.params.id;
    const userId = req.user.id; // comes from auth middleware

    const fort = await Fort.findById(fortId);
    if (!fort) return res.status(404).json({ message: "Fort not found" });

    const visitedIndex = fort.visitedBy.indexOf(userId);

    if (visitedIndex === -1) {
      // if user has not visited → add
      fort.visitedBy.push(userId);
    } else {
      // if already visited → remove (toggle)
      fort.visitedBy.splice(visitedIndex, 1);
    }

    await fort.save();

    res.json({
      visitedCount: fort.visitedBy.length,
      visitedBy: fort.visitedBy,
    });
  } catch (err) {
    console.error("❌ Visited Error:", err);
    res.status(500).json({ message: "Error toggling visited", error: err.message });
  }
};