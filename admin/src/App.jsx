import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AdminAuthProvider } from './context/AdminAuthContext';
import PrivateRoute from './components/AdminPrivateRoute';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import ManageForts from './pages/ManageForts';
import ManageComments from './pages/ManageComments';
import AdminRegister from "./pages/AdminRegister";
import AddFort from './pages/AddFort';
import AdminNavbar from './components/AdminNavbar';
import AdminFooter from './components/AdminFooter';
import EditFort from './pages/EditFort';

function App() {
  return (
   <AdminAuthProvider>
         <BrowserRouter >
      <Routes>
        <Route path="/" element={<><AdminNavbar/><AdminLogin /></>} />
         <Route path="/admin-login" element={<><AdminNavbar/><AdminLogin /><AdminFooter/></>} />
         <Route path="/admin-register" element={<><AdminNavbar/><AdminRegister /><AdminFooter/></>} />
        <Route path="/admin-dashboard" element={<><AdminNavbar/><AdminDashboard /><AdminFooter/></>} />
        <Route path="/manage-forts" element={<><AdminNavbar/><ManageForts /><AdminFooter/></>} />
        <Route path="/manage-comments" element={<><AdminNavbar/><ManageComments /><AdminFooter/></>} />
        <Route path="/add-fort" element={<><AdminNavbar/><AddFort /><AdminFooter/></>} />
        <Route path="/edit-fort/:id" element={<><AdminNavbar/><EditFort /><AdminFooter/></>} />
      </Routes>
     </BrowserRouter>
    </AdminAuthProvider>
  );
}

export default App;
