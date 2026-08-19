// =========================
// お知らせ一覧
// =========================

async function loadNotices() {

    try {

        const response = await fetch(
            "https://script.google.com/macros/s/AKfycbxdL1vYB2Iv6hpQOTDnvmBaIAChjsxXUvEIQdm9U-TM2hqBPeSGsrkVdJwLVNqN4Mcp/exec?type=notices"
        );

        const notices = await response.json();

        const noticeList = document.getElementById("noticeList");

        if (!noticeList) return;

        noticeList.innerHTML = "";

        notices.reverse().forEach(notice => {

            noticeList.innerHTML += `
                <div class="notice">
                    <h3>${notice.title}</h3>
                    <p>${notice.content}</p>
                </div>
            `;

        });

    } catch (error) {

        console.error(error);

    }

}

// =========================
// ローディング画面
// =========================

window.addEventListener("load", () => {

    loadNotices();
    loadTodaySchedule();
    loadGifts();

    const loading = document.getElementById("loading");

    if (!loading) return;

    setTimeout(() => {

        loading.style.opacity = "0";

        setTimeout(() => {

            loading.style.display = "none";

        }, 500);

    }, 1000);

});

async function loadTodaySchedule() {

    try {

        const response = await fetch(
            "https://script.google.com/macros/s/AKfycbxdL1vYB2Iv6hpQOTDnvmBaIAChjsxXUvEIQdm9U-TM2hqBPeSGsrkVdJwLVNqN4Mcp/exec?type=calendar"
        );

        const events = await response.json();

        const schedule =
            document.getElementById("todaySchedule");

        if (!schedule) return;

        schedule.innerHTML = "";

        // 今日の日付
        const today = new Date();

        const todayString =
            `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;


        // =========================
        // 今日が期間内に入っている予定
        // =========================

        const todayEvents = events.filter(event => {

            const startDate =
                formatLocalDate(event.startDate);

            const endDate =
                formatLocalDate(event.endDate);

            return (
                startDate &&
                endDate &&
                todayString >= startDate &&
                todayString <= endDate
            );

        });


        // =========================
        // 予定なし
        // =========================

        if (todayEvents.length === 0) {

            schedule.innerHTML =
                "<p>今日は予定はありません😊</p>";

            return;

        }


        // =========================
        // 予定表示
        // =========================

        todayEvents.forEach(event => {

            schedule.innerHTML += `

                <div class="notice">

                    <h3>
                        📌 ${escapeHtml(event.title)}
                    </h3>

                    <p>
                        ${escapeHtml(event.content || "")}
                    </p>

                </div>

            `;

        });


    } catch (error) {

        console.error(
            "今日の予定の読み込みに失敗しました",
            error
        );

    }

}


// =========================
// 日付を YYYY-MM-DD に変換
// =========================

function formatLocalDate(value) {

    if (!value) return "";

    const date = new Date(value);

    if (isNaN(date.getTime())) {
        return "";
    }

    return `${date.getFullYear()}-${String(
        date.getMonth() + 1
    ).padStart(2, "0")}-${String(
        date.getDate()
    ).padStart(2, "0")}`;

}


// =========================
// HTMLエスケープ
// =========================

function escapeHtml(text) {

    const div =
        document.createElement("div");

    div.textContent =
        text || "";

    return div.innerHTML;

}

// =========================
// プレゼント一覧
// =========================

async function loadGifts() {

    const giftList =
        document.getElementById("giftList");

    if (!giftList) return;


    const userId =
        localStorage.getItem("userId");


    if (!userId) {

        giftList.innerHTML =
            "<p>ユーザー情報を確認できません。</p>";

        return;

    }


    try {

        const response =
            await fetch(
                "https://script.google.com/macros/s/AKfycbxdL1vYB2Iv6hpQOTDnvmBaIAChjsxXUvEIQdm9U-TM2hqBPeSGsrkVdJwLVNqN4Mcp/exec?type=user&userId=" +
                encodeURIComponent(userId)
            );


        const user =
            await response.json();


        if (user.result === "error") {

            giftList.innerHTML =
                "<p>ユーザー情報を取得できません。</p>";

            return;

        }


        // =========================
        // 未受取プレゼント
        // =========================

        let gifts = [];

        try {

            gifts =
                user.pendingGifts
                    ? JSON.parse(user.pendingGifts)
                    : [];

        } catch (error) {

            console.error(
                "pendingGiftsの解析に失敗しました",
                error
            );

            gifts = [];

        }


        giftList.innerHTML = "";


        if (
            !Array.isArray(gifts) ||
            gifts.length === 0
        ) {

            giftList.innerHTML =
                "<p>🎁 プレゼントはありません。</p>";

            return;

        }


        // =========================
        // 新しい順
        // =========================

        gifts
            .slice()
            .reverse()
            .forEach(gift => {


                // =========================
                // 中身を作る
                // =========================

                let giftItems = "";


                if (
                    Array.isArray(gift.gifts)
                ) {

                    gift.gifts.forEach(item => {


                        // Coin

                        if (
                            item.type === "coin"
                        ) {

                            giftItems += `
                                <p>
                                    🪙
                                    ${Number(item.amount) || 0}
                                    Coin
                                </p>
                            `;

                        }


                        // Ticket

                        else if (
                            item.type === "ticket"
                        ) {

                            giftItems += `
                                <p>
                                    🎟️
                                    抽選券 ×
                                    ${Number(item.amount) || 0}
                                </p>
                            `;

                        }


                        // 背景

                        else if (
                            item.type === "background"
                        ) {

                            giftItems += `
                                <p>
                                    🎨
                                    限定背景：
                                    ${item.item || ""}
                                </p>
                            `;

                        }


                        // フレーム

                        else if (
                            item.type === "frame"
                        ) {

                            giftItems += `
                                <p>
                                    🖼️
                                    限定フレーム：
                                    ${item.item || ""}
                                </p>
                            `;

                        }


                        // アイコン

                        else if (
                            item.type === "icon"
                        ) {

                            giftItems += `
                                <p>
                                    👤
                                    限定アイコン：
                                    ${item.item || ""}
                                </p>
                            `;

                        }


                        // 称号

                        else if (
                            item.type === "title"
                        ) {

                            giftItems += `
                                <p>
                                    🏷️
                                    限定称号：
                                    ${item.item || ""}
                                </p>
                            `;

                        }


                        // その他

                        else {

                            giftItems += `
                                <p>
                                    🎁
                                    ${item.item || "アイテム"}
                                </p>
                            `;

                        }

                    });

                }


                // =========================
                // プレゼント表示
                // =========================

                giftList.innerHTML += `

                    <div class="gift-card">

                        <h3>
                            🎁
                            ${gift.title || "プレゼント"}
                        </h3>


                        ${
                            gift.content
                            ? `
                                <p>
                                    ${gift.content}
                                </p>
                            `
                            : ""
                        }


                        <div class="gift-items">

                            ${giftItems}

                        </div>


                        ${
                            gift.message
                            ? `
                                <p>
                                    💬
                                    ${gift.message}
                                </p>
                            `
                            : ""
                        }


                        <button
                            onclick="receiveGift('${gift.id}')">

                            🎁 すべて受け取る

                        </button>

                    </div>

                `;

            });


    } catch (error) {

        console.error(
            "プレゼントの読み込みに失敗しました",
            error
        );


        giftList.innerHTML =
            "<p>プレゼントの読み込みに失敗しました。</p>";

    }

}

// =========================
// プレゼントを受け取る
// =========================

async function receiveGift(giftId) {

    const userId =
        localStorage.getItem("userId");


    if (!userId) {

        alert(
            "ユーザー情報を確認できません。"
        );

        return;

    }


    if (
        !confirm(
            "このプレゼントを受け取りますか？"
        )
    ) {

        return;

    }


    try {

        const response =
            await fetch(

                "https://script.google.com/macros/s/AKfycbxdL1vYB2Iv6hpQOTDnvmBaIAChjsxXUvEIQdm9U-TM2hqBPeSGsrkVdJwLVNqN4Mcp/exec",

                {

                    method: "POST",

                    body: JSON.stringify({

                        type:
                            "receiveGift",

                        giftId:
                            giftId,

                        userId:
                            userId

                    })

                }

            );


        const result =
            await response.json();

console.log(
    "受け取り結果:",
    JSON.stringify(result, null, 2)
);

        if (
            result.result ===
            "success"
        ) {

// =========================
// 🎁 獲得演出
// =========================

showGiftPopup(result.gift);

// プレゼント一覧更新
loadGifts();


        } else {

            alert(
                result.message ||
                "受け取りに失敗しました。"
            );

        }


    } catch (error) {

        console.error(
            "プレゼント受け取りエラー",
            error
        );


        alert(
            "通信エラーが発生しました。"
        );

    }

}
// =========================
// 🎁 プレゼント獲得ポップアップ
// =========================

function showGiftPopup(gift) {

    const popup =
        document.getElementById("giftPopup");

    const items =
        document.getElementById("giftPopupItems");

    const closeButton =
        document.getElementById("giftPopupClose");

    if (!popup || !items || !closeButton) {
        console.error("プレゼントポップアップの要素が見つかりません");
        return;
    }

    // =========================
    // 中身
    // =========================

    items.innerHTML = "";

    if (
        gift &&
        Array.isArray(gift.gifts)
    ) {

        gift.gifts.forEach(item => {

            if (item.type === "coin") {

                items.innerHTML += `
                    <p>🪙 +${Number(item.amount) || 0} Coin</p>
                `;

            }

            else if (item.type === "ticket") {

                items.innerHTML += `
                    <p>🎟️ +${Number(item.amount) || 0} 抽選券</p>
                `;

            }

            else if (item.type === "background") {

                items.innerHTML += `
                    <p>🎨 ${item.item || "限定背景"} GET！</p>
                `;

            }

            else if (item.type === "frame") {

                items.innerHTML += `
                    <p>🖼️ ${item.item || "限定フレーム"} GET！</p>
                `;

            }

            else if (item.type === "icon") {

                items.innerHTML += `
                    <p>👤 ${item.item || "限定アイコン"} GET！</p>
                `;

            }

            else if (item.type === "title") {

                items.innerHTML += `
                    <p>🏷️ ${item.item || "限定称号"} GET！</p>
                `;

            }

        });

    }


    // =========================
    // 表示
    // =========================

    popup.style.display = "flex";


    // =========================
    // OKボタン
    // =========================

    closeButton.onclick = function () {

        popup.style.display = "none";

    };

}