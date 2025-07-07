import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-center">BJJ Timer: The Ultimate Timer for Jiu-Jitsu Training</h1>
        <p className="text-xl md:text-2xl text-gray-400 mb-10 text-center max-w-2xl">
          Take your BJJ rounds, sparring, and classes to the next level with a beautiful, customizable, and distraction-free timer app built for the grappling community.
        </p>
        <button
          className="px-10 py-4 bg-blue-700 hover:bg-blue-800 text-white text-2xl font-bold rounded-lg shadow-lg border border-blue-600 mb-12"
          onClick={() => navigate('/app')}
        >
          Try it for Free
        </button>
        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full mt-8">
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 text-center">
            <div className="text-4xl mb-3">⏱️</div>
            <h3 className="text-xl font-bold mb-2">Multi-Round & Custom Timers</h3>
            <p className="text-gray-400">Set up rounds, rest periods, and custom durations for any BJJ scenario—sparring, drills, or open mat.</p>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 text-center">
            <div className="text-4xl mb-3">📱</div>
            <h3 className="text-xl font-bold mb-2">Works on Any Device</h3>
            <p className="text-gray-400">Use it on your phone, tablet, or laptop. No downloads, no distractions—just pure training focus.</p>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 text-center">
            <div className="text-4xl mb-3">🥋</div>
            <h3 className="text-xl font-bold mb-2">Built for the BJJ Community</h3>
            <p className="text-gray-400">Designed by grapplers, for grapplers. Perfect for solo drills, group classes, and competition prep.</p>
          </div>
        </div>
      </div>
      {/* Footer */}
      <footer className="py-6 text-center text-gray-500 border-t border-gray-800">
        &copy; {new Date().getFullYear()} BJJ Timer. Made for the Jiu-Jitsu community.
      </footer>
    </div>
  );
} 