import { useState, useMemo, useCallback } from 'react';
import { Fraction, OperationType, LearningMode, AnimationPhase, SimulationState } from '../../../types';
import { useAnimationController } from './useAnimationController';
import {
  multiplyFractions,
  divideFractions,
  reduceFraction,
  canReduce,
  getFractionGcd,
  randomFraction,
  formatFraction,
} from '../utils/fractionMath';

export interface UseFractionSimulatorOptions {
  initialFraction1?: Fraction;
  initialFraction2?: Fraction;
  initialOperation?: OperationType;
  initialMode?: LearningMode;
  initialSpeed?: number;
}

export interface UseFractionSimulatorReturn {
  state: SimulationState;
  result: Fraction;
  reducedResult: Fraction;
  resultGcd: number;
  needsReduction: boolean;

  // Actions
  setFraction1: (fraction: Fraction) => void;
  setFraction2: (fraction: Fraction) => void;
  setOperation: (operation: OperationType) => void;
  setMode: (mode: LearningMode) => void;
  setSpeed: (speed: number) => void;
  generateRandomProblem: () => void;

  // Animation controls
  play: () => void;
  pause: () => void;
  reset: () => void;
  stepForward: () => void;
  stepBack: () => void;

  // Narration
  narration: string;
}

const NARRATIONS: Record<AnimationPhase, Record<OperationType, string>> = {
  idle: {
    multiplication: '問題を確認しよう',
    division: '問題を確認しよう',
  },
  showFirstFraction: {
    multiplication: '最初の分数だよ',
    division: '割られる数だよ',
  },
  showSecondFraction: {
    multiplication: 'かける数だよ',
    division: '割る数だよ',
  },
  showOperation: {
    multiplication: '掛け算してみよう',
    division: '割り算してみよう',
  },
  divisionStep1: {
    multiplication: '',
    division: 'まず、1こ分（単位量）にするよ。何こ分あるか数えやすくするためだよ！',
  },
  divisionStep2: {
    multiplication: '',
    division: '1こ分がわかったから、それを分母こ集めると「1」になるね！',
  },
  showReciprocal: {
    multiplication: '',
    division: '割り算は、逆数の掛け算に変えられるね！',
  },
  multiplyPhase: {
    multiplication: '分子どうし、分母どうしを掛けるよ',
    division: '分子どうし、分母どうしを掛けるよ',
  },
  reductionPhase: {
    multiplication: '約分できるかな？',
    division: '約分できるかな？',
  },
  showResult: {
    multiplication: '答えが出たよ！',
    division: '答えが出たよ！',
  },
  completed: {
    multiplication: '完成！よくできました！',
    division: '完成！よくできました！',
  },
};

export function useFractionSimulator(
  options: UseFractionSimulatorOptions = {}
): UseFractionSimulatorReturn {
  const {
    initialFraction1 = { numerator: 2, denominator: 3 },
    initialFraction2 = { numerator: 3, denominator: 4 },
    initialOperation = 'multiplication',
    initialMode = 'watch',
    initialSpeed = 1,
  } = options;

  const [fraction1, setFraction1] = useState<Fraction>(initialFraction1);
  const [fraction2, setFraction2] = useState<Fraction>(initialFraction2);
  const [operation, setOperation] = useState<OperationType>(initialOperation);
  const [mode, setMode] = useState<LearningMode>(initialMode);
  const [speed, setSpeed] = useState(initialSpeed);

  const {
    phase,
    phaseProgress: _phaseProgress,
    isPlaying,
    play,
    pause,
    reset: resetAnimation,
    stepForward,
    stepBack,
  } = useAnimationController({
    operation,
    speed,
  });

  const result = useMemo(() => {
    if (operation === 'multiplication') {
      return multiplyFractions(fraction1, fraction2);
    } else {
      return divideFractions(fraction1, fraction2);
    }
  }, [fraction1, fraction2, operation]);

  const reducedResult = useMemo(() => reduceFraction(result), [result]);
  const resultGcd = useMemo(() => getFractionGcd(result), [result]);
  const needsReduction = useMemo(() => canReduce(result), [result]);

  const narration = useMemo(() => {
    let message = NARRATIONS[phase][operation];

    // Add dynamic content based on phase
    if (phase === 'showFirstFraction') {
      message = `${formatFraction(fraction1)} ${message}`;
    } else if (phase === 'showSecondFraction') {
      message = `${formatFraction(fraction2)} ${message}`;
    } else if (phase === 'reductionPhase' && needsReduction) {
      message = `${resultGcd}で約分できるね！`;
    } else if (phase === 'reductionPhase' && !needsReduction) {
      message = '約分は必要ないよ';
    } else if (phase === 'showResult') {
      message = `答えは ${formatFraction(reducedResult)} だよ！`;
    }

    return message;
  }, [phase, operation, fraction1, fraction2, needsReduction, resultGcd, reducedResult]);

  const generateRandomProblem = useCallback(() => {
    setFraction1(randomFraction(1, 6));
    setFraction2(randomFraction(1, 6));
    resetAnimation();
  }, [resetAnimation]);

  const reset = useCallback(() => {
    resetAnimation();
  }, [resetAnimation]);

  const state: SimulationState = {
    fraction1,
    fraction2,
    operation,
    mode,
    phase,
    isPlaying,
    speed,
    narration,
  };

  return {
    state,
    result,
    reducedResult,
    resultGcd,
    needsReduction,

    setFraction1,
    setFraction2,
    setOperation,
    setMode,
    setSpeed,
    generateRandomProblem,

    play,
    pause,
    reset,
    stepForward,
    stepBack,

    narration,
  };
}
