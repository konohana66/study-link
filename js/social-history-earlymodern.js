// ====================
// Study Link
// 社会：歴史・近世
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
// 近世 問題
// ====================

const questionTemplates = [

    {
        question: "1543年、ポルトガル人によって日本に伝えられた武器は？",
        choices: [
            "鉄砲",
            "大砲",
            "弓",
            "日本刀"
        ],
        answer: "鉄砲"
    },

    {
        question: "1543年に鉄砲が伝わったとされる島は？",
        choices: [
            "種子島",
            "淡路島",
            "佐渡島",
            "対馬"
        ],
        answer: "種子島"
    },

    {
        question: "キリスト教を日本に伝えた人物は？",
        choices: [
            "フランシスコ・ザビエル",
            "ルイス・フロイス",
            "マルコ・ポーロ",
            "鑑真"
        ],
        answer: "フランシスコ・ザビエル"
    },

    {
        question: "キリスト教が日本に伝わったのは何年？",
        choices: [
            "1549年",
            "1543年",
            "1600年",
            "1573年"
        ],
        answer: "1549年"
    },

    {
        question: "織田信長が今川義元を破った戦いは？",
        choices: [
            "桶狭間の戦い",
            "長篠の戦い",
            "関ヶ原の戦い",
            "山崎の戦い"
        ],
        answer: "桶狭間の戦い"
    },

    {
        question: "織田信長が鉄砲を効果的に使って武田軍を破った戦いは？",
        choices: [
            "長篠の戦い",
            "桶狭間の戦い",
            "関ヶ原の戦い",
            "川中島の戦い"
        ],
        answer: "長篠の戦い"
    },

    {
        question: "織田信長が商工業を発展させるために行った政策は？",
        choices: [
            "楽市・楽座",
            "参勤交代",
            "鎖国",
            "刀狩"
        ],
        answer: "楽市・楽座"
    },

    {
        question: "織田信長を本能寺の変で討った人物は？",
        choices: [
            "明智光秀",
            "豊臣秀吉",
            "徳川家康",
            "石田三成"
        ],
        answer: "明智光秀"
    },

    {
        question: "織田信長の後を継いで天下統一を進めた人物は？",
        choices: [
            "豊臣秀吉",
            "徳川家康",
            "明智光秀",
            "足利義昭"
        ],
        answer: "豊臣秀吉"
    },

    {
        question: "豊臣秀吉が全国の土地の面積や収穫高を調べた政策は？",
        choices: [
            "太閤検地",
            "刀狩",
            "楽市・楽座",
            "検地奉行"
        ],
        answer: "太閤検地"
    },

    {
        question: "豊臣秀吉が農民から武器を取り上げた政策は？",
        choices: [
            "刀狩",
            "太閤検地",
            "兵農分離",
            "参勤交代"
        ],
        answer: "刀狩"
    },

    {
        question: "豊臣秀吉が行った、武士と農民の身分を分ける政策は？",
        choices: [
            "兵農分離",
            "鎖国",
            "参勤交代",
            "楽市・楽座"
        ],
        answer: "兵農分離"
    },

    {
        question: "豊臣秀吉が朝鮮に出兵したことを何という？",
        choices: [
            "文禄・慶長の役",
            "元寇",
            "応仁の乱",
            "承久の乱"
        ],
        answer: "文禄・慶長の役"
    },

    {
        question: "1600年、徳川家康が石田三成らを破った戦いは？",
        choices: [
            "関ヶ原の戦い",
            "長篠の戦い",
            "桶狭間の戦い",
            "大阪の陣"
        ],
        answer: "関ヶ原の戦い"
    },

    {
        question: "1603年に征夷大将軍となり、江戸幕府を開いた人物は？",
        choices: [
            "徳川家康",
            "徳川秀忠",
            "豊臣秀吉",
            "織田信長"
        ],
        answer: "徳川家康"
    },

    {
        question: "江戸幕府が大名を統制するために定めた法令は？",
        choices: [
            "武家諸法度",
            "御成敗式目",
            "十七条の憲法",
            "五箇条の御誓文"
        ],
        answer: "武家諸法度"
    },

    {
        question: "大名を親藩・譜代・外様に分けて配置した江戸幕府の政策の目的は？",
        choices: [
            "幕府の支配を安定させるため",
            "外国との貿易を増やすため",
            "農民を増やすため",
            "キリスト教を広めるため"
        ],
        answer: "幕府の支配を安定させるため"
    },

    {
        question: "大名に江戸と領地を1年おきに行き来させた制度は？",
        choices: [
            "参勤交代",
            "鎖国",
            "五人組",
            "株仲間"
        ],
        answer: "参勤交代"
    },

    {
        question: "江戸幕府がキリスト教を禁止した主な理由の一つは？",
        choices: [
            "幕府の支配を脅かすことを警戒したため",
            "米が不足したため",
            "鉄砲を禁止するため",
            "農業をやめさせるため"
        ],
        answer: "幕府の支配を脅かすことを警戒したため"
    },

    {
        question: "江戸時代にキリスト教徒が起こした大きな反乱は？",
        choices: [
            "島原・天草一揆",
            "応仁の乱",
            "大塩平八郎の乱",
            "承久の乱"
        ],
        answer: "島原・天草一揆"
    },

    {
        question: "江戸時代、幕府が外国との交流を厳しく制限した政策を何という？",
        choices: [
            "鎖国",
            "開国",
            "楽市・楽座",
            "兵農分離"
        ],
        answer: "鎖国"
    },

    {
        question: "鎖国中も日本と貿易を続けたヨーロッパの国は？",
        choices: [
            "オランダ",
            "イギリス",
            "フランス",
            "スペイン"
        ],
        answer: "オランダ"
    },

    {
        question: "鎖国中、オランダとの貿易が行われた場所は？",
        choices: [
            "長崎の出島",
            "横浜",
            "堺",
            "下関"
        ],
        answer: "長崎の出島"
    },

    {
        question: "江戸時代、朝鮮から日本へ派遣された使節を何という？",
        choices: [
            "朝鮮通信使",
            "遣唐使",
            "遣隋使",
            "南蛮人"
        ],
        answer: "朝鮮通信使"
    },

    {
        question: "江戸時代に発達した、町人を中心とする文化を何という？",
        choices: [
            "元禄文化",
            "国風文化",
            "天平文化",
            "化政文化"
        ],
        answer: "元禄文化"
    },

    {
        question: "『奥の細道』を書いた人物は？",
        choices: [
            "松尾芭蕉",
            "井原西鶴",
            "近松門左衛門",
            "本居宣長"
        ],
        answer: "松尾芭蕉"
    },

    {
        question: "『好色一代男』を書いた人物は？",
        choices: [
            "井原西鶴",
            "松尾芭蕉",
            "近松門左衛門",
            "十返舎一九"
        ],
        answer: "井原西鶴"
    },

    {
        question: "人形浄瑠璃の作品を書いた人物として有名なのは？",
        choices: [
            "近松門左衛門",
            "松尾芭蕉",
            "井原西鶴",
            "葛飾北斎"
        ],
        answer: "近松門左衛門"
    },

    {
        question: "江戸時代後期、江戸を中心に発達した文化を何という？",
        choices: [
            "化政文化",
            "元禄文化",
            "天平文化",
            "北山文化"
        ],
        answer: "化政文化"
    },

    {
        question: "『東海道中膝栗毛』を書いた人物は？",
        choices: [
            "十返舎一九",
            "滝沢馬琴",
            "葛飾北斎",
            "歌川広重"
        ],
        answer: "十返舎一九"
    },

    {
        question: "『南総里見八犬伝』を書いた人物は？",
        choices: [
            "滝沢馬琴",
            "十返舎一九",
            "井原西鶴",
            "本居宣長"
        ],
        answer: "滝沢馬琴"
    },

    {
        question: "『富嶽三十六景』を描いた人物は？",
        choices: [
            "葛飾北斎",
            "歌川広重",
            "喜多川歌麿",
            "俵屋宗達"
        ],
        answer: "葛飾北斎"
    },

    {
        question: "『東海道五十三次』を描いた人物は？",
        choices: [
            "歌川広重",
            "葛飾北斎",
            "喜多川歌麿",
            "菱川師宣"
        ],
        answer: "歌川広重"
    },

    {
        question: "江戸時代、農村で農民をまとめる村の代表者を何という？",
        choices: [
            "庄屋",
            "大名",
            "奉行",
            "町人"
        ],
        answer: "庄屋"
    },

    {
        question: "江戸時代、農民が年貢として納めたものの中心は？",
        choices: [
            "米",
            "金",
            "絹",
            "鉄"
        ],
        answer: "米"
    },

    {
        question: "江戸時代に商人や職人が住み、商業が発達した都市を何という？",
        choices: [
            "城下町",
            "宿場町",
            "門前町",
            "港町だけ"
        ],
        answer: "城下町"
    },

    {
        question: "江戸・大阪・京都をまとめて何と呼ぶことがある？",
        choices: [
            "三都",
            "三国",
            "三府",
            "三関"
        ],
        answer: "三都"
    },

    {
        question: "江戸時代、大阪は何と呼ばれた？",
        choices: [
            "天下の台所",
            "日本の首都",
            "東の都",
            "学問の都"
        ],
        answer: "天下の台所"
    },

    {
        question: "享保の改革を行った江戸幕府8代将軍は？",
        choices: [
            "徳川吉宗",
            "徳川家光",
            "徳川綱吉",
            "徳川慶喜"
        ],
        answer: "徳川吉宗"
    },

    {
        question: "寛政の改革を行った老中は？",
        choices: [
            "松平定信",
            "田沼意次",
            "水野忠邦",
            "大久保忠世"
        ],
        answer: "松平定信"
    },

    {
        question: "天保の改革を行った老中は？",
        choices: [
            "水野忠邦",
            "松平定信",
            "田沼意次",
            "徳川吉宗"
        ],
        answer: "水野忠邦"
    },

    {
        question: "江戸時代後期、外国船を打ち払うことを命じた法令は？",
        choices: [
            "異国船打払令",
            "武家諸法度",
            "禁中並公家諸法度",
            "生類憐みの令"
        ],
        answer: "異国船打払令"
    },

    {
        question: "1853年に浦賀に来航したアメリカの使節は？",
        choices: [
            "ペリー",
            "ハリス",
            "ザビエル",
            "マッカーサー"
        ],
        answer: "ペリー"
    },

    {
        question: "1854年、日本とアメリカの間で結ばれた条約は？",
        choices: [
            "日米和親条約",
            "日米修好通商条約",
            "ポーツマス条約",
            "下関条約"
        ],
        answer: "日米和親条約"
    },

    {
        question: "1858年に結ばれた、アメリカとの通商条約は？",
        choices: [
            "日米修好通商条約",
            "日米和親条約",
            "日英同盟",
            "サンフランシスコ平和条約"
        ],
        answer: "日米修好通商条約"
    },

    {
        question: "江戸幕府最後の将軍は？",
        choices: [
            "徳川慶喜",
            "徳川家定",
            "徳川家茂",
            "徳川家光"
        ],
        answer: "徳川慶喜"
    },

    {
        question: "1867年、徳川慶喜が政権を朝廷に返したことを何という？",
        choices: [
            "大政奉還",
            "版籍奉還",
            "廃藩置県",
            "王政復古"
        ],
        answer: "大政奉還"
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
                            "近世",

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