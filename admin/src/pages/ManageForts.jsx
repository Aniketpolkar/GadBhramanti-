// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { getFortsApi, deleteFortApi, updateFortApi } from "../api/adminApi";

// export default function ManageForts() {
//   const [forts, setForts] = useState([]);
//   const [editingId, setEditingId] = useState(null);
//   const [editName, setEditName] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const navigate = useNavigate();

//   const fetchForts = async () => {
//     try {
//       setLoading(true);
//       const res = await getFortsApi();
//       setForts(res.data);
//     } catch (err) {
//       setError("Failed to load forts");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDeleteFort = async (id) => {
//     try {
//       await deleteFortApi(id);
//       fetchForts();
//     } catch {
//       setError("Failed to delete fort");
//     }
//   };

//   const handleEditFort = (fort) => {
//     setEditingId(fort._id);
//     setEditName(fort.name);
//   };

//   const handleUpdateFort = async (id) => {
//     if (!editName.trim()) return;
//     try {
//       await updateFortApi(id, { name: editName });
//       setEditingId(null);
//       setEditName("");
//       fetchForts();
//     } catch {
//       setError("Failed to update fort");
//     }
//   };

//   useEffect(() => {
//     fetchForts();
//   }, []);

//   return (
//     <div className="min-h-[83vh] flex flex-col bg-gray-100">
//       <main className="flex-1 max-w-6xl mx-auto p-6">
//         <h1 className="text-3xl font-bold mb-6 text-gray-800">Manage Forts</h1>

//         {error && <p className="text-red-600 mb-4">{error}</p>}

//         {/* Add Fort */}
//         <div className="flex justify-end mb-6">
//           <button
//             onClick={() => navigate("/add-fort")}
//             className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//           >
//             + Add New Fort
//           </button>
//         </div>

