import React from 'react';
import { Link } from 'react-router-dom';

import { useState } from 'react';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  return (
    <nav className="w-full bg-black border-b border-gray-800 px-6 py-3 flex items-center justify-between z-50 relative">
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
            {/* Main arc */}
            <path
              d="M6 20 A10 10 0 1 1 22 8"
              stroke="url(#timerArc)"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
            />
            {/* Subtle inner circle */}
            <circle
              cx="14" cy="14" r="7.5"
              stroke="#60a5fa"
              strokeWidth="1.2"
              fill="none"
              opacity="0.18"
            />
            {/* Tick/notch at top (12 o'clock) */}
            <line
              x1="14" y1="3.5" x2="14" y2="7.5"
              stroke="#60a5fa"
              strokeWidth="2.2"
              strokeLinecap="round"
              opacity="0.85"
            />
          </svg>
        </span>
        <span className="text-xl font-bold text-white tracking-tight">MatTimer.com</span>
      </Link>
      {/* Centered Links (desktop) */}
      <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 gap-8">
        <a href="#about" className="text-gray-300 hover:text-blue-400 text-lg font-medium transition-colors">About</a>
        <a href="#pricing" className="text-gray-300 hover:text-blue-400 text-lg font-medium transition-colors">Pricing</a>
        <a href="#blog" className="text-gray-300 hover:text-blue-400 text-lg font-medium transition-colors">Blog</a>
        <a href="#community" className="text-gray-300 hover:text-blue-400 text-lg font-medium transition-colors">Community</a>
      </div>
      {/* Burger menu for mobile */}
      <div className="md:hidden flex items-center">
        <button
          className="text-gray-300 hover:text-blue-400 focus:outline-none"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Open navigation menu"
        >
          <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>
        {menuOpen && (
          <div className="absolute top-full left-0 w-full bg-black border-b border-gray-800 shadow-lg z-50 animate-fade-in">
            <div className="flex flex-col items-center py-4 gap-4">
              <a href="#about" className="text-gray-300 hover:text-blue-400 text-lg font-medium transition-colors" onClick={() => setMenuOpen(false)}>About</a>
              <a href="#pricing" className="text-gray-300 hover:text-blue-400 text-lg font-medium transition-colors" onClick={() => setMenuOpen(false)}>Pricing</a>
              <a href="#blog" className="text-gray-300 hover:text-blue-400 text-lg font-medium transition-colors" onClick={() => setMenuOpen(false)}>Blog</a>
              <a href="#community" className="text-gray-300 hover:text-blue-400 text-lg font-medium transition-colors" onClick={() => setMenuOpen(false)}>Community</a>
            </div>
          </div>
        )}
      </div>
      {/* Sign Up / Login always right */}
      <div className="flex items-center gap-3 md:gap-6">
        <Link to="/signup" className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg font-semibold border border-blue-600 transition-colors">Sign Up</Link>
        <Link to="/login" className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-blue-400 rounded-lg font-semibold border border-blue-600 transition-colors">Login</Link>
      </div>
    </nav>
  );
} 