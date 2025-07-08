import React from 'react';
import { Play, Pause, Square, RotateCcw, X } from 'lucide-react';

interface TimerDisplayProps {
  time: number;
  isRunning: boolean;
  isActive: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onStop: () => void;
  timerName: string;
  phase: 'ready' | 'active' | 'rest' | 'finished';
  fullscreen?: boolean;
  adjustTime?: (adjustment: number) => void;
}

export default function TimerDisplay({ 
  time, 
  isRunning, 
  isActive,
  onStart, 
  onPause, 
  onReset, 
  onStop,
  timerName,
  phase,
  fullscreen = false,
  adjustTime
}: TimerDisplayProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(Math.abs(seconds) / 60);
    const secs = Math.floor(Math.abs(seconds) % 60);
    const sign = seconds < 0 ? '-' : '';
    return `${sign}${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getPhaseColor = () => {
    switch (phase) {
      case 'ready': return 'text-green-400';
      case 'active': return 'text-red-400';
      case 'rest': return 'text-blue-400';
      case 'finished': return 'text-orange-400';
      default: return 'text-gray-400';
    }
  };

  const getBackgroundColor = () => {
    switch (phase) {
      case 'ready': return 'bg-green-900/10 border-green-500/30';
      case 'active': return 'bg-red-900/10 border-red-500/30';
      case 'rest': return 'bg-blue-900/10 border-blue-500/30';
      case 'finished': return 'bg-orange-900/10 border-orange-500/30';
      default: return 'bg-gray-900/10 border-gray-500/30';
    }
  };

  // MatTimer.com logo SVG (copied from Navbar)
  const Logo = () => (
    <div className="flex items-center gap-2 select-none">
      <span className="inline-block w-8 h-8 rounded-full bg-gradient-to-tr from-blue-700 to-blue-400 flex items-center justify-center">
        <svg width="22" height="22" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="timerArc" x1="0" y1="0" x2="28" y2="28" gradientUnits="userSpaceOnUse">
              <stop stopColor="#60a5fa" />
              <stop offset="1" stopColor="#2563eb" />
            </linearGradient>
          </defs>
          <path d="M6 20 A10 10 0 1 1 22 8" stroke="url(#timerArc)" strokeWidth="4" fill="none" strokeLinecap="round" />
          <circle cx="14" cy="14" r="7.5" stroke="#60a5fa" strokeWidth="1.2" fill="none" opacity="0.18" />
          <line x1="14" y1="3.5" x2="14" y2="7.5" stroke="#60a5fa" strokeWidth="2.2" strokeLinecap="round" opacity="0.85" />
        </svg>
      </span>
      <span className="text-lg font-bold text-white tracking-tight">MatTimer.com</span>
    </div>
  );

  return (
    <div className={
      `${getBackgroundColor()} rounded-lg border-2 transition-all duration-300 shadow-lg relative ` +
      (fullscreen ? 'w-full h-full flex flex-col justify-center items-center p-0 m-0' : 'p-2 sm:p-4 md:p-8')
    }>
      {/* Logo top left */}
      <div className={
        'absolute top-4 left-4 z-20 ' +
        (fullscreen ? 'sm:top-8 sm:left-8' : '')
      }>
        <Logo />
      </div>
      <div className="text-center w-full flex flex-col items-center">
        <div className="mb-6">
          <h2 className={`${fullscreen ? 'text-6xl mb-8' : 'text-3xl mb-2'} font-bold text-white`}>{timerName}</h2>
          <div className={`text-sm font-semibold uppercase tracking-wider ${getPhaseColor()} bg-gray-800 px-3 py-1 rounded-lg inline-block`}>
            {phase}
          </div>
        </div>
        
        <div
          className={
            (fullscreen
              ? 'text-[22vw] sm:text-[14vw] md:text-[10vw] mb-16'
              : 'text-[22vw] sm:text-[14vw] md:text-[10vw] lg:text-[8vw] xl:text-[6vw] 2xl:text-[5vw] mb-8') +
            ' font-mono font-extrabold ' + getPhaseColor() + ' transition-colors duration-200 w-full text-center ' +
            'mobile-timer-number'
          }
          style={{ lineHeight: 1 }}
        >
          {formatTime(time)}
        </div>

        <div className={`flex flex-row sm:flex-row justify-center items-center gap-2 sm:gap-4 ${fullscreen ? 'mb-16' : 'mb-8'}`}>
          <button
            onClick={isRunning ? onPause : onStart}
            className={`transition-all duration-200 hover:scale-105 shadow-lg border-2 rounded-lg ${fullscreen ? 'p-10 text-4xl' : 'p-1 sm:p-3 sm:text-xl'} ${
              isRunning 
                ? 'bg-orange-600 hover:bg-orange-700 border-orange-500' 
                : 'bg-green-600 hover:bg-green-700 border-green-500'
            } mobile-timer-btn`}
          >
            {isRunning ? <Pause size={fullscreen ? 56 : 14} /> : <Play size={fullscreen ? 56 : 14} />}
          </button>
          <button
            onClick={onReset}
            className={`bg-blue-600 hover:bg-blue-700 transition-all duration-200 hover:scale-105 shadow-lg border-2 border-blue-500 rounded-lg ${fullscreen ? 'p-10 text-4xl' : 'p-1 sm:p-3 sm:text-xl'} mobile-timer-btn`}
          >
            <RotateCcw size={fullscreen ? 56 : 14} />
          </button>
          <button
            onClick={onStop}
            className={`bg-red-600 hover:bg-red-700 transition-all duration-200 hover:scale-105 shadow-lg border-2 border-red-500 rounded-lg ${fullscreen ? 'p-10 text-4xl' : 'p-1 sm:p-3 sm:text-xl'} mobile-timer-btn`}
          >
            <Square size={fullscreen ? 56 : 14} />
          </button>
        </div>

        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-2">
          <button
            className={`${fullscreen ? 'px-8 py-4 text-2xl' : 'px-3 py-2 text-xs sm:text-sm'} bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors border border-gray-600 font-medium`}
            onClick={() => adjustTime && adjustTime(-60)}
          >
            -1m
          </button>
          <button
            className={`${fullscreen ? 'px-8 py-4 text-2xl' : 'px-3 py-2 text-xs sm:text-sm'} bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors border border-gray-600 font-medium`}
            onClick={() => adjustTime && adjustTime(-30)}
          >
            -30s
          </button>
          <button
            className={`${fullscreen ? 'px-8 py-4 text-2xl' : 'px-3 py-2 text-xs sm:text-sm'} bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors border border-gray-600 font-medium`}
            onClick={() => adjustTime && adjustTime(30)}
          >
            +30s
          </button>
          <button
            className={`${fullscreen ? 'px-8 py-4 text-2xl' : 'px-3 py-2 text-xs sm:text-sm'} bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors border border-gray-600 font-medium`}
            onClick={() => adjustTime && adjustTime(60)}
          >
            +1m
          </button>
        </div>
      </div>
    </div>
  );
}