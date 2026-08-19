// ====================
// Study Link
// 理科：光・音・力
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

const countArea = document.getElementById("countArea");
const quizArea = document.getElementById("quizArea");
const finishArea = document.getElementById("finish");

const progress = document.getElementById("progress");
const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const resultElement = document.getElementById("result");

const scoreElement = document.getElementById("score");
const xpResultElement = document.getElementById("xpResult");


// ====================
// 光・音・力 問題
// 中1レベル
// ====================

const questionTemplates = [

    {
        question: "光がまっすぐ進むことを何という？",
        choices: [
            "光の直進",
            "光の反射",
            "光の屈折",
            "光の分散"
        ],
        answer: "光の直進"
    },

    {
        question: "光が物体の表面ではね返ることを何という？",
        choices: [
            "反射",
            "屈折",
            "直進",
            "分散"
        ],
        answer: "反射"
    },

    {
        question: "光が鏡に当たって反射するとき、入射角と反射角の関係は？",
        choices: [
            "入射角＝反射角",
            "入射角＞反射角",
            "入射角＜反射角",
            "必ず90°になる"
        ],
        answer: "入射角＝反射角"
    },

    {
        question: "光が空気中から水中へ進むとき、進む向きが変わる現象を何という？",
        choices: [
            "屈折",
            "反射",
            "直進",
            "分散"
        ],
        answer: "屈折"
    },

    {
        question: "光が水中から空気中へ出るときも起こる現象は？",
        choices: [
            "屈折",
            "蒸発",
            "燃焼",
            "凝固"
        ],
        answer: "屈折"
    },

    {
        question: "凸レンズを通った光が集まる点を何という？",
        choices: [
            "焦点",
            "反射点",
            "支点",
            "作用点"
        ],
        answer: "焦点"
    },

    {
        question: "凸レンズの中心を通る光は、基本的にどう進む？",
        choices: [
            "ほぼ直進する",
            "必ず反射する",
            "必ず止まる",
            "円を描いて進む"
        ],
        answer: "ほぼ直進する"
    },

    {
        question: "音を伝えるものを何という？",
        choices: [
            "媒質",
            "焦点",
            "光源",
            "支点"
        ],
        answer: "媒質"
    },

    {
        question: "音は真空中を伝わる？",
        choices: [
            "伝わらない",
            "伝わる",
            "光より速く伝わる",
            "必ず反射する"
        ],
        answer: "伝わらない"
    },

    {
        question: "音の高さは、主に何によって決まる？",
        choices: [
            "振動数",
            "振幅",
            "音源の大きさだけ",
            "距離だけ"
        ],
        answer: "振動数"
    },

    {
        question: "振動数が大きい音ほどどうなる？",
        choices: [
            "高い音になる",
            "低い音になる",
            "必ず大きくなる",
            "聞こえなくなる"
        ],
        answer: "高い音になる"
    },

    {
        question: "音の大きさは、主に何によって決まる？",
        choices: [
            "振幅",
            "振動数",
            "波長だけ",
            "音速だけ"
        ],
        answer: "振幅"
    },

    {
        question: "振幅が大きいほど音はどうなる？",
        choices: [
            "大きくなる",
            "小さくなる",
            "高くなる",
            "低くなる"
        ],
        answer: "大きくなる"
    },

    {
        question: "音源とは何？",
        choices: [
            "音を出しているもの",
            "音を吸収するもの",
            "光を出すもの",
            "音を止めるもの"
        ],
        answer: "音を出しているもの"
    },

    {
        question: "音が物体に当たってはね返ることを何という？",
        choices: [
            "反射",
            "屈折",
            "蒸散",
            "融解"
        ],
        answer: "反射"
    },

    {
        question: "物体に力を加えると、物体の形が変わることがある。この力のはたらきを何という？",
        choices: [
            "物体を変形させるはたらき",
            "光を反射するはたらき",
            "音を伝えるはたらき",
            "温度を下げるはたらき"
        ],
        answer: "物体を変形させるはたらき"
    },

    {
        question: "力の大きさを表す単位は？",
        choices: [
            "ニュートン（N）",
            "メートル（m）",
            "キログラム（kg）",
            "パスカル（Pa）"
        ],
        answer: "ニュートン（N）"
    },

    {
        question: "力のはたらきとして正しいものは？",
        choices: [
            "物体を動かしたり止めたりする",
            "必ず物体を軽くする",
            "必ず温度を上げる",
            "光だけを変化させる"
        ],
        answer: "物体を動かしたり止めたりする"
    },

    {
        question: "地球が物体を引く力を何という？",
        choices: [
            "重力",
            "摩擦力",
            "磁力",
            "弾性力"
        ],
        answer: "重力"
    },

    {
        question: "ばねを引っ張ったとき、元の形に戻ろうとする力を何という？",
        choices: [
            "弾性力",
            "重力",
            "摩擦力",
            "磁力"
        ],
        answer: "弾性力"
    },

    {
        question: "物体の動きをさまたげる向きにはたらく力を何という？",
        choices: [
            "摩擦力",
            "重力",
            "弾性力",
            "浮力"
        ],
        answer: "摩擦力"
    },

    {
        question: "磁石が鉄などを引きつける力を何という？",
        choices: [
            "磁力",
            "重力",
            "摩擦力",
            "弾性力"
        ],
        answer: "磁力"
    },

    {
        question: "力の大きさを測定する器具は？",
        choices: [
            "ばねばかり",
            "温度計",
            "メスシリンダー",
            "顕微鏡"
        ],
        answer: "ばねばかり"
    },

    {
        question: "力には大きさとともに何がある？",
        choices: [
            "向き",
            "色",
            "温度",
            "密度"
        ],
        answer: "向き"
    },

    {
        question: "物体に力がはたらいている場所を何という？",
        choices: [
            "作用点",
            "焦点",
            "支点",
            "力点"
        ],
        answer: "作用点"
    },

    {
        question: "てこの回転の中心となる点を何という？",
        choices: [
            "支点",
            "作用点",
            "力点",
            "焦点"
        ],
        answer: "支点"
    },

    {
        question: "てこで、力を加える場所を何という？",
        choices: [
            "力点",
            "支点",
            "作用点",
            "焦点"
        ],
        answer: "力点"
    },

    {
        question: "光源とは何？",
        choices: [
            "自ら光を出すもの",
            "光を必ず吸収するもの",
            "音を出すもの",
            "光を曲げるもの"
        ],
        answer: "自ら光を出すもの"
    },

    {
        question: "月のように、自ら光を出さず光を反射して見えるものを何という？",
        choices: [
            "光を反射して見える物体",
            "光源",
            "音源",
            "媒質"
        ],
        answer: "光を反射して見える物体"
    },

    {
        question: "白い光をプリズムに通すと、いろいろな色に分かれる。この現象を何という？",
        choices: [
            "分散",
            "反射",
            "直進",
            "蒸発"
        ],
        answer: "分散"
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

    for (let i = 0; i < count; i++) {

        const template =
            shuffled[i % shuffled.length];

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
                            "光・音・力",

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