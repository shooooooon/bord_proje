# Slack学習アプリ

Slackの使い方を学習するためのインタラクティブなウェブアプリケーションです。

## 特徴

- **ステップバイステップ学習**: 基本操作から応用機能まで段階的に学習
- **カテゴリー別コンテンツ**: 基本操作、メッセージング、応用機能の3カテゴリー
- **理解度チェック**: 各レッスン後にクイズで理解度を確認
- **進捗管理**: 学習の進み具合を可視化
- **レスポンシブデザイン**: デスクトップ・モバイル両対応

## 技術スタック

- **バックエンド**: Node.js + Express + TypeScript
- **フロントエンド**: HTML5 + CSS3 + Vanilla JavaScript
- **スタイリング**: カスタムCSS（Slackライクなデザイン）

## セットアップ

### 前提条件

- Node.js (v16以上推奨)
- npm または yarn

### インストール

1. リポジトリをクローン

```bash
git clone <repository-url>
cd bord_proje
```

2. 依存関係をインストール

```bash
npm install
```

3. TypeScriptをビルド

```bash
npm run build
```

### 開発モード

開発モードでサーバーを起動（ホットリロード有効）:

```bash
npm run dev
```

### 本番モード

本番用にビルドして起動:

```bash
npm run build
npm start
```

サーバーは `http://localhost:3000` で起動します。

## プロジェクト構造

```
bord_proje/
├── src/
│   ├── server.ts           # Expressサーバー
│   └── data/
│       └── lessons.ts      # 学習コンテンツデータ
├── public/
│   ├── index.html          # メインHTML
│   ├── css/
│   │   └── styles.css      # スタイルシート
│   └── js/
│       └── app.js          # フロントエンドロジック
├── dist/                   # TypeScriptビルド出力
├── package.json
├── tsconfig.json
└── README.md
```

## 学習コンテンツ

### 基本操作
- Slackとは？
- チャンネルの使い方

### メッセージング
- メッセージの送信と書式
- メンションとリアクション

### 応用機能
- スレッド機能
- ファイル共有とアプリ連携

## API エンドポイント

### レッスン関連
- `GET /api/categories` - カテゴリー一覧取得
- `GET /api/lessons` - 全レッスン取得
- `GET /api/lessons?category=<categoryId>` - カテゴリー別レッスン取得
- `GET /api/lessons/:id` - 特定レッスン取得
- `POST /api/lessons/:id/quiz` - クイズ回答送信

### 進捗管理
- `GET /api/progress/:userId` - ユーザー進捗取得
- `POST /api/progress` - 進捗保存

## カスタマイズ

### 新しいレッスンを追加

`src/data/lessons.ts` の `lessons` 配列に新しいレッスンオブジェクトを追加:

```typescript
{
  id: 'unique-id',
  title: 'レッスンタイトル',
  description: 'レッスンの説明',
  category: 'basics', // または 'messages', 'advanced'
  content: [
    {
      type: 'text',
      content: 'レッスンのテキスト内容'
    }
  ],
  quiz: {
    question: 'クイズの質問',
    options: ['選択肢1', '選択肢2', '選択肢3', '選択肢4'],
    correctAnswer: 0, // 正解のインデックス
    explanation: '解説文'
  }
}
```

### 新しいカテゴリーを追加

`src/data/lessons.ts` の `categories` 配列に追加:

```typescript
{ id: 'new-category', name: 'カテゴリー名', icon: '🎯' }
```

## ライセンス

MIT

## 今後の拡張案

- データベース統合（現在はメモリ内保存）
- ユーザー認証機能
- 実際のSlack APIとの連携
- より多くの学習コンテンツ
- 学習証明書の発行
- マルチ言語対応
