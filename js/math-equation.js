// ====================
// Study Link
// 方程式
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
let weaknessMode = false;

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

    weaknessMode =
        new URLSearchParams(location.search)
            .get("mode") === "weakness";

    const urlCount =
        new URLSearchParams(location.search)
            .get("count");

    questionCount =
        weaknessMode && urlCount
            ? Number(urlCount)
            : count;

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
// 方程式問題作成
// ====================

function createQuiz(count) {

    // ====================
    // 弱点モード
    // ====================

    if (weaknessMode) {

        const weaknesses =
            JSON.parse(
                localStorage.getItem(
                    "studyLinkWeaknesses"
                ) || "{}"
            );

        const unitData =
            weaknesses?.["数学"]?.["方程式"];

        const weakQuestions =
            unitData?.questions
                ? Object.values(
                    unitData.questions
                ).filter(
                    q => q.level > 0
                )
                : [];

        // 弱点問題がない場合
        if (weakQuestions.length === 0) {
            return createNormalQuiz(count);
        }

        // 弱点レベルが高い順
        weakQuestions.sort(
            (a, b) =>
                b.level - a.level
        );

        const selected = [];

        while (selected.length < count) {

            selected.push(
                weakQuestions[
                    selected.length %
                    weakQuestions.length
                ]
            );

        }

        return selected.map(q => ({

            id:
                q.id,

            subject:
                "数学",

            unit:
                "方程式",

            question:
                q.question,

            choices:
                q.choices,

            answer:
                q.answer,

            correctAnswer:
                q.choices[q.answer],

            explanation:
                `この方程式を解くと、x = ${q.choices[q.answer]} になります。`

        }));

    }


    // ====================
    // 通常モード
    // ====================

    return createNormalQuiz(count);

}


// ====================
// 通常問題を作成
// ====================

