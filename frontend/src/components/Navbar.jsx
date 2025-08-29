// import { Link } from 'react-router-dom';
// import { useState, useEffect } from 'react';
// import { useContext } from "react";
// import { AuthContext } from "../context/authcontext";

// const Navbar = () => {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const { user } = useContext(AuthContext);

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 20);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   return (
//     <>
//       {/* Backdrop blur overlay for mobile menu */}
//       {isMobileMenuOpen && (
//         <div 
//           className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40 md:hidden"
//           onClick={() => setIsMobileMenuOpen(false)}
//         />
//       )}

//       <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
//         isScrolled 
//           ? 'bg-slate-900/95 backdrop-blur-md shadow-2xl shadow-orange-500/10' 
//           : 'bg-gradient-to-r from-slate-900 via-orange-900/90 to-red-900/90'
//       }`}>
        
//         {/* Animated background pattern */}
//         <div className="absolute inset-0 opacity-10">
//           <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 via-transparent to-red-500/20 animate-pulse" />
//           <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-orange-400 via-red-400 to-amber-400" />
//         </div>

//         <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-20">
            
//             {/* Logo Section with animated elements */}
//             <div className="flex items-center group">
//               {/* Decorative fort icon */}
//               <div className="relative mr-4 p-2 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 shadow-lg group-hover:shadow-orange-500/25 transition-all duration-300">
//                 <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
//                   <path d="M12 2L2 7v10c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7l-10-5zM12 4.2L20 8v9H4V8l8-3.8z"/>
//                   <path d="M8 10h2v6H8zm6 0h2v6h-2z"/>
//                 </svg>
//                 <div className="absolute inset-0 rounded-xl bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
//               </div>
              
//               {/* Title with advanced typography */}
//               <div className="relative">
//                 <h1 className="text-3xl font-black tracking-tight">
//                   <span className="bg-gradient-to-r from-orange-300 via-amber-200 to-orange-300 bg-clip-text text-transparent animate-pulse">
//                     Forts
//                   </span>
//                   <span className="text-white ml-2 relative">
//                     of Maharashtra
//                     <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-orange-400 to-red-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
//                   </span>
//                 </h1>
//                 <p className="text-xs text-orange-200 mt-1 opacity-80">Heritage • Adventure • History</p>
//               </div>
//             </div>

//             {/* Desktop Navigation */}
//             <div className="hidden lg:block">
//               <div className="flex items-center space-x-2">
//                 {!user ? (<> {/* Login Button */}
//                 <Link 
//                   to="/login" 
//                   className="group relative px-6 py-3 rounded-full font-medium text-white border-2 border-white/30 backdrop-blur-sm hover:border-orange-400 transition-all duration-300 hover:scale-105"
//                 >
//                   <div className="absolute inset-0 bg-white/5 group-hover:bg-orange-500/20 transition-colors duration-300 rounded-full" />
//                   <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-orange-500/20 to-red-500/20 transition-opacity duration-300 rounded-full" />
//                   <span className="relative z-10 group-hover:text-orange-100 transition-colors duration-300">Login</span>
//                 </Link>

//                 {/* Register Button */}
//                  <Link 
//                   to="/register" 
//                   className="group relative px-6 py-3 rounded-full font-medium text-white border-2 border-white/30 backdrop-blur-sm hover:border-orange-400 transition-all duration-300 hover:scale-105"
//                 >
//                   <div className="absolute inset-0 bg-white/5 group-hover:bg-orange-500/20 transition-colors duration-300 rounded-full" />
//                   <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-orange-500/20 to-red-500/20 transition-opacity duration-300 rounded-full" />
//                   <span className="relative z-10 group-hover:text-orange-100 transition-colors duration-300">Register</span>
//                 </Link></>):(<> {/* Explore Forts Button */}
//                 <Link 
//                   to="/forts" 
//                   className="group relative px-6 py-3 rounded-full font-semibold text-white overflow-hidden transition-all duration-300 hover:scale-105"
//                 >
//                   <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
//                   <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//                   <div className="absolute inset-0 translate-y-full group-hover:translate-y-0 bg-gradient-to-r from-yellow-400 to-orange-400 transition-transform duration-300" />
//                   <span className="relative z-10 flex items-center">
//                     <svg className="w-4 h-4 mr-2 transform group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
//                     </svg>
//                     Explore Forts
//                   </span>
//                 </Link>
                
//                  {/* Profile Button */}
//                 <Link 
//                   to="/profile" 
//                   className="group relative px-6 py-3 rounded-full font-semibold text-slate-900 bg-white hover:bg-gradient-to-r hover:from-orange-100 hover:to-amber-100 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-orange-500/25"
//                 >
//                   <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-orange-200 to-amber-200 transition-opacity duration-300 rounded-full" />
//                   <span className="relative z-10 group-hover:text-orange-900 transition-colors duration-300"> Profile </span>
//                 </Link></>)}

               
//               </div>
//             </div>

//             {/* Mobile Menu Button */}
//             <div className="lg:hidden">
//               <button 
//                 onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//                 className="relative p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
//               >
//                 <div className="w-6 h-6 relative">
//                   <span className={`absolute top-0 left-0 w-full h-0.5 bg-current transform transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 top-2.5' : ''}`} />
//                   <span className={`absolute top-2.5 left-0 w-full h-0.5 bg-current transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
//                   <span className={`absolute top-5 left-0 w-full h-0.5 bg-current transform transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 top-2.5' : ''}`} />
//                 </div>
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Mobile Navigation Menu */}
//         <div className={`lg:hidden fixed top-20 left-4 right-4 transition-all duration-500 transform ${
//           isMobileMenuOpen 
//             ? 'translate-y-0 opacity-100 visible' 
//             : '-translate-y-8 opacity-0 invisible'
//         } z-50`}>
//           <div className="bg-slate-900/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 overflow-hidden">
//             <div className="p-6 space-y-4">
              
