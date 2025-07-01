
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import ClimbingIcon from './ClimbingIcon';

const Header = () => {
  const location = useLocation();
  
  return (
    <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            <ClimbingIcon className="text-orange-600" size={32} />
            <span>클라이밋</span>
          </Link>
          
          <div className="flex items-center space-x-6">
            <Link 
              to="/meetups" 
              className={`text-gray-600 hover:text-orange-600 transition-colors ${
                location.pathname.startsWith('/meetups') ? 'text-orange-600 font-semibold' : ''
              }`}
            >
              모임
            </Link>
            <Link 
              to="/gyms" 
              className={`text-gray-600 hover:text-orange-600 transition-colors ${
                location.pathname.startsWith('/gyms') ? 'text-orange-600 font-semibold' : ''
              }`}
            >
              암장
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
