import React from 'react';
import styles from './UnitFrame.module.css';

export interface UnitFrameProps {
  children?: React.ReactNode;
  size?: number;
  showLabel?: boolean;
  className?: string;
}

export const UnitFrame: React.FC<UnitFrameProps> = ({
  children,
  size = 200,
  showLabel = true,
  className = '',
}) => {
  return (
    <div
      className={`${styles.unitFrame} ${className}`}
      style={{ width: size, height: size }}
    >
      {showLabel && <span className={styles.label}>1</span>}
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
};
