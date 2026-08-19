console.log("admin.js 読み込みOK");

// ========================
// ページ一覧
// ========================
const pages = [
    "dashboard",
    "users",
    "notice",
    "calendar",
    "post",
    "settings"
];

// ========================
// ページ切り替え
// ========================
function showPage(pageName, button) {

    pages.forEach(page => {

        const element = document.getElementById(page + "Page");

        if (element) {
            element.style.display = "none";
        }

    });

    document.querySelectorAll(".menu-btn").forEach(btn => {
        btn.classList.remove("active");
    });

    const target = document.getElementById(pageName + "Page");

    if (target) {
        target.style.display = "block";
    }

    if (button) {
        button.classList.add("active");
    }

    if (pageName === "users") {
        loadAdminUsers();
    }

}

// HTMLのonclickから呼べるようにする
window.showPage = showPage;

// ========================
// ログアウト
// ========================
const logoutBtn = document.getElementById("logout");

if (logoutBtn) {

    logoutBtn.onclick = () => {

        if (confirm("ログアウトしますか？")) {

            localStorage.removeItem("admin");

            location.href = "admin-login.html";

        }

    };

}

// ========================
// 最初の画面
// ========================
const firstButton = document.querySelector(".menu-btn");

if (firstButton) {
    showPage("dashboard", firstButton);
}

// ========================
// お知らせ・プレゼント送信
// ========================

const noticeSubmit =
    document.getElementById("noticeSubmit");


