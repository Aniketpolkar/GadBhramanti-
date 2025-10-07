// // // src/pages/BlogDetail.jsx
// // import React, { useEffect, useState } from "react";
// // import { useParams, Link } from "react-router-dom";
// // import API from "../api/axios"; // your axios instance

// // export default function BlogDetail() {
// //   const { id } = useParams(); // get blog ID from route
// //   const [blog, setBlog] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState("");

// //   useEffect(() => {
// //     const fetchBlog = async () => {
// //       try {
// //         const res = await API.get(`/blogs/${id}`);
// //         setBlog(res.data);
// //       } catch (err) {
// //         console.error(err);
// //         setError("Failed to load blog");
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchBlog();
// //   }, [id]);

// //   if (loading) return <p className="text-center mt-10">⏳ Loading blog...</p>;
// //   if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;
// //   if (!blog) return <p className="text-gray-500 text-center mt-10">Blog not found</p>;

// //   return (
// //     <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-xl">
// //       <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
// //       <div
// //         className="prose max-w-none"
// //         dangerouslySetInnerHTML={{ __html: blog.content }}
// //       />
// //       <Link
// //         to="/blog-list"
// //         className="inline-block mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
// //       >
// //         ← Back to Blogs
// //       </Link>
// //     </div>
// //   );
// // }


// import React, { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import API from "../api/axios";
// import "../styles/blog.css"; // import custom CSS

// export default function BlogDetail() {
//   const { id } = useParams();
//   const [blog, setBlog] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchBlog = async () => {
//       try {
//         const res = await API.get(`/blogs/${id}`);
//         setBlog(res.data);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchBlog();
//   }, [id]);

//   if (loading) return <p className="text-center mt-10">⏳ Loading blog...</p>;
//   if (!blog) return <p className="text-gray-500 text-center mt-10">Blog not found</p>;

//   return (
//     <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-xl">
//       <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>

//       {/* Blog Content with CSS */}
//       <div
//         className="blog-content prose max-w-none"
//         dangerouslySetInnerHTML={{ __html: blog.content }}
//       />

//       <Link
//         to="/blog-list"
//         className="inline-block mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//       >
//         ← Back to Blogs 1
//       </Link>
//     </div>
//   );
// }




import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../api/axios";
import "../styles/blog.css"; // import custom CSS

export default function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await API.get(`/blogs/${id}`);
        setBlog(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center mt-16">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-200 dark:border-orange-400 border-t-orange-600 dark:border-t-orange-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-orange-700 dark:text-orange-300 text-lg font-medium">Loading blog...</p>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center mt-16">
        <div className="text-center p-8">
          <div className="w-24 h-24 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">📄</span>
          </div>
          <h3 className="text-2xl font-semibold text-orange-700 dark:text-orange-300 mb-2">Blog Not Found</h3>
          <p className="text-orange-600 dark:text-orange-400 mb-6">The blog you're looking for doesn't exist or has been removed.</p>
          <Link 
            to="/blog-list" 
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 dark:from-orange-600 dark:to-amber-600 text-white font-semibold rounded-full hover:from-orange-600 hover:to-amber-600 dark:hover:from-orange-700 dark:hover:to-amber-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Blogs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-100 dark:from-orange-100 dark:to-orange-400 mt-16">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-orange-600 to-amber-600 dark:from-orange-700 dark:to-amber-700 text-white py-6">
        <div className="max-w-4xl mx-auto px-6">
          <Link 
            to="/blog-list"
            className="inline-flex items-center text-orange-100 hover:text-white transition-colors mb-6 group"
          >
            <svg className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Blogs
          </Link>
          
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            {blog.title}
          </h1>
          
          <div className="flex items-center space-x-6 text-orange-100">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>
                Published {new Date().toLocaleDateString() === new Date(blog.createdAt).toLocaleDateString()
                  ? "today"
                  : new Date(blog.createdAt).toLocaleDateString()}
              </span>

            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{Math.round(blog.content.replace(/<[^>]*>/g, "").length/1000)} min read</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-1 py-12">
        <article className="bg-white/80 dark:bg-gray-100/80 backdrop-blur-lg rounded-3xl p-8 md:p-10 shadow-2xl shadow-orange-500/5 dark:shadow-orange-500/10 border border-white/20 dark:border-orange-700/50">
          
          {/* Content Body */}
          <div
            className="blog-content prose prose-lg max-w-none 
                       prose-headings:text-orange-800 dark:prose-headings:text-orange-300
                       prose-p:text-gray-700 dark:prose-p:text-gray-300
                       prose-strong:text-orange-700 dark:prose-strong:text-orange-400
                       prose-a:text-orange-600 dark:prose-a:text-orange-400 prose-a:no-underline hover:prose-a:underline
                       prose-blockquote:border-orange-300 dark:prose-blockquote:border-orange-600
                       prose-blockquote:bg-orange-50 dark:prose-blockquote:bg-orange-900/20
                       prose-blockquote:text-orange-800 dark:prose-blockquote:text-orange-300
                       prose-code:text-orange-700 dark:prose-code:text-orange-400
                       prose-code:bg-orange-100 dark:prose-code:bg-orange-900/30
                       prose-pre:bg-gray-800 dark:prose-pre:bg-gray-900
                       prose-img:rounded-2xl prose-img:shadow-lg
                       prose-hr:border-orange-200 dark:prose-hr:border-orange-700
                       prose-li:text-gray-700 dark:prose-li:text-gray-300"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          {/* Article Footer */}
          <div className="mt-12 pt-8 border-t border-orange-200 dark:border-orange-700">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">A</span>
                </div>
                <div>
                  <h4 className="font-semibold text-orange-800 dark:text-orange-300">Anonymous Author</h4>
                  <p className="text-sm text-orange-600 dark:text-orange-400">Content Writer</p>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <button className="p-2 rounded-full bg-orange-100 dark:bg-orange-900/50 hover:bg-orange-200 dark:hover:bg-orange-800/50 transition-colors">
                  <svg className="w-5 h-5 text-gray-600 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
                <button className="p-2 rounded-full bg-orange-100 dark:bg-orange-900/50 hover:bg-orange-200 dark:hover:bg-orange-800/50 transition-colors">
                  <svg className="w-5 h-5 text-gray-600 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                  </svg>
                </button>
                <button className="p-2 rounded-full bg-orange-800 dark:bg-orange-900/50 hover:bg-orange-500 dark:hover:bg-orange-800 transition-colors">
                  <svg className="w-5 h-5 text-orange-600 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </article>

        {/* Navigation */}
        <div className="mt-12 text-center">
          <Link 
            to="/blog-list"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 dark:from-orange-600 dark:to-amber-600 text-white font-semibold rounded-full hover:from-orange-600 hover:to-amber-600 dark:hover:from-orange-700 dark:hover:to-amber-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Explore More Articles
          </Link>
        </div>
      </div>
    </div>
  );
}