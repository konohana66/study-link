// ====================
// Study Link
// 国語：物語文
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
// 物語文問題
// 中1レベル
// ====================

const questionTemplates = [

    {
        question:
            "物語の中で、出来事が起こる場所や時間などを何という？",

        choices: [
            "場面設定",
            "筆者の主張",
            "要旨",
            "段落"
        ],

        answer: "場面設定"
    },

    {
        question:
            "物語の中心となって行動する人物を何という？",

        choices: [
            "主人公",
            "筆者",
            "読者",
            "語り手"
        ],

        answer: "主人公"
    },

    {
        question:
            "物語の登場人物の気持ちを読み取るとき、特に注目するとよいものは？",

        choices: [
            "行動や言葉",
            "文字の数",
            "題名の長さ",
            "段落の数"
        ],

        answer: "行動や言葉"
    },

    {
        question:
            "登場人物の気持ちが変化したきっかけを考えるとき、何に注目するとよい？",

        choices: [
            "出来事や他の人物との関わり",
            "文字の大きさ",
            "ページ数",
            "題名だけ"
        ],

        answer: "出来事や他の人物との関わり"
    },

    {
        question:
            "物語の中で、登場人物が実際に話している言葉を何という？",

        choices: [
            "会話文",
            "説明文",
            "要約",
            "筆者の主張"
        ],

        answer: "会話文"
    },

    {
        question:
            "「うれしそうに笑った」という表現から読み取れるものは？",

        choices: [
            "人物の気持ち",
            "場所",
            "時間",
            "作者の名前"
        ],

        answer: "人物の気持ち"
    },

    {
        question:
            "登場人物の表情や動作などから気持ちを読み取ることを何と考えればよい？",

        choices: [
            "心情を読み取る",
            "要約する",
            "比較する",
            "引用する"
        ],

        answer: "心情を読み取る"
    },

    {
        question:
            "物語の出来事が起こった順番を整理することは、何を理解するのに役立つ？",

        choices: [
            "物語の展開",
            "漢字の読み方",
            "筆者の名前",
            "文字数"
        ],

        answer: "物語の展開"
    },

    {
        question:
            "物語の中で、最初の状態から最後の状態までに起こる出来事の流れを何という？",

        choices: [
            "展開",
            "要旨",
            "主張",
            "引用"
        ],

        answer: "展開"
    },

    {
        question:
            "登場人物同士の関係を読み取るとき、何に注目するとよい？",

        choices: [
            "会話や行動",
            "文字の大きさ",
            "段落の数だけ",
            "題名の文字数"
        ],

        answer: "会話や行動"
    },

    {
        question:
            "物語の最後に書かれている出来事は、物語全体を理解するうえでどうするべき？",

        choices: [
            "前の出来事とのつながりを考える",
            "必ず無視する",
            "題名だけを見る",
            "最初の文だけ読む"
        ],

        answer: "前の出来事とのつながりを考える"
    },

    {
        question:
            "「うつむいた」という行動から読み取れる可能性が高い人物の様子は？",

        choices: [
            "落ち込んでいる",
            "大喜びしている",
            "眠っている",
            "走っている"
        ],

        answer: "落ち込んでいる"
    },

    {
        question:
            "「思わず笑顔になった」という表現から読み取れる気持ちは？",

        choices: [
            "喜び",
            "怒り",
            "恐怖",
            "悲しみ"
        ],

        answer: "喜び"
    },

    {
        question:
            "「拳を強く握った」という行動から、人物のどのような気持ちが読み取れることがある？",

        choices: [
            "悔しさや怒り",
            "眠気",
            "安心",
            "無関心"
        ],

        answer: "悔しさや怒り"
    },

    {
        question:
            "物語の中で、人物の気持ちが大きく変化する出来事を何と考えればよい？",

        choices: [
            "心情の転換点",
            "題名",
            "段落",
            "引用"
        ],

        answer: "心情の転換点"
    },

    {
        question:
            "物語の題名を考えるとき、何を意識するとよい？",

        choices: [
            "物語全体の内容や中心となる出来事",
            "文字数だけ",
            "最初の一文だけ",
            "登場人物の人数だけ"
        ],

        answer: "物語全体の内容や中心となる出来事"
    },

    {
        question:
            "登場人物がある出来事をきっかけに成長した場合、その変化を何と考える？",

        choices: [
            "人物の変化",
            "場面設定",
            "引用",
            "要旨"
        ],

        answer: "人物の変化"
    },

    {
        question:
            "「胸がどきどきした」という表現から読み取れる可能性がある気持ちは？",

        choices: [
            "緊張や不安",
            "完全な安心",
            "退屈",
            "眠気"
        ],

        answer: "緊張や不安"
    },

    {
        question:
            "物語の中で、ある人物の気持ちを中心に描くことを何と考えればよい？",

        choices: [
            "心情描写",
            "説明",
            "要約",
            "比較"
        ],

        answer: "心情描写"
    },

    {
        question:
            "「涙をぬぐった」という行動から読み取れる可能性がある気持ちは？",

        choices: [
            "悲しみ",
            "喜びだけ",
            "怒りだけ",
            "眠気"
        ],

        answer: "悲しみ"
    },

    {
        question:
            "物語の中で、人物の考えていることを表した部分を何という？",

        choices: [
            "内面・心情",
            "場面設定",
            "題名",
            "会話文"
        ],

        answer: "内面・心情"
    },

    {
        question:
            "物語の出来事と人物の気持ちを結びつけて考えることが大切なのはなぜ？",

        choices: [
            "人物の行動や変化の理由を理解できるから",
            "文字数を数えられるから",
            "題名を覚えられるから",
            "漢字を書けるから"
        ],

        answer: "人物の行動や変化の理由を理解できるから"
    },

    {
        question:
            "物語で「そのとき」「翌朝」などの表現に注目すると何が分かる？",

        choices: [
            "時間の変化",
            "人物の名前",
            "筆者の主張",
            "文章の要旨"
        ],

        answer: "時間の変化"
    },

    {
        question:
            "物語で「公園で」「教室に」などの表現に注目すると何が分かる？",

        choices: [
            "場所",
            "心情",
            "主張",
            "要旨"
        ],

        answer: "場所"
    },

    {
        question:
            "人物の気持ちを答える問題では、本文に書かれている事実をもとに考えることが大切である。これは正しい？",

        choices: [
            "正しい",
            "正しくない",
            "題名だけで決める",
            "自分の経験だけで決める"
        ],

        answer: "正しい"
    },

    {
        question:
            "物語の中で、主人公が最初と最後で変化している場合、何に注目するとよい？",

        choices: [
            "考え方や行動の変化",
            "文字数",
            "ページ数",
            "題名の長さ"
        ],

        answer: "考え方や行動の変化"
    },

    {
        question:
            "「しかし」という言葉が物語中に出てきた場合、前後の内容について何に注目するとよい？",

        choices: [
            "内容の変化や対比",
            "漢字の読み方だけ",
            "登場人物の人数",
            "ページ数"
        ],

        answer: "内容の変化や対比"
    },

    {
        question:
            "物語の場面が変わったとき、何を整理すると読みやすくなる？",

        choices: [
            "場所・時間・登場人物",
            "文字数だけ",
            "漢字だけ",
            "題名だけ"
        ],

        answer: "場所・時間・登場人物"
    },

    {
        question:
            "物語の読解で「なぜこの行動をしたのか」と聞かれたら、何を考える？",

        choices: [
            "人物の気持ちや理由",
            "題名の意味だけ",
            "文字数",
            "作者の年齢"
        ],

        answer: "人物の気持ちや理由"
    },

    {
        question:
            "物語の読解で最も大切なのは、本文のどのような情報を結びつけること？",

        choices: [
            "出来事・行動・会話・心情",
            "文字数・ページ数・題名",
            "漢字だけ",
            "句読点だけ"
        ],

        answer: "出来事・行動・会話・心情"
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

            // 正解を緑にする

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
                            "物語文",

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