if (noticeSubmit) {

    noticeSubmit.onclick = async () => {

        const noticeType =
            document.querySelector(
                'input[name="noticeType"]:checked'
            )?.value;


        // ========================
        // お知らせ
        // ========================

        if (noticeType === "notice") {

            const title =
                document
                    .getElementById("noticeTitle")
                    .value
                    .trim();

            const content =
                document
                    .getElementById("noticeContent")
                    .value
                    .trim();


            if (!title || !content) {

                alert(
                    "タイトルと内容を入力してください！"
                );

                return;

            }


            try {

                const response =
                    await fetch(
                        "https://script.google.com/macros/s/AKfycbxdL1vYB2Iv6hpQOTDnvmBaIAChjsxXUvEIQdm9U-TM2hqBPeSGsrkVdJwLVNqN4Mcp/exec",
                        {
                            method: "POST",

                            body: JSON.stringify({

                                type: "notice",

                                title:
                                    title,

                                content:
                                    content

                            })

                        }
                    );


                const result =
                    await response.json();


                if (
                    result.result ===
                    "success"
                ) {

                    alert(
                        "お知らせを投稿しました！🎉"
                    );

                    document
                        .getElementById("noticeTitle")
                        .value = "";

                    document
                        .getElementById("noticeContent")
                        .value = "";

                    loadNotices();

                } else {

                    alert(
                        "お知らせの投稿に失敗しました"
                    );

                }


            } catch (error) {

                console.error(error);

                alert(
                    "通信エラーが発生しました😢"
                );

            }

            return;

        }


        // ========================
// プレゼントパック
// ========================

if (noticeType === "gift") {

    const target =
        document.querySelector(
            'input[name="sendTarget"]:checked'
        )?.value;


    const title =
        document
            .getElementById("noticeTitle")
            .value
            .trim();


    const content =
        document
            .getElementById("noticeContent")
            .value
            .trim();


    const message =
        document
            .getElementById("giftMessage")
            .value
            .trim();


    // ========================
    // プレゼント内容を取得
    // ========================

    const gifts = [];


    // Coin
    const coinCheck =
        document.querySelector(
            '.gift-check[value="coin"]'
        );

    if (coinCheck && coinCheck.checked) {

        const amount =
            Number(
                document.getElementById(
                    "giftCoinAmount"
                ).value
            ) || 0;


        if (amount <= 0) {

            alert(
                "Coinの数量を1以上にしてください"
            );

            return;

        }


        gifts.push({

            type: "coin",

            amount: amount

        });

    }


    // Ticket
    const ticketCheck =
        document.querySelector(
            '.gift-check[value="ticket"]'
        );

    if (
        ticketCheck &&
        ticketCheck.checked
    ) {

        const amount =
            Number(
                document.getElementById(
                    "giftTicketAmount"
                ).value
            ) || 0;


        if (amount <= 0) {

            alert(
                "抽選券の数量を1以上にしてください"
            );

            return;

        }


        gifts.push({

            type: "ticket",

            amount: amount

        });

    }


    // 限定背景
    const backgroundCheck =
        document.querySelector(
            '.gift-check[value="background"]'
        );

    if (
        backgroundCheck &&
        backgroundCheck.checked
    ) {

        const item =
            document.getElementById(
                "giftBackgroundItem"
            ).value;


        if (!item) {

            alert(
                "限定背景を選択してください"
            );

            return;

        }


        gifts.push({

            type: "background",

            item: item

        });

    }


    // 限定フレーム
    const frameCheck =
        document.querySelector(
            '.gift-check[value="frame"]'
        );

    if (
        frameCheck &&
        frameCheck.checked
    ) {

        const item =
            document.getElementById(
                "giftFrameItem"
            ).value;


        if (!item) {

            alert(
                "限定フレームを選択してください"
            );

            return;

        }


        gifts.push({

            type: "frame",

            item: item

        });

    }


    // 限定アイコン
    const iconCheck =
        document.querySelector(
            '.gift-check[value="icon"]'
        );

    if (
        iconCheck &&
        iconCheck.checked
    ) {

        const item =
            document.getElementById(
                "giftIconItem"
            ).value;


        if (!item) {

            alert(
                "限定アイコンを選択してください"
            );

            return;

        }


        gifts.push({

            type: "icon",

            item: item

        });

    }


    // 限定称号
    const titleCheck =
        document.querySelector(
            '.gift-check[value="title"]'
        );

    if (
        titleCheck &&
        titleCheck.checked
    ) {

        const item =
            document.getElementById(
                "giftTitleItem"
            ).value;


        if (!item) {

            alert(
                "限定称号を選択してください"
            );

            return;

        }


        gifts.push({

            type: "title",

            item: item

        });

    }


    // ========================
    // 何も選ばれていない
    // ========================

    if (gifts.length === 0) {

        alert(
            "プレゼント内容を1つ以上選択してください"
        );

        return;

    }


    // ========================
    // 送信先取得
    // ========================

    let userIds = [];


    // 全員
    if (target === "all") {

        try {

            const response =
                await fetch(
                    "https://script.google.com/macros/s/AKfycbxdL1vYB2Iv6hpQOTDnvmBaIAChjsxXUvEIQdm9U-TM2hqBPeSGsrkVdJwLVNqN4Mcp/exec?type=users"
                );


            const users =
                await response.json();


            userIds =
                users.map(
                    user => user.userId
                );


        } catch (error) {

            console.error(error);

            alert(
                "ユーザー一覧を取得できませんでした"
            );

            return;

        }

    }


    // 個別
    else if (
        target === "individual"
    ) {

        const select =
            document.getElementById(
                "individualUser"
            );


        if (
            !select ||
            !select.value
        ) {

            alert(
                "ユーザーを選択してください"
            );

            return;

        }


        userIds = [
            select.value
        ];

    }


    // 複数
    else if (
        target === "multiple"
    ) {

        userIds =
            Array.from(
                document.querySelectorAll(
                    ".user-checkbox:checked"
                )
            ).map(
                checkbox =>
                    checkbox.value
            );


        if (
            userIds.length === 0
        ) {

            alert(
                "ユーザーを選択してください"
            );

            return;

        }

    }


    // ========================
    // 確認メッセージ
    // ========================

    let giftText = "";


    gifts.forEach(gift => {

        if (gift.type === "coin") {

            giftText +=
                `🪙 ${gift.amount} Coin\n`;

        }

        else if (
            gift.type === "ticket"
        ) {

            giftText +=
                `🎟️ 抽選券 × ${gift.amount}\n`;

        }

        else if (
            gift.type === "background"
        ) {

            giftText +=
                `🎨 背景：${gift.item}\n`;

        }

        else if (
            gift.type === "frame"
        ) {

            giftText +=
                `🖼️ フレーム：${gift.item}\n`;

        }

        else if (
            gift.type === "icon"
        ) {

            giftText +=
                `👤 アイコン：${gift.item}\n`;

        }

        else if (
            gift.type === "title"
        ) {

            giftText +=
                `🏷️ 称号：${gift.item}\n`;

        }

    });


    const confirmed =
        confirm(
            `${userIds.length}人に\n\n` +
            `${giftText}\n` +
            `をまとめて送りますか？`
        );


    if (!confirmed) {
        return;
    }


    // ========================
    // GASへ送信
    // ========================

    try {

        const response =
            await fetch(

                "https://script.google.com/macros/s/AKfycbxdL1vYB2Iv6hpQOTDnvmBaIAChjsxXUvEIQdm9U-TM2hqBPeSGsrkVdJwLVNqN4Mcp/exec",

                {

                    method: "POST",

                    body: JSON.stringify({

                        type:
                            "sendGift",

                        userIds:
                            userIds,

                        gifts:
                            gifts,

                        title:
                            title,

                        content:
                            content,

                        message:
                            message

                    })

                }

            );


        const result =
            await response.json();


        if (
            result.result !==
            "success"
        ) {

            alert(
                result.message ||
                "プレゼントの送信に失敗しました"
            );

            return;

        }


        alert(
            `🎁 ${userIds.length}人にプレゼントを送りました！`
        );


        // ========================
        // 入力欄リセット
        // ========================

        document
            .getElementById("noticeTitle")
            .value = "";


        document
            .getElementById("noticeContent")
            .value = "";


        document
            .getElementById("giftMessage")
            .value = "";


        document
            .querySelectorAll(".gift-check")
            .forEach(
                checkbox =>
                    checkbox.checked = false
            );


        document
            .getElementById(
                "giftCoinAmount"
            )
            .value = 100;


        document
            .getElementById(
                "giftTicketAmount"
            )
            .value = 1;


        document
            .getElementById(
                "giftBackgroundItem"
            )
            .value = "";


        document
            .getElementById(
                "giftFrameItem"
            )
            .value = "";


        document
            .getElementById(
                "giftIconItem"
            )
            .value = "";


        document
            .getElementById(
                "giftTitleItem"
            )
            .value = "";


    } catch (error) {

        console.error(error);

        alert(
            "プレゼント送信中にエラーが発生しました😢"
        );

    }

}

    };

}

