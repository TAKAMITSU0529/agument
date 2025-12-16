# アグメントグループ コーポレートサイト

## 概要

アグメントグループ（株式会社アグメント・株式会社chita）の統合コーポレートサイトです。

環境事業（浄化槽メンテナンス、廃棄物処理、食品リサイクル、バイオマス燃料製造）と飲食事業（HANROK）を展開する両社の事業性とイメージを統合し、グループとしての発信力を高めるサイト構成となっています。

## サイト構成

```
index.html          - トップページ（グループ理念、社長挨拶、グループ紹介、活動報告、SDGs、ニュース）
recruit.html        - 採用情報（6部署の紹介、社員の声、募集要項）
agument.html        - 株式会社アグメント詳細ページ（会社概要、事業内容、許認可、サービスエリア）
contact.html        - お問い合わせページ（フォーム、連絡先、アクセス）
news.html           - ニュース一覧（カテゴリフィルター付き）
activities.html     - 活動報告一覧（カテゴリフィルター付き）
privacy.html        - プライバシーポリシー

css/
  style.css         - メインスタイルシート
  recruit.css       - 採用ページ専用スタイル
  agument.css       - アグメント詳細ページ専用スタイル
  contact.css       - お問い合わせページ専用スタイル
  news.css          - ニュースページ専用スタイル
  activities.css    - 活動報告ページ専用スタイル
  legal.css         - 法的ページ共通スタイル

js/
  main.js           - メインJavaScript（ローダー、ヘッダー、タブ、スクロールアニメーション、CMS機能）
```

## デザインシステム

### カラーパレット

**プライマリ（環境をイメージしたグリーン）**
- Primary: #1a5f4e
- Primary Light: #2a7a66
- Primary Dark: #0f3d32

**セカンダリ（高級感のあるゴールド/アンバー）**
- Secondary: #c4a35a
- Secondary Light: #d4b86e
- Secondary Dark: #a68c4a

### フォント

- 日本語: Noto Sans JP
- 英語・数字: Outfit

## CMS機能（コンテンツ更新方法）

このサイトは静的HTMLですが、JavaScriptによるCMS的な機能を備えています。
将来的にWordPressやHeadless CMSへの移行も容易に行えます。

### ニュースの追加

ブラウザのコンソールから以下のコマンドで新規ニュースを追加できます：

```javascript
NewsManager.add({
    date: '2024.12.20',
    category: 'お知らせ',  // お知らせ, イベント, 採用, メディア
    title: '新しいニュースのタイトル',
    link: '#'  // または 'news-detail.html?id=xxx'
});
```

### 活動報告の追加

```javascript
ActivityManager.add('social', {  // social, community, culture
    date: '2024.12.20',
    title: '活動のタイトル',
    description: '活動の説明文...',
    image: 'images/activity-xxx.jpg'  // 省略可
});
```

## 本番環境への移行

### 1. 画像の追加

現在プレースホルダーになっている箇所に実際の画像を追加してください：

- 社長写真: `index.html` の社長挨拶セクション
- 社員写真: `recruit.html` の各部署紹介
- 活動写真: `activities.html` の各活動カード
- 会社ロゴ: 必要に応じてヘッダー・フッターに

### 2. 会社情報の更新

以下の情報を実際のデータに更新してください：

- `index.html`: 社長挨拶の署名欄
- `agument.html`: 設立年、資本金、従業員数
- Google Mapsの埋め込み（`contact.html`, `agument.html`）

### 3. フォーム機能の実装

現在のフォームはフロントエンドのみです。以下の方法で実装してください：

**方法1: フォームサービス利用**
- Formspree
- Netlify Forms
- Google Forms

**方法2: バックエンド実装**
- PHP + SendMailでの実装
- Node.js + Nodemailerでの実装

### 4. WordPress化（オプション）

WordPress化する場合の推奨構成：

1. カスタムテーマとして構築
2. カスタム投稿タイプ:
   - ニュース (news)
   - 活動報告 (activities)
   - 求人情報 (jobs)
3. Advanced Custom Fieldsで各種フィールドを追加

## ブラウザ対応

- Chrome (最新版)
- Firefox (最新版)
- Safari (最新版)
- Edge (最新版)
- iOS Safari
- Android Chrome

## ライセンス

このサイトのコード・デザインはアグメントグループ専用です。

---

制作: 2024年12月