function createNormalQuiz(count) {

    const quiz = [];

    const used = new Set();


    while (quiz.length < count) {

        const type =
            randomInt(1, 4);

        let question;
        let answer;


        // ====================
        // ① x + a = b
        // ====================

        if (type === 1) {

            const x =
                randomInt(-10, 10);

            const a =
                randomInt(-10, 10);

            const b =
                x + a;

            question =
                `x ${a >= 0 ? "+" : "-"} ${Math.abs(a)} = ${b} のとき、x = ?`;

            answer =
                x;

        }


        // ====================
        // ② ax = b
        // ====================

        else if (type === 2) {

            const x =
                randomInt(-10, 10);

            const a =
                randomInt(2, 9);

            const b =
                a * x;

            question =
                `${a}x = ${b} のとき、x = ?`;

            answer =
                x;

        }


        // ====================
        // ③ ax + b = c
        // ====================

        else if (type === 3) {

            const x =
                randomInt(-10, 10);

            const a =
                randomInt(2, 6);

            const b =
                randomInt(-10, 10);

            const c =
                a * x + b;

            question =
                `${a}x ${b >= 0 ? "+" : "-"} ${Math.abs(b)} = ${c} のとき、x = ?`;

            answer =
                x;

        }


        // ====================
        // ④ a(x+b)=c
        // ====================

        else {

            const x =
                randomInt(-8, 8);

            const a =
                randomInt(2, 6);

            const b =
                randomInt(-5, 5);

            const c =
                a * (x + b);

            question =
                `${a}(x ${b >= 0 ? "+" : "-"} ${Math.abs(b)}) = ${c} のとき、x = ?`;

            answer =
                x;

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
        // 4択
        // ====================

        const choices = [
            String(answer)
        ];


        while (choices.length < 4) {

            const wrong =
                answer +
                randomInt(-5, 5);

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


        quiz.push({

            id:
                `math-equation-${quiz.length + 1}`,

            subject:
                "数学",

            unit:
                "方程式",

            question:
                question,

            choices:
                choices,

            answer:
                choices.indexOf(
                    String(answer)
                ),

            correctAnswer:
                String(answer),

            explanation:
                `この方程式を解くと、x = ${answer} になります。`

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
// 弱点データを更新
// ====================

function updateWeakness(correct) {

    const q =
        quiz[currentQuestion];

    if (!q || !q.subject || !q.unit) {
        return;
    }

    let weaknesses =
        JSON.parse(
            localStorage.getItem(
                "studyLinkWeaknesses"
            ) || "{}"
        );

    if (!weaknesses[q.subject]) {
        weaknesses[q.subject] = {};
    }

    if (!weaknesses[q.subject][q.unit]) {

        weaknesses[q.subject][q.unit] = {

            wrong: 0,

            correct: 0,

            level: 0,

            questions: {}

        };

    }

    const data =
        weaknesses[q.subject][q.unit];


    if (!data.questions) {
        data.questions = {};
    }


    if (!data.questions[q.id]) {

        data.questions[q.id] = {

            wrong: 0,

            correct: 0,

            level: 0,

            question:
                q.question,

            choices:
                q.choices,

            answer:
                q.answer

        };

    }


    const questionData =
        data.questions[q.id];


    if (correct) {

        data.correct++;

        data.level =
            Math.max(
                0,
                data.level - 1
            );

        questionData.correct++;

        questionData.level =
            Math.max(
                0,
                questionData.level - 1
            );

    } else {

        data.wrong++;

        data.level++;

        questionData.wrong++;

        questionData.level++;

    }


    localStorage.setItem(
        "studyLinkWeaknesses",
        JSON.stringify(weaknesses)
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

        updateWeakness(true);

        score++;

        earnedXP += 5;


        resultElement.textContent =
            "✅ 正解！ +5 XP";

        resultElement.style.color =
            "#16a34a";


        saveQuestionResult(
            true,
            clickedButton.textContent
        );


    } else {

        updateWeakness(false);


        clickedButton.style.background =
            "#f44336";

        clickedButton.style.color =
            "white";


        resultElement.textContent =
            "❌ 不正解！";

        resultElement.style.color =
            "#dc2626";


        saveQuestionResult(
            false,
            clickedButton.textContent
        );

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
// 回答履歴保存
// ====================

function saveQuestionResult(
    correct,
    answer
) {

    const q =
        quiz[currentQuestion];


    if (!q) {
        return;
    }


    fetch(
        GAS_URL,
        {

            method:
                "POST",

            body:
                JSON.stringify({

                    type:
                        "saveQuestionResult",

                    userId:
                        localStorage.getItem(
                            "userId"
                        ) || "",

                    questionId:
                        q.id,

                    subject:
                        q.subject,

                    unit:
                        q.unit,

                    correct:
                        correct,

                    answer:
                        answer,

                    source:
                        weaknessMode
                            ? "weakness"
                            : "normal"

                })

        }
    ).catch(error => {

        console.error(
            "問題回答履歴保存エラー:",
            error
        );

    });

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
    // 弱点モード終了
    // ====================

    if (weaknessMode) {

        const buttons =
            finishArea.querySelectorAll(
                "a, button"
            );


        buttons.forEach(button => {

            if (
                button.textContent.includes(
                    "数学へ戻る"
                )
            ) {

                button.style.display =
                    "none";

            }

        });


        const backButton =
            document.createElement(
                "button"
            );


        backButton.textContent =
            "弱点トレーニングホームへ";


        backButton.style.marginTop =
            "20px";


        backButton.style.padding =
            "12px 20px";


        backButton.style.border =
            "none";


        backButton.style.borderRadius =
            "10px";


        backButton.style.background =
            "#2563eb";


        backButton.style.color =
            "white";


        backButton.style.fontSize =
            "16px";


        backButton.style.cursor =
            "pointer";


        backButton.onclick = () => {

            location.href =
                "weakness.html";

        };


        finishArea.appendChild(
            backButton
        );

    }


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

    if (studyMinutes > 0) {

        try {

            await fetch(
                GAS_URL,
                {

                    method:
                        "POST",

                    body:
                        JSON.stringify({

                            type:
                                "saveStudyTime",

                            userId:
                                userId,

                            subject:
                                "数学",

                            unit:
                                "方程式",

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

    if (earnedXP > 0) {

        try {

            const response =
                await fetch(
                    GAS_URL,
                    {

                        method:
                            "POST",

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


// ====================
// 弱点モード自動開始
// ====================

const urlParams =
    new URLSearchParams(
        location.search
    );


const isWeaknessMode =
    urlParams.get("mode") ===
    "weakness";


if (isWeaknessMode) {

    const count =
        Number(
            urlParams.get("count")
        ) || 10;


    startQuiz(count);

}