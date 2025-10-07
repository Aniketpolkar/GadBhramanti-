// // src/api/userApi.js
// import API from "./axios"; // your axios instance

// // Register a new user
// export const registerAdminApi  = (form) => API.post("/admin/register", form);

// // Login user
// export const loginAdminApi = (form) => API.post("/admin/login", form);

// // (you can add more later: getProfile, updateProfile, etc.)


// // Forts CRUD
// export const getFortsApi = () => API.get("/adminForts/");
// // export const addFortApi = (fort) => API.post("/adminForts/fort", fort);

// export const addFortApi = (fort) => API.post("/adminForts/fort", fort,{ withCredentials: true });
// // export const addFortApi = (fort) => {
// //   const adminToken = localStorage.getItem("adminToken");
// //   return API.post(
// //     "/adminForts/fort",
// //     fort,
// //     {

// //       headers: {
// //         Authorization: `Bearer ${adminToken}`,
// //       },
// //       withCredentials: true,
// //     }
// //   );
// // };
// export const deleteFortApi = (id) => {
//   const adminToken = localStorage.getItem("adminToken");
//   return API.delete(`/adminForts/forts/${id}`, {
//     headers: { Authorization: `Bearer ${adminToken}` },
//     withCredentials: true,
//   });
// };
// // export const deleteFortApi = (id) => API.delete(`/adminForts/forts/${id}`);
// // export const updateFortApi = (id, fort) => API.put(`/adminForts/forts/${id}`, fort);
// export const updateFortApi = (id, fort) => {
//   const adminToken = localStorage.getItem("adminToken");
//   return API.put(`/adminForts/forts/${id}`, fort, {
//     headers: {
//       Authorization: `Bearer ${adminToken}`,
//     },
//     withCredentials: true,
//   });
// };

// src/api/adminApi.js
import API from "./axios"; // your axios instance

// Helper function to get admin token
const getAdminToken = () => localStorage.getItem("adminToken");

// Helper function to create auth headers
const getAuthHeaders = () => ({
  Authorization: `Bearer ${getAdminToken()}`,
});

// Register a new admin
export const registerAdminApi = (form) => API.post("/admin/register", form);

// Login admin
export const loginAdminApi = (form) => API.post("/admin/login", form);

// Get admin profile (if needed)
export const getAdminProfileApi = () => {
  return API.get("/admin/profile", {
    headers: getAuthHeaders(),
    withCredentials: true,
  });
};

// =============================================
// FORTS CRUD OPERATIONS
// =============================================

// Get all forts
export const getFortsApi = () => {
  return API.get("/adminForts/", {
    headers: getAuthHeaders(),
    withCredentials: true,
  });
};

// return API.put(`/adminComments/${fortId}/comments/${commentId}`, comment, {
//     headers: getAuthHeaders(),
//     withCredentials: true,
//   });

// Get single fort by ID (MISSING FUNCTION - ADDED)
export const getFortByIdApi = (id) => {
  console.log("correct api call")
  return API.get(`/adminForts/forts/${id}`, {
    headers: getAuthHeaders(),
    withCredentials: true,
  });
};

// Add new fort
export const addFortApi = (fort) => {
  return API.post("/adminForts/fort", fort, {
    headers: getAuthHeaders(),
    withCredentials: true,
  });
};

// Update existing fort
export const updateFortApi = (id, fort) => {
  return API.put(`/adminForts/forts/${id}`, fort, {
    headers: getAuthHeaders(),
    withCredentials: true,
  });
};

// Delete fort
export const deleteFortApi = (id) => {
  return API.delete(`/adminForts/forts/${id}`, {
    headers: getAuthHeaders(),
    withCredentials: true,
  });
};

// =============================================
// ADDITIONAL FORT OPERATIONS (if needed)
// =============================================

// Search forts
export const searchFortsApi = (query) => {
  return API.get(`/adminForts/search?q=${encodeURIComponent(query)}`, {
    headers: getAuthHeaders(),
    withCredentials: true,
  });
};

// Get forts by region
export const getFortsByRegionApi = (region) => {
  return API.get(`/adminForts/region/${encodeURIComponent(region)}`, {
    headers: getAuthHeaders(),
    withCredentials: true,
  });
};

// Bulk delete forts
export const bulkDeleteFortsApi = (fortIds) => {
  return API.delete("/adminForts/bulk", {
    data: { ids: fortIds },
    headers: getAuthHeaders(),
    withCredentials: true,
  });
};

// =============================================
// ERROR HANDLING WRAPPER (Optional)
// =============================================

// Wrapper function for better error handling
export const apiCall = async (apiFunction, ...args) => {
  try {
    const response = await apiFunction(...args);
    return response;
  } catch (error) {
    // Handle common errors
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem("adminToken");
      window.location.href = "/admin/login";
    }
    throw error;
  }
};
// =============================================
// COMMENTS CRUD
// =============================================

// Get all forts
export const getFortsCommentApi = () => {
  return API.get("/adminComments/", {
    headers: getAuthHeaders(),
    withCredentials: true,
  });
};

// Add comment
export const addCommentApi = (fortId, comment) => {
  return API.post(`/adminComments/${fortId}/comments`, comment, {
    headers: getAuthHeaders(),
    withCredentials: true,
  });
};

// Update comment
export const updateCommentApi = (fortId, commentId, comment) => {
  return API.put(`/adminComments/${fortId}/comments/${commentId}`, comment, {
    headers: getAuthHeaders(),
    withCredentials: true,
  });
};

// Delete comment
export const deleteCommentApi = (fortId, commentId) => {
  return API.delete(`/adminComments/${fortId}/comments/${commentId}`, {
    headers: getAuthHeaders(),
    withCredentials: true,
  });
};


// =============================================
// USAGE EXAMPLES:
// =============================================

// Instead of calling getFortByIdApi(id) directly, you can use:
// apiCall(getFortByIdApi, id)
//   .then(response => console.log(response.data))
//   .catch(error => console.error(error));

export default {
  registerAdminApi,
  loginAdminApi,
  getAdminProfileApi,
  getFortsApi,
  getFortByIdApi,
  addFortApi,
  updateFortApi,
  deleteFortApi,
  searchFortsApi,
  getFortsByRegionApi,
  bulkDeleteFortsApi,
  apiCall,
  getFortsCommentApi,
  addCommentApi,
  updateCommentApi,
  deleteCommentApi,
};