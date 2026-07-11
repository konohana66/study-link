console.log("admin.js 読み込みOK");

// メニュー一覧
const pages = [
    "dashboard",
    "notice",
    "calendar",
    "post",
    "settings"
];

// ページ切り替え
function showPage(pageName, button){

    // 全ページを隠す
    pages.forEach(page => {
        document.getElementById(page + "Page").style.display = "none";
    });

    // メニューの色を戻す
    document.querySelectorAll(".menu-btn").forEach(btn => {
        btn.classList.remove("active");
    });

    // 選んだページを表示
    document.getElementById(pageName + "Page").style.display = "block";

    // ボタンを青くする
    button.classList.add("active");

}

// ログアウト
document.getElementById("logout").onclick = () => {

    if(confirm("ログアウトしますか？")){

        localStorage.removeItem("admin");

        location.href = "admin-login.html";

    }

};

// ダッシュボードを最初に表示
showPage("dashboard", document.querySelector(".menu-btn"));
// お知らせ投稿
const noticeSubmit = document.getElementById("noticeSubmit");

if (noticeSubmit) {

    noticeSubmit.onclick = async () => {

        const title = document.getElementById("noticeTitle").value;
        const content = document.getElementById("noticeContent").value;

        if (!title || !content) {
            alert("タイトルと内容を入力してください！");
            return;
        }

        const data = {
            type: "notice",
            title: title,
            content: content
        };

        try {

            const response = await fetch(
                "https://script.google.com/macros/s/AKfycbxdL1vYB2Iv6hpQOTDnvmBaIAChjsxXUvEIQdm9U-TM2hqBPeSGsrkVdJwLVNqN4Mcp/exec",
                {
                    method: "POST",
                    body: JSON.stringify(data)
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

            alert("投稿に失敗しました😢");
            console.error(error);

        }

    };

}
// お知らせ一覧を取得
async function loadNotices() {

    try {

        const response = await fetch(
            "https://script.google.com/macros/s/AKfycbxdL1vYB2Iv6hpQOTDnvmBaIAChjsxXUvEIQdm9U-TM2hqBPeSGsrkVdJwLVNqN4Mcp/exec?type=notices"
        );

        const notices = await response.json();

        const noticeList = document.getElementById("noticeList");

        noticeList.innerHTML = "";

        if (notices.length === 0) {
            noticeList.innerHTML = "<p>お知らせはありません。</p>";
            return;
        }

        notices.forEach(notice => {

            noticeList.innerHTML += `
                <div class="notice-item">
                    <h3>${notice.title}</h3>
                    <p>${notice.content}</p>
                    <small>${notice.date}</small>
                </div>
            `;

        });

    } catch (error) {

        console.error(error);

        document.getElementById("noticeList").innerHTML =
            "<p>読み込みに失敗しました。</p>";

    }

}
loadNotices();