// ========================
// お知らせ一覧
// ========================

async function loadNotices() {

    try {

        const response = await fetch(
            "https://script.google.com/macros/s/AKfycbxdL1vYB2Iv6hpQOTDnvmBaIAChjsxXUvEIQdm9U-TM2hqBPeSGsrkVdJwLVNqN4Mcp/exec?type=notices"
        );

        const notices = await response.json();

        const noticeList = document.getElementById("noticeList");

        if (!noticeList) return;

        noticeList.innerHTML = "";

        if (notices.length === 0) {

            noticeList.innerHTML = "<p>お知らせはありません。</p>";
            return;

        }

        notices.reverse().forEach(notice => {

            noticeList.innerHTML += `
                <div class="notice-card">

                    <h3>📢 ${notice.title}</h3>

                    <p>${notice.content}</p>

                    <small>
                        📅 ${new Date(notice.date).toLocaleString("ja-JP")}
                    </small>

                    <br><br>

                    <button class="delete-btn"
                        onclick="deleteNotice('${notice.id}')">
                        🗑️ 削除
                    </button>

                </div>
            `;

        });

    } catch (error) {

        console.error(error);

        const noticeList = document.getElementById("noticeList");

        if (noticeList) {
            noticeList.innerHTML = "<p>読み込みに失敗しました。</p>";
        }

    }

}

// ========================
// お知らせ削除
// ========================

window.deleteNotice = async function(id) {

    if (!confirm("このお知らせを削除しますか？")) {
        return;
    }

    try {

        const response = await fetch(
            "https://script.google.com/macros/s/AKfycbxdL1vYB2Iv6hpQOTDnvmBaIAChjsxXUvEIQdm9U-TM2hqBPeSGsrkVdJwLVNqN4Mcp/exec",
            {
                method: "POST",
                body: JSON.stringify({
                    type: "deleteNotice",
                    id: id
                })
            }
        );

        const result = await response.json();

        if (result.result === "success") {

            alert("削除しました！🎉");

            loadNotices();

        } else {

            alert("削除できませんでした😢");

        }

    } catch (error) {

        console.error(error);

        alert("通信エラーです😢");

    }

};

// ========================
// カレンダー投稿・編集
// ========================

