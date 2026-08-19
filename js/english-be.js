// ====================
// Study Link
// 英語：be動詞
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

    showQuestion();
}


// ====================
// 問題データ
// ====================

const questionTemplates = [

    {
        question: "I ___ a student.",
        choices: ["am", "is", "are", "be"],
        answer: "am"
    },

    {
        question: "You ___ my friend.",
        choices: ["am", "is", "are", "be"],
        answer: "are"
    },

    {
        question: "He ___ a teacher.",
        choices: ["am", "is", "are", "be"],
        answer: "is"
    },

    {
        question: "She ___ happy.",
        choices: ["am", "is", "are", "be"],
        answer: "is"
    },

    {
        question: "It ___ a dog.",
        choices: ["am", "is", "are", "be"],
        answer: "is"
    },

    {
        question: "We ___ students.",
        choices: ["am", "is", "are", "be"],
        answer: "are"
    },

    {
        question: "They ___ teachers.",
        choices: ["am", "is", "are", "be"],
        answer: "are"
    },

    {
        question: "Tom ___ my brother.",
        choices: ["am", "is", "are", "be"],
        answer: "is"
    },

    {
        question: "I ___ from Japan.",
        choices: ["am", "is", "are", "be"],
        answer: "am"
    },

    {
        question: "My friends ___ kind.",
        choices: ["am", "is", "are", "be"],
        answer: "are"
    },

    {
        question: "This ___ my book.",
        choices: ["am", "is", "are", "be"],
        answer: "is"
    },

    {
        question: "These ___ my pens.",
        choices: ["am", "is", "are", "be"],
        answer: "are"
    },

    {
        question: "Ken and I ___ classmates.",
        choices: ["am", "is", "are", "be"],
        answer: "are"
    },

    {
        question: "My mother ___ busy.",
        choices: ["am", "is", "are", "be"],
        answer: "is"
    },

    {
        question: "The dogs ___ cute.",
        choices: ["am", "is", "are", "be"],
        answer: "are"
    },

    {
        question: "That ___ my bicycle.",
        choices: ["am", "is", "are", "be"],
        answer: "is"
    },

    {
        question: "We ___ from Osaka.",
        choices: ["am", "is", "are", "be"],
        answer: "are"
    },

    {
        question: "You ___ very kind.",
        choices: ["am", "is", "are", "be"],
        answer: "are"
    },

    {
        question: "He ___ my best friend.",
        choices: ["am", "is", "are", "be"],
        answer: "is"
    },

    {
        question: "I ___ thirteen years old.",
        choices: ["am", "is", "are", "be"],
        answer: "am"
    }

];


// ====================
// クイズ作成
// ====================

function createQuiz(count) {

    const quiz = [];

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

        quiz.push({

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

    return quiz;
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


    const choices =
        q.choices
            .map((choice, index) => ({

                choice,

                correct:
                    index === q.answer

            }))
            .sort(
                () =>
                    Math.random() - 0.5
            );


    choices.forEach(item => {

        const button =
            document.createElement("button");

        button.className =
            "answer-btn";

        button.textContent =
            item.choice;

        button.dataset.correct =
            item.correct;

        button.addEventListener(
            "click",
            () => {

                checkAnswer(
                    item.correct,
                    button
                );

            }
        );

        answersElement.appendChild(
            button
        );

    });

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


    buttons.forEach(button => {

        button.disabled = true;

        if (
            button.dataset.correct ===
            "true"
        ) {

            button.style.background =
                "#4CAF50";

            button.style.color =
                "white";

        }

    });


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

        resultElement.textContent =
            "❌ 不正解！";

        resultElement.style.color =
            "#dc2626";

    }


    setTimeout(() => {

        currentQuestion++;

        if (
            currentQuestion >=
            quiz.length
        ) {

            finishQuiz();

        } else {

            showQuestion();

        }

    }, 800);

}


// ====================
// 終了
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
                            "英語",

                        unit:
                            "be動詞",

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

            console.error(error);

            xpResultElement.textContent =
                "⚠️ XPの保存に失敗しました。";

        }

    }

}