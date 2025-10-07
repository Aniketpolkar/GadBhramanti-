// import { Link } from 'react-router-dom';
// import React from 'react'

// const Hero = () => {
//   return (
//     <header className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20 bg-gray-100">
//       <h2 className="text-4xl font-bold mb-4">Explore the Hidden Forts of Maharashtra</h2>
//       <p className="text-gray-700 mb-6 max-w-xl">
//         Discover offbeat forts, trekking trails, and travel tips. Plan your next adventure and explore hidden gems in the Sahyadris.
//       </p>
//       <Link
//         to="/forts"
//         className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
//       >
//         Explore Forts
//       </Link>
//     </header>
//   );
// };

// export default Hero;
import { Link } from 'react-router-dom';
import React from 'react';

const Hero = () => {
  return (
    <header className="relative flex-1 flex flex-col items-center justify-center text-center px-4 py-32 min-h-screen overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          // backgroundImage: "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')"
          backgroundImage: "url('https://res.cloudinary.com/dle4nbom5/image/upload/v1756580259/Rajgad_Fort_is_Blooming_02.10.2024...._rajgad_rajgadfort_lonavala_khandala_pune_mumbai_2_syd8ya.jpg')"
          // backgroundImage: "url('https://images.unsplash.com/photo-1521206644285-8db1549e484f?q=80&w=1167&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"
          
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/60"></div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -right-4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-8 -left-8 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto">


        {/* Main Heading with Gradient Text */}
        <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
          <span className="bg-gradient-to-r from-white via-blue-100 to-orange-200 bg-clip-text text-transparent">
            Explore the Hidden
          </span>
          <br />
          <span className="bg-gradient-to-r from-orange-200 via-orange-300 to-yellow-300 bg-clip-text text-transparent">
            Forts of Maharashtra
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto font-light leading-relaxed">
          Discover offbeat forts, breathtaking trekking trails, and insider travel tips. 
          <br className="hidden md:block" />
          Plan your next epic adventure in the majestic Sahyadris.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <Link
            to="/forts"
            className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 flex items-center gap-3"
          >
            <span>Explore Forts</span>
            <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          </Link>
          
          <Link
            to="/blog-list"
            className="group px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-full font-semibold text-lg transition-all duration-300 hover:bg-white/20 hover:scale-105 flex items-center gap-3"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.01M15 10h1.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Blog List</span>
          </Link>
        </div>

        {/* Feature Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">10+</div>
            <div className="text-white/60 text-sm uppercase tracking-wide">Historic Forts</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">5+</div>
            <div className="text-white/60 text-sm uppercase tracking-wide">Trek Routes</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">24/7</div>
            <div className="text-white/60 text-sm uppercase tracking-wide">Travel Support</div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
      `}</style>
    </header>
  );
};

export default Hero;