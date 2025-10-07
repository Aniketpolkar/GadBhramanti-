import React from 'react';
import { MapPin, Users, Award, Globe, Heart, Star, Landmark } from 'lucide-react';

const AboutPage = () => {
  const teamMembers = [
    {
      name: "Aniket Polkar",
      role: "Founder & Trek  Coordinator",
      image: "https://res.cloudinary.com/dle4nbom5/image/upload/v1757280110/IMG_3323_2_ikeprv.jpg",
      bio: "Passionate fort explorer and heritage enthusiast, Aniket started GadBhramanti to showcase the pride of Maharashtra – its forts."
    },
    {
      name: "Prajyot Waghmare",
      role: "President - लावा ताकद संघटना",
      image: "https://res.cloudinary.com/dle4nbom5/image/upload/v1757280912/IMG-20250330-WA0037_g8kwu5.jpg",
      bio: "Worked as President for last 2 years.   Certified trek leader who organizes fort treks, heritage walks, and educational tours for enthusiasts."
    },
    {
      name: "Om Sane",
      role: "Community Manager",
      image: "https://res.cloudinary.com/dle4nbom5/image/upload/v1757017437/IMG-20250330-WA0171_h3yq2x.jpg",
      bio: "Engages with our growing community of fort lovers and ensures our stories reach thousands of explorers."
    }
  ];

  const stats = [
    { icon: Landmark, value: "30+", label: "Forts Documented" },
    { icon: Users, value: "250+", label: "Heritage Enthusiasts" },
    { icon: Award, value: "5+", label: "Cultural Recognitions" },
    { icon: Star, value: "4.6/5", label: "Community Rating" }
  ];

  const values = [
    {
      title: "Preserving Heritage",
      description: "Our mission is to create awareness about Maharashtra’s forts and their historical importance.",
      icon: Heart
    },
    {
      title: "Authentic Information",
      description: "We provide well-researched content about forts, Maratha warriors, and untold stories.",
      icon: Globe
    },
    {
      title: "Community of Explorers",
      description: "We believe in connecting like-minded fort lovers through treks, events, and cultural discussions.",
      icon: Award
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      {/* Hero Section */}
      
      <hr className='bg-white h-22'/>
      <div className="relative h-96 bg-gradient-to-r from-orange-600 to-red-500 overflow-hidden">
        <div className="absolute inset-0 bg-red-900 bg-opacity-40"></div>
        <div className="relative z-10 flex items-center justify-center h-full text-white text-center px-4">
          <div>
            <h1 className="text-5xl font-bold mb-4">About GadBhramanti</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Showcasing the pride of Maharashtra – exploring, documenting, and celebrating our majestic forts
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 w-full h-20 bg-gradient-to-t from-white to-transparent"></div>
      </div>

      <div className="container mx-auto px-6 py-16">
        {/* Mission Section */}
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">Our Mission</h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            GadBhramanti is dedicated to reviving interest in the forts of Maharashtra – the symbols of valor, history, and culture. 
            Our mission is to inspire new generations to learn, explore, and preserve these architectural marvels while building 
            a strong community of fort enthusiasts across the globe.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="text-center bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <IconComponent className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                <div className="text-3xl font-bold text-gray-800 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Our Story Section */}
        <div className="bg-white rounded-2xl p-12 shadow-lg mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-6">Our Story</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                GadBhramanti began with a simple passion – exploring forts and telling their stories. 
                Founder <span className="font-semibold">Aniket Polkar</span> started this journey by visiting 
                Maharashtra’s hidden forts and sharing authentic information online.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                What began as a personal exploration has now become a community-driven project 
                connecting thousands of fort lovers, trekkers, and history enthusiasts across India. 
                Today, GadBhramanti is proud to document over 350 forts with authentic stories, trekking 
                details, and cultural insights.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Our vision is clear – forts are not just ruins; they are living chapters of history that 
                need to be celebrated, studied, and preserved.
              </p>
            </div>
            <div className="relative">
              <img 
                src="https://res.cloudinary.com/dle4nbom5/image/upload/v1756313450/1200px-Nagarkhana_2C_Raigad_Fort_2C_India_ruejzm.jpg" 
                alt="Raigad Fort" 
                className="rounded-lg shadow-lg w-full h-80 object-cover"
              />
              <div className="absolute -bottom-4 -right-4 bg-orange-600 text-white p-6 rounded-lg">
                <MapPin className="w-8 h-8 mb-2" />
                <div className="font-bold">Since 2025</div>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div key={index} className="bg-white rounded-xl p-8 shadow-lg text-center hover:shadow-xl transition-shadow">
                  <IconComponent className="w-16 h-16 text-red-500 mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-88 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{member.name}</h3>
                  <p className="text-orange-600 font-semibold mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-orange-600 to-red-500 rounded-2xl p-12 text-center text-white">
          <h2 className="text-4xl font-bold mb-6">Join the Journey of Forts</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Be part of GadBhramanti and explore the pride of Maharashtra. 
            Discover hidden forts, read their stories, and join our trekking adventures.
          </p>
          <div className="space-x-4">
            <button className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Explore Forts
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-orange-600 transition-colors">
              Join Community
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
