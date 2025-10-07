// import { createContext, useState, useEffect } from "react";

// export const AdminAuthContext = createContext();

// export const AdminAuthProvider = ({ children }) => {
//   const [admin, setAdmin] = useState(null);
// //   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const storedAdmin = localStorage.getItem("admin");
//     if (storedAdmin) setAdmin(JSON.parse(storedAdmin));
//     setLoading(false);
//   }, []);

//   const loginAdmin = (adminData, token) => {
//     setAdmin(adminData);
//     localStorage.setItem("admin", JSON.stringify(adminData));
//     localStorage.setItem("adminToken", token);
//   };

//   const logoutAdmin = () => {
//     setAdmin(null);
//     localStorage.removeItem("admin");
//     localStorage.removeItem("adminToken");
//   };

//   return (
//     <AdminAuthContext.Provider
//       value={{ admin, loginAdmin, logoutAdmin, loading }}
//     >
//       {children}
//     </AdminAuthContext.Provider>
//   );
// };

// context/AdminAuthContext.jsx

import { createContext, useState, useEffect } from "react";

export const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedAdmin = localStorage.getItem("admin");
    // if (storedAdmin) setAdmin(JSON.parse(storedAdmin));
    if (storedAdmin && storedAdmin !== "undefined") {
    try {
      setAdmin(JSON.parse(storedAdmin));
    } catch (err) {
      console.error("Failed to parse admin from localStorage", err);
      localStorage.removeItem("admin"); // cleanup bad data
    }
  }
    setLoading(false);
  }, []);

  const loginAdmin = (adminData, token) => {
    setAdmin(adminData);
    console.log("admin:",admin)
    localStorage.setItem("admin", JSON.stringify(adminData));
    localStorage.setItem("adminToken", token);
  };

  const logoutAdmin = () => {
    setAdmin(null);
    localStorage.removeItem("admin");
    localStorage.removeItem("adminToken");
  };

  return (
    <AdminAuthContext.Provider value={{ admin, loginAdmin, logoutAdmin, loading }}>
      {children}
    </AdminAuthContext.Provider>
  );
};
