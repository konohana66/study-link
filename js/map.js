const stages = [

{
title:"📗 正負の数",
href="stage.html"
unlock:true,
star:5
},

{
title:"✏️ 文字式",
page:"expression.html",
unlock: localStorage.getItem("expression_unlock") === "true",
star:0
},

{
title:"🟰 方程式",
page:"",
unlock:false,
star:0
},

{
title:"📈 比例・反比例",
page:"",
unlock:false,
star:0
}

];

const mapList = document.getElementById("mapList");

stages.forEach(stage=>{

    mapList.innerHTML += `

    <a
        href="${stage.unlock ? stage.page : '#'}"
        class="card"
        style="${stage.unlock ? '' : 'opacity:.5;pointer-events:none;'}"
    >

    <h2>${stage.unlock ? "🟢" : "🔒"} ${stage.title}</h2>

    <p>${"⭐".repeat(stage.star)}</p>

    </a>

    `;

});