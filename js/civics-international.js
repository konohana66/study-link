// ====================
// Study Link
// 公民：国際社会
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
        question: "国際社会を構成する基本的な主体は？",
        choices: [
            "主権国家",
            "地方公共団体",
            "企業だけ",
            "学校"
        ],
        answer: "主権国家"
    },

    {
        question: "国家が他国から干渉されず、自ら政治を決定する権利を何という？",
        choices: [
            "主権",
            "基本的人権",
            "参政権",
            "請願権"
        ],
        answer: "主権"
    },

    {
        question: "国際社会の平和と安全を維持することを目的として設立された国際機関は？",
        choices: [
            "国際連合",
            "EU",
            "ASEAN",
            "G7"
        ],
        answer: "国際連合"
    },

    {
        question: "国際連合の本部が置かれている都市は？",
        choices: [
            "ニューヨーク",
            "東京",
            "パリ",
            "ロンドン"
        ],
        answer: "ニューヨーク"
    },

    {
        question: "国際連合の安全保障理事会で、常任理事国が持っている権利は？",
        choices: [
            "拒否権",
            "選挙権",
            "請願権",
            "解散権"
        ],
        answer: "拒否権"
    },

    {
        question: "国際連合の総会は、原則として何で構成されている？",
        choices: [
            "すべての加盟国",
            "常任理事国だけ",
            "G7加盟国だけ",
            "EU加盟国だけ"
        ],
        answer: "すべての加盟国"
    },

    {
        question: "国際連合の安全保障理事会の主な役割は？",
        choices: [
            "国際の平和と安全の維持",
            "世界の通貨を発行すること",
            "各国の学校を運営すること",
            "各国の選挙を行うこと"
        ],
        answer: "国際の平和と安全の維持"
    },

    {
        question: "国際連合の専門機関の一つで、教育・科学・文化の発展を目的とする機関は？",
        choices: [
            "ユネスコ（UNESCO）",
            "WHO",
            "WTO",
            "IMF"
        ],
        answer: "ユネスコ（UNESCO）"
    },

    {
        question: "世界の人々の健康の向上を目的とする国際機関は？",
        choices: [
            "WHO",
            "UNESCO",
            "WTO",
            "UNICEF"
        ],
        answer: "WHO"
    },

    {
        question: "世界の子どもたちの支援などを行う国際機関は？",
        choices: [
            "UNICEF",
            "IMF",
            "WTO",
            "IAEA"
        ],
        answer: "UNICEF"
    },

    {
        question: "国際的な貿易のルールづくりを行う国際機関は？",
        choices: [
            "WTO",
            "WHO",
            "UNESCO",
            "UNICEF"
        ],
        answer: "WTO"
    },

    {
        question: "国際的な通貨・金融の安定などに関わる国際機関は？",
        choices: [
            "IMF",
            "WHO",
            "UNESCO",
            "UNICEF"
        ],
        answer: "IMF"
    },

    {
        question: "第二次世界大戦後、国際平和を実現するために1945年に設立された組織は？",
        choices: [
            "国際連合",
            "EU",
            "ASEAN",
            "NATO"
        ],
        answer: "国際連合"
    },

    {
        question: "日本国憲法の基本原則の一つで、戦争を放棄することを定めているものは？",
        choices: [
            "平和主義",
            "国民主権",
            "基本的人権の尊重",
            "地方自治"
        ],
        answer: "平和主義"
    },

    {
        question: "日本国憲法第9条で、日本が放棄しているものは？",
        choices: [
            "戦争",
            "外交",
            "貿易",
            "国際協力"
        ],
        answer: "戦争"
    },

    {
        question: "国際社会で国家間の紛争を話し合いによって解決することを何という？",
        choices: [
            "平和的解決",
            "武力行使",
            "経済制裁",
            "軍拡"
        ],
        answer: "平和的解決"
    },

    {
        question: "国家間の争いを法律に基づいて解決する国際連合の主要機関は？",
        choices: [
            "国際司法裁判所",
            "安全保障理事会",
            "総会",
            "経済社会理事会"
        ],
        answer: "国際司法裁判所"
    },

    {
        question: "国際社会の平和を脅かす問題の一つは？",
        choices: [
            "紛争や戦争",
            "文化交流",
            "国際協力",
            "貿易"
        ],
        answer: "紛争や戦争"
    },

    {
        question: "国際社会で国と国との交流や交渉を行うことを何という？",
        choices: [
            "外交",
            "地方自治",
            "内政",
            "司法"
        ],
        answer: "外交"
    },

    {
        question: "日本が国際社会の平和と発展のために行う活動の一つは？",
        choices: [
            "国際協力",
            "鎖国",
            "軍事的孤立",
            "貿易の禁止"
        ],
        answer: "国際協力"
    },

    {
        question: "発展途上国などの経済・社会の発展を支援することを何という？",
        choices: [
            "政府開発援助（ODA）",
            "GDP",
            "GNP",
            "FTA"
        ],
        answer: "政府開発援助（ODA）"
    },

    {
        question: "国際協力を行う民間の非営利組織を何という？",
        choices: [
            "NGO",
            "GDP",
            "WTO",
            "IMF"
        ],
        answer: "NGO"
    },

    {
        question: "国際的な課題として、地球温暖化などの問題を何という？",
        choices: [
            "地球環境問題",
            "地方自治問題",
            "国内政治問題",
            "選挙問題"
        ],
        answer: "地球環境問題"
    },

    {
        question: "地球温暖化の主な原因の一つとされる温室効果ガスは？",
        choices: [
            "二酸化炭素",
            "酸素",
            "窒素",
            "水素"
        ],
        answer: "二酸化炭素"
    },

    {
        question: "持続可能な社会の実現を目指して国連が掲げている目標は？",
        choices: [
            "SDGs",
            "GDP",
            "WTO",
            "ODA"
        ],
        answer: "SDGs"
    },

    {
        question: "SDGsは何の略？",
        choices: [
            "持続可能な開発目標",
            "世界貿易目標",
            "国際平和目標",
            "世界経済目標"
        ],
        answer: "持続可能な開発目標"
    },

    {
        question: "世界の貧困や飢餓をなくすことは、国際社会のどのような課題？",
        choices: [
            "人権・開発の課題",
            "地方自治の課題",
            "国内選挙の課題",
            "司法制度の課題"
        ],
        answer: "人権・開発の課題"
    },

    {
        question: "国際社会で人権を守ることが重要なのはなぜ？",
        choices: [
            "すべての人の尊厳を守るため",
            "国家間の競争をなくすためだけ",
            "貿易を禁止するため",
            "国境をなくすため"
        ],
        answer: "すべての人の尊厳を守るため"
    },

    {
        question: "国際社会で国家同士が協力することが必要な理由は？",
        choices: [
            "一国だけでは解決できない問題があるから",
            "すべての国を同じ国にするため",
            "国境をなくすため",
            "国内政治をなくすため"
        ],
        answer: "一国だけでは解決できない問題があるから"
    },

    {
        question: "EUは何を目指してヨーロッパの国々が協力している組織？",
        choices: [
            "政治・経済などの統合",
            "世界の軍事統一",
            "アジアの統一",
            "国連の廃止"
        ],
        answer: "政治・経済などの統合"
    },

    {
        question: "ASEANは主にどの地域の国々による地域協力機構？",
        choices: [
            "東南アジア",
            "西ヨーロッパ",
            "北アメリカ",
            "南アメリカ"
        ],
        answer: "東南アジア"
    },

    {
        question: "国際社会における相互依存とはどのようなこと？",
        choices: [
            "国同士が互いに影響を受けながら関係を持つこと",
            "すべての国が独立して交流しないこと",
            "一つの国が他国を支配すること",
            "国際協力を禁止すること"
        ],
        answer: "国同士が互いに影響を受けながら関係を持つこと"
    },

    {
        question: "日本が国際社会で果たす役割として重要なものは？",
        choices: [
            "平和や国際協力への貢献",
            "国際交流の禁止",
            "貿易の停止",
            "外交の放棄"
        ],
        answer: "平和や国際協力への貢献"
    },

    {
        question: "国際社会で多くの国が協力して問題を解決することを何という？",
        choices: [
            "国際協調",
            "孤立主義",
            "鎖国",
            "独裁"
        ],
        answer: "国際協調"
    },

    {
        question: "国際社会の平和を守るために重要な考え方は？",
        choices: [
            "対話と協力",
            "武力による解決だけ",
            "他国との交流を断つこと",
            "国際機関をなくすこと"
        ],
        answer: "対話と協力"
    },

    {
        question: "世界の国々が共通して取り組む必要がある問題の一つは？",
        choices: [
            "気候変動",
            "学校の校則",
            "地方議会の議員選挙",
            "国内の部活動"
        ],
        answer: "気候変動"
    },

    {
        question: "国際社会で難民問題が生じる原因の一つは？",
        choices: [
            "戦争や紛争",
            "文化交流",
            "国際協力",
            "観光"
        ],
        answer: "戦争や紛争"
    },

    {
        question: "国際社会で文化や価値観の違いを尊重することが重要なのはなぜ？",
        choices: [
            "互いに理解し、共存するため",
            "すべての文化を一つにするため",
            "外国との交流をなくすため",
            "国境をなくすため"
        ],
        answer: "互いに理解し、共存するため"
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
                            "国際社会",

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