//               {/* Mobile menu header */}
//               <div className="text-center pb-4 border-b border-white/10">
//                 <h3 className="text-lg font-bold text-white">Navigation</h3>
//                 <p className="text-sm text-orange-200">Discover Maharashtra's Heritage</p>
//               </div>

//               {/* Mobile navigation links */}
//               <div className="space-y-3">
//                 <Link 
//                   to="/forts" 
//                   onClick={() => setIsMobileMenuOpen(false)}
//                   className="flex items-center p-4 rounded-2xl bg-gradient-to-r from-orange-600/20 to-red-600/20 text-white hover:from-orange-500/30 hover:to-red-500/30 transition-all duration-300 group"
//                 >
//                   <svg className="w-5 h-5 mr-3 text-orange-400" fill="currentColor" viewBox="0 0 24 24">
//                     <path d="M12 2L2 7v10c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7l-10-5z"/>
//                   </svg>
//                   <span className="font-medium group-hover:text-orange-100">Explore Forts</span>
//                   <svg className="w-4 h-4 ml-auto text-orange-400 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
//                   </svg>
//                 </Link>

//                 <Link 
//                   to="/login" 
//                   onClick={() => setIsMobileMenuOpen(false)}
//                   className="flex items-center p-4 rounded-2xl bg-white/5 text-white hover:bg-white/10 transition-all duration-300 group border border-white/10"
//                 >
//                   <svg className="w-5 h-5 mr-3 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//                   </svg>
//                   <span className="font-medium">Login</span>
//                   <svg className="w-4 h-4 ml-auto text-gray-400 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
//                   </svg>
//                 </Link>

