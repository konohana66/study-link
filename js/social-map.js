// ====================
// Study Link
// 社会：地図・地形
// ====================

const GAS_URL =
    "https://script.google.com/macros/s/AKfycbxdL1vYB2Iv6hpQOTDnvmBaIAChjsxXUvEIQdm9U-TM2hqBPeSGsrkVdJwLVNqN4Mcp/exec";

let currentQuestion = 0;
let score = 0;
let earnedXP = 0;
let questionCount = 0;
let quiz = [];
let studyStartTime = null;


// ====================
// HTML要素
// ====================

const countArea = document.getElementById("countArea");
const quizArea = document.getElementById("quizArea");
const finishArea = document.getElementById("finish");

const progress = document.getElementById("progress");
const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const resultElement = document.getElementById("result");

const scoreElement = document.getElementById("score");
const xpResultElement = document.getElementById("xpResult");


// ====================
// 地図・地形 問題
// 中1レベル
// ====================

const questionTemplates = [

    {
        question: "地球上の位置を表すために使う、緯度と経度の線を何という？",
        choices: [
            "経緯線",
            "等高線",
            "等圧線",
            "境界線"
        ],
        answer: "経緯線"
    },

    {
        question: "赤道と平行に引かれた線を何という？",
        choices: [
            "緯線",
            "経線",
            "等高線",
            "等圧線"
        ],
        answer: "緯線"
    },

    {
        question: "北極と南極を結ぶ線を何という？",
        choices: [
            "経線",
            "緯線",
            "等高線",
            "海岸線"
        ],
        answer: "経線"
    },

    {
        question: "赤道の緯度は何度？",
        choices: [
            "0度",
            "90度",
            "45度",
            "180度"
        ],
        answer: "0度"
    },

    {
        question: "本初子午線の経度は何度？",
        choices: [
            "0度",
            "90度",
            "180度",
            "45度"
        ],
        answer: "0度"
    },

    {
        question: "日本の標準時を決める基準となる経線は？",
        choices: [
            "東経135度",
            "東経90度",
            "西経135度",
            "東経180度"
        ],
        answer: "東経135度"
    },

    {
        question: "日本の標準時子午線が通る兵庫県の都市は？",
        choices: [
            "明石市",
            "神戸市",
            "姫路市",
            "西宮市"
        ],
        answer: "明石市"
    },

    {
        question: "同じ高さの地点を結んだ線を何という？",
        choices: [
            "等高線",
            "等圧線",
            "緯線",
            "経線"
        ],
        answer: "等高線"
    },

    {
        question: "地形図で、等高線の間隔がせまい場所はどのような地形？",
        choices: [
            "傾斜が急",
            "傾斜がゆるやか",
            "平ら",
            "必ず海"
        ],
        answer: "傾斜が急"
    },

    {
        question: "地形図で、等高線の間隔が広い場所はどのような地形？",
        choices: [
            "傾斜がゆるやか",
            "傾斜が急",
            "必ず山頂",
            "必ず崖"
        ],
        answer: "傾斜がゆるやか"
    },

    {
        question: "地図上の距離と実際の距離の割合を何という？",
        choices: [
            "縮尺",
            "標高",
            "緯度",
            "経度"
        ],
        answer: "縮尺"
    },

    {
        question: "縮尺1:25,000の地図で、地図上1cmは実際に何m？",
        choices: [
            "250m",
            "25m",
            "2,500m",
            "25km"
        ],
        answer: "250m"
    },

    {
        question: "縮尺1:50,000の地図で、地図上1cmは実際に何m？",
        choices: [
            "500m",
            "50m",
            "5,000m",
            "50km"
        ],
        answer: "500m"
    },

    {
        question: "山の頂上など、周囲より高くなっている場所を何という？",
        choices: [
            "山頂",
            "谷",
            "盆地",
            "平野"
        ],
        answer: "山頂"
    },

    {
        question: "山と山の間にある低い場所を何という？",
        choices: [
            "谷",
            "山頂",
            "台地",
            "高原"
        ],
        answer: "谷"
    },

    {
        question: "周囲を山地に囲まれた平地を何という？",
        choices: [
            "盆地",
            "平野",
            "台地",
            "海岸"
        ],
        answer: "盆地"
    },

    {
        question: "海に面した低く平らな土地を何という？",
        choices: [
            "平野",
            "盆地",
            "山地",
            "高原"
        ],
        answer: "平野"
    },

    {
        question: "川が山地から平地に出たところに土砂が広がってできる扇形の地形は？",
        choices: [
            "扇状地",
            "三角州",
            "リアス海岸",
            "砂丘"
        ],
        answer: "扇状地"
    },

    {
        question: "川が運んできた土砂が河口付近にたまってできる地形は？",
        choices: [
            "三角州",
            "扇状地",
            "台地",
            "盆地"
        ],
        answer: "三角州"
    },

    {
        question: "山地が海岸までせまり、入り組んだ海岸線をもつ地形は？",
        choices: [
            "リアス海岸",
            "砂丘",
            "三角州",
            "扇状地"
        ],
        answer: "リアス海岸"
    },

    {
        question: "風などによって運ばれた砂が積もってできた地形は？",
        choices: [
            "砂丘",
            "盆地",
            "三角州",
            "扇状地"
        ],
        answer: "砂丘"
    },

    {
        question: "土地が周囲より一段高くなっている平らな地形を何という？",
        choices: [
            "台地",
            "谷",
            "盆地",
            "三角州"
        ],
        answer: "台地"
    },

    {
        question: "地図上で方位を示すために使われるものは？",
        choices: [
            "方位記号",
            "縮尺",
            "等高線",
            "凡例"
        ],
        answer: "方位記号"
    },

    {
        question: "地図に使われている記号の意味を説明するものは？",
        choices: [
            "凡例",
            "縮尺",
            "等高線",
            "方位記号"
        ],
        answer: "凡例"
    },

    {
        question: "地図記号で、学校を表す記号は？",
        choices: [
            "文",
            "〒",
            "×",
            "△"
        ],
        answer: "文"
    },

    {
        question: "地図記号で、郵便局を表す記号は？",
        choices: [
            "〒",
            "文",
            "果樹園",
            "消防署"
        ],
        answer: "〒"
    },

    {
        question: "地図記号で、三角形で表されるものは？",
        choices: [
            "三角点",
            "郵便局",
            "学校",
            "市役所"
        ],
        answer: "三角点"
    },

    {
        question: "同じ緯度でも、標高が高くなると一般に気温はどうなる？",
        choices: [
            "低くなる",
            "高くなる",
            "変わらない",
            "必ず0℃になる"
        ],
        answer: "低くなる"
    },

    {
        question: "日本の国土で、山地や山脈が占める割合はおよそどのくらい？",
        choices: [
            "約4分の3",
            "約2分の1",
            "約4分の1",
            "約10分の1"
        ],
        answer: "約4分の3"
    },

    {
        question: "日本の国土の中央部を南北に走る大きな山地を何という？",
        choices: [
            "日本アルプス",
            "奥羽山脈",
            "紀伊山地",
            "阿武隈高地"
        ],
        answer: "日本アルプス"
    }

];


