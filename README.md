# Slack学習アプリ v2.0

Slackの使い方を学習するための**モダンなインタラクティブWebアプリケーション**です。

## 🎯 コンセプト

- **ステップバイステップ学習**: 基本操作から応用機能まで段階的に学習
- **カテゴリー別コンテンツ**: 基本操作、メッセージング、応用機能の3カテゴリー
- **理解度チェック**: 各レッスン後にクイズで理解度を確認
- **進捗管理**: 学習の進み具合を可視化
- **レスポンシブデザイン**: デスクトップ・モバイル両対応

## 🚀 技術スタック

### バックエンド
- **Node.js** + **Express** + **TypeScript**
- RESTful API設計
- CORS対応

### フロントエンド
- **React 18** + **TypeScript**
- **Vite** (高速ビルドツール)
- **Tailwind CSS** (モダンなスタイリング)
- React Context API (状態管理)
- カスタムフック

## 🛠️ セットアップ

### 前提条件

- Node.js (v16以上推奨)
- npm または yarn

### インストール

1. リポジトリをクローン

```bash
git clone <repository-url>
cd bord_proje
```

2. すべての依存関係をインストール

```bash
npm run install:all
```

または手動で：

```bash
cd server && npm install
cd ../client && npm install
```

### 開発モード

開発モードで両方のサーバーを同時起動（推奨）:

```bash
npm run dev
```

または個別に起動：

```bash
# ターミナル1: バックエンドサーバー (ポート3001)
npm run dev:server

# ターミナル2: フロントエンド開発サーバー (ポート3000)
npm run dev:client
```

- フロントエンド: http://localhost:3000
- バックエンドAPI: http://localhost:3001

### 本番ビルド

```bash
# ビルド
npm run build

# サーバー起動
npm start
```

## 📁 プロジェクト構造

```
bord_proje/
├── client/              # Reactフロントエンド
│   ├── src/
│   │   ├── components/  # Reactコンポーネント
│   │   ├── context/     # Context API
│   │   ├── hooks/       # カスタムフック
│   │   ├── types/       # TypeScript型定義
│   │   ├── api/         # APIクライアント
│   │   ├── App.tsx      # メインアプリ
│   │   └── main.tsx     # エントリーポイント
│   ├── index.html
│   ├── package.json
│   └── vite.config.ts
├── server/              # Expressバックエンド
│   ├── src/
│   │   ├── routes/      # APIルート
│   │   ├── data/        # レッスンデータ
│   │   └── server.ts    # サーバーエントリーポイント
│   ├── package.json
│   └── tsconfig.json
├── package.json         # ルートpackage.json
└── README.md
```

## 🎓 学習コンテンツ

### 基本操作
- Slackとは？
- チャンネルの使い方

### メッセージング
- メッセージの送信と書式
- メンションとリアクション

### 応用機能
- スレッド機能
- ファイル共有とアプリ連携

## 🔌 API エンドポイント

### レッスン関連
- `GET /api/categories` - カテゴリー一覧取得
- `GET /api/lessons` - 全レッスン取得
- `GET /api/lessons?category=<categoryId>` - カテゴリー別レッスン取得
- `GET /api/lessons/:id` - 特定レッスン取得
- `POST /api/lessons/:id/quiz` - クイズ回答送信

### 進捗管理
- `GET /api/progress/:userId` - ユーザー進捗取得
- `POST /api/progress` - 進捗保存

## ✨ 主な改善点 (v2.0)

### アーキテクチャ
- ✅ モノリシックからクライアント・サーバー分離へ
- ✅ Vanilla JSからReact + TypeScriptへ移行
- ✅ カスタムCSSからTailwind CSSへ移行
- ✅ Context APIによる状態管理の実装

### 開発体験
- ✅ Viteによる高速開発サーバー・ビルド
- ✅ TypeScriptによる型安全性
- ✅ コンポーネントベースの再利用可能な設計
- ✅ カスタムフックによるロジックの分離

### コード品質
- ✅ モジュール分割による保守性向上
- ✅ APIルートの整理
- ✅ 明確な責務分離

## 🎨 カスタマイズ

### 新しいレッスンを追加

`server/src/data/lessons.ts` の `lessons` 配列に新しいレッスンオブジェクトを追加:

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
    correctAnswer: 0,
    explanation: '解説文'
  }
}
```

### 新しいカテゴリーを追加

`server/src/data/lessons.ts` の `categories` 配列に追加:

```typescript
{ id: 'new-category', name: 'カテゴリー名', icon: '🎯' }
```

## 📝 ライセンス

MIT

## 🔮 今後の拡張案

- [ ] データベース統合（PostgreSQL/MongoDB）
- [ ] ユーザー認証機能（JWT）
- [ ] 実際のSlack APIとの連携
- [ ] より多くの学習コンテンツ
- [ ] 学習証明書の発行
- [ ] マルチ言語対応
- [ ] ダークモード対応
- [ ] ユニットテスト・E2Eテストの追加
