import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { navLinks } from "../navLinks";
import MobileMenuModal from "./MoreOptionsModal";
import { useAuth } from "../features/auth/context/AuthContext";

interface NavLink {
  to: string;
  label: string;
}

const AnimatedLogo: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();

  // Function to get user initials - since we don't have names, we'll use email initials
  const getUserInitials = () => {
    if (!user?.email) return '';
    const emailParts = user.email.split('@')[0];
    return emailParts.substring(0, 2).toUpperCase();
  };

  // Handle Escape key & body scroll lock
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };

    if (isMenuOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  return (
    <>
      <header className="w-full fixed top-0 left-0 z-50 bg-white/95 border-b border-gray-200 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            
            {/* Logo Section */}
            <Link
              to="/"
              aria-label="Go to home"
              className="flex items-center space-x-3"
            >
              <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center shadow-md">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0a2 2 0 012 2v8a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2z"
                  />
                </svg>
              </div>
              <span className="text-2xl font-bold text-gray-800 tracking-wide">
                PATHMATCH
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map((link: NavLink) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`text-gray-700 hover:text-red-600 font-medium text-base transition-colors duration-200 ${
                    location.pathname === link.to ? "text-red-600" : ""
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              
              {/* User Authentication Section */}
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  {/* User Initials */}
                  {user && (
                    <>
                      <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {getUserInitials()}
                      </div>
                      {/* User Email */}
                      <span className="text-gray-700 font-medium">
                        {user.email}
                      </span>
                      {/* User Role */}
                      <span className="text-gray-500 text-sm">
                        ({user.role})
                      </span>
                    </>
                  )}
                  {/* Logout Button */}
                  <button
                    onClick={logout}
                    className="text-gray-500 hover:text-red-600 font-medium text-base transition-colors duration-200"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  to="/auth"
                  className="bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded-lg transition-colors duration-200"
                >
                  Sign In
                </Link>
              )}
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(true)}
                className="text-gray-700 hover:text-red-600 transition-colors"
                aria-label="Open menu"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Modal */}
      {isMenuOpen && (
        <MobileMenuModal
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          currentPath={location.pathname}
        />
      )}
    </>
  );
};

export default AnimatedLogo;