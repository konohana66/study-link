const stageList = document.getElementById("stageList");

const progress = Number(localStorage.getItem("math_stage")) || 0;

for(let i = 1; i <= 5; i++){

    const unlock = progress >= i - 1;

    stageList.innerHTML += `
    <a
        class="card"
        href="${unlock ? `play.html?stage=${i}` : "#"}"
        style="${unlock ? "" : "opacity:.5;pointer-events:none;"}"
    >
        ${unlock ? "🟢" : "🔒"} Stage ${i}
    </a>
    `;
}

const bossUnlock = progress >= 5;

stageList.innerHTML += `
<a
    class="card"
    href="${bossUnlock ? "boss.html" : "#"}"
    style="${bossUnlock ? "" : "opacity:.5;pointer-events:none;"}"
>
👑 BOSS
</a>
`;