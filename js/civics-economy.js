// ====================
// Study Link
// 公民：経済
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
        question: "経済活動の基本的な主体として、家計・企業ともう一つは？",
        choices: [
            "政府",
            "裁判所",
            "政党",
            "学校"
        ],
        answer: "政府"
    },

    {
        question: "商品やサービスを購入して消費する主体は？",
        choices: [
            "家計",
            "企業",
            "政府",
            "銀行"
        ],
        answer: "家計"
    },

    {
        question: "商品やサービスを生産し、販売する主体は？",
        choices: [
            "企業",
            "家計",
            "裁判所",
            "学校"
        ],
        answer: "企業"
    },

    {
        question: "家計が企業などに提供するものとして代表的なものは？",
        choices: [
            "労働力",
            "法律",
            "裁判",
            "選挙"
        ],
        answer: "労働力"
    },

    {
        question: "商品やサービスの価格が、需要と供給によって決まる経済の仕組みを何という？",
        choices: [
            "市場経済",
            "計画経済",
            "封建制度",
            "直接民主制"
        ],
        answer: "市場経済"
    },

    {
        question: "ある価格で買いたい人が多いほど大きくなるものは？",
        choices: [
            "需要",
            "供給",
            "税金",
            "利益"
        ],
        answer: "需要"
    },

    {
        question: "企業が商品を売ろうとして市場に出す量を何という？",
        choices: [
            "供給",
            "需要",
            "消費",
            "貯蓄"
        ],
        answer: "供給"
    },

    {
        question: "一般に、需要が増加すると価格はどうなる傾向がある？",
        choices: [
            "上がる",
            "下がる",
            "必ず0円になる",
            "変化しない"
        ],
        answer: "上がる"
    },

    {
        question: "一般に、供給が増加すると価格はどうなる傾向がある？",
        choices: [
            "下がる",
            "上がる",
            "必ず2倍になる",
            "必ず変化しない"
        ],
        answer: "下がる"
    },

    {
        question: "需要量と供給量が一致する価格を何という？",
        choices: [
            "均衡価格",
            "定価",
            "原価",
            "公定価格"
        ],
        answer: "均衡価格"
    },

    {
        question: "企業が商品やサービスを生産するために必要な費用を何という？",
        choices: [
            "費用",
            "売上",
            "税収",
            "配当"
        ],
        answer: "費用"
    },

    {
        question: "企業の売上から費用を差し引いたものを何という？",
        choices: [
            "利益",
            "需要",
            "税金",
            "賃金"
        ],
        answer: "利益"
    },

    {
        question: "企業がよりよい商品をつくろうと競争することを何という？",
        choices: [
            "企業間競争",
            "地方自治",
            "三権分立",
            "国民投票"
        ],
        answer: "企業間競争"
    },

    {
        question: "一つの企業が市場をほぼ独占している状態を何という？",
        choices: [
            "独占",
            "競争",
            "均衡",
            "分業"
        ],
        answer: "独占"
    },

    {
        question: "少数の企業が市場を支配している状態を何という？",
        choices: [
            "寡占",
            "独占",
            "自由競争",
            "分業"
        ],
        answer: "寡占"
    },

    {
        question: "企業が株式を発行して資金を集める会社を何という？",
        choices: [
            "株式会社",
            "合同政府",
            "地方公共団体",
            "協同組合"
        ],
        answer: "株式会社"
    },

    {
        question: "株式会社が発行し、株主が保有するものは？",
        choices: [
            "株式",
            "国債",
            "税金",
            "紙幣"
        ],
        answer: "株式"
    },

    {
        question: "株式会社に出資している人を何という？",
        choices: [
            "株主",
            "消費者",
            "納税者",
            "裁判官"
        ],
        answer: "株主"
    },

    {
        question: "株主が会社の利益の一部として受け取るものを何という？",
        choices: [
            "配当",
            "賃金",
            "税金",
            "利子"
        ],
        answer: "配当"
    },

    {
        question: "銀行などからお金を借りることを何という？",
        choices: [
            "借入",
            "出資",
            "納税",
            "消費"
        ],
        answer: "借入"
    },

    {
        question: "銀行にお金を預けることを何という？",
        choices: [
            "預金",
            "借入",
            "投資",
            "納税"
        ],
        answer: "預金"
    },

    {
        question: "お金を貸し借りするときに、その対価として支払われるものを何という？",
        choices: [
            "利子",
            "配当",
            "賃金",
            "税金"
        ],
        answer: "利子"
    },

    {
        question: "日本銀行は日本の中央銀行として、何を発行する？",
        choices: [
            "銀行券",
            "株式",
            "国債だけ",
            "商品券"
        ],
        answer: "銀行券"
    },

    {
        question: "日本銀行が行う、通貨の量や金利などを調整する政策を何という？",
        choices: [
            "金融政策",
            "財政政策",
            "外交政策",
            "教育政策"
        ],
        answer: "金融政策"
    },

    {
        question: "政府が税金を集めたり、公共事業などにお金を使ったりする活動を何という？",
        choices: [
            "財政",
            "金融",
            "貿易",
            "消費"
        ],
        answer: "財政"
    },

    {
        question: "政府の収入の中心となるものは？",
        choices: [
            "税金",
            "株式",
            "賃金",
            "配当"
        ],
        answer: "税金"
    },

    {
        question: "所得の多い人ほど高い税率を負担する仕組みを何という？",
        choices: [
            "累進課税",
            "比例課税",
            "消費税",
            "関税"
        ],
        answer: "累進課税"
    },

    {
        question: "商品やサービスの購入時にかかる税を何という？",
        choices: [
            "消費税",
            "所得税",
            "法人税",
            "相続税"
        ],
        answer: "消費税"
    },

    {
        question: "個人の所得にかかる代表的な国税は？",
        choices: [
            "所得税",
            "住民税",
            "消費税",
            "固定資産税"
        ],
        answer: "所得税"
    },

    {
        question: "企業の所得にかかる代表的な国税は？",
        choices: [
            "法人税",
            "所得税",
            "消費税",
            "住民税"
        ],
        answer: "法人税"
    },

    {
        question: "国や地方公共団体が道路や学校などにお金を使うことを何という？",
        choices: [
            "公共支出",
            "民間消費",
            "輸入",
            "預金"
        ],
        answer: "公共支出"
    },

    {
        question: "景気が悪くなり、企業の生産や消費が減少する状態を何という？",
        choices: [
            "不況",
            "好況",
            "インフレーション",
            "独占"
        ],
        answer: "不況"
    },

    {
        question: "景気がよくなり、生産や消費が活発になる状態を何という？",
        choices: [
            "好況",
            "不況",
            "デフレーション",
            "恐慌"
        ],
        answer: "好況"
    },

    {
        question: "物価が継続的に上昇する現象を何という？",
        choices: [
            "インフレーション",
            "デフレーション",
            "不況",
            "円高"
        ],
        answer: "インフレーション"
    },

    {
        question: "物価が継続的に下落する現象を何という？",
        choices: [
            "デフレーション",
            "インフレーション",
            "好況",
            "円安"
        ],
        answer: "デフレーション"
    },

    {
        question: "働いて得る収入を一般に何という？",
        choices: [
            "賃金",
            "配当",
            "利子",
            "税金"
        ],
        answer: "賃金"
    },

    {
        question: "企業が労働者に支払う賃金などの費用を何という？",
        choices: [
            "人件費",
            "税収",
            "配当",
            "利子"
        ],
        answer: "人件費"
    },

    {
        question: "国内で生産された財やサービスの付加価値の合計を表す指標は？",
        choices: [
            "GDP",
            "GNP",
            "CPI",
            "NPO"
        ],
        answer: "GDP"
    },

    {
        question: "GDPを日本語でいうと？",
        choices: [
            "国内総生産",
            "国民総所得",
            "国内総所得",
            "国民総生産"
        ],
        answer: "国内総生産"
    },

    {
        question: "外国から商品を買うことを何という？",
        choices: [
            "輸入",
            "輸出",
            "生産",
            "消費"
        ],
        answer: "輸入"
    },

    {
        question: "外国に商品を売ることを何という？",
        choices: [
            "輸出",
            "輸入",
            "消費",
            "投資"
        ],
        answer: "輸出"
    },

    {
        question: "輸出額から輸入額を差し引いたものを何という？",
        choices: [
            "貿易収支",
            "財政収支",
            "家計収支",
            "企業収支"
        ],
        answer: "貿易収支"
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
                            "経済",

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