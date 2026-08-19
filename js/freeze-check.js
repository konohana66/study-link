// =========================
// 🔒 Study Link 凍結監視
// =========================

const FREEZE_CHECK_INTERVAL = 10000; // 10秒

async function checkAccountFreeze() {

    const userId = localStorage.getItem("userId");

    // 未ログインなら何もしない
    if (!userId) return;

    try {

        const response = await fetch(
            GAS_URL +
            "?type=user&userId=" +
            encodeURIComponent(userId)
        );

        if (!response.ok) return;

        const user = await response.json();

        if (user.result === "error") return;

        // 🔒 凍結を検知
        if (
            user.frozen === true ||
            user.frozen === "true"
        ) {

            // 二重実行防止
            if (window.accountFreezeDetected) return;

            window.accountFreezeDetected = true;

            alert(
                "🔒 このアカウントは管理者によって凍結されました。\nログアウトします。"
            );

            // ログイン情報を削除
            localStorage.removeItem("userId");
            localStorage.removeItem("username");

            // ログイン画面へ
            location.href = "login.html";
        }

    } catch (error) {

        console.error(
            "凍結状態の確認に失敗しました。",
            error
        );

    }
}


// ページを開いた瞬間に確認
checkAccountFreeze();

// 30秒ごとに確認
setInterval(
    checkAccountFreeze,
    FREEZE_CHECK_INTERVAL
);