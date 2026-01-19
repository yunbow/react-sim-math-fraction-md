import React from 'react';
import styles from './Slider.module.css';

export interface SliderProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  showValue?: boolean;
  className?: string;
}

export const Slider: React.FC<SliderProps> = ({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  label,
  showValue = true,
  className = '',
}) => {
  return (
    <div className={`${styles.container} ${className}`}>
      {label && (
        <div className={styles.header}>
          <label className={styles.label}>{label}</label>
          {showValue && <span className={styles.value}>{value}</span>}
        </div>
      )}
      <input
        type="range"
        className={styles.slider}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        min={min}
        max={max}
        step={step}
      />
    </div>
  );
};
