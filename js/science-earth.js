// ====================
// Study Link
// 理科：地球・大地
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
// 地球・大地 問題
// 中1レベル
// ====================

const questionTemplates = [

    {
        question: "地球の表面をおおっている固い部分を何という？",
        choices: [
            "地殻",
            "マントル",
            "外核",
            "内核"
        ],
        answer: "地殻"
    },

    {
        question: "地球の内部で、地殻の下にある部分を何という？",
        choices: [
            "マントル",
            "地殻",
            "大気",
            "海洋"
        ],
        answer: "マントル"
    },

    {
        question: "地震が発生した地下の場所を何という？",
        choices: [
            "震源",
            "震央",
            "震度",
            "震源域"
        ],
        answer: "震源"
    },

    {
        question: "震源の真上にある地表の地点を何という？",
        choices: [
            "震央",
            "震源",
            "震度",
            "マグニチュード"
        ],
        answer: "震央"
    },

    {
        question: "地震そのものの規模を表す値は？",
        choices: [
            "マグニチュード",
            "震度",
            "気圧",
            "湿度"
        ],
        answer: "マグニチュード"
    },

    {
        question: "ある場所での地震の揺れの強さを表すものは？",
        choices: [
            "震度",
            "マグニチュード",
            "震源",
            "震央"
        ],
        answer: "震度"
    },

    {
        question: "地震の最初の小さな揺れを何という？",
        choices: [
            "初期微動",
            "主要動",
            "余震",
            "本震"
        ],
        answer: "初期微動"
    },

    {
        question: "初期微動のあとにくる大きな揺れを何という？",
        choices: [
            "主要動",
            "初期微動",
            "余震",
            "前震"
        ],
        answer: "主要動"
    },

    {
        question: "初期微動を伝える地震波を何という？",
        choices: [
            "P波",
            "S波",
            "光波",
            "音波"
        ],
        answer: "P波"
    },

    {
        question: "主要動を伝える地震波を何という？",
        choices: [
            "S波",
            "P波",
            "光波",
            "音波"
        ],
        answer: "S波"
    },

    {
        question: "P波とS波では、どちらのほうが速く伝わる？",
        choices: [
            "P波",
            "S波",
            "同じ速さ",
            "場所によって必ず逆になる"
        ],
        answer: "P波"
    },

    {
        question: "火山の地下にある、マグマがたまっている場所を何という？",
        choices: [
            "マグマだまり",
            "火口",
            "火山灰層",
            "断層"
        ],
        answer: "マグマだまり"
    },

    {
        question: "地下深くにある高温のどろどろした物質を何という？",
        choices: [
            "マグマ",
            "溶岩",
            "火山灰",
            "火山れき"
        ],
        answer: "マグマ"
    },

    {
        question: "マグマが地表に出てきたものを何という？",
        choices: [
            "溶岩",
            "マグマだまり",
            "火山灰",
            "火山ガス"
        ],
        answer: "溶岩"
    },

    {
        question: "火山から噴き出す細かい粒状の物質を何という？",
        choices: [
            "火山灰",
            "溶岩",
            "マグマ",
            "化石"
        ],
        answer: "火山灰"
    },

    {
        question: "火山から噴き出す気体を何という？",
        choices: [
            "火山ガス",
            "酸素",
            "水素",
            "水蒸気だけ"
        ],
        answer: "火山ガス"
    },

    {
        question: "マグマが冷えて固まってできた岩石を何という？",
        choices: [
            "火成岩",
            "堆積岩",
            "変成岩",
            "石灰岩だけ"
        ],
        answer: "火成岩"
    },

    {
        question: "マグマが地下深くでゆっくり冷えてできる岩石を何という？",
        choices: [
            "深成岩",
            "火山岩",
            "堆積岩",
            "変成岩"
        ],
        answer: "深成岩"
    },

    {
        question: "マグマが地表付近で急速に冷えてできる岩石を何という？",
        choices: [
            "火山岩",
            "深成岩",
            "堆積岩",
            "変成岩"
        ],
        answer: "火山岩"
    },

    {
        question: "れき・砂・泥などが積み重なってできた岩石を何という？",
        choices: [
            "堆積岩",
            "火成岩",
            "深成岩",
            "変成岩"
        ],
        answer: "堆積岩"
    },

    {
        question: "堆積物が長い時間をかけて押し固められることを何という？",
        choices: [
            "堆積",
            "風化",
            "侵食",
            "運搬"
        ],
        answer: "堆積"
    },

    {
        question: "雨や風などによって岩石が削られることを何という？",
        choices: [
            "侵食",
            "堆積",
            "凝固",
            "融解"
        ],
        answer: "侵食"
    },

    {
        question: "川などが土砂を運ぶことを何という？",
        choices: [
            "運搬",
            "侵食",
            "堆積",
            "風化"
        ],
        answer: "運搬"
    },

    {
        question: "地層の中から見つかる、過去の生物の体や生活のあとを何という？",
        choices: [
            "化石",
            "鉱物",
            "火山灰",
            "マグマ"
        ],
        answer: "化石"
    },

    {
        question: "地層ができた当時の環境を推定する手がかりになる化石を何という？",
        choices: [
            "示相化石",
            "示準化石",
            "原石",
            "火山化石"
        ],
        answer: "示相化石"
    },

    {
        question: "地層ができた時代を推定する手がかりになる化石を何という？",
        choices: [
            "示準化石",
            "示相化石",
            "火山化石",
            "堆積化石"
        ],
        answer: "示準化石"
    },

    {
        question: "地層では、基本的に下にある地層ほどどうなる？",
        choices: [
            "古い",
            "新しい",
            "必ず薄い",
            "必ず柔らかい"
        ],
        answer: "古い"
    },

    {
        question: "地層が水平方向に広がっている場合、基本的に同じ時代にできたと考えられることを何という？",
        choices: [
            "地層の広がり",
            "地層の連続性",
            "地震の規模",
            "火山活動"
        ],
        answer: "地層の連続性"
    },

    {
        question: "地震などによって地層がずれている場所を何という？",
        choices: [
            "断層",
            "火口",
            "震央",
            "マグマだまり"
        ],
        answer: "断層"
    },

    {
        question: "地下の岩石が大きな力を受けて変形することがある。このような力によって地層に起こる変化は？",
        choices: [
            "しゅう曲",
            "融解",
            "凝固",
            "蒸発"
        ],
        answer: "しゅう曲"
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
                            "理科",

                        unit:
                            "地球・大地",

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