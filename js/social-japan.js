// ====================
// Study Link
// 社会：日本の地理
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
// 日本の地理 問題
// 中1レベル
// ====================

const questionTemplates = [

    {
        question: "日本を構成する主要な4つの島のうち、最も大きい島は？",
        choices: [
            "本州",
            "北海道",
            "九州",
            "四国"
        ],
        answer: "本州"
    },

    {
        question: "日本で最も北に位置する主要な島は？",
        choices: [
            "北海道",
            "本州",
            "四国",
            "九州"
        ],
        answer: "北海道"
    },

    {
        question: "日本で最も南に位置する主要な島は？",
        choices: [
            "九州",
            "四国",
            "本州",
            "北海道"
        ],
        answer: "九州"
    },

    {
        question: "日本の首都は？",
        choices: [
            "東京",
            "大阪",
            "京都",
            "名古屋"
        ],
        answer: "東京"
    },

    {
        question: "日本で最も高い山は？",
        choices: [
            "富士山",
            "北岳",
            "奥穂高岳",
            "槍ヶ岳"
        ],
        answer: "富士山"
    },

    {
        question: "富士山の標高は？",
        choices: [
            "3776m",
            "3000m",
            "3980m",
            "2500m"
        ],
        answer: "3776m"
    },

    {
        question: "日本で最も長い川は？",
        choices: [
            "信濃川",
            "利根川",
            "石狩川",
            "木曽川"
        ],
        answer: "信濃川"
    },

    {
        question: "日本で最大の湖は？",
        choices: [
            "琵琶湖",
            "霞ヶ浦",
            "サロマ湖",
            "浜名湖"
        ],
        answer: "琵琶湖"
    },

    {
        question: "日本で最も広い平野は？",
        choices: [
            "関東平野",
            "石狩平野",
            "濃尾平野",
            "大阪平野"
        ],
        answer: "関東平野"
    },

    {
        question: "北海道にある日本で最も広い平野は？",
        choices: [
            "石狩平野",
            "十勝平野",
            "関東平野",
            "庄内平野"
        ],
        answer: "石狩平野"
    },

    {
        question: "日本の都道府県の数は？",
        choices: [
            "47",
            "46",
            "48",
            "45"
        ],
        answer: "47"
    },

    {
        question: "北海道の道庁所在地は？",
        choices: [
            "札幌市",
            "旭川市",
            "函館市",
            "釧路市"
        ],
        answer: "札幌市"
    },

    {
        question: "大阪府の府庁所在地は？",
        choices: [
            "大阪市",
            "堺市",
            "東大阪市",
            "豊中市"
        ],
        answer: "大阪市"
    },

    {
        question: "沖縄県の県庁所在地は？",
        choices: [
            "那覇市",
            "沖縄市",
            "名護市",
            "石垣市"
        ],
        answer: "那覇市"
    },

    {
        question: "日本の国土を大きく分けたとき、北海道が属する地方は？",
        choices: [
            "北海道地方",
            "東北地方",
            "関東地方",
            "中部地方"
        ],
        answer: "北海道地方"
    },

    {
        question: "青森県・岩手県・宮城県などが属する地方は？",
        choices: [
            "東北地方",
            "関東地方",
            "中部地方",
            "北海道地方"
        ],
        answer: "東北地方"
    },

    {
        question: "東京都・神奈川県・千葉県などが属する地方は？",
        choices: [
            "関東地方",
            "東北地方",
            "中部地方",
            "近畿地方"
        ],
        answer: "関東地方"
    },

    {
        question: "愛知県・静岡県・長野県などが属する地方は？",
        choices: [
            "中部地方",
            "関東地方",
            "近畿地方",
            "中国地方"
        ],
        answer: "中部地方"
    },

    {
        question: "大阪府・京都府・兵庫県などが属する地方は？",
        choices: [
            "近畿地方",
            "中部地方",
            "中国地方",
            "四国地方"
        ],
        answer: "近畿地方"
    },

    {
        question: "鳥取県・島根県・岡山県などが属する地方は？",
        choices: [
            "中国地方",
            "近畿地方",
            "四国地方",
            "九州地方"
        ],
        answer: "中国地方"
    },

    {
        question: "香川県・徳島県・愛媛県・高知県が属する地方は？",
        choices: [
            "四国地方",
            "中国地方",
            "九州地方",
            "近畿地方"
        ],
        answer: "四国地方"
    },

    {
        question: "福岡県・熊本県・鹿児島県などが属する地方は？",
        choices: [
            "九州地方",
            "四国地方",
            "中国地方",
            "沖縄地方"
        ],
        answer: "九州地方"
    },

    {
        question: "日本列島の太平洋側を流れる暖流は？",
        choices: [
            "黒潮（日本海流）",
            "親潮（千島海流）",
            "リマン海流",
            "対馬海流"
        ],
        answer: "黒潮（日本海流）"
    },

    {
        question: "日本列島の北東側から南へ流れる寒流は？",
        choices: [
            "親潮（千島海流）",
            "黒潮（日本海流）",
            "対馬海流",
            "日本海流"
        ],
        answer: "親潮（千島海流）"
    },

    {
        question: "日本海側で冬に雪が多くなる主な理由は？",
        choices: [
            "季節風が日本海から水蒸気を受け取るため",
            "太平洋から暖かい風が吹くため",
            "一年中高気圧におおわれるため",
            "海流がなくなるため"
        ],
        answer: "季節風が日本海から水蒸気を受け取るため"
    },

    {
        question: "瀬戸内地方で雨が少ない理由の一つは？",
        choices: [
            "中国山地と四国山地に囲まれているため",
            "日本海に面しているため",
            "北海道に近いため",
            "赤道に近いため"
        ],
        answer: "中国山地と四国山地に囲まれているため"
    },

    {
        question: "北海道で稲作が盛んな地域として知られる平野は？",
        choices: [
            "石狩平野",
            "関東平野",
            "濃尾平野",
            "筑紫平野"
        ],
        answer: "石狩平野"
    },

    {
        question: "愛知県を中心とする工業地域は？",
        choices: [
            "中京工業地帯",
            "京浜工業地帯",
            "阪神工業地帯",
            "北九州工業地域"
        ],
        answer: "中京工業地帯"
    },

    {
        question: "東京都・神奈川県を中心とする工業地帯は？",
        choices: [
            "京浜工業地帯",
            "中京工業地帯",
            "阪神工業地帯",
            "瀬戸内工業地域"
        ],
        answer: "京浜工業地帯"
    },

    {
        question: "大阪府・兵庫県を中心とする工業地帯は？",
        choices: [
            "阪神工業地帯",
            "京浜工業地帯",
            "中京工業地帯",
            "北九州工業地域"
        ],
        answer: "阪神工業地帯"
    },

    {
        question: "福岡県北九州市を中心に発達した工業地域は？",
        choices: [
            "北九州工業地域",
            "京浜工業地帯",
            "中京工業地帯",
            "阪神工業地帯"
        ],
        answer: "北九州工業地域"
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
                            "日本の地理",

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