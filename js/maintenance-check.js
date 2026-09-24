// =========================
// 🔧 Study Link メンテナンス監視
// =========================

const MAINTENANCE_CHECK_INTERVAL = 10000; // 10秒


// =========================
// 状態
// =========================

let maintenanceChecking = false;
let maintenanceCountdownTimer = null;
let maintenanceDetected = false;


// =========================
// メンテナンス情報取得
// =========================

async function fetchMaintenanceStatus() {

    const controller =
        new AbortController();

    const timeout =
        setTimeout(() => {

            controller.abort();

        }, 5000); // 最大5秒


    try {

        const response =
            await fetch(
                USER_SESSION_GAS_URL +
                "?type=maintenance",
                {
                    cache: "no-store",
                    signal: controller.signal
                }
            );


        if (!response.ok) {

            throw new Error(
                `HTTP ${response.status}`
            );

        }


        const data =
            await response.json();


        if (
            !data ||
            data.result !== "success"
        ) {

            return null;
        }


        return data;


    } finally {

        clearTimeout(timeout);

    }
}


// =========================
// メンテナンス確認
// =========================

async function checkMaintenanceStatus() {

    // 二重実行防止
    if (maintenanceChecking) {
        return;
    }


    const userId =
        localStorage.getItem("userId");


    // 未ログイン
    if (!userId) {
        return;
    }


    maintenanceChecking = true;


    try {

        // =========================
        // 🔧 メンテナンス状態
        // =========================

        const maintenance =
            await fetchMaintenanceStatus();


        if (!maintenance) {
            return;
        }


        const isMaintenance =
            maintenance.maintenance === true ||
            String(
                maintenance.maintenance
            ).toUpperCase() === "TRUE";


        // =========================
        // 🟢 メンテナンスOFF
        // =========================

        if (!isMaintenance) {

            maintenanceDetected =
                false;


            stopMaintenanceCountdown();

            removeMaintenanceBanner();


            // メンテナンスページにいる場合
            if (
                location.pathname.endsWith(
                    "maintenance.html"
                )
            ) {

                location.href =
                    "index.html";

            }


            return;
        }


        // =========================
        // 🔴 メンテナンスON
        // =========================

        // =========================
        // 👤 共通ユーザー情報
        // =========================

        const user =
            await getStudyLinkUser(userId);


        // ユーザー情報が取得できなければ
        // 今回は何もしない
        if (!user) {
            return;
        }


        // =========================
        // 👑 管理者確認
        // =========================

        const isAdmin =
            user.admin === true ||
            String(
                user.admin
            ).toUpperCase() === "TRUE";


        // =========================
        // 👑 管理者
        // =========================

        if (isAdmin) {

            maintenanceDetected =
                false;


            // メンテナンスページにいた場合
            if (
                location.pathname.endsWith(
                    "maintenance.html"
                )
            ) {

                location.href =
                    "index.html";

                return;
            }


            // 管理者にはバナー表示
            showMaintenanceBanner(
                maintenance.message,
                maintenance.endTime
            );


            return;
        }


        // =========================
        // 👤 一般ユーザー
        // =========================

        stopMaintenanceCountdown();

        removeMaintenanceBanner();


        // すでにメンテナンスページなら
        // そのまま
        if (
            location.pathname.endsWith(
                "maintenance.html"
            )
        ) {
            return;
        }


        // 二重リダイレクト防止
        if (maintenanceDetected) {
            return;
        }


        maintenanceDetected =
            true;


        location.href =
            "maintenance.html";


    } catch (error) {

        // タイムアウト
        if (
            error.name === "AbortError"
        ) {

            console.warn(
                "メンテナンス確認がタイムアウトしました。"
            );

        } else {

            console.error(
                "メンテナンス状態の確認に失敗しました。",
                error
            );

        }

    } finally {

        maintenanceChecking =
            false;
    }
}


// =========================
// 🔧 管理者用バナー
// =========================

function showMaintenanceBanner(
    message,
    endTime
) {

    let banner =
        document.getElementById(
            "maintenanceBanner"
        );


    // =========================
    // バナー作成
    // =========================

    if (!banner) {

        banner =
            document.createElement("div");


        banner.id =
            "maintenanceBanner";


        banner.style.position =
            "fixed";


        banner.style.top =
            "0";


        banner.style.left =
            "0";


        banner.style.right =
            "0";


        banner.style.zIndex =
            "99999";


        banner.style.padding =
            "10px 15px";


        banner.style.textAlign =
            "center";


        banner.style.background =
            "#f59e0b";


        banner.style.color =
            "#ffffff";


        banner.style.fontWeight =
            "bold";


        banner.style.boxSizing =
            "border-box";


        document.body.prepend(
            banner
        );
    }


    // =========================
    // 表示更新
    // =========================

    function updateBanner() {

        let endText = "";
        let remainingText = "";


        if (endTime) {

            const date =
                new Date(endTime);


            if (
                !isNaN(
                    date.getTime()
                )
            ) {

                endText =
                    "⏰ 終了予定：" +
                    date.toLocaleString(
                        "ja-JP",
                        {
                            month: "numeric",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit"
                        }
                    );


                const diff =
                    date.getTime() -
                    Date.now();


                // =========================
                // 残り時間
                // =========================

                if (diff > 0) {

                    const totalSeconds =
                        Math.floor(
                            diff / 1000
                        );


                    const hours =
                        Math.floor(
                            totalSeconds / 3600
                        );


                    const minutes =
                        Math.floor(
                            (totalSeconds % 3600) / 60
                        );


                    const seconds =
                        totalSeconds % 60;


                    if (hours > 0) {

                        remainingText =
                            `あと${hours}時間${minutes}分`;

                    } else if (minutes > 0) {

                        remainingText =
                            `あと${minutes}分${seconds}秒`;

                    } else {

                        remainingText =
                            `あと${seconds}秒`;
                    }


                } else {

                    remainingText =
                        "終了予定時刻を過ぎています";
                }
            }
        }


        // =========================
        // XSS対策
        // =========================

        banner.textContent =
            "🔧 メンテナンス中" +
            "　" +
            (
                message ||
                "現在StudyLinkはメンテナンス中です。"
            ) +
            "　" +
            endText +
            "　" +
            remainingText;
    }


    // 最初に更新
    updateBanner();


    // =========================
    // タイマーをリセット
    // =========================

    stopMaintenanceCountdown();


    // 終了時刻があるときだけ
    // 1秒ごとに更新
    if (endTime) {

        maintenanceCountdownTimer =
            setInterval(
                updateBanner,
                1000
            );
    }
}


// =========================
// タイマー停止
// =========================

function stopMaintenanceCountdown() {

    if (
        maintenanceCountdownTimer
    ) {

        clearInterval(
            maintenanceCountdownTimer
        );


        maintenanceCountdownTimer =
            null;
    }
}


// =========================
// バナー削除
// =========================

function removeMaintenanceBanner() {

    const banner =
        document.getElementById(
            "maintenanceBanner"
        );


    if (banner) {
        banner.remove();
    }
}


// =========================
// 🔍 初回確認
// =========================

checkMaintenanceStatus();


// =========================
// 🔄 10秒ごとに確認
// =========================

setInterval(
    checkMaintenanceStatus,
    MAINTENANCE_CHECK_INTERVAL
);