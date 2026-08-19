// ====================
// Study Link
// 文字の式
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
// 学習時間
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

    quiz =
        createQuiz(questionCount);

    studyStartTime =
        Date.now();

    countArea.style.display =
        "none";

    quizArea.style.display =
        "block";

    showQuestion();
}


// ====================
// ランダム整数
// ====================

function randomInt(min, max) {

    return Math.floor(
        Math.random() * (max - min + 1)
    ) + min;

}


// ====================
// 文字の式問題生成
// ====================

function createQuiz(count) {

    const quiz = [];

    const used =
        new Set();


    while (quiz.length < count) {

        const type =
            randomInt(1, 5);


        let question;
        let answer;


        // ====================
        // ① 係数
        // ====================

        if (type === 1) {

            const a =
                randomInt(2, 9);

            const sign =
                Math.random() < 0.5
                    ? ""
                    : "-";

            question =
                `「${sign}${a}x」の係数は？`;

            answer =
                sign === ""
                    ? a
                    : -a;

        }


        // ====================
        // ② 式の値
        // ====================

        else if (type === 2) {

            const a =
                randomInt(2, 9);

            const x =
                randomInt(-5, 5);

            question =
                `x = ${x} のとき、${a}x の値は？`;

            answer =
                a * x;

        }


        // ====================
        // ③ 同類項
        // ====================

        else if (type === 3) {

            const a =
                randomInt(2, 9);

            const b =
                randomInt(1, 9);

            const c =
                randomInt(1, 9);

            question =
                `${a}x + ${b}x - ${c}x を簡単にすると？`;

            answer =
                a + b - c;

        }


        // ====================
        // ④ 分配法則
        // ====================

        else if (type === 4) {

            const a =
                randomInt(2, 6);

            const b =
                randomInt(1, 9);

            question =
                `${a}(x + ${b}) の x の係数は？`;

            answer =
                a;

        }


        // ====================
        // ⑤ 文字を使った式
        // ====================

        else {

            const a =
                randomInt(2, 9);

            const b =
                randomInt(2, 9);

            question =
                `x 円のノートを ${a} 冊買い、${b} 円のペンを1本買ったときの代金を表す式は？`;

            answer =
                `${a}x + ${b}`;

        }


        // ====================
        // 重複防止
        // ====================

        const key =
            `${question}|${answer}`;


        if (used.has(key)) {

            continue;

        }


        used.add(key);


        // ====================
        // 選択肢
        // ====================

        const choices =
            createChoices(
                answer,
                type
            );


        quiz.push({

            question:
                question,

            choices:
                choices.map(String),

            answer:
                choices.indexOf(
                    String(answer)
                )

        });

    }


    return quiz;
}


// ====================
// 選択肢作成
// ====================

function createChoices(
    answer,
    type
) {

    const choices = [
        String(answer)
    ];


    while (
        choices.length < 4
    ) {

        let wrong;


        // 数字問題
        if (
            typeof answer === "number"
        ) {

            wrong =
                answer +
                randomInt(-5, 5);

        }


        // 式問題
        else {

            const a =
                randomInt(1, 9);

            const b =
                randomInt(1, 9);

            wrong =
                `${a}x + ${b}`;

        }


        if (
            !choices.includes(
                String(wrong)
            )
        ) {

            choices.push(
                String(wrong)
            );

        }

    }


    choices.sort(
        () =>
            Math.random() - 0.5
    );


    return choices;
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
            document.createElement(
                "button"
            );


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

        button.disabled =
            true;


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

    }

    else {

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

        }

        else {

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
    // 学習時間計算
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
        localStorage.getItem(
            "userId"
        );


    if (!userId) {

        return;

    }


    // ====================
    // 学習時間保存
    // ====================

    if (
        studyMinutes > 0
    ) {

        try {

            await fetch(
                GAS_URL,
                {

                    method: "POST",

                    body:
                        JSON.stringify({

                            type:
                                "saveStudyTime",

                            userId:
                                userId,

                            subject:
                                "数学",

                            unit:
                                "文字の式",

                            minutes:
                                studyMinutes

                        })

                }
            );

        }

        catch (error) {

            console.error(
                "学習時間の保存に失敗しました。",
                error
            );

        }

    }


    // ====================
    // XP保存
    // ====================

    if (
        earnedXP > 0
    ) {

        try {

            const response =
                await fetch(
                    GAS_URL,
                    {

                        method: "POST",

                        body:
                            JSON.stringify({

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

        }

        catch (error) {

            console.error(
                error
            );


            xpResultElement.textContent =
                "⚠️ XPの保存に失敗しました。";

        }

    }

}