// ==========================
// Study Link
// 今日のチャレンジ
// ==========================

if (!localStorage.getItem("username")) {
    location.href = "login.html";
}


// ==========================
// 設定
// ==========================

const GAS_URL =
    "https://script.google.com/macros/s/AKfycbxdL1vYB2Iv6hpQOTDnvmBaIAChjsxXUvEIQdm9U-TM2hqBPeSGsrkVdJwLVNqN4Mcp/exec";

const questionCount =
    Number(
        localStorage.getItem("dailyChallengeCount")
    ) || 5;


// ==========================
// 状態
// ==========================

let currentQuestion = 0;
let score = 0;
let earnedXP = 0;
let quiz = [];


// ==========================
// HTML
// ==========================

const progress =
    document.getElementById("progress");

const questionElement =
    document.getElementById("question");

const answersElement =
    document.getElementById("answers");

const resultElement =
    document.getElementById("result");

const quizArea =
    document.getElementById("quizArea");

const finishArea =
    document.getElementById("finish");

const scoreElement =
    document.getElementById("score");

const xpResultElement =
    document.getElementById("xpResult");


// ==========================
// 問題データ読み込み
// ==========================

async function loadQuestions() {

    try {

        const response =
            await fetch("data/daily-quiz.json");

        if (!response.ok) {
            throw new Error(
                "問題データを読み込めませんでした"
            );
        }

        return await response.json();

    } catch (error) {

        console.error(error);

        questionElement.textContent =
            "問題を読み込めませんでした。";

        return [];

    }

}


// ==========================
// クイズ作成
// ==========================

function createQuiz(
    questions,
    count
) {

    const shuffled =
        [...questions].sort(
            () => Math.random() - 0.5
        );

    return shuffled.slice(
        0,
        Math.min(
            count,
            shuffled.length
        )
    );

}


// ==========================
// クイズ開始
// ==========================

async function startQuiz() {

    const questions =
        await loadQuestions();

    if (questions.length === 0) {
        return;
    }

    quiz =
        createQuiz(
            questions,
            questionCount
        );

    currentQuestion = 0;
    score = 0;
    earnedXP = 0;

    quizArea.style.display =
        "block";

    finishArea.style.display =
        "none";

    showQuestion();

}


// ==========================
// 問題表示
// ==========================

function showQuestion() {

    const q =
        quiz[currentQuestion];

    if (!q) {
        finishQuiz();
        return;
    }


    progress.textContent =
        `第${currentQuestion + 1}問 / ${quiz.length}問`;


    questionElement.textContent =
        q.question;


    resultElement.textContent =
        "";


    answersElement.innerHTML =
        "";


    // 選択肢をシャッフル
    const choices =
        q.choices.map(
            (choice, index) => ({
                choice: choice,
                correct:
                    index === q.answer
            })
        );


    choices.sort(
        () => Math.random() - 0.5
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


// ==========================
// 正解判定
// ==========================

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
    });


    // 正解を表示
    buttons.forEach(button => {

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
            "正解！ +5 XP";

        resultElement.style.color =
            "#16a34a";

    } else {

        clickedButton.style.background =
            "#f44336";

        clickedButton.style.color =
            "white";

        resultElement.textContent =
            "不正解";

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


// ==========================
// 終了
// ==========================

async function finishQuiz() {

    quizArea.style.display =
        "none";

    finishArea.style.display =
        "block";


    scoreElement.textContent =
        `${score} / ${quiz.length}問 正解`;


    xpResultElement.textContent =
        `+${earnedXP} XP`;


    const userId =
        localStorage.getItem("userId");


    if (!userId) {
        return;
    }


    try {

        await fetch(
            GAS_URL,
            {
                method: "POST",

                body: JSON.stringify({

                    type: "updateXP",

                    userId:
                        userId,

                    xp:
                        earnedXP

                })

            }
        );

    } catch (error) {

        console.error(
            "XP保存エラー",
            error
        );

    }

}


// ==========================
// 開始
// ==========================

startQuiz();