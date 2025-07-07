import React, { useState, useEffect } from 'react';
import TimerDisplay from './components/TimerDisplay';
import { useTimer } from './hooks/useTimer';
import { Plus, Play, Pause, RotateCcw, Square, Wifi, Monitor, Smartphone, Settings, Trash2 } from 'lucide-react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import TimerDashboard from './TimerDashboard';
import LandingPage from './LandingPage';

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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/app" element={<TimerDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;