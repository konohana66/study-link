// ====================
// Study Link
// 弱点トレーニング
// ====================

const weaknessList =
    document.getElementById("weaknessList");


// ====================
// 弱点一覧を読み込み
// ====================

function loadWeaknesses() {

    const weaknesses =
        JSON.parse(
            localStorage.getItem("studyLinkWeaknesses") || "{}"
        );

    weaknessList.innerHTML = "";

    const weaknessItems = [];


    Object.keys(weaknesses).forEach(subject => {

        const units = weaknesses[subject];

        Object.keys(units).forEach(unit => {

            const data = units[unit];

            // 一度も解いていない単元は表示しない
            if (
                data.wrong === 0 &&
                data.correct === 0
            ) {
                return;
            }

            weaknessItems.push({
                subject: subject,
                unit: unit,
                data: data
            });

        });

    });


    // ====================
    // 弱点レベルが高い順
    // ====================

    weaknessItems.sort((a, b) => {

        return b.data.level - a.data.level;

    });


    if (weaknessItems.length === 0) {

        weaknessList.innerHTML = `
            <p>現在、弱点はありません！🎉</p>
        `;

        return;

    }


    // ====================
    // カード表示
    // ====================

    weaknessItems.forEach(item => {

        const card =
            document.createElement("div");

        card.style.margin = "12px 0";
        card.style.padding = "16px";
        card.style.borderRadius = "12px";
        card.style.background = "#f3f4f6";


        const level = item.data.level;

let status = "";

if (level === 0) {

    status = "✅ 克服済み";

} else if (level === 1) {

    status = "🟢 弱点レベル：1";

} else if (level === 2) {

    status = "🟠 弱点レベル：2";

} else if (level === 3) {

    status = "🔴 弱点レベル：3";

} else {

    status = `🔥 弱点レベル：${level}`;

}


        card.innerHTML = `

            <h2>
                ${item.subject}：${item.unit}
            </h2>

            <p>
                ${status}
            </p>

            <p>
                正解数：${item.data.correct}
            </p>

            <p>
                不正解数：${item.data.wrong}
            </p>

            ${
    item.data.level > 0
        ? `
            <button
                onclick="startWeaknessTraining(
                    '${item.subject}',
                    '${item.unit}'
                )"
            >
                この単元を練習する
            </button>
        `
        : ""
}

        `;


        weaknessList.appendChild(card);

    });

}


// ====================
// 弱点トレーニング開始
// ====================

function startWeaknessTraining(subject, unit) {

    const weaknesses =
        JSON.parse(
            localStorage.getItem("studyLinkWeaknesses") || "{}"
        );


    const data =
        weaknesses?.[subject]?.[unit];


    if (!data) {

        alert(
            "この単元の弱点データがありません。"
        );

        return;

    }


    // ====================
    // 問題数
    // ====================

    const count =
        Math.min(
            20,
            Math.max(
                5,
                data.level * 5
            )
        );


    // ====================
    // 数学・正負の数
    // ====================

    if (
        subject === "数学" &&
        unit === "正負の数"
    ) {

        location.href =
            `math-positive.html?mode=weakness&count=${count}`;

        return;

    }

    if (
    subject === "数学" &&
    unit === "方程式"
) {
    location.href =
        `math-equation.html?mode=weakness&count=${count}`;
    return;
}

if (
    subject === "数学" &&
    unit === "文字の式"
) {
    location.href =
        `math-expression.html?mode=weakness&count=${count}`;
    return;
}

if (
    subject === "数学" &&
    unit === "データの活用"
) {
    location.href =
        `math-data.html?mode=weakness&count=${count}`;
    return;
}

if (
    subject === "数学" &&
    unit === "図形"
) {
    location.href =
        `math-shape.html?mode=weakness&count=${count}`;
    return;
}

    if (
    subject === "英語" &&
    unit === "be動詞"
) {
    location.href =
        `english-be.html?mode=weakness&count=${count}`;
    return;
}


    alert(
        `${subject}「${unit}」の弱点トレーニングは、まだ対応していません。`
    );

}


// ====================
// 初期表示
// ====================

loadWeaknesses();