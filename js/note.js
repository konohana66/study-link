localStorage.setItem("daily_openNote","true");
const popup = document.getElementById("popup");
const addBtn = document.querySelector(".add-post");
const closeBtn = document.querySelector(".close-btn");
const submitBtn = document.getElementById("submitBtn");

const postList = document.getElementById("postList");
const title = document.getElementById("title");
const content = document.getElementById("content");
const category = document.getElementById("category");

const schoolTab = document.getElementById("schoolTab");
const clubTab = document.getElementById("clubTab");
const image = document.getElementById("image");

let currentCategory = "school";

let editingPostId = null;
let editingPostImage = "";

// --------------------
// タブ切り替え
// --------------------

schoolTab.onclick = () => {

    currentCategory = "school";

    schoolTab.classList.add("active");
    clubTab.classList.remove("active");

    loadPosts();

};

clubTab.onclick = () => {

    currentCategory = "club";

    clubTab.classList.add("active");
    schoolTab.classList.remove("active");

    loadPosts();

};

// --------------------
// ポップアップ
// --------------------

addBtn.onclick = () => {

    category.value = currentCategory;

    popup.style.display = "flex";

};

closeBtn.onclick = () => {

    popup.style.display = "none";

};

// --------------------
// 投稿・編集
// --------------------

submitBtn.onclick = async () => {

    if(title.value === "" || content.value === ""){
        alert("タイトルと内容を入力してください！");
        return;
    }

    let imageUrl = "";

    // 編集中で画像を選び直していない場合は元画像を維持
    if(image.files.length > 0){

        imageUrl = await uploadImage(image.files[0]);

    } else if(editingPostImage){

        imageUrl = editingPostImage;

    }

    const data = {

        type: editingPostId
            ? "updatePost"
            : "post",

        category: category.value,

        name:
            localStorage.getItem("username") || "ゲスト",

        userId:
            localStorage.getItem("userId") || "",

        title: title.value,

        content: content.value,

        image: imageUrl

    };

    // 編集する投稿のID
    if(editingPostId){

        data.id = editingPostId;

    }

    try {

        const response = await fetch(
            "https://script.google.com/macros/s/AKfycbxdL1vYB2Iv6hpQOTDnvmBaIAChjsxXUvEIQdm9U-TM2hqBPeSGsrkVdJwLVNqN4Mcp/exec",
            {
                method: "POST",
                body: JSON.stringify(data)
            }
        );

        const result = await response.json();

        if(result.result !== "success"){

            alert(
                result.message ||
                "投稿の保存に失敗しました。"
            );

            return;

        }

        alert(
            editingPostId
            ? "投稿を更新しました！"
            : "投稿しました！"
        );

        title.value = "";
        content.value = "";
        image.value = "";

        category.value = currentCategory;

        editingPostId = null;
        editingPostImage = "";

        submitBtn.textContent = "投稿する";

        popup.style.display = "none";

        loadPosts();

    } catch(error){

        console.error(error);

        alert("投稿の保存に失敗しました。");

    }

};

// --------------------
// 投稿一覧
// --------------------

async function loadPosts(){

    console.log("現在のカテゴリ:", currentCategory);

    const response = await fetch(
        "https://script.google.com/macros/s/AKfycbxdL1vYB2Iv6hpQOTDnvmBaIAChjsxXUvEIQdm9U-TM2hqBPeSGsrkVdJwLVNqN4Mcp/exec?type=posts"
    );

    const posts = await response.json();

    postList.innerHTML = "";

    const currentUserId =
        localStorage.getItem("userId") || "";

    posts
        .slice()
        .reverse()
        .forEach(post => {

            if(post.category !== currentCategory){
                return;
            }

            // 自分の投稿か確認
            const isOwner =
                currentUserId &&
                String(post.userId) === String(currentUserId);

            postList.innerHTML += `
                <div class="post">

                    <small>
                        👤 ${escapeHtml(post.name)}
                    </small>

                    <br>

                    <small>
                        📅 ${new Date(post.date).toLocaleString("ja-JP")}
                    </small>

                    <h3>
                        ${escapeHtml(post.title)}
                    </h3>

                    <p>
                        ${escapeHtml(post.content)}
                    </p>

                    ${
                        post.image
                        ? `
                            <img
                                src="${post.image}"
                                class="post-image"
                                onclick="openImage('${post.image}')"
                            >
                        `
                        : ""
                    }

                    ${
                        isOwner
                        ? `
                            <div style="margin-top:10px;">

                                <button
                                    class="save-btn"
                                    onclick="editPost(${post.id})"
                                >
                                    ✏️ 編集
                                </button>

                                <button
                                    class="danger-btn"
                                    onclick="deletePost(${post.id})"
                                >
                                    🗑️ 削除
                                </button>

                            </div>
                        `
                        : ""
                    }

                    <div class="post-bottom">

                        <button
                            class="${
                                localStorage.getItem(
                                    "liked_" + post.id
                                )
                                ? "liked-btn"
                                : "like-btn"
                            }"
                            onclick="likePost(${post.id})"
                        >
                            ❤️ ${post.likes}
                        </button>

                    </div>

                    <div class="comment-box">

                        <input
                            type="text"
                            id="comment-${post.id}"
                            placeholder="コメントを書く..."
                        >

                        <button
                            onclick="sendComment(${post.id})"
                        >
                            💬 送信
                        </button>

                        <div
                            id="comments-${post.id}"
                        ></div>

                    </div>

                </div>
            `;

            loadComments(post.id);

        });

}

