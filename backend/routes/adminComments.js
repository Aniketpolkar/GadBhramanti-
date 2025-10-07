// routes/adminComments.js
import express from "express";
import Fort from "../models/fort.js";
import isAdmin from "../middleware/isAdmin.js";

const router = express.Router();
router.use(isAdmin);

// router.get("/", async (req, res) => {
//   // Aggregate all forts with their comments
//   const forts = await Fort.find().select("name comments");
//   res.json(forts);
// });
router.get("/", async (req, res) => {
  console.log("hello")
  const forts = await Fort.find()
    .select("name region images comments")
    .populate("comments.user", "username profilePic"); // ✅ add this
  res.json(forts);
});


// routes/adminComments.js
router.delete("/:fortId/comments/:commentId", async (req, res) => {
  const { fortId, commentId } = req.params;

  const fort = await Fort.findByIdAndUpdate(
    fortId,
    { $pull: { comments: { _id: commentId } } }, // remove comment by id
    { new: true }
  );

  if (!fort) return res.status(404).json({ message: "Fort not found" });
  res.json({ message: "Comment deleted", fort });
});


// Add comment
router.post("/:fortId/comments", async (req, res) => {
  const { fortId } = req.params;
  const { text, userId } = req.body;

  const fort = await Fort.findById(fortId);
  if (!fort) return res.status(404).json({ message: "Fort not found" });

  const comment = { user: userId, text };
  fort.comments.push(comment);
  await fort.save();

  res.json({ message: "Comment added", fort });
});

// Update comment
router.put("/:fortId/comments/:commentId", async (req, res) => {
  const { fortId, commentId } = req.params;
  const { text } = req.body;

  const fort = await Fort.findById(fortId);
  if (!fort) return res.status(404).json({ message: "Fort not found" });

  const comment = fort.comments.id(commentId);
  if (!comment) return res.status(404).json({ message: "Comment not found" });

  comment.text = text;
  await fort.save();

  res.json({ message: "Comment updated", fort });
});

export default router;
