// ====================
// Study Link
// 国語：漢字
// ====================

const GAS_URL =
    "https://script.google.com/macros/s/AKfycbxdL1vYB2Iv6hpQOTDnvmBaIAChjsxXUvEIQdm9U-TM2hqBPeSGsrkVdJwLVNqN4Mcp/exec";


// ====================
// 状態
// ====================

let currentQuestion = 0;
let score = 0;
let earnedXP = 0;
let questionCount = 0;
let quiz = [];
let studyStartTime = null;


// ====================
// HTML要素
// ====================

const countArea =
    document.getElementById("countArea");

const quizArea =
    document.getElementById("quizArea");

const finishArea =
    document.getElementById("finish");

const progress =
    document.getElementById("progress");

const questionElement =
    document.getElementById("question");

const answersElement =
    document.getElementById("answers");

const resultElement =
    document.getElementById("result");

const scoreElement =
    document.getElementById("score");

const xpResultElement =
    document.getElementById("xpResult");


// ====================
// 漢字問題
// 中1レベル
// ====================

const questionTemplates = [

    {
        question: "「努力」の「努」の読み方は？",
        choices: ["ど", "ろ", "の", "つと"],
        answer: "ど"
    },

    {
        question: "「努力」の読み方は？",
        choices: ["どりょく", "どうりょく", "どりき", "のりょく"],
        answer: "どりょく"
    },

    {
        question: "「複雑」の読み方は？",
        choices: ["ふくざつ", "ふくさつ", "ふうざつ", "ふくせつ"],
        answer: "ふくざつ"
    },

    {
        question: "「責任」の読み方は？",
        choices: ["せきにん", "せきじん", "せいにん", "せつにん"],
        answer: "せきにん"
    },

    {
        question: "「原因」の読み方は？",
        choices: ["げんいん", "げんえん", "けんいん", "げんねん"],
        answer: "げんいん"
    },

    {
        question: "「確認」の読み方は？",
        choices: ["かくにん", "かっにん", "かくじん", "かくねん"],
        answer: "かくにん"
    },

    {
        question: "「必要」の読み方は？",
        choices: ["ひつよう", "ひっよう", "ひつよ", "ひちよう"],
        answer: "ひつよう"
    },

    {
        question: "「自然」の読み方は？",
        choices: ["しぜん", "じねん", "しせん", "じぜん"],
        answer: "しぜん"
    },

    {
        question: "「文化」の読み方は？",
        choices: ["ぶんか", "ふんか", "ぶんが", "もんか"],
        answer: "ぶんか"
    },

    {
        question: "「環境」の読み方は？",
        choices: ["かんきょう", "かんけい", "かんぎょう", "げんきょう"],
        answer: "かんきょう"
    },

    {
        question: "「成長」の読み方は？",
        choices: ["せいちょう", "せいじょう", "しょうちょう", "せちょう"],
        answer: "せいちょう"
    },

    {
        question: "「判断」の読み方は？",
        choices: ["はんだん", "ばんだん", "はんたん", "はんなん"],
        answer: "はんだん"
    },

    {
        question: "「解決」の読み方は？",
        choices: ["かいけつ", "かいげつ", "がいけつ", "かいけち"],
        answer: "かいけつ"
    },

    {
        question: "「経験」の読み方は？",
        choices: ["けいけん", "けんけい", "けいげん", "けいけい"],
        answer: "けいけん"
    },

    {
        question: "「必要」の「要」の読み方は？",
        choices: ["よう", "よ", "かなめ", "え"],
        answer: "よう"
    },

    {
        question: "「情報」の読み方は？",
        choices: ["じょうほう", "じょほう", "じょうぼう", "じょうぽう"],
        answer: "じょうほう"
    },

    {
        question: "「準備」の読み方は？",
        choices: ["じゅんび", "じゅんぴ", "しゅんび", "じんび"],
        answer: "じゅんび"
    },

    {
        question: "「印象」の読み方は？",
        choices: ["いんしょう", "いんじょう", "いんそ", "いんせい"],
        answer: "いんしょう"
    },

    {
        question: "「説明」の読み方は？",
        choices: ["せつめい", "せっめい", "せつまい", "せちめい"],
        answer: "せつめい"
    },

    {
        question: "「伝統」の読み方は？",
        choices: ["でんとう", "でんどう", "てんとう", "でんと"],
        answer: "でんとう"
    },

    {
        question: "「適切」の読み方は？",
        choices: ["てきせつ", "てきぜつ", "できせつ", "てっせつ"],
        answer: "てきせつ"
    },

    {
        question: "「特徴」の読み方は？",
        choices: ["とくちょう", "とくじょう", "どくちょう", "とっちょう"],
        answer: "とくちょう"
    },

    {
        question: "「観察」の読み方は？",
        choices: ["かんさつ", "かんざつ", "がんさつ", "かんせつ"],
        answer: "かんさつ"
    },

    {
        question: "「規則」の読み方は？",
        choices: ["きそく", "きぞく", "ぎそく", "きさく"],
        answer: "きそく"
    },

    {
        question: "「知識」の読み方は？",
        choices: ["ちしき", "ちじき", "ししき", "ちせき"],
        answer: "ちしき"
    },

    {
        question: "「課題」の読み方は？",
        choices: ["かだい", "がだい", "かたい", "かでい"],
        answer: "かだい"
    },

    {
        question: "「発表」の読み方は？",
        choices: ["はっぴょう", "はつひょう", "はっひょう", "はぴょう"],
        answer: "はっぴょう"
    },

    {
        question: "「参加」の読み方は？",
        choices: ["さんか", "さんが", "ざんか", "さんけ"],
        answer: "さんか"
    },

    {
        question: "「創造」の読み方は？",
        choices: ["そうぞう", "そうそう", "しょうぞう", "そうどう"],
        answer: "そうぞう"
    },

    {
        question: "「成績」の読み方は？",
        choices: ["せいせき", "せいぜき", "しょうせき", "せせき"],
        answer: "せいせき"
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


            // 正解を緑にする

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


    // ====================
    // 正解
    // ====================

    if (correct) {

        score++;

        earnedXP += 5;

        resultElement.textContent =
            "⭕ 正解！ +5 XP";

        resultElement.style.color =
            "#16a34a";

    }


    // ====================
    // 不正解
    // ====================

    else {

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


    // ====================
    // 次の問題
    // ====================

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


    // ====================
    // 学習時間
    // ====================

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


    // ====================
    // ユーザーID
    // ====================

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
                            "国語",

                        unit:
                            "漢字",

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