// // src/pages/Register.jsx
// import { useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { AdminAuthContext  } from "../context/AdminAuthContext";
// import { registerAdminApi } from "../api/adminApi"; // ✅ use API service

// const Register = () => {
//   const { loginAdmin } = useContext(AdminAuthContext);
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     username: "",
//     email: "",
//     password: "",
//   });
//   const [error, setError] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   const handleChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError("");

//     try {
//       const res = await registerAdminApi(form); // ✅ call service
//       // Option A: Redirect to login page
//       // navigate("/login");

//       // Option B: Auto-login user after register
//       const { user, token } = res.data;
//       loginAdmin(user, token); // ✅ update context
//       navigate("/admin-dashboard"); // redirect to homepage/dashboard
//     } catch (err) {
//       setError(err.response?.data?.message || "Error occurred");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="register-container">
//       <h1>User Register</h1>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           name="username"
//           placeholder="Username"
//           value={form.username}
//           onChange={handleChange}
//           required
//         />

//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={form.email}
//           onChange={handleChange}
//           required
//         />

//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={form.password}
//           onChange={handleChange}
//           required
//         />

//         <button type="submit" disabled={isLoading}>
//           {isLoading ? "Registering..." : "Register"}
//         </button>

//         {error && <p className="error">{error}</p>}
//       </form>
//     </div>
//   );
// };

// export default Register;



// src/pages/Register.jsx
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AdminAuthContext } from "../context/AdminAuthContext";
import { registerAdminApi } from "../api/adminApi"; // ✅ use API service

const Register = () => {
  const { loginAdmin } = useContext(AdminAuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    image:"",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    try {
      const res = await registerAdminApi(form);
      const { admin, token } = res.data;
      loginAdmin(admin, token);
      navigate("/admin-dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[83vh] flex items-center justify-center bg-gray-400">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-orange-400 mb-6">
          Admin Register
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <input
            type="text"
            name="image"
            placeholder="imageUrl"
            value={form.image}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
          />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-orange-600 text-white py-2 rounded-lg font-semibold hover:bg-orange-700 transition disabled:opacity-50"
          >
            {isLoading ? "Registering..." : "Register"}
          </button>

          {error && (
            <p className="text-red-400 text-center font-medium">{error}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Register;
