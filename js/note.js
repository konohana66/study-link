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

    if(title.value===""||content.value===""){

        alert("タイトルと内容を入力してください！");
        return;

    }

    const data = {

        type:"post",
        category:category.value,
        name:localStorage.getItem("username")||"ゲスト",
        title:title.value,
        content:content.value

    };

    await fetch(
        "https://script.google.com/macros/s/AKfycbxdL1vYB2Iv6hpQOTDnvmBaIAChjsxXUvEIQdm9U-TM2hqBPeSGsrkVdJwLVNqN4Mcp/exec",
        {

            method:"POST",
            body:JSON.stringify(data)

        }

    );

    title.value="";
    content.value="";

    popup.style.display="none";

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

            </div>
        `;

    });

}

loadPosts();