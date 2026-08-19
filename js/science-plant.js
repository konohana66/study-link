// ====================
// Study Link
// 理科：植物
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
// 植物問題
// 中1レベル
// ====================

const questionTemplates = [

    {
        question: "植物のからだで、根から吸収した水や無機養分を運ぶ管を何という？",
        choices: [
            "道管",
            "師管",
            "気孔",
            "維管束"
        ],
        answer: "道管"
    },

    {
        question: "葉でつくられた養分を植物の各部分へ運ぶ管を何という？",
        choices: [
            "師管",
            "道管",
            "気孔",
            "根毛"
        ],
        answer: "師管"
    },

    {
        question: "道管と師管が集まっている部分を何という？",
        choices: [
            "維管束",
            "葉脈",
            "根毛",
            "気孔"
        ],
        answer: "維管束"
    },

    {
        question: "根の表面にある細い毛のようなつくりを何という？",
        choices: [
            "根毛",
            "気孔",
            "葉脈",
            "維管束"
        ],
        answer: "根毛"
    },

    {
        question: "根毛の主なはたらきは？",
        choices: [
            "水や無機養分を吸収する",
            "光合成をする",
            "酸素をつくる",
            "花粉をつくる"
        ],
        answer: "水や無機養分を吸収する"
    },

    {
        question: "葉にある、気体の出入りをする小さな穴を何という？",
        choices: [
            "気孔",
            "根毛",
            "道管",
            "師管"
        ],
        answer: "気孔"
    },

    {
        question: "気孔は主に葉のどの部分に多く見られる？",
        choices: [
            "裏側",
            "表側",
            "葉の中心だけ",
            "葉柄だけ"
        ],
        answer: "裏側"
    },

    {
        question: "植物が光のエネルギーを利用して養分をつくるはたらきを何という？",
        choices: [
            "光合成",
            "蒸散",
            "呼吸",
            "受粉"
        ],
        answer: "光合成"
    },

    {
        question: "光合成が主に行われる場所は？",
        choices: [
            "葉",
            "根",
            "花粉",
            "根毛"
        ],
        answer: "葉"
    },

    {
        question: "光合成に必要な気体は？",
        choices: [
            "二酸化炭素",
            "酸素",
            "窒素だけ",
            "水素"
        ],
        answer: "二酸化炭素"
    },

    {
        question: "光合成によってつくられる養分は？",
        choices: [
            "デンプン",
            "酸素だけ",
            "二酸化炭素",
            "無機物"
        ],
        answer: "デンプン"
    },

    {
        question: "光合成によって放出される気体は？",
        choices: [
            "酸素",
            "二酸化炭素",
            "窒素",
            "水素"
        ],
        answer: "酸素"
    },

    {
        question: "葉の緑色の部分に多く含まれ、光合成に関係するものは？",
        choices: [
            "葉緑体",
            "根毛",
            "道管",
            "師管"
        ],
        answer: "葉緑体"
    },

    {
        question: "植物の葉から水が水蒸気として出ていく現象を何という？",
        choices: [
            "蒸散",
            "光合成",
            "呼吸",
            "受粉"
        ],
        answer: "蒸散"
    },

    {
        question: "蒸散によって水蒸気が主に出ていく場所は？",
        choices: [
            "気孔",
            "道管",
            "師管",
            "根毛"
        ],
        answer: "気孔"
    },

    {
        question: "植物が昼夜を問わず行っている生命活動は？",
        choices: [
            "呼吸",
            "光合成だけ",
            "受粉",
            "蒸発"
        ],
        answer: "呼吸"
    },

    {
        question: "植物の呼吸で取り入れる気体は？",
        choices: [
            "酸素",
            "二酸化炭素",
            "窒素",
            "水素"
        ],
        answer: "酸素"
    },

    {
        question: "植物の呼吸で放出される気体は？",
        choices: [
            "二酸化炭素",
            "酸素",
            "窒素",
            "水素"
        ],
        answer: "二酸化炭素"
    },

    {
        question: "光合成で必要なものの組み合わせとして正しいものは？",
        choices: [
            "二酸化炭素・水・光",
            "酸素・水・光",
            "二酸化炭素・酸素・光",
            "窒素・酸素・水"
        ],
        answer: "二酸化炭素・水・光"
    },

    {
        question: "根から吸収された水が植物の中を移動するとき、主に通るのは？",
        choices: [
            "道管",
            "師管",
            "気孔",
            "葉緑体"
        ],
        answer: "道管"
    },

    {
        question: "葉でつくられた養分が植物の各部分へ運ばれるとき、主に通るのは？",
        choices: [
            "師管",
            "道管",
            "気孔",
            "根毛"
        ],
        answer: "師管"
    },

    {
        question: "花粉がめしべの柱頭につくことを何という？",
        choices: [
            "受粉",
            "受精",
            "発芽",
            "蒸散"
        ],
        answer: "受粉"
    },

    {
        question: "花粉をつくる器官は？",
        choices: [
            "おしべ",
            "めしべ",
            "がく",
            "花弁"
        ],
        answer: "おしべ"
    },

    {
        question: "花粉がつく部分を何という？",
        choices: [
            "柱頭",
            "やく",
            "子房",
            "胚珠"
        ],
        answer: "柱頭"
    },

    {
        question: "めしべの根元にあるふくらんだ部分を何という？",
        choices: [
            "子房",
            "柱頭",
            "やく",
            "花弁"
        ],
        answer: "子房"
    },

    {
        question: "子房の中にあるものは？",
        choices: [
            "胚珠",
            "花粉",
            "柱頭",
            "やく"
        ],
        answer: "胚珠"
    },

    {
        question: "受粉後、胚珠は何になる？",
        choices: [
            "種子",
            "果実",
            "花粉",
            "根"
        ],
        answer: "種子"
    },

    {
        question: "受粉後、子房は何になる？",
        choices: [
            "果実",
            "種子",
            "花粉",
            "根毛"
        ],
        answer: "果実"
    },

    {
        question: "被子植物で、胚珠が子房の中にある植物の例は？",
        choices: [
            "アブラナ",
            "マツ",
            "スギ",
            "イチョウ"
        ],
        answer: "アブラナ"
    },

    {
        question: "裸子植物の特徴として正しいものは？",
        choices: [
            "胚珠が子房に包まれていない",
            "必ず花弁がある",
            "必ず果実ができる",
            "根毛がない"
        ],
        answer: "胚珠が子房に包まれていない"
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

            // 正解を光らせる

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
                            "理科",

                        unit:
                            "植物",

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