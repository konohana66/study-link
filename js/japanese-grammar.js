// ====================
// Study Link
// 国語：文法
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
// 文法問題
// 中1レベル
// ====================

const questionTemplates = [

    {
        question: "「私は学生です。」の「私は」は何という成分？",
        choices: ["主語", "述語", "修飾語", "接続語"],
        answer: "主語"
    },

    {
        question: "「太郎は走る。」の「走る」は何という成分？",
        choices: ["主語", "述語", "修飾語", "独立語"],
        answer: "述語"
    },

    {
        question: "「赤い花が咲く。」の「赤い」は何という成分？",
        choices: ["主語", "述語", "修飾語", "接続語"],
        answer: "修飾語"
    },

    {
        question: "「私は学校へ行く。」の「学校へ」は何という成分？",
        choices: ["主語", "述語", "修飾語", "接続語"],
        answer: "修飾語"
    },

    {
        question: "「しかし、雨はやまなかった。」の「しかし」は何という成分？",
        choices: ["主語", "述語", "接続語", "修飾語"],
        answer: "接続語"
    },

    {
        question: "「まあ、きれいだ。」の「まあ」は何という成分？",
        choices: ["独立語", "主語", "述語", "修飾語"],
        answer: "独立語"
    },

    {
        question: "「大きな犬が走る。」で「犬が」は何？",
        choices: ["主語", "述語", "修飾語", "独立語"],
        answer: "主語"
    },

    {
        question: "「大きな犬が走る。」で「大きな」は何？",
        choices: ["主語", "述語", "修飾語", "接続語"],
        answer: "修飾語"
    },

    {
        question: "「犬が速く走る。」で「速く」は何？",
        choices: ["主語", "述語", "修飾語", "独立語"],
        answer: "修飾語"
    },

    {
        question: "「弟は本を読む。」で「読む」は何？",
        choices: ["主語", "述語", "修飾語", "接続語"],
        answer: "述語"
    },

    {
        question: "「私はりんごを食べる。」で「りんごを」は何？",
        choices: ["主語", "述語", "修飾語", "独立語"],
        answer: "修飾語"
    },

    {
        question: "「そして、みんなで帰った。」の「そして」は何？",
        choices: ["接続語", "主語", "述語", "修飾語"],
        answer: "接続語"
    },

    {
        question: "「ああ、わかった。」の「ああ」は何？",
        choices: ["独立語", "主語", "述語", "接続語"],
        answer: "独立語"
    },

    {
        question: "「美しい花が咲いた。」の「美しい」は何？",
        choices: ["修飾語", "主語", "述語", "接続語"],
        answer: "修飾語"
    },

    {
        question: "「花が咲いた。」の「花が」は何？",
        choices: ["主語", "述語", "修飾語", "独立語"],
        answer: "主語"
    },

    {
        question: "「花が咲いた。」の「咲いた」は何？",
        choices: ["述語", "主語", "修飾語", "接続語"],
        answer: "述語"
    },

    {
        question: "「とても速く走る。」の「とても」は何？",
        choices: ["修飾語", "主語", "述語", "独立語"],
        answer: "修飾語"
    },

    {
        question: "「だから、今日は休む。」の「だから」は何？",
        choices: ["接続語", "主語", "述語", "修飾語"],
        answer: "接続語"
    },

    {
        question: "「もしもし、聞こえますか。」の「もしもし」は何？",
        choices: ["独立語", "主語", "述語", "修飾語"],
        answer: "独立語"
    },

    {
        question: "「静かな町に住む。」の「静かな」は何？",
        choices: ["修飾語", "主語", "述語", "接続語"],
        answer: "修飾語"
    },

    {
        question: "「先生が話す。」の「先生が」は何？",
        choices: ["主語", "述語", "修飾語", "独立語"],
        answer: "主語"
    },

    {
        question: "「先生が話す。」の「話す」は何？",
        choices: ["述語", "主語", "修飾語", "接続語"],
        answer: "述語"
    },

    {
        question: "「ゆっくり歩く。」の「ゆっくり」は何？",
        choices: ["修飾語", "主語", "述語", "独立語"],
        answer: "修飾語"
    },

    {
        question: "「しかし、彼は来なかった。」の「しかし」は何？",
        choices: ["接続語", "独立語", "主語", "述語"],
        answer: "接続語"
    },

    {
        question: "「ねえ、一緒に行こう。」の「ねえ」は何？",
        choices: ["独立語", "主語", "述語", "修飾語"],
        answer: "独立語"
    },

    {
        question: "「白い雲が浮かぶ。」の「白い」は何？",
        choices: ["修飾語", "主語", "述語", "接続語"],
        answer: "修飾語"
    },

    {
        question: "「雲が浮かぶ。」の「雲が」は何？",
        choices: ["主語", "述語", "修飾語", "独立語"],
        answer: "主語"
    },

    {
        question: "「雲が浮かぶ。」の「浮かぶ」は何？",
        choices: ["述語", "主語", "修飾語", "接続語"],
        answer: "述語"
    },

    {
        question: "「とても美しい。」の「とても」は何？",
        choices: ["修飾語", "主語", "述語", "独立語"],
        answer: "修飾語"
    },

    {
        question: "「そして、次の問題を解いた。」の「そして」は何？",
        choices: ["接続語", "主語", "述語", "独立語"],
        answer: "接続語"
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
                            "国語",

                        unit:
                            "文法",

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