const calendarSubmit =
    document.getElementById("calendarSubmit");

let editingCalendarRow = null;


// ========================
// 予定追加・更新
// ========================

if (calendarSubmit) {

    calendarSubmit.onclick = async () => {

        const startDate =
            document.getElementById("calendarStartDate").value;

        const endDate =
            document.getElementById("calendarEndDate").value;

        const title =
            document.getElementById("calendarTitle").value.trim();

        const content =
            document.getElementById("calendarContent").value.trim();


        if (!startDate || !endDate || !title) {

            alert("開始日・終了日・タイトルを入力してください！");

            return;
        }


        if (startDate > endDate) {

            alert("終了日は開始日以降にしてください！");

            return;
        }


        try {

            const data = {

                type:
                    editingCalendarRow
                    ? "updateCalendar"
                    : "calendar",

                startDate:
                    startDate,

                endDate:
                    endDate,

                title:
                    title,

                content:
                    content

            };


            if (editingCalendarRow) {

                data.row =
                    editingCalendarRow;

            }


            const response =
                await fetch(
                    "https://script.google.com/macros/s/AKfycbxdL1vYB2Iv6hpQOTDnvmBaIAChjsxXUvEIQdm9U-TM2hqBPeSGsrkVdJwLVNqN4Mcp/exec",
                    {

                        method: "POST",

                        body: JSON.stringify(data)

                    }
                );


            const result =
                await response.json();


            if (result.result === "success") {

                alert(
                    editingCalendarRow
                    ? "予定を更新しました！🎉"
                    : "予定を追加しました！🎉"
                );


                document.getElementById(
                    "calendarStartDate"
                ).value = "";

                document.getElementById(
                    "calendarEndDate"
                ).value = "";

                document.getElementById(
                    "calendarTitle"
                ).value = "";

                document.getElementById(
                    "calendarContent"
                ).value = "";


                editingCalendarRow = null;

                calendarSubmit.textContent =
                    "📅 予定を追加";


                loadCalendarList();


            } else {

                alert(
                    result.message ||
                    "予定の保存に失敗しました😢"
                );

            }

        } catch (error) {

            console.error(error);

            alert(
                "予定の保存に失敗しました😢"
            );

        }

    };

}


// ========================
// 登録済み予定の読み込み
// ========================

async function loadCalendarList() {

    const calendarList =
        document.getElementById("calendarList");

    if (!calendarList) return;

    calendarList.innerHTML =
        "<p>読み込み中...</p>";


    try {

        const response =
            await fetch(
                "https://script.google.com/macros/s/AKfycbxdL1vYB2Iv6hpQOTDnvmBaIAChjsxXUvEIQdm9U-TM2hqBPeSGsrkVdJwLVNqN4Mcp/exec?type=calendar"
            );


        const events =
            await response.json();


        calendarList.innerHTML = "";


        if (
            !Array.isArray(events) ||
            events.length === 0
        ) {

            calendarList.innerHTML =
                "<p>登録されている予定はありません。</p>";

            return;

        }


        events
            .slice()
            .reverse()
            .forEach(event => {

                const startDate =
                    formatAdminDate(event.startDate);

                const endDate =
                    formatAdminDate(event.endDate);


                calendarList.innerHTML += `

                    <div class="card">

                        <h3>
                            📅
                            ${escapeAdminHtml(event.title)}
                        </h3>

                        <p>
                            📆 ${startDate}
                            ～ ${endDate}
                        </p>

                        ${
                            event.content
                            ? `
                                <p>
                                    ${escapeAdminHtml(event.content)}
                                </p>
                            `
                            : ""
                        }


                        <div style="margin-top:15px;">

                            <button
                                class="save-btn"
                                onclick="editCalendarEvent(${event.id})">

                                ✏️ 編集

                            </button>


                            <button
                                class="danger-btn"
                                onclick="deleteCalendarEvent(${event.id})">

                                🗑️ 削除

                            </button>

                        </div>

                    </div>

                `;

            });


    } catch (error) {

        console.error(
            "カレンダー一覧の読み込みエラー:",
            error
        );

        calendarList.innerHTML =
            "<p>予定の読み込みに失敗しました。</p>";

    }

}


// ========================
// 予定編集
// ========================

