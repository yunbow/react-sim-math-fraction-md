import React from 'react';
import { Fraction, CellState } from '../../../../types';
import styles from './FractionGrid.module.css';

export interface FractionGridProps {
  fraction: Fraction;
  rows?: number;
  cols?: number;
  cellStates?: CellState[][];
  direction?: 'horizontal' | 'vertical';
  size?: number;
  animationDelay?: number;
  className?: string;
}

export const FractionGrid: React.FC<FractionGridProps> = ({
  fraction,
  rows,
  cols,
  cellStates,
  direction = 'horizontal',
  size = 200,
  animationDelay = 0,
  className = '',
}) => {
  const gridRows = rows ?? (direction === 'vertical' ? fraction.denominator : 1);
  const gridCols = cols ?? (direction === 'horizontal' ? fraction.denominator : 1);

  const getCellState = (row: number, col: number): CellState => {
    if (cellStates && cellStates[row] && cellStates[row][col]) {
      return cellStates[row][col];
    }

    // Default state based on fraction
    const filledCount = fraction.numerator;
    const index = direction === 'horizontal' ? col : row;
    return index < filledCount ? 'filled' : 'empty';
  };

  const cellWidth = size / gridCols;
  const cellHeight = size / gridRows;

  return (
    <div
      className={`${styles.grid} ${className}`}
      style={{
        width: size,
        height: size,
        gridTemplateRows: `repeat(${gridRows}, 1fr)`,
        gridTemplateColumns: `repeat(${gridCols}, 1fr)`,
      }}
    >
      {Array.from({ length: gridRows }).map((_, row) =>
        Array.from({ length: gridCols }).map((_, col) => {
          const state = getCellState(row, col);
          const delay = animationDelay + (row * gridCols + col) * 50;
          return (
            <div
              key={`${row}-${col}`}
              className={`${styles.cell} ${styles[state]}`}
              style={{
                width: cellWidth,
                height: cellHeight,
                animationDelay: `${delay}ms`,
              }}
            />
          );
        })
      )}
    </div>
  );
};
