// import { AdminAuthContext } from "../context/AdminAuthContext";
// import { useContext, useState, useEffect } from "react";

// export default function AdminDashboard() {
//   const { admin } = useContext(AdminAuthContext);
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (admin) {
//       setProfile(admin);
//       setLoading(false);
//     }
//   }, [admin]);

//   if (loading || !profile) {
//     return (
//       <div className="flex justify-center items-center min-h-[83vh] text-lg text-gray-600">
//         Loading profile...
//       </div>
//     );
//   }

//   return (
//     <main className="p-8 bg-gray-100 min-h-[83vh]">
//       <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6">
//         <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome Admin</h1>

//         <ul className="grid grid-cols-1 sm:grid-cols-3 gap-6">
//          <li className="bg-green-100 text-green-800 rounded-xl p-4 shadow-sm">
//             <div className="font-semibold">Mail: {profile.email}</div>   
//             <div className="font-semibold">Username: {profile.username}</div>
//             <img
//               src={profile.image || "https://via.placeholder.com/150"}
//               alt="Admin"
//               className="w-50 h-50 rounded-full border-2 border-orange-500 object-cover"
//             />
//           </li>
         
//         </ul>
//       </div>
//     </main>
//   );
// }
import { AdminAuthContext } from "../context/AdminAuthContext";
import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  const { admin } = useContext(AdminAuthContext);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (admin) {
      console.log(admin);
      setProfile(admin);
      setLoading(false);
    }
  }, [admin]);

  if (loading || !profile) {
    return (
      <div className="flex justify-center items-center min-h-[83vh] text-lg text-gray-600">
        Loading profile...
      </div>
    );
  }

  return (
    <main className="p-8 bg-gray-400 shadow-violet-900 min-h-[83vh]">
      <div className="max-w-4xl mx-auto bg-purple-400 rounded-2xl shadow-fuchsia-600 p-8">
        {/* Heading */}
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Welcome, {profile.username}
        </h1>

        {/* Profile Section */}
        <div className="flex flex-col items-center space-y-4 mb-8">
          <img
            src={profile.image || "https://via.placeholder.com/150"}
            alt="Admin"
            className="w-42 h-42 rounded-full p-0.5 border-4 border-orange-500 shadow-md object-cover"
          />

          <div className="text-center space-y-2">
            <p className="text-lg font-medium text-gray-700">
              <span className="font-semibold text-gray-900">Email:</span>{" "}
              {profile.email}
            </p>
            <p className="text-lg font-medium text-gray-700">
              <span className="font-semibold text-gray-900">Username:</span>{" "}
              {profile.username}
            </p>
          </div>
        </div>

        {/* Quick Navigation Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Link
            to="/manage-forts"
            className="bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-xl p-6 text-center shadow-md transition"
          >
            <h2 className="text-xl font-semibold mb-2">Manage Forts</h2>
            <p className="text-sm">View, edit and delete forts.</p>
          </Link>

          <Link
            to="/manage-comments"
            className="bg-green-100 hover:bg-green-200 text-green-800 rounded-xl p-6 text-center shadow-md transition"
          >
            <h2 className="text-xl font-semibold mb-2">Manage Comments</h2>
            <p className="text-sm">Review and moderate user comments.</p>
          </Link>
        </div>
      </div>
    </main>
  );
}
