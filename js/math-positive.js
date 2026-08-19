// ====================
// Study Link
// 正負の数
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

// ====================
// 学習時間計測
// ====================

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

    // 学習開始時間
studyStartTime = Date.now();

    countArea.style.display = "none";

    quizArea.style.display = "block";

    showQuestion();
}


// ====================
// 問題自動生成
// ====================

function createQuiz(count) {

    const quiz = [];

    const used = new Set();


    while (quiz.length < count) {

        // -30 ～ 30
        const a =
            Math.floor(
                Math.random() * 61
            ) - 30;


        const b =
            Math.floor(
                Math.random() * 61
            ) - 30;


        // ＋ / −
        const isPlus =
            Math.random() < 0.5;


        const key =
            `${a}${isPlus ? "+" : "-"}${b}`;


        // 同じ問題を避ける
        if (used.has(key)) {

            continue;

        }


        used.add(key);


        // 正解
        const answer =
            isPlus
                ? a + b
                : a - b;


        // ====================
        // 間違い候補
        // ====================

        const wrongAnswers = [

            -answer,

            a + b,

            -(a - b),

            answer + 1,

            answer - 1,

            answer + 2,

            answer - 2,

            answer + 3,

            answer - 3

        ];


        const choices = [answer];


        // ====================
        // 4択作成
        // ====================

        while (
            choices.length < 4
        ) {

            const wrong =
                wrongAnswers[
                    Math.floor(
                        Math.random() *
                        wrongAnswers.length
                    )
                ];


            if (
                !choices.includes(wrong)
            ) {

                choices.push(wrong);

            }

        }


        // 選択肢シャッフル
        choices.sort(
            () =>
                Math.random() - 0.5
        );


        quiz.push({

            question:
                `${a} ${isPlus ? "+" : "-"} (${b})`,

            choices:
                choices.map(String),

            answer:
                choices.indexOf(answer)

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


    // 選択肢をシャッフル
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


    // 全ボタンを無効化
    buttons.forEach(button => {

        button.disabled = true;


        // 正解を緑
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


    // 少し待って次の問題
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

    // ====================
    // 学習時間を計算
    // ====================

    let studyMinutes = 0;

    if (studyStartTime) {

        const elapsed =
            Date.now() - studyStartTime;

        studyMinutes =
            Math.max(
                1,
                Math.round(elapsed / 60000)
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
    // ユーザーID確認
    // ====================

    const userId =
        localStorage.getItem("userId");


    if (!userId) {
    return;
}

    if (userId && studyMinutes > 0) {

    try {

        await fetch(
            GAS_URL,
            {
                method: "POST",

                body: JSON.stringify({

                    type: "saveStudyTime",

                    userId: userId,

                    subject: "数学",

                    unit: "正負の数",

                    minutes: studyMinutes

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