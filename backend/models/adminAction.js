// models/AdminAction.js
const AdminActionSchema = new mongoose.Schema({
  adminId: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
  action: String, // e.g., "DELETE_COMMENT"
  meta: Object, // whatever data: { commentId, fortId, ip }
  ip: String,
  createdAt: { type: Date, default: Date.now }
});
