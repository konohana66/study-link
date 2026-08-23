// ==========================
// Study Link
// 今日のチャレンジ
// ==========================


// ログイン確認
if (!localStorage.getItem("username")) {

    location.href = "login.html";

}


// ==========================
// チャレンジ開始
// ==========================

function startChallenge(count) {

    // 選択した問題数を保存
    localStorage.setItem(
        "dailyChallengeCount",
        count
    );


    // クイズページへ
    location.href = "daily-quiz.html";

}