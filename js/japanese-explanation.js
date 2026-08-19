// ====================
// Study Link
// 国語：説明文
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
// 説明文問題
// 中1レベル
// ====================

const questionTemplates = [

    {
        question:
            "説明文では、筆者が最も伝えたいことを何という？",

        choices: [
            "要旨",
            "登場人物",
            "場面",
            "会話"
        ],

        answer: "要旨"
    },

    {
        question:
            "文章の中で、筆者の考えや意見を表している部分を何という？",

        choices: [
            "筆者の主張",
            "登場人物",
            "情景",
            "会話文"
        ],

        answer: "筆者の主張"
    },

    {
        question:
            "「つまり」という言葉の後には、どのような内容が続くことが多い？",

        choices: [
            "それまでの内容のまとめ",
            "全く関係のない話",
            "登場人物の会話",
            "新しい登場人物"
        ],

        answer: "それまでの内容のまとめ"
    },

    {
        question:
            "「しかし」という接続語が表す関係は？",

        choices: [
            "逆接",
            "順接",
            "並列",
            "例示"
        ],

        answer: "逆接"
    },

    {
        question:
            "「だから」という接続語が表す関係は？",

        choices: [
            "因果・順接",
            "逆接",
            "並列",
            "対比"
        ],

        answer: "因果・順接"
    },

    {
        question:
            "説明文で、具体的な例を挙げる主な目的は？",

        choices: [
            "内容を分かりやすくするため",
            "文章を長くするため",
            "話を変えるため",
            "筆者を登場させるため"
        ],

        answer: "内容を分かりやすくするため"
    },

    {
        question:
            "「例えば」という言葉の後には、どのような内容が続く？",

        choices: [
            "具体例",
            "結論だけ",
            "反対意見だけ",
            "あいさつ"
        ],

        answer: "具体例"
    },

    {
        question:
            "説明文で、あるものと別のものの違いを明らかにすることを何という？",

        choices: [
            "対比",
            "引用",
            "要約",
            "描写"
        ],

        answer: "対比"
    },

    {
        question:
            "「一方」という言葉は、文章の中で何を示すことが多い？",

        choices: [
            "対比",
            "原因",
            "具体例",
            "結論"
        ],

        answer: "対比"
    },

    {
        question:
            "文章の内容を短くまとめることを何という？",

        choices: [
            "要約",
            "対比",
            "引用",
            "描写"
        ],

        answer: "要約"
    },

    {
        question:
            "筆者の考えを読み取るとき、特に注目するとよいものは？",

        choices: [
            "筆者の主張",
            "文字の大きさだけ",
            "段落の数だけ",
            "句読点の数"
        ],

        answer: "筆者の主張"
    },

    {
        question:
            "説明文の段落には、段落ごとの中心となる内容がある。この中心となる内容を何という？",

        choices: [
            "中心文",
            "会話文",
            "引用文",
            "題名"
        ],

        answer: "中心文"
    },

    {
        question:
            "文章中の「これ」「それ」などが何を指しているかを考える問題を何という？",

        choices: [
            "指示語の問題",
            "漢字の問題",
            "文法の問題",
            "作文の問題"
        ],

        answer: "指示語の問題"
    },

    {
        question:
            "「このように」という指示語は、何を指すことが多い？",

        choices: [
            "前に述べた内容",
            "必ず題名",
            "必ず筆者の名前",
            "後ろの段落だけ"
        ],

        answer: "前に述べた内容"
    },

    {
        question:
            "説明文で、筆者の主張を支えるために示される具体的な事実や数字などを何という？",

        choices: [
            "根拠",
            "題名",
            "登場人物",
            "情景"
        ],

        answer: "根拠"
    },

    {
        question:
            "「なぜなら」という言葉の後には、何が続くことが多い？",

        choices: [
            "理由",
            "結論",
            "具体例だけ",
            "あいさつ"
        ],

        answer: "理由"
    },

    {
        question:
            "「そのため」という言葉は、前の内容とどのような関係を示す？",

        choices: [
            "原因と結果",
            "逆接",
            "並列",
            "対比"
        ],

        answer: "原因と結果"
    },

    {
        question:
            "説明文を読むとき、段落ごとの内容を整理することは何のため？",

        choices: [
            "文章全体の構成をつかむため",
            "文字数を数えるため",
            "漢字を覚えるためだけ",
            "文章を長くするため"
        ],

        answer: "文章全体の構成をつかむため"
    },

    {
        question:
            "文章の最初に問題を提示し、その後に説明や答えを述べる構成を何と考えられる？",

        choices: [
            "問題提起と説明",
            "会話だけの構成",
            "物語の構成",
            "詩の構成"
        ],

        answer: "問題提起と説明"
    },

    {
        question:
            "説明文で筆者が自分の考えを述べる部分は？",

        choices: [
            "主張",
            "具体例",
            "引用",
            "題名"
        ],

        answer: "主張"
    },

    {
        question:
            "「たとえば」「具体的には」などの表現が示すものは？",

        choices: [
            "具体例",
            "結論",
            "反対意見",
            "原因"
        ],

        answer: "具体例"
    },

    {
        question:
            "文章の最後で、それまでの内容をまとめて筆者の考えを示すことがある。この部分は何にあたる？",

        choices: [
            "結論",
            "具体例",
            "引用",
            "題名"
        ],

        answer: "結論"
    },

    {
        question:
            "説明文で「AとB」を比べて違いを分かりやすくする方法は？",

        choices: [
            "対比",
            "要約",
            "引用",
            "反復"
        ],

        answer: "対比"
    },

    {
        question:
            "本文中の言葉をそのまま使って答えることを何という？",

        choices: [
            "本文から抜き出す",
            "自由作文",
            "要約する",
            "想像する"
        ],

        answer: "本文から抜き出す"
    },

    {
        question:
            "説明文の読解で「なぜですか」と聞かれたら、何を答える？",

        choices: [
            "理由",
            "人物",
            "場所",
            "題名"
        ],

        answer: "理由"
    },

    {
        question:
            "説明文の読解で「どのようなことですか」と聞かれた場合、何に注意する？",

        choices: [
            "本文の内容を具体的に説明する",
            "自分の好きなことを書く",
            "題名だけを書く",
            "筆者の名前を書く"
        ],

        answer: "本文の内容を具体的に説明する"
    },

    {
        question:
            "説明文で、筆者の主張とそれを支える理由や事実の関係を何と考えればよい？",

        choices: [
            "主張と根拠",
            "題名と人物",
            "会話と場面",
            "漢字と読み"
        ],

        answer: "主張と根拠"
    },

    {
        question:
            "文章を読むとき、接続語に注目すると何が分かりやすくなる？",

        choices: [
            "文と文の関係",
            "漢字の書き順",
            "筆者の年齢",
            "文字の大きさ"
        ],

        answer: "文と文の関係"
    },

    {
        question:
            "「つまり」「要するに」などの言葉が示すものは？",

        choices: [
            "まとめ",
            "具体例",
            "逆接",
            "原因"
        ],

        answer: "まとめ"
    },

    {
        question:
            "説明文で大切なのは、文章中の情報をもとに筆者の考えを読み取ること。これを何という？",

        choices: [
            "読解",
            "暗唱",
            "作文",
            "書写"
        ],

        answer: "読解"
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
                            "説明文",

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