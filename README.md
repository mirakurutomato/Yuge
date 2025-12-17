# 第55回 弓削商船商船祭「開花 -Kaika-」特設サイト

第55回 弓削商船高等専門学校 商船祭「開花 -Kaika-」（2025年開催）の終了後に公開された、来場御礼およびアンケート回答用の特設ウェブサイトのソースコードです。

## 📖 概要

本サイトは、商船祭終了後の来場者への感謝を伝えるとともに、次年度以降の運営改善に向けた感想・アンケートを収集することを目的として作成されました。

静的なHTML/CSS/JSで構成されており、モダンなブラウザで動作します。

## ✨ 特徴

* **レスポンシブデザイン**: PCおよびスマートフォン（モバイル）に対応したレイアウト。
* **インタラクティブな背景**: HTML5 Canvas APIを使用したパーティクルアニメーション（`shared.js` / `index.html`）。
* **グラスモーフィズムUI**: すりガラスのような視覚効果を取り入れたデザイン。
* **アーカイブギャラリー**: 過去のポスター画像を横スクロール（カルーセル）で閲覧可能。
* **アンケート機能**: フォームに入力した内容をメール本文に転記し、メーラーを起動する仕組みを実装。

## 🛠 使用技術

* **HTML5**
* **CSS3**
* Tailwind CSS (CDN版を使用)
* Custom CSS (`css/style.css`)

* **JavaScript** (Vanilla ES6+)
* **外部ライブラリ・フォント**
* [Phosphor Icons](https://phosphoricons.com/) (アイコン)
* [Google Fonts](https://fonts.google.com/) (Zen Maru Gothic, Noto Sans JP)

## 📂 ディレクトリ構成

```text
.
├── css/
│   └── style.css       # カスタムスタイル定義
├── image/
│   └── image.png       # 第55回商船祭ポスター画像
├── js/
│   └── shared.js       # 共通ロジック（背景アニメーション、スライダー等）
├── index.html          # メインページ
├── LICENSE             # MIT License
└── README.md           # 本ファイル
```

## 🚀 使用方法

本プロジェクトは静的サイトです。以下の手順で動作確認が可能です。

1. このリポジトリをクローンまたはダウンロードします。
2. `index.html` をWebブラウザ（Chrome, Firefox, Safari, Edge等）で開いてください。

## 👤 クレジット

* **Web制作・著作**: 奥河 董馬 (Toma Okugawa) / [mirakurutomato](https://mirakurutomato.github.io/Toma_Okugawa/)
* **実行委員長**: 森山 玲奈 (情報工学科 3年)
* **主催**: 弓削商船高等専門学校 第55回 商船祭実行委員会
