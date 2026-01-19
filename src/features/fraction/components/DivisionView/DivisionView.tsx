import React from 'react';
import { Fraction } from '../../../../types';
import { FractionDisplay } from '../FractionDisplay';
import styles from './DivisionView.module.css';

export type DivisionStep = 'initial' | 'step1' | 'step2' | 'reciprocal' | 'complete';

export interface DivisionViewProps {
  dividend: Fraction; // 被除数 (割られる数)
  divisor: Fraction;  // 除数 (割る数)
  step: DivisionStep;
  animationProgress?: number;
  size?: number;
  className?: string;
}

export const DivisionView: React.FC<DivisionViewProps> = ({
  dividend,
  divisor,
  step,
  animationProgress = 1,
  size = 200,
  className = '',
}) => {
  const reciprocal: Fraction = {
    numerator: divisor.denominator,
    denominator: divisor.numerator,
  };

  const getStepDescription = () => {
    switch (step) {
      case 'initial':
        return `${dividend.numerator}/${dividend.denominator} ÷ ${divisor.numerator}/${divisor.denominator}`;
      case 'step1':
        return `÷${divisor.numerator} で 1/${divisor.denominator} にする`;
      case 'step2':
        return `×${divisor.denominator} で 1 にする`;
      case 'reciprocal':
        return `÷${divisor.numerator}/${divisor.denominator} = ×${reciprocal.numerator}/${reciprocal.denominator}`;
      case 'complete':
        return '掛け算に変換完了！';
      default:
        return '';
    }
  };

  const isFlipped = step === 'reciprocal' || step === 'complete';

  return (
    <div className={`${styles.container} ${className}`}>
      {/* Step visualization */}
      <div className={styles.stepsContainer}>
        {/* Original divisor with flip animation */}
        <div className={styles.cardContainer}>
          <div className={`${styles.card} ${isFlipped ? styles.flipped : ''}`}>
            <div className={styles.cardFront}>
              <FractionDisplay fraction={divisor} size="large" />
              {step === 'step1' && (
                <div className={styles.stepArrow}>
                  <span className={styles.stepText}>÷{divisor.numerator}</span>
                  <div className={styles.arrow}>↓</div>
                </div>
              )}
              {step === 'step2' && (
                <div className={styles.stepArrow}>
                  <span className={styles.stepText}>×{divisor.denominator}</span>
                  <div className={styles.arrow}>↓</div>
                </div>
              )}
            </div>
            <div className={styles.cardBack}>
              <FractionDisplay fraction={reciprocal} size="large" color="var(--color-secondary)" />
              <div className={styles.reciprocalLabel}>逆数</div>
            </div>
          </div>
        </div>

        {/* Visual bar representation */}
        <div className={styles.visualContainer}>
          <div
            className={styles.unitBar}
            style={{ width: size, height: 40 }}
          >
            <span className={styles.unitLabel}>1</span>

            {/* Show division visual based on step */}
            {(step === 'initial' || step === 'step1') && (
              <div className={styles.divisorBar}>
                {Array.from({ length: divisor.denominator }).map((_, i) => (
                  <div
                    key={i}
                    className={`${styles.segment} ${i < divisor.numerator ? styles.filled : ''}`}
                    style={{
                      width: `${100 / divisor.denominator}%`,
                      opacity: step === 'step1' && i >= 1 ? 0.3 : 1,
                    }}
                  />
                ))}
              </div>
            )}

            {step === 'step2' && (
              <div className={styles.divisorBar}>
                {Array.from({ length: divisor.denominator }).map((_, i) => (
                  <div
                    key={i}
                    className={`${styles.segment} ${styles.expanding}`}
                    style={{
                      width: `${100 / divisor.denominator}%`,
                      animationDelay: `${i * 200}ms`,
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Step description */}
      <div
        className={styles.description}
        style={{ opacity: animationProgress }}
      >
        {getStepDescription()}
      </div>

      {/* Conversion formula */}
      {(step === 'reciprocal' || step === 'complete') && (
        <div className={styles.formula}>
          <span>÷</span>
          <FractionDisplay fraction={divisor} size="small" />
          <span>=</span>
          <span>×</span>
          <FractionDisplay fraction={reciprocal} size="small" color="var(--color-secondary)" />
        </div>
      )}
    </div>
  );
};
