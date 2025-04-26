# Firebase アップロード問題の修正手順

## エラーの原因
コンソールに表示されているエラーは、CORSポリシーによって Firebase Storage へのアクセスがブロックされていることを示しています。これは、以下の問題が原因である可能性があります：

1. Firebase Storage の参照が残っていた
2. Firebase の設定情報が不完全または不正確
3. Firebase Realtime Database のセキュリティルールが制限的

## 修正手順

### 1. Firebase Storage の参照を削除
Firebase Storage の代わりに Realtime Database を使用するため、Storage に関連するスクリプトと参照を削除しました。

### 2. Firebase 設定の簡素化
`app.js` ファイルの Firebase 設定を簡素化し、必要最小限の設定だけを含めるよう変更しました。

```javascript
const firebaseConfig = {
  // databaseURLのみ指定（他のパラメータは必要に応じて追加）
  databaseURL: "https://vocalsample-f9e8e-default-rtdb.firebaseio.com"
};
```

### 3. Firebase Realtime Database のセキュリティルール設定

Firebase コンソールで Realtime Database のセキュリティルールを開発用に設定する必要があります：

1. [Firebase Console](https://console.firebase.google.com/) にログイン
2. プロジェクトを選択
3. 左側のメニューから「Realtime Database」を選択
4. 「ルール」タブをクリック
5. 以下のルールを設定して「公開」をクリック（**注: これは開発中のみ使用してください**）

```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```

### 4. アップロードするファイルサイズの考慮
大きなファイルをアップロードする場合、Base64エンコーディングはファイルサイズを約33%増加させるため、小さなファイルでのテストをお勧めします。

### 5. その他の確認事項
- ブラウザのコンソールでエラーメッセージを確認し、具体的な問題があれば対応
- 引き続きエラーが発生する場合は、Firebase プロジェクトの設定を確認
- クロスオリジン問題がある場合は、ローカルサーバーを使用してアプリを実行

## 注意
上記のセキュリティルール設定はテスト用であり、誰でもデータベースに読み書きできる状態になります。本番環境では、適切な認証とセキュリティルールを設定してください。 