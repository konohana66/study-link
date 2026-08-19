// ====================
// Study Link
// 公民：日本国憲法
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
        question: "日本国憲法が公布されたのは何年？",
        choices: [
            "1946年",
            "1945年",
            "1947年",
            "1951年"
        ],
        answer: "1946年"
    },

    {
        question: "日本国憲法が施行されたのは何年？",
        choices: [
            "1947年",
            "1946年",
            "1950年",
            "1951年"
        ],
        answer: "1947年"
    },

    {
        question: "日本国憲法の基本原理として正しいものはどれ？",
        choices: [
            "国民主権・基本的人権の尊重・平和主義",
            "天皇主権・軍国主義・基本的人権の制限",
            "国民主権・鎖国・軍国主義",
            "天皇主権・平和主義・身分制度"
        ],
        answer: "国民主権・基本的人権の尊重・平和主義"
    },

    {
        question: "日本国憲法で、政治の最終的な決定権が国民にあることを何という？",
        choices: [
            "国民主権",
            "基本的人権の尊重",
            "平和主義",
            "地方自治"
        ],
        answer: "国民主権"
    },

    {
        question: "日本国憲法で、すべての人が生まれながらに持つ権利を保障する考え方は？",
        choices: [
            "基本的人権の尊重",
            "国民主権",
            "平和主義",
            "三権分立"
        ],
        answer: "基本的人権の尊重"
    },

    {
        question: "日本国憲法第9条と深く関係する基本原理は？",
        choices: [
            "平和主義",
            "国民主権",
            "基本的人権の尊重",
            "地方自治"
        ],
        answer: "平和主義"
    },

    {
        question: "日本国憲法では、天皇をどのような存在としている？",
        choices: [
            "日本国の象徴",
            "政治の最高責任者",
            "国会の議長",
            "最高裁判所長官"
        ],
        answer: "日本国の象徴"
    },

    {
        question: "天皇の地位は、何に基づくと日本国憲法に定められている？",
        choices: [
            "主権の存する日本国民の総意",
            "内閣総理大臣の判断",
            "国会議員の投票",
            "最高裁判所の判断"
        ],
        answer: "主権の存する日本国民の総意"
    },

    {
        question: "天皇が行う国事行為には、内閣の何が必要？",
        choices: [
            "助言と承認",
            "選挙",
            "裁判",
            "許可"
        ],
        answer: "助言と承認"
    },

    {
        question: "日本国憲法第9条では、国際紛争を解決する手段として何を永久に放棄すると定めている？",
        choices: [
            "戦争",
            "選挙",
            "外交",
            "裁判"
        ],
        answer: "戦争"
    },

    {
        question: "日本国憲法で保障されている、人間らしく生きるための権利を何という？",
        choices: [
            "社会権",
            "参政権",
            "請求権",
            "自由権"
        ],
        answer: "社会権"
    },

    {
        question: "思想・良心の自由や信教の自由などは、主に何権に分類される？",
        choices: [
            "自由権",
            "社会権",
            "参政権",
            "請求権"
        ],
        answer: "自由権"
    },

    {
        question: "選挙権や被選挙権など、政治に参加する権利を何という？",
        choices: [
            "参政権",
            "社会権",
            "自由権",
            "請求権"
        ],
        answer: "参政権"
    },

    {
        question: "裁判を受ける権利など、国に対して一定の行為を求める権利を何という？",
        choices: [
            "請求権",
            "自由権",
            "社会権",
            "参政権"
        ],
        answer: "請求権"
    },

    {
        question: "日本国憲法第25条で保障されている権利は？",
        choices: [
            "生存権",
            "選挙権",
            "信教の自由",
            "表現の自由"
        ],
        answer: "生存権"
    },

    {
        question: "日本国憲法第26条で保障されている権利と関係が深いものは？",
        choices: [
            "教育を受ける権利",
            "裁判を受ける権利",
            "選挙権",
            "財産権"
        ],
        answer: "教育を受ける権利"
    },

    {
        question: "日本国憲法第27条で定められているものは？",
        choices: [
            "勤労の権利と義務",
            "教育を受ける権利",
            "裁判を受ける権利",
            "選挙権"
        ],
        answer: "勤労の権利と義務"
    },

    {
        question: "日本国憲法第28条で保障されているものは？",
        choices: [
            "労働基本権",
            "信教の自由",
            "参政権",
            "生存権"
        ],
        answer: "労働基本権"
    },

    {
        question: "日本国憲法が保障する基本的人権は、何のために尊重される？",
        choices: [
            "個人の尊重と幸福追求のため",
            "国の利益だけのため",
            "政府の権力を強めるため",
            "法律をなくすため"
        ],
        answer: "個人の尊重と幸福追求のため"
    },

    {
        question: "日本国憲法第13条で保障されている考え方は？",
        choices: [
            "個人の尊重・幸福追求権",
            "勤労の権利",
            "教育を受ける権利",
            "請願権"
        ],
        answer: "個人の尊重・幸福追求権"
    },

    {
        question: "日本国憲法では、すべての国民は法の下に何とされている？",
        choices: [
            "平等",
            "区別",
            "優先",
            "制限"
        ],
        answer: "平等"
    },

    {
        question: "日本国憲法が保障する自由権のうち、自由に意見を発表する自由を何という？",
        choices: [
            "表現の自由",
            "居住・移転の自由",
            "職業選択の自由",
            "信教の自由"
        ],
        answer: "表現の自由"
    },

    {
        question: "宗教を信じるかどうか、どの宗教を信じるかを自由に決める権利は？",
        choices: [
            "信教の自由",
            "表現の自由",
            "学問の自由",
            "職業選択の自由"
        ],
        answer: "信教の自由"
    },

    {
        question: "自分の住む場所を自由に選ぶ権利は？",
        choices: [
            "居住・移転の自由",
            "表現の自由",
            "信教の自由",
            "学問の自由"
        ],
        answer: "居住・移転の自由"
    },

    {
        question: "自分の職業を自由に選ぶ権利は？",
        choices: [
            "職業選択の自由",
            "信教の自由",
            "表現の自由",
            "学問の自由"
        ],
        answer: "職業選択の自由"
    },

    {
        question: "日本国憲法で保障されている、犯罪について裁判を受ける前に有罪とされない原則を何という？",
        choices: [
            "罪刑法定主義",
            "推定無罪",
            "三審制",
            "司法権"
        ],
        answer: "推定無罪"
    },

    {
        question: "基本的人権は、社会全体の利益との関係で一定の制限を受けることがある。この考え方を何という？",
        choices: [
            "公共の福祉",
            "国民主権",
            "地方自治",
            "三権分立"
        ],
        answer: "公共の福祉"
    },

    {
        question: "日本国憲法では、国民にどのような義務が定められている？",
        choices: [
            "教育・勤労・納税",
            "選挙・裁判・外交",
            "兵役・納税・選挙",
            "勤労・裁判・外交"
        ],
        answer: "教育・勤労・納税"
    },

    {
        question: "日本国憲法の改正について最終的に国民が意思を示すのは？",
        choices: [
            "国民投票",
            "住民投票",
            "通常の選挙",
            "裁判"
        ],
        answer: "国民投票"
    },

    {
        question: "憲法改正の発議を行うのは？",
        choices: [
            "国会",
            "内閣",
            "最高裁判所",
            "地方公共団体"
        ],
        answer: "国会"
    },

    {
        question: "日本国憲法は、国の最高法規であると定められている。これを何という？",
        choices: [
            "最高法規性",
            "地方自治",
            "法の支配",
            "国民主権"
        ],
        answer: "最高法規性"
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
        question: "違憲審査権を持つ機関は？",
        choices: [
            "裁判所",
            "国会だけ",
            "内閣だけ",
            "地方議会だけ"
        ],
        answer: "裁判所"
    },

    {
        question: "日本国憲法の基本的人権について、将来の社会の変化に応じて認められてきた権利を何という？",
        choices: [
            "新しい人権",
            "参政権",
            "社会権",
            "請求権"
        ],
        answer: "新しい人権"
    },

    {
        question: "個人の私生活に関する情報をみだりに公開されない権利は？",
        choices: [
            "プライバシーの権利",
            "参政権",
            "請求権",
            "生存権"
        ],
        answer: "プライバシーの権利"
    },

    {
        question: "良好な環境の中で生活することを求める権利として考えられているものは？",
        choices: [
            "環境権",
            "参政権",
            "請求権",
            "社会権"
        ],
        answer: "環境権"
    },

    {
        question: "自分の情報を自分でコントロールすることと関係が深い権利は？",
        choices: [
            "プライバシーの権利",
            "選挙権",
            "生存権",
            "労働基本権"
        ],
        answer: "プライバシーの権利"
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
                            "日本国憲法",

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