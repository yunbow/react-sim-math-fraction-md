import { useState, useCallback, useRef, useEffect } from 'react';
import { AnimationPhase, OperationType } from '../../../types';

export interface UseAnimationControllerOptions {
  operation: OperationType;
  speed: number;
  onPhaseChange?: (phase: AnimationPhase) => void;
  onComplete?: () => void;
}

export interface UseAnimationControllerReturn {
  phase: AnimationPhase;
  phaseProgress: number;
  isPlaying: boolean;
  play: () => void;
  pause: () => void;
  reset: () => void;
  stepForward: () => void;
  stepBack: () => void;
  setPhase: (phase: AnimationPhase) => void;
}

const MULTIPLICATION_PHASES: AnimationPhase[] = [
  'idle',
  'showFirstFraction',
  'showSecondFraction',
  'showOperation',
  'multiplyPhase',
  'reductionPhase',
  'showResult',
  'completed',
];

const DIVISION_PHASES: AnimationPhase[] = [
  'idle',
  'showFirstFraction',
  'showSecondFraction',
  'showOperation',
  'divisionStep1',
  'divisionStep2',
  'showReciprocal',
  'multiplyPhase',
  'reductionPhase',
  'showResult',
  'completed',
];

const PHASE_DURATIONS: Record<AnimationPhase, number> = {
  idle: 500,
  showFirstFraction: 1000,
  showSecondFraction: 1000,
  showOperation: 800,
  divisionStep1: 1500,
  divisionStep2: 1500,
  showReciprocal: 1200,
  multiplyPhase: 2000,
  reductionPhase: 2000,
  showResult: 1500,
  completed: 0,
};

export function useAnimationController({
  operation,
  speed,
  onPhaseChange,
  onComplete,
}: UseAnimationControllerOptions): UseAnimationControllerReturn {
  const [phase, setPhaseState] = useState<AnimationPhase>('idle');
  const [phaseProgress, setPhaseProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);

  const phases = operation === 'division' ? DIVISION_PHASES : MULTIPLICATION_PHASES;

  const getCurrentPhaseIndex = useCallback(() => {
    return phases.indexOf(phase);
  }, [phases, phase]);

  const setPhase = useCallback((newPhase: AnimationPhase) => {
    setPhaseState(newPhase);
    setPhaseProgress(0);
    onPhaseChange?.(newPhase);
  }, [onPhaseChange]);

  const goToNextPhase = useCallback(() => {
    const currentIndex = getCurrentPhaseIndex();
    if (currentIndex < phases.length - 1) {
      const nextPhase = phases[currentIndex + 1];
      setPhase(nextPhase);

      if (nextPhase === 'completed') {
        setIsPlaying(false);
        onComplete?.();
      }
    }
  }, [getCurrentPhaseIndex, phases, setPhase, onComplete]);

  const goToPreviousPhase = useCallback(() => {
    const currentIndex = getCurrentPhaseIndex();
    if (currentIndex > 0) {
      setPhase(phases[currentIndex - 1]);
    }
  }, [getCurrentPhaseIndex, phases, setPhase]);

  const animate = useCallback((timestamp: number) => {
    if (!isPlaying) return;

    if (startTimeRef.current === 0) {
      startTimeRef.current = timestamp;
    }

    const elapsed = timestamp - startTimeRef.current;
    const duration = PHASE_DURATIONS[phase] / speed;

    if (duration > 0) {
      const progress = Math.min(elapsed / duration, 1);
      setPhaseProgress(progress);

      if (progress >= 1) {
        startTimeRef.current = 0;
        goToNextPhase();
      } else {
        animationRef.current = requestAnimationFrame(animate);
      }
    } else {
      goToNextPhase();
    }
  }, [isPlaying, phase, speed, goToNextPhase]);

  useEffect(() => {
    if (isPlaying && phase !== 'completed') {
      startTimeRef.current = 0;
      animationRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, phase, animate]);

  const play = useCallback(() => {
    if (phase === 'completed') {
      setPhase('idle');
    }
    setIsPlaying(true);
  }, [phase, setPhase]);

  const pause = useCallback(() => {
    setIsPlaying(false);
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  }, []);

  const reset = useCallback(() => {
    setIsPlaying(false);
    setPhase('idle');
    setPhaseProgress(0);
    startTimeRef.current = 0;
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  }, [setPhase]);

  const stepForward = useCallback(() => {
    if (!isPlaying) {
      goToNextPhase();
    }
  }, [isPlaying, goToNextPhase]);

  const stepBack = useCallback(() => {
    if (!isPlaying) {
      goToPreviousPhase();
    }
  }, [isPlaying, goToPreviousPhase]);

  return {
    phase,
    phaseProgress,
    isPlaying,
    play,
    pause,
    reset,
    stepForward,
    stepBack,
    setPhase,
  };
}