async function editCalendarEvent(row) {

    try {

        const response = await fetch(
            "https://script.google.com/macros/s/AKfycbxdL1vYB2Iv6hpQOTDnvmBaIAChjsxXUvEIQdm9U-TM2hqBPeSGsrkVdJwLVNqN4Mcp/exec?type=calendar"
        );

        const events = await response.json();

        const event = events.find(
            item => Number(item.id) === Number(row)
        );

        if (!event) {
            alert("予定が見つかりません。");
            return;
        }

        document.getElementById("calendarStartDate").value =
            formatInputDate(event.startDate);

        document.getElementById("calendarEndDate").value =
            formatInputDate(event.endDate);

        document.getElementById("calendarTitle").value =
            event.title || "";

        document.getElementById("calendarContent").value =
            event.content || "";

        editingCalendarRow = Number(row);

        calendarSubmit.textContent = "✏️ 予定を更新";

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    } catch (error) {

        console.error(error);

        alert("予定の取得に失敗しました。");

    }

}


// ========================
// 予定削除
// ========================

async function deleteCalendarEvent(row) {

    if (
        !confirm(
            "この予定を削除しますか？"
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
                            "deleteCalendar",

                        row:
                            row

                    })

                }
            );


        const result =
            await response.json();


        if (result.result === "success") {

            alert(
                "予定を削除しました！"
            );

            loadCalendarList();

        } else {

            alert(
                result.message ||
                "予定の削除に失敗しました。"
            );

        }

    } catch (error) {

        console.error(error);

        alert(
            "予定の削除に失敗しました。"
        );

    }

}


// ========================
// input用の日付
// ========================

function formatInputDate(value) {

    if (!value) return "";

    const date =
        new Date(value);

    if (isNaN(date.getTime())) {
        return "";
    }

    return `${date.getFullYear()}-${
        String(date.getMonth() + 1).padStart(2, "0")
    }-${
        String(date.getDate()).padStart(2, "0")
    }`;

}


// ========================
// 表示用の日付
// ========================

function formatAdminDate(value) {

    if (!value) return "";

    const date =
        new Date(value);

    if (isNaN(date.getTime())) {
        return "";
    }

    return `${date.getFullYear()}/${
        String(date.getMonth() + 1).padStart(2, "0")
    }/${
        String(date.getDate()).padStart(2, "0")
    }`;

}


// ========================
// HTMLエスケープ
// ========================

function escapeAdminHtml(text) {

    const div =
        document.createElement("div");

    div.textContent =
        text || "";

    return div.innerHTML;

}


// ========================
// 管理画面読み込み時
// ========================

loadCalendarList();

// ========================
// 初期化
// ========================
// ==========================
// お知らせ・プレゼント画面
// ==========================

const sendTargetRadios =
    document.querySelectorAll('input[name="sendTarget"]');

const noticeTypeRadios =
    document.querySelectorAll('input[name="noticeType"]');

const userSelectArea =
    document.getElementById("userSelectArea");

const userList =
    document.getElementById("userList");

const giftArea =
    document.getElementById("giftArea");


// ==========================
// 送信先切り替え
// ==========================

sendTargetRadios.forEach(radio => {

    radio.addEventListener("change", () => {

        if (
            radio.checked &&
            (radio.value === "multiple" ||
             radio.value === "individual")
        ) {

            userSelectArea.style.display = "block";

            loadUsers();

        } else {

            userSelectArea.style.display = "none";

        }

    });

});


// ==========================
// お知らせ / プレゼント切り替え
// ==========================

noticeTypeRadios.forEach(radio => {

    radio.addEventListener("change", () => {

        if (radio.checked && radio.value === "gift") {

            giftArea.style.display = "block";

        } else {

            giftArea.style.display = "none";

        }

    });

});

// ==========================
// ユーザー一覧取得
// ==========================

