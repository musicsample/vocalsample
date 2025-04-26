# Firebase ファイルアップローダー

MP3ファイルと画像ファイルをFirebase Realtime Databaseにアップロードするシンプルなウェブアプリケーションです。ファイルはBase64エンコードされてデータベースに保存されます。

## セットアップ方法

1. Firebase プロジェクトを作成する
   - [Firebase Console](https://console.firebase.google.com/)にアクセスして新しいプロジェクトを作成します
   - 「Webアプリ」を追加して、Firebaseをウェブアプリに登録します

2. Firebase Realtime Database を有効にする
   - Firebase Consoleで「Realtime Database」を選択し、セットアップします
   - セキュリティルールを適切に設定します（開発用にはテストモードで構いません）

3. Firebase 設定情報を更新する
   - `app.js` ファイル内の `firebaseConfig` オブジェクトを、Firebase Consoleから取得した実際の設定情報に更新します
   - `databaseURL`は既に設定済みです: `https://vocalsample-f9e8e-default-rtdb.firebaseio.com`

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  databaseURL: "https://vocalsample-f9e8e-default-rtdb.firebaseio.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

## 使用方法

1. Webサーバーでアプリを実行する
   - ローカルのウェブサーバーやFirebase Hostingなどを使用してアプリを実行します

2. MP3ファイルをアップロードする
   - 「MP3ファイルアップロード」セクションでファイルを選択し、「アップロード」ボタンをクリックします
   - アップロードが完了すると、ファイルのIDが表示されます
   - ファイルはデータベースの `audio/` パスに保存されます

3. 画像ファイルをアップロードする
   - 「画像ファイルアップロード」セクションでファイルを選択すると、プレビューが表示されます
   - 「アップロード」ボタンをクリックしてFirebase Realtime Databaseにアップロードします
   - アップロードが完了すると、画像のIDが表示されます
   - 画像はデータベースの `images/` パスに保存されます

## 注意事項

- このアプリはデモ用であり、本番環境で使用する場合は適切なセキュリティ対策を施してください
- Firebase Realtime Databaseには容量制限があります。大きなファイルや多数のファイルを扱う場合は注意してください
- ファイルはBase64エンコードされてデータベースに保存されるため、ファイルサイズが約33%増加します
- 大きなファイルは Firebase Storage を使用する方が効率的です 