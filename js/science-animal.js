// ====================
// Study Link
// 理科：動物
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
// 動物問題
// 中1レベル
// ====================

const questionTemplates = [

    {
        question: "動物が外界から刺激を受け取る器官を何という？",
        choices: [
            "感覚器官",
            "消化器官",
            "呼吸器官",
            "排出器官"
        ],
        answer: "感覚器官"
    },

    {
        question: "目で受け取る刺激は？",
        choices: [
            "光",
            "音",
            "におい",
            "温度"
        ],
        answer: "光"
    },

    {
        question: "耳で受け取る刺激は？",
        choices: [
            "音",
            "光",
            "味",
            "温度"
        ],
        answer: "音"
    },

    {
        question: "鼻で主に感じ取る刺激は？",
        choices: [
            "におい",
            "光",
            "音",
            "温度"
        ],
        answer: "におい"
    },

    {
        question: "舌で主に感じ取る刺激は？",
        choices: [
            "味",
            "光",
            "音",
            "におい"
        ],
        answer: "味"
    },

    {
        question: "皮膚で感じ取ることができるものは？",
        choices: [
            "温度や痛み",
            "光だけ",
            "音だけ",
            "味だけ"
        ],
        answer: "温度や痛み"
    },

    {
        question: "刺激を受け取ったとき、その情報を脳などへ伝えるものは？",
        choices: [
            "神経",
            "血液",
            "消化液",
            "骨"
        ],
        answer: "神経"
    },

    {
        question: "神経系の中で、全身からの情報を受け取り判断する中心となる器官は？",
        choices: [
            "脳",
            "胃",
            "肺",
            "心臓"
        ],
        answer: "脳"
    },

    {
        question: "脳からの命令を筋肉などへ伝えるものは？",
        choices: [
            "神経",
            "血液",
            "骨",
            "消化液"
        ],
        answer: "神経"
    },

    {
        question: "筋肉が縮んだりゆるんだりすることで起こるものは？",
        choices: [
            "運動",
            "消化",
            "呼吸だけ",
            "排出だけ"
        ],
        answer: "運動"
    },

    {
        question: "食物を体内に取り入れ、栄養分を吸収する一連のはたらきを何という？",
        choices: [
            "消化",
            "呼吸",
            "循環",
            "排出"
        ],
        answer: "消化"
    },

    {
        question: "消化された養分を主に吸収する器官は？",
        choices: [
            "小腸",
            "胃",
            "食道",
            "大腸"
        ],
        answer: "小腸"
    },

    {
        question: "食物を一時的にため、消化する器官は？",
        choices: [
            "胃",
            "小腸",
            "肺",
            "心臓"
        ],
        answer: "胃"
    },

    {
        question: "食道は何のための器官？",
        choices: [
            "食物を胃へ運ぶ",
            "酸素を取り入れる",
            "血液を送る",
            "尿をつくる"
        ],
        answer: "食物を胃へ運ぶ"
    },

    {
        question: "呼吸によって取り入れる気体は？",
        choices: [
            "酸素",
            "二酸化炭素",
            "窒素",
            "水素"
        ],
        answer: "酸素"
    },

    {
        question: "呼吸によって体外へ出す気体は？",
        choices: [
            "二酸化炭素",
            "酸素",
            "窒素",
            "水素"
        ],
        answer: "二酸化炭素"
    },

    {
        question: "ヒトの呼吸器官で、酸素と二酸化炭素の交換が行われる場所は？",
        choices: [
            "肺胞",
            "気管",
            "鼻",
            "食道"
        ],
        answer: "肺胞"
    },

    {
        question: "肺胞の周りを取り囲んでいる細い血管は？",
        choices: [
            "毛細血管",
            "動脈",
            "静脈",
            "リンパ管"
        ],
        answer: "毛細血管"
    },

    {
        question: "血液を全身へ送り出すポンプの役割をする器官は？",
        choices: [
            "心臓",
            "肺",
            "胃",
            "腎臓"
        ],
        answer: "心臓"
    },

    {
        question: "心臓から送り出された血液が通る血管を何という？",
        choices: [
            "動脈",
            "静脈",
            "毛細血管",
            "リンパ管"
        ],
        answer: "動脈"
    },

    {
        question: "心臓へ戻ってくる血液が通る血管を何という？",
        choices: [
            "静脈",
            "動脈",
            "気管",
            "毛細血管だけ"
        ],
        answer: "静脈"
    },

    {
        question: "血液中で酸素を運ぶはたらきをするものは？",
        choices: [
            "赤血球",
            "白血球",
            "血小板",
            "血しょう"
        ],
        answer: "赤血球"
    },

    {
        question: "赤血球に含まれ、酸素と結びつく物質は？",
        choices: [
            "ヘモグロビン",
            "デンプン",
            "ブドウ糖",
            "脂肪"
        ],
        answer: "ヘモグロビン"
    },

    {
        question: "体内に入った細菌などから体を守るはたらきをする血球は？",
        choices: [
            "白血球",
            "赤血球",
            "血小板",
            "血しょう"
        ],
        answer: "白血球"
    },

    {
        question: "出血したとき、血液を固めるはたらきをするものは？",
        choices: [
            "血小板",
            "赤血球",
            "白血球",
            "ヘモグロビン"
        ],
        answer: "血小板"
    },

    {
        question: "血液の液体成分を何という？",
        choices: [
            "血しょう",
            "赤血球",
            "白血球",
            "血小板"
        ],
        answer: "血しょう"
    },

    {
        question: "不要な物質を尿として体外へ排出する器官は？",
        choices: [
            "腎臓",
            "肺",
            "胃",
            "心臓"
        ],
        answer: "腎臓"
    },

    {
        question: "ヒトの体で、尿を一時的にためておく器官は？",
        choices: [
            "ぼうこう",
            "腎臓",
            "小腸",
            "肝臓"
        ],
        answer: "ぼうこう"
    },

    {
        question: "動物の分類で、背骨をもつ動物を何という？",
        choices: [
            "脊椎動物",
            "無脊椎動物",
            "節足動物",
            "軟体動物"
        ],
        answer: "脊椎動物"
    },

    {
        question: "脊椎動物に含まれないものは？",
        choices: [
            "昆虫",
            "魚類",
            "両生類",
            "哺乳類"
        ],
        answer: "昆虫"
    },

    {
        question: "魚類の呼吸器官は？",
        choices: [
            "えら",
            "肺",
            "気管",
            "皮膚だけ"
        ],
        answer: "えら"
    },

    {
        question: "両生類の例として正しいものは？",
        choices: [
            "カエル",
            "ハト",
            "イヌ",
            "トカゲ"
        ],
        answer: "カエル"
    },

    {
        question: "爬虫類の例として正しいものは？",
        choices: [
            "トカゲ",
            "カエル",
            "メダカ",
            "ハト"
        ],
        answer: "トカゲ"
    },

    {
        question: "鳥類の体表をおおっているものは？",
        choices: [
            "羽毛",
            "うろこ",
            "粘液",
            "毛だけ"
        ],
        answer: "羽毛"
    },

    {
        question: "哺乳類の特徴として正しいものは？",
        choices: [
            "子に乳を与える",
            "必ずえらで呼吸する",
            "体表が羽毛でおおわれる",
            "必ず水中で生活する"
        ],
        answer: "子に乳を与える"
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
                            "動物",

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