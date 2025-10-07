// routes/adminForts.js
import express from "express";
import isAdmin from "../middleware/isAdmin.js";
import Fort from "../models/fort.js";

const router = express.Router();

router.use(isAdmin);

router.get("/", async (req, res) => {
  
  const forts = await Fort.find().sort({ createdAt: -1 });
  res.json(forts);
});

router.post("/fort", async (req, res) => {   // 👈 match GET
    console.log("you are here")
  try {
    const newFort = await Fort.create(req.body);
    res.status(201).json(newFort);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


// GET /forts/:id -> get fort by ID
router.get("/forts/:id", async (req, res) => {
  const { id } = req.params;
  console.log("You reach at backend")

  try {
    const fort = await Fort.findById(id)
      .populate("comments.user", "username profilePic"); // populate user info in comments
    if (!fort) {
      return res.status(404).json({ message: "Fort not found" });
    }
    res.json(fort);
  } catch (error) {
    console.error("Error fetching fort by ID:", error);
    res.status(500).json({ message: "Server error" });
  }
});


// router.put("/:id", async (req, res) => {
//   const fort = await Fort.findByIdAndUpdate(req.params.id, req.body, { new: true });
//   res.json(fort);
// });
router.put("/forts/:id", async (req, res) => {
  
  try {
    const updatedFort = await Fort.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // returns updated document
    );
    if (!updatedFort) {
      return res.status(404).json({ message: "Fort not found" });
    }
    res.json(updatedFort);
  } catch (err) {
    console.error("Error updating fort:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// router.delete("forts/:id", async (req, res) => {
//   await Fort.findByIdAndDelete(req.params.id);
//   res.json({ message: "Deleted" });
// });
router.delete("/forts/:id", async (req, res) => {
  try {
    const fort = await Fort.findByIdAndDelete(req.params.id);
    if (!fort) {
      return res.status(404).json({ message: "Fort not found" });
    }
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    console.error("Error deleting fort:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
