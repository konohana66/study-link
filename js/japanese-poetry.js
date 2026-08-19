// ====================
// Study Link
// 国語：詩・短歌・俳句
// ====================

const GAS_URL =
    "https://script.google.com/macros/s/AKfycbxdL1vYB2Iv6hpQOTDnvmBaIAChjsxXUvEIQdm9U-TM2hqBPeSGsrkVdJwLVNqN4Mcp/exec";

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
// 詩・短歌・俳句問題
// 中1レベル
// ====================

const questionTemplates = [

    {
        question: "俳句の基本的な音数は？",
        choices: [
            "5・7・5",
            "5・5・7",
            "7・7・7",
            "5・7・7"
        ],
        answer: "5・7・5"
    },

    {
        question: "短歌の基本的な音数は？",
        choices: [
            "5・7・5・7・7",
            "5・7・5",
            "7・7・7・5・5",
            "5・5・7・7"
        ],
        answer: "5・7・5・7・7"
    },

    {
        question: "俳句で、季節を表す言葉を何という？",
        choices: [
            "季語",
            "枕詞",
            "序詞",
            "掛詞"
        ],
        answer: "季語"
    },

    {
        question: "俳句で、5・7・5の音数を区切ることを何という？",
        choices: [
            "五七五",
            "三段切れ",
            "句切れ",
            "韻"
        ],
        answer: "句切れ"
    },

    {
        question: "短歌で、最初の5・7・5の部分を何という？",
        choices: [
            "上の句",
            "下の句",
            "結句",
            "序詞"
        ],
        answer: "上の句"
    },

    {
        question: "短歌で、最後の7・7の部分を何という？",
        choices: [
            "下の句",
            "上の句",
            "初句",
            "季句"
        ],
        answer: "下の句"
    },

    {
        question: "俳句や短歌などで、作者が感じたことや考えたことを何という？",
        choices: [
            "心情",
            "季語",
            "音数",
            "題名"
        ],
        answer: "心情"
    },

    {
        question: "「春」を表す季語として適切なのは？",
        choices: [
            "桜",
            "雪",
            "紅葉",
            "蝉"
        ],
        answer: "桜"
    },

    {
        question: "「夏」を表す季語として適切なのは？",
        choices: [
            "蝉",
            "雪",
            "木枯らし",
            "桜"
        ],
        answer: "蝉"
    },

    {
        question: "「秋」を表す季語として適切なのは？",
        choices: [
            "紅葉",
            "桜",
            "蝉",
            "雪"
        ],
        answer: "紅葉"
    },

    {
        question: "「冬」を表す季語として適切なのは？",
        choices: [
            "雪",
            "桜",
            "蝉",
            "新緑"
        ],
        answer: "雪"
    },

    {
        question: "詩の中で、作者が強く伝えたいことを何という？",
        choices: [
            "主題",
            "季語",
            "音数",
            "句切れ"
        ],
        answer: "主題"
    },

    {
        question: "詩や短歌などで、言葉から思い浮かぶ情景を何という？",
        choices: [
            "情景",
            "音数",
            "季語",
            "作者名"
        ],
        answer: "情景"
    },

    {
        question: "「雪」という言葉から冬の景色を思い浮かべるような表現で大切なのは？",
        choices: [
            "情景",
            "作者名",
            "音数だけ",
            "題名だけ"
        ],
        answer: "情景"
    },

    {
        question: "短歌は、俳句と比べてどこが長い？",
        choices: [
            "7・7の部分がある",
            "季語が必ず2つある",
            "5・7・5がない",
            "必ず漢字だけで書く"
        ],
        answer: "7・7の部分がある"
    },

    {
        question: "俳句には、原則として何が必要？",
        choices: [
            "季語",
            "7・7",
            "作者の名前",
            "長い説明"
        ],
        answer: "季語"
    },

    {
        question: "「古池や 蛙飛びこむ 水の音」の季語は？",
        choices: [
            "蛙",
            "古池",
            "音",
            "飛びこむ"
        ],
        answer: "蛙"
    },

    {
        question: "「古池や 蛙飛びこむ 水の音」は何？",
        choices: [
            "俳句",
            "短歌",
            "詩",
            "漢詩"
        ],
        answer: "俳句"
    },

    {
        question: "俳句の5・7・5を数えるとき、基本的に数えるものは？",
        choices: [
            "音",
            "漢字の数",
            "文字の数だけ",
            "単語の数"
        ],
        answer: "音"
    },

    {
        question: "短歌の5・7・5・7・7は全部で何音？",
        choices: [
            "31音",
            "17音",
            "25音",
            "35音"
        ],
        answer: "31音"
    },

    {
        question: "俳句の5・7・5は全部で何音？",
        choices: [
            "17音",
            "31音",
            "15音",
            "20音"
        ],
        answer: "17音"
    },

    {
        question: "「切れ字」と関係が深いものは？",
        choices: [
            "俳句",
            "作文",
            "説明文",
            "漢字"
        ],
        answer: "俳句"
    },

    {
        question: "「や」「かな」「けり」などは、俳句で何と呼ばれる？",
        choices: [
            "切れ字",
            "季語",
            "序詞",
            "主題"
        ],
        answer: "切れ字"
    },

    {
        question: "詩で、同じ言葉や表現を繰り返す技法を何という？",
        choices: [
            "反復",
            "対比",
            "引用",
            "倒置"
        ],
        answer: "反復"
    },

    {
        question: "反対の意味を持つものを並べて印象を強める表現を何という？",
        choices: [
            "対比",
            "反復",
            "季語",
            "句切れ"
        ],
        answer: "対比"
    },

    {
        question: "「まるで〜のようだ」のように、別のものにたとえる表現は？",
        choices: [
            "比喩",
            "反復",
            "対比",
            "倒置"
        ],
        answer: "比喩"
    },

    {
        question: "詩や短歌で、作者の気持ちを読み取るときに大切なのは？",
        choices: [
            "使われている言葉や表現",
            "ページ数",
            "文字の大きさだけ",
            "作者の年齢だけ"
        ],
        answer: "使われている言葉や表現"
    },

    {
        question: "俳句の季語から読み取れるものは？",
        choices: [
            "季節",
            "作者の住所",
            "文字数",
            "題名"
        ],
        answer: "季節"
    },

    {
        question: "短歌で、作者の心情を読み取るために注目するとよいものは？",
        choices: [
            "言葉や表現",
            "音数だけ",
            "題名の長さだけ",
            "句読点の数"
        ],
        answer: "言葉や表現"
    },

    {
        question: "詩・短歌・俳句を読むとき、言葉から浮かぶ景色や場面を考えることを何という？",
        choices: [
            "情景を想像する",
            "音数を数える",
            "文法を直す",
            "要約する"
        ],
        answer: "情景を想像する"
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
                            "詩・短歌・俳句",

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