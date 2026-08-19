// ====================
// Study Link
// 英語：疑問文
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
// 疑問文 問題データ
// ====================

const questionTemplates = [

    {
        question: "___ you a student?",
        choices: ["Are", "Is", "Am", "Do"],
        answer: "Are"
    },

    {
        question: "___ he your brother?",
        choices: ["Are", "Is", "Am", "Do"],
        answer: "Is"
    },

    {
        question: "___ she happy?",
        choices: ["Are", "Is", "Am", "Does"],
        answer: "Is"
    },

    {
        question: "___ you like soccer?",
        choices: ["Are", "Is", "Do", "Does"],
        answer: "Do"
    },

    {
        question: "___ he play tennis?",
        choices: ["Do", "Does", "Is", "Are"],
        answer: "Does"
    },

    {
        question: "___ they students?",
        choices: ["Is", "Are", "Do", "Does"],
        answer: "Are"
    },

    {
        question: "___ she like music?",
        choices: ["Do", "Does", "Is", "Are"],
        answer: "Does"
    },

    {
        question: "___ you from Japan?",
        choices: ["Are", "Is", "Do", "Does"],
        answer: "Are"
    },

    {
        question: "___ Tom play baseball?",
        choices: ["Do", "Does", "Is", "Are"],
        answer: "Does"
    },

    {
        question: "___ your mother a teacher?",
        choices: ["Are", "Is", "Do", "Does"],
        answer: "Is"
    },

    {
        question: "___ you study English?",
        choices: ["Are", "Is", "Do", "Does"],
        answer: "Do"
    },

    {
        question: "___ Ken have a bike?",
        choices: ["Do", "Does", "Is", "Are"],
        answer: "Does"
    },

    {
        question: "___ they play basketball?",
        choices: ["Do", "Does", "Are", "Is"],
        answer: "Do"
    },

    {
        question: "___ she a teacher?",
        choices: ["Are", "Is", "Do", "Does"],
        answer: "Is"
    },

    {
        question: "___ your father like coffee?",
        choices: ["Do", "Does", "Is", "Are"],
        answer: "Does"
    },

    {
        question: "___ you tired?",
        choices: ["Are", "Is", "Do", "Does"],
        answer: "Are"
    },

    {
        question: "___ he from Osaka?",
        choices: ["Are", "Is", "Do", "Does"],
        answer: "Is"
    },

    {
        question: "___ she speak English?",
        choices: ["Do", "Does", "Is", "Are"],
        answer: "Does"
    },

    {
        question: "___ they like dogs?",
        choices: ["Do", "Does", "Are", "Is"],
        answer: "Do"
    },

    {
        question: "___ Mike a student?",
        choices: ["Are", "Is", "Do", "Does"],
        answer: "Is"
    },

    {
        question: "Where ___ you live?",
        choices: ["do", "does", "are", "is"],
        answer: "do"
    },

    {
        question: "Where ___ he live?",
        choices: ["do", "does", "is", "are"],
        answer: "does"
    },

    {
        question: "What ___ you like?",
        choices: ["do", "does", "are", "is"],
        answer: "do"
    },

    {
        question: "What ___ she like?",
        choices: ["do", "does", "is", "are"],
        answer: "does"
    },

    {
        question: "Who ___ he?",
        choices: ["are", "is", "do", "does"],
        answer: "is"
    },

    {
        question: "When ___ you play soccer?",
        choices: ["do", "does", "are", "is"],
        answer: "do"
    },

    {
        question: "When ___ Tom study?",
        choices: ["do", "does", "is", "are"],
        answer: "does"
    },

    {
        question: "Why ___ you like English?",
        choices: ["do", "does", "are", "is"],
        answer: "do"
    },

    {
        question: "Why ___ she study English?",
        choices: ["do", "does", "is", "are"],
        answer: "does"
    },

    {
        question: "What ___ this?",
        choices: ["are", "is", "do", "does"],
        answer: "is"
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


    // 今の問題の正解番号
    const correctIndex =
        quiz[currentQuestion].answer;


    // 全ボタンを押せなくする
    buttons.forEach(
        (button, index) => {

            button.disabled = true;


            // ====================
            // 正解のボタン
            // ====================

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
                    "0 0 15px rgba(76, 175, 80, 0.6)";

            }

        }
    );


    // ====================
    // 正解
    // ====================

    if (correct) {

        score++;

        earnedXP += 5;


        clickedButton.style.background =
            "#4CAF50";

        clickedButton.style.color =
            "white";


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
                            "英語",

                        unit:
                            "疑問文",

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