// --------------------
// HTMLエスケープ
// --------------------

function escapeHtml(text){

    const div = document.createElement("div");

    div.textContent = text || "";

    return div.innerHTML;

}

async function uploadImage(file){

    const formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset", "studylink");

    const response = await fetch(
        "https://api.cloudinary.com/v1_1/mtyixvge/image/upload",
        {
            method: "POST",
            body: formData
        }
    );

    console.log("Status:", response.status);

    const result = await response.json();

    console.log(result);

    return result.secure_url || "";

}
const imageViewer = document.getElementById("imageViewer");
const viewerImage = document.getElementById("viewerImage");

function openImage(src){

    viewerImage.src = src;
    imageViewer.classList.add("show");

}

imageViewer.onclick = () =>{

    imageViewer.classList.remove("show");

};

async function likePost(id){

    if(localStorage.getItem("liked_" + id)){
        alert("❤️ この投稿にはもういいねしています！");
        return;
    }

    await fetch(
        "https://script.google.com/macros/s/AKfycbxdL1vYB2Iv6hpQOTDnvmBaIAChjsxXUvEIQdm9U-TM2hqBPeSGsrkVdJwLVNqN4Mcp/exec",
        {
            method: "POST",
            body: JSON.stringify({
                type: "like",
                id: id
            })
        }
    );

    localStorage.setItem("liked_" + id, "true");

    loadPosts();

}

async function sendComment(postId){

    const input = document.getElementById("comment-" + postId);

    if(input.value === ""){
        return;
    }

    await fetch(
        "https://script.google.com/macros/s/AKfycbxdL1vYB2Iv6hpQOTDnvmBaIAChjsxXUvEIQdm9U-TM2hqBPeSGsrkVdJwLVNqN4Mcp/exec",
        {
            method:"POST",
            body:JSON.stringify({
                type:"comment",
                postId:postId,
                name:localStorage.getItem("username") || "ゲスト",
                comment:input.value
            })
        }
    );

    input.value = "";

    loadPosts();

}

async function loadComments(postId){

    const response = await fetch(
        "https://script.google.com/macros/s/AKfycbxdL1vYB2Iv6hpQOTDnvmBaIAChjsxXUvEIQdm9U-TM2hqBPeSGsrkVdJwLVNqN4Mcp/exec?type=comments"
    );

    const comments = await response.json();

    const area = document.getElementById("comments-" + postId);

    area.innerHTML = "";

    comments.forEach(comment => {

        if(String(comment.postId) !== String(postId)){
            return;
        }

        area.innerHTML += `
            <div class="comment">
                <strong>👤 ${comment.name}</strong><br>
                ${comment.comment}
            </div>
        `;

    });

}

// --------------------
// 投稿編集
// --------------------

async function editPost(id){

    try {

        const response = await fetch(
            "https://script.google.com/macros/s/AKfycbxdL1vYB2Iv6hpQOTDnvmBaIAChjsxXUvEIQdm9U-TM2hqBPeSGsrkVdJwLVNqN4Mcp/exec?type=posts"
        );

        const posts = await response.json();

        const post = posts.find(
            item => Number(item.id) === Number(id)
        );

        if(!post){

            alert("投稿が見つかりません。");

            return;

        }

        const currentUserId =
            localStorage.getItem("userId") || "";

        if(
            !currentUserId ||
            String(post.userId) !== String(currentUserId)
        ){

            alert("この投稿は編集できません。");

            return;

        }

        editingPostId = Number(id);

        editingPostImage = post.image || "";

        category.value = post.category;

        title.value = post.title || "";

        content.value = post.content || "";

        submitBtn.textContent = "✏️ 投稿を更新";

        popup.style.display = "flex";

    } catch(error){

        console.error(error);

        alert("投稿の取得に失敗しました。");

    }

}

// --------------------
// 投稿削除
// --------------------

async function deletePost(id){

    if(!confirm("この投稿を削除しますか？")){

        return;

    }

    const userId =
        localStorage.getItem("userId") || "";

    if(!userId){

        alert("ユーザー情報が確認できません。");

        return;

    }

    try {

        const response = await fetch(
            "https://script.google.com/macros/s/AKfycbxdL1vYB2Iv6hpQOTDnvmBaIAChjsxXUvEIQdm9U-TM2hqBPeSGsrkVdJwLVNqN4Mcp/exec",
            {
                method: "POST",
                body: JSON.stringify({

                    type: "deletePost",

                    id: id,

                    userId: userId

                })
            }
        );

        const result = await response.json();

        if(result.result === "success"){

            alert("投稿を削除しました！");

            loadPosts();

        } else {

            alert(
                result.message ||
                "投稿の削除に失敗しました。"
            );

        }

    } catch(error){

        console.error(error);

        alert("投稿の削除に失敗しました。");

    }

}
loadPosts();