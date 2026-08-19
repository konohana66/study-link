// ====================
// Study Link
// 公民：政治
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
        question: "日本の政治の基本的な仕組みとして、権力を立法・行政・司法に分けることを何という？",
        choices: [
            "三権分立",
            "地方自治",
            "基本的人権",
            "国民主権"
        ],
        answer: "三権分立"
    },

    {
        question: "法律をつくる権力を何という？",
        choices: [
            "立法権",
            "行政権",
            "司法権",
            "外交権"
        ],
        answer: "立法権"
    },

    {
        question: "法律に基づいて国の政治を行う権力を何という？",
        choices: [
            "行政権",
            "立法権",
            "司法権",
            "選挙権"
        ],
        answer: "行政権"
    },

    {
        question: "裁判を行う権力を何という？",
        choices: [
            "司法権",
            "立法権",
            "行政権",
            "財政権"
        ],
        answer: "司法権"
    },

    {
        question: "日本の国会は、国権の最高機関であり、唯一の何機関？",
        choices: [
            "立法機関",
            "行政機関",
            "司法機関",
            "外交機関"
        ],
        answer: "立法機関"
    },

    {
        question: "日本の国会を構成する二つの議院は？",
        choices: [
            "衆議院と参議院",
            "上院と下院",
            "地方議会と国会",
            "内閣と裁判所"
        ],
        answer: "衆議院と参議院"
    },

    {
        question: "衆議院議員の任期は何年？",
        choices: [
            "4年",
            "6年",
            "3年",
            "5年"
        ],
        answer: "4年"
    },

    {
        question: "参議院議員の任期は何年？",
        choices: [
            "6年",
            "4年",
            "3年",
            "5年"
        ],
        answer: "6年"
    },

    {
        question: "参議院にはない、衆議院の特徴は？",
        choices: [
            "解散がある",
            "任期が6年である",
            "3年ごとに半数改選される",
            "法律をつくる"
        ],
        answer: "解散がある"
    },

    {
        question: "衆議院の解散後、何日以内に総選挙が行われる？",
        choices: [
            "40日以内",
            "30日以内",
            "50日以内",
            "60日以内"
        ],
        answer: "40日以内"
    },

    {
        question: "参議院議員は、3年ごとに何分の1が改選される？",
        choices: [
            "2分の1",
            "3分の1",
            "4分の1",
            "全員"
        ],
        answer: "2分の1"
    },

    {
        question: "衆議院と参議院の両方に認められている権限は？",
        choices: [
            "法律案の議決",
            "衆議院の解散",
            "内閣総理大臣の指名を必ず単独で決定すること",
            "参議院の緊急集会"
        ],
        answer: "法律案の議決"
    },

    {
        question: "衆議院の優越が認められているものは？",
        choices: [
            "予算の議決",
            "参議院の緊急集会",
            "参議院議員の選挙",
            "最高裁判所裁判官の任命"
        ],
        answer: "予算の議決"
    },

    {
        question: "国会で予算案を最初に審議するのはどちらの議院？",
        choices: [
            "衆議院",
            "参議院",
            "どちらでもよい",
            "最高裁判所"
        ],
        answer: "衆議院"
    },

    {
        question: "内閣の長である人物を何という？",
        choices: [
            "内閣総理大臣",
            "衆議院議長",
            "最高裁判所長官",
            "参議院議長"
        ],
        answer: "内閣総理大臣"
    },

    {
        question: "内閣総理大臣を指名するのは？",
        choices: [
            "国会",
            "内閣",
            "最高裁判所",
            "国民が直接指名する"
        ],
        answer: "国会"
    },

    {
        question: "行政権を担当する機関は？",
        choices: [
            "内閣",
            "国会",
            "裁判所",
            "地方議会"
        ],
        answer: "内閣"
    },

    {
        question: "内閣は、内閣総理大臣と何によって組織される？",
        choices: [
            "国務大臣",
            "裁判官",
            "国会議長",
            "都道府県知事"
        ],
        answer: "国務大臣"
    },

    {
        question: "内閣が国会に対して連帯して責任を負う制度を何という？",
        choices: [
            "議院内閣制",
            "大統領制",
            "三権分立",
            "地方自治"
        ],
        answer: "議院内閣制"
    },

    {
        question: "内閣不信任決議を行うことができるのは？",
        choices: [
            "衆議院",
            "参議院",
            "最高裁判所",
            "地方議会"
        ],
        answer: "衆議院"
    },

    {
        question: "衆議院で内閣不信任決議が可決された場合、内閣は何をしなければならない？",
        choices: [
            "10日以内に衆議院を解散するか、総辞職する",
            "30日以内に参議院を解散する",
            "必ず総辞職する",
            "必ず衆議院議員を辞める"
        ],
        answer: "10日以内に衆議院を解散するか、総辞職する"
    },

    {
        question: "裁判所の頂点に位置する裁判所は？",
        choices: [
            "最高裁判所",
            "高等裁判所",
            "地方裁判所",
            "家庭裁判所"
        ],
        answer: "最高裁判所"
    },

    {
        question: "日本の裁判所は、原則として何回まで裁判を受けられる？",
        choices: [
            "3回",
            "2回",
            "4回",
            "5回"
        ],
        answer: "3回"
    },

    {
        question: "第一審の判決に不服がある場合、上級裁判所に再び審理を求めることを何という？",
        choices: [
            "控訴",
            "上告",
            "請願",
            "告訴"
        ],
        answer: "控訴"
    },

    {
        question: "第二審の判決に不服があり、最高裁判所などに審理を求めることを何という？",
        choices: [
            "上告",
            "控訴",
            "請願",
            "提訴"
        ],
        answer: "上告"
    },

    {
        question: "裁判官が他の国家機関から干渉されずに裁判を行うことを何という？",
        choices: [
            "司法権の独立",
            "国民主権",
            "地方自治",
            "議院内閣制"
        ],
        answer: "司法権の独立"
    },

    {
        question: "法律や命令などが憲法に違反していないかを判断する権限を何という？",
        choices: [
            "違憲審査権",
            "立法権",
            "行政権",
            "外交権"
        ],
        answer: "違憲審査権"
    },

    {
        question: "最高裁判所の裁判官が国民によって審査される制度を何という？",
        choices: [
            "国民審査",
            "国民投票",
            "住民投票",
            "直接請求"
        ],
        answer: "国民審査"
    },

    {
        question: "政治に対する国民の意思を反映させるために行われるものは？",
        choices: [
            "選挙",
            "裁判",
            "行政指導",
            "法律の公布"
        ],
        answer: "選挙"
    },

    {
        question: "一人の有権者が一票を持つ原則を何という？",
        choices: [
            "普通選挙",
            "平等選挙",
            "秘密選挙",
            "直接選挙"
        ],
        answer: "平等選挙"
    },

    {
        question: "一定の年齢に達したすべての国民に選挙権を認める原則を何という？",
        choices: [
            "普通選挙",
            "平等選挙",
            "秘密選挙",
            "直接選挙"
        ],
        answer: "普通選挙"
    },

    {
        question: "誰に投票したかを他人に知られないようにする原則を何という？",
        choices: [
            "秘密選挙",
            "普通選挙",
            "平等選挙",
            "直接選挙"
        ],
        answer: "秘密選挙"
    },

    {
        question: "有権者が代表者を直接選ぶ原則を何という？",
        choices: [
            "直接選挙",
            "普通選挙",
            "秘密選挙",
            "平等選挙"
        ],
        answer: "直接選挙"
    },

    {
        question: "現在の日本で、選挙権が認められる年齢は？",
        choices: [
            "18歳以上",
            "20歳以上",
            "16歳以上",
            "21歳以上"
        ],
        answer: "18歳以上"
    },

    {
        question: "政党とは何を目的とする団体？",
        choices: [
            "政治について共通の考えを持ち、政治を行おうとする団体",
            "裁判だけを行う団体",
            "企業だけでつくられる団体",
            "行政機関そのもの"
        ],
        answer: "政治について共通の考えを持ち、政治を行おうとする団体"
    },

    {
        question: "複数の政党が政権を担当する可能性がある政治の仕組みを何という？",
        choices: [
            "政党政治",
            "独裁政治",
            "軍事政治",
            "封建政治"
        ],
        answer: "政党政治"
    },

    {
        question: "国民が政治について意見を表明する手段として重要なものは？",
        choices: [
            "選挙",
            "裁判官の任命",
            "法律の公布",
            "行政命令"
        ],
        answer: "選挙"
    },

    {
        question: "三権分立の目的として最も適切なものは？",
        choices: [
            "権力の集中を防ぎ、互いに抑制・均衡させること",
            "国会の権力をなくすこと",
            "裁判所をなくすこと",
            "内閣だけに権力を集めること"
        ],
        answer: "権力の集中を防ぎ、互いに抑制・均衡させること"
    },

    {
        question: "国会が内閣総理大臣を指名することは、三権分立におけるどの関係を示している？",
        choices: [
            "立法と行政の関係",
            "行政と司法の関係",
            "司法と地方自治の関係",
            "国会と地方議会の関係"
        ],
        answer: "立法と行政の関係"
    },

    {
        question: "内閣が最高裁判所長官を指名することは、どの権力の関係を示している？",
        choices: [
            "行政と司法",
            "立法と地方自治",
            "司法と立法",
            "地方自治と行政"
        ],
        answer: "行政と司法"
    },

    {
        question: "国会が法律を制定し、内閣がそれを執行するという関係は、どの二つの権力の関係？",
        choices: [
            "立法権と行政権",
            "行政権と司法権",
            "司法権と立法権",
            "地方自治と司法権"
        ],
        answer: "立法権と行政権"
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
                            "政治",

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