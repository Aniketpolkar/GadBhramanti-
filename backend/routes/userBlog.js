// import express from "express";
// import Blog from "../models/blog.js";

// const router = express.Router();

// // Create blog
// router.post("/", async (req, res) => {
//     console.log("you are here")
//   try {
//     const { title, content } = req.body;
//     const blog = new Blog({ title, content });
//     await blog.save();
//     res.status(201).json({ message: "Blog saved successfully!" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Update blog
// router.put("/:id", async (req, res) => {
//   try {
//     const { title, content } = req.body;
//     const updatedBlog = await Blog.findByIdAndUpdate(
//       req.params.id,
//       { title, content },
//       { new: true }
//     );
//     res.json(updatedBlog);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// export default router;

import express from "express";
import Blog from "../models/blog.js";

const router = express.Router();

// Create blog
router.post("/", async (req, res) => {
  console.log("you are here");
  try {
    const { title, content } = req.body;
    const blog = new Blog({ title, content });
    await blog.save();
    res.status(201).json({ message: "Blog saved successfully!", blog });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all blogs
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 }); // newest first
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single blog by ID
router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// // Get single blog
// router.get("/:id", async (req, res) => {
//   try {
//     const blog = await Blog.findById(req.params.id);
//     if (!blog) return res.status(404).json({ error: "Blog not found" });
//     res.json(blog);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });


// Update blog
router.put("/:id", async (req, res) => {
  try {
    const { title, content } = req.body;
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );
    res.json(updatedBlog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
