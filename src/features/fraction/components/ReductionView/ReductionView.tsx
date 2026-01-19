import React, { useMemo } from 'react';
import { Fraction } from '../../../../types';
import { FractionDisplay } from '../FractionDisplay';
import styles from './ReductionView.module.css';

export type ReductionStep = 'initial' | 'findGcd' | 'highlighting' | 'reducing' | 'complete';

export interface ReductionViewProps {
  original: Fraction;
  reduced: Fraction;
  gcd: number;
  step: ReductionStep;
  animationProgress?: number;
  className?: string;
}

export const ReductionView: React.FC<ReductionViewProps> = ({
  original,
  reduced,
  gcd,
  step,
  animationProgress = 1,
  className = '',
}) => {
  const numeratorBlocks = useMemo(() => {
    const blocks: { group: number; index: number }[] = [];
    for (let i = 0; i < original.numerator; i++) {
      blocks.push({ group: Math.floor(i / gcd), index: i % gcd });
    }
    return blocks;
  }, [original.numerator, gcd]);

  const denominatorBlocks = useMemo(() => {
    const blocks: { group: number; index: number }[] = [];
    for (let i = 0; i < original.denominator; i++) {
      blocks.push({ group: Math.floor(i / gcd), index: i % gcd });
    }
    return blocks;
  }, [original.denominator, gcd]);

  const getStepDescription = () => {
    switch (step) {
      case 'initial':
        return `${original.numerator}/${original.denominator} を約分しよう`;
      case 'findGcd':
        return `最大公約数は ${gcd} だよ`;
      case 'highlighting':
        return `${gcd}こずつまとめてみよう`;
      case 'reducing':
        return `${gcd}こを1こにまとめるよ`;
      case 'complete':
        return `${reduced.numerator}/${reduced.denominator} になったね！`;
      default:
        return '';
    }
  };

  const getBlockColor = (group: number) => {
    const colors = ['#4a90d9', '#e8744f', '#50c878', '#f1c40f', '#9b59b6'];
    return colors[group % colors.length];
  };

  const showGrouping = step === 'highlighting' || step === 'reducing' || step === 'complete';
  const showReduction = step === 'reducing' || step === 'complete';

  return (
    <div className={`${styles.container} ${className}`}>
      {/* Fraction comparison */}
      <div className={styles.fractionComparison}>
        <div className={styles.fractionBox}>
          <FractionDisplay fraction={original} size="large" />
        </div>

        {(step === 'reducing' || step === 'complete') && (
          <>
            <div className={styles.arrow}>→</div>
            <div className={styles.fractionBox}>
              <FractionDisplay
                fraction={reduced}
                size="large"
                color="var(--color-accent)"
                highlighted={step === 'complete'}
              />
            </div>
          </>
        )}
      </div>

      {/* GCD indicator */}
      {(step === 'findGcd' || step === 'highlighting' || step === 'reducing') && (
        <div className={styles.gcdIndicator}>
          <span>最大公約数 GCD = </span>
          <span className={styles.gcdValue}>{gcd}</span>
        </div>
      )}

      {/* Block visualization */}
      <div className={styles.blockVisualization}>
        {/* Numerator blocks */}
        <div className={styles.blockRow}>
          <span className={styles.blockLabel}>分子</span>
          <div className={`${styles.blocks} ${showReduction ? styles.reducing : ''}`}>
            {showReduction ? (
              // Show reduced blocks
              Array.from({ length: reduced.numerator }).map((_, i) => (
                <div
                  key={i}
                  className={`${styles.block} ${styles.reduced}`}
                  style={{
                    backgroundColor: getBlockColor(i),
                    animationDelay: `${i * 100}ms`,
                  }}
                >
                  {showGrouping && <span className={styles.groupNumber}>{gcd}</span>}
                </div>
              ))
            ) : (
              // Show original blocks with grouping
              numeratorBlocks.map((block, i) => (
                <div
                  key={i}
                  className={`${styles.block} ${showGrouping ? styles.grouped : ''}`}
                  style={{
                    backgroundColor: showGrouping ? getBlockColor(block.group) : 'var(--color-primary)',
                    animationDelay: `${i * 50}ms`,
                    opacity: animationProgress,
                  }}
                />
              ))
            )}
          </div>
          <span className={styles.countLabel}>
            {showReduction ? reduced.numerator : original.numerator}
          </span>
        </div>

        {/* Denominator blocks */}
        <div className={styles.blockRow}>
          <span className={styles.blockLabel}>分母</span>
          <div className={`${styles.blocks} ${showReduction ? styles.reducing : ''}`}>
            {showReduction ? (
              // Show reduced blocks
              Array.from({ length: reduced.denominator }).map((_, i) => (
                <div
                  key={i}
                  className={`${styles.block} ${styles.reduced}`}
                  style={{
                    backgroundColor: getBlockColor(i),
                    animationDelay: `${i * 100}ms`,
                  }}
                >
                  {showGrouping && <span className={styles.groupNumber}>{gcd}</span>}
                </div>
              ))
            ) : (
              // Show original blocks with grouping
              denominatorBlocks.map((block, i) => (
                <div
                  key={i}
                  className={`${styles.block} ${showGrouping ? styles.grouped : ''}`}
                  style={{
                    backgroundColor: showGrouping ? getBlockColor(block.group) : 'var(--color-secondary)',
                    animationDelay: `${i * 50}ms`,
                    opacity: animationProgress,
                  }}
                />
              ))
            )}
          </div>
          <span className={styles.countLabel}>
            {showReduction ? reduced.denominator : original.denominator}
          </span>
        </div>
      </div>

      {/* Step description */}
      <div className={styles.description}>
        {getStepDescription()}
      </div>

      {/* Division formula */}
      {step === 'complete' && (
        <div className={styles.formula}>
          <span>{original.numerator} ÷ {gcd} = {reduced.numerator}</span>
          <span className={styles.formulaDivider}>/</span>
          <span>{original.denominator} ÷ {gcd} = {reduced.denominator}</span>
        </div>
      )}
    </div>
  );
};
