// import React, { useState } from "react";
// import { Editor } from "@tinymce/tinymce-react";
// import API from "../api/axios"; // make sure your axios instance is imported
// import { Link } from "react-router-dom";
// export default function BlogEditor() {
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");

//   const handleEditorChange = (newContent) => {
//     setContent(newContent);
//   };

//   const handleSubmit = async () => {
//     try {
//       const blog = { title, content };

//       // Use axios instance directly
//       const res = await API.post("/blogs", blog);
//       console.log("you are calling blog api");

//       if (res.status === 201 || res.status === 200) {
//         alert("✅ Blog saved successfully!");
//         setTitle("");
//         setContent("");
//       }
//     } catch (err) {
//       console.error("❌ Error saving blog:", err);
//       alert("Failed to save blog");
//     }
//   };

//   return (
//     <div className="p-6 max-w-3xl mx-auto bg-white shadow-md rounded-xl">
//       <Link
//         to="/blog-list"
//         className="inline-block mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//       >
//         ← Back to Blogs
//       </Link>
//       <h2 className="text-2xl font-bold mb-4">✍️ Write Your Blog</h2>

//       {/* Blog Title */}
//       <input
//         type="text"
//         placeholder="Enter blog title"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         className="w-full p-2 mb-4 border rounded-md"
//       />

//       {/* TinyMCE Editor */}
//       {/* <Editor
//         apiKey="o2nv4omo1lunv029net4mhixyl2zx1686tofre91g0f78bkr"
//         init={{
//           height: 400,
//           menubar: true,
//           plugins:
//             "advlist autolink lists link image charmap preview anchor searchreplace visualblocks code fullscreen insertdatetime media table help wordcount",

//           toolbar:
//             "undo redo | formatselect | bold italic underline | " +
//             "alignleft aligncenter alignright alignjustify | " +
//             "bullist numlist outdent indent | removeformat | help",
//         }}
//         value={content}
//         onEditorChange={handleEditorChange}
//       /> */}

//       <button
//         onClick={handleSubmit}
//         className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
//       >
//         💾 Save Blog on me
//       </button>
//     </div>
//   );
// }


import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import API from "../api/axios";
import {Link, useNavigate } from 'react-router-dom'
export default function BlogEditor() {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  const navigate = useNavigate();

  const handleEditorChange = (newContent) => setContent(newContent);

  const handleSubmit = async () => {
    try {
      const res = await API.post("/blogs", { title, content });
      if (res.status === 201) {
        alert("✅ Blog saved successfully!");
        setTitle("");
        setContent("");
        navigate("/blog-list")
      }
    } catch (err) {
      console.error(err);
      alert("❌ Failed to save blog");
    }
  };

  return (
    <div className="min-h-screen mt-16 bg-orange-200 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-8">
      <Link 
                  to="/blog-list"
                  className="inline-flex items-center text-orange-700 hover:text-orange-900 transition-colors mb-6 group"
                >
                  <svg className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to Blogs
                </Link>
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6 flex items-center gap-2">
          ✍️ Create a New Blog
        </h2>

        {/* Title */}
        <input
          type="text"
          placeholder="Enter blog title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 mb-6 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />

        {/* TinyMCE */}
     
<Editor
  apiKey="o2nv4omo1lunv029net4mhixyl2zx1686tofre91g0f78bkr"
  init={{
    height: 1000,
    menubar: true,
    plugins: [
      "advlist autolink lists link image charmap preview anchor",
      "searchreplace visualblocks code fullscreen",
      "insertdatetime media table help wordcount"
    ],
    toolbar:
      "undo redo | formatselect | bold italic underline | \
      alignleft aligncenter alignright alignjustify | \
      bullist numlist outdent indent | image | removeformat | help",
    
    // Allow users to insert images
    image_title: true,
    automatic_uploads: true,
    file_picker_types: "image",
    image_dimensions: false,  // hides width/height fields
    image_class_list: [
  { title: 'Responsive', value: 'img-responsive' }
],
     content_style: "img { max-width: 400px; height: auto; display: block; margin: 10px auto; }",

    // Custom file picker for images
    file_picker_callback: (cb, value, meta) => {
      const input = document.createElement("input");
      input.setAttribute("type", "file");
      input.setAttribute("accept", "image/*");

      input.onchange = () => {
        const file = input.files[0];
        const reader = new FileReader();
        reader.onload = () => {
          const id = "blobid" + new Date().getTime();
          const blobCache = window.tinymce.activeEditor.editorUpload.blobCache;
          const base64 = reader.result.split(",")[1];
          const blobInfo = blobCache.create(id, file, base64);
          blobCache.add(blobInfo);

          // Call callback and insert image into editor
          cb(blobInfo.blobUri(), { title: file.name });
        };
        reader.readAsDataURL(file);
      };

      input.click();
    }
  }}
  value={content}
  onEditorChange={handleEditorChange}
/> 

        {/* Save Button */}
        <button
          onClick={handleSubmit}
          className="mt-6 w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 rounded-xl shadow-md hover:from-blue-700 hover:to-indigo-700 transition-all"
        >
          💾 Save Blog
        </button>
      </div>
    </div>
  );
}