// ====================
// クイズ開始
// ====================

function startQuiz(count) {

    questionCount = count;

    currentQuestion = 0;
    score = 0;
    earnedXP = 0;

    quiz = createQuiz(questionCount);

    studyStartTime = Date.now();

    countArea.style.display = "none";
    quizArea.style.display = "block";
    finishArea.style.display = "none";

    showQuestion();
}


// ====================
// クイズ作成
// ====================

function createQuiz(count) {

    const result = [];

    const shuffled =
        [...questionTemplates].sort(
            () => Math.random() - 0.5
        );

    for (let i = 0; i < count; i++) {

        const template =
            shuffled[i % shuffled.length];

        const choices =
            [...template.choices].sort(
                () => Math.random() - 0.5
            );

        result.push({

            question:
                template.question,

            choices:
                choices,

            answer:
                choices.indexOf(
                    template.answer
                )

        });

    }

    return result;
}


// ====================
// 問題表示
// ====================

function showQuestion() {

    const q =
        quiz[currentQuestion];

    progress.textContent =
        `第${currentQuestion + 1}問 / ${quiz.length}問`;

    questionElement.textContent =
        q.question;

    resultElement.textContent =
        "";

    answersElement.innerHTML =
        "";


    q.choices.forEach(
        (choice, index) => {

            const button =
                document.createElement("button");

            button.className =
                "answer-btn";

            button.textContent =
                choice;

            button.addEventListener(
                "click",
                () => {

                    checkAnswer(
                        index === q.answer,
                        button
                    );

                }
            );

            answersElement.appendChild(
                button
            );

        }
    );

}


