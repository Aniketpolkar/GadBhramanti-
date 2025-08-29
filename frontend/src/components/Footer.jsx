const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-orange-400 to-red-500 text-white py-6 mt-12">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        {/* Left Section */}
        <div className="text-center md:text-left mb-4 md:mb-0">
          <h1 className="text-xl font-bold">GadBhramanti</h1>
          <p className="text-sm mt-1">Explore the forts of Maharashtra</p>
        </div>

        {/* Right Section */}
        <div className="text-center md:text-right text-sm">
          <p>© {new Date().getFullYear()} GadBhramanti. All rights reserved.</p>
          <p className="mt-1">Founder: Aniket Polkar</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
