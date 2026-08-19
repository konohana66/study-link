const worlds = [

{
    id:1,
    name:"🌲 正負の数の森",
    x:18,
    y:77,
    width:130,
    height:130,
    shape:"ellipse",
    unlocked:true
},

{
    id:2,
    name:"🏛 文字の神殿",
    x:49,
    y:82,
    width:100,
    height:100,
    shape:"rect",
    unlocked:false
},

{
    id:3,
    name:"🏰 方程式の城",
    x:51,
    y:49,
    width:130,
    height:130,
    shape:"ellipse",
    unlocked:false
},

{
    id:4,
    name:"🌊 グラフ平原",
    x:20,
    y:30,
    width:150,
    height:120,
    shape:"ellipse",
    unlocked:false
},

{
    id:5,
    name:"🗿 図形遺跡",
    x:84,
    y:61,
    width:130,
    height:130,
    shape:"rect",
    unlocked:false
},

{
    id:6,
    name:"🧪 統計研究所",
    x:83,
    y:27,
    width:120,
    height:120,
    shape:"rect",
    unlocked:false
},

{
    id:7,
    name:"🌌 FINAL WORLD",
    x:55,
    y:11,
    width:220,
    height:140,
    shape:"ellipse",
    unlocked:false
}

];

const map = document.getElementById("worldLayer");
const info = document.getElementById("worldInfo");
const title = document.getElementById("worldTitle");
const enterBtn = document.getElementById("enterBtn");

let selectedWorld = null;

worlds.forEach(world=>{

    const point = document.createElement("div");

    point.className = "world";

    point.style.width = world.width + "px";
point.style.height = world.height + "px";

if(world.shape === "ellipse"){

    point.style.borderRadius = "50%";

}else{

    point.style.borderRadius = "20px";

}

    point.style.left = world.x + "%";
    point.style.top = world.y + "%";

    if(world.unlocked){

        point.classList.add("unlocked");

        point.onclick = ()=>{

            selectedWorld = world.id;

            title.textContent = world.name;

            info.classList.remove("hide");

        };

    }else{

        point.classList.add("locked");

        const fog = document.createElement("div");

        fog.className = "fog";

        point.appendChild(fog);

    }

    map.appendChild(point);

});

enterBtn.onclick = ()=>{

    if(selectedWorld===null)return;

    location.href=`world.html?id=${selectedWorld}`;

};