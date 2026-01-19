import React from 'react';
import { OperationType, LearningMode } from '../../../../types';
import { Button } from '../../../../components/Button';
import { Select } from '../../../../components/Select';
import { Slider } from '../../../../components/Slider';
import styles from './ControlPanel.module.css';

export interface ControlPanelProps {
  operation: OperationType;
  mode: LearningMode;
  speed: number;
  isPlaying: boolean;
  onOperationChange: (operation: OperationType) => void;
  onModeChange: (mode: LearningMode) => void;
  onSpeedChange: (speed: number) => void;
  onPlay: () => void;
  onPause: () => void;
  onReset: () => void;
  onStepForward?: () => void;
  onStepBack?: () => void;
  onRandomProblem: () => void;
  className?: string;
}

const operationOptions = [
  { value: 'multiplication', label: '掛け算（×）' },
  { value: 'division', label: '割り算（÷）' },
];

const modeOptions = [
  { value: 'watch', label: '見るだけ' },
  { value: 'interact', label: '操作モード' },
  { value: 'challenge', label: 'チャレンジ' },
];

export const ControlPanel: React.FC<ControlPanelProps> = ({
  operation,
  mode,
  speed,
  isPlaying,
  onOperationChange,
  onModeChange,
  onSpeedChange,
  onPlay,
  onPause,
  onReset,
  onStepForward,
  onStepBack,
  onRandomProblem,
  className = '',
}) => {
  return (
    <div className={`${styles.controlPanel} ${className}`}>
      {/* Mode and Operation Selection */}
      <div className={styles.selectionRow}>
        <Select
          options={operationOptions}
          value={operation}
          onChange={(v) => onOperationChange(v as OperationType)}
          label="演算タイプ"
        />
        <Select
          options={modeOptions}
          value={mode}
          onChange={(v) => onModeChange(v as LearningMode)}
          label="学習モード"
        />
      </div>

      {/* Playback Controls */}
      <div className={styles.playbackRow}>
        {onStepBack && (
          <Button
            onClick={onStepBack}
            variant="outline"
            size="medium"
            disabled={isPlaying}
          >
            ◀◀
          </Button>
        )}

        <Button
          onClick={isPlaying ? onPause : onPlay}
          variant="primary"
          size="large"
        >
          {isPlaying ? '⏸ 一時停止' : '▶ 再生'}
        </Button>

        {onStepForward && (
          <Button
            onClick={onStepForward}
            variant="outline"
            size="medium"
            disabled={isPlaying}
          >
            ▶▶
          </Button>
        )}

        <Button onClick={onReset} variant="secondary" size="medium">
          ↺ リセット
        </Button>
      </div>

      {/* Speed Control */}
      <div className={styles.speedRow}>
        <Slider
          value={speed}
          onChange={onSpeedChange}
          min={0.5}
          max={2}
          step={0.25}
          label="再生速度"
          showValue
        />
      </div>

      {/* Problem Generation */}
      <div className={styles.problemRow}>
        <Button onClick={onRandomProblem} variant="outline" size="medium">
          🎲 ランダム問題
        </Button>
      </div>
    </div>
  );
};
