
// import React, { useEffect, useState } from "react";
// import API from "../api/axios"; // ✅ your axios instance
// import {Link} from 'react-router-dom'
// export default function BlogList() {
//   const [blogs, setBlogs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch blogs when component loads
//   useEffect(() => {
//     const fetchBlogs = async () => {
//       try {
//         const res = await API.get("/blogs"); // GET request
//         setBlogs(res.data); // assuming backend returns array of blogs
//       } catch (err) {
//         console.error("Error fetching blogs:", err);
//         setError("Failed to load blogs");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBlogs();
//   }, []);

//   if (loading) {
//     return <p className="text-center mt-10">⏳ Loading blogs...</p>;
//   }

//   if (error) {
//     return <p className="text-center text-red-600 mt-10">{error}</p>;
//   }

//   return (
//     <div className="max-w-5xl mx-auto p-6">
//       <h2 className="text-3xl font-bold mb-6">📚 All Blogs</h2>
//       <Link to={'/blog'} className="mt-3 text-blue-600 hover:underline" >add blog</Link>
//       {blogs.length === 0 ? (
//         <p>No blogs found.</p>
//       ) : (
//         <div className="grid gap-6 md:grid-cols-2">
//           {blogs.map((blog) => (
//             <div
//               key={blog._id}
//               className="bg-white shadow-md rounded-xl p-4 border hover:shadow-lg transition"
//             >
//               <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
//               <div
//                 className="prose max-w-none text-gray-700"
//                 dangerouslySetInnerHTML={{ __html: blog.content.substring(0, 200) + "..." }}
//               />
//               <button
//                 className="mt-3 text-blue-600 hover:underline"
//                 onClick={() => (window.location.href = `/blog/${blog._id}`)}
//               >
//                 Read More →
//               </button>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import API from "../api/axios"; // ✅ your axios instance
import { Link } from 'react-router-dom'

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch blogs when component loads
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await API.get("/blogs"); // GET request
        setBlogs(res.data); // assuming backend returns array of blogs
      } catch (err) {
        console.error("Error fetching blogs:", err);
        setError("Failed to load blogs");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 text-lg font-medium">Loading blogs...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 flex items-center justify-center">
        <div className="text-center p-8">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">⚠️</span>
          </div>
          <p className="text-red-600 text-lg font-medium">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br mt-14 from-orange-50 to-orange-300">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-slate-900 via-blue-800 to-slate-900 bg-clip-text text-transparent mb-4">
            Blog Collection
          </h2>
          <p className="text-slate-600 text-lg mb-8">Discover stories, insights, and ideas</p>
          <Link 
            to={'/blog'} 
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <span className="mr-2">✨</span>
            Create New Blog
          </Link>
        </div>

        {blogs.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">📝</span>
            </div>
            <h3 className="text-2xl font-semibold text-slate-700 mb-2">No blogs yet</h3>
            <p className="text-slate-500">Be the first to share your story!</p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => (
              <article
                key={blog._id}
                className="group bg-white dark:bg-gray-100/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 dark:border-gray-700/50 hover:bg-white/90 dark:hover:bg-gray-200/90 hover:shadow-2xl hover:shadow-orange-500/10 dark:hover:shadow-orange-500/20 transition-all duration-300 hover:-translate-y-2 flex flex-col min-h-[300px]"
              >
                {/* Blog Header */}
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-black dark:text-black mb-3 group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors line-clamp-2 h-14 flex items-start">
                    {blog.title}
                  </h3>
                  <div className="h-px bg-gradient-to-r from-orange-200 to-amber-200 dark:from-orange-600 dark:to-amber-600 group-hover:from-orange-400 group-hover:to-amber-400 dark:group-hover:from-orange-500 dark:group-hover:to-amber-500 transition-all"></div>
                </div>

                {/* Blog Content Preview */}
                <div
                  className="prose prose-sm max-w-none text-gray-700 dark:text-gray-700 mb-6 line-clamp-4 flex-grow h-24 overflow-hidden"
                  dangerouslySetInnerHTML={{ __html: blog.content.substring(0, 200) + "..." }}
                />

                {/* Read More Button */}
                <div className="mt-auto">
                  <button
                    className="inline-flex items-center cursor-pointer border-amber-600 border-2 px-2 p-1 rounded-2xl bg-amber-100 text-orange-600 dark:text-orange-400 hover:text-amber-600 dark:hover:text-amber-300 font-semibold group-hover:translate-x-1 transition-all duration-200"
                    onClick={() => (window.location.href = `/blog/${blog._id}`)}
                  >
                    Read More
                    <svg 
                      className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}