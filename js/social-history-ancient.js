// ====================
// Study Link
// 社会：歴史・古代
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
// 古代 問題
// ====================

const questionTemplates = [

    {
        question: "日本列島で、狩りや採集を中心とした生活が行われていた時代は？",
        choices: [
            "縄文時代",
            "弥生時代",
            "古墳時代",
            "奈良時代"
        ],
        answer: "縄文時代"
    },

    {
        question: "縄文時代の人々が使っていた土器は？",
        choices: [
            "縄文土器",
            "弥生土器",
            "須恵器",
            "土師器"
        ],
        answer: "縄文土器"
    },

    {
        question: "縄文時代の人々が食べ物の残りなどを捨てた場所を何という？",
        choices: [
            "貝塚",
            "古墳",
            "条里",
            "環濠"
        ],
        answer: "貝塚"
    },

    {
        question: "縄文時代に作られた、人の形をした土製の人形は？",
        choices: [
            "土偶",
            "埴輪",
            "銅鐸",
            "勾玉"
        ],
        answer: "土偶"
    },

    {
        question: "米づくりが日本に広まった時代は？",
        choices: [
            "弥生時代",
            "縄文時代",
            "古墳時代",
            "奈良時代"
        ],
        answer: "弥生時代"
    },

    {
        question: "弥生時代に米づくりが盛んに行われた場所は？",
        choices: [
            "水田",
            "牧場",
            "果樹園",
            "畑だけ"
        ],
        answer: "水田"
    },

    {
        question: "弥生時代に使われた土器は？",
        choices: [
            "弥生土器",
            "縄文土器",
            "須恵器",
            "土偶"
        ],
        answer: "弥生土器"
    },

    {
        question: "弥生時代に米づくりとともに大陸から伝わったものとして重要なのは？",
        choices: [
            "青銅器や鉄器",
            "火縄銃",
            "活版印刷",
            "蒸気機関"
        ],
        answer: "青銅器や鉄器"
    },

    {
        question: "弥生時代に、周囲に堀をめぐらせた集落を何という？",
        choices: [
            "環濠集落",
            "城下町",
            "宿場町",
            "門前町"
        ],
        answer: "環濠集落"
    },

    {
        question: "中国の歴史書に登場する、3世紀ごろの日本の女王は？",
        choices: [
            "卑弥呼",
            "推古天皇",
            "持統天皇",
            "紫式部"
        ],
        answer: "卑弥呼"
    },

    {
        question: "卑弥呼が治めたとされる国は？",
        choices: [
            "邪馬台国",
            "大和国",
            "倭国",
            "出雲国"
        ],
        answer: "邪馬台国"
    },

    {
        question: "卑弥呼が魏に使いを送ったことが記されている中国の歴史書は？",
        choices: [
            "魏志倭人伝",
            "漢書地理志",
            "後漢書",
            "日本書紀"
        ],
        answer: "魏志倭人伝"
    },

    {
        question: "大きな墓である古墳が盛んに作られた時代は？",
        choices: [
            "古墳時代",
            "縄文時代",
            "弥生時代",
            "平安時代"
        ],
        answer: "古墳時代"
    },

    {
        question: "日本最大の古墳として知られるものは？",
        choices: [
            "大仙古墳",
            "高松塚古墳",
            "稲荷山古墳",
            "キトラ古墳"
        ],
        answer: "大仙古墳"
    },

    {
        question: "古墳の周りなどに置かれた人物や動物の形をしたものは？",
        choices: [
            "埴輪",
            "土偶",
            "銅鐸",
            "勾玉"
        ],
        answer: "埴輪"
    },

    {
        question: "古墳時代に大きな力を持った豪族を中心とする政権は？",
        choices: [
            "ヤマト政権",
            "幕府",
            "朝廷",
            "江戸幕府"
        ],
        answer: "ヤマト政権"
    },

    {
        question: "大陸から日本に伝わった文化や技術の影響を受けた人々を何と呼ぶ？",
        choices: [
            "渡来人",
            "御家人",
            "武士",
            "公家"
        ],
        answer: "渡来人"
    },

    {
        question: "飛鳥時代に、中国や朝鮮半島から伝わった宗教は？",
        choices: [
            "仏教",
            "キリスト教",
            "イスラム教",
            "儒教だけ"
        ],
        answer: "仏教"
    },

    {
        question: "仏教を日本に広めることに力を入れた人物は？",
        choices: [
            "聖徳太子",
            "聖武天皇",
            "中大兄皇子",
            "藤原道長"
        ],
        answer: "聖徳太子"
    },

    {
        question: "聖徳太子が定めたとされる、役人の心構えを示したものは？",
        choices: [
            "十七条の憲法",
            "御成敗式目",
            "五箇条の御誓文",
            "武家諸法度"
        ],
        answer: "十七条の憲法"
    },

    {
        question: "聖徳太子が、中国の隋に送った使節を何という？",
        choices: [
            "遣隋使",
            "遣唐使",
            "参勤交代",
            "勘合貿易"
        ],
        answer: "遣隋使"
    },

    {
        question: "遣隋使として隋に派遣された人物は？",
        choices: [
            "小野妹子",
            "鑑真",
            "阿倍仲麻呂",
            "最澄"
        ],
        answer: "小野妹子"
    },

    {
        question: "645年に始まった政治改革を何という？",
        choices: [
            "大化の改新",
            "明治維新",
            "享保の改革",
            "建武の新政"
        ],
        answer: "大化の改新"
    },

    {
        question: "大化の改新で中心となった人物の組み合わせは？",
        choices: [
            "中大兄皇子と中臣鎌足",
            "源頼朝と源義経",
            "織田信長と豊臣秀吉",
            "徳川家康と徳川家光"
        ],
        answer: "中大兄皇子と中臣鎌足"
    },

    {
        question: "大化の改新の後、天皇を中心とした国づくりが進められた。このような政治を何という？",
        choices: [
            "中央集権国家",
            "封建制度",
            "幕藩体制",
            "民主政治"
        ],
        answer: "中央集権国家"
    },

    {
        question: "701年に制定された律令は？",
        choices: [
            "大宝律令",
            "御成敗式目",
            "十七条の憲法",
            "武家諸法度"
        ],
        answer: "大宝律令"
    },

    {
        question: "奈良時代に都が置かれた場所は？",
        choices: [
            "平城京",
            "平安京",
            "藤原京",
            "長岡京"
        ],
        answer: "平城京"
    },

    {
        question: "奈良時代に、仏教の力で国を守ろうとした天皇は？",
        choices: [
            "聖武天皇",
            "天智天皇",
            "後醍醐天皇",
            "桓武天皇"
        ],
        answer: "聖武天皇"
    },

    {
        question: "聖武天皇が建立を命じた寺は？",
        choices: [
            "東大寺",
            "法隆寺",
            "金閣寺",
            "延暦寺"
        ],
        answer: "東大寺"
    },

    {
        question: "東大寺にある大仏は何と呼ばれる？",
        choices: [
            "奈良の大仏",
            "鎌倉大仏",
            "阿弥陀仏",
            "釈迦如来"
        ],
        answer: "奈良の大仏"
    },

    {
        question: "奈良時代に完成した、日本最古の歴史書は？",
        choices: [
            "古事記",
            "源氏物語",
            "枕草子",
            "徒然草"
        ],
        answer: "古事記"
    },

    {
        question: "日本書紀が完成したのは何世紀ごろ？",
        choices: [
            "8世紀",
            "5世紀",
            "12世紀",
            "15世紀"
        ],
        answer: "8世紀"
    },

    {
        question: "奈良時代に、唐から日本へ来て仏教を伝えた僧は？",
        choices: [
            "鑑真",
            "空海",
            "最澄",
            "法然"
        ],
        answer: "鑑真"
    },

    {
        question: "平安京に都を移した天皇は？",
        choices: [
            "桓武天皇",
            "聖武天皇",
            "天武天皇",
            "後鳥羽上皇"
        ],
        answer: "桓武天皇"
    },

    {
        question: "平安京に都が移された年は？",
        choices: [
            "794年",
            "710年",
            "645年",
            "1185年"
        ],
        answer: "794年"
    },

    {
        question: "平安時代に発達した、日本風の文化を何という？",
        choices: [
            "国風文化",
            "天平文化",
            "北山文化",
            "東山文化"
        ],
        answer: "国風文化"
    },

    {
        question: "国風文化を代表する文学作品は？",
        choices: [
            "源氏物語",
            "古事記",
            "日本書紀",
            "平家物語"
        ],
        answer: "源氏物語"
    },

    {
        question: "源氏物語を書いた人物は？",
        choices: [
            "紫式部",
            "清少納言",
            "和泉式部",
            "小野小町"
        ],
        answer: "紫式部"
    },

    {
        question: "枕草子を書いた人物は？",
        choices: [
            "清少納言",
            "紫式部",
            "小野小町",
            "和泉式部"
        ],
        answer: "清少納言"
    },

    {
        question: "平安時代に藤原氏が天皇の親戚として政治の実権を握った政治を何という？",
        choices: [
            "摂関政治",
            "院政",
            "執権政治",
            "幕藩政治"
        ],
        answer: "摂関政治"
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
                            "社会",

                        unit:
                            "古代",

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