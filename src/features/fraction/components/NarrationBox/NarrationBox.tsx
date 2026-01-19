import React from 'react';
import styles from './NarrationBox.module.css';

export interface NarrationBoxProps {
  message: string;
  type?: 'info' | 'hint' | 'success' | 'warning';
  showIcon?: boolean;
  className?: string;
}

export const NarrationBox: React.FC<NarrationBoxProps> = ({
  message,
  type = 'info',
  showIcon = true,
  className = '',
}) => {
  const getIcon = () => {
    switch (type) {
      case 'info':
        return '💡';
      case 'hint':
        return '🤔';
      case 'success':
        return '✨';
      case 'warning':
        return '⚠️';
      default:
        return '💡';
    }
  };

  if (!message) return null;

  return (
    <div className={`${styles.narrationBox} ${styles[type]} ${className}`}>
      {showIcon && <span className={styles.icon}>{getIcon()}</span>}
      <p className={styles.message}>{message}</p>
    </div>
  );
};
