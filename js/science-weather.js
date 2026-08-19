// ====================
// Study Link
// 理科：天気
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
// 天気 問題
// 中1レベル
// ====================

const questionTemplates = [

    {
        question: "空気中にふくまれる水蒸気が水滴になって現れることを何という？",
        choices: [
            "凝結",
            "蒸発",
            "融解",
            "凝固"
        ],
        answer: "凝結"
    },

    {
        question: "空気が含むことのできる水蒸気の量には限度がある。この限度に達した空気を何という？",
        choices: [
            "飽和した空気",
            "乾燥した空気",
            "高気圧",
            "低気圧"
        ],
        answer: "飽和した空気"
    },

    {
        question: "空気が水蒸気を最大限まで含んでいるときの湿度を何％という？",
        choices: [
            "100％",
            "50％",
            "0％",
            "10％"
        ],
        answer: "100％"
    },

    {
        question: "空気中の水蒸気が水滴になり始める温度を何という？",
        choices: [
            "露点",
            "沸点",
            "融点",
            "気温"
        ],
        answer: "露点"
    },

    {
        question: "空気中の水蒸気が冷やされて水滴になったものが地表付近に見られる現象は？",
        choices: [
            "霧",
            "台風",
            "雷",
            "虹"
        ],
        answer: "霧"
    },

    {
        question: "雲は主に何からできている？",
        choices: [
            "小さな水滴や氷の粒",
            "酸素だけ",
            "二酸化炭素だけ",
            "砂の粒"
        ],
        answer: "小さな水滴や氷の粒"
    },

    {
        question: "雲ができる主な原因は？",
        choices: [
            "空気が上昇して膨張し、温度が下がること",
            "空気が必ず燃えること",
            "海水がすべて凍ること",
            "地面が急に温まることだけ"
        ],
        answer: "空気が上昇して膨張し、温度が下がること"
    },

    {
        question: "湿度を表すときに使う単位は？",
        choices: [
            "%",
            "℃",
            "hPa",
            "m/s"
        ],
        answer: "%"
    },

    {
        question: "気圧を表す単位として使われるものは？",
        choices: [
            "hPa",
            "%",
            "℃",
            "km"
        ],
        answer: "hPa"
    },

    {
        question: "空気が周囲よりも強く押している場所を何という？",
        choices: [
            "高気圧",
            "低気圧",
            "前線",
            "寒気"
        ],
        answer: "高気圧"
    },

    {
        question: "空気が周囲よりも弱く押している場所を何という？",
        choices: [
            "低気圧",
            "高気圧",
            "前線",
            "暖気"
        ],
        answer: "低気圧"
    },

    {
        question: "北半球で高気圧の中心付近の空気は、時計回りにどう動く？",
        choices: [
            "吹き出す",
            "吹き込む",
            "必ず上昇する",
            "動かない"
        ],
        answer: "吹き出す"
    },

    {
        question: "北半球で低気圧の中心付近の空気は、反時計回りにどう動く？",
        choices: [
            "吹き込む",
            "吹き出す",
            "動かない",
            "必ず下降する"
        ],
        answer: "吹き込む"
    },

    {
        question: "低気圧では、空気は中心付近でどうなりやすい？",
        choices: [
            "上昇する",
            "下降する",
            "完全に止まる",
            "必ず乾燥する"
        ],
        answer: "上昇する"
    },

    {
        question: "高気圧では、中心付近の空気はどうなりやすい？",
        choices: [
            "下降する",
            "上昇する",
            "必ず雲になる",
            "必ず雨になる"
        ],
        answer: "下降する"
    },

    {
        question: "高気圧におおわれたときの天気は一般にどうなりやすい？",
        choices: [
            "晴れ",
            "雨",
            "雪だけ",
            "雷だけ"
        ],
        answer: "晴れ"
    },

    {
        question: "低気圧におおわれたときの天気は一般にどうなりやすい？",
        choices: [
            "くもりや雨",
            "必ず快晴",
            "必ず雪",
            "必ず晴れ"
        ],
        answer: "くもりや雨"
    },

    {
        question: "異なる性質の空気の境目を何という？",
        choices: [
            "前線",
            "気圧",
            "湿度",
            "気団"
        ],
        answer: "前線"
    },

    {
        question: "暖かい空気と冷たい空気がぶつかる境界付近でできるものは？",
        choices: [
            "前線",
            "高気圧",
            "台風",
            "海風"
        ],
        answer: "前線"
    },

    {
        question: "暖かい空気が冷たい空気の上にはい上がるように進む前線は？",
        choices: [
            "温暖前線",
            "寒冷前線",
            "停滞前線",
            "閉塞前線"
        ],
        answer: "温暖前線"
    },

    {
        question: "冷たい空気が暖かい空気を押し上げるように進む前線は？",
        choices: [
            "寒冷前線",
            "温暖前線",
            "停滞前線",
            "閉塞前線"
        ],
        answer: "寒冷前線"
    },

    {
        question: "温暖前線が通過するときに降りやすい雨は？",
        choices: [
            "弱い雨が比較的長く続く",
            "短時間の強い雨だけ",
            "必ず雪になる",
            "雨は降らない"
        ],
        answer: "弱い雨が比較的長く続く"
    },

    {
        question: "寒冷前線が通過するときに降りやすい雨は？",
        choices: [
            "短時間の強い雨",
            "弱い雨が何日も続く",
            "雨は降らない",
            "必ず雪になる"
        ],
        answer: "短時間の強い雨"
    },

    {
        question: "日本付近で、夏に南東から吹きやすい季節風を何という？",
        choices: [
            "南東季節風",
            "北西季節風",
            "偏西風",
            "海風"
        ],
        answer: "南東季節風"
    },

    {
        question: "日本付近で、冬に大陸から吹くことが多い季節風の向きは？",
        choices: [
            "北西",
            "南東",
            "南西",
            "北東"
        ],
        answer: "北西"
    },

    {
        question: "日本の天気に大きな影響を与える、長期間ほぼ同じ性質をもった空気のかたまりを何という？",
        choices: [
            "気団",
            "前線",
            "台風",
            "雲"
        ],
        answer: "気団"
    },

    {
        question: "日本の冬の天気に関係が深い気圧配置は？",
        choices: [
            "西高東低",
            "東高西低",
            "南高北低",
            "北高南低"
        ],
        answer: "西高東低"
    },

    {
        question: "天気図で、同じ気圧の地点を結んだ線を何という？",
        choices: [
            "等圧線",
            "等温線",
            "等高線",
            "前線"
        ],
        answer: "等圧線"
    },

    {
        question: "天気図で等圧線の間隔がせまいところほど、一般に風はどうなる？",
        choices: [
            "強くなる",
            "弱くなる",
            "必ず無風になる",
            "風向がなくなる"
        ],
        answer: "強くなる"
    },

    {
        question: "風向とは何を表す？",
        choices: [
            "風が吹いてくる方向",
            "風が吹いていく方向",
            "風の強さ",
            "気圧の高さ"
        ],
        answer: "風が吹いてくる方向"
    },

    {
        question: "風速を表す単位として使われるものは？",
        choices: [
            "m/s",
            "hPa",
            "%",
            "℃"
        ],
        answer: "m/s"
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
                            "天気",

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