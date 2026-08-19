// ====================
// Study Link
// 公民：現代社会と私たち
// ====================

const GAS_URL =
    "https://script.google.com/macros/s/AKfycbxdL1vYB2Iv6hpQOTDnvmBaIAChjsxXUvEIQdm9U-TM2hqBPeSGsrkVdJwLVNqN4Mcp/exec";

let currentQuestion = 0;
let score = 0;
let earnedXP = 0;
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
// 問題データ
// ====================

const questionTemplates = [

    {
        question: "現代社会において、情報通信技術の発達によって人々や地域の結びつきが強まることを何という？",
        choices: [
            "情報化",
            "少子化",
            "高齢化",
            "過疎化"
        ],
        answer: "情報化"
    },

    {
        question: "インターネットなどを通して大量の情報がやり取りされる社会を何という？",
        choices: [
            "情報社会",
            "農業社会",
            "封建社会",
            "鎖国社会"
        ],
        answer: "情報社会"
    },

    {
        question: "少子化とは、一般にどのような現象？",
        choices: [
            "出生数が減少し、子どもの割合が低下すること",
            "高齢者の割合が増えること",
            "都市に人口が集中すること",
            "外国人が増えること"
        ],
        answer: "出生数が減少し、子どもの割合が低下すること"
    },

    {
        question: "高齢化とは、社会全体に占める高齢者の割合が高くなることを何という？",
        choices: [
            "高齢化",
            "少子化",
            "国際化",
            "情報化"
        ],
        answer: "高齢化"
    },

    {
        question: "都市に人口が集中する一方、地方で人口が減少する現象を何という？",
        choices: [
            "過疎化",
            "情報化",
            "国際化",
            "少子化"
        ],
        answer: "過疎化"
    },

    {
        question: "異なる文化や国の人々との交流が活発になることを何という？",
        choices: [
            "国際化",
            "高齢化",
            "情報化",
            "過疎化"
        ],
        answer: "国際化"
    },

    {
        question: "一人ひとりの人間をかけがえのない存在として尊重する考え方を何という？",
        choices: [
            "個人の尊重",
            "多数決",
            "市場経済",
            "地方自治"
        ],
        answer: "個人の尊重"
    },

    {
        question: "人々がそれぞれ異なる考え方や価値観を持っていることを何という？",
        choices: [
            "多様性",
            "画一性",
            "統一性",
            "独占"
        ],
        answer: "多様性"
    },

    {
        question: "人々が社会生活を送るうえで共有している、行動の基準となる考え方を何という？",
        choices: [
            "社会規範",
            "国会",
            "市場",
            "選挙"
        ],
        answer: "社会規範"
    },

    {
        question: "法律やきまりを守ることが求められる理由として最も適切なのは？",
        choices: [
            "社会生活の秩序を保つため",
            "全員の考えを同じにするため",
            "自由をなくすため",
            "競争をなくすため"
        ],
        answer: "社会生活の秩序を保つため"
    },

    {
        question: "家族や学校、地域社会など、人々が生活するうえで関わる集団を何という？",
        choices: [
            "社会集団",
            "企業集団だけ",
            "国家だけ",
            "政党"
        ],
        answer: "社会集団"
    },

    {
        question: "現代社会で、個人が複数の社会集団に所属することがあるのはなぜ？",
        choices: [
            "人にはさまざまな立場や役割があるから",
            "法律で必ず決められているから",
            "学校に通えなくなるから",
            "社会集団が一つしかないから"
        ],
        answer: "人にはさまざまな立場や役割があるから"
    },

    {
        question: "人々が互いの違いを認め合いながら共に生活することを何という？",
        choices: [
            "共生",
            "独占",
            "対立",
            "分離"
        ],
        answer: "共生"
    },

    {
        question: "社会の中で意見が対立したとき、話し合いによって解決を目指すことを何という？",
        choices: [
            "合意形成",
            "独裁",
            "弾圧",
            "鎖国"
        ],
        answer: "合意形成"
    },

    {
        question: "意見が異なる人々が話し合い、納得できる結論を目指すことを何という？",
        choices: [
            "合意形成",
            "情報化",
            "少子化",
            "高齢化"
        ],
        answer: "合意形成"
    },

    {
        question: "社会の問題について、自分で考え判断し、行動することを何という？",
        choices: [
            "主体的な参加",
            "情報操作",
            "独占",
            "無関心"
        ],
        answer: "主体的な参加"
    },

    {
        question: "現代社会で情報を正しく読み取り、活用する能力を何という？",
        choices: [
            "情報リテラシー",
            "政治権力",
            "市場原理",
            "社会保障"
        ],
        answer: "情報リテラシー"
    },

    {
        question: "インターネット上の情報を利用するときに特に重要なことは？",
        choices: [
            "情報の正確性や信頼性を確認すること",
            "すべての情報を信じること",
            "情報源を確認しないこと",
            "うわさをすぐ広めること"
        ],
        answer: "情報の正確性や信頼性を確認すること"
    },

    {
        question: "情報を発信するとき、他人の個人情報を勝手に公開しないことが重要なのはなぜ？",
        choices: [
            "他人の権利やプライバシーを守るため",
            "情報を少なくするため",
            "インターネットを使えなくするため",
            "広告を増やすため"
        ],
        answer: "他人の権利やプライバシーを守るため"
    },

    {
        question: "他人に知られたくない個人に関する情報を守る権利を何という？",
        choices: [
            "プライバシーの権利",
            "参政権",
            "請求権",
            "社会権"
        ],
        answer: "プライバシーの権利"
    },

    {
        question: "現代社会で、インターネットを利用する人と利用できない人との間に生じる格差を何という？",
        choices: [
            "デジタル・デバイド",
            "情報革命",
            "少子化",
            "過疎化"
        ],
        answer: "デジタル・デバイド"
    },

    {
        question: "少子高齢化が進むと、社会保障制度にどのような影響が考えられる？",
        choices: [
            "支える世代の負担が大きくなる可能性がある",
            "必ず税金がなくなる",
            "高齢者がいなくなる",
            "社会保障が必要なくなる"
        ],
        answer: "支える世代の負担が大きくなる可能性がある"
    },

    {
        question: "地域社会で、住民同士が協力して地域の課題を解決することが大切なのはなぜ？",
        choices: [
            "地域の課題を住民自身が身近な問題として考えられるから",
            "国の政治が不要になるから",
            "法律を無視できるから",
            "すべての人の意見を同じにできるから"
        ],
        answer: "地域の課題を住民自身が身近な問題として考えられるから"
    },

    {
        question: "現代社会において、環境問題への取り組みが重要なのはなぜ？",
        choices: [
            "将来の世代も暮らせる環境を守る必要があるから",
            "経済活動をすべてなくすため",
            "科学技術を禁止するため",
            "人口を減らすため"
        ],
        answer: "将来の世代も暮らせる環境を守る必要があるから"
    },

    {
        question: "将来の世代のことも考えながら、現在の社会を発展させていく考え方を何という？",
        choices: [
            "持続可能な社会",
            "閉鎖社会",
            "管理社会",
            "封建社会"
        ],
        answer: "持続可能な社会"
    },

    {
        question: "SDGsは何を目指す国際的な目標？",
        choices: [
            "持続可能でよりよい世界を実現すること",
            "特定の国だけを豊かにすること",
            "戦争を増やすこと",
            "国際交流をなくすこと"
        ],
        answer: "持続可能でよりよい世界を実現すること"
    },

    {
        question: "社会の中で、誰もが安心して暮らせるようにするために大切なことは？",
        choices: [
            "互いの人権を尊重すること",
            "他人の意見を認めないこと",
            "少数意見を無視すること",
            "情報を隠すこと"
        ],
        answer: "互いの人権を尊重すること"
    },

    {
        question: "現代社会の課題を解決するために重要なことは？",
        choices: [
            "多様な立場の人が話し合い、協力すること",
            "一人だけで決定すること",
            "意見の違いをなくすこと",
            "問題を放置すること"
        ],
        answer: "多様な立場の人が話し合い、協力すること"
    }

];


// ====================
// クイズ開始
// ====================

function startQuiz(count) {

    currentQuestion = 0;
    score = 0;
    earnedXP = 0;

    quiz = createQuiz(count);

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

            question: template.question,

            choices: choices,

            answer:
                choices.indexOf(template.answer)

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
            if (index === correctIndex) {

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
                            "公民",

                        unit:
                            "現代社会と私たち",

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