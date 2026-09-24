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

let weaknessMode = false;


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

    const urlParams =
        new URLSearchParams(
            location.search
        );

    weaknessMode =
        urlParams.get("mode") ===
        "weakness";


    questionCount =
        count;

    currentQuestion = 0;
    score = 0;
    earnedXP = 0;

    quiz =
        createQuiz(
            questionCount
        );

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
        Math.random() *
            (max - min + 1)
    ) + min;

}


// ====================
// 文字の式問題生成
// ====================

function createQuiz(count) {

    // ====================
    // 弱点トレーニング
    // ====================

    if (weaknessMode) {

        const weaknesses =
            JSON.parse(
                localStorage.getItem(
                    "studyLinkWeaknesses"
                ) || "{}"
            );


        const data =
            weaknesses?.["数学"]?.["文字の式"];


        if (
            !data ||
            !data.questions
        ) {

            return [];

        }


        const weakQuestions =
            Object.entries(
                data.questions
            )
                .filter(
                    ([id, q]) =>
                        q.level > 0
                )
                .sort(
                    ([idA, a], [idB, b]) =>
                        b.level - a.level
                );


        if (
            weakQuestions.length === 0
        ) {

            return [];

        }


        const result = [];


        for (
            let i = 0;
            i < count;
            i++
        ) {

            const [
                id,
                q
            ] =
                weakQuestions[
                    i %
                    weakQuestions.length
                ];


            result.push({

                id: id,

                subject:
                    "数学",

                unit:
                    "文字の式",

                question:
                    q.question,

                choices:
                    q.choices.map(
                        String
                    ),

                answer:
                    q.answer

            });

        }


        return result;

    }


    // ====================
    // 通常モード
    // ====================

    return createNormalQuiz(
        count
    );
}


// ====================
// 通常問題生成
// ====================

function createNormalQuiz(count) {

    const quiz = [];

    const used =
        new Set();


    while (
        quiz.length < count
    ) {

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


        if (
            used.has(key)
        ) {

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

            id:
                `math-expression-${quiz.length + 1}`,

            subject:
                "数学",

            unit:
                "文字の式",

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
            typeof answer ===
            "number"
        ) {

            wrong =
                answer +
                randomInt(
                    -5,
                    5
                );

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
// 弱点データ更新
// ====================

function updateWeakness(correct) {

    if (!weaknessMode) {
        return;
    }


    const q =
        quiz[currentQuestion];


    if (!q) {
        return;
    }


    const weaknesses =
        JSON.parse(
            localStorage.getItem(
                "studyLinkWeaknesses"
            ) || "{}"
        );


    if (!weaknesses["数学"]) {

        weaknesses["数学"] = {};

    }


    if (
        !weaknesses["数学"]["文字の式"]
    ) {

        weaknesses["数学"]["文字の式"] = {

            wrong: 0,

            correct: 0,

            level: 0,

            questions: {}

        };

    }


    const data =
        weaknesses["数学"]["文字の式"];


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

        questionData.correct++;

        questionData.level =
            Math.max(
                0,
                questionData.level - 1
            );

    }

    else {

        data.wrong++;

        questionData.wrong++;

        questionData.level =
            Math.min(
                5,
                questionData.level + 1
            );

    }


    const total =
        data.correct +
        data.wrong;


    if (total > 0) {

        const accuracy =
            data.correct /
            total;


        if (
            accuracy >= 0.9
        ) {

            data.level = 0;

        }

        else if (
            accuracy >= 0.75
        ) {

            data.level = 1;

        }

        else if (
            accuracy >= 0.6
        ) {

            data.level = 2;

        }

        else if (
            accuracy >= 0.4
        ) {

            data.level = 3;

        }

        else {

            data.level = 4;

        }

    }


    localStorage.setItem(
        "studyLinkWeaknesses",
        JSON.stringify(
            weaknesses
        )
    );

}


// ====================
// 問題結果保存
// ====================

function saveQuestionResult(
    q,
    correct
) {

    const userId =
        localStorage.getItem(
            "userId"
        );


    if (!userId) {
        return;
    }


    try {

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
                            userId,

                        subject:
                            "数学",

                        unit:
                            "文字の式",

                        question:
                            q.question,

                        correct:
                            correct,

                        source:
                            weaknessMode
                                ? "weakness"
                                : "normal"

                    })

            }
        );

    }

    catch (error) {

        console.error(
            "問題結果の保存に失敗しました。",
            error
        );

    }

}


// ====================
// 問題表示
// ====================

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


    const choices =
        q.choices
            .map(
                (
                    choice,
                    index
                ) => ({

                    choice,

                    correct:
                        index ===
                        q.answer

                })
            )
            .sort(
                () =>
                    Math.random() - 0.5
            );


    choices.forEach(
        item => {

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


    buttons.forEach(
        button => {

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

        }
    );


    const q =
        quiz[currentQuestion];


    // ====================
    // 弱点データ更新
    // ====================

    updateWeakness(
        correct
    );


    // ====================
    // 問題結果保存
    // ====================

    saveQuestionResult(
        q,
        correct
    );


    // ====================
    // 正解・不正解
    // ====================

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


    setTimeout(
        () => {

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

        },
        800
    );

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
    // 弱点トレーニング時
    // ====================

    if (weaknessMode) {

        const buttons =
            finishArea.querySelectorAll(
                "button"
            );


        buttons.forEach(
            button => {

                if (
                    button.textContent.includes(
                        "数学へ戻る"
                    )
                ) {

                    button.style.display =
                        "none";

                }

            }
        );


        const backButton =
            document.createElement(
                "button"
            );


        backButton.textContent =
            "弱点トレーニングホームへ";


        backButton.style.background =
            "#2563eb";

        backButton.style.color =
            "white";

        backButton.style.border =
            "none";

        backButton.style.padding =
            "12px 20px";

        backButton.style.borderRadius =
            "10px";

        backButton.style.cursor =
            "pointer";

        backButton.style.marginTop =
            "15px";


        backButton.addEventListener(
            "click",
            () => {

                location.href =
                    "weakness.html";

            }
        );


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

    if (
        studyMinutes > 0
    ) {

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
// 弱点トレーニング自動開始
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


    startQuiz(
        count
    );

}