// src/pages/ManageComments.js
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminAuthContext } from "../context/AdminAuthContext";
import {
  getFortsCommentApi,
  deleteFortApi,
  updateFortApi,
  addCommentApi,
  updateCommentApi,
  deleteCommentApi,
} from "../api/adminApi";

export default function ManageComments() {
  const [forts, setForts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [profile,setProfile] = useState({});
  const {admin} = useContext(AdminAuthContext);



  // Comment states
  const [newCommentText, setNewCommentText] = useState({});
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editCommentText, setEditCommentText] = useState("");

  const navigate = useNavigate();

  // Fetch forts
  const fetchForts = async () => {
    try {
      setLoading(true);
      const res = await getFortsCommentApi();
      setForts(res.data);
    } catch {
      setError("Failed to load forts");
    } finally {
      setLoading(false);
    }
  };

  // Add comment (as Admin)
  const handleAddComment = async (fortId) => {
    const text = newCommentText[fortId]?.trim();
    if (!text) return;

const ADMIN_ID = "68b33cd9d580528e7e14ea0b";
    try {
      await addCommentApi(fortId, {
        text,
        userId: admin.id, // explicitly mark as admin
      });
      setNewCommentText({ ...newCommentText, [fortId]: "" });
      fetchForts();
    } catch {
      setError("Failed to add comment");
    }
  };

  useEffect(() => {
  fetchForts();
  setProfile(admin);
  console.log("this is admin",admin);
}, []);

  // Edit comment
  const handleUpdateComment = async (fortId, commentId) => {
    if (!editCommentText.trim()) return;

    try {
      await updateCommentApi(fortId, commentId, { text: editCommentText });
      setEditingCommentId(null);
      setEditCommentText("");
      fetchForts();
    } catch {
      setError("Failed to update comment");
    }
  };

  // Delete comment
  const handleDeleteComment = async (fortId, commentId) => {
    try {
      await deleteCommentApi(fortId, commentId);
      fetchForts();
    } catch {
      setError("Failed to delete comment");
    }
  };
  
//   forts.map(fort => {
//   console.log("Fort:", fort);
//   console.log("Images:", fort.images);
//   console.log("Comments:", fort.comments);
//   return null;
// });

  return (
    <div className="min-h-[83vh] flex flex-col bg-gray-100">
      <main className="flex-1 max-w-8xl mx-auto p-5">
        <h1 className="text-3xl flex justify-center items-center font-bold mb-6 text-orange-700">
          Manage Comments (Admin)
        </h1>

        {error && <p className="text-red-600 mb-4">{error}</p>}

        {loading ? (
          <p>Loading forts...</p>
        ) : forts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {forts.map((fort) => (
              <div
                key={fort._id}
                className="bg-white rounded-lg shadow-md p-4 flex flex-col"
              >
                {/* Fort Info */}
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {fort.name} 
                </h2>
                
                {fort.region && (
                  <p className="text-sm text-gray-600 mb-3">
                    <span className="font-medium">Region:</span> {fort.region}
                  </p>
                )}



                  {fort.images?.[0] && (
                      <img
                        src={fort.images[0]}
                        alt={fort.name}
                        className="w-full h-40 object-cover rounded-md mb-3"
                      />
                    )}

                {/* Comments List */}
                <div className="space-y-4 mb-4">
                  {fort.comments?.length > 0 ? (
                    fort.comments.map((c) => (
                      <div
                        key={c._id}
                        className="bg-gray-50 p-3 rounded-lg shadow-sm border border-gray-200"
                      >
                        <div className="flex items-start space-x-3">
                          <img
                            src={
                              c.user?.profilePic ||
                              "https://res.cloudinary.com/dle4nbom5/image/upload/v1756580384/Rajgad_Fort_is_Blooming_02.10.2024...._rajgad_rajgadfort_lonavala_khandala_pune_mumbai_kwax1s.jpg"
                            }
                            alt={c.user?.username || "Admin"}
                            className="h-10 w-10 rounded-full object-cover border-2 border-orange-500"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-orange-600">
                                {c.user?.username || <span className="flex mr-13 items-center justify-around"><span className="text-xl text-amber-800">Admin</span><img className="h-7 p-1" src="https://cdn-icons-png.flaticon.com/128/4315/4315445.png"/></span> }
                              </span>
                              <span className="text-xs text-gray-500">
                                {new Date(c.createdAt).toLocaleDateString(
                                  "en-GB",
                                  {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                  }
                                )}
                              </span>
                            </div>

                            {editingCommentId === c._id ? (
                              <div className="mt-2 flex gap-2">
                                <input
                                  value={editCommentText}
                                  onChange={(e) =>
                                    setEditCommentText(e.target.value)
                                  }
                                  className="flex-1 border rounded px-2 py-1"
                                />
                                <button
                                  onClick={() =>
                                    handleUpdateComment(fort._id, c._id)
                                  }
                                  className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                                >
                                  Save
                                </button>
                                <button
                                  onClick={() => setEditingCommentId(null)}
                                  className="px-3 py-1 bg-gray-400 text-white rounded hover:bg-gray-500"
                                >
                                  Cancel
                                </button>
                              </div>
                            ) : (
                              <>
                                <p className="mt-1 text-gray-700">{c.text}</p>
                                <div className="flex gap-4 mt-2 text-sm">
                                  <button
                                    onClick={() => {
                                      setEditingCommentId(c._id);
                                      setEditCommentText(c.text);
                                    }}
                                    // className="text-yellow-600 bg-red-500 hover:underline"
                                      className="px-2 py-1 rounded bg-yellow-400 text-white hover:bg-yellow-600"

                                  >
                                    Edit
                                  </button>
                                  <button
                                    onClick={() =>
                                      handleDeleteComment(fort._id, c._id)
                                    }
                                    // className="text-red-600 hover:underline"
                                    className="px-2 py-1 rounded bg-red-400 text-white hover:bg-red-400"
                                  >
                                    Delete
                                  </button>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center">
                      No comments yet.
                    </p>
                  )}
                </div>

                {/* Add Comment (Admin) */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Write a comment as Admin..."
                    value={newCommentText[fort._id] || ""}
                    onChange={(e) =>
                      setNewCommentText({
                        ...newCommentText,
                        [fort._id]: e.target.value,
                      })
                    }
                    className="flex-1 border rounded px-2 py-1"
                  />
                  <button
                    onClick={() => handleAddComment(fort._id)}
                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Add
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No forts found.</p>
          
        )}
      </main>
    </div>
  );
}
