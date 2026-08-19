const question = document.getElementById("question");
const choices = document.getElementById("choices");
const result = document.getElementById("result");
const params = new URLSearchParams(location.search);
const stage = Number(params.get("stage")) || 1;

let currentQuestion = 0;
let score = 0;
let seconds = 0;
let timer;
let quiz = [...(quizzes[stage] || [])];

let currentQuestion = 0;
let score = 0;
let seconds = 0;
let timer;

const params = new URLSearchParams(location.search);
const stage = Number(params.get("stage")) || 1;

let quiz = [];

async function loadQuestions() {

    const response = await fetch(`data/math/stage${stage}.json`);

    quiz = await response.json();

    shuffle(quiz);

    if (quiz.length > 10) {
        quiz = quiz.slice(0, 10);
    }

    startTimer();
    showQuestion();

}

loadQuestions();

// 配列をシャッフル
function shuffle(array){

    for(let i = array.length - 1; i > 0; i--){

        const j = Math.floor(Math.random() * (i + 1));

        [array[i], array[j]] = [array[j], array[i]];

    }

}

// 問題をシャッフルして10問選ぶ
shuffle(quiz);

quiz.splice(10);

function showQuestion(){

    const q = quiz[currentQuestion];

    question.textContent = q.question;

    document.getElementById("count").textContent =
    `問題 ${currentQuestion + 1} / ${quiz.length}`;

    choices.innerHTML = "";
    result.innerHTML = "";

    const choicesData = q.choices.map((choice, index) => ({
        text: choice,
        correct: index === q.answer
    }));

    shuffle(choicesData);

    choicesData.forEach(item => {

        const button = document.createElement("button");

        button.className = "card answer";

        button.textContent = item.text;

        button.onclick = () => checkAnswer(item.correct);

        choices.appendChild(button);

    });

}

function checkAnswer(correct){

    if(correct){

        score++;

        result.innerHTML="⭕ 正解！";

    }else{

        result.innerHTML="❌ 不正解";

    }

    setTimeout(()=>{

        currentQuestion++;

        if(currentQuestion < quiz.length){

            showQuestion();

        }else{

            finishQuiz();

        }

    },700);

}

function finishQuiz(){

    localStorage.setItem("daily_clearQuiz","true");

    clearInterval(timer);

    let rank = "";

if(score === quiz.length && seconds <= 20){

    rank = "🌈 SS";

}else if(score === quiz.length && seconds <= 30){

    rank = "🥇 S";

}else if(score >= 9){

    rank = "🥈 A";

}else if(score >= 7){

    rank = "🥉 B";

}else{

    rank = "😊 C";

}

const progress = Number(localStorage.getItem("math_stage")) || 0;

if(score === quiz.length && progress < stage){

    localStorage.setItem("math_stage", stage);

}

if(score === quiz.length){

    localStorage.setItem("daily_perfect","true");

}

let xp = 0;
let point = 0;

switch(rank){

    case "🌈 SS":
        xp = 250;
        point = 150;
        break;

    case "🥇 S":
        xp = 180;
        point = 100;
        break;

    case "🥈 A":
        xp = 120;
        point = 70;
        break;

    case "🥉 B":
        xp = 80;
        point = 40;
        break;

    default:
        xp = 50;
        point = 20;

}

const beforeLevel = Math.floor(
    (Number(localStorage.getItem("xp")) || 0) / 100
) + 1;

let totalXP = Number(localStorage.getItem("xp")) || 0;
let totalPoint = Number(localStorage.getItem("point")) || 0;

totalXP += xp;
totalPoint += point;

localStorage.setItem("xp", totalXP);
localStorage.setItem("point", totalPoint);

const afterLevel = Math.floor(totalXP / 100) + 1;

let levelUpMessage = "";

if(afterLevel > beforeLevel){

    levelUpMessage = `
    <h2 style="color:gold;">🎉 LEVEL UP!!</h2>
    <h3>Lv.${afterLevel}になった！</h3>
    `;

}

const min = String(Math.floor(seconds/60)).padStart(2,"0");
const sec = String(seconds%60).padStart(2,"0");

const progress = Number(localStorage.getItem("math_stage")) || 0;

if(score === quiz.length && progress < stage){

    localStorage.setItem("math_stage", stage);

}

document.body.innerHTML=`

<div class="container">

<h1>🎉 結果</h1>

${levelUpMessage}

<div class="card">

<h2>${score} / ${quiz.length}問正解！</h2>

<h1>${rank}ランク</h1>

<p>⏱️ ${min}:${sec}</p>

<p>⭐ +${xp} XP</p>

<p>💎 +${point} pt</p>

<hr>

<p>合計XP：${totalXP}</p>

<p>合計ポイント：${totalPoint}</p>

</div>

<a href="math.html?stage=${stage}" class="card">
もう一度挑戦
</a>

<a href="study.html" class="card">
ホームへ
</a>

</div>

`;

}

function startTimer(){

    timer = setInterval(()=>{

        seconds++;

        const min = String(Math.floor(seconds/60)).padStart(2,"0");
        const sec = String(seconds%60).padStart(2,"0");

        document.getElementById("timer").textContent =
        `⏱️ ${min}:${sec}`;

    },1000);

}

function getLevel(xp){

    return Math.floor(xp / 100) + 1;

}
loadQuestions();