//                 <Link 
//                   to="/register" 
//                   onClick={() => setIsMobileMenuOpen(false)}
//                   className="flex items-center p-4 rounded-2xl bg-white text-slate-900 hover:bg-orange-50 transition-all duration-300 group font-semibold"
//                 >
//                   <svg className="w-5 h-5 mr-3 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//                   </svg>
//                   <span>Get Started</span>
//                   <svg className="w-4 h-4 ml-auto text-orange-600 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
//                   </svg>
//                 </Link>
//               </div>

//               {/* Mobile menu footer */}
//               <div className="pt-4 border-t border-white/10 text-center">
//                 <p className="text-xs text-gray-400">Discover the legacy of Maratha empire</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </nav>
//     </>
//   );
// };

// export default Navbar;

import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useContext } from "react";
import { AuthContext } from "../context/authcontext";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Backdrop blur overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-slate-900/95 backdrop-blur-md shadow-2xl shadow-orange-500/10' 
          : 'bg-gradient-to-r from-slate-900 via-orange-900/90 to-red-900/90'
      }`}>
        
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 via-transparent to-red-500/20 animate-pulse" />
          <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-orange-400 via-red-400 to-amber-400" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            {/* Logo Section with animated elements */}
            <div className="flex items-center group">
              {/* Decorative fort icon */}
              <div className="relative mr-4 p-1 rounded-full bg-gradient-to-br from-gray-400 to-red-600 shadow-lg group-hover:shadow-orange-500/25 transition-all duration-300">
                {/* <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7v10c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7l-10-5zM12 4.2L20 8v9H4V8l8-3.8z"/>
                  <path d="M8 10h2v6H8zm6 0h2v6h-2z"/>
                </svg> */}
                <img className='w-18 h-18 text-white rounded-full object-cover ' src="../public/icon_4.png" alt="icon" />
                {/* <div className="absolute inset-0 rounded-xl bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" /> */}
              </div>
              
              {/* Title with advanced typography */}
              <div className="relative">
                <h1 className="text-3xl font-black tracking-tight">
                  <span className="bg-gradient-to-r from-orange-300 via-amber-200 to-orange-300 bg-clip-text text-transparent animate-pulse">
                    Forts
                  </span>
                  <span className="text-white ml-2 relative">
                    of Maharashtra
                    <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-orange-400 to-red-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                  </span>
                </h1>
                <p className="text-xs text-orange-200 mt-1 opacity-80">Heritage • Adventure • History</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:block">
              <div className="flex items-center space-x-2">
                {!user ? (
                  <> 
                    {/* Login Button */}
                    <Link 
                      to="/login" 
                      className="group relative px-6 py-3 rounded-full font-medium text-white border-2 border-white/30 backdrop-blur-sm hover:border-orange-400 transition-all duration-300 hover:scale-105"
                    >
                      <div className="absolute inset-0 bg-white/5 group-hover:bg-orange-500/20 transition-colors duration-300 rounded-full" />
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-orange-500/20 to-red-500/20 transition-opacity duration-300 rounded-full" />
                      <span className="relative z-10 group-hover:text-orange-100 transition-colors duration-300">Login</span>
                    </Link>

                    {/* Register Button */}
                    <Link 
                      to="/register" 
                      className="group relative px-6 py-3 rounded-full font-medium text-white border-2 border-white/30 backdrop-blur-sm hover:border-orange-400 transition-all duration-300 hover:scale-105"
                    >
                      <div className="absolute inset-0 bg-white/5 group-hover:bg-orange-500/20 transition-colors duration-300 rounded-full" />
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-orange-500/20 to-red-500/20 transition-opacity duration-300 rounded-full" />
                      <span className="relative z-10 group-hover:text-orange-100 transition-colors duration-300">Register</span>
                    </Link>
                  </>
                ) : (
                  <>
                    {/* Explore Forts Button */}
                    <Link 
                      to="/forts" 
                      className="group relative px-6 py-3 rounded-full font-semibold text-white overflow-hidden transition-all duration-300 hover:scale-105"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute inset-0 translate-y-full group-hover:translate-y-0 bg-gradient-to-r from-yellow-400 to-orange-400 transition-transform duration-300" />
                      <span className="relative z-10 flex items-center">
                        <svg className="w-4 h-4 mr-2 transform group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                        Explore Forts
                      </span>
                    </Link>
                    
                    {/* Profile Button */}
                    <Link 
                      to="/profile" 
                      className="group relative px-6 py-3 rounded-full font-semibold text-slate-900 bg-white hover:bg-gradient-to-r hover:from-orange-100 hover:to-amber-100 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-orange-500/25"
                    >
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-orange-200 to-amber-200 transition-opacity duration-300 rounded-full" />
            
                      <span className="relative z-10 group-hover:text-orange-900 transition-colors duration-300">Profile</span>
                    </Link>
                  </>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="relative p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
              >
                <div className="w-6 h-6 relative">
                  <span className={`absolute top-0 left-0 w-full h-0.5 bg-current transform transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 top-2.5' : ''}`} />
                  <span className={`absolute top-2.5 left-0 w-full h-0.5 bg-current transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
                  <span className={`absolute top-5 left-0 w-full h-0.5 bg-current transform transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 top-2.5' : ''}`} />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`lg:hidden fixed top-20 left-4 right-4 transition-all duration-500 transform ${
          isMobileMenuOpen 
            ? 'translate-y-0 opacity-100 visible' 
            : '-translate-y-8 opacity-0 invisible'
        } z-50`}>
          <div className="bg-slate-900/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 overflow-hidden">
            <div className="p-6 space-y-4">
              
              {/* Mobile menu header */}
              <div className="text-center pb-4 border-b border-white/10">
                <h3 className="text-lg font-bold text-white">Navigation</h3>
                <p className="text-sm text-orange-200">Discover Maharashtra's Heritage</p>
              </div>

              {/* Mobile navigation links based on authentication */}
              <div className="space-y-3">
                {!user ? (
                  <>
                    {/* Login Link - Mobile */}
                    <Link 
                      to="/login" 
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center p-4 rounded-2xl bg-white/5 text-white hover:bg-white/10 transition-all duration-300 group border border-white/10"
                    >
                      <svg className="w-5 h-5 mr-3 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span className="font-medium">Login</span>
                      <svg className="w-4 h-4 ml-auto text-gray-400 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>

                    {/* Register Link - Mobile */}
                    <Link 
                      to="/register" 
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center p-4 rounded-2xl bg-white text-slate-900 hover:bg-orange-50 transition-all duration-300 group font-semibold"
                    >
                      <svg className="w-5 h-5 mr-3 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      <span>Register</span>
                      <svg className="w-4 h-4 ml-auto text-orange-600 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </>
                ) : (
                  <>
                    {/* Explore Forts Link - Mobile */}
                    <Link 
                      to="/forts" 
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center p-4 rounded-2xl bg-gradient-to-r from-orange-600/20 to-red-600/20 text-white hover:from-orange-500/30 hover:to-red-500/30 transition-all duration-300 group"
                    >
                      <svg className="w-5 h-5 mr-3 text-orange-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2L2 7v10c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7l-10-5z"/>
                      </svg>
                      <span className="font-medium group-hover:text-orange-100">Explore Forts</span>
                      <svg className="w-4 h-4 ml-auto text-orange-400 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  
                    {/* Profile Link - Mobile */}
                    <Link 
                      to="/profile" 
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center p-4 rounded-2xl bg-white text-slate-900 hover:bg-orange-50 transition-all duration-300 group font-semibold"
                    >
                      <svg className="w-5 h-5 mr-3 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span>Profile</span>
                      <svg className="w-4 h-4 ml-auto text-orange-600 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </>
                )}
              </div>

              {/* Mobile menu footer */}
              <div className="pt-4 border-t border-white/10 text-center">
                <p className="text-xs text-gray-400">
                  {!user ? "Join us to explore Maharashtra's heritage" : "Discover the legacy of Maratha empire"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;