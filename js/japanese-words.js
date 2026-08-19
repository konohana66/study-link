// ====================
// Study Link
// 国語：語句・ことわざ
// ====================

const GAS_URL =
    "https://script.google.com/macros/s/AKfycbxdL1vYB2Iv6hpQOTDnvmBaIAChjsxXUvEIQdm9U-TM2hqBPeSGsrkVdJwLVNqN4Mcp/exec";

let currentQuestion = 0;
let score = 0;
let earnedXP = 0;
let questionCount = 0;
let quiz = [];
let studyStartTime = null;


// ====================
// HTML要素
// ====================

const countArea =
    document.getElementById("countArea");

const quizArea =
    document.getElementById("quizArea");

const finishArea =
    document.getElementById("finish");

const progress =
    document.getElementById("progress");

const questionElement =
    document.getElementById("question");

const answersElement =
    document.getElementById("answers");

const resultElement =
    document.getElementById("result");

const scoreElement =
    document.getElementById("score");

const xpResultElement =
    document.getElementById("xpResult");


// ====================
// 語句・ことわざ問題
// 中1レベル
// ====================

const questionTemplates = [

    {
        question: "「頭を冷やす」の意味は？",
        choices: [
            "落ち着いて考える",
            "頭を洗う",
            "眠る",
            "急いで行動する"
        ],
        answer: "落ち着いて考える"
    },

    {
        question: "「耳を疑う」の意味は？",
        choices: [
            "聞いたことが信じられない",
            "耳が痛くなる",
            "大きな声で話す",
            "話を聞かない"
        ],
        answer: "聞いたことが信じられない"
    },

    {
        question: "「胸をなで下ろす」の意味は？",
        choices: [
            "安心する",
            "悲しくなる",
            "怒る",
            "驚く"
        ],
        answer: "安心する"
    },

    {
        question: "「手を焼く」の意味は？",
        choices: [
            "扱いに困る",
            "料理をする",
            "手を温める",
            "努力する"
        ],
        answer: "扱いに困る"
    },

    {
        question: "「口が軽い」の意味は？",
        choices: [
            "秘密などをすぐ人に話す",
            "食べるのが速い",
            "話す声が小さい",
            "口数が少ない"
        ],
        answer: "秘密などをすぐ人に話す"
    },

    {
        question: "「油を売る」の意味は？",
        choices: [
            "仕事を怠けて時間をつぶす",
            "油を買う",
            "料理をする",
            "急いで仕事をする"
        ],
        answer: "仕事を怠けて時間をつぶす"
    },

    {
        question: "「石の上にも三年」の意味は？",
        choices: [
            "辛抱強く続ければ成果が出る",
            "三年間石に座る",
            "石は丈夫である",
            "何事もすぐに終わる"
        ],
        answer: "辛抱強く続ければ成果が出る"
    },

    {
        question: "「急がば回れ」の意味は？",
        choices: [
            "急ぐときほど安全な方法を選ぶ",
            "急いで走る",
            "遠回りは悪い",
            "何でも急いで行う"
        ],
        answer: "急ぐときほど安全な方法を選ぶ"
    },

    {
        question: "「七転び八起き」の意味は？",
        choices: [
            "何度失敗しても立ち直る",
            "七回転んで八回寝る",
            "転ばないようにする",
            "八回成功する"
        ],
        answer: "何度失敗しても立ち直る"
    },

    {
        question: "「猿も木から落ちる」の意味は？",
        choices: [
            "上手な人でも失敗することがある",
            "猿は木に登れない",
            "動物は失敗しない",
            "木は危険である"
        ],
        answer: "上手な人でも失敗することがある"
    },

    {
        question: "「犬も歩けば棒に当たる」の意味は？",
        choices: [
            "行動すると思いがけないことに出会う",
            "犬は棒が好きである",
            "歩くことは危険である",
            "犬は走るのが速い"
        ],
        answer: "行動すると思いがけないことに出会う"
    },

    {
        question: "「塵も積もれば山となる」の意味は？",
        choices: [
            "小さなことも積み重なれば大きなものになる",
            "山は小さい",
            "掃除をすると山ができる",
            "大きなことだけが大切"
        ],
        answer: "小さなことも積み重なれば大きなものになる"
    },

    {
        question: "「井の中の蛙」の意味は？",
        choices: [
            "狭い世界しか知らないこと",
            "水泳が得意な人",
            "井戸を掃除する人",
            "蛙が好きな人"
        ],
        answer: "狭い世界しか知らないこと"
    },

    {
        question: "「灯台下暗し」の意味は？",
        choices: [
            "身近なことはかえって気づきにくい",
            "灯台の近くは明るい",
            "夜は暗い",
            "遠くのものは見えない"
        ],
        answer: "身近なことはかえって気づきにくい"
    },

    {
        question: "「弘法にも筆の誤り」の意味は？",
        choices: [
            "名人でも失敗することがある",
            "字を書くのが苦手",
            "筆は大切である",
            "習字を練習する"
        ],
        answer: "名人でも失敗することがある"
    },

    {
        question: "「一石二鳥」の意味は？",
        choices: [
            "一つの行動で二つの利益を得る",
            "鳥を二羽捕まえる",
            "石を二つ使う",
            "二つのことを別々に行う"
        ],
        answer: "一つの行動で二つの利益を得る"
    },

    {
        question: "「温故知新」の意味は？",
        choices: [
            "昔のことを学んで新しい知識を得る",
            "昔の物を捨てる",
            "新しいものだけを学ぶ",
            "温かいものを知る"
        ],
        answer: "昔のことを学んで新しい知識を得る"
    },

    {
        question: "「異口同音」の意味は？",
        choices: [
            "多くの人が同じことを言う",
            "違う言葉を使う",
            "声が小さい",
            "一人だけが話す"
        ],
        answer: "多くの人が同じことを言う"
    },

    {
        question: "「以心伝心」の意味は？",
        choices: [
            "言葉にしなくても気持ちが通じる",
            "手紙を書く",
            "大声で伝える",
            "心を強くする"
        ],
        answer: "言葉にしなくても気持ちが通じる"
    },

    {
        question: "「百聞は一見にしかず」の意味は？",
        choices: [
            "何度聞くより一度見るほうがよく分かる",
            "百回見ることが大切",
            "話を聞くことが大切",
            "見るより聞くほうがよい"
        ],
        answer: "何度聞くより一度見るほうがよく分かる"
    },

    {
        question: "「臨機応変」の意味は？",
        choices: [
            "その場の状況に応じて適切に対応する",
            "何でも同じ方法で行う",
            "予定を変えない",
            "急いで行動する"
        ],
        answer: "その場の状況に応じて適切に対応する"
    },

    {
        question: "「絶好調」の意味は？",
        choices: [
            "調子がとてもよい",
            "調子が悪い",
            "気分が落ち込む",
            "何もできない"
        ],
        answer: "調子がとてもよい"
    },

    {
        question: "「慎重」の意味は？",
        choices: [
            "注意深く行動すること",
            "急いで行動すること",
            "大声で話すこと",
            "何も考えないこと"
        ],
        answer: "注意深く行動すること"
    },

    {
        question: "「豊富」の意味は？",
        choices: [
            "たくさんあること",
            "ほとんどないこと",
            "古いこと",
            "珍しいこと"
        ],
        answer: "たくさんあること"
    },

    {
        question: "「適切」の意味は？",
        choices: [
            "その場や目的に合っていること",
            "間違っていること",
            "珍しいこと",
            "難しいこと"
        ],
        answer: "その場や目的に合っていること"
    },

    {
        question: "「尊敬」の意味は？",
        choices: [
            "相手をすぐれた人として敬うこと",
            "相手を嫌うこと",
            "相手を無視すること",
            "相手と競争すること"
        ],
        answer: "相手をすぐれた人として敬うこと"
    },

    {
        question: "「努力」の意味は？",
        choices: [
            "目標のために力を尽くすこと",
            "何もしないこと",
            "遊ぶこと",
            "休むこと"
        ],
        answer: "目標のために力を尽くすこと"
    },

    {
        question: "「判断」の意味は？",
        choices: [
            "物事を考えて決めること",
            "物を運ぶこと",
            "話を聞くこと",
            "忘れること"
        ],
        answer: "物事を考えて決めること"
    },

    {
        question: "「解決」の意味は？",
        choices: [
            "問題を解いて片づけること",
            "問題を増やすこと",
            "問題を忘れること",
            "問題を隠すこと"
        ],
        answer: "問題を解いて片づけること"
    },

    {
        question: "「協力」の意味は？",
        choices: [
            "力を合わせて物事を行うこと",
            "一人で行うこと",
            "競争すること",
            "相手を助けないこと"
        ],
        answer: "力を合わせて物事を行うこと"
    }

];


// ====================
// クイズ開始
// ====================

function startQuiz(count) {

    questionCount = count;

    currentQuestion = 0;
    score = 0;
    earnedXP = 0;

    quiz = createQuiz(questionCount);

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

    for (
        let i = 0;
        i < count;
        i++
    ) {

        const template =
            shuffled[
                i % shuffled.length
            ];

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

            if (
                index === correctIndex
            ) {

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
                            "国語",

                        unit:
                            "語句・ことわざ",

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