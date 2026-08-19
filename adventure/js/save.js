const saveData = JSON.parse(localStorage.getItem("studyAdventure")) || {

    world1: {
        stage1: true,
        stage2: false,
        stage3: false,
        stage4: false,
        stage5: false,
        boss: false,
        extra: false
    },

    exp: 0,
    coins: 0

};

function saveGame() {
    localStorage.setItem("studyAdventure", JSON.stringify(saveData));
}