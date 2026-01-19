import React, { useMemo } from 'react';
import { Fraction, CellState } from '../../../../types';
import styles from './MultiplicationView.module.css';

export interface MultiplicationViewProps {
  fraction1: Fraction;
  fraction2: Fraction;
  showFirst?: boolean;
  showSecond?: boolean;
  showOverlap?: boolean;
  size?: number;
  animationProgress?: number;
  className?: string;
}

export const MultiplicationView: React.FC<MultiplicationViewProps> = ({
  fraction1,
  fraction2,
  showFirst = true,
  showSecond = true,
  showOverlap = true,
  size = 200,
  animationProgress = 1,
  className = '',
}) => {
  const rows = fraction2.denominator;
  const cols = fraction1.denominator;

  const cellStates = useMemo(() => {
    const states: CellState[][] = [];

    for (let row = 0; row < rows; row++) {
      states[row] = [];
      for (let col = 0; col < cols; col++) {
        const isInFirst = col < fraction1.numerator;
        const isInSecond = row < fraction2.numerator;

        if (showOverlap && isInFirst && isInSecond) {
          states[row][col] = 'overlap';
        } else if (showFirst && isInFirst) {
          states[row][col] = 'filled';
        } else if (showSecond && isInSecond) {
          states[row][col] = 'highlighting';
        } else {
          states[row][col] = 'empty';
        }
      }
    }

    return states;
  }, [fraction1, fraction2, rows, cols, showFirst, showSecond, showOverlap]);

  const cellWidth = size / cols;
  const cellHeight = size / rows;

  return (
    <div className={`${styles.container} ${className}`}>
      <div
        className={styles.grid}
        style={{
          width: size,
          height: size,
          gridTemplateRows: `repeat(${rows}, 1fr)`,
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          opacity: animationProgress,
        }}
      >
        {cellStates.map((rowStates, row) =>
          rowStates.map((state, col) => (
            <div
              key={`${row}-${col}`}
              className={`${styles.cell} ${styles[state]}`}
              style={{
                width: cellWidth,
                height: cellHeight,
                animationDelay: `${(row * cols + col) * 30}ms`,
              }}
            />
          ))
        )}
      </div>

      {/* Vertical division lines for fraction1 */}
      {showFirst && (
        <div className={styles.verticalLines}>
          {Array.from({ length: cols - 1 }).map((_, i) => (
            <div
              key={i}
              className={styles.divisionLine}
              style={{
                left: `${((i + 1) / cols) * 100}%`,
                height: '100%',
              }}
            />
          ))}
        </div>
      )}

      {/* Horizontal division lines for fraction2 */}
      {showSecond && (
        <div className={styles.horizontalLines}>
          {Array.from({ length: rows - 1 }).map((_, i) => (
            <div
              key={i}
              className={`${styles.divisionLine} ${styles.horizontal}`}
              style={{
                top: `${((i + 1) / rows) * 100}%`,
                width: '100%',
              }}
            />
          ))}
        </div>
      )}

      {/* Result label */}
      {showOverlap && (
        <div className={styles.resultLabel}>
          {fraction1.numerator * fraction2.numerator} / {fraction1.denominator * fraction2.denominator}
        </div>
      )}
    </div>
  );
};
