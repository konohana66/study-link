// ====================
// Study Link
// 公民：労働・社会保障
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
        question: "労働者が企業などで働いて得る報酬を何という？",
        choices: [
            "賃金",
            "配当",
            "利子",
            "税金"
        ],
        answer: "賃金"
    },

    {
        question: "日本国憲法で保障されている、働くことに関する権利は？",
        choices: [
            "勤労の権利",
            "裁判を受ける権利",
            "請願権",
            "参政権"
        ],
        answer: "勤労の権利"
    },

    {
        question: "日本国憲法で保障されている、労働者が団結する権利を何という？",
        choices: [
            "団結権",
            "請願権",
            "財産権",
            "生存権"
        ],
        answer: "団結権"
    },

    {
        question: "労働者が使用者と労働条件について交渉する権利を何という？",
        choices: [
            "団体交渉権",
            "団結権",
            "団体行動権",
            "選挙権"
        ],
        answer: "団体交渉権"
    },

    {
        question: "労働者が団体でストライキなどを行う権利を何という？",
        choices: [
            "団体行動権",
            "団体交渉権",
            "団結権",
            "請願権"
        ],
        answer: "団体行動権"
    },

    {
        question: "団結権・団体交渉権・団体行動権をまとめて何という？",
        choices: [
            "労働三権",
            "基本的人権",
            "社会権",
            "参政権"
        ],
        answer: "労働三権"
    },

    {
        question: "労働者が労働条件を改善するためにつくる団体を何という？",
        choices: [
            "労働組合",
            "政党",
            "地方議会",
            "株式会社"
        ],
        answer: "労働組合"
    },

    {
        question: "労働者と使用者の間で結ばれる労働条件などについての取り決めを何という？",
        choices: [
            "労働協約",
            "条例",
            "法律",
            "予算"
        ],
        answer: "労働協約"
    },

    {
        question: "労働条件の最低基準を定めている法律は？",
        choices: [
            "労働基準法",
            "民法",
            "会社法",
            "地方自治法"
        ],
        answer: "労働基準法"
    },

    {
        question: "労働基準法などの労働関係法令を守ることを監督する機関は？",
        choices: [
            "労働基準監督署",
            "裁判所",
            "国会",
            "市役所"
        ],
        answer: "労働基準監督署"
    },

    {
        question: "すべての労働者に適用される最低賃金を定める制度を何という？",
        choices: [
            "最低賃金制度",
            "累進課税制度",
            "社会保険制度",
            "年金制度"
        ],
        answer: "最低賃金制度"
    },

    {
        question: "労働者の安全や健康を守ることを目的とする法律は？",
        choices: [
            "労働安全衛生法",
            "地方自治法",
            "消費者基本法",
            "教育基本法"
        ],
        answer: "労働安全衛生法"
    },

    {
        question: "性別による差別をなくし、男女が働きやすい環境を整えることを目的とする法律は？",
        choices: [
            "男女雇用機会均等法",
            "労働基準法",
            "地方自治法",
            "民法"
        ],
        answer: "男女雇用機会均等法"
    },

    {
        question: "仕事と生活の調和を意味する言葉は？",
        choices: [
            "ワーク・ライフ・バランス",
            "市場経済",
            "男女共同参画",
            "社会保障"
        ],
        answer: "ワーク・ライフ・バランス"
    },

    {
        question: "病気やけがなどに備えて、医療費の負担を軽くする制度は？",
        choices: [
            "医療保険",
            "年金保険",
            "雇用保険",
            "介護保険"
        ],
        answer: "医療保険"
    },

    {
        question: "高齢になったときなどに生活を支えるための制度は？",
        choices: [
            "年金制度",
            "医療保険",
            "雇用保険",
            "労災保険"
        ],
        answer: "年金制度"
    },

    {
        question: "失業した人の生活を支え、再就職を促す制度は？",
        choices: [
            "雇用保険",
            "医療保険",
            "介護保険",
            "年金保険"
        ],
        answer: "雇用保険"
    },

    {
        question: "仕事中や通勤中の事故などによるけがや病気を補償する制度は？",
        choices: [
            "労災保険",
            "雇用保険",
            "医療保険",
            "年金保険"
        ],
        answer: "労災保険"
    },

    {
        question: "高齢者の介護を社会全体で支える制度は？",
        choices: [
            "介護保険",
            "医療保険",
            "雇用保険",
            "労災保険"
        ],
        answer: "介護保険"
    },

    {
        question: "社会保障制度の目的として最も適切なものは？",
        choices: [
            "国民の生活を支え、生活の安定を図ること",
            "企業の利益だけを増やすこと",
            "税金をなくすこと",
            "選挙をなくすこと"
        ],
        answer: "国民の生活を支え、生活の安定を図ること"
    },

    {
        question: "日本の社会保障制度の4つの柱の一つで、生活に困っている人を公的に支える制度は？",
        choices: [
            "公的扶助",
            "社会保険",
            "社会福祉",
            "公衆衛生"
        ],
        answer: "公的扶助"
    },

    {
        question: "生活に困窮する人に最低限度の生活を保障し、自立を助ける制度は？",
        choices: [
            "生活保護",
            "雇用保険",
            "年金保険",
            "介護保険"
        ],
        answer: "生活保護"
    },

    {
        question: "高齢者や障害者、児童などを支援する制度を何という？",
        choices: [
            "社会福祉",
            "公的扶助",
            "金融政策",
            "財政政策"
        ],
        answer: "社会福祉"
    },

    {
        question: "感染症の予防や健康づくりなど、国民の健康を守る活動を何という？",
        choices: [
            "公衆衛生",
            "社会保険",
            "公的扶助",
            "労働組合"
        ],
        answer: "公衆衛生"
    },

    {
        question: "病気・けが・老後・失業などに備えて保険料を出し合う仕組みを何という？",
        choices: [
            "社会保険",
            "公的扶助",
            "社会福祉",
            "公衆衛生"
        ],
        answer: "社会保険"
    },

    {
        question: "日本国憲法第25条で保障されている権利は？",
        choices: [
            "健康で文化的な最低限度の生活を営む権利",
            "選挙権",
            "財産権",
            "職業選択の自由"
        ],
        answer: "健康で文化的な最低限度の生活を営む権利"
    },

    {
        question: "日本国憲法第25条に関係する権利を何という？",
        choices: [
            "生存権",
            "自由権",
            "参政権",
            "請願権"
        ],
        answer: "生存権"
    },

    {
        question: "社会保障の費用をまかなうために国民が負担するものの一つは？",
        choices: [
            "税金",
            "株式",
            "配当",
            "売上"
        ],
        answer: "税金"
    },

    {
        question: "少子高齢化が進むと、社会保障制度にはどのような課題が生じやすい？",
        choices: [
            "社会保障を支える世代の負担が大きくなる",
            "医療費が必ず0円になる",
            "年金を必要とする人が減る",
            "社会保障制度が不要になる"
        ],
        answer: "社会保障を支える世代の負担が大きくなる"
    },

    {
        question: "労働者の権利を守るために、使用者との対等な交渉を行う組織は？",
        choices: [
            "労働組合",
            "内閣",
            "裁判所",
            "地方議会"
        ],
        answer: "労働組合"
    },

    {
        question: "労働条件について、労働者と使用者が話し合うことを何という？",
        choices: [
            "団体交渉",
            "国民審査",
            "住民投票",
            "直接請求"
        ],
        answer: "団体交渉"
    },

    {
        question: "労働組合が使用者と交渉する際に重要となる権利は？",
        choices: [
            "団体交渉権",
            "選挙権",
            "請願権",
            "財産権"
        ],
        answer: "団体交渉権"
    },

    {
        question: "労働者が仕事を失った場合に、一定の条件で給付を受けられる制度は？",
        choices: [
            "雇用保険",
            "介護保険",
            "労災保険",
            "年金保険"
        ],
        answer: "雇用保険"
    },

    {
        question: "仕事中の事故などによる労働者の損害を補償する制度は？",
        choices: [
            "労災保険",
            "雇用保険",
            "医療保険",
            "介護保険"
        ],
        answer: "労災保険"
    },

    {
        question: "社会保障制度を持続させるために重要なことは？",
        choices: [
            "社会全体で負担と給付のバランスを考えること",
            "社会保障をすべてなくすこと",
            "税金をすべてなくすこと",
            "一部の人だけが負担すること"
        ],
        answer: "社会全体で負担と給付のバランスを考えること"
    },

    {
        question: "労働者と使用者の関係をより対等にするために重要なものは？",
        choices: [
            "労働者の権利の保障",
            "労働者の権利の制限",
            "選挙制度の廃止",
            "地方自治の廃止"
        ],
        answer: "労働者の権利の保障"
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
                            "労働・社会保障",

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