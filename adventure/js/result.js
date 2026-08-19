const stage = localStorage.getItem("resultStage");

const score = Number(localStorage.getItem(`${stage}Score`));

document.getElementById("score").textContent =
`正解数：${score} / 10`;

let rank = "";

if(score === 10){

    rank = "🏆 S";

}else if(score >= 9){

    rank = "🥇 A";

}else if(score >= 8){

    rank = "🥈 B";

}else if(score >= 6){

    rank = "🥉 C";

}else{

    rank = "📚 D";

}

document.getElementById("rank").textContent =
`ランク：${rank}`;

document.getElementById("nextBtn").onclick = ()=>{

    location.href="world1.html";

};
const xp = Number(localStorage.getItem("resultXP")) || 0;
const coin = Number(localStorage.getItem("resultCoin")) || 0;

document.getElementById("xp").textContent =
`⭐ 獲得XP：+${xp}`;

document.getElementById("coin").textContent =
`🪙 獲得Coin：+${coin}`;