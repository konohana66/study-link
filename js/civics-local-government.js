// ====================
// Study Link
// 公民：地方自治
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
        question: "地方自治とは、地域の政治を誰が中心となって行うこと？",
        choices: [
            "住民",
            "外国政府",
            "裁判所",
            "国会だけ"
        ],
        answer: "住民"
    },

    {
        question: "地方自治の基本的な考え方を示す、日本国憲法第92条の原則は？",
        choices: [
            "地方自治の本旨",
            "国民主権",
            "三権分立",
            "法の支配"
        ],
        answer: "地方自治の本旨"
    },

    {
        question: "地方公共団体の議決機関は？",
        choices: [
            "地方議会",
            "内閣",
            "国会",
            "裁判所"
        ],
        answer: "地方議会"
    },

    {
        question: "都道府県の議会を何という？",
        choices: [
            "都道府県議会",
            "国会",
            "市町村議会",
            "地方裁判所"
        ],
        answer: "都道府県議会"
    },

    {
        question: "市町村の議会を何という？",
        choices: [
            "市町村議会",
            "都道府県議会",
            "国会",
            "参議院"
        ],
        answer: "市町村議会"
    },

    {
        question: "都道府県の長を何という？",
        choices: [
            "都道府県知事",
            "市町村長",
            "内閣総理大臣",
            "議長"
        ],
        answer: "都道府県知事"
    },

    {
        question: "市町村の長を何という？",
        choices: [
            "市町村長",
            "都道府県知事",
            "国務大臣",
            "議長"
        ],
        answer: "市町村長"
    },

    {
        question: "地方公共団体の長と地方議会の議員を選ぶのは誰？",
        choices: [
            "住民",
            "国会",
            "内閣",
            "裁判所"
        ],
        answer: "住民"
    },

    {
        question: "地方公共団体が地域の仕事を行うために制定するきまりを何という？",
        choices: [
            "条例",
            "法律",
            "憲法",
            "政令"
        ],
        answer: "条例"
    },

    {
        question: "条例を制定する機関は？",
        choices: [
            "地方議会",
            "最高裁判所",
            "内閣",
            "国会"
        ],
        answer: "地方議会"
    },

    {
        question: "地方自治において、住民が政治に直接参加するための制度を何という？",
        choices: [
            "直接請求権",
            "違憲審査権",
            "国民審査",
            "内閣不信任"
        ],
        answer: "直接請求権"
    },

    {
        question: "住民が地方公共団体の条例の制定や改廃を請求できる制度を何という？",
        choices: [
            "直接請求",
            "国民投票",
            "国民審査",
            "解散"
        ],
        answer: "直接請求"
    },

    {
        question: "住民が地方議会の解散を請求することを何という？",
        choices: [
            "解散請求",
            "上告",
            "控訴",
            "国民審査"
        ],
        answer: "解散請求"
    },

    {
        question: "地方議会の議員や長の解職を求める請求を何という？",
        choices: [
            "解職請求",
            "法律案請求",
            "上告",
            "国民投票"
        ],
        answer: "解職請求"
    },

    {
        question: "地方自治において、住民が地域の政治に参加することが重要なのはなぜ？",
        choices: [
            "地域の課題を住民自身が考え、政治に反映できるから",
            "国会をなくすため",
            "法律を無視するため",
            "住民の意見を一つにするため"
        ],
        answer: "地域の課題を住民自身が考え、政治に反映できるから"
    },

    {
        question: "地方公共団体の財源のうち、住民が納める地方税などを何という？",
        choices: [
            "自主財源",
            "国庫支出金",
            "地方交付税",
            "外国援助"
        ],
        answer: "自主財源"
    },

    {
        question: "国から地方公共団体に交付され、地方公共団体間の財源の不均衡を調整するものは？",
        choices: [
            "地方交付税交付金",
            "地方税",
            "住民税",
            "関税"
        ],
        answer: "地方交付税交付金"
    },

    {
        question: "国が特定の事業のために地方公共団体へ支出するお金を何という？",
        choices: [
            "国庫支出金",
            "地方税",
            "地方交付税",
            "住民税"
        ],
        answer: "国庫支出金"
    },

    {
        question: "地方公共団体が地域の住民に提供する、学校や道路などの仕事を何という？",
        choices: [
            "行政サービス",
            "外交",
            "国政",
            "司法"
        ],
        answer: "行政サービス"
    },

    {
        question: "地方公共団体が地域の実情に応じて政治を行うことの利点は？",
        choices: [
            "地域ごとの課題に合わせた行政ができる",
            "全国を同じ方法で管理できる",
            "国会の仕事がなくなる",
            "法律を自由に変更できる"
        ],
        answer: "地域ごとの課題に合わせた行政ができる"
    },

    {
        question: "地方自治を国から独立して行うことを何という？",
        choices: [
            "団体自治",
            "住民自治",
            "国民主権",
            "議院内閣制"
        ],
        answer: "団体自治"
    },

    {
        question: "住民の意思に基づいて地方自治を行うことを何という？",
        choices: [
            "住民自治",
            "団体自治",
            "三権分立",
            "中央集権"
        ],
        answer: "住民自治"
    },

    {
        question: "地方自治の二つの基本的な考え方は？",
        choices: [
            "住民自治と団体自治",
            "国民主権と平和主義",
            "立法と司法",
            "自由権と社会権"
        ],
        answer: "住民自治と団体自治"
    },

    {
        question: "地方公共団体の長と議会議員を住民が直接選ぶ制度を何という？",
        choices: [
            "二元代表制",
            "議院内閣制",
            "大統領制",
            "間接民主制"
        ],
        answer: "二元代表制"
    },

    {
        question: "地方公共団体の長は、地方議会に対して何をすることができる？",
        choices: [
            "議会の解散",
            "国会の解散",
            "最高裁判所の解散",
            "参議院の解散"
        ],
        answer: "議会の解散"
    },

    {
        question: "地方議会は、長に対して不信任決議を行うことができる。この場合、長はどうすることができる？",
        choices: [
            "議会を解散することができる",
            "国会を解散できる",
            "最高裁判所を解散できる",
            "必ず辞職しなければならない"
        ],
        answer: "議会を解散することができる"
    },

    {
        question: "都道府県や市町村などをまとめて何という？",
        choices: [
            "地方公共団体",
            "中央政府",
            "国会",
            "行政機関"
        ],
        answer: "地方公共団体"
    },

    {
        question: "地方公共団体の政治において、住民が選挙によって代表者を選ぶことは何につながる？",
        choices: [
            "民主的な地方自治",
            "中央集権",
            "独裁政治",
            "司法権の独立"
        ],
        answer: "民主的な地方自治"
    },

    {
        question: "地方自治体の財政が厳しくなる原因の一つとして考えられるものは？",
        choices: [
            "人口減少や少子高齢化",
            "選挙の実施",
            "条例の制定",
            "地方議会の存在"
        ],
        answer: "人口減少や少子高齢化"
    },

    {
        question: "地域の課題について住民が意見を出し、行政に反映させることは何につながる？",
        choices: [
            "住民自治の実現",
            "中央集権の強化",
            "三権分立の廃止",
            "国会の解散"
        ],
        answer: "住民自治の実現"
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
                            "地方自治",

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