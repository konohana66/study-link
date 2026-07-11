const loginBtn = document.getElementById("loginBtn");

loginBtn.onclick = () => {

    const name = document.getElementById("username").value.trim();

    if(name === ""){
        alert("名前を入力してください！");
        return;
    }

    localStorage.setItem("username", name);

    location.href = "index.html";
};