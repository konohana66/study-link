const GAS_URL =
    "https://script.google.com/macros/s/AKfycbxdL1vYB2Iv6hpQOTDnvmBaIAChjsxXUvEIQdm9U-TM2hqBPeSGsrkVdJwLVNqN4Mcp/exec";


// ==========================
// 画面切り替え
// ==========================

const registerArea =
    document.getElementById("registerArea");

const loginArea =
    document.getElementById("loginArea");

document.getElementById("showLoginBtn").onclick = () => {

    registerArea.style.display = "none";
    loginArea.style.display = "block";

};


document.getElementById("showRegisterBtn").onclick = () => {

    loginArea.style.display = "none";
    registerArea.style.display = "block";

};


// ==========================
// 新規登録
// ==========================

document.getElementById("registerBtn").onclick = async () => {

    const name =
        document.getElementById("registerName").value.trim();

    const password =
        document.getElementById("registerPassword").value;

    const passwordConfirm =
        document.getElementById("registerPasswordConfirm").value;


    if (name === "") {

        alert("名前を入力してください！");
        return;

    }


    if (password.length < 4) {

        alert("パスワードは4文字以上にしてください！");
        return;

    }


    if (password !== passwordConfirm) {

        alert("パスワードが一致していません！");
        return;

    }


    try {

        const response = await fetch(
            GAS_URL,
            {
                method: "POST",

                body: JSON.stringify({

                    type: "registerUser",

                    username: name,

                    password: password

                })
            }
        );


        const result = await response.json();


        if (result.result !== "success") {

            alert(
                result.message ||
                "登録に失敗しました。"
            );

            return;

        }


        // ユーザー情報を保存

        localStorage.setItem(
            "userId",
            result.userId
        );

        localStorage.setItem(
            "username",
            name
        );


        alert("🎉 登録完了！");

        location.href = "index.html";


    } catch (error) {

        console.error(error);

        alert("通信エラーが発生しました。");

    }

};


// ==========================
// ログイン
// ==========================

document.getElementById("loginBtn").onclick = async () => {

    const name =
        document.getElementById("loginName").value.trim();

    const password =
        document.getElementById("loginPassword").value;


    if (name === "") {

        alert("名前を入力してください！");
        return;

    }


    if (password === "") {

        alert("パスワードを入力してください！");
        return;

    }


    try {

        const response = await fetch(
            GAS_URL,
            {
                method: "POST",

                body: JSON.stringify({

                    type: "loginUser",

                    username: name,

                    password: password

                })
            }
        );


        const result = await response.json();


        if (result.result !== "success") {

            alert(
                result.message ||
                "名前またはパスワードが違います。"
            );

            return;

        }


        localStorage.setItem(
            "userId",
            result.userId
        );

        localStorage.setItem(
            "username",
            result.username
        );


        location.href = "index.html";


    } catch (error) {

        console.error(error);

        alert("通信エラーが発生しました。");

    }

};