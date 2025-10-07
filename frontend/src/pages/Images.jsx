// import React, { useState } from 'react';
// import axios from 'axios';

// function Images() {
//   const [file, setFile] = useState(null);
//   const [preview, setPreview] = useState(null);
//   const [uploading, setUploading] = useState(false);
//   const [uploadedImage, setUploadedImage] = useState(null);

//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     if (selectedFile) {
//       setFile(selectedFile);
//       setPreview(URL.createObjectURL(selectedFile));
//     }
//   };

//   const handleUpload = async () => {
//     if (!file) return alert('Please select an image first.');

//     const formData = new FormData();
//     formData.append('image', file);

//     try {
//       setUploading(true);
//       const res = await axios.post('http://localhost:4000/upload', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });
//       setUploadedImage(res.data.url);
//       alert('Image uploaded successfully!');
//     } catch (err) {
//       console.error(err);
//       alert('Failed to upload image.');
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4">
//       <h1 className="text-3xl font-bold text-gray-800 mb-4">Upload Forts Images Here</h1>

//       <div className="bg-white shadow-md rounded-2xl p-6 w-full max-w-md">
//         <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
//           Upload an Image
//         </h2>

//         <input
//           type="file"
//           accept="image/*"
//           onChange={handleFileChange}
//           className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />

//         {preview && (
//           <div className="mt-4 flex flex-col items-center">
//             <p className="text-gray-600 mb-2">Preview:</p>
//             <img
//               src={preview}
//               alt="Preview"
//               className="w-64 h-64 object-cover rounded-xl shadow-md"
//             />
//           </div>
//         )}

//         <button
//           onClick={handleUpload}
//           disabled={uploading}
//           className={`mt-5 w-full py-2 px-4 rounded-xl text-white font-medium transition ${
//             uploading
//               ? 'bg-gray-400 cursor-not-allowed'
//               : 'bg-blue-600 hover:bg-blue-700'
//           }`}
//         >
//           {uploading ? 'Uploading...' : 'Upload'}
//         </button>

//         {uploadedImage && (
//           <div className="mt-6 text-center">
//             <h3 className="text-lg font-semibold text-gray-800 mb-2">
//               Uploaded Image:
//             </h3>
//             <img
//               src={uploadedImage}
//               alt="Uploaded"
//               className="w-64 h-64 object-cover rounded-xl shadow-lg mx-auto"
//             />
//             <a
//               href={uploadedImage}
//               target="_blank"
//               rel="noreferrer"
//               className="text-blue-600 hover:underline mt-2 inline-block"
//             >
//               View on Cloudinary
//             </a>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Images;


// import React, { useState, useEffect } from "react";
// import API from '../api/axios';

// function Images() {
//   const [file, setFile] = useState(null);
//   const [preview, setPreview] = useState(null);
//   const [uploading, setUploading] = useState(false);
//   const [images, setImages] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   // Fetch images when component loads
//   useEffect(() => {
//     const fetchImages = async () => {
//       try {
//         const res = await API.get("/images"); // GET request
//         console.log("Hello")
//         setImages(res.data); // assuming backend returns array of images
//       } catch (err) {
//         console.error("Error fetching images:", err);
//         setError("Failed to load images");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchImages();
//   }, []);

//   // Handle image selection
//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     if (selectedFile) {
//       setFile(selectedFile);
//       setPreview(URL.createObjectURL(selectedFile));
//     }
//   };
// const handleNameChange = (e) => {
//     setFile(e.target.value)
//   }
//   // Handle image upload
//   const handleUpload = async () => {
//     if (!file) return alert("Please select an image first.");

//     const formData = new FormData();
//     formData.append("image", file);
//     formData.append("name", file.name.split(".")[0]); // optional name field
//     console.log(formData)
//     try {
//       setUploading(true);
//       await API.post("/images/upload", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       alert("Image uploaded successfully!");
//       setFile(null);
//       setPreview(null);

//       // Refresh the list after upload
//       const res = await API.get("/images");
//       setImages(res.data);
//     } catch (err) {
//       console.error("Error uploading image:", err);
//       alert("Failed to upload image.");
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4">
//       <h1 className="text-3xl font-bold text-gray-800 mb-4">
//         Upload Forts Images Here
//       </h1>

//       <div className="bg-white shadow-md rounded-2xl p-6 w-full max-w-md">
//         <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
//           Upload an Image
//         </h2>

//         <input 
//           type="text"
//           onChange={handleFileChange()}
//           />
//         <input
//           type="file"
//           accept="image/*"
//           onChange={handleFileChange}
//           className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />

