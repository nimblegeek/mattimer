import React, { useState, useEffect } from 'react';
import TimerDisplay from './components/TimerDisplay';
import { useTimer } from './hooks/useTimer';
import { Plus, Play, Pause, RotateCcw, Square, Wifi, Monitor, Smartphone, Settings, Trash2 } from 'lucide-react';

interface Timer {
  id: string;
  name: string;
  duration: number;
  isRunning: boolean;
  currentTime: number;
  type: 'boxing' | 'mma' | 'custom' | 'tabata';
}

interface Device {
  id: string;
  name: string;
  type: 'phone' | 'tablet' | 'desktop';
  isConnected: boolean;
  lastSeen: Date;
}

export default function TimerDashboard() {
  const [timers, setTimers] = useState<Timer[]>([]);
  const [activeTimerId, setActiveTimerId] = useState<string | null>(null);
  const [editingTimer, setEditingTimer] = useState<Timer | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [devices, setDevices] = useState<Device[]>([
    {
      id: '1',
      name: 'iPhone 15 Pro',
      type: 'phone',
      isConnected: true,
      lastSeen: new Date()
    },
    {
      id: '2',
      name: 'iPad Air',
      type: 'tablet',
      isConnected: false,
      lastSeen: new Date(Date.now() - 300000)
    },
    {
      id: '3',
      name: 'MacBook Pro',
      type: 'desktop',
      isConnected: true,
      lastSeen: new Date()
    }
  ]);
  const [timerFullscreen, setTimerFullscreen] = useState(false);

  const activeTimer = timers.find(t => t.id === activeTimerId);
  const mainTimer = useTimer(activeTimer?.duration || 0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (activeTimer) {
      mainTimer.setTime(activeTimer.duration);
    }
  }, [activeTimerId, activeTimer]);

  const addTimer = (preset?: any) => {
    const newTimer: Timer = {
      id: Date.now().toString(),
      name: preset?.name || `Timer ${timers.length + 1}`,
      duration: preset?.duration || 600,
      isRunning: false,
      currentTime: preset?.duration || 600,
      type: preset?.type || 'custom'
    };
    setTimers(prev => [...prev, newTimer]);
    setActiveTimerId(newTimer.id);
  };

  const deleteTimer = (id: string) => {
    setTimers(prev => prev.filter(t => t.id !== id));
    if (activeTimerId === id) {
      setActiveTimerId(null);
    }
  };

  const toggleTimer = (id: string) => {
    setTimers(prev => 
      prev.map(t => 
        t.id === id ? { ...t, isRunning: !t.isRunning } : t
      )
    );
  };

  const selectTimer = (id: string) => {
    setActiveTimerId(id);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case 'phone': return <Smartphone size={16} />;
      case 'tablet': return <Monitor size={16} />;
      case 'desktop': return <Monitor size={16} />;
      default: return <Monitor size={16} />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <div className="w-full bg-gray-900 border-b border-gray-800 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-xl font-bold tracking-tight">MyTimer Dashboard</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1 bg-gray-800 border border-gray-700 rounded text-sm hover:bg-gray-700">Customize</button>
          <button className="px-3 py-1 bg-gray-800 border border-gray-700 rounded text-sm hover:bg-gray-700">Share</button>
          <button className="px-3 py-1 bg-gray-800 border border-gray-700 rounded text-sm hover:bg-gray-700">Save</button>
        </div>
      </div>
      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel: Timer Display and Controls */}
        <div className="flex flex-col w-full md:w-2/3 lg:w-3/5 xl:w-1/2 bg-black border-r border-gray-800 p-8 gap-6">
          {/* Large Timer Display */}
          <div className="flex-1 flex flex-col items-center justify-center">
            {activeTimer ? (
              <>
                <div className="w-full cursor-pointer" onClick={() => setTimerFullscreen(true)}>
                  <TimerDisplay
                    time={mainTimer.time}
                    isRunning={mainTimer.isRunning}
                    isActive={true}
                    onStart={mainTimer.start}
                    onPause={mainTimer.pause}
                    onReset={mainTimer.reset}
                    onStop={mainTimer.stop}
                    timerName={activeTimer.name}
                    phase={mainTimer.phase}
                  />
                  <div className="text-xs text-gray-500 text-center mt-2">Click timer to expand</div>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full">
                <div className="text-6xl font-mono font-extrabold text-gray-700 mb-4 select-none">00:00</div>
                <div className="text-lg text-gray-500 mb-6">No Timer Selected</div>
                <button onClick={() => addTimer()} className="px-6 py-3 bg-blue-700 hover:bg-blue-800 rounded border border-blue-600 text-lg font-semibold">Create Timer</button>
              </div>
            )}
          </div>
          {/* Local Time and Devices */}
          <div className="flex flex-col gap-2 mt-auto">
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <span>{formatTime(currentTime)}</span>
              <span className="text-xs text-gray-600">{Intl.DateTimeFormat().resolvedOptions().timeZone}</span>
            </div>
            {/* Connected Devices Panel */}
            <div className="bg-gray-900 border border-gray-800 mt-2 p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-gray-400">Connected Devices</span>
                <span className="text-xs text-gray-500">{devices.filter(d => d.isConnected).length}/{devices.length}</span>
              </div>
              <div className="space-y-1">
                {devices.map(device => (
                  <div key={device.id} className="flex items-center gap-2 text-xs text-gray-300">
                    <span className={`w-2 h-2 rounded-full ${device.isConnected ? 'bg-green-400' : 'bg-gray-600'}`}></span>
                    {getDeviceIcon(device.type)}
                    <span>{device.name}</span>
                    <span className="text-gray-500 ml-auto">{device.isConnected ? 'Online' : 'Last seen ' + device.lastSeen.toLocaleTimeString()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* Right Panel: Timer List */}
        <div className="flex flex-col w-80 min-w-[320px] bg-black p-6 gap-4 overflow-y-auto border-l border-gray-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-lg font-semibold text-gray-200">Timers</span>
            <button onClick={() => addTimer()} className="flex items-center gap-1 px-3 py-1 bg-blue-700 hover:bg-blue-800 border border-blue-600 rounded text-sm font-medium"><Plus size={16} /> Add Timer</button>
          </div>
          <div className="flex flex-col gap-2">
            {timers.length === 0 && (
              <div className="text-gray-500 text-sm text-center py-8">No timers yet.</div>
            )}
            {timers.map(timer => (
              <div key={timer.id} className={`flex items-center gap-2 p-3 border ${activeTimerId === timer.id ? 'border-blue-500 bg-blue-900/20' : 'border-gray-800 bg-gray-900'} transition-colors`}> 
                <div className="flex-1 flex flex-col gap-1">
                  <div className="font-semibold text-gray-100">{timer.name}</div>
                  <div className="text-xs text-gray-400">{Math.floor(timer.duration / 60)}:{(timer.duration % 60).toString().padStart(2, '0')}</div>
                </div>
                <button onClick={() => toggleTimer(timer.id)} className={`p-2 rounded border ${timer.isRunning ? 'bg-orange-700 border-orange-600 text-orange-200' : 'bg-green-700 border-green-600 text-green-200'} hover:opacity-90`}>
                  {timer.isRunning ? <Pause size={16} /> : <Play size={16} />}
                </button>
                <button onClick={() => deleteTimer(timer.id)} className="p-2 rounded border bg-red-700 border-red-600 text-red-200 hover:opacity-90"><Trash2 size={16} /></button>
                <button onClick={() => setEditingTimer(timer)} className="p-2 rounded border bg-gray-800 border-gray-700 text-gray-400 hover:opacity-90"><Settings size={16} /></button>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Timer Settings Modal */}
      {editingTimer && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-8 w-full max-w-md shadow-2xl">
            <h2 className="text-xl font-bold mb-6 text-white">Edit Timer</h2>
            <div className="mb-4">
              <label className="block text-gray-400 mb-1">Name</label>
              <input
                className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-blue-500"
                value={editingTimer.name}
                onChange={e => setEditingTimer({ ...editingTimer, name: e.target.value })}
              />
            </div>
            <div className="mb-4 flex gap-2">
              <div className="flex-1">
                <label className="block text-gray-400 mb-1">Minutes</label>
                <input
                  type="number"
                  min={0}
                  className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-blue-500"
                  value={Math.floor(editingTimer.duration / 60)}
                  onChange={e => {
                    const mins = parseInt(e.target.value, 10) || 0;
                    setEditingTimer({ ...editingTimer, duration: mins * 60 + (editingTimer.duration % 60) });
                  }}
                />
              </div>
              <div className="flex-1">
                <label className="block text-gray-400 mb-1">Seconds</label>
                <input
                  type="number"
                  min={0}
                  max={59}
                  className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-blue-500"
                  value={(editingTimer.duration % 60).toString().padStart(2, '0')}
                  onChange={e => {
                    let secs = parseInt(e.target.value, 10) || 0;
                    if (secs > 59) secs = 59;
                    setEditingTimer({ ...editingTimer, duration: Math.floor(editingTimer.duration / 60) * 60 + secs });
                  }}
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button
                className="px-4 py-2 rounded bg-gray-700 text-gray-300 hover:bg-gray-600 border border-gray-600"
                onClick={() => setEditingTimer(null)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded bg-blue-700 text-white hover:bg-blue-800 border border-blue-600"
                onClick={() => {
                  setTimers(prev => prev.map(t => t.id === editingTimer.id ? { ...t, name: editingTimer.name, duration: editingTimer.duration } : t));
                  setEditingTimer(null);
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Timer Fullscreen Overlay */}
      {timerFullscreen && activeTimer && (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
          <button
            className="absolute top-6 right-8 px-6 py-3 rounded bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-600 text-xl z-50"
            onClick={() => setTimerFullscreen(false)}
          >
            Close
          </button>
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-full h-full flex items-center justify-center">
              <TimerDisplay
                time={mainTimer.time}
                isRunning={mainTimer.isRunning}
                isActive={true}
                onStart={mainTimer.start}
                onPause={mainTimer.pause}
                onReset={mainTimer.reset}
                onStop={mainTimer.stop}
                timerName={activeTimer.name}
                phase={mainTimer.phase}
                fullscreen={true}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 