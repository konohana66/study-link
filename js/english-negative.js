// ====================
// Study Link
// 英語：否定文
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
// 否定文 問題データ
// ====================

const questionTemplates = [

    {
        question: "I ___ a student.",
        choices: ["am not", "is not", "are not", "do not"],
        answer: "am not"
    },

    {
        question: "He ___ a teacher.",
        choices: ["am not", "is not", "are not", "do not"],
        answer: "is not"
    },

    {
        question: "She ___ happy.",
        choices: ["am not", "is not", "are not", "does not"],
        answer: "is not"
    },

    {
        question: "We ___ students.",
        choices: ["am not", "is not", "are not", "does not"],
        answer: "are not"
    },

    {
        question: "They ___ from Japan.",
        choices: ["am not", "is not", "are not", "do not"],
        answer: "are not"
    },

    {
        question: "I ___ play soccer.",
        choices: ["am not", "is not", "do not", "does not"],
        answer: "do not"
    },

    {
        question: "You ___ like baseball.",
        choices: ["do not", "does not", "is not", "are not"],
        answer: "do not"
    },

    {
        question: "He ___ play tennis.",
        choices: ["do not", "does not", "is not", "are not"],
        answer: "does not"
    },

    {
        question: "She ___ like music.",
        choices: ["do not", "does not", "is not", "are not"],
        answer: "does not"
    },

    {
        question: "Tom ___ study English.",
        choices: ["do not", "does not", "is not", "are not"],
        answer: "does not"
    },

    {
        question: "I ___ have a bike.",
        choices: ["do not", "does not", "am not", "is not"],
        answer: "do not"
    },

    {
        question: "Ken ___ have a dog.",
        choices: ["do not", "does not", "are not", "am not"],
        answer: "does not"
    },

    {
        question: "They ___ play basketball.",
        choices: ["do not", "does not", "is not", "am not"],
        answer: "do not"
    },

    {
        question: "My sister ___ like soccer.",
        choices: ["do not", "does not", "are not", "am not"],
        answer: "does not"
    },

    {
        question: "We ___ watch TV.",
        choices: ["do not", "does not", "is not", "am not"],
        answer: "do not"
    },

    {
        question: "He ___ eat breakfast.",
        choices: ["do not", "does not", "are not", "am not"],
        answer: "does not"
    },

    {
        question: "She ___ go to school on Sunday.",
        choices: ["do not", "does not", "is not", "are not"],
        answer: "does not"
    },

    {
        question: "I ___ like coffee.",
        choices: ["do not", "does not", "am not", "is not"],
        answer: "do not"
    },

    {
        question: "Mike ___ play the piano.",
        choices: ["do not", "does not", "are not", "am not"],
        answer: "does not"
    },

    {
        question: "They ___ study Japanese.",
        choices: ["do not", "does not", "is not", "am not"],
        answer: "do not"
    },

    {
        question: "He ___ happy.",
        choices: ["am not", "is not", "are not", "do not"],
        answer: "is not"
    },

    {
        question: "She ___ busy.",
        choices: ["am not", "is not", "are not", "do not"],
        answer: "is not"
    },

    {
        question: "We ___ tired.",
        choices: ["am not", "is not", "are not", "does not"],
        answer: "are not"
    },

    {
        question: "You ___ a teacher.",
        choices: ["am not", "is not", "are not", "does not"],
        answer: "are not"
    },

    {
        question: "My father ___ a doctor.",
        choices: ["am not", "is not", "are not", "do not"],
        answer: "is not"
    },

    {
        question: "I ___ watch TV every day.",
        choices: ["do not", "does not", "am not", "is not"],
        answer: "do not"
    },

    {
        question: "She ___ play tennis.",
        choices: ["do not", "does not", "am not", "are not"],
        answer: "does not"
    },

    {
        question: "He ___ like dogs.",
        choices: ["do not", "does not", "am not", "are not"],
        answer: "does not"
    },

    {
        question: "We ___ eat meat.",
        choices: ["do not", "does not", "am not", "is not"],
        answer: "do not"
    },

    {
        question: "Tom ___ speak Japanese.",
        choices: ["do not", "does not", "am not", "are not"],
        answer: "does not"
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
                            "英語",

                        unit:
                            "否定文",

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