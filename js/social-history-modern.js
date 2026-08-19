// ====================
// Study Link
// 社会：歴史・近代
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
// 近代 問題
// ====================

const questionTemplates = [

    {
        question: "1868年に始まった、日本の近代化を進めた大きな政治的変化を何という？",
        choices: [
            "明治維新",
            "大化の改新",
            "建武の新政",
            "享保の改革"
        ],
        answer: "明治維新"
    },

    {
        question: "明治政府が1868年に出した、政治の基本方針を示したものは？",
        choices: [
            "五箇条の御誓文",
            "十七条の憲法",
            "武家諸法度",
            "御成敗式目"
        ],
        answer: "五箇条の御誓文"
    },

    {
        question: "明治政府が藩を廃止して府県を置いた政策は？",
        choices: [
            "廃藩置県",
            "版籍奉還",
            "徴兵令",
            "地租改正"
        ],
        answer: "廃藩置県"
    },

    {
        question: "廃藩置県が行われたのは何年？",
        choices: [
            "1871年",
            "1868年",
            "1873年",
            "1889年"
        ],
        answer: "1871年"
    },

    {
        question: "明治政府が満20歳以上の男子に兵役の義務を課した制度は？",
        choices: [
            "徴兵令",
            "学制",
            "地租改正",
            "版籍奉還"
        ],
        answer: "徴兵令"
    },

    {
        question: "1872年に公布された、近代的な学校制度を定めたものは？",
        choices: [
            "学制",
            "教育勅語",
            "帝国憲法",
            "五箇条の御誓文"
        ],
        answer: "学制"
    },

    {
        question: "明治政府が土地の所有者に地券を発行し、地価をもとに税を納めさせた改革は？",
        choices: [
            "地租改正",
            "廃藩置県",
            "徴兵令",
            "殖産興業"
        ],
        answer: "地租改正"
    },

    {
        question: "明治政府が産業や近代的な工業を発展させようとした政策は？",
        choices: [
            "殖産興業",
            "富国強兵",
            "文明開化",
            "地租改正"
        ],
        answer: "殖産興業"
    },

    {
        question: "「富国強兵」とは、どのような国を目指す考え方？",
        choices: [
            "経済を発展させ軍隊を強くする",
            "農業だけを発展させる",
            "外国との交流をなくす",
            "武士だけの国に戻す"
        ],
        answer: "経済を発展させ軍隊を強くする"
    },

    {
        question: "明治時代に西洋の文化や生活様式が広まったことを何という？",
        choices: [
            "文明開化",
            "国風文化",
            "化政文化",
            "天平文化"
        ],
        answer: "文明開化"
    },

    {
        question: "1877年、西郷隆盛を中心に起こった反乱は？",
        choices: [
            "西南戦争",
            "戊辰戦争",
            "日清戦争",
            "日露戦争"
        ],
        answer: "西南戦争"
    },

    {
        question: "自由民権運動の中心人物の一人は？",
        choices: [
            "板垣退助",
            "伊藤博文",
            "西郷隆盛",
            "大久保利通"
        ],
        answer: "板垣退助"
    },

    {
        question: "1881年に政府が国会を開くことを約束したものは？",
        choices: [
            "国会開設の勅諭",
            "五箇条の御誓文",
            "教育勅語",
            "日米和親条約"
        ],
        answer: "国会開設の勅諭"
    },

    {
        question: "1889年に発布された憲法は？",
        choices: [
            "大日本帝国憲法",
            "日本国憲法",
            "五箇条の御誓文",
            "教育基本法"
        ],
        answer: "大日本帝国憲法"
    },

    {
        question: "大日本帝国憲法が発布されたときの天皇は？",
        choices: [
            "明治天皇",
            "大正天皇",
            "昭和天皇",
            "後醍醐天皇"
        ],
        answer: "明治天皇"
    },

    {
        question: "1890年に初めて開かれた議会は？",
        choices: [
            "帝国議会",
            "国会",
            "貴族院だけ",
            "衆議院だけ"
        ],
        answer: "帝国議会"
    },

    {
        question: "1894年に始まった、日本と清との戦争は？",
        choices: [
            "日清戦争",
            "日露戦争",
            "第一次世界大戦",
            "日中戦争"
        ],
        answer: "日清戦争"
    },

    {
        question: "日清戦争後、日本と清の間で結ばれた条約は？",
        choices: [
            "下関条約",
            "ポーツマス条約",
            "日米修好通商条約",
            "ベルサイユ条約"
        ],
        answer: "下関条約"
    },

    {
        question: "日清戦争後、日本に割譲された地域は？",
        choices: [
            "台湾",
            "朝鮮",
            "樺太全島",
            "香港"
        ],
        answer: "台湾"
    },

    {
        question: "日清戦争後、ロシア・ドイツ・フランスが日本に遼東半島を清へ返すよう求めたことを何という？",
        choices: [
            "三国干渉",
            "日英同盟",
            "三国協商",
            "五・四運動"
        ],
        answer: "三国干渉"
    },

    {
        question: "1902年、日本とイギリスの間で結ばれた同盟は？",
        choices: [
            "日英同盟",
            "日露協約",
            "三国同盟",
            "日米同盟"
        ],
        answer: "日英同盟"
    },

    {
        question: "1904年に始まった、日本とロシアの戦争は？",
        choices: [
            "日露戦争",
            "日清戦争",
            "第一次世界大戦",
            "太平洋戦争"
        ],
        answer: "日露戦争"
    },

    {
        question: "日露戦争後、日本とロシアの間で結ばれた条約は？",
        choices: [
            "ポーツマス条約",
            "下関条約",
            "ベルサイユ条約",
            "サンフランシスコ平和条約"
        ],
        answer: "ポーツマス条約"
    },

    {
        question: "1910年、日本が韓国を併合したことを何という？",
        choices: [
            "韓国併合",
            "満州事変",
            "日韓基本条約",
            "三国干渉"
        ],
        answer: "韓国併合"
    },

    {
        question: "1914年に始まった世界規模の戦争は？",
        choices: [
            "第一次世界大戦",
            "第二次世界大戦",
            "日露戦争",
            "日清戦争"
        ],
        answer: "第一次世界大戦"
    },

    {
        question: "第一次世界大戦後、1919年に結ばれた講和条約は？",
        choices: [
            "ベルサイユ条約",
            "ポーツマス条約",
            "下関条約",
            "サンフランシスコ平和条約"
        ],
        answer: "ベルサイユ条約"
    },

    {
        question: "第一次世界大戦後に設立された国際平和機関は？",
        choices: [
            "国際連盟",
            "国際連合",
            "EU",
            "NATO"
        ],
        answer: "国際連盟"
    },

    {
        question: "1925年に日本で制定された、25歳以上の男子に選挙権を認めた法律は？",
        choices: [
            "普通選挙法",
            "治安維持法",
            "国家総動員法",
            "労働基準法"
        ],
        answer: "普通選挙法"
    },

    {
        question: "1925年に制定された、社会主義運動などを取り締まる法律は？",
        choices: [
            "治安維持法",
            "普通選挙法",
            "徴兵令",
            "教育勅語"
        ],
        answer: "治安維持法"
    },

    {
        question: "1929年に始まった世界的な経済不況を何という？",
        choices: [
            "世界恐慌",
            "石油危機",
            "バブル経済",
            "金融恐慌"
        ],
        answer: "世界恐慌"
    },

    {
        question: "1931年、日本軍が南満州で起こした事件は？",
        choices: [
            "満州事変",
            "盧溝橋事件",
            "五・一五事件",
            "二・二六事件"
        ],
        answer: "満州事変"
    },

    {
        question: "1932年、犬養毅首相が暗殺された事件は？",
        choices: [
            "五・一五事件",
            "二・二六事件",
            "満州事変",
            "関東大震災"
        ],
        answer: "五・一五事件"
    },

    {
        question: "1936年、陸軍の青年将校らが東京で起こした事件は？",
        choices: [
            "二・二六事件",
            "五・一五事件",
            "満州事変",
            "盧溝橋事件"
        ],
        answer: "二・二六事件"
    },

    {
        question: "1937年、日中戦争のきっかけとなった事件は？",
        choices: [
            "盧溝橋事件",
            "満州事変",
            "五・一五事件",
            "二・二六事件"
        ],
        answer: "盧溝橋事件"
    },

    {
        question: "1941年、日本がアメリカなどと戦争を始めたことを何という？",
        choices: [
            "太平洋戦争",
            "日露戦争",
            "日清戦争",
            "第一次世界大戦"
        ],
        answer: "太平洋戦争"
    },

    {
        question: "1945年、日本が受け入れて戦争を終結させた宣言は？",
        choices: [
            "ポツダム宣言",
            "カイロ宣言",
            "大西洋憲章",
            "五箇条の御誓文"
        ],
        answer: "ポツダム宣言"
    },

    {
        question: "1945年に第二次世界大戦が終わった後、日本を占領・統治した連合国軍の組織は？",
        choices: [
            "GHQ",
            "国際連盟",
            "国際連合",
            "NATO"
        ],
        answer: "GHQ"
    },

    {
        question: "1946年に公布され、1947年に施行された憲法は？",
        choices: [
            "日本国憲法",
            "大日本帝国憲法",
            "教育基本法",
            "民法"
        ],
        answer: "日本国憲法"
    },

    {
        question: "日本国憲法が施行されたのは何年？",
        choices: [
            "1947年",
            "1945年",
            "1946年",
            "1950年"
        ],
        answer: "1947年"
    },

    {
        question: "日本国憲法の基本原理の一つで、政治の最終的な決定権が国民にあることを何という？",
        choices: [
            "国民主権",
            "基本的人権の尊重",
            "平和主義",
            "三権分立"
        ],
        answer: "国民主権"
    },

    {
        question: "日本国憲法の基本原理の一つで、戦争を放棄する考え方は？",
        choices: [
            "平和主義",
            "国民主権",
            "基本的人権の尊重",
            "地方自治"
        ],
        answer: "平和主義"
    },

    {
        question: "日本国憲法の基本原理の一つで、人間が生まれながらに持つ権利を大切にする考え方は？",
        choices: [
            "基本的人権の尊重",
            "平和主義",
            "国民主権",
            "三権分立"
        ],
        answer: "基本的人権の尊重"
    },

    {
        question: "1951年、日本と連合国の間で結ばれた講和条約は？",
        choices: [
            "サンフランシスコ平和条約",
            "日米和親条約",
            "ポーツマス条約",
            "ベルサイユ条約"
        ],
        answer: "サンフランシスコ平和条約"
    },

    {
        question: "1956年、日本が加盟した国際組織は？",
        choices: [
            "国際連合",
            "国際連盟",
            "NATO",
            "EU"
        ],
        answer: "国際連合"
    },

    {
        question: "1950年代後半から日本の経済が急速に発展したことを何という？",
        choices: [
            "高度経済成長",
            "世界恐慌",
            "バブル経済",
            "産業革命"
        ],
        answer: "高度経済成長"
    },

    {
        question: "1964年に開催された国際的なスポーツ大会は？",
        choices: [
            "東京オリンピック",
            "大阪万博",
            "札幌オリンピック",
            "長野オリンピック"
        ],
        answer: "東京オリンピック"
    },

    {
        question: "1972年、日本と中国の国交が正常化したことを何という？",
        choices: [
            "日中国交正常化",
            "日韓併合",
            "日米修好通商",
            "日英同盟"
        ],
        answer: "日中国交正常化"
    },

    {
        question: "1972年、日本に返還された地域は？",
        choices: [
            "沖縄",
            "台湾",
            "朝鮮",
            "樺太"
        ],
        answer: "沖縄"
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
                            "近代",

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