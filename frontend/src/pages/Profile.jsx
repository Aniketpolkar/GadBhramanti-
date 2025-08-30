import { useEffect, useState, useContext } from 'react';
import API from '../api/axios';
import { AuthContext } from '../context/AuthContext';

const Profile = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get('/users/me');
        setProfile(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center">
      <p className="text-orange-700 text-lg">Loading profile...</p>
    </div>
  );

  if (!profile) return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center">
      <p className="text-gray-600 text-lg">Profile not found</p>
    </div>
  );

  return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        
        {/* Compact Profile Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          
          {/* Header Section */}
          <div className="bg-gradient-to-r from-orange-500 to-red-500 px-6 py-4">
            <div className="flex items-center">
              {/* Profile Picture */}
              <img 
                src={profile.profilePic} 
                alt="Profile" 
                className="w-26 h-26 rounded-full border-2 border-white shadow object-cover mr-4"
              />
              
              {/* Basic Info */}
              <div className="flex-1 text-lg text-white">
                <h1 className="text-2xl font-bold">{profile.username}</h1>
                <p className="text-orange-100 ">{profile.email}</p>
                {profile.city && <p className="text-orange-100 ">{profile.city}</p>}
              </div>

              {/* Logout Button */}
              <button 
                onClick={logoutUser} 
                className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition text-lg font-medium"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Content Section */}
          
          <div className="p-6">
          
            <div className="grid md:grid-cols-3 gap-6">
              {/* Account Info Sidebar */}
              <div className="border-1 border-red-500 mx-1">
              <div className="bg-gray-50 text-lg p-4 rounded-lg ">
                <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                  <span className="mr-2">ℹ️</span> Account Info
                </h3>
                
                <div className="space-y-2 text-lg">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Username:</span>
                    <span className="text-gray-800 font-medium">{profile.username}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email:</span>
                    <span className="text-gray-800 text-sm truncate max-w-32" title={profile.email}>
                      {profile.email}
                    </span>
                  </div>
                  
                  {profile.city && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">City:</span>
                      <span className="text-gray-800">{profile.city}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Joined:</span>
                    <span className="text-gray-800">
                      {new Date(profile.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                </div>
              </div>
              </div>

              {/* Bio Section */}
              <div className="md:col-span-2">
                {profile.bio ? (
                  <div className="mb-4 text-lg">
                    <h3 className="font-semibold text-gray-800 mb-2 flex items-center">
                      <span className="mr-2"></span> About
                    </h3>
                    <p className="text-gray-700  leading-relaxed">{profile.bio}</p>
                  </div>
                ) : (
                  <div className="mb-4 text-lg">
                    <h3 className="font-semibold text-gray-800 mb-2 flex items-center">
                      <span className="mr-2"></span> About
                    </h3>
                    <p className="text-gray-500 text-sm italic">No bio added yet</p>
                  </div>
                )}
                <hr className="border-t-2 border-red-500 border-dashed my-4" />

                {/* Wishlist */}
                <div >
                  <h3 className="font-semibold text-lg text-gray-800 mb-2 flex items-center">
                    <span className="mr-2">❤️</span> 
                    Wishlist ({profile.wishlist?.length || 0})
                  </h3>
                  
                  {profile.wishlist?.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {profile.wishlist.slice(0, 8).map(fort => (
                        <span 
                          key={fort._id} 
                          className="bg-orange-100 text-orange-700 px-2 py-1 rounded border border-orange-200"
                        >
                          {fort.name}
                        </span>
                      ))}
                      {profile.wishlist.length > 8 && (
                        <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                          +{profile.wishlist.length - 8} more
                        </span>
                      )}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-lg">No forts in wishlist</p>
                  )}
                </div>
                <hr className="border-t-2 border-red-500 border-dashed my-4" />
                {/* Visited */}
                <div>
                  <h3 className="font-semibold text-lg text-gray-800 mb-2 flex items-center">
                    <span className="mr-2">✅</span> 
                    Visited ({profile.visited?.length || 0})
                  </h3>
                  
                  {profile.visited?.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {profile.visited.slice(0, 8).map(fort => (
                        <span 
                          key={fort._id} 
                          className="bg-orange-100 text-orange-700 px-2 py-1 rounded border border-orange-200"
                        >
                          {fort.name}
                        </span>
                      ))}
                      {profile.visited.length > 8 && (
                        <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                          +{profile.visited.length - 8} more
                        </span>
                      )}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-lg">No forts visited </p>
                  )}
                </div>
              </div>

              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;