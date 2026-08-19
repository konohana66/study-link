// ====================
// Study Link マイページ
// ====================

const GAS_URL =
    "https://script.google.com/macros/s/AKfycbxdL1vYB2Iv6hpQOTDnvmBaIAChjsxXUvEIQdm9U-TM2hqBPeSGsrkVdJwLVNqN4Mcp/exec";

const userId =
    localStorage.getItem("userId");


// ====================
// HTML
// ====================

const userName =
    document.getElementById("userName");

const profileArea =
    document.getElementById("profileArea");

const profileIcon =
    document.getElementById("profileIcon");

const profileTitle =
    document.getElementById("profileTitle");

const rankElement =
    document.getElementById("rank");

const editProfile =
    document.getElementById("editProfile");

const editArea =
    document.getElementById("editArea");

const editName =
    document.getElementById("editName");

const editTitle =
    document.getElementById("editTitle");

const editBackground =
    document.getElementById("editBackground");

const editFrame =
    document.getElementById("editFrame");

const saveProfile =
    document.getElementById("saveProfile");

const cancelEdit =
    document.getElementById("cancelEdit");


// ====================
// ユーザー情報
// ====================

let currentUser = null;
let ownedItems = {};


// ====================
// ユーザー情報読み込み
// ====================

async function loadUserData() {

    if (!userId) {
        return;
    }

    try {

        const response = await fetch(
            GAS_URL +
            "?type=user&userId=" +
            encodeURIComponent(userId)
        );

        const user =
            await response.json();


        if (user.result === "error") {

            console.error(
                "ユーザーが見つかりません"
            );

            return;
        }


        currentUser = user;


        // ====================
        // 名前
        // ====================

        const username =
            user.username || "ゲスト";

        userName.textContent =
            "👤 " + username;

        localStorage.setItem(
            "username",
            username
        );


        // ====================
        // XP
        // ====================

        const totalXP =
            Number(user.xp) || 0;

        const level =
            Math.floor(totalXP / 100) + 1;

        const nowXP =
            totalXP % 100;


        document.getElementById("level")
            .textContent =
            "Lv." + level;


        document.getElementById("xpBar")
            .value =
            nowXP;


        document.getElementById("xpText")
            .textContent =
            `${nowXP} / 100 XP`;


        // ====================
        // Coin
        // ====================

        const totalCoin =
            Number(user.coin) || 0;


        document.getElementById("coin")
            .textContent =
            totalCoin + " Coin";


        // ====================
        // 所持アイテム
        // ====================

        try {

            ownedItems =
                user.ownedItems
                    ? JSON.parse(user.ownedItems)
                    : {};

        } catch (error) {

            console.error(
                "ownedItemsの読み込みエラー",
                error
            );

            ownedItems = {};

        }


        // ====================
        // プロフィール
        // ====================

        const background =
            user.profileBackground ||
            "default";

        const frame =
            user.profileFrame ||
            "default";

        const title =
            user.profileTitle ||
            "default";


        applyProfile(
            background,
            frame,
            title,
            level
        );

    } catch (error) {

        console.error(
            "ユーザー情報の取得に失敗しました",
            error
        );

    }

}


// ====================
// ランク取得
// ====================

function getRank(level) {

    if (level >= 100) {

        return "⚡ Study King";

    }

    if (level >= 50) {

        return "👑 Master";

    }

    if (level >= 25) {

        return "🥇 Gold";

    }

    if (level >= 10) {

        return "🥈 Silver";

    }

    return "🥉 Bronze";

}


// ====================
// プロフィール反映
// ====================

function applyProfile(
    background,
    frame,
    title,
    level
) {

    // ====================
    // 背景
    // ====================

    if (profileArea) {

        if (
            background === "shop" &&
            ownedItems["background"] === true
        ) {

            profileArea.style.background =
                "linear-gradient(135deg, #dff6ff, #e8ddff)";

        }

        else if (
            background === "limited_night" &&
            ownedItems["limited_night"] === true
        ) {

            profileArea.style.background =
                "linear-gradient(135deg, #141e30, #243b55)";

        }

        else if (
            background === "limited_star" &&
            ownedItems["limited_star"] === true
        ) {

            profileArea.style.background =
                "linear-gradient(135deg, #667eea, #764ba2)";

        }

        else {

            profileArea.style.background = "";

        }

    }


    // ====================
    // フレーム
    // ====================

    if (profileIcon) {

        if (
            frame === "shop" &&
            ownedItems["frame"] === true
        ) {

            profileIcon.style.border =
                "6px solid gold";

        }

        else if (
            frame === "limited_gold" &&
            ownedItems["limited_gold"] === true
        ) {

            profileIcon.style.border =
                "6px solid gold";

        }

        else if (
            frame === "limited_diamond" &&
            ownedItems["limited_diamond"] === true
        ) {

            profileIcon.style.border =
                "6px solid #b9f2ff";

        }

        else {

            profileIcon.style.border =
                "none";

        }

    }


    // ====================
    // アイコン
    // ====================

    if (profileIcon) {

        if (
            profileIcon.dataset.originalIcon === undefined
        ) {

            profileIcon.dataset.originalIcon =
                profileIcon.textContent;

        }


        if (
            ownedItems["limited_champion"] === true &&
            currentUser?.profileIcon === "limited_champion"
        ) {

            profileIcon.textContent =
                "🏆";

        }

        else {

            profileIcon.textContent =
                profileIcon.dataset.originalIcon;

        }

    }


    // ====================
    // 称号
    // ====================

    if (
        title === "special" &&
        ownedItems["title"] === true
    ) {

        rankElement.textContent =
            "🏷️ 特別な称号";


        if (profileTitle) {

            profileTitle.textContent =
                "🏷️ 特別な称号";

        }

    }

    else if (
        title === "limited_special" &&
        ownedItems["limited_special"] === true
    ) {

        rankElement.textContent =
            "🏷️ 限定称号";


        if (profileTitle) {

            profileTitle.textContent =
                "🏷️ 限定称号";

        }

    }

    else {

        rankElement.textContent =
            getRank(level);


        if (profileTitle) {

            profileTitle.textContent =
                "";

        }

    }

}


