import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const NavBar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-gray-800 p-4">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex-shrink-0">
            <Link to="/" className="text-white font-bold text-xl mx-5">Comment system</Link>
          </div>
          <div>
            <ul className="flex space-x-4">
              <li>
                <Link to="/" className="text-white hover:text-gray-300">Home</Link>
              </li>
              {user ? (
                <>
                  <li className="text-white">Welcome, {user.name}</li>
                  <li>
                    <button onClick={logout} className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded focus:outline-none">Logout</button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/login" className="text-white hover:text-gray-300">Login</Link>
                  </li>
                  <li>
                    <Link to="/register" className="text-white hover:text-gray-300">Register</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
