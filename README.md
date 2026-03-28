# 美容室「24」（顧客向け LIFF 予約サイト）

`projects/salon-24` は、美容室 **24** 向けの予約 LIFF を独立運用するための Next.js アプリです。  
構成は `bride-innovation` と同系統で、**店舗 → メニュー → 日時 → 確認** の流れです。

## 特徴

- **単店舗**のときは、予約開始時に店舗を自動選択して **メニュー画面へスキップ**します。
- 複数店舗に増やす場合は `data/dummyData.ts` の `venues` に行を追加すると、店舗選択画面が表示されます。

## 技術構成

- Next.js 16（App Router）
- LIFF SDK（`@line/liff`）
- `/api/reservations` で GAS へサーバーサイド中継（本番接続時）

## 環境変数

`.env.example` を参考に `.env.local` を作成してください。

```env
GAS_WEBAPP_URL=https://script.google.com/macros/s/xxxxxxxxxxxx/exec
NEXT_PUBLIC_LIFF_ID=xxxxxxxxxx
```

## ローカル起動

```bash
cd projects/salon-24
npm install
npm run dev
```

ブラウザ: `http://localhost:3011`

## Vercel

- Root Directory: `projects/salon-24`
- 環境変数: `GAS_WEBAPP_URL` / `NEXT_PUBLIC_LIFF_ID`

## データのカスタマイズ

- 店名・住所・電話: `data/dummyData.ts` の `store`
- 店舗一覧: `venues`（単一なら自動スキップ）
- メニュー: `menus`（`hair` / `mens`）
- スタッフ: `staffList`（先頭は「指名なし」推奨）
