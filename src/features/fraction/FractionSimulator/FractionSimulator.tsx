import React, { useMemo } from 'react';
import { useFractionSimulator } from '../hooks/useFractionSimulator';
import { FractionDisplay } from '../components/FractionDisplay';
import { FractionInput } from '../components/FractionInput';
import { UnitFrame } from '../components/UnitFrame';
import { MultiplicationView } from '../components/MultiplicationView';
import { DivisionView, DivisionStep } from '../components/DivisionView';
import { ReductionView, ReductionStep } from '../components/ReductionView';
import { NarrationBox } from '../components/NarrationBox';
import { ControlPanel } from '../components/ControlPanel';
import { getReciprocal } from '../utils/fractionMath';
import styles from './FractionSimulator.module.css';

export interface FractionSimulatorProps {
  className?: string;
}

export const FractionSimulator: React.FC<FractionSimulatorProps> = ({
  className = '',
}) => {
  const {
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
  } = useFractionSimulator();

  const { fraction1, fraction2, operation, mode, phase, isPlaying, speed } = state;

  const divisionStep: DivisionStep = useMemo(() => {
    switch (phase) {
      case 'divisionStep1':
        return 'step1';
      case 'divisionStep2':
        return 'step2';
      case 'showReciprocal':
        return 'reciprocal';
      case 'multiplyPhase':
      case 'reductionPhase':
      case 'showResult':
      case 'completed':
        return 'complete';
      default:
        return 'initial';
    }
  }, [phase]);

  const reductionStep: ReductionStep = useMemo(() => {
    if (phase !== 'reductionPhase') return 'initial';
    if (!needsReduction) return 'complete';
    return 'highlighting';
  }, [phase, needsReduction]);

  const showMultiplicationView =
    (operation === 'multiplication' && ['multiplyPhase', 'reductionPhase', 'showResult', 'completed'].includes(phase)) ||
    (operation === 'division' && ['multiplyPhase', 'reductionPhase', 'showResult', 'completed'].includes(phase));

  const showDivisionView = operation === 'division' && ['showOperation', 'divisionStep1', 'divisionStep2', 'showReciprocal'].includes(phase);

  const showReductionView = phase === 'reductionPhase' && needsReduction;

  const multiplicationFraction1 = operation === 'division' ? fraction1 : fraction1;
  const multiplicationFraction2 = operation === 'division' ? getReciprocal(fraction2) : fraction2;

  const getNarrationType = () => {
    if (phase === 'completed') return 'success';
    if (phase === 'showResult') return 'success';
    if (phase === 'showReciprocal') return 'hint';
    return 'info';
  };

  return (
    <div className={`${styles.simulator} ${className}`}>
      <header className={styles.header}>
        <h1 className={styles.title}>分数の掛け算・割り算</h1>
        <p className={styles.subtitle}>視覚的に理解しよう</p>
      </header>

      {/* Problem Display */}
      <section className={styles.problemSection}>
        <div className={styles.problemDisplay}>
          <div className={styles.fractionWrapper}>
            {mode === 'interact' || mode === 'challenge' ? (
              <FractionInput
                value={fraction1}
                onChange={setFraction1}
                label="1つ目の分数"
                disabled={isPlaying}
              />
            ) : (
              <FractionDisplay
                fraction={fraction1}
                size="large"
                highlighted={phase === 'showFirstFraction'}
                color="var(--color-primary)"
              />
            )}
          </div>

          <span className={styles.operator}>
            {operation === 'multiplication' ? '×' : '÷'}
          </span>

          <div className={styles.fractionWrapper}>
            {mode === 'interact' || mode === 'challenge' ? (
              <FractionInput
                value={fraction2}
                onChange={setFraction2}
                label="2つ目の分数"
                disabled={isPlaying}
              />
            ) : (
              <FractionDisplay
                fraction={fraction2}
                size="large"
                highlighted={phase === 'showSecondFraction'}
                color="var(--color-secondary)"
              />
            )}
          </div>

          {['showResult', 'completed'].includes(phase) && (
            <>
              <span className={styles.operator}>=</span>
              <FractionDisplay
                fraction={reducedResult}
                size="large"
                highlighted={phase === 'completed'}
                color="var(--color-accent)"
              />
            </>
          )}
        </div>
      </section>

      {/* Narration */}
      <section className={styles.narrationSection}>
        <NarrationBox
          message={narration}
          type={getNarrationType()}
        />
      </section>

      {/* Visualization Area */}
      <section className={styles.visualizationSection}>
        {/* Initial state - show fractions in unit frames */}
        {['idle', 'showFirstFraction', 'showSecondFraction', 'showOperation'].includes(phase) && (
          <div className={styles.fractionFrames}>
            <div className={styles.frameContainer}>
              <UnitFrame size={150}>
                {/* Dotted division lines */}
                <div className={styles.divisionLines}>
                  {Array.from({ length: fraction1.denominator - 1 }).map((_, i) => (
                    <div
                      key={i}
                      className={styles.divisionLine}
                      style={{ bottom: `${((i + 1) / fraction1.denominator) * 100}%` }}
                    />
                  ))}
                </div>
                <div
                  className={styles.fractionBar}
                  style={{
                    height: `${(fraction1.numerator / fraction1.denominator) * 100}%`,
                    backgroundColor: 'var(--color-grid-filled)',
                    opacity: phase !== 'idle' ? 1 : 0.5,
                  }}
                />
              </UnitFrame>
              <span className={styles.frameLabel}>{fraction1.numerator}/{fraction1.denominator}</span>
            </div>

            {['showSecondFraction', 'showOperation'].includes(phase) && (
              <div className={styles.frameContainer}>
                <UnitFrame size={150}>
                  {/* Dotted division lines */}
                  <div className={styles.divisionLines}>
                    {Array.from({ length: fraction2.denominator - 1 }).map((_, i) => (
                      <div
                        key={i}
                        className={styles.divisionLine}
                        style={{ bottom: `${((i + 1) / fraction2.denominator) * 100}%` }}
                      />
                    ))}
                  </div>
                  <div
                    className={styles.fractionBar}
                    style={{
                      height: `${(fraction2.numerator / fraction2.denominator) * 100}%`,
                      backgroundColor: 'var(--color-secondary)',
                    }}
                  />
                </UnitFrame>
                <span className={styles.frameLabel}>{fraction2.numerator}/{fraction2.denominator}</span>
              </div>
            )}
          </div>
        )}

        {/* Division visualization */}
        {showDivisionView && (
          <DivisionView
            dividend={fraction1}
            divisor={fraction2}
            step={divisionStep}
            size={180}
          />
        )}

        {/* Multiplication visualization (area model) */}
        {showMultiplicationView && (
          <div className={styles.multiplicationContainer}>
            <MultiplicationView
              fraction1={multiplicationFraction1}
              fraction2={multiplicationFraction2}
              showFirst={true}
              showSecond={true}
              showOverlap={true}
              size={200}
            />
          </div>
        )}

        {/* Reduction visualization */}
        {showReductionView && (
          <ReductionView
            original={result}
            reduced={reducedResult}
            gcd={resultGcd}
            step={reductionStep}
          />
        )}
      </section>

      {/* Control Panel */}
      <section className={styles.controlSection}>
        <ControlPanel
          operation={operation}
          mode={mode}
          speed={speed}
          isPlaying={isPlaying}
          onOperationChange={setOperation}
          onModeChange={setMode}
          onSpeedChange={setSpeed}
          onPlay={play}
          onPause={pause}
          onReset={reset}
          onStepForward={stepForward}
          onStepBack={stepBack}
          onRandomProblem={generateRandomProblem}
        />
      </section>
    </div>
  );
};