//         {/* Forts Grid */}
//         {loading ? (
//           <p>Loading forts...</p>
//         ) : forts.length > 0 ? (
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {forts.map((fort) => (
//               <div
//                 key={fort._id}
//                 className="bg-white rounded-lg shadow-md p-4 flex flex-col"
//               >
//                 {editingId === fort._id ? (
//                   <div className="flex flex-col gap-2">
//                     <input
//                       value={editName}
//                       onChange={(e) => setEditName(e.target.value)}
//                       className="px-2 py-1 border rounded"
//                     />
//                     <div className="flex gap-2">
//                       <button
//                         onClick={() => handleUpdateFort(fort._id)}
//                         className="flex-1 px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700"
//                       >
//                         Save
//                       </button>
//                       <button
//                         onClick={() => setEditingId(null)}
//                         className="flex-1 px-3 py-1 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
//                       >
//                         Cancel
//                       </button>
//                     </div>
//                   </div>
//                 ) : (
//                   <>
//                     {/* Fort Image */}
//                     {fort.images?.[0] && (
//                       <img
//                         src={fort.images[0]}
//                         alt={fort.name}
//                         className="w-full h-40 object-cover rounded-md mb-3"
//                       />
//                     )}

//                     {/* Fort Info */}
//                     <h2 className="text-xl font-semibold text-gray-800 mb-2">
//                       {fort.name}
//                     </h2>
//                     <div className="text-sm text-gray-600 space-y-1 flex-1">
//                       {fort.region && <p><span className="font-medium">Region:</span> {fort.region}</p>}
//                       {fort.altitude && <p><span className="font-medium">Altitude:</span> {fort.altitude} m</p>}
//                       {fort.baseVillage && <p><span className="font-medium">Base Village:</span> {fort.baseVillage}</p>}
//                       {fort.difficulty && <p><span className="font-medium">Difficulty:</span> {fort.difficulty}</p>}
//                       {fort.bestSeason && <p><span className="font-medium">Best Season:</span> {fort.bestSeason}</p>}
//                     </div>

//                     {/* Actions */}
//                     <div className="mt-4 flex gap-2">
//                       <button
//                         onClick={() => handleEditFort(fort)}
//                         className="flex-1 px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
//                       >
//                         Edit
//                       </button>
//                       <button
//                         onClick={() => handleDeleteFort(fort._id)}
//                         className="flex-1 px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700"
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   </>
//                 )}
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p className="text-gray-500">No forts found. Add one to get started!</p>
//         )}
//       </main>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getFortsApi, deleteFortApi, updateFortApi } from "../api/adminApi";
import AddFort from "./AddFort";
import EditFort from "./EditFort";

export default function ManageForts() {
  const [forts, setForts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const fetchForts = async () => {
    try {
      setLoading(true);
      const res = await getFortsApi();
      setForts(res.data);
    } catch (err) {
      setError("Failed to load forts");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteFort = async (id) => {
    try {
      await deleteFortApi(id);
      fetchForts();
    } catch {
      setError("Failed to delete fort");
    }
  };

  const handleEditFort = (fort) => {
    setEditingId(fort._id);
    setEditName(fort.name);
  };

  const handleUpdateFort = async (id) => {
    if (!editName.trim()) return;
    try {
      await updateFortApi(id, { name: editName });
      setEditingId(null);
      setEditName("");
      fetchForts();
    } catch {
      setError("Failed to update fort");
    }
  };

  useEffect(() => {
    fetchForts();
  }, []);

  return (
    <div className="min-h-[83vh] flex flex-col bg-gray-100">
      <main className="flex-1 max-w-15xl min-w-[90vw] mx-auto pl-1 pr-1">
        <h1 className="text-4xl flex justify-center items-center font-bold mb-0 mt-5 text-orange-800">Manage Forts (Admin)</h1>

        {error && <p className="text-red-600 mb-4">{error}</p>}

        {/* Add Fort */}
        <div className="flex justify-end mr-7 mb-6">
          <button
            onClick={() => navigate("/add-fort")}
            className="px-5 mr-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-800"
          >
            + Add New Fort
          </button>
        </div>

        {/* Forts Grid */}
        {loading ? (
          <p>Loading forts...</p>
        ) : forts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {forts.map((fort) => (
              <div
                key={fort._id}
                className="bg-white rounded-lg shadow-md p-4 flex flex-col"
              >
                {editingId === fort._id ? (
                  <div className="flex flex-col gap-2">
                    <input
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="px-2 py-1 border rounded"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleUpdateFort(fort._id)}
                        className="flex-1 px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="flex-1 px-3 py-1 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                  {/* Fort Info */}
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                      {fort.name}
                    </h2>

                    {/* Fort Image */}
                    {fort.images?.[0] && (
                      <img
                        src={fort.images[0]}
                        alt={fort.name}
                        className="w-full h-40 object-cover rounded-md mb-3"
                      />
                    )}

                    
                    <div className="text-base text-gray-600 space-y-1 flex-1">
                      {fort.region && (
                        <p>
                          <span className="font-medium">Region:</span>{" "}
                          {fort.region}
                        </p>
                      )}
                      {fort.altitude && (
                        <p>
                          <span className="font-medium">Altitude:</span>{" "}
                          {fort.altitude} m
                        </p>
                      )}
                      {fort.baseVillage && (
                        <p>
                          <span className="font-medium">Base Village:</span>{" "}
                          {fort.baseVillage}
                        </p>
                      )}
                      {fort.difficulty && (
                        <p>
                          <span className="font-medium">Difficulty:</span>{" "}
                          {fort.difficulty}
                        </p>
                      )}
                      {/* {fort.bestSeason && (
                        <p>
                          <span className="font-medium">Best Season:</span>{" "}
                          {fort.bestSeason}
                        </p>
                      )} */}
                    </div>

                    {/* Actions */}
                    <div className="mt-4 flex gap-2">
                      <button
                        onClick={() => handleEditFort(fort)}
                        className="flex-1 px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                      >
                        Quick Edit
                      </button>
                      {/* <button
                        onClick={() => <EditFort id={fort._id}/>}
                        className="flex-1 px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                      >
                        Edit Details
                      </button> */}
                      
<button
  onClick={() => navigate(`/edit-fort/${fort._id}`)}
  className="flex-1 px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
>
  Edit Details
</button>
                      <button
                        onClick={() => handleDeleteFort(fort._id)}
                        className="flex-1 px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">
            No forts found. Add one to get started!
          </p>
        )}
      </main>
    </div>
  );
}
