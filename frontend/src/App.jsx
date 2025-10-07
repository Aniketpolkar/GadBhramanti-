import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import FortList from './pages/FortList';
import About from './components/About'
import FortDetail from './pages/FortDetail';
import 'leaflet/dist/leaflet.css';
import AboutPage from './components/About';
import Footer from './components/Footer';
import Blog from './pages/Blog'
import BlogList from './pages/BlogList';
import BlogDetail from './pages/BlogDetail'
import Images from './pages/Images';
function App() {
  return (
    <AuthProvider>
      <BrowserRouter >
        <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/blog" element={<><Navbar /><Blog /></>} />
         <Route path="/blog-list" element={<><PrivateRoute><Navbar /><BlogList /></PrivateRoute></>} />
         <Route path="/blog/:id" element={<><PrivateRoute><Navbar /><BlogDetail /></PrivateRoute></>} />
          <Route path="/login" element={<><Navbar /><Login /><Footer /></>} />
          <Route path="/about" element={<><Navbar /><About /><Footer /></>} />
          <Route path="/images" element={<><PrivateRoute><Navbar/><Images /><Footer /></PrivateRoute></>} />
          <Route path="/register" element={<><Navbar /><Register /><Footer /></>} />
          <Route
            path="/profile"
            element={<PrivateRoute><Navbar/><Profile /></PrivateRoute>}
          />
          <Route path="/forts" element={<PrivateRoute><Navbar/><FortList /><Footer /></PrivateRoute>} />
          <Route path="/forts/:id" element={<PrivateRoute><Navbar/><FortDetail /><Footer /></PrivateRoute>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
