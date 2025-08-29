import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/authcontext';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import FortList from './pages/FortList';
import FortDetail from './pages/FortDetail';
import 'leaflet/dist/leaflet.css';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter >
        <Routes>
         <Route path="/" element={<Home />} />
          <Route path="/login" element={<><Navbar /><Login /></>} />
          <Route path="/register" element={<><Navbar /><Register /></>} />
          <Route
            path="/profile"
            element={<PrivateRoute><Navbar/><Profile /></PrivateRoute>}
          />
          <Route path="/forts" element={<><Navbar/><FortList /></>} />
          <Route path="/forts/:id" element={<><Navbar/><FortDetail /></>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
