// ====================
// Study Link
// 英語：三単現
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
// 三単現 問題データ
// ====================

const questionTemplates = [

    {
        question: "He ___ soccer every day.",
        choices: ["play", "plays", "playing", "played"],
        answer: "plays"
    },

    {
        question: "She ___ English.",
        choices: ["study", "studies", "studying", "studied"],
        answer: "studies"
    },

    {
        question: "Tom ___ TV after school.",
        choices: ["watch", "watches", "watching", "watched"],
        answer: "watches"
    },

    {
        question: "Ken ___ baseball.",
        choices: ["play", "plays", "playing", "played"],
        answer: "plays"
    },

    {
        question: "My mother ___ dinner every day.",
        choices: ["cook", "cooks", "cooking", "cooked"],
        answer: "cooks"
    },

    {
        question: "She ___ music.",
        choices: ["like", "likes", "liking", "liked"],
        answer: "likes"
    },

    {
        question: "He ___ a dog.",
        choices: ["have", "has", "having", "had"],
        answer: "has"
    },

    {
        question: "Tom ___ to school every day.",
        choices: ["go", "goes", "going", "went"],
        answer: "goes"
    },

    {
        question: "She ___ tennis on Sunday.",
        choices: ["play", "plays", "playing", "played"],
        answer: "plays"
    },

    {
        question: "Ken ___ his homework.",
        choices: ["do", "does", "doing", "did"],
        answer: "does"
    },

    {
        question: "He ___ English every morning.",
        choices: ["study", "studies", "studying", "studied"],
        answer: "studies"
    },

    {
        question: "She ___ lunch at school.",
        choices: ["eat", "eats", "eating", "ate"],
        answer: "eats"
    },

    {
        question: "My father ___ a car.",
        choices: ["drive", "drives", "driving", "drove"],
        answer: "drives"
    },

    {
        question: "The dog ___ fast.",
        choices: ["run", "runs", "running", "ran"],
        answer: "runs"
    },

    {
        question: "He ___ books every night.",
        choices: ["read", "reads", "reading", "readed"],
        answer: "reads"
    },

    {
        question: "She ___ the piano.",
        choices: ["play", "plays", "playing", "played"],
        answer: "plays"
    },

    {
        question: "Tom ___ Japanese food.",
        choices: ["like", "likes", "liking", "liked"],
        answer: "likes"
    },

    {
        question: "He ___ TV in the evening.",
        choices: ["watch", "watches", "watching", "watched"],
        answer: "watches"
    },

    {
        question: "My sister ___ to music.",
        choices: ["listen", "listens", "listening", "listened"],
        answer: "listens"
    },

    {
        question: "Ken ___ his room every Saturday.",
        choices: ["clean", "cleans", "cleaning", "cleaned"],
        answer: "cleans"
    },

    {
        question: "She ___ English books.",
        choices: ["read", "reads", "reading", "readed"],
        answer: "reads"
    },

    {
        question: "He ___ soccer after school.",
        choices: ["play", "plays", "playing", "played"],
        answer: "plays"
    },

    {
        question: "Tom ___ breakfast at seven.",
        choices: ["eat", "eats", "eating", "ate"],
        answer: "eats"
    },

    {
        question: "She ___ a new bag.",
        choices: ["have", "has", "having", "had"],
        answer: "has"
    },

    {
        question: "He ___ to the park on Sunday.",
        choices: ["go", "goes", "going", "went"],
        answer: "goes"
    },

    {
        question: "My brother ___ basketball.",
        choices: ["play", "plays", "playing", "played"],
        answer: "plays"
    },

    {
        question: "She ___ her homework after dinner.",
        choices: ["do", "does", "doing", "did"],
        answer: "does"
    },

    {
        question: "The cat ___ on the chair.",
        choices: ["sit", "sits", "sitting", "sat"],
        answer: "sits"
    },

    {
        question: "He ___ a bicycle.",
        choices: ["ride", "rides", "riding", "rode"],
        answer: "rides"
    },

    {
        question: "She ___ pictures.",
        choices: ["draw", "draws", "drawing", "drew"],
        answer: "draws"
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
                            "三単現",

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