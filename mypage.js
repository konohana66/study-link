const userName = document.getElementById("userName");

userName.textContent = "👤 " + (localStorage.getItem("username") || "ゲスト");

document.getElementById("changeName").onclick = () => {

    const newName = prompt("新しい名前を入力してください");

    if(newName){
        localStorage.setItem("username", newName);
        location.reload();
    }

};

document.getElementById("logout").onclick = () => {

    if(confirm("ログアウトしますか？")){

        localStorage.removeItem("username");
        location.href = "login.html";

    }

};