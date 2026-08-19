// ====================
// Study Link
// 社会：歴史・中世
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
// 中世 問題
// ====================

const questionTemplates = [

    {
        question: "日本で最初の本格的な武士の政権である鎌倉幕府を開いた人物は？",
        choices: [
            "源頼朝",
            "平清盛",
            "足利尊氏",
            "徳川家康"
        ],
        answer: "源頼朝"
    },

    {
        question: "源頼朝が征夷大将軍に任命されたのは何年？",
        choices: [
            "1192年",
            "1185年",
            "1221年",
            "1333年"
        ],
        answer: "1192年"
    },

    {
        question: "鎌倉幕府が置かれた場所は？",
        choices: [
            "鎌倉",
            "京都",
            "奈良",
            "大阪"
        ],
        answer: "鎌倉"
    },

    {
        question: "将軍と主従関係を結び、将軍のために軍役などを行った武士を何という？",
        choices: [
            "御家人",
            "公家",
            "農民",
            "大名"
        ],
        answer: "御家人"
    },

    {
        question: "将軍が御家人に土地を与えたり、土地の支配を認めたりすることを何という？",
        choices: [
            "御恩",
            "奉公",
            "下剋上",
            "守護"
        ],
        answer: "御恩"
    },

    {
        question: "御家人が将軍のために軍役などを果たすことを何という？",
        choices: [
            "奉公",
            "御恩",
            "院政",
            "荘園"
        ],
        answer: "奉公"
    },

    {
        question: "鎌倉幕府が国ごとに置いた軍事・警察を担当する役職は？",
        choices: [
            "守護",
            "地頭",
            "関白",
            "執権"
        ],
        answer: "守護"
    },

    {
        question: "鎌倉幕府が荘園や公領に置き、年貢の取り立てなどを行わせた役職は？",
        choices: [
            "地頭",
            "守護",
            "執権",
            "管領"
        ],
        answer: "地頭"
    },

    {
        question: "鎌倉幕府で将軍を補佐し、政治の実権を握った役職は？",
        choices: [
            "執権",
            "守護",
            "地頭",
            "管領"
        ],
        answer: "執権"
    },

    {
        question: "執権として鎌倉幕府の政治を行った北条氏の政治を何という？",
        choices: [
            "執権政治",
            "摂関政治",
            "院政",
            "幕藩体制"
        ],
        answer: "執権政治"
    },

    {
        question: "1221年、後鳥羽上皇が鎌倉幕府を倒そうとして起こした戦いは？",
        choices: [
            "承久の乱",
            "応仁の乱",
            "保元の乱",
            "平治の乱"
        ],
        answer: "承久の乱"
    },

    {
        question: "承久の乱の後、幕府が京都に置いた朝廷の監視機関は？",
        choices: [
            "六波羅探題",
            "鎌倉府",
            "京都所司代",
            "評定衆"
        ],
        answer: "六波羅探題"
    },

    {
        question: "1232年に北条泰時が制定した武士のための法律は？",
        choices: [
            "御成敗式目",
            "大宝律令",
            "武家諸法度",
            "十七条の憲法"
        ],
        answer: "御成敗式目"
    },

    {
        question: "13世紀、モンゴル帝国を築いた人物は？",
        choices: [
            "チンギス・ハン",
            "フビライ・ハン",
            "アレクサンドロス",
            "ナポレオン"
        ],
        answer: "チンギス・ハン"
    },

    {
        question: "元を建国し、中国を支配した人物は？",
        choices: [
            "フビライ・ハン",
            "チンギス・ハン",
            "李世民",
            "朱元璋"
        ],
        answer: "フビライ・ハン"
    },

    {
        question: "フビライ・ハンが日本に攻めてきた出来事を何という？",
        choices: [
            "元寇",
            "日宋貿易",
            "倭寇",
            "応仁の乱"
        ],
        answer: "元寇"
    },

    {
        question: "1274年の元の襲来を何という？",
        choices: [
            "文永の役",
            "弘安の役",
            "承久の乱",
            "文禄の役"
        ],
        answer: "文永の役"
    },

    {
        question: "1281年の元の襲来を何という？",
        choices: [
            "弘安の役",
            "文永の役",
            "承久の乱",
            "慶長の役"
        ],
        answer: "弘安の役"
    },

    {
        question: "元寇の際、元軍が使用した武器として知られるものは？",
        choices: [
            "てつはう",
            "火縄銃",
            "日本刀",
            "大砲"
        ],
        answer: "てつはう"
    },

    {
        question: "鎌倉時代に広まった仏教のうち、法然が開いた宗派は？",
        choices: [
            "浄土宗",
            "浄土真宗",
            "日蓮宗",
            "曹洞宗"
        ],
        answer: "浄土宗"
    },

    {
        question: "親鸞が開いた仏教の宗派は？",
        choices: [
            "浄土真宗",
            "浄土宗",
            "日蓮宗",
            "時宗"
        ],
        answer: "浄土真宗"
    },

    {
        question: "日蓮が開いた仏教の宗派は？",
        choices: [
            "日蓮宗",
            "浄土宗",
            "曹洞宗",
            "時宗"
        ],
        answer: "日蓮宗"
    },

    {
        question: "栄西が日本に伝えた仏教の宗派は？",
        choices: [
            "臨済宗",
            "曹洞宗",
            "浄土宗",
            "日蓮宗"
        ],
        answer: "臨済宗"
    },

    {
        question: "道元が開いた仏教の宗派は？",
        choices: [
            "曹洞宗",
            "臨済宗",
            "浄土真宗",
            "時宗"
        ],
        answer: "曹洞宗"
    },

    {
        question: "1333年に滅亡した幕府は？",
        choices: [
            "鎌倉幕府",
            "室町幕府",
            "江戸幕府",
            "平氏政権"
        ],
        answer: "鎌倉幕府"
    },

    {
        question: "鎌倉幕府を倒す中心となった天皇は？",
        choices: [
            "後醍醐天皇",
            "後鳥羽上皇",
            "聖武天皇",
            "桓武天皇"
        ],
        answer: "後醍醐天皇"
    },

    {
        question: "1333年、鎌倉幕府が滅亡した後に始まった政治を何という？",
        choices: [
            "建武の新政",
            "摂関政治",
            "院政",
            "執権政治"
        ],
        answer: "建武の新政"
    },

    {
        question: "室町幕府を開いた人物は？",
        choices: [
            "足利尊氏",
            "足利義満",
            "源頼朝",
            "北条泰時"
        ],
        answer: "足利尊氏"
    },

    {
        question: "室町幕府が置かれた場所は？",
        choices: [
            "京都",
            "鎌倉",
            "奈良",
            "江戸"
        ],
        answer: "京都"
    },

    {
        question: "室町幕府の3代将軍は誰？",
        choices: [
            "足利義満",
            "足利尊氏",
            "足利義政",
            "足利義昭"
        ],
        answer: "足利義満"
    },

    {
        question: "足利義満が京都に建てた代表的な建物は？",
        choices: [
            "金閣",
            "銀閣",
            "平等院鳳凰堂",
            "東大寺"
        ],
        answer: "金閣"
    },

    {
        question: "足利義政が京都に建てた代表的な建物は？",
        choices: [
            "銀閣",
            "金閣",
            "大阪城",
            "姫路城"
        ],
        answer: "銀閣"
    },

    {
        question: "室町時代に、中国の明と行われた貿易は？",
        choices: [
            "日明貿易",
            "南蛮貿易",
            "日宋貿易",
            "朱印船貿易"
        ],
        answer: "日明貿易"
    },

    {
        question: "日明貿易で、正式な貿易船であることを証明するために使われた札は？",
        choices: [
            "勘合",
            "朱印状",
            "御教書",
            "起請文"
        ],
        answer: "勘合"
    },

    {
        question: "1467年に始まり、戦国時代のきっかけとなった戦乱は？",
        choices: [
            "応仁の乱",
            "承久の乱",
            "元寇",
            "関ヶ原の戦い"
        ],
        answer: "応仁の乱"
    },

    {
        question: "応仁の乱の後、各地で勢力を強めた武将を何という？",
        choices: [
            "戦国大名",
            "御家人",
            "公家",
            "関白"
        ],
        answer: "戦国大名"
    },

    {
        question: "下の身分の者が上の身分の者を倒して勢力を伸ばす風潮を何という？",
        choices: [
            "下剋上",
            "御恩と奉公",
            "鎖国",
            "参勤交代"
        ],
        answer: "下剋上"
    },

    {
        question: "室町時代に農民が自治的に運営した地域組織を何という？",
        choices: [
            "惣",
            "座",
            "株仲間",
            "五人組"
        ],
        answer: "惣"
    },

    {
        question: "室町時代に、商工業者などが作った同業者組合を何という？",
        choices: [
            "座",
            "惣",
            "五人組",
            "株仲間"
        ],
        answer: "座"
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
                            "社会",

                        unit:
                            "中世",

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