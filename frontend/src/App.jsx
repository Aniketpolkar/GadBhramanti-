import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/authcontext';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import Navbar from './components/Navbar';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
         <Route path="/" element={<Home />} />
          <Route path="/login" element={<><Navbar /><Login /></>} />
          <Route path="/register" element={<><Navbar /><Register /></>} />
          <Route
            path="/profile"
            element={<PrivateRoute><Profile /></PrivateRoute>}
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
