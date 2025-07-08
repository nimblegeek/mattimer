import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="w-full bg-black border-b border-gray-800 px-6 py-3 flex items-center justify-between z-50">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2 select-none">
        {/* Circular timer SVG */}
        <span className="inline-block w-10 h-10 rounded-full bg-gradient-to-tr from-blue-700 to-blue-400 flex items-center justify-center">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="timerArc" x1="0" y1="0" x2="28" y2="28" gradientUnits="userSpaceOnUse">
                <stop stopColor="#60a5fa" />
                <stop offset="1" stopColor="#2563eb" />
              </linearGradient>
            </defs>
            <path
              d="M6 20
                A10 10 0 1 1 22 8"
              stroke="url(#timerArc)"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        </span>
        <span className="text-xl font-bold text-white tracking-tight">MatTimer.com</span>
      </Link>
      {/* Links */}
      <div className="flex items-center gap-6">
        <Link to="/" className="text-gray-300 hover:text-blue-400 text-lg font-medium transition-colors">Home</Link>
        <a href="#features" className="text-gray-300 hover:text-blue-400 text-lg font-medium transition-colors">Features</a>
        <a href="#about" className="text-gray-300 hover:text-blue-400 text-lg font-medium transition-colors">About</a>
        <a href="#contact" className="text-gray-300 hover:text-blue-400 text-lg font-medium transition-colors">Contact</a>
        <Link to="/signup" className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg font-semibold border border-blue-600 transition-colors">Sign Up</Link>
        <Link to="/login" className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-blue-400 rounded-lg font-semibold border border-blue-600 transition-colors">Login</Link>
      </div>
    </nav>
  );
} 