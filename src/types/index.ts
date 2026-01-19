// 分数
export interface Fraction {
  numerator: number;   // 分子
  denominator: number; // 分母
}

// 演算タイプ
export type OperationType = 'multiplication' | 'division';

// 学習モード
export type LearningMode = 'watch' | 'interact' | 'challenge';

// アニメーションフェーズ
export type AnimationPhase =
  | 'idle'
  | 'showFirstFraction'
  | 'showSecondFraction'
  | 'showOperation'
  | 'divisionStep1'      // ÷分母（1あたり化）
  | 'divisionStep2'      // ×分子（1にする）
  | 'showReciprocal'     // 逆数変換表示
  | 'multiplyPhase'      // 掛け算（面積重なり）
  | 'reductionPhase'     // 約分（公約数グリッド）
  | 'showResult'
  | 'completed';

// グリッドセルの状態
export type CellState =
  | 'empty'
  | 'filled'
  | 'overlap'        // 重なり（答え）
  | 'highlighting'   // 約分時のハイライト
  | 'reducing';      // 約分中

// シミュレーション状態
export interface SimulationState {
  fraction1: Fraction;
  fraction2: Fraction;
  operation: OperationType;
  mode: LearningMode;
  phase: AnimationPhase;
  isPlaying: boolean;
  speed: number;
  narration: string;
}

// グリッドセル情報
export interface GridCell {
  row: number;
  col: number;
  state: CellState;
}

// アニメーション進行状態
export interface AnimationProgress {
  currentPhase: AnimationPhase;
  phaseProgress: number; // 0-1
  totalProgress: number; // 0-1
}
