console.log("admin.js 読み込みOK");

// ========================
// ページ一覧
// ========================
const pages = [
    "dashboard",
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
// お知らせ投稿
// ========================
const noticeSubmit = document.getElementById("noticeSubmit");

if (noticeSubmit) {

    noticeSubmit.onclick = async () => {

        const title = document.getElementById("noticeTitle").value.trim();
        const content = document.getElementById("noticeContent").value.trim();

        if (!title || !content) {

            alert("タイトルと内容を入力してください！");
            return;

        }

        try {

            const response = await fetch(
                "https://script.google.com/macros/s/AKfycbxdL1vYB2Iv6hpQOTDnvmBaIAChjsxXUvEIQdm9U-TM2hqBPeSGsrkVdJwLVNqN4Mcp/exec",
                {
                    method: "POST",
                    body: JSON.stringify({
                        type: "notice",
                        title,
                        content
                    })
                }
            );

            const result = await response.json();

            if (result.result === "success") {

                alert("お知らせを投稿しました！🎉");

                document.getElementById("noticeTitle").value = "";
                document.getElementById("noticeContent").value = "";

                loadNotices();

            }

        } catch (error) {

            console.error(error);
            alert("投稿に失敗しました😢");

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
// カレンダー投稿
// ========================

const calendarSubmit = document.getElementById("calendarSubmit");

if (calendarSubmit) {

    calendarSubmit.onclick = async () => {

        const date = document.getElementById("calendarDate").value;
        const title = document.getElementById("calendarTitle").value.trim();
        const content = document.getElementById("calendarContent").value.trim();

        if (!date || !title) {
            alert("日付とタイトルを入力してください！");
            return;
        }

        try {

            const response = await fetch(
                "https://script.google.com/macros/s/AKfycbxdL1vYB2Iv6hpQOTDnvmBaIAChjsxXUvEIQdm9U-TM2hqBPeSGsrkVdJwLVNqN4Mcp/exec",
                {
                    method: "POST",
                    body: JSON.stringify({
                        type: "calendar",
                        date,
                        title,
                        content
                    })
                }
            );

            const result = await response.json();

            if (result.result === "success") {

                alert("予定を追加しました！🎉");

                document.getElementById("calendarDate").value = "";
                document.getElementById("calendarTitle").value = "";
                document.getElementById("calendarContent").value = "";

            }

        } catch (error) {

            console.error(error);
            alert("予定の追加に失敗しました😢");

        }

    };

}

// ========================
// 初期化
// ========================

loadNotices();