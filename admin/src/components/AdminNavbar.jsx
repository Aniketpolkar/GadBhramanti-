
// // import { Link, useNavigate } from "react-router-dom";

// // export default function AdminNavbar() {
// //   const navigate = useNavigate();

// //   const logout = () => {
// //     localStorage.removeItem("adminToken");
// //     navigate("/admin-login");
// //   };

// //   return (
// //     <nav className="bg-gradient-to-r from-orange-600 via-black to-black bg-opacity-90 backdrop-blur-md text-white px-6 py-4 flex justify-between items-center shadow-lg">
// //       {/* Left side: Logo / Brand */}
// //       <div className="text-2xl font-extrabold text-gray-100 tracking-wide">
// //         Admin Panel
// //       </div>

// //       {/* Middle: Links */}
// //       <div className="hidden md:flex space-x-8 font-medium">
// //         <Link
// //           to="/admin-dashboard"
// //           className="hover:text-orange-300 transition-colors"
// //         >
// //           Dashboard
// //         </Link>
// //         <Link
// //           to="/manage-forts"
// //           className="hover:text-orange-300 transition-colors"
// //         >
// //           Forts
// //         </Link>
// //         <Link
// //           to="/manage-comments"
// //           className="hover:text-orange-300 transition-colors"
// //         >
// //           Comments
// //         </Link>
// //       </div>

// //       {/* Right side: Logout Button */}
// //       <button
// //         onClick={logout}
// //         className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg shadow-md font-semibold transition-transform transform hover:scale-105"
// //       >
// //         Logout
// //       </button>
// //     </nav>
// //   );
// // }

// import { Link, useNavigate } from "react-router-dom";

// export default function AdminNavbar() {
//   const navigate = useNavigate();
//   const isLoggedIn = !!localStorage.getItem("adminToken"); // check token

//   const logout = () => {
//     localStorage.removeItem("adminToken");
//     navigate("/admin-login");
//   };

//   return (
//     <nav className="bg-gradient-to-r from-orange-600 via-black to-black bg-opacity-90 backdrop-blur-md text-white px-6 py-4 flex justify-between items-center shadow-lg">
//       {/* Left side: Logo / Brand */}
//       <div className="text-2xl font-extrabold text-gray-100 tracking-wide">
//         Admin Panel
//       </div>

//       {/* Middle: Links */}
//       <div className="hidden md:flex space-x-8 font-medium">
//         <Link to="/admin-dashboard" className="hover:text-orange-300 transition-colors">
//           Dashboard
//         </Link>
//         <Link to="/manage-forts" className="hover:text-orange-300 transition-colors">
//           Forts
//         </Link>
//         <Link to="/manage-comments" className="hover:text-orange-300 transition-colors">
//           Comments
//         </Link>
//       </div>

//       {/* Right side: Auth Buttons */}
//       <div className="flex space-x-4">
//         {isLoggedIn ? (
//           <button
//             onClick={logout}
//             className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg shadow-md font-semibold transition-transform transform hover:scale-105"
//           >
//             Logout
//           </button>
//         ) : (
//           <>
//             <Link
//               to="/admin-login"
//               className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold transition-transform transform hover:scale-105"
//             >
//               Login
//             </Link>
//             <Link
//               to="/admin-register"
//               className="bg-orange-500 hover:bg-orange-800 text-white px-4 py-2 rounded-lg font-semibold transition-transform transform hover:scale-105"
//             >
//               Register
//             </Link>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// }

import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AdminAuthContext } from "../context/AdminAuthContext";

export default function AdminNavbar() {
  const navigate = useNavigate();
  const { admin, logoutAdmin } = useContext(AdminAuthContext);

  const isLoggedIn = !!localStorage.getItem("adminToken");

  // ✅ Wrapper for protected navigation
  const handleProtectedNav = (path) => {
    if (!isLoggedIn) {
      navigate("/admin-login");
    } else {
      navigate(path);
    }
  };

  const handleLogout = () => {
    logoutAdmin(); // ✅ call context logout
    navigate("/admin-login");
  };

  return (
    <nav className="bg-gradient-to-r from-orange-600 via-black to-black bg-opacity-90 backdrop-blur-md text-white px-6 py-4 flex justify-between items-center shadow-lg">
      {/* Left side: Logo / Brand */}
      <div
        className="text-2xl font-extrabold text-gray-100 tracking-wide cursor-pointer"
        onClick={() => handleProtectedNav("/admin-dashboard")}
      >
        Admin Panel
      </div>

      {/* Middle: Links */}
      <div className="hidden md:flex space-x-8 font-medium">
        <button
          onClick={() => handleProtectedNav("/admin-dashboard")}
          className="hover:text-orange-300 cursor-pointer transition-colors"
        >
          Dashboard
        </button>
        <button
          onClick={() => handleProtectedNav("/manage-forts")}
          className="hover:text-orange-300 cursor-pointer transition-colors"
        >
          Forts
        </button>
        <button
          onClick={() => handleProtectedNav("/manage-comments")}
          className="hover:text-orange-300 cursor-pointer transition-colors"
        >
          Comments
        </button>
      </div>

      {/* Right side: Auth Buttons */}
      <div className="flex space-x-4">
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="bg-orange-500 hover:bg-orange-600 cursor-pointer text-white px-5 py-2 rounded-lg shadow-md font-semibold transition-transform transform hover:scale-105"
          >
            Logout
          </button>
        ) : (
          <>
            <Link
              to="/admin-login"
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold transition-transform transform hover:scale-105"
            >
              Login
            </Link>
            <Link
              to="/admin-register"
              className="bg-orange-500 hover:bg-orange-800 text-white px-4 py-2 rounded-lg font-semibold transition-transform transform hover:scale-105"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

