const popup = document.getElementById("popup");

const addBtn = document.querySelector(".add-post");
const closeBtn = document.querySelector(".close-btn");

const submitBtn = document.getElementById("submitBtn");

const postList = document.getElementById("postList");

const title = document.getElementById("title");
const content = document.getElementById("content");

addBtn.onclick = () => {
    popup.style.display = "flex";
};

closeBtn.onclick = () => {
    popup.style.display = "none";
};

submitBtn.onclick = async () => {

    if (title.value === "" || content.value === "") {
        alert("タイトルと内容を入力してください！");
        return;
    }

  const data = {
    type: "post",
    name: localStorage.getItem("username") || "ゲスト",
    title: title.value,
    content: content.value
};

    try {

        await fetch("https://script.google.com/macros/s/AKfycbxdL1vYB2Iv6hpQOTDnvmBaIAChjsxXUvEIQdm9U-TM2hqBPeSGsrkVdJwLVNqN4Mcp/exec", {
    method: "POST",
    body: JSON.stringify(data)
});

    } catch (e) {
        console.error(e);
    }

    const post = document.createElement("div");

    post.className = "post";

    post.innerHTML = `
        <h3>📌 ${title.value}</h3>
        <p>${content.value}</p>
    `;

    postList.appendChild(post);

    title.value = "";
    content.value = "";

    popup.style.display = "none";

    alert("投稿しました！");

    loadPosts();
};
// 投稿を読み込む
async function loadPosts() {

    const response = await fetch("https://script.google.com/macros/s/AKfycbxdL1vYB2Iv6hpQOTDnvmBaIAChjsxXUvEIQdm9U-TM2hqBPeSGsrkVdJwLVNqN4Mcp/exec");

    const posts = await response.json();

    // 最初からある投稿だけ残す
    const oldPosts = document.querySelectorAll(".post");
    oldPosts.forEach(post => post.remove());

    posts.reverse().forEach(post => {

        const div = document.createElement("div");

        div.className = "post";

     div.innerHTML = `
    <small>👤 ${post.name}</small><br>
    <small>📅 ${new Date(post.date).toLocaleString("ja-JP")}</small>

    <h3>${post.title}</h3>

    <p>${post.content}</p>
`;

        postList.appendChild(div);

    });

}

loadPosts();
async function loadNotices() {

    const response = await fetch(
        "https://script.google.com/macros/s/AKfycbxdL1vYB2Iv6hpQOTDnvmBaIAChjsxXUvEIQdm9U-TM2hqBPeSGsrkVdJwLVNqN4Mcp/exec?type=notices"
    );

    const notices = await response.json();

    const noticeList = document.getElementById("noticeList");

    noticeList.innerHTML = "";

    notices.reverse().forEach(notice => {

        noticeList.innerHTML += `
            <div class="notice">
                <h3>${notice.title}</h3>
                <p>${notice.content}</p>
            </div>
        `;

    });

}

loadNotices();