async function loadUsers() {

    if (!userList) return;

    userList.innerHTML =
        "<p>ユーザーを読み込み中...</p>";

    try {

        const response = await fetch(
            "https://script.google.com/macros/s/AKfycbxdL1vYB2Iv6hpQOTDnvmBaIAChjsxXUvEIQdm9U-TM2hqBPeSGsrkVdJwLVNqN4Mcp/exec?type=users"
        );

        const users = await response.json();

        userList.innerHTML = "";

        if (users.length === 0) {

            userList.innerHTML =
                "<p>登録されているユーザーはいません。</p>";

            return;
        }


        // 個別ユーザー
        const target =
            document.querySelector(
                'input[name="sendTarget"]:checked'
            );

        if (target && target.value === "individual") {

            const select =
                document.createElement("select");

            select.id = "individualUser";

            select.innerHTML =
                `<option value="">ユーザーを選択</option>`;

            users.forEach(user => {

                select.innerHTML += `
                    <option value="${user.userId}">
                        ${user.username} (${user.userId})
                    </option>
                `;

            });

            userList.appendChild(select);

        }


        // 複数ユーザー
        if (target && target.value === "multiple") {

            users.forEach(user => {

                userList.innerHTML += `

                    <label style="display:block; margin:10px 0;">

                        <input
                            type="checkbox"
                            class="user-checkbox"
                            value="${user.userId}">

                        ${user.username}

                        <small>
                            (${user.userId})
                        </small>

                    </label>

                `;

            });

        }

    } catch (error) {

        console.error(error);

        userList.innerHTML =
            "<p>ユーザー一覧の取得に失敗しました。</p>";

    }

}

// ==========================
// 👥 ユーザー管理
// ==========================

async function loadAdminUsers() {

    const list =
        document.getElementById("adminUserList");

    if (!list) return;

    list.innerHTML =
        "<p>ユーザー情報を読み込み中...</p>";

    try {

        const response = await fetch(
            "https://script.google.com/macros/s/AKfycbxdL1vYB2Iv6hpQOTDnvmBaIAChjsxXUvEIQdm9U-TM2hqBPeSGsrkVdJwLVNqN4Mcp/exec?type=users"
        );

        if (!response.ok) {
            throw new Error(
                "HTTP error: " + response.status
            );
        }

        const users =
            await response.json();

        console.log(
            "👥 ユーザー一覧:",
            users
        );

        // GASは配列を直接返す
        if (!Array.isArray(users)) {

            list.innerHTML =
                "<p>ユーザー情報の形式が正しくありません。</p>";

            console.error(
                "ユーザーデータ:",
                users
            );

            return;
        }

        if (users.length === 0) {

            list.innerHTML =
                "<p>登録されているユーザーはいません。</p>";

            return;
        }

        list.innerHTML = "";

        users.forEach(user => {

            const card =
                document.createElement("div");

            card.className =
                "admin-user-card";

            card.innerHTML = `
                <h3>👤 ${user.username}</h3>

                <p>
                    ID：
                    ${user.userId}
                </p>

                <button
                    class="user-detail-btn"
                    onclick="showAdminUserDetail('${user.userId}')">
                    🔎 詳細を見る
                </button>
            `;

            list.appendChild(card);

        });

    } catch (error) {

        console.error(
            "ユーザー一覧取得エラー",
            error
        );

        list.innerHTML =
            "<p>ユーザー情報の取得に失敗しました。</p>";
    }
}

// ==========================
// 👤 ユーザー詳細を閉じる
// ==========================

window.closeAdminUserDetail = function() {

    const list =
        document.getElementById("adminUserList");

    const detail =
        document.getElementById("adminUserDetail");

    if (detail) {
        detail.style.display = "none";
    }

    if (list) {
        list.style.display = "block";
    }

};


// ==========================
// 🔒 凍結・凍結解除
// ==========================

const freezeUserBtn =
    document.getElementById("freezeUserBtn");

if (freezeUserBtn) {

    freezeUserBtn.onclick = async function() {

        if (!currentAdminUserId) {
            alert("ユーザーが選択されていません");
            return;
        }

        const currentlyFrozen =
            freezeUserBtn.dataset.frozen === "true";

        const newFrozenState =
            !currentlyFrozen;

        const message = newFrozenState
            ? "このアカウントを凍結しますか？"
            : "このアカウントの凍結を解除しますか？";

        if (!confirm(message)) {
            return;
        }

        // 二重クリック防止
        freezeUserBtn.disabled = true;
        freezeUserBtn.textContent = "処理中...";

        try {

            const response = await fetch(
                "https://script.google.com/macros/s/AKfycbxdL1vYB2Iv6hpQOTDnvmBaIAChjsxXUvEIQdm9U-TM2hqBPeSGsrkVdJwLVNqN4Mcp/exec",
                {
                    method: "POST",
                    body: JSON.stringify({
                        type: "setUserFreeze",
                        userId: currentAdminUserId,
                        frozen: newFrozenState
                    })
                }
            );

            const result = await response.json();

            console.log("凍結処理結果:", result);

            if (result.result === "success") {

                alert(
                    newFrozenState
                        ? "🔒 アカウントを凍結しました"
                        : "🔓 アカウントの凍結を解除しました"
                );

                // 詳細画面を更新
                await showAdminUserDetail(
                    currentAdminUserId
                );

            } else {

                alert(
                    result.message ||
                    "処理に失敗しました"
                );

            }

        } catch (error) {

            console.error("凍結処理エラー:", error);

            alert(
                "通信エラーが発生しました"
            );

        } finally {

            freezeUserBtn.disabled = false;

        }

    };

}

