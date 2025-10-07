// import { useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { AdminAuthContext } from "../context/AdminAuthContext";
// import axios from "axios";

// export default function AdminLogin() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const { loginAdmin } = useContext(AdminAuthContext);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       const res = await axios.post("http://localhost:5000/admin/login", {
//         email,
//         password,
//       });

//       loginAdmin(res.data.admin, res.data.token); // save in context
//       navigate("/dashboard"); // go to admin dashboard
//     } catch (err) {
//       setError(err.response?.data?.message || "Login failed");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-lg">
//         <h2 className="text-2xl font-bold text-center mb-6">Admin Login</h2>

//         {error && (
//           <div className="mb-4 text-red-600 text-sm text-center">{error}</div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Email
//             </label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Password
//             </label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
//           >
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AdminAuthContext } from "../context/AdminAuthContext";
import { loginAdminApi } from "../api/adminApi"; // ✅ use your API file

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { loginAdmin } = useContext(AdminAuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    try {
      const res = await loginAdminApi({ email, password }); // ✅ call API function
      loginAdmin(res.data.admin, res.data.token); // save admin + token in context
      navigate("/admin-dashboard"); // ✅ route to admin dashboard
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[83vh] bg-gray-400">
      <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Admin Login</h2>

        {error && (
          <div className="mb-4 text-red-600 text-sm text-center">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
