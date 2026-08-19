const GAS_URL =
    "https://script.google.com/macros/s/AKfycbxdL1vYB2Iv6hpQOTDnvmBaIAChjsxXUvEIQdm9U-TM2hqBPeSGsrkVdJwLVNqN4Mcp/exec";

let coin = 0;
let ownedItems = {};


// ====================
// ユーザーID
// ====================

const userId =
    localStorage.getItem("userId");


// ====================
// ユーザーデータ読み込み
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


        // ====================
        // Coin
        // ====================

        coin =
            Number(user.coin) || 0;


        const coinElement =
            document.getElementById("coin");


        if (coinElement) {

            coinElement.textContent =
                coin;

        }


        // ====================
// 🎟️ 抽選券
// ====================

const ticket =
    Number(user.ticket) || 0;

const ticketElement =
    document.getElementById("ticket");

if (ticketElement) {

    ticketElement.textContent =
        ticket;

}


        // ====================
        // 購入済みアイテム
        // ====================

        try {

            ownedItems =
                user.ownedItems
                    ? JSON.parse(user.ownedItems)
                    : {};

        } catch (error) {

            console.error(
                "ownedItemsの読み込みに失敗しました",
                error
            );

            ownedItems = {};

        }


        updateShop();


    } catch (error) {

        console.error(
            "ユーザーデータの取得に失敗しました",
            error
        );

    }

}


// ====================
// 商品購入
// ====================

async function buyItem(item, price) {

    // ====================
    // 購入済みチェック
    // ====================

    if (ownedItems[item] === true) {

        alert(
            "このアイテムは購入済みです"
        );

        return;

    }


    // ====================
    // Coinチェック
    // ====================

    if (coin < price) {

        alert(
            "Coinが足りません"
        );

        return;

    }


    const result = confirm(
        `${price} Coinを使って購入しますか？`
    );


    if (!result) {

        return;

    }


    const oldCoin = coin;


    // 仮にCoinを減らす
    coin -= price;


    // ボタンを一時的に無効化
    const buttons =
        document.querySelectorAll(
            ".buy-btn"
        );


    buttons.forEach(button => {

        if (
            button.dataset.item === item
        ) {

            button.disabled = true;

        }

    });


    try {

        // ====================
        // GASへ購入処理
        // ====================

        const response =
            await fetch(

                GAS_URL,

                {

                    method: "POST",

                    body: JSON.stringify({

                        type:
                            "purchaseItem",

                        userId:
                            userId,

                        item:
                            item,

                        price:
                            price

                    })

                }

            );


        const data =
            await response.json();


        // ====================
        // 失敗
        // ====================

        if (
            data.result !==
            "success"
        ) {

            coin = oldCoin;

            alert(
                data.message ||
                "購入に失敗しました"
            );

            updateShop();

            return;

        }


        // ====================
        // 成功
        // ====================

        coin =
            Number(data.coin);


        ownedItems =
            data.ownedItems
                ? JSON.parse(data.ownedItems)
                : ownedItems;


        const coinElement =
            document.getElementById("coin");


        if (coinElement) {

            coinElement.textContent =
                coin;

        }


        updateShop();


        alert(
            "🎉 購入が完了しました！"
        );


    } catch (error) {

        console.error(error);


        coin = oldCoin;


        alert(
            "通信エラーが発生しました"
        );


        updateShop();

    }

}


// ====================
// 購入済み表示
// ====================

function updateShop() {

    const buttons =
        document.querySelectorAll(
            ".buy-btn"
        );


    buttons.forEach(button => {

        const item =
            button.dataset.item;


        if (!item) {

            return;

        }


        if (
            ownedItems[item] === true
        ) {

            button.textContent =
                "購入済み";

            button.disabled =
                true;

        } else {

            button.disabled =
                false;

        }

    });

}

// =========================
// 🎰 Study Link 抽選
// =========================

async function drawLottery() {

    const userId =
        localStorage.getItem("userId");

    if (!userId) {

        alert(
            "ユーザー情報を確認できません。"
        );

        return;

    }


    const confirmDraw =
        confirm(
            "🎟️ 抽選券を1枚使って抽選しますか？"
        );


    if (!confirmDraw) {
        return;
    }


    try {

        const response =
            await fetch(

                GAS_URL,

                {

                    method: "POST",

                    body: JSON.stringify({

                        type:
                            "drawLottery",

                        userId:
                            userId

                    })

                }

            );


        const result =
            await response.json();

            console.log(
    "🎰 抽選結果データ:",
    JSON.stringify(result, null, 2)
);


        if (
            result.result !==
            "success"
        ) {

            alert(
                result.message ||
                "抽選に失敗しました。"
            );

            return;

        }


        // Coin更新

        coin =
            Number(result.coin) || 0;


        const coinElement =
            document.getElementById("coin");


        if (coinElement) {

            coinElement.textContent =
                coin;

        }


        // =========================
        // 結果表示
        // =========================

        const rarityName = {

            NORMAL: "⚪ NORMAL",

            RARE: "🔵 RARE",

            EPIC: "🟣 EPIC",

            LEGEND: "🟡 LEGEND"

        };


        const rewardName =
            result.reward &&
            result.reward.name
                ? result.reward.name
                : "報酬";


        // =========================
// 🎰 抽選結果ポップアップ
// =========================

const popup =
    document.getElementById("lotteryPopup");

const rarityElement =
    document.getElementById("lotteryRarity");

const rewardElement =
    document.getElementById("lotteryReward");


if (popup && rarityElement && rewardElement) {

    rarityElement.textContent =
        rarityName[result.rarity] ||
        "🎁 SPECIAL";

    rewardElement.textContent =
        rewardName;

    popup.classList.add("show");

}


        // ショップ更新

        loadUserData();


    } catch (error) {

        console.error(
            "抽選エラー",
            error
        );


        alert(
            "通信エラーが発生しました。"
        );

    }

}

// =========================
// 🎰 抽選結果ポップアップを閉じる
// =========================

function closeLotteryPopup() {

    const popup =
        document.getElementById("lotteryPopup");

    if (popup) {

        popup.classList.remove("show");

    }

}


// ====================
// 初期処理
// ====================

loadUserData();