// import { useState, useContext } from 'react';
// import API from '../api/axios';
// import { useNavigate } from 'react-router-dom';
// import { AuthContext } from '../context/authcontext';

// const Register = () => {
//   const { loginUser } = useContext(AuthContext);
//   const navigate = useNavigate();

//   // include bio & profilePic in state
//   const [form, setForm] = useState({ 
//     username: '', 
//     email: '', 
//     password: '', 
//     bio: '', 
//     city:'',
//     profilePic: ''   // store Cloudinary URL or base64 for now
//   });
//   const [error, setError] = useState('');

//   const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async e => {
//     e.preventDefault();
//     try {
//       await API.post('/auth/register', form); // backend should accept bio + profilePic
//       navigate('/login');
//     } catch (err) {
//       setError(err.response?.data?.message || 'Error occurred');
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow w-80">
//         <h2 className="text-2xl mb-4 text-center">Register</h2>
//         {error && <p className="text-red-500 mb-2">{error}</p>}

//         <input 
//           name="username" 
//           placeholder="Username" 
//           value={form.username} 
//           onChange={handleChange} 
//           className="w-full mb-2 p-2 border rounded" 
//         />

//         <input 
//           name="email" 
//           placeholder="Email" 
//           value={form.email} 
//           onChange={handleChange} 
//           className="w-full mb-2 p-2 border rounded" 
//         />

//         <input 
//           type="password" 
//           name="password" 
//           placeholder="Password" 
//           value={form.password} 
//           onChange={handleChange} 
//           className="w-full mb-2 p-2 border rounded" 
//         />

//         <textarea 
//           name="bio" 
//           type="text"
//           placeholder="Write a short bio..." 
//           value={form.bio} 
//           onChange={handleChange} 
//           className="w-full mb-2 p-2 border rounded"
//         />

//         <input 
//           type="text" 
//           name="city" 
//           placeholder="Your city" 
//           value={form.city} 
//           onChange={handleChange} 
//           className="w-full mb-4 p-2 border rounded" 
//         />

//         <input 
//           type="text" 
//           name="profilePic" 
//           placeholder="Profile Picture URL" 
//           value={form.profilePic} 
//           onChange={handleChange} 
//           className="w-full mb-4 p-2 border rounded" 
//         />

//         <button 
//           type="submit" 
//           className="w-full bg-orange-500 text-white py-2 rounded"
//         >
//           Register
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Register;



import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import API from "../api/axios";
import { User, Mail, Lock, MapPin, Image as ImageIcon, AlertCircle, ArrowRight } from "lucide-react";

const Register = () => {
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    bio: "",
    city: "",
    profilePic: "",
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
      await API.post("/auth/register", form);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-slate-100 flex items-center justify-center p-4">
      {/* Background circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-orange-100 opacity-20"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-slate-200 opacity-20"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-500 rounded-full mb-4">
            <div className="text-white font-bold text-xl">FT</div>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Create an Account
          </h1>
          <p className="text-gray-600">Join Fort Travel today</p>
        </div>

        {/* Register Form */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <form onSubmit={handleSubmit} className="p-8">
            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            {/* Username */}
            <div className="mb-5">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  required
                  placeholder="Enter your username"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white"
                />
              </div>
            </div>

            {/* Email */}
            <div className="mb-5">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white"
                />
              </div>
            </div>

            {/* Password */}
            <div className="mb-5">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white"
                />
              </div>
            </div>

            {/* Bio */}
            <div className="mb-5">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Bio
              </label>
              <textarea
                name="bio"
                value={form.bio}
                onChange={handleChange}
                rows={3}
                placeholder="Write a short bio..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white"
              />
            </div>

            {/* City */}
            <div className="mb-5">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                City
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  placeholder="Enter your city"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white"
                />
              </div>
            </div>

            {/* Profile Picture */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Profile Picture URL
              </label>
              <div className="relative">
                <ImageIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  name="profilePic"
                  value={form.profilePic}
                  onChange={handleChange}
                  placeholder="Paste image URL"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Creating Account...
                </>
              ) : (
                <>
                  Register
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="px-8 py-6 bg-gray-50 border-t border-gray-100">
            <div className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <button
                onClick={() => navigate("/login")}
                className="text-orange-600 hover:text-orange-800 font-semibold transition-colors"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
