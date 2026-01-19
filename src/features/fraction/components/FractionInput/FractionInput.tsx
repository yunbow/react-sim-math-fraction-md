import React from 'react';
import { Fraction } from '../../../../types';
import styles from './FractionInput.module.css';

export interface FractionInputProps {
  value: Fraction;
  onChange: (fraction: Fraction) => void;
  label?: string;
  minValue?: number;
  maxValue?: number;
  disabled?: boolean;
  className?: string;
}

export const FractionInput: React.FC<FractionInputProps> = ({
  value,
  onChange,
  label,
  minValue = 1,
  maxValue = 10,
  disabled = false,
  className = '',
}) => {
  const handleNumeratorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Math.max(minValue, Math.min(maxValue, parseInt(e.target.value) || 1));
    onChange({ ...value, numerator: newValue });
  };

  const handleDenominatorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Math.max(minValue, Math.min(maxValue, parseInt(e.target.value) || 1));
    onChange({ ...value, denominator: newValue });
  };

  return (
    <div className={`${styles.container} ${className}`}>
      {label && <label className={styles.label}>{label}</label>}
      <div className={styles.fractionInputWrapper}>
        <input
          type="number"
          className={styles.input}
          value={value.numerator}
          onChange={handleNumeratorChange}
          min={minValue}
          max={maxValue}
          disabled={disabled}
          aria-label="分子"
        />
        <div className={styles.divider}></div>
        <input
          type="number"
          className={styles.input}
          value={value.denominator}
          onChange={handleDenominatorChange}
          min={minValue}
          max={maxValue}
          disabled={disabled}
          aria-label="分母"
        />
      </div>
      <div className={styles.hints}>
        <span className={styles.hint}>分子</span>
        <span className={styles.hint}>分母</span>
      </div>
    </div>
  );
};
