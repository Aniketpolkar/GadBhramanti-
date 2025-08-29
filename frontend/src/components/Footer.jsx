// const Footer = () => {
//   return (
//     <footer className="bg-gradient-to-r from-orange-400 to-red-500 text-white py-6 mt-12">
//       <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
//         {/* Left Section */}
//         <div className="text-center md:text-left mb-4 md:mb-0">
//           <h1 className="text-xl font-bold">GadBhramanti</h1>
//           <p className="text-sm mt-1">Explore the forts of Maharashtra</p>
//         </div>

//         {/* Right Section */}
//         <div className="text-center md:text-right text-sm">
//           <p>© {new Date().getFullYear()} GadBhramanti. All rights reserved.</p>
//           <p className="mt-1">Founder: Aniket Polkar</p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-orange-500 to-red-600 text-white py-3 shadow-inner">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        
        {/* Left Section */}
        <div className="text-center md:text-left">
          <h1 className="text-2xl font-extrabold tracking-wide">GadBhramanti</h1>
          <p className="text-sm mt-2 text-orange-100">
            Explore the forts of Maharashtra
          </p>
        </div>

         <div className="mt-6 border-t border-orange-300/30 pt-4 text-center text-sm text-orange-100">
        Designed with ❤️ in Maharashtra
      </div>
      
        {/* Right Section */}
        <div className="text-center md:text-right text-sm">
          <p>© {new Date().getFullYear()} <span className="font-semibold">GadBhramanti</span>. All rights reserved.</p>
          <p className="mt-1 text-orange-100">Founder: <span className="font-medium">Aniket Polkar</span></p>
        </div>
      </div>

     
    </footer>
  );
};

export default Footer;
