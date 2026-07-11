const loginBtn = document.getElementById("loginBtn");

loginBtn.onclick = () => {

    const password = document.getElementById("password").value;

    if(password === "studylink2026"){

        localStorage.setItem("admin","true");

        location.href = "admin.html";

    }else{

        document.getElementById("error").textContent =
        "パスワードが違います。";

    }

};