const stageInfo = document.getElementById("stageInfo");
const stageTitle = document.getElementById("stageTitle");
const stageDescription = document.getElementById("stageDescription");
const questionCount = document.getElementById("questionCount");
const clearCondition = document.getElementById("clearCondition");
const bestScore = document.getElementById("bestScore");
const startBtn = document.getElementById("startBtn");
const stage1Clear =
localStorage.getItem("stage1Clear") === "true";

let selectedStage = null;

// ステージ情報
const stages = {

stage1: {
    name: "Stage1",
    description: "加法",
    questions: 10,
    clear: 8,
    unlocked: true,
    page: "stage1.html"
},

stage2: {
    name: "Stage2",
    description: "減法",
    questions: 10,
    clear: 8,
    unlocked: stage1Clear,
    page: "stage2.html"
},

stage3: {
    name: "Stage3",
    description: "加法・減法の混合",
    unlocked: false
},

stage4: {
    name: "Stage4",
    description: "乗法・除法",
    unlocked: false
},

stage5: {
    name: "Stage5",
    description: "応用",
    unlocked: false
},

boss: {
    name: "BOSS",
    description: "WORLD1 BOSS",
    unlocked: false,
    page: "boss.html"
},

extra: {
    name: "EXTRA",
    description: "WORLD1 EXTRA",
    unlocked: false,
    page: "extra.html"
},

};

// ボタン設定
Object.keys(stages).forEach(id => {

    const btn = document.getElementById(id);
    const stage = stages[id];

    btn.onclick = () => {

        stageTitle.textContent = stage.name;

stageDescription.textContent = stage.description;
questionCount.textContent = `📚 問題数：${stage.questions}問`;

clearCondition.textContent = `🏆 クリア条件：${stage.clear}問以上正解`;

const best = Number(localStorage.getItem(`${id}Best`)) || 0;

bestScore.textContent = `🏅 BEST：${best} / ${stage.questions}`;

        stageInfo.classList.remove("hide");

        if(stage.unlocked){

            startBtn.disabled = false;
            startBtn.textContent = "▶ START";
            selectedStage = stage.page;

        }else{

            startBtn.disabled = true;
            startBtn.textContent = "🔒 LOCK";
            selectedStage = null;

        }

    };

});

// STARTボタン
startBtn.onclick = () => {

    if(selectedStage){

        location.href = selectedStage;

    }

};

if(stage1Clear){

    document.getElementById("stage1").textContent = "✅ Stage1";

    document.getElementById("stage2").textContent = "⭐ Stage2";

}

// パネル外をクリックで閉じる
document.addEventListener("click",(e)=>{

    if(
        !stageInfo.contains(e.target) &&
        !e.target.classList.contains("stage")
    ){

        stageInfo.classList.add("hide");

    }

});