// ==========================
// 👤 ユーザー詳細
// ==========================

let currentAdminUserId = null;


// ユーザー詳細を表示
async function showAdminUserDetail(userId) {

    currentAdminUserId = userId;

    const list =
        document.getElementById("adminUserList");

    const detail =
        document.getElementById("adminUserDetail");

    const info =
        document.getElementById("adminUserInfo");

    if (!list || !detail || !info) {
        console.error("ユーザー詳細のHTMLが見つかりません");
        return;
    }

    // 一覧を隠す
    list.style.display = "none";

    // 詳細を表示
    detail.style.display = "block";

    // 読み込み中
    info.innerHTML =
        "<p>ユーザー情報を読み込み中...</p>";

    try {

        const response = await fetch(
            "https://script.google.com/macros/s/AKfycbxdL1vYB2Iv6hpQOTDnvmBaIAChjsxXUvEIQdm9U-TM2hqBPeSGsrkVdJwLVNqN4Mcp/exec?type=user&userId=" +
            encodeURIComponent(userId)
        );

        if (!response.ok) {
            throw new Error(
                "HTTP error: " + response.status
            );
        }

        const user =
            await response.json();

        console.log("👤 ユーザー詳細:", user);

        if (user.result === "error") {

            info.innerHTML =
                "<p>ユーザー情報を取得できませんでした。</p>";

            return;
        }


        // ==========================
        // ユーザー情報表示
        // ==========================

        info.innerHTML = `

            <h3>👤 ${user.username || "名前なし"}</h3>

            <p>
                ユーザーID：
                ${user.userId || "-"}
            </p>

            <hr>

            <p>
                ⭐ XP：
                ${Number(user.xp) || 0}
            </p>

            <p>
                🪙 Coin：
                ${Number(user.coin) || 0}
            </p>

            <p>
                🎟️ 抽選券：
                ${Number(user.ticket) || 0}
            </p>

            <p>
                🏷️ 称号：
                ${user.title || "default"}
            </p>

            <p>
                🎨 背景：
                ${user.profileBackground || "default"}
            </p>

            <p>
                🖼️ フレーム：
                ${user.profileFrame || "default"}
            </p>

        `;

        // ==========================
// 🔒 凍結状態に合わせてボタン変更
// ==========================

const freezeBtn =
    document.getElementById("freezeUserBtn");

if (freezeBtn) {

    if (user.frozen === true) {

        freezeBtn.textContent =
            "🔓 アカウントの凍結を解除";

        freezeBtn.dataset.frozen =
            "true";

    } else {

        freezeBtn.textContent =
            "🔒 アカウントを凍結";

        freezeBtn.dataset.frozen =
            "false";
    }
}

    } catch (error) {

        console.error(
            "ユーザー詳細取得エラー",
            error
        );

        info.innerHTML =
            "<p>ユーザー情報の取得に失敗しました。</p>";
    }
}


// ==========================
// ← ユーザー一覧に戻る
// ==========================

function closeAdminUserDetail() {

    const list =
        document.getElementById("adminUserList");

    const detail =
        document.getElementById("adminUserDetail");

    if (!list || !detail) return;

    detail.style.display = "none";

    list.style.display = "block";

    currentAdminUserId = null;
}


// HTMLのonclickから呼べるようにする
window.showAdminUserDetail =
    showAdminUserDetail;

window.closeAdminUserDetail =
    closeAdminUserDetail;


// ==========================
// 初期処理
// ==========================

loadNotices();
loadAdminUsers();