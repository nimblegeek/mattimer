import React from 'react';
import { Play, Pause, Square, RotateCcw } from 'lucide-react';

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
  fullscreen = false
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

  return (
    <div className={
      `${getBackgroundColor()} rounded-lg border-2 transition-all duration-300 shadow-lg ` +
      (fullscreen ? 'w-full h-full flex flex-col justify-center items-center p-0 m-0' : 'p-8')
    }>
      <div className="text-center">
        <div className="mb-6">
          <h2 className={`${fullscreen ? 'text-6xl mb-8' : 'text-3xl mb-2'} font-bold text-white`}>{timerName}</h2>
          <div className={`text-sm font-semibold uppercase tracking-wider ${getPhaseColor()} bg-gray-800 px-3 py-1 rounded-lg inline-block`}>
            {phase}
          </div>
        </div>
        
        <div className={`${fullscreen ? 'text-[16vw] md:text-[12vw] mb-16' : 'text-8xl md:text-9xl mb-8'} font-mono font-bold ${getPhaseColor()} transition-colors duration-200 drop-shadow-lg`}>
          {formatTime(time)}
        </div>

        <div className={`flex justify-center gap-4 ${fullscreen ? 'mb-16' : 'mb-8'}`}>
          <button
            onClick={isRunning ? onPause : onStart}
            className={`transition-all duration-200 hover:scale-105 shadow-lg border-2 rounded-lg ${fullscreen ? 'p-10 text-4xl' : 'p-5'} ${
              isRunning 
                ? 'bg-orange-600 hover:bg-orange-700 border-orange-500' 
                : 'bg-green-600 hover:bg-green-700 border-green-500'
            }`}
          >
            {isRunning ? <Pause size={fullscreen ? 56 : 28} /> : <Play size={fullscreen ? 56 : 28} />}
          </button>
          
          <button
            onClick={onReset}
            className={`bg-blue-600 hover:bg-blue-700 transition-all duration-200 hover:scale-105 shadow-lg border-2 border-blue-500 rounded-lg ${fullscreen ? 'p-10 text-4xl' : 'p-5'}`}
          >
            <RotateCcw size={fullscreen ? 56 : 28} />
          </button>
          
          <button
            onClick={onStop}
            className={`bg-red-600 hover:bg-red-700 transition-all duration-200 hover:scale-105 shadow-lg border-2 border-red-500 rounded-lg ${fullscreen ? 'p-10 text-4xl' : 'p-5'}`}
          >
            <Square size={fullscreen ? 56 : 28} />
          </button>
        </div>

        <div className="flex justify-center gap-3">
          <button className={`${fullscreen ? 'px-8 py-4 text-2xl' : 'px-4 py-2 text-sm'} bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors border border-gray-600 font-medium`}>
            -1m
          </button>
          <button className={`${fullscreen ? 'px-8 py-4 text-2xl' : 'px-4 py-2 text-sm'} bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors border border-gray-600 font-medium`}>
            -10s
          </button>
          <button className={`${fullscreen ? 'px-8 py-4 text-2xl' : 'px-4 py-2 text-sm'} bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors border border-gray-600 font-medium`}>
            +10s
          </button>
          <button className={`${fullscreen ? 'px-8 py-4 text-2xl' : 'px-4 py-2 text-sm'} bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors border border-gray-600 font-medium`}>
            +1m
          </button>
        </div>
      </div>
    </div>
  );
}