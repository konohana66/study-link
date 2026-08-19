// ====================
// Study Link
// 英語：過去形
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
// 過去形 問題データ
// ====================

const questionTemplates = [

    {
        question: "I ___ soccer yesterday.",
        choices: ["play", "played", "plays", "playing"],
        answer: "played"
    },

    {
        question: "He ___ to school yesterday.",
        choices: ["go", "goes", "went", "going"],
        answer: "went"
    },

    {
        question: "She ___ TV last night.",
        choices: ["watch", "watched", "watches", "watching"],
        answer: "watched"
    },

    {
        question: "We ___ tennis yesterday.",
        choices: ["play", "played", "plays", "playing"],
        answer: "played"
    },

    {
        question: "Tom ___ English last night.",
        choices: ["study", "studied", "studies", "studying"],
        answer: "studied"
    },

    {
        question: "I ___ breakfast at seven yesterday.",
        choices: ["eat", "ate", "eats", "eating"],
        answer: "ate"
    },

    {
        question: "She ___ a new book yesterday.",
        choices: ["read", "reads", "reading", "readed"],
        answer: "read"
    },

    {
        question: "He ___ a bike last Sunday.",
        choices: ["ride", "rode", "rides", "riding"],
        answer: "rode"
    },

    {
        question: "They ___ baseball yesterday.",
        choices: ["play", "played", "plays", "playing"],
        answer: "played"
    },

    {
        question: "My mother ___ dinner last night.",
        choices: ["cook", "cooked", "cooks", "cooking"],
        answer: "cooked"
    },

    {
        question: "I ___ my homework yesterday.",
        choices: ["do", "did", "does", "doing"],
        answer: "did"
    },

    {
        question: "Ken ___ a dog last year.",
        choices: ["have", "has", "had", "having"],
        answer: "had"
    },

    {
        question: "She ___ to the park yesterday.",
        choices: ["go", "went", "goes", "going"],
        answer: "went"
    },

    {
        question: "He ___ basketball last Saturday.",
        choices: ["play", "played", "plays", "playing"],
        answer: "played"
    },

    {
        question: "We ___ English yesterday.",
        choices: ["study", "studied", "studies", "studying"],
        answer: "studied"
    },

    {
        question: "Tom ___ lunch at school yesterday.",
        choices: ["eat", "ate", "eats", "eating"],
        answer: "ate"
    },

    {
        question: "My father ___ a car yesterday.",
        choices: ["drive", "drove", "drives", "driving"],
        answer: "drove"
    },

    {
        question: "She ___ music last night.",
        choices: ["listen", "listened", "listens", "listening"],
        answer: "listened"
    },

    {
        question: "I ___ my room yesterday.",
        choices: ["clean", "cleaned", "cleans", "cleaning"],
        answer: "cleaned"
    },

    {
        question: "He ___ the piano yesterday.",
        choices: ["play", "played", "plays", "playing"],
        answer: "played"
    },

    {
        question: "They ___ to Osaka last Sunday.",
        choices: ["go", "went", "goes", "going"],
        answer: "went"
    },

    {
        question: "She ___ a picture yesterday.",
        choices: ["draw", "drew", "draws", "drawing"],
        answer: "drew"
    },

    {
        question: "I ___ my friend yesterday.",
        choices: ["see", "saw", "sees", "seeing"],
        answer: "saw"
    },

    {
        question: "He ___ a letter yesterday.",
        choices: ["write", "wrote", "writes", "writing"],
        answer: "wrote"
    },

    {
        question: "We ___ a movie last night.",
        choices: ["watch", "watched", "watches", "watching"],
        answer: "watched"
    },

    {
        question: "Tom ___ very happy yesterday.",
        choices: ["is", "was", "are", "were"],
        answer: "was"
    },

    {
        question: "They ___ busy yesterday.",
        choices: ["is", "was", "are", "were"],
        answer: "were"
    },

    {
        question: "I ___ tired yesterday.",
        choices: ["am", "was", "is", "were"],
        answer: "was"
    },

    {
        question: "You ___ at home yesterday.",
        choices: ["was", "were", "is", "am"],
        answer: "were"
    },

    {
        question: "She ___ in Kyoto last week.",
        choices: ["is", "was", "are", "were"],
        answer: "was"
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
                            "過去形",

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