// ====================
// 答え合わせ
// ====================

function checkAnswer(
    correct,
    clickedButton
) {

    const buttons =
        document.querySelectorAll(
            ".answer-btn"
        );

    const correctIndex =
        quiz[currentQuestion].answer;


    buttons.forEach(
        (button, index) => {

            button.disabled = true;

            // 正解を光らせる
            if (
                index === correctIndex
            ) {

                button.style.background =
                    "#4CAF50";

                button.style.color =
                    "white";

                button.style.borderColor =
                    "#4CAF50";

                button.style.boxShadow =
                    "0 0 15px rgba(76,175,80,0.6)";

            }

        }
    );


    if (correct) {

        score++;

        earnedXP += 5;

        resultElement.textContent =
            "⭕ 正解！ +5 XP";

        resultElement.style.color =
            "#16a34a";

    } else {

        clickedButton.style.background =
            "#f44336";

        clickedButton.style.color =
            "white";

        clickedButton.style.borderColor =
            "#f44336";

        resultElement.textContent =
            "❌ 不正解！";

        resultElement.style.color =
            "#dc2626";

    }


    setTimeout(
        () => {

            currentQuestion++;

            if (
                currentQuestion >=
                quiz.length
            ) {

                finishQuiz();

            } else {

                showQuestion();

            }

        },
        800
    );

}


// ====================
// クイズ終了
// ====================

async function finishQuiz() {

    let studyMinutes = 0;

    if (studyStartTime) {

        const elapsed =
            Date.now() -
            studyStartTime;

        studyMinutes =
            Math.max(
                1,
                Math.round(
                    elapsed / 60000
                )
            );

    }


    quizArea.style.display =
        "none";

    finishArea.style.display =
        "block";


    scoreElement.textContent =
        `${score} / ${quiz.length} 問正解！`;

    xpResultElement.textContent =
        `⭐ 今回獲得XP：${earnedXP} XP`;


    const userId =
        localStorage.getItem("userId");


    if (!userId) {
        return;
    }


    // ====================
    // 学習時間保存
    // ====================

    if (studyMinutes > 0) {

        try {

            await fetch(
                GAS_URL,
                {

                    method: "POST",

                    body: JSON.stringify({

                        type:
                            "saveStudyTime",

                        userId:
                            userId,

                        subject:
                            "社会",

                        unit:
                            "地図・地形",

                        minutes:
                            studyMinutes

                    })

                }
            );

        } catch (error) {

            console.error(
                "学習時間の保存に失敗しました。",
                error
            );

        }

    }


    // ====================
    // XP保存
    // ====================

    if (earnedXP > 0) {

        try {

            const response =
                await fetch(
                    GAS_URL,
                    {

                        method: "POST",

                        body: JSON.stringify({

                            type:
                                "updateXP",

                            userId:
                                userId,

                            xp:
                                earnedXP

                        })

                    }
                );


            const result =
                await response.json();


            if (
                result.result !==
                "success"
            ) {

                xpResultElement.textContent =
                    "⚠️ XPの保存に失敗しました。";

            }

        } catch (error) {

            console.error(
                "XPの保存に失敗しました。",
                error
            );

            xpResultElement.textContent =
                "⚠️ XPの保存に失敗しました。";

        }

    }

}