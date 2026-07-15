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
// 投稿
// --------------------

submitBtn.onclick = async () => {

    if(title.value === "" || content.value === ""){
        alert("タイトルと内容を入力してください！");
        return;
    }

    let imageUrl = "";

    if(image.files.length > 0){
        imageUrl = await uploadImage(image.files[0]);
    }

    const data = {
        type: "post",
        category: category.value,
        name: localStorage.getItem("username") || "ゲスト",
        title: title.value,
        content: content.value,
        image: imageUrl
    };

    await fetch(
        "https://script.google.com/macros/s/AKfycbxdL1vYB2Iv6hpQOTDnvmBaIAChjsxXUvEIQdm9U-TM2hqBPeSGsrkVdJwLVNqN4Mcp/exec",
        {
            method: "POST",
            body: JSON.stringify(data)
        }
    );

    title.value = "";
    content.value = "";
    image.value = "";

    popup.style.display = "none";

    loadPosts();

};

// --------------------
// 投稿一覧
// --------------------

async function loadPosts(){
    
    console.log("現在のカテゴリ:", currentCategory);

    const response = await fetch(
        "https://script.google.com/macros/s/AKfycbxdL1vYB2Iv6hpQOTDnvmBaIAChjsxXUvEIQdm9U-TM2hqBPeSGsrkVdJwLVNqN4Mcp/exec"
    );

    const posts = await response.json();

    postList.innerHTML="";

    posts.reverse().forEach(post=>{

        if(post.category!==currentCategory){
            return;
        }

        postList.innerHTML += `
<div class="post">

    <small>👤 ${post.name}</small><br>

    <small>📅 ${new Date(post.date).toLocaleString("ja-JP")}</small>

    <h3>${post.title}</h3>

    <p>${post.content}</p>

    ${
        post.image
        ? `<img src="${post.image}" class="post-image" onclick="openImage('${post.image}')">`
        : ""
    }

    <div class="post-bottom">
    <button
    class="${localStorage.getItem('liked_' + post.id) ? 'liked-btn' : 'like-btn'}"
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

    <button onclick="sendComment(${post.id})">
        💬 送信
    </button>

    <div id="comments-${post.id}"></div>
</div>
</div>
`;

loadComments(post.id);

    });

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
loadPosts();