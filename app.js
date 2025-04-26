// Firebase設定
// 注意: 実際の使用時には必要に応じて他の設定情報も追加してください
const firebaseConfig = {
  // databaseURLのみ指定（他のパラメータは必要に応じて追加）
  databaseURL: "https://vocalsample-f9e8e-default-rtdb.firebaseio.com"
};

// Firebase初期化
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// DOM要素の取得
const audioFileInput = document.getElementById('audioFile');
const uploadAudioButton = document.getElementById('uploadAudio');
const audioProgressBar = document.getElementById('audioProgress');
const audioUrlDiv = document.getElementById('audioUrl');

const imageFileInput = document.getElementById('imageFile');
const uploadImageButton = document.getElementById('uploadImage');
const imageProgressBar = document.getElementById('imageProgress');
const imagePreview = document.getElementById('imagePreview');
const imageUrlDiv = document.getElementById('imageUrl');

// ファイルをBase64エンコードする関数
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

// 安全なデータベースパスを生成する関数
function getSafePath(fileName) {
  // 日本語文字やその他の特殊文字を避けるためにタイムスタンプのみを使用
  return `${Date.now()}`;
}

// アップロード進捗をシミュレートする関数
function simulateProgress(progressBar, callback) {
  let progress = 0;
  const interval = setInterval(() => {
    progress += 5;
    progressBar.style.width = progress + '%';
    if (progress >= 100) {
      clearInterval(interval);
      callback();
    }
  }, 50);
}

// MP3ファイルアップロード
uploadAudioButton.addEventListener('click', async () => {
  const file = audioFileInput.files[0];
  if (!file) {
    alert('ファイルを選択してください');
    return;
  }

  try {
    // ファイルをBase64エンコード
    const base64Data = await getBase64(file);
    
    // 安全なパスを生成
    const safePath = getSafePath(file.name);
    
    // 進捗バーのシミュレーション開始
    simulateProgress(audioProgressBar, async () => {
      // Realtime Databaseに保存
      const audioRef = database.ref('audio/' + safePath);
      await audioRef.set({
        name: file.name,
        type: file.type,
        size: file.size,
        data: base64Data,
        timestamp: firebase.database.ServerValue.TIMESTAMP
      });
      
      // 成功メッセージの表示
      audioUrlDiv.innerHTML = `<p>アップロード成功!</p><p>ID: ${safePath}</p>`;
      audioFileInput.value = '';
    });
  } catch (error) {
    console.error('アップロードエラー:', error);
    alert('アップロードに失敗しました: ' + error.message);
  }
});

// 画像ファイルアップロード
uploadImageButton.addEventListener('click', async () => {
  const file = imageFileInput.files[0];
  if (!file) {
    alert('ファイルを選択してください');
    return;
  }

  try {
    // ファイルをBase64エンコード
    const base64Data = await getBase64(file);
    
    // 安全なパスを生成
    const safePath = getSafePath(file.name);
    
    // 進捗バーのシミュレーション開始
    simulateProgress(imageProgressBar, async () => {
      // Realtime Databaseに保存
      const imageRef = database.ref('images/' + safePath);
      await imageRef.set({
        name: file.name,
        type: file.type,
        size: file.size,
        data: base64Data,
        timestamp: firebase.database.ServerValue.TIMESTAMP
      });
      
      // 成功メッセージの表示
      imageUrlDiv.innerHTML = `<p>アップロード成功!</p><p>ID: ${safePath}</p>`;
      imageFileInput.value = '';
    });
  } catch (error) {
    console.error('アップロードエラー:', error);
    alert('アップロードに失敗しました: ' + error.message);
  }
});

// 画像プレビュー表示
imageFileInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.src = e.target.result;
      imagePreview.style.display = 'block';
    };
    reader.readAsDataURL(file);
  } else {
    imagePreview.style.display = 'none';
  }
}); 