// ====================
// Study Link
// 理科：物質
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
// 物質問題
// 中1レベル
// ====================

const questionTemplates = [

    {
        question: "物質をつくっている最小の粒子を何という？",
        choices: [
            "原子",
            "細胞",
            "分子",
            "イオン"
        ],
        answer: "原子"
    },

    {
        question: "いくつかの原子が結びついてできた粒子を何という？",
        choices: [
            "分子",
            "細胞",
            "原子核",
            "電流"
        ],
        answer: "分子"
    },

    {
        question: "水を分解するとできる物質の組み合わせは？",
        choices: [
            "水素と酸素",
            "酸素と窒素",
            "水素と二酸化炭素",
            "窒素と二酸化炭素"
        ],
        answer: "水素と酸素"
    },

    {
        question: "水素の化学式は？",
        choices: [
            "H₂",
            "O₂",
            "CO₂",
            "H₂O"
        ],
        answer: "H₂"
    },

    {
        question: "酸素の化学式は？",
        choices: [
            "O₂",
            "H₂",
            "CO₂",
            "N₂"
        ],
        answer: "O₂"
    },

    {
        question: "二酸化炭素の化学式は？",
        choices: [
            "CO₂",
            "O₂",
            "H₂",
            "H₂O"
        ],
        answer: "CO₂"
    },

    {
        question: "水の化学式は？",
        choices: [
            "H₂O",
            "CO₂",
            "O₂",
            "H₂"
        ],
        answer: "H₂O"
    },

    {
        question: "酸素の性質として正しいものは？",
        choices: [
            "ものを燃やすはたらきがある",
            "燃焼を必ず止める",
            "無色ではない",
            "水素より軽いとは限らない"
        ],
        answer: "ものを燃やすはたらきがある"
    },

    {
        question: "二酸化炭素の性質として正しいものは？",
        choices: [
            "石灰水を白くにごらせる",
            "ものを燃やす",
            "強く燃える",
            "水素より必ず軽い"
        ],
        answer: "石灰水を白くにごらせる"
    },

    {
        question: "水素に火を近づけるとどうなる？",
        choices: [
            "燃える",
            "石灰水が白くにごる",
            "必ず消える",
            "何も起こらない"
        ],
        answer: "燃える"
    },

    {
        question: "二酸化炭素を調べるために使うものは？",
        choices: [
            "石灰水",
            "ヨウ素液",
            "BTB溶液",
            "フェノールフタレイン液"
        ],
        answer: "石灰水"
    },

    {
        question: "デンプンを調べるために使う試薬は？",
        choices: [
            "ヨウ素液",
            "石灰水",
            "BTB溶液",
            "食塩水"
        ],
        answer: "ヨウ素液"
    },

    {
        question: "デンプンにヨウ素液を加えると何色になる？",
        choices: [
            "青紫色",
            "赤色",
            "黄色",
            "緑色"
        ],
        answer: "青紫色"
    },

    {
        question: "物質が液体から気体になる変化を何という？",
        choices: [
            "気化",
            "凝固",
            "融解",
            "凝縮"
        ],
        answer: "気化"
    },

    {
        question: "物質が気体から液体になる変化を何という？",
        choices: [
            "凝縮",
            "気化",
            "融解",
            "凝固"
        ],
        answer: "凝縮"
    },

    {
        question: "物質が固体から液体になる変化を何という？",
        choices: [
            "融解",
            "凝固",
            "気化",
            "凝縮"
        ],
        answer: "融解"
    },

    {
        question: "物質が液体から固体になる変化を何という？",
        choices: [
            "凝固",
            "融解",
            "気化",
            "凝縮"
        ],
        answer: "凝固"
    },

    {
        question: "水が氷になる変化は？",
        choices: [
            "凝固",
            "融解",
            "気化",
            "凝縮"
        ],
        answer: "凝固"
    },

    {
        question: "氷が水になる変化は？",
        choices: [
            "融解",
            "凝固",
            "気化",
            "凝縮"
        ],
        answer: "融解"
    },

    {
        question: "水が水蒸気になる変化は？",
        choices: [
            "気化",
            "凝縮",
            "凝固",
            "融解"
        ],
        answer: "気化"
    },

    {
        question: "水蒸気が水になる変化は？",
        choices: [
            "凝縮",
            "気化",
            "融解",
            "凝固"
        ],
        answer: "凝縮"
    },

    {
        question: "物質が状態変化するとき、物質そのものはどうなる？",
        choices: [
            "基本的に変わらない",
            "必ず別の物質になる",
            "必ず燃える",
            "必ず分解する"
        ],
        answer: "基本的に変わらない"
    },

    {
        question: "水を加熱したときに発生する気体は？",
        choices: [
            "水蒸気",
            "酸素",
            "水素",
            "二酸化炭素"
        ],
        answer: "水蒸気"
    },

    {
        question: "固体・液体・気体をまとめて何という？",
        choices: [
            "物質の状態",
            "化学式",
            "元素",
            "混合物"
        ],
        answer: "物質の状態"
    },

    {
        question: "食塩水のように、複数の物質が混ざり合ったものを何という？",
        choices: [
            "混合物",
            "純物質",
            "元素",
            "原子"
        ],
        answer: "混合物"
    },

    {
        question: "1種類の物質だけからできている物質を何という？",
        choices: [
            "純物質",
            "混合物",
            "溶液",
            "合金"
        ],
        answer: "純物質"
    },

    {
        question: "食塩水で、水に溶けている物質を何という？",
        choices: [
            "溶質",
            "溶媒",
            "溶液",
            "溶解"
        ],
        answer: "溶質"
    },

    {
        question: "食塩水で、食塩を溶かしている水を何という？",
        choices: [
            "溶媒",
            "溶質",
            "溶液",
            "混合物"
        ],
        answer: "溶媒"
    },

    {
        question: "溶質が溶媒に溶けてできた液体を何という？",
        choices: [
            "溶液",
            "溶質",
            "溶媒",
            "純物質"
        ],
        answer: "溶液"
    },

    {
        question: "物質1cm³あたりの質量を何という？",
        choices: [
            "密度",
            "質量",
            "体積",
            "濃度"
        ],
        answer: "密度"
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

    for (
        let i = 0;
        i < count;
        i++
    ) {

        const template =
            shuffled[
                i % shuffled.length
            ];

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
                            "理科",

                        unit:
                            "物質",

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