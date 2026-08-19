let currentQuestion = 0;
let score = 0;

const question = document.getElementById("question");
const answers = document.getElementById("answers");
const current = document.getElementById("current");
const total = document.getElementById("total");
const message = document.getElementById("message");

const quiz = createQuiz(10);

total.textContent = quiz.length;

function createQuiz(count){

    const quiz = [];
    const used = new Set();

    while(quiz.length < count){

        const a = Math.floor(Math.random() * 41) - 20;
        const b = Math.floor(Math.random() * 41) - 20;

        const isPlus = Math.random() < 0.5;

        const key = `${a}${isPlus ? "+" : "-"}${b}`;

        if(used.has(key)) continue;

        used.add(key);

        const answer = isPlus ? a + b : a - b;

        const choices = [answer];

// 間違い候補
const wrongAnswers = [

    -answer,      // 符号ミス

    a + b,        // 加法と勘違い

    -(a - b),     // 全部逆符号

    answer + 1,

    answer - 1,

    answer + 2,

    answer - 2

];

// シャッフル
choices.sort(() => Math.random() - 0.5);

        while(choices.length < 4){

    const wrong =
        wrongAnswers[Math.floor(Math.random() * wrongAnswers.length)];

    if(!choices.includes(wrong)){

        choices.push(wrong);

    }

}

        choices.sort(() => Math.random() - 0.5);

        quiz.push({

            question:`${a} ${isPlus ? "+" : "-"} (${b})`,

            choices:choices.map(String),

            answer:choices.indexOf(answer)

        });

    }

    return quiz;

}

showQuestion();

function showQuestion(){

    current.textContent = currentQuestion + 1;

    const q = quiz[currentQuestion];

    const choices = q.choices
    .map((choice, index) => ({
        choice,
        correct: index === q.answer
    }))
    .sort(() => Math.random() - 0.5);

    question.textContent = q.question;

    answers.innerHTML = "";

    choices.forEach((item)=>{

    const button = document.createElement("button");

    button.className = "answer";

    button.textContent = item.choice;

    // 正解かどうかを保存
    button.dataset.correct = item.correct;

    button.onclick = ()=>checkAnswer(item.correct, button);

    answers.appendChild(button);

});

}

function checkAnswer(correct, clickedButton){

    const buttons = document.querySelectorAll(".answer");

    buttons.forEach(button=>{

        button.disabled = true;

        // 正解のボタンを緑にする
        if(button.dataset.correct === "true"){

            button.style.background = "#4CAF50";
            button.style.color = "white";

        }

    });

    if(correct){

        score++;

        message.textContent = "⭕ 正解！";
        message.style.color = "lime";

    }else{

        // 間違えて押したボタンを赤にする
        clickedButton.style.background = "#f44336";
        clickedButton.style.color = "white";

        message.textContent = "❌ 不正解！";
        message.style.color = "red";

    }

    setTimeout(()=>{

        message.textContent = "";

        currentQuestion++;

        if(currentQuestion >= quiz.length){

            finish();

        }else{

            showQuestion();

        }

    },800);

}

function finish(){
const xp = score * 10;
const coin = score * 5;
// 今回獲得した分を保存
localStorage.setItem("resultXP", xp);
localStorage.setItem("resultCoin", coin);
    console.log("score =", score);

    localStorage.setItem("stage3Score",score);

    const totalXP = Number(localStorage.getItem("xp")) || 0;
const totalCoin = Number(localStorage.getItem("coin")) || 0;

localStorage.setItem("xp", totalXP + xp);
localStorage.setItem("coin", totalCoin + coin);

console.log("xp =", xp);
console.log("coin =", coin);
console.log("保存後coin =", localStorage.getItem("coin"));

    const best = Number(localStorage.getItem("stage3Best")) || 0;

if(score > best){

    localStorage.setItem("stage3Best",score);

}

    if(score >= 8){

        localStorage.setItem("stage3Clear","true");

    }

    localStorage.setItem("resultStage", "stage3");
location.href = "result.html";
}