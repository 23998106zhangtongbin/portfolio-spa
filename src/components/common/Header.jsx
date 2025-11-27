import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Header() {
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-secondary">
            MyPortfolio
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-6">
            <NavLink to="/" className={({ isActive }) => isActive ? 'text-primary font-medium' : 'hover:text-primary'}>
              Home
            </NavLink>
            <NavLink to="/projects" className={({ isActive }) => isActive ? 'text-primary font-medium' : 'hover:text-primary'}>
              Projects
            </NavLink>
            <NavLink to="/blog" className={({ isActive }) => isActive ? 'text-primary font-medium' : 'hover:text-primary'}>
              Blog
            </NavLink>
            <NavLink to="/contact" className={({ isActive }) => isActive ? 'text-primary font-medium' : 'hover:text-primary'}>
              Contact
            </NavLink>

            {/* Auth Links */}
            {isAuthenticated ? (
              <>
                <NavLink to="/admin" className={({ isActive }) => isActive ? 'text-primary font-medium' : 'hover:text-primary'}>
                  Admin
                </NavLink>
                <button
                  onClick={logout}
                  className="text-red-500 hover:text-red-700 font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login" className={({ isActive }) => isActive ? 'text-primary font-medium' : 'hover:text-primary'}>
                  Login
                </NavLink>
                <NavLink to="/register" className={({ isActive }) => isActive ? 'text-primary font-medium' : 'hover:text-primary'}>
                  Register
                </NavLink>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}