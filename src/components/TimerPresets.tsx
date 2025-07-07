import React from 'react';
import { Plus, Clock, Zap, Target } from 'lucide-react';

interface TimerPreset {
  id: string;
  name: string;
  type: 'boxing' | 'mma' | 'tabata' | 'custom';
  duration: number;
  rounds?: number;
  restTime?: number;
  description: string;
}

interface TimerPresetsProps {
  onSelectPreset: (preset: TimerPreset) => void;
  onClose: () => void;
}

export default function TimerPresets({ onSelectPreset, onClose }: TimerPresetsProps) {
  const presets: TimerPreset[] = [
    {
      id: 'boxing-3min',
      name: 'Boxing Round',
      type: 'boxing',
      duration: 180,
      rounds: 12,
      restTime: 60,
      description: '3 minutes work, 1 minute rest'
    },
    {
      id: 'mma-5min',
      name: 'MMA Round',
      type: 'mma',
      duration: 300,
      rounds: 5,
      restTime: 60,
      description: '5 minutes work, 1 minute rest'
    },
    {
      id: 'tabata-20s',
      name: 'Tabata',
      type: 'tabata',
      duration: 20,
      rounds: 8,
      restTime: 10,
      description: '20 seconds work, 10 seconds rest'
    },
    {
      id: 'muay-thai-3min',
      name: 'Muay Thai',
      type: 'boxing',
      duration: 180,
      rounds: 5,
      restTime: 120,
      description: '3 minutes work, 2 minutes rest'
    },
    {
      id: 'bjj-5min',
      name: 'BJJ Rolling',
      type: 'mma',
      duration: 300,
      rounds: 6,
      restTime: 60,
      description: '5 minutes rolling, 1 minute rest'
    },
    {
      id: 'hiit-30s',
      name: 'HIIT',
      type: 'tabata',
      duration: 30,
      rounds: 10,
      restTime: 30,
      description: '30 seconds work, 30 seconds rest'
    }
  ];

  const getPresetIcon = (type: string) => {
    switch (type) {
      case 'boxing': return <Target size={24} className="text-red-400" />;
      case 'mma': return <Zap size={24} className="text-orange-400" />;
      case 'tabata': return <Clock size={24} className="text-green-400" />;
      default: return <Plus size={24} className="text-blue-400" />;
    }
  };

  const getPresetColor = (type: string) => {
    switch (type) {
      case 'boxing': return 'border-red-500/50 bg-red-900/10 hover:bg-red-900/20';
      case 'mma': return 'border-orange-500/50 bg-orange-900/10 hover:bg-orange-900/20';
      case 'tabata': return 'border-green-500/50 bg-green-900/10 hover:bg-green-900/20';
      default: return 'border-blue-500/50 bg-blue-900/10 hover:bg-blue-900/20';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-gray-900 rounded-lg p-8 max-w-5xl w-full max-h-[85vh] overflow-y-auto border-2 border-gray-700 shadow-2xl">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-white">Timer Presets</h2>
          <button
            onClick={onClose}
            className="p-3 hover:bg-gray-800 rounded-lg transition-colors text-gray-400 border border-gray-600 hover:border-gray-500"
          >
            ×
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {presets.map((preset) => (
            <div
              key={preset.id}
              className={`p-6 rounded-lg border-2 transition-all duration-200 cursor-pointer hover:scale-105 shadow-lg ${getPresetColor(preset.type)}`}
              onClick={() => onSelectPreset(preset)}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-2 bg-gray-800 rounded-lg border border-gray-600">
                  {getPresetIcon(preset.type)}
                </div>
                <h3 className="font-bold text-white text-lg">{preset.name}</h3>
              </div>
              
              <p className="text-gray-300 text-sm mb-6 leading-relaxed">{preset.description}</p>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center p-2 bg-gray-800 rounded-lg border border-gray-600">
                  <span className="text-gray-400 font-medium">Duration:</span>
                  <span className="text-white font-mono font-bold">{Math.floor(preset.duration / 60)}:{(preset.duration % 60).toString().padStart(2, '0')}</span>
                </div>
                {preset.rounds && (
                  <div className="flex justify-between items-center p-2 bg-gray-800 rounded-lg border border-gray-600">
                    <span className="text-gray-400 font-medium">Rounds:</span>
                    <span className="text-white font-bold">{preset.rounds}</span>
                  </div>
                )}
                {preset.restTime && (
                  <div className="flex justify-between items-center p-2 bg-gray-800 rounded-lg border border-gray-600">
                    <span className="text-gray-400 font-medium">Rest:</span>
                    <span className="text-white font-mono font-bold">{Math.floor(preset.restTime / 60)}:{(preset.restTime % 60).toString().padStart(2, '0')}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}