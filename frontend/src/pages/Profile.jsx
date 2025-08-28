import { useEffect, useState, useContext } from 'react';
import API from '../api/axios';
import { AuthContext } from '../context/authcontext';

const Profile = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get('/users/me');
        setProfile(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, []);

  if (!profile) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow w-96 text-center">
        <h2 className="text-2xl mb-4">Profile</h2>
        <p><strong>Username:</strong> {profile.username}</p>
        <p><strong>Email:</strong> {profile.email}</p>
        <p><strong>Created At:</strong> {new Date(profile.createdAt).toLocaleDateString()}</p>
        <button onClick={logoutUser} className="mt-4 w-full bg-red-500 text-white py-2 rounded">Logout</button>
      </div>
    </div>
  );
};

export default Profile;
