import React from 'react';
import { Plus, Settings, Play, Pause, Trash2, Clock } from 'lucide-react';

interface Timer {
  id: string;
  name: string;
  duration: number;
  isRunning: boolean;
  currentTime: number;
  type: 'boxing' | 'mma' | 'custom' | 'tabata';
}

interface TimerSidebarProps {
  timers: Timer[];
  activeTimerId: string | null;
  onSelectTimer: (id: string) => void;
  onDeleteTimer: (id: string) => void;
  onAddTimer: () => void;
  onToggleTimer: (id: string) => void;
}

export default function TimerSidebar({ 
  timers, 
  activeTimerId, 
  onSelectTimer, 
  onDeleteTimer, 
  onAddTimer, 
  onToggleTimer 
}: TimerSidebarProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimerTypeColor = (type: string) => {
    switch (type) {
      case 'boxing': return 'bg-red-600';
      case 'mma': return 'bg-orange-600';
      case 'tabata': return 'bg-green-600';
      default: return 'bg-blue-600';
    }
  };

  const getTimerTypeIcon = (type: string) => {
    return <Clock size={16} />;
  };

  return (
    <div className="bg-gray-900 border-r border-gray-700 p-6 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white mb-2">Martial Arts Timer</h1>
        <p className="text-gray-400 text-sm">Professional training timer</p>
      </div>

      <button
        onClick={onAddTimer}
        className="w-full flex items-center justify-center gap-2 p-3 bg-green-600 hover:bg-green-700 rounded-lg transition-colors duration-200 mb-6"
      >
        <Plus size={20} />
        Add Timer
      </button>

      <div className="space-y-3">
        {timers.map((timer) => (
          <div
            key={timer.id}
            className={`p-4 rounded-lg border transition-all duration-200 cursor-pointer hover:bg-gray-800 ${
              activeTimerId === timer.id
                ? 'border-blue-500 bg-blue-900/20'
                : 'border-gray-700 bg-gray-800'
            }`}
            onClick={() => onSelectTimer(timer.id)}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${getTimerTypeColor(timer.type)}`} />
                <h3 className="font-medium text-white text-sm">{timer.name}</h3>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleTimer(timer.id);
                  }}
                  className="p-1 hover:bg-gray-700 rounded transition-colors"
                >
                  {timer.isRunning ? (
                    <Pause size={14} className="text-orange-400" />
                  ) : (
                    <Play size={14} className="text-green-400" />
                  )}
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteTimer(timer.id);
                  }}
                  className="p-1 hover:bg-gray-700 rounded transition-colors"
                >
                  <Trash2 size={14} className="text-red-400" />
                </button>
              </div>
            </div>
            
            <div className="text-xs text-gray-400 mb-2 uppercase tracking-wider">
              {timer.type}
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-2xl font-mono font-bold text-white">
                {formatTime(timer.currentTime)}
              </span>
              <span className="text-sm text-gray-400">
                / {formatTime(timer.duration)}
              </span>
            </div>
            
            <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
              <div
                className={`h-2 rounded-full transition-all duration-300 ${
                  timer.isRunning ? 'bg-green-500' : 'bg-gray-500'
                }`}
                style={{
                  width: `${((timer.duration - timer.currentTime) / timer.duration) * 100}%`
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {timers.length === 0 && (
        <div className="text-center py-8 text-gray-400">
          <Clock size={48} className="mx-auto mb-4 opacity-50" />
          <p className="text-sm">No timers created yet</p>
          <p className="text-xs mt-1">Add your first timer to get started</p>
        </div>
      )}
    </div>
  );
}