import { useState, useEffect, useCallback } from 'react';

interface TimerState {
  time: number;
  isRunning: boolean;
  initialTime: number;
  phase: 'ready' | 'active' | 'rest' | 'finished';
}

export function useTimer(initialTime: number = 0) {
  const [timerState, setTimerState] = useState<TimerState>({
    time: initialTime,
    isRunning: false,
    initialTime,
    phase: 'ready'
  });

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (timerState.isRunning) {
      interval = setInterval(() => {
        setTimerState(prev => {
          const newTime = prev.time - 1;
          let newPhase = prev.phase;
          
          if (newTime <= 0) {
            newPhase = 'finished';
            return {
              ...prev,
              time: 0,
              isRunning: false,
              phase: newPhase
            };
          }
          
          return {
            ...prev,
            time: newTime,
            phase: newPhase
          };
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [timerState.isRunning]);

  const start = useCallback(() => {
    setTimerState(prev => ({
      ...prev,
      isRunning: true,
      phase: prev.phase === 'ready' ? 'active' : prev.phase
    }));
  }, []);

  const pause = useCallback(() => {
    setTimerState(prev => ({
      ...prev,
      isRunning: false
    }));
  }, []);

  const reset = useCallback(() => {
    setTimerState(prev => ({
      ...prev,
      time: prev.initialTime,
      isRunning: false,
      phase: 'ready'
    }));
  }, []);

  const stop = useCallback(() => {
    setTimerState(prev => ({
      ...prev,
      time: prev.initialTime,
      isRunning: false,
      phase: 'ready'
    }));
  }, []);

  const setTime = useCallback((time: number) => {
    setTimerState(prev => ({
      ...prev,
      time,
      initialTime: time,
      phase: 'ready'
    }));
  }, []);

  const adjustTime = useCallback((adjustment: number) => {
    setTimerState(prev => ({
      ...prev,
      time: Math.max(0, prev.time + adjustment)
    }));
  }, []);

  return {
    ...timerState,
    start,
    pause,
    reset,
    stop,
    setTime,
    adjustTime
  };
}