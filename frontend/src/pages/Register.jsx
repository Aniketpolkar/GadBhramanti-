import { useState, useContext } from 'react';
import API from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authcontext';

const Register = () => {
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await API.post('/auth/register', form);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Error occurred');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow w-80">
        <h2 className="text-2xl mb-4 text-center">Register</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <input name="username" placeholder="Username" value={form.username} onChange={handleChange} className="w-full mb-2 p-2 border rounded" />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} className="w-full mb-2 p-2 border rounded" />
        <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} className="w-full mb-4 p-2 border rounded" />
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">Register</button>
      </form>
    </div>
  );
};

export default Register;