//         {preview && (
//           <div className="mt-4 flex flex-col items-center">
//             <p className="text-gray-600 mb-2">Preview:</p>
//             <img
//               src={preview}
//               alt="Preview"
//               className="w-64 h-64 object-cover rounded-xl shadow-md"
//             />
//           </div>
//         )}

//         <button
//           onClick={handleUpload}
//           disabled={uploading}
//           className={`mt-5 w-full py-2 px-4 rounded-xl text-white font-medium transition ${
//             uploading
//               ? "bg-gray-400 cursor-not-allowed"
//               : "bg-blue-600 hover:bg-blue-700"
//           }`}
//         >
//           {uploading ? "Uploading..." : "Upload"}
//         </button>
//       </div>

//       {/* 🔹 Display all uploaded images below */}
//       <div className="mt-10 w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {loading ? (
//           <p className="text-gray-600 text-center col-span-full">
//             Loading images...
//           </p>
//         ) : error ? (
//           <p className="text-red-500 text-center col-span-full">{error}</p>
//         ) : images.length === 0 ? (
//           <p className="text-gray-600 text-center col-span-full">
//             No images uploaded yet.
//           </p>
//         ) : (
//           images.map((img) => (
//             <div
//               key={img._id}
//               className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition"
//             >
//               <img
//                 src={img.imageUrl}
//                 alt={img.name}
//                 className="w-full h-64 object-cover rounded-lg"
//               />
//               <p className="text-center text-gray-800 font-medium mt-2">
//                 {img.name}
//               </p>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// }

// export default Images;
import React, { useState, useEffect } from "react";
import API from "../api/axios";

function Images() {
  const [file, setFile] = useState(null);
  const [fortName, setFortName] = useState(""); // Fort name state
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch images on load
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await API.get("/images");
        setImages(res.data);
      } catch (err) {
        console.error("Error fetching images:", err);
        setError("Failed to load images");
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  // Handle fort name input
  const handleNameChange = (e) => {
    setFortName(e.target.value);
  };

  // Handle image file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  // Upload image + name to backend
  const handleUpload = async () => {
    if (!file) return alert("Please select an image first.");
    if (!fortName.trim()) return alert("Please enter the fort name.");

    const formData = new FormData();
    formData.append("image", file);
    formData.append("name", fortName);

    try {
      setUploading(true);
      await API.post("/images/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Image uploaded successfully!");
      setFile(null);
      setPreview(null);
      setFortName("");

      // Refresh list
      const res = await API.get("/images");
      setImages(res.data);
    } catch (err) {
      console.error("Error uploading image:", err);
      alert("Failed to upload image.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-30 px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
         Fort Name and Image 
      </h1>

      <div className="bg-white shadow-md rounded-2xl p-6 w-full max-w-md">
        {/* <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
          Upload a Fort Image
        </h2> */}

        {/* 🔹 Fort Name Input */}
        <input
          type="text"
          placeholder="Enter Fort Name"
          value={fortName}
          onChange={handleNameChange}
          className="mb-4 w-full p-1 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500"
        />

        {/* 🔹 Image Input */}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* 🔹 Preview */}
        {preview && (
          <div className="mt-4 flex flex-col items-center">
            <p className="text-gray-600 mb-2">Preview:</p>
            <img
              src={preview}
              alt="Preview"
              className="w-64 h-64 object-cover rounded-xl shadow-md"
            />
          </div>
        )}

        {/* 🔹 Upload Button */}
        <button
          onClick={handleUpload}
          disabled={uploading}
          className={`mt-5 w-full py-2 px-4 rounded-xl text-white font-medium transition ${
            uploading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </div>

      {/* 🔹 Display all uploaded images below */}
      <div className="mt-10 w-full max-w-8xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {loading ? (
          <p className="text-gray-600 text-center col-span-full">
            Loading images...
          </p>
        ) : error ? (
          <p className="text-red-500 text-center col-span-full">{error}</p>
        ) : images.length === 0 ? (
          <p className="text-gray-600 text-center col-span-full">
            No images uploaded yet.
          </p>
        ) : (
          images.map((img) => (
            <div
              key={img._id}
              className="bg-white p-3 rounded-xl shadow hover:shadow-lg transition"
            >
              <img
                src={img.imageUrl}
                alt={img.name}
                className="w-full h-124 object-cover rounded-lg"
              />
              <p className="text-center text-2xl text-gray-800 font-medium mt-2">
                {img.name}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Images;
