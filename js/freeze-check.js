// =========================
// 🔒 Study Link 凍結監視
// =========================

const FREEZE_CHECK_INTERVAL = 10000; // 10秒


// =========================
// 状態
// =========================

let freezeChecking = false;


// =========================
// 凍結確認
// =========================

async function checkAccountFreeze() {

    // すでに確認中なら重複実行しない
    if (freezeChecking) {
        return;
    }

    const userId =
        localStorage.getItem("userId");

    // 未ログイン
    if (!userId) {
        return;
    }

    freezeChecking = true;

    try {

        // =========================
        // 👤 共通ユーザー情報を取得
        // =========================

        const user =
            await getStudyLinkUser(userId);

        // 取得できなかった場合
        if (!user) {
            return;
        }


        // =========================
        // 🔒 凍結確認
        // =========================

        const isFrozen =
            user.frozen === true ||
            String(user.frozen).toLowerCase() === "true";


        if (!isFrozen) {
            return;
        }


        // =========================
        // 二重実行防止
        // =========================

        if (
            window.accountFreezeDetected
        ) {
            return;
        }

        window.accountFreezeDetected =
            true;


        // =========================
        // ログアウト
        // =========================

        alert(
            "🔒 このアカウントは管理者によって凍結されました。\nログアウトします。"
        );


        localStorage.removeItem(
            "userId"
        );

        localStorage.removeItem(
            "username"
        );


        // ログイン画面へ
        location.href =
            "login.html";


    } catch (error) {

        console.error(
            "凍結状態の確認に失敗しました。",
            error
        );

    } finally {

        freezeChecking = false;

    }
}


// =========================
// 🔍 初回確認
// =========================

checkAccountFreeze();


// =========================
// 🔄 10秒ごとに確認
// =========================

setInterval(
    checkAccountFreeze,
    FREEZE_CHECK_INTERVAL
);