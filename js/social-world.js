// ====================
// Study Link
// 社会：世界の地理
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
// 世界の地理 問題
// 中1レベル
// ====================

const questionTemplates = [

    {
        question: "世界で最も面積が大きい大陸は？",
        choices: [
            "ユーラシア大陸",
            "アフリカ大陸",
            "北アメリカ大陸",
            "南アメリカ大陸"
        ],
        answer: "ユーラシア大陸"
    },

    {
        question: "世界で最も面積が大きい海洋は？",
        choices: [
            "太平洋",
            "大西洋",
            "インド洋",
            "北極海"
        ],
        answer: "太平洋"
    },

    {
        question: "赤道が通っている大陸は？",
        choices: [
            "アフリカ大陸",
            "ヨーロッパ大陸",
            "南極大陸",
            "オーストラリア大陸"
        ],
        answer: "アフリカ大陸"
    },

    {
        question: "本初子午線が通るイギリスの都市は？",
        choices: [
            "ロンドン",
            "パリ",
            "ローマ",
            "ベルリン"
        ],
        answer: "ロンドン"
    },

    {
        question: "赤道は緯度何度の線？",
        choices: [
            "0度",
            "23.4度",
            "45度",
            "90度"
        ],
        answer: "0度"
    },

    {
        question: "北極点の緯度は？",
        choices: [
            "北緯90度",
            "北緯45度",
            "南緯90度",
            "0度"
        ],
        answer: "北緯90度"
    },

    {
        question: "経度0度の線を何という？",
        choices: [
            "本初子午線",
            "赤道",
            "北回帰線",
            "日付変更線"
        ],
        answer: "本初子午線"
    },

    {
        question: "日本が属する州は？",
        choices: [
            "アジア州",
            "ヨーロッパ州",
            "アフリカ州",
            "南アメリカ州"
        ],
        answer: "アジア州"
    },

    {
        question: "世界で最も面積が大きい国は？",
        choices: [
            "ロシア",
            "カナダ",
            "中国",
            "アメリカ合衆国"
        ],
        answer: "ロシア"
    },

    {
        question: "世界で最も人口が多い国は？",
        choices: [
            "インド",
            "中国",
            "アメリカ合衆国",
            "ロシア"
        ],
        answer: "インド"
    },

    {
        question: "中国の首都は？",
        choices: [
            "北京",
            "上海",
            "香港",
            "広州"
        ],
        answer: "北京"
    },

    {
        question: "韓国の首都は？",
        choices: [
            "ソウル",
            "釜山",
            "仁川",
            "大邱"
        ],
        answer: "ソウル"
    },

    {
        question: "アメリカ合衆国の首都は？",
        choices: [
            "ワシントンD.C.",
            "ニューヨーク",
            "ロサンゼルス",
            "シカゴ"
        ],
        answer: "ワシントンD.C."
    },

    {
        question: "ブラジルの首都は？",
        choices: [
            "ブラジリア",
            "リオデジャネイロ",
            "サンパウロ",
            "サルバドール"
        ],
        answer: "ブラジリア"
    },

    {
        question: "オーストラリアの首都は？",
        choices: [
            "キャンベラ",
            "シドニー",
            "メルボルン",
            "パース"
        ],
        answer: "キャンベラ"
    },

    {
        question: "エジプトを流れる世界最長級の河川は？",
        choices: [
            "ナイル川",
            "アマゾン川",
            "ミシシッピ川",
            "長江"
        ],
        answer: "ナイル川"
    },

    {
        question: "南アメリカ大陸を流れる大河は？",
        choices: [
            "アマゾン川",
            "ナイル川",
            "ライン川",
            "長江"
        ],
        answer: "アマゾン川"
    },

    {
        question: "中国を流れる大河で、世界でも有数の長さをもつ川は？",
        choices: [
            "長江",
            "ナイル川",
            "アマゾン川",
            "ドナウ川"
        ],
        answer: "長江"
    },

    {
        question: "世界最大の砂漠として知られるサハラ砂漠がある大陸は？",
        choices: [
            "アフリカ大陸",
            "アジア大陸",
            "南アメリカ大陸",
            "北アメリカ大陸"
        ],
        answer: "アフリカ大陸"
    },

    {
        question: "地中海と大西洋を結ぶ海峡は？",
        choices: [
            "ジブラルタル海峡",
            "ベーリング海峡",
            "マラッカ海峡",
            "ホルムズ海峡"
        ],
        answer: "ジブラルタル海峡"
    },

    {
        question: "ヨーロッパとアフリカの間にある海は？",
        choices: [
            "地中海",
            "カリブ海",
            "黒海",
            "アラビア海"
        ],
        answer: "地中海"
    },

    {
        question: "アジアと北アメリカの間にある海峡は？",
        choices: [
            "ベーリング海峡",
            "ジブラルタル海峡",
            "マラッカ海峡",
            "ドーバー海峡"
        ],
        answer: "ベーリング海峡"
    },

    {
        question: "インド洋と太平洋の間に位置する海峡として重要なのは？",
        choices: [
            "マラッカ海峡",
            "ジブラルタル海峡",
            "ベーリング海峡",
            "ドーバー海峡"
        ],
        answer: "マラッカ海峡"
    },

    {
        question: "一年を通して高温で、雨が多い地域に広がる森林を何という？",
        choices: [
            "熱帯雨林",
            "針葉樹林",
            "落葉広葉樹林",
            "ステップ"
        ],
        answer: "熱帯雨林"
    },

    {
        question: "雨が少なく、砂漠が広がる地域で見られる気候は？",
        choices: [
            "乾燥帯",
            "熱帯",
            "温帯",
            "寒帯"
        ],
        answer: "乾燥帯"
    },

    {
        question: "一年を通して高温で、雨季と乾季がある気候帯は？",
        choices: [
            "熱帯",
            "寒帯",
            "乾燥帯",
            "冷帯"
        ],
        answer: "熱帯"
    },

    {
        question: "四季があり、比較的温暖な地域が多い気候帯は？",
        choices: [
            "温帯",
            "熱帯",
            "寒帯",
            "乾燥帯"
        ],
        answer: "温帯"
    },

    {
        question: "一年の大部分で気温が低く、樹木が育ちにくい地域がある気候帯は？",
        choices: [
            "寒帯",
            "熱帯",
            "温帯",
            "乾燥帯"
        ],
        answer: "寒帯"
    },

    {
        question: "季節によって風向きが変化する風を何という？",
        choices: [
            "季節風",
            "偏西風",
            "貿易風",
            "海風"
        ],
        answer: "季節風"
    },

    {
        question: "東南アジアなどで、米の栽培が盛んな理由の一つは？",
        choices: [
            "高温多雨の地域が多いから",
            "一年中雪が降るから",
            "砂漠が多いから",
            "雨がほとんど降らないから"
        ],
        answer: "高温多雨の地域が多いから"
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
                            "世界の地理",

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