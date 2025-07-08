import { useState, useEffect, useCallback } from 'react';

interface TimerState {
  time: number;
  isRunning: boolean;
  initialTime: number;
  phase: 'ready' | 'active' | 'rest' | 'finished';
  workDuration: number;
  restDuration: number;
}

export function useTimer(workDuration: number = 0, restDuration: number = 0) {
  const [timerState, setTimerState] = useState<TimerState>({
    time: workDuration,
    isRunning: false,
    initialTime: workDuration,
    phase: 'ready',
    workDuration,
    restDuration
  });

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (timerState.isRunning) {
      interval = setInterval(() => {
        setTimerState(prev => {
          const newTime = prev.time - 1;
          let newPhase = prev.phase;
          // Work/rest logic
          if (newTime <= 0) {
            if (prev.phase === 'active') {
              // Switch to rest
              return {
                ...prev,
                time: prev.restDuration,
                phase: 'rest',
                isRunning: prev.restDuration > 0
              };
            } else if (prev.phase === 'rest') {
              // Finish after rest
              return {
                ...prev,
                time: 0,
                isRunning: false,
                phase: 'finished'
              };
            } else {
              // Already finished
              return {
                ...prev,
                time: 0,
                isRunning: false,
                phase: 'finished'
              };
            }
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
      time: prev.workDuration,
      isRunning: false,
      phase: 'ready'
    }));
  }, []);

  const stop = useCallback(() => {
    setTimerState(prev => ({
      ...prev,
      time: prev.workDuration,
      isRunning: false,
      phase: 'ready'
    }));
  }, []);

  const setTime = useCallback((work: number, rest: number) => {
    setTimerState(prev => ({
      ...prev,
      time: work,
      initialTime: work,
      workDuration: work,
      restDuration: rest,
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