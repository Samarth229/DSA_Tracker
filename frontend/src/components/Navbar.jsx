import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/topics');
  };

  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <Link to="/topics" className="navbar-brand">
          DSA Tracker
        </Link>
        <div className="navbar-links">
          <Link to="/topics">Topics</Link>
          {user ? (
            <>
              <Link to="/dashboard">Dashboard</Link>
              <button className="btn btn-secondary btn-sm" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register" className="btn btn-primary btn-sm">
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
