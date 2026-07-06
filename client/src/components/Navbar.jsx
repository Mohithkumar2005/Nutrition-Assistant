/* components/Navbar.jsx */
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="bg-emerald-600 p-4 text-white shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold tracking-tight">NutriAssist</Link>
        <div className="space-x-6">
          {token ? (
            <>
              <Link to="/home" className="hover:text-emerald-200">Dashboard</Link>
              <Link to="/profile" className="hover:text-emerald-200">Profile</Link>
              <button onClick={logout} className="bg-emerald-700 px-4 py-2 rounded hover:bg-emerald-800 transition">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-emerald-200">Login</Link>
              <Link to="/register" className="bg-white text-emerald-600 px-4 py-2 rounded font-semibold hover:bg-gray-100">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;