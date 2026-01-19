# 分数の掛け算・割り算・約分シミュレーター

React 18とTypeScriptで構築された分数の掛け算、割り算、約分を視覚的に学習できるアプリケーションです。

## デモプレイ
https://yunbow.github.io/react-sim-math-fraction-md/demo/

## 主要機能

### 1. 分数の掛け算可視化
- **グリッド表示**
  - 2つの分数を縦横のグリッドで表現
  - 分母に合わせてグリッドを分割
- **重なり領域の可視化**
  - 1つ目の分数（横方向）と2つ目の分数（縦方向）の重なり部分を色分け
  - 掛け算の結果が視覚的に理解できる
- **アニメーション表示**
  - セルが順番に表示され、計算過程を追える

### 2. 分数の割り算可視化
- **逆数変換の理解**
  - 割り算を掛け算に変換するプロセスを視覚化
- **ステップバイステップ表示**
  - 除数を逆数にする過程をカード反転アニメーションで表現
  - 各ステップの説明を日本語で表示
- **バー表示**
  - 1を基準としたバーで分数の大きさを表現

### 3. 約分の可視化
- **最大公約数（GCD）の表示**
  - 分子と分母の最大公約数を計算して表示
- **ブロックのグループ化**
  - 分子と分母をブロックで表現
  - GCDの数でグループ分けして色分け
- **約分プロセス**
  - ブロックがまとまっていく様子をアニメーションで表現
  - 約分前後の分数を比較表示

### 4. 分数入力機能
- **直接入力**
  - 分母と分子を数値で入力
- **スライダー操作**
  - スライダーで値を調整して変化を観察

### 5. ナレーション機能
- **ステップ解説**
  - 各計算ステップで日本語の説明を表示
  - 「次へ」ボタンでステップを順番に進行

## 技術スタック

- **React 18** - UIライブラリ
- **TypeScript** - プログラミング言語
- **Storybook 7** - コンポーネント開発・ドキュメント
- **CSS Modules** - スタイリング
- **Vite** - ビルドツール

## プロジェクト構造

```
src/
├── features/                              # 機能別モジュール
│   └── fraction/                          # 分数機能
│       ├── components/                    # 機能専用コンポーネント
│       │   ├── MultiplicationView/        # 掛け算可視化
│       │   ├── DivisionView/              # 割り算可視化
│       │   ├── ReductionView/             # 約分可視化
│       │   ├── FractionDisplay/           # 分数表示
│       │   ├── FractionInput/             # 分数入力
│       │   ├── FractionGrid/              # 分数グリッド
│       │   ├── UnitFrame/                 # 単位フレーム
│       │   ├── ControlPanel/              # 操作パネル
│       │   └── NarrationBox/              # ナレーション表示
│       ├── FractionSimulator/             # メインシミュレーター
│       ├── hooks/                         # カスタムフック
│       │   └── useAnimationController.ts  # アニメーション制御
│       └── utils/                         # ユーティリティ
│           ├── gcd.ts                     # 最大公約数計算
│           └── fractionMath.ts            # 分数計算
├── components/                            # 共通UIコンポーネント
│   ├── Button/                            # ボタン
│   ├── Select/                            # セレクトボックス
│   └── Slider/                            # スライダー
├── types/                                 # 汎用的な型定義
│   └── index.ts
├── App.tsx                                # メインアプリ
├── main.tsx                               # エントリーポイント
└── theme.css                              # テーマカラー定義
```

## スクリプト

```bash
# セットアップ
npm install

# 開発サーバー起動
npm run dev

# ビルド
npm run build

# プレビュー
npm run preview

# Storybook起動
npm run storybook

# Storybook ビルド
npm run build-storybook
```

## ライセンス

MIT License