// ====================
// 編集開始
// ====================

editProfile.onclick = async () => {

    if (!currentUser) {

        await loadUserData();

    }


    // ====================
    // 名前
    // ====================

    editName.value =
        currentUser?.username || "";


    // ====================
    // 一旦選択肢を初期化
    // ====================

    editTitle.innerHTML = `
        <option value="default">
            Bronze
        </option>
    `;


    editBackground.innerHTML = `
        <option value="default">
            通常
        </option>
    `;


    editFrame.innerHTML = `
        <option value="default">
            通常
        </option>
    `;


    // ====================
// 購入済み背景
// ====================

if (
    ownedItems["background"] === true
) {

    const option =
        document.createElement("option");

    option.value = "shop";

    option.textContent =
        "🎨 購入した背景";

    editBackground.appendChild(
        option
    );

}


// 限定背景①

if (
    ownedItems["limited_night"] === true
) {

    const option =
        document.createElement("option");

    option.value = "limited_night";

    option.textContent =
        "🌌 Midnight Study";

    editBackground.appendChild(
        option
    );

}


// 限定背景②

if (
    ownedItems["limited_star"] === true
) {

    const option =
        document.createElement("option");

    option.value = "limited_star";

    option.textContent =
        "✨ Starry Night";

    editBackground.appendChild(
        option
    );

}


// ====================
// 購入済みフレーム
// ====================

if (
    ownedItems["frame"] === true
) {

    const option =
        document.createElement("option");

    option.value = "shop";

    option.textContent =
        "🖼️ 購入したフレーム";

    editFrame.appendChild(
        option
    );

}


// 限定フレーム①

if (
    ownedItems["limited_gold"] === true
) {

    const option =
        document.createElement("option");

    option.value = "limited_gold";

    option.textContent =
        "👑 Golden Frame";

    editFrame.appendChild(
        option
    );

}


// 限定フレーム②

if (
    ownedItems["limited_diamond"] === true
) {

    const option =
        document.createElement("option");

    option.value = "limited_diamond";

    option.textContent =
        "💎 Diamond Frame";

    editFrame.appendChild(
        option
    );

}


// ====================
// 購入済み称号
// ====================

if (
    ownedItems["title"] === true
) {

    const option =
        document.createElement("option");

    option.value = "special";

    option.textContent =
        "🏷️ 特別な称号";

    editTitle.appendChild(
        option
    );

}


// 限定称号

if (
    ownedItems["limited_special"] === true
) {

    const option =
        document.createElement("option");

    option.value =
        "limited_special";

    option.textContent =
        "🏷️ 限定称号";

    editTitle.appendChild(
        option
    );

}


    // ====================
    // 現在の設定
    // ====================

    editBackground.value =
        currentUser.profileBackground ||
        "default";

    editFrame.value =
        currentUser.profileFrame ||
        "default";

    editTitle.value =
        currentUser.profileTitle ||
        "default";


    // ====================
    // 編集画面表示
    // ====================

    editArea.style.display =
        "block";

    editProfile.style.display =
        "none";

};


// ====================
// 保存
// ====================

saveProfile.onclick = async () => {

    const newName =
        editName.value.trim();


    if (!newName) {

        alert(
            "名前を入力してください"
        );

        return;

    }


    if (!userId) {

        alert(
            "ユーザー情報がありません"
        );

        return;

    }


    saveProfile.disabled = true;


    try {

        const response =
            await fetch(

                GAS_URL,

                {

                    method: "POST",

                    body: JSON.stringify({

                        type:
                            "updateProfile",

                        userId:
                            userId,

                        username:
                            newName,

                        profileBackground:
                            editBackground.value,

                        profileFrame:
                            editFrame.value,

                        profileTitle:
                            editTitle.value

                    })

                }

            );


        const result =
            await response.json();


        if (
            result.result !==
            "success"
        ) {

            alert(
                "保存に失敗しました"
            );

            return;

        }


        localStorage.setItem(
            "username",
            newName
        );


        alert(
            "プロフィールを保存しました！"
        );


        location.reload();


    } catch (error) {

        console.error(error);

        alert(
            "通信エラーが発生しました"
        );

    } finally {

        saveProfile.disabled = false;

    }

};


// ====================
// キャンセル
// ====================

cancelEdit.onclick = () => {

    editArea.style.display =
        "none";

    editProfile.style.display =
        "inline-block";

};


// ====================
// ログアウト
// ====================

document.getElementById(
    "logout"
).onclick = () => {

    if (
        confirm("ログアウトしますか？")
    ) {

        localStorage.removeItem(
            "username"
        );

        location.href =
            "login.html";

    }

};


// ====================
// 開始
// ====================

loadUserData();