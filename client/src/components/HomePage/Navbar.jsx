import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="bg-black text-white shadow-md px-6 py-4 flex justify-between items-center">
      <div className="text-2xl font-bold">
        <Link to="/" className="text-white hover:text-gray-300 transition duration-200">ReVogue</Link>
      </div>

      <ul className="hidden md:flex space-x-6">
        <li>
          <Link to="/" className={`text-white hover:text-gray-300 transition duration-200 ${location.pathname === '/' ? 'text-gray-300' : ''}`}>Home</Link>
        </li>
        <li>
          <Link to="/products" className={`text-white hover:text-gray-300 transition duration-200 ${location.pathname === '/products' ? 'text-gray-300' : ''}`}>Products</Link>
        </li>
        <li>
          <Link to="/rent" className={`text-white hover:text-gray-300 transition duration-200 ${location.pathname === '/rent' ? 'text-gray-300' : ''}`}>Rent/Lend</Link>
        </li>
        <li>
          <Link to="/resell" className={`text-white hover:text-gray-300 transition duration-200 ${location.pathname === '/resell' ? 'text-gray-300' : ''}`}>Resell</Link>
        </li>
        <li>
          <Link to="/cart" className={`text-white hover:text-gray-300 transition duration-200 ${location.pathname === '/cart' ? 'text-gray-300' : ''}`}>Cart</Link>
        </li>
        <li>
          <Link to="/profile" className={`text-white hover:text-gray-300 transition duration-200 ${location.pathname === '/profile' ? 'text-gray-300' : ''}`}>Profile</Link>
        </li>
      </ul>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button className="text-white focus:outline-none hover:text-gray-300 transition duration-200">
          ☰
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
