export interface Lesson {
  id: string;
  title: string;
  description: string;
  category: string;
  content: LessonContent[];
  quiz?: Quiz;
}

export interface LessonContent {
  type: 'text' | 'image' | 'code' | 'tip';
  content: string;
  imageUrl?: string;
}

export interface Quiz {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export const lessons: Lesson[] = [
  {
    id: 'basics-001',
    title: 'Slackとは？',
    description: 'Slackの基本概念とワークスペースについて学びます',
    category: 'basics',
    content: [
      {
        type: 'text',
        content: 'Slackは、チームコミュニケーションを円滑にするためのプラットフォームです。'
      },
      {
        type: 'text',
        content: 'ワークスペースは、組織やチームのための専用のSlack環境です。'
      },
      {
        type: 'tip',
        content: 'ワークスペースには複数のチャンネルを作成でき、トピックやプロジェクトごとに会話を整理できます。'
      }
    ],
    quiz: {
      question: 'Slackのワークスペースとは何ですか？',
      options: [
        '単一のチャットルーム',
        '組織やチームのための専用のSlack環境',
        '個人のメッセージ機能',
        'ファイル保存場所'
      ],
      correctAnswer: 1,
      explanation: 'ワークスペースは組織やチーム専用のSlack環境で、その中に複数のチャンネルを持つことができます。'
    }
  },
  {
    id: 'basics-002',
    title: 'チャンネルの使い方',
    description: 'チャンネルの作成、参加、管理方法を学びます',
    category: 'basics',
    content: [
      {
        type: 'text',
        content: 'チャンネルは、特定のトピックやプロジェクトに関する会話をまとめる場所です。'
      },
      {
        type: 'text',
        content: 'チャンネルには「パブリック」と「プライベート」の2種類があります。'
      },
      {
        type: 'tip',
        content: 'パブリックチャンネルは「#」で始まり、誰でも参加できます。プライベートチャンネルは「🔒」アイコンで表示され、招待されたメンバーのみ参加できます。'
      },
      {
        type: 'code',
        content: 'チャンネル作成:\n1. サイドバーの「+」ボタンをクリック\n2. 「チャンネルを作成」を選択\n3. チャンネル名と説明を入力\n4. パブリック/プライベートを選択'
      }
    ],
    quiz: {
      question: 'パブリックチャンネルの特徴は？',
      options: [
        '招待されたメンバーのみ参加可能',
        'ワークスペースの全メンバーが参加可能',
        '管理者のみ閲覧可能',
        'ゲストユーザーは参加不可'
      ],
      correctAnswer: 1,
      explanation: 'パブリックチャンネルはワークスペースの全メンバーが検索して参加できます。'
    }
  },
  {
    id: 'messages-001',
    title: 'メッセージの送信と書式',
    description: 'メッセージの送信方法とマークダウン書式を学びます',
    category: 'messages',
    content: [
      {
        type: 'text',
        content: 'Slackでは、テキストメッセージを送信する際に様々な書式を使用できます。'
      },
      {
        type: 'code',
        content: '基本的な書式:\n*太字* - 太字テキスト\n_イタリック_ - イタリックテキスト\n~取り消し線~ - 取り消し線\n`コード` - インラインコード\n```コードブロック``` - コードブロック'
      },
      {
        type: 'tip',
        content: 'Shift + Enterで改行、Enterのみで送信されます。設定で変更も可能です。'
      }
    ],
    quiz: {
      question: 'Slackで太字にするマークダウンは？',
      options: [
        '**太字**',
        '*太字*',
        '__太字__',
        '##太字##'
      ],
      correctAnswer: 1,
      explanation: 'Slackでは *アスタリスク* で囲むと太字になります。'
    }
  },
  {
    id: 'messages-002',
    title: 'メンションとリアクション',
    description: '特定のユーザーへのメンションとリアクション機能を学びます',
    category: 'messages',
    content: [
      {
        type: 'text',
        content: '@メンションを使用すると、特定のユーザーに通知を送ることができます。'
      },
      {
        type: 'code',
        content: 'メンション方法:\n@ユーザー名 - 特定のユーザーに通知\n@channel - チャンネルの全メンバーに通知\n@here - 現在オンラインのメンバーに通知\n@everyone - ワークスペースの全員に通知'
      },
      {
        type: 'text',
        content: 'リアクションは、メッセージに絵文字で反応する機能です。'
      },
      {
        type: 'tip',
        content: 'メッセージにカーソルを合わせて絵文字アイコンをクリック、または「:」を入力して絵文字を検索できます。'
      }
    ],
    quiz: {
      question: '現在オンラインのメンバーのみに通知するメンションは？',
      options: [
        '@channel',
        '@everyone',
        '@here',
        '@online'
      ],
      correctAnswer: 2,
      explanation: '@hereは現在オンラインのメンバーにのみ通知を送ります。'
    }
  },
  {
    id: 'advanced-001',
    title: 'スレッド機能',
    description: 'スレッドを使った効率的な会話の整理方法を学びます',
    category: 'advanced',
    content: [
      {
        type: 'text',
        content: 'スレッドは、メッセージに対する返信を整理するための機能です。'
      },
      {
        type: 'text',
        content: 'メインのチャンネルをすっきり保ちながら、詳細な議論を行うことができます。'
      },
      {
        type: 'code',
        content: 'スレッドの使い方:\n1. メッセージにカーソルを合わせる\n2. 「スレッドに返信」アイコンをクリック\n3. サイドパネルで返信を入力\n4. 必要に応じて「チャンネルにも投稿」をチェック'
      },
      {
        type: 'tip',
        content: '重要な返信は「チャンネルにも投稿」をチェックすることで、全員に通知できます。'
      }
    ],
    quiz: {
      question: 'スレッド機能の主な利点は？',
      options: [
        'メッセージを削除できる',
        '会話を整理してチャンネルをすっきり保てる',
        'メッセージを暗号化できる',
        'ファイルを大量に送信できる'
      ],
      correctAnswer: 1,
      explanation: 'スレッド機能により、関連する会話をまとめて、メインチャンネルを整理できます。'
    }
  },
  {
    id: 'advanced-002',
    title: 'ファイル共有とアプリ連携',
    description: 'ファイルの共有方法と外部アプリとの連携を学びます',
    category: 'advanced',
    content: [
      {
        type: 'text',
        content: 'Slackでは、ドラッグ&ドロップで簡単にファイルを共有できます。'
      },
      {
        type: 'code',
        content: 'ファイル共有方法:\n1. ファイルをSlackにドラッグ&ドロップ\n2. または「+」ボタンから「ファイル」を選択\n3. 共有先のチャンネルやDMを選択\n4. コメントを追加して送信'
      },
      {
        type: 'text',
        content: 'Slackは、Google Drive、GitHub、Trelloなど多数の外部アプリと連携できます。'
      },
      {
        type: 'tip',
        content: 'アプリディレクトリから必要なアプリを検索してインストールできます。通知やワークフローの自動化が可能になります。'
      }
    ],
    quiz: {
      question: 'Slackでファイルを共有する最も簡単な方法は？',
      options: [
        'メールで送信してリンクを貼る',
        'ドラッグ&ドロップ',
        'FTPサーバーを経由',
        'コマンドラインから送信'
      ],
      correctAnswer: 1,
      explanation: 'ドラッグ&ドロップが最も簡単で直感的なファイル共有方法です。'
    }
  }
];

export const categories = [
  { id: 'basics', name: '基本操作', icon: '📚' },
  { id: 'messages', name: 'メッセージング', icon: '💬' },
  { id: 'advanced', name: '応用機能', icon: '🚀' }
];
