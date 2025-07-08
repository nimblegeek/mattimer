import React, { useState, useEffect } from 'react';
import TimerDisplay from './components/TimerDisplay';
import { useTimer } from './hooks/useTimer';
import { Plus, Play, Pause, RotateCcw, Square, Wifi, Monitor, Smartphone, Settings, Trash2, X } from 'lucide-react';
import Navbar from './components/Navbar';

interface Timer {
  id: string;
  name: string;
  workDuration: number; // in seconds
  restDuration: number; // in seconds
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
  const [editModal, setEditModal] = useState({
    startType: 'manual', // 'manual' or 'scheduled'
    scheduledTime: '',
    workMins: 10,
    workSecs: 0,
    restMins: 1,
    restSecs: 0,
    wrapUps: [
      { color: '#facc15', time: 30, sound: 'bell' },
    ],
  });
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
  const wrapUpSounds = [
    { label: 'Bell', value: 'bell' },
    { label: 'Buzzer', value: 'buzzer' },
    { label: 'Whistle', value: 'whistle' },
  ];

  const activeTimer = timers.find(t => t.id === activeTimerId);
  const mainTimer = useTimer(activeTimer?.workDuration || 0, activeTimer?.restDuration || 0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (activeTimer) {
      mainTimer.setTime(activeTimer.workDuration, activeTimer.restDuration);
    }
  }, [activeTimerId, activeTimer]);

  const addTimer = (preset?: any) => {
    const newTimer: Timer = {
      id: Date.now().toString(),
      name: preset?.name || `Timer ${timers.length + 1}`,
      workDuration: preset?.workDuration || 600,
      restDuration: preset?.restDuration || 60,
      isRunning: false,
      currentTime: preset?.workDuration || 600,
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
    <div className="min-h-screen bg-sc_bg text-sc_white flex flex-col">
      <Navbar />
      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel: Timer Display and Controls */}
        <div className="flex flex-col w-full md:w-2/3 lg:w-3/5 xl:w-1/2 bg-sc_bg border-r border-sc_panel p-8 gap-6">
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
                    adjustTime={mainTimer.adjustTime}
                  />
                  <div className="text-xs text-sc_gray text-center mt-2">Click timer to expand</div>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full">
                <div className="text-6xl font-mono font-extrabold text-sc_gray mb-4 select-none">00:00</div>
                <div className="text-lg text-sc_gray mb-6">No Timer Selected</div>
                <button onClick={() => addTimer()} className="px-6 py-3 bg-sc_green hover:bg-green-500 rounded border border-sc_green text-lg font-semibold text-sc_card">Create Timer</button>
              </div>
            )}
          </div>
          {/* Local Time and Devices */}
          <div className="flex flex-col gap-2 mt-auto">
            <div className="flex items-center gap-2 text-sc_gray text-sm">
              <span>{formatTime(currentTime)}</span>
              <span className="text-xs text-sc_gray">{Intl.DateTimeFormat().resolvedOptions().timeZone}</span>
            </div>
            {/* Connected Devices Panel */}
            <div className="bg-sc_panel border border-sc_card mt-2 p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-sc_gray">Connected Devices</span>
                <span className="text-xs text-sc_gray">{devices.filter(d => d.isConnected).length}/{devices.length}</span>
              </div>
              <div className="space-y-1">
                {devices.map(device => (
                  <div key={device.id} className="flex items-center gap-2 text-xs text-sc_gray">
                    <span className={`w-2 h-2 rounded-full ${device.isConnected ? 'bg-sc_green' : 'bg-sc_gray'}`}></span>
                    {getDeviceIcon(device.type)}
                    <span>{device.name}</span>
                    <span className="text-sc_gray ml-auto">{device.isConnected ? 'Online' : 'Last seen ' + device.lastSeen.toLocaleTimeString()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* Right Panel: Timer List */}
        <div className="flex flex-col w-80 min-w-[320px] bg-sc_panel p-6 gap-4 overflow-y-auto border-l border-sc_card">
          <div className="flex items-center justify-between mb-2">
            <span className="text-lg font-semibold text-sc_white">Timers</span>
            <button onClick={() => addTimer()} className="flex items-center gap-1 px-3 py-1 bg-sc_green hover:bg-green-500 border border-sc_green rounded text-sm font-medium text-sc_card"><Plus size={16} /> Add Timer</button>
          </div>
          <div className="flex flex-col gap-2">
            {timers.length === 0 && (
              <div className="text-sc_gray text-sm text-center py-8">No timers yet.</div>
            )}
            {timers.map(timer => (
              <div key={timer.id} className={`flex items-center gap-2 p-3 border ${activeTimerId === timer.id ? 'border-sc_yellow bg-sc_card' : 'border-sc_card bg-sc_panel'} transition-colors`}> 
                <div className="flex-1 flex flex-col gap-1">
                  <div className="font-semibold text-sc_white">{timer.name}</div>
                  <div className="text-xs text-sc_gray">Work: {Math.floor(timer.workDuration / 60)}:{(timer.workDuration % 60).toString().padStart(2, '0')} | Rest: {Math.floor(timer.restDuration / 60)}:{(timer.restDuration % 60).toString().padStart(2, '0')}</div>
                </div>
                <button onClick={() => toggleTimer(timer.id)} className={`p-2 rounded border ${timer.isRunning ? 'bg-sc_yellow border-sc_yellow text-sc_card' : 'bg-sc_green border-sc_green text-sc_card'} hover:opacity-90`}>
                  {timer.isRunning ? <Pause size={16} /> : <Play size={16} />}
                </button>
                <button onClick={() => deleteTimer(timer.id)} className="p-2 rounded border bg-sc_red border-sc_red text-sc_card hover:opacity-90"><Trash2 size={16} /></button>
                <button onClick={() => setEditingTimer(timer)} className="p-2 rounded border bg-sc_card border-sc_gray text-sc_gray hover:opacity-90"><Settings size={16} /></button>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Timer Settings Modal */}
      {editingTimer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div className="relative bg-gray-900 border border-gray-700 rounded-2xl p-10 w-full max-w-2xl shadow-2xl z-10">
            <h2 className="text-3xl font-extrabold mb-8 text-white text-center">Edit Timer</h2>
            <div className="mb-6">
              <label className="block text-gray-400 mb-2 font-semibold">Name</label>
              <input
                className="w-full px-4 py-3 rounded bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-blue-500 text-lg"
                value={editingTimer.name}
                onChange={e => setEditingTimer({ ...editingTimer, name: e.target.value })}
              />
            </div>
            <div className="mb-6 flex gap-6">
              <div className="flex-1">
                <label className="block text-gray-400 mb-2 font-semibold">Start</label>
                <select
                  className="w-full px-4 py-3 rounded bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-blue-500 text-lg"
                  value={editModal.startType}
                  onChange={e => setEditModal(m => ({ ...m, startType: e.target.value }))}
                >
                  <option value="manual">Manual</option>
                  <option value="scheduled">Scheduled</option>
                </select>
                {editModal.startType === 'scheduled' && (
                  <input
                    type="time"
                    className="w-full mt-2 px-4 py-3 rounded bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-blue-500 text-lg"
                    value={editModal.scheduledTime}
                    onChange={e => setEditModal(m => ({ ...m, scheduledTime: e.target.value }))}
                  />
                )}
              </div>
              <div className="flex-1">
                <label className="block text-gray-400 mb-2 font-semibold">Work Duration</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="number"
                    min={0}
                    className="w-20 px-4 py-3 rounded bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-blue-500 text-lg text-right"
                    value={Math.floor(editingTimer.workDuration / 60)}
                    onChange={e => {
                      const mins = parseInt(e.target.value, 10) || 0;
                      setEditingTimer({ ...editingTimer, workDuration: mins * 60 + (editingTimer.workDuration % 60) });
                    }}
                  />
                  <span className="text-lg text-gray-400 self-center">:</span>
                  <input
                    type="number"
                    min={0}
                    max={59}
                    className="w-20 px-4 py-3 rounded bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-blue-500 text-lg text-right"
                    value={(editingTimer.workDuration % 60).toString().padStart(2, '0')}
                    onChange={e => {
                      let secs = parseInt(e.target.value, 10) || 0;
                      if (secs > 59) secs = 59;
                      setEditingTimer({ ...editingTimer, workDuration: Math.floor(editingTimer.workDuration / 60) * 60 + secs });
                    }}
                  />
                </div>
                <label className="block text-gray-400 mb-2 font-semibold">Rest Duration</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    min={0}
                    className="w-20 px-4 py-3 rounded bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-blue-500 text-lg text-right"
                    value={Math.floor(editingTimer.restDuration / 60)}
                    onChange={e => {
                      const mins = parseInt(e.target.value, 10) || 0;
                      setEditingTimer({ ...editingTimer, restDuration: mins * 60 + (editingTimer.restDuration % 60) });
                    }}
                  />
                  <span className="text-lg text-gray-400 self-center">:</span>
                  <input
                    type="number"
                    min={0}
                    max={59}
                    className="w-20 px-4 py-3 rounded bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-blue-500 text-lg text-right"
                    value={(editingTimer.restDuration % 60).toString().padStart(2, '0')}
                    onChange={e => {
                      let secs = parseInt(e.target.value, 10) || 0;
                      if (secs > 59) secs = 59;
                      setEditingTimer({ ...editingTimer, restDuration: Math.floor(editingTimer.restDuration / 60) * 60 + secs });
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="mb-8">
              <label className="block text-gray-400 mb-2 font-semibold">Wrap Up Actions</label>
              {editModal.wrapUps.map((wrap, idx) => (
                <div key={idx} className="flex items-center gap-3 mb-3">
                  <input
                    type="color"
                    className="w-10 h-10 rounded border border-gray-700 bg-gray-800"
                    value={wrap.color}
                    onChange={e => setEditModal(m => {
                      const wrapUps = [...m.wrapUps];
                      wrapUps[idx].color = e.target.value;
                      return { ...m, wrapUps };
                    })}
                  />
                  <input
                    type="number"
                    min={1}
                    className="w-20 px-3 py-2 rounded bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-blue-500 text-lg text-right"
                    value={wrap.time}
                    onChange={e => setEditModal(m => {
                      const wrapUps = [...m.wrapUps];
                      wrapUps[idx].time = parseInt(e.target.value, 10) || 1;
                      return { ...m, wrapUps };
                    })}
                  />
                  <span className="text-gray-400">seconds before end</span>
                  <select
                    className="px-3 py-2 rounded bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-blue-500 text-lg"
                    value={wrap.sound}
                    onChange={e => setEditModal(m => {
                      const wrapUps = [...m.wrapUps];
                      wrapUps[idx].sound = e.target.value;
                      return { ...m, wrapUps };
                    })}
                  >
                    {wrapUpSounds.map(s => (
                      <option key={s.value} value={s.value}>{s.label}</option>
                    ))}
                  </select>
                  <button
                    className="ml-2 px-3 py-2 rounded bg-red-700 text-white border border-red-600 hover:bg-red-800"
                    onClick={() => setEditModal(m => ({ ...m, wrapUps: m.wrapUps.filter((_, i) => i !== idx) }))}
                  >Remove</button>
                </div>
              ))}
              <button
                className="mt-2 px-4 py-2 rounded bg-green-700 text-white border border-green-600 hover:bg-green-800"
                onClick={() => setEditModal(m => ({ ...m, wrapUps: [...m.wrapUps, { color: '#facc15', time: 30, sound: 'bell' }] }))}
              >+ Add Wrap Up Action</button>
            </div>
            <div className="flex justify-end gap-4 mt-8">
              <button
                className="px-6 py-3 rounded-lg bg-gray-700 text-gray-300 hover:bg-gray-600 border border-gray-600 text-lg"
                onClick={() => setEditingTimer(null)}
              >
                Cancel
              </button>
              <button
                className="px-6 py-3 rounded-lg bg-blue-700 text-white hover:bg-blue-800 border border-blue-600 text-lg font-bold"
                onClick={() => {
                  setTimers(prev => prev.map(t => t.id === editingTimer.id ? { ...t, name: editingTimer.name, workDuration: editingTimer.workDuration, restDuration: editingTimer.restDuration } : t));
                  setEditingTimer(null);
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Timer Fullscreen Overlay */}
      {timerFullscreen && activeTimer && (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
          <button
            className="absolute top-4 right-4 sm:top-6 sm:right-8 p-2 sm:p-3 rounded-full bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-600 z-50 shadow-lg transition-colors"
            onClick={() => setTimerFullscreen(false)}
            aria-label="Close fullscreen timer"
          >
            <X size={32} />
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
                adjustTime={mainTimer.adjustTime}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 