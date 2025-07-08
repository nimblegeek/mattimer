import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';

export default function LandingPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleTry = () => {
    setLoading(true);
    setProgress(0);
    let prog = 0;
    const interval = setInterval(() => {
      prog += Math.random() * 20 + 10;
      if (prog >= 100) {
        setProgress(100);
        clearInterval(interval);
        setTimeout(() => navigate('/app'), 400);
      } else {
        setProgress(prog);
      }
    }, 200);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navbar />
      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-center">
          Remote-controlled timer for 
          <span className="font-black" style={{ color: '#60A5FA' }}> martial artists</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-400 mb-10 text-center max-w-2xl">
          Take your BJJ rounds, sparring, and classes to the next level with a beautiful, customizable, and distraction-free timer app built for the grappling community.
        </p>
        <button
          className="px-10 py-4 bg-blue-700 hover:bg-blue-800 text-white text-2xl font-bold rounded-lg shadow-lg border border-blue-600 mb-12"
          onClick={handleTry}
          disabled={loading}
        >
          Try it out for free in the browser
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
      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black/90 flex flex-col items-center justify-center z-50">
          <div className="text-2xl md:text-3xl font-bold mb-8 text-white">Loading MatTimer in your browser…</div>
          <div className="w-64 h-4 bg-gray-800 rounded-full overflow-hidden border border-gray-700">
            <div
              className="h-full bg-blue-600 transition-all duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
} 