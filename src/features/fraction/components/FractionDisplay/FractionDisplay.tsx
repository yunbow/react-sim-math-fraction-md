import React from 'react';
import { Fraction } from '../../../../types';
import styles from './FractionDisplay.module.css';

export interface FractionDisplayProps {
  fraction: Fraction;
  size?: 'small' | 'medium' | 'large';
  highlighted?: boolean;
  color?: string;
  className?: string;
}

export const FractionDisplay: React.FC<FractionDisplayProps> = ({
  fraction,
  size = 'medium',
  highlighted = false,
  color,
  className = '',
}) => {
  const style = color ? { '--fraction-color': color } as React.CSSProperties : undefined;

  return (
    <div
      className={`${styles.fraction} ${styles[size]} ${highlighted ? styles.highlighted : ''} ${className}`}
      style={style}
    >
      <span className={styles.numerator}>{fraction.numerator}</span>
      <span className={styles.line}></span>
      <span className={styles.denominator}>{fraction.denominator}</span>
    </div>
  );
};
