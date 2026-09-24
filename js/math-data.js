// ====================
// Study Link
// データの活用
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


    // 弱点問題がない場合
    if (quiz.length === 0) {

        if (weaknessMode) {

            alert(
                "この単元には現在、弱点問題がありません。"
            );

            location.href =
                "weakness.html";

            return;

        }

        finishQuiz();

        return;

    }


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
// 平均値
// ====================

function getAverage(numbers) {

    const total =
        numbers.reduce(
            (sum, value) =>
                sum + value,
            0
        );

    return total /
        numbers.length;
}


// ====================
// 中央値
// ====================

function getMedian(numbers) {

    const sorted =
        [...numbers].sort(
            (a, b) =>
                a - b
        );


    const middle =
        Math.floor(
            sorted.length / 2
        );


    if (
        sorted.length % 2 === 0
    ) {

        return (
            sorted[middle - 1] +
            sorted[middle]
        ) / 2;

    }


    return sorted[middle];
}


// ====================
// 最頻値
// ====================

function getMode(numbers) {

    const count = {};


    numbers.forEach(
        number => {

            count[number] =
                (count[number] || 0) +
                1;

        }
    );


    let mode =
        numbers[0];

    let maxCount =
        count[mode];


    Object.keys(count).forEach(
        key => {

            if (
                count[key] >
                maxCount
            ) {

                mode =
                    Number(key);

                maxCount =
                    count[key];

            }

        }
    );


    return mode;
}


// ====================
// 範囲
// ====================

function getRange(numbers) {

    return (
        Math.max(...numbers) -
        Math.min(...numbers)
    );
}


// ====================
// クイズ作成
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


        const data =
            weaknesses?.["数学"]?.["データの活用"];


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
                    "データの活用",

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
// 通常問題作成
// ====================

function createNormalQuiz(count) {

    const quiz = [];

    const used =
        new Set();


    while (
        quiz.length < count
    ) {

        const type =
            randomInt(1, 4);


        let numbers = [];

        let question;

        let answer;

        let unit;


        // ====================
        // ① 平均値
        // ====================

        if (type === 1) {

            unit =
                "平均値";


            const size =
                randomInt(3, 5);


            for (
                let i = 0;
                i < size;
                i++
            ) {

                numbers.push(
                    randomInt(1, 20)
                );

            }


            answer =
                getAverage(
                    numbers
                );


            question =
                `次のデータの平均値はいくつ？　${numbers.join("、")}`;

        }


        // ====================
        // ② 中央値
        // ====================

        else if (type === 2) {

            unit =
                "中央値";


            const size =
                randomInt(5, 7);


            for (
                let i = 0;
                i < size;
                i++
            ) {

                numbers.push(
                    randomInt(1, 30)
                );

            }


            answer =
                getMedian(
                    numbers
                );


            question =
                `次のデータの中央値はいくつ？　${numbers.join("、")}`;

        }


        // ====================
        // ③ 最頻値
        // ====================

        else if (type === 3) {

            unit =
                "最頻値";


            const mode =
                randomInt(1, 15);


            numbers = [

                randomInt(1, 15),

                randomInt(1, 15),

                mode,

                mode,

                mode,

                randomInt(1, 15),

                randomInt(1, 15)

            ];


            answer =
                getMode(
                    numbers
                );


            question =
                `次のデータの最頻値はいくつ？　${numbers.join("、")}`;

        }


        // ====================
        // ④ 範囲
        // ====================

        else {

            unit =
                "範囲";


            const size =
                randomInt(4, 6);


            for (
                let i = 0;
                i < size;
                i++
            ) {

                numbers.push(
                    randomInt(1, 30)
                );

            }


            answer =
                getRange(
                    numbers
                );


            question =
                `次のデータの範囲はいくつ？　${numbers.join("、")}`;

        }


        // ====================
        // 小数対策
        // ====================

        if (
            !Number.isInteger(answer)
        ) {

            answer =
                Math.round(
                    answer * 10
                ) / 10;

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
        // 4択
        // ====================

        const choices = [
            String(answer)
        ];


        while (
            choices.length < 4
        ) {

            let wrong;


            if (
                Number.isInteger(
                    answer
                )
            ) {

                wrong =
                    answer +
                    randomInt(
                        -5,
                        5
                    );

            }

            else {

                wrong =
                    Math.round(
                        (
                            answer +
                            randomInt(
                                -5,
                                5
                            ) *
                            0.5
                        ) * 10
                    ) / 10;

            }


            if (
                wrong === answer
            ) {

                continue;

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


        // ====================
        // シャッフル
        // ====================

        choices.sort(
            () =>
                Math.random() - 0.5
        );


        quiz.push({

            id:
                `math-data-${quiz.length + 1}`,

            question:
                question,

            choices:
                choices,

            answer:
                choices.indexOf(
                    String(answer)
                ),

            subject:
                "数学",

            unit:
                "データの活用"

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
                (choice, index) => ({

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
        !weaknesses["数学"]["データの活用"]
    ) {

        weaknesses["数学"]["データの活用"] = {

            wrong: 0,

            correct: 0,

            level: 0,

            questions: {}

        };

    }


    const data =
        weaknesses["数学"]["データの活用"];


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
                        "データの活用",

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
    )
        .catch(
            error => {

                console.error(
                    "問題結果の保存に失敗しました。",
                    error
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


    updateWeakness(
        correct
    );


    saveQuestionResult(
        quiz[currentQuestion],
        correct
    );


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
                